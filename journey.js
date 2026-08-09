(function () {
  "use strict";

  var instances = new Map();
  var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mobileQuery = window.matchMedia("(max-width: 767px)");
  var compactQuery = window.matchMedia("(max-width: 379px)");

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function ease(value) {
    var t = clamp(value, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function reveal(progress, start, end) {
    var fade = Math.min(0.08, (end - start) * 0.35);
    var enter = ease((progress - start) / fade);
    var leave = 1 - ease((progress - (end - fade)) / fade);
    return clamp(Math.min(enter, leave), 0, 1);
  }

  function connectionNeedsFallback() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return false;
    return Boolean(connection.saveData || /(^|-)slow-2g|(^|-)2g|(^|-)3g/.test(connection.effectiveType || ""));
  }

  function loadImageFallback(blob, signal) {
    return new Promise(function (resolve, reject) {
      var objectUrl = URL.createObjectURL(blob);
      var image = new Image();
      var abort = function () {
        URL.revokeObjectURL(objectUrl);
        reject(new DOMException("Aborted", "AbortError"));
      };
      image.onload = function () {
        signal.removeEventListener("abort", abort);
        resolve({
          image: image,
          close: function () {
            URL.revokeObjectURL(objectUrl);
            image.src = "";
          }
        });
      };
      image.onerror = function () {
        signal.removeEventListener("abort", abort);
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Unable to decode sprite sheet"));
      };
      signal.addEventListener("abort", abort, { once: true });
      image.src = objectUrl;
    });
  }

  function Journey(root) {
    this.root = root;
    this.stage = root.querySelector(".aa-journey__stage");
    this.canvas = root.querySelector(".aa-journey__canvas");
    this.context = this.canvas.getContext("2d", { alpha: true, desynchronized: true });
    this.whiteout = root.querySelector(".aa-journey__whiteout");
    this.finalCopy = root.querySelector(".aa-journey__final");
    this.northCopy = root.querySelector(".aa-journey__copy--north");
    this.feltCopy = root.querySelector(".aa-journey__copy--felt");
    this.status = root.querySelector(".aa-journey__status");
    this.manifestUrl = new URL(root.dataset.manifest, document.baseURI);
    this.abortController = new AbortController();
    this.loadedSheets = new Map();
    this.loadingSheets = new Map();
    this.orderedSheets = [];
    this.manifest = null;
    this.variant = null;
    this.variantName = null;
    this.active = false;
    this.assetsRequested = false;
    this.destroyed = false;
    this.raf = 0;
    this.lastFrameKey = "";
    this.lastCanvasBox = "";
    this.pendingFrame = null;
    this.compact = compactQuery.matches;
    this.fallback = reduceMotionQuery.matches || connectionNeedsFallback();

    this.onVisibility = this.onVisibility.bind(this);
    this.onPreload = this.onPreload.bind(this);
    this.onResize = this.onResize.bind(this);
    this.tick = this.tick.bind(this);

    if (this.fallback) {
      this.root.classList.add("aa-journey--fallback");
      this.status.textContent = "Static preview";
      return;
    }

    this.preloadObserver = new IntersectionObserver(this.onPreload, { rootMargin: "100% 0px" });
    this.visibilityObserver = new IntersectionObserver(this.onVisibility, { rootMargin: "100px 0px" });
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.preloadObserver.observe(this.root);
    this.visibilityObserver.observe(this.root);
    this.resizeObserver.observe(this.stage);
    this.applyCanvasSize(0);
    this.resizeCanvas();
  }

  Journey.prototype.onPreload = function (entries) {
    if (entries.some(function (entry) { return entry.isIntersecting; })) {
      this.requestAssets();
      this.preloadObserver.disconnect();
    }
  };

  Journey.prototype.onVisibility = function (entries) {
    this.active = entries.some(function (entry) { return entry.isIntersecting; });
    if (this.active && !this.raf) this.raf = requestAnimationFrame(this.tick);
  };

  Journey.prototype.onResize = function () {
    this.lastCanvasBox = "";
    this.applyCanvasSize(this.currentProgress());
    this.resizeCanvas();
    this.lastFrameKey = "";
  };

  Journey.prototype.currentProgress = function () {
    var rect = this.root.getBoundingClientRect();
    var distance = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / distance, 0, 1);
  };

  Journey.prototype.canvasBoxFor = function (progress) {
    var ratio = 16 / 9;
    var viewportWidth = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    var viewportHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    var isMobile = mobileQuery.matches;
    var containedWidth = Math.min(viewportWidth * (isMobile ? 0.94 : 0.88), isMobile ? 480 : 960);
    var containedHeight = containedWidth / ratio;
    var coverWidth = viewportWidth;
    var coverHeight = viewportWidth / ratio;

    if (coverHeight < viewportHeight) {
      coverHeight = viewportHeight;
      coverWidth = viewportHeight * ratio;
    }

    var introProgress = ease(progress / 0.16);
    return {
      width: coverWidth + (containedWidth - coverWidth) * introProgress,
      height: coverHeight + (containedHeight - coverHeight) * introProgress
    };
  };

  Journey.prototype.applyCanvasSize = function (progress) {
    var box = this.canvasBoxFor(progress);
    var width = Math.max(1, Math.round(box.width));
    var height = Math.max(1, Math.round(box.height));
    var key = width + "x" + height;
    if (key === this.lastCanvasBox) return false;

    this.lastCanvasBox = key;
    this.root.style.setProperty("--aa-canvas-w", width + "px");
    this.root.style.setProperty("--aa-canvas-h", height + "px");
    return true;
  };

  Journey.prototype.resizeCanvas = function () {
    var rect = this.canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = Math.max(1, Math.round(rect.width * dpr));
    var height = Math.max(1, Math.round(rect.height * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.context.imageSmoothingEnabled = true;
      this.context.imageSmoothingQuality = "high";
    }
  };

  Journey.prototype.requestAssets = async function () {
    if (this.assetsRequested || this.destroyed) return;
    this.assetsRequested = true;
    try {
      var response = await fetch(this.manifestUrl, { signal: this.abortController.signal });
      if (!response.ok) throw new Error("Manifest request failed with " + response.status);
      this.manifest = await response.json();
      this.variantName = mobileQuery.matches ? "mobile" : "desktop";
      this.variant = this.manifest.variants[this.variantName];
      if (!this.variant) throw new Error("Manifest has no " + this.variantName + " variant");
      this.indexSheets();
      await this.ensureAround(0);
      this.pendingFrame = { clipName: "shade", frameIndex: 0 };
      this.drawPendingFrame();
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Arrive Journey:", error);
      this.root.classList.add("aa-journey--error");
      this.status.textContent = "Journey unavailable. Continue to shop.";
    }
  };

  Journey.prototype.indexSheets = function () {
    var ordered = [];
    var clips = this.compact ? ["shade"] : ["shade", "push"];
    clips.forEach(function (clipName) {
      this.variant.clips[clipName].sheets.forEach(function (sheet, sheetIndex) {
        ordered.push({
          key: clipName + ":" + sheetIndex,
          clipName: clipName,
          sheetIndex: sheetIndex,
          sheet: sheet
        });
      });
    }, this);
    this.orderedSheets = ordered;
  };

  Journey.prototype.loadSheet = async function (flatIndex) {
    var entry = this.orderedSheets[flatIndex];
    if (!entry) return null;
    if (this.loadedSheets.has(entry.key)) return this.loadedSheets.get(entry.key);
    if (this.loadingSheets.has(entry.key)) return this.loadingSheets.get(entry.key);

    var promise = (async function () {
      var url = new URL(entry.sheet.src, this.manifestUrl);
      var response = await fetch(url, { signal: this.abortController.signal });
      if (!response.ok) throw new Error("Sheet request failed with " + response.status);
      var blob = await response.blob();
      var decoded;
      if ("createImageBitmap" in window) {
        var bitmap = await createImageBitmap(blob);
        decoded = { image: bitmap, close: function () { bitmap.close(); } };
      } else {
        decoded = await loadImageFallback(blob, this.abortController.signal);
      }
      var value = { entry: entry, image: decoded.image, close: decoded.close };
      this.loadedSheets.set(entry.key, value);
      this.loadingSheets.delete(entry.key);
      this.drawPendingFrame();
      return value;
    }).call(this).catch(function (error) {
      this.loadingSheets.delete(entry.key);
      throw error;
    }.bind(this));

    this.loadingSheets.set(entry.key, promise);
    return promise;
  };

  Journey.prototype.ensureAround = async function (flatIndex) {
    // Window size comes from the manifest per variant: desktop sheets are heavier
    // (4096px cap) so it keeps fewer resident; mobile sheets are lighter (2048px cap,
    // the iOS Safari memory ceiling) so it can afford a look-behind sheet too.
    var windowSize = (this.variant && this.variant.slidingWindow) || 3;
    var behind = Math.floor((windowSize - 1) / 2);
    var ahead = Math.ceil((windowSize - 1) / 2);

    var keep = new Set();
    for (var index = flatIndex - behind; index <= flatIndex + ahead; index += 1) {
      if (this.orderedSheets[index]) keep.add(this.orderedSheets[index].key);
    }

    await this.loadSheet(flatIndex);
    var neighbors = [];
    for (var b = 1; b <= behind; b += 1) neighbors.push(flatIndex - b);
    for (var a = 1; a <= ahead; a += 1) neighbors.push(flatIndex + a);
    neighbors.forEach(function (index) {
      if (this.orderedSheets[index]) this.loadSheet(index).catch(this.handleAssetError.bind(this));
    }, this);

    this.loadedSheets.forEach(function (value, key) {
      if (!keep.has(key)) {
        value.close();
        this.loadedSheets.delete(key);
      }
    }, this);
  };

  Journey.prototype.handleAssetError = function (error) {
    if (error.name === "AbortError") return;
    console.error("Arrive Journey:", error);
  };

  Journey.prototype.flatIndexFor = function (clipName, sheetIndex) {
    return this.orderedSheets.findIndex(function (entry) {
      return entry.clipName === clipName && entry.sheetIndex === sheetIndex;
    });
  };

  Journey.prototype.sheetForFrame = function (clipName, frameIndex) {
    var clip = this.variant.clips[clipName];
    var sheetIndex = clip.sheets.findIndex(function (sheet) {
      return frameIndex >= sheet.frameOffset && frameIndex < sheet.frameOffset + sheet.frameCount;
    });
    return { clip: clip, sheetIndex: sheetIndex, sheet: clip.sheets[sheetIndex] };
  };

  Journey.prototype.requestFrame = function (clipName, frameIndex) {
    if (!this.variant) return;
    var frame = Math.round(clamp(frameIndex, 0, this.variant.clips[clipName].frameCount - 1));
    var frameKey = clipName + ":" + frame;
    this.pendingFrame = { clipName: clipName, frameIndex: frame };
    if (frameKey === this.lastFrameKey) return;

    var target = this.sheetForFrame(clipName, frame);
    var flatIndex = this.flatIndexFor(clipName, target.sheetIndex);
    if (this.loadedSheets.has(clipName + ":" + target.sheetIndex)) {
      this.drawPendingFrame();
      this.ensureAround(flatIndex).catch(this.handleAssetError.bind(this));
    } else {
      this.ensureAround(flatIndex).catch(this.handleAssetError.bind(this));
    }
  };

  Journey.prototype.drawPendingFrame = function () {
    if (!this.pendingFrame || !this.variant || this.destroyed) return;
    var clipName = this.pendingFrame.clipName;
    var frameIndex = this.pendingFrame.frameIndex;
    var target = this.sheetForFrame(clipName, frameIndex);
    var loaded = this.loadedSheets.get(clipName + ":" + target.sheetIndex);
    if (!loaded) return;

    var clip = target.clip;
    var sheet = target.sheet;
    var cellIndex = frameIndex - sheet.frameOffset;
    var sourceX = (cellIndex % sheet.columns) * clip.cell.width;
    var sourceY = Math.floor(cellIndex / sheet.columns) * clip.cell.height;
    var crop = clip.sourceCrop;
    var source = this.manifest.source;
    var destinationX = crop.x / source.width * this.canvas.width;
    var destinationY = crop.y / source.height * this.canvas.height;
    var destinationWidth = crop.width / source.width * this.canvas.width;
    var destinationHeight = crop.height / source.height * this.canvas.height;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      loaded.image,
      sourceX,
      sourceY,
      clip.cell.width,
      clip.cell.height,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight
    );
    this.lastFrameKey = clipName + ":" + frameIndex;
    this.root.classList.add("aa-journey--ready");
  };

  Journey.prototype.updateCopy = function (element, opacity) {
    element.style.opacity = opacity.toFixed(3);
    element.style.transform = "translate3d(0," + ((1 - opacity) * 18).toFixed(2) + "px,0)";
  };

  Journey.prototype.renderProgress = function (progress) {
    var shadeEnd = 0.58;
    var pushEnd = 0.84;
    var shadeLastIndex = (this.variant ? this.variant.clips.shade.frameCount : 100) - 1;
    var pushLastIndex = (this.variant ? this.variant.clips.push.frameCount : 40) - 1;
    var shadeProgress = clamp((progress - 0.06) / (shadeEnd - 0.06), 0, 1);
    var pushProgress = ease((progress - shadeEnd) / (pushEnd - shadeEnd));
    var resizedForIntro = this.applyCanvasSize(progress);

    if (resizedForIntro) {
      this.resizeCanvas();
      this.lastFrameKey = "";
    }

    if (progress <= shadeEnd || this.compact) {
      var shadeFrame = progress <= shadeEnd ? shadeProgress * shadeLastIndex : shadeLastIndex;
      this.requestFrame("shade", shadeFrame);
    } else {
      this.requestFrame("push", pushProgress * pushLastIndex);
    }

    // Compact devices never load the push clip; the "entering the window" feel is
    // faked with a CSS scale on the frozen final shade frame. Capped at 1.6x (not the
    // 2.4x this used to be) so it doesn't compound with the mobile cell/display ratio
    // into visible blur — the whiteout below is timed to take over before that matters.
    var compactScale = this.compact && progress > shadeEnd ? 1 + pushProgress * 0.6 : 1;
    this.root.style.setProperty("--aa-canvas-scale", compactScale.toFixed(4));
    this.root.style.setProperty("--aa-cloud-far-x", (progress * 12).toFixed(2) + "vw");
    this.root.style.setProperty("--aa-cloud-near-x", (-progress * 18).toFixed(2) + "vw");

    this.updateCopy(this.northCopy, reveal(progress, 0.25, 0.49));
    this.updateCopy(this.feltCopy, reveal(progress, 0.61, 0.79));

    // The whiteout must reach full opacity exactly as the push clip reaches its last
    // frame (pushEnd) — never after. Letting it lag left the final push frame exposed,
    // frozen, for a long stretch of scroll (the "rectangle" bug). Compact mode has no
    // real push footage to hold on, just the faked CSS-scaled shade frame, so it
    // crosses to white a little earlier to hide that fake zoom sooner.
    var whiteStart = this.compact ? pushEnd - 0.16 : pushEnd - 0.10;
    var whiteEnd = this.compact ? pushEnd - 0.04 : pushEnd;
    var white = ease((progress - whiteStart) / (whiteEnd - whiteStart));
    var finalOpacity = ease((progress - (pushEnd + 0.02)) / 0.08);
    this.whiteout.style.opacity = white.toFixed(3);
    this.finalCopy.style.opacity = finalOpacity.toFixed(3);
    this.finalCopy.style.transform = "translate3d(-50%,calc(-50% + " + ((1 - finalOpacity) * 18).toFixed(2) + "px),0)";
  };

  Journey.prototype.tick = function () {
    this.raf = 0;
    if (!this.active || this.destroyed) return;
    var progress = this.currentProgress();
    this.renderProgress(progress);
    this.raf = requestAnimationFrame(this.tick);
  };

  Journey.prototype.destroy = function () {
    this.destroyed = true;
    this.abortController.abort();
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.preloadObserver) this.preloadObserver.disconnect();
    if (this.visibilityObserver) this.visibilityObserver.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.loadedSheets.forEach(function (value) { value.close(); });
    this.loadedSheets.clear();
    this.loadingSheets.clear();
    instances.delete(this.root);
  };

  function mount(root) {
    if (!root || instances.has(root)) return instances.get(root);
    var instance = new Journey(root);
    instances.set(root, instance);
    return instance;
  }

  function mountAll(scope) {
    (scope || document).querySelectorAll(".aa-journey[data-manifest]").forEach(mount);
  }

  function destroyAll() {
    Array.from(instances.values()).forEach(function (instance) { instance.destroy(); });
  }

  window.ArriveJourney = { mount: mount, mountAll: mountAll, destroyAll: destroyAll };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountAll(document); }, { once: true });
  } else {
    mountAll(document);
  }
})();
