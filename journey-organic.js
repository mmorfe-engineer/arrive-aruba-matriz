(function () {
  "use strict";

  if (window.__AAOrganicJourneyRuntime) {
    window.__AAOrganicJourneyRuntime.mountWithin(document);
    return;
  }

  var instances = new WeakMap();
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
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

  function connectionIsSlow() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return false;
    return Boolean(connection.saveData || /(^|-)slow-2g|(^|-)2g|(^|-)3g/.test(connection.effectiveType || ""));
  }

  function loadImage(url) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.decoding = "async";
      image.onload = function () { resolve(image); };
      image.onerror = function () { reject(new Error("Unable to load " + url)); };
      image.src = url;
    });
  }

  function loadBitmap(url) {
    if (!window.createImageBitmap || !window.fetch) return loadImage(url);
    return fetch(url, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) throw new Error("Unable to fetch " + url + ": " + response.status);
        return response.blob();
      })
      .then(function (blob) { return createImageBitmap(blob); })
      .catch(function () { return loadImage(url); });
  }

  function OrganicJourney(root) {
    this.root = root;
    this.sticky = root.querySelector(".aa-organic-journey__sticky");
    this.visual = root.querySelector("[data-journey-visual]");
    this.canvas = root.querySelector("[data-journey-canvas]");
    this.poster = root.querySelector("[data-journey-poster]");
    this.finalImage = root.querySelector("[data-journey-final]");
    this.copy = root.querySelector("[data-journey-copy]");
    this.status = root.querySelector("[data-journey-status]");
    this.clouds = Array.prototype.slice.call(root.querySelectorAll(".aa-organic-cloud"));
    this.context = this.canvas ? this.canvas.getContext("2d", { alpha: true, desynchronized: true }) : null;

    this.config = null;
    this.variant = null;
    this.manifestUrl = null;
    this.loadedSheets = new Map();
    this.pendingSheets = new Map();
    this.pendingFrame = 0;
    this.currentSheetIndex = -1;
    this.currentScale = 1;
    this.targetScale = 1;
    this.active = false;
    this.destroyed = false;
    this.raf = 0;
    this.staticMode = reduceMotion.matches || connectionIsSlow();

    this.tick = this.tick.bind(this);
    this.onVisibility = this.onVisibility.bind(this);
    this.onResize = this.onResize.bind(this);

    var length = clamp(Number(root.dataset.scrollLength) || 320, 200, 400);
    root.style.height = length + "vh";
    if (root.dataset.fallbackPoster) this.poster.src = root.dataset.fallbackPoster;

    this.visibilityObserver = new IntersectionObserver(this.onVisibility, { rootMargin: "100% 0px" });
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.visibilityObserver.observe(root);
    this.resizeObserver.observe(this.sticky || root);
    this.loadConfig();
  }

  OrganicJourney.prototype.inlineConfig = function () {
    var node = this.root.querySelector("[data-journey-organic-config]");
    if (!node) return null;
    try {
      return JSON.parse(node.textContent);
    } catch (error) {
      throw new Error("Invalid inline Journey Organic config: " + error.message);
    }
  };

  OrganicJourney.prototype.loadConfig = function () {
    var self = this;
    var inline = this.inlineConfig();
    if (inline) {
      this.manifestUrl = document.baseURI;
      this.applyConfig(inline);
      return;
    }

    if (!this.root.dataset.manifest) {
      this.fallback("Journey assets are not configured");
      return;
    }

    this.manifestUrl = new URL(this.root.dataset.manifest, document.baseURI).href;
    fetch(this.manifestUrl, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) throw new Error("Manifest request failed: " + response.status);
        return response.json();
      })
      .then(function (config) { self.applyConfig(config); })
      .catch(function (error) { self.fallback(error.message); });
  };

  OrganicJourney.prototype.assetUrl = function (source) {
    if (!source) return "";
    return new URL(source, this.manifestUrl || document.baseURI).href;
  };

  OrganicJourney.prototype.applyConfig = function (config) {
    if (!config || Number(config.version) !== 3 || !config.variants) {
      this.fallback("Journey manifest v3 is required");
      return;
    }

    var compact = window.matchMedia("(max-width: 640px)").matches;
    this.config = config;
    this.variant = config.variants[compact && config.variants.mobile ? "mobile" : "desktop"];
    if (!this.variant || !this.variant.clip || !this.variant.clip.sheets || !this.variant.clip.sheets.length) {
      this.fallback("Journey sprite sheets are missing");
      return;
    }

    var cell = this.variant.cell;
    this.canvas.width = cell.width;
    this.canvas.height = cell.height;
    this.visual.style.setProperty("--aa-visual-ratio", (cell.width / cell.height).toFixed(5));
    this.poster.src = this.assetUrl(this.variant.poster && this.variant.poster.src);
    this.finalImage.src = this.assetUrl(this.variant.finalStill && this.variant.finalStill.src);

    var aperture = config.aperture || { x: 0.12, y: 0.12, width: 0.76, height: 0.76 };
    this.visual.style.setProperty("--aa-origin-x", ((aperture.x + aperture.width / 2) * 100).toFixed(3) + "%");
    this.visual.style.setProperty("--aa-origin-y", ((aperture.y + aperture.height / 2) * 100).toFixed(3) + "%");

    if (this.staticMode) {
      this.root.style.height = "100dvh";
      this.root.dataset.state = "static";
      this.status.textContent = "A still view is shown for this device";
      this.renderStatic();
      return;
    }

    this.loadSheet(0);
    loadImage(this.finalImage.src).catch(function () {});
    this.renderProgress(this.progress());
  };

  OrganicJourney.prototype.sheetForFrame = function (frameIndex) {
    var sheets = this.variant.clip.sheets;
    for (var index = 0; index < sheets.length; index += 1) {
      var sheet = sheets[index];
      if (frameIndex >= sheet.frameOffset && frameIndex < sheet.frameOffset + sheet.frameCount) {
        return { index: index, sheet: sheet };
      }
    }
    return { index: sheets.length - 1, sheet: sheets[sheets.length - 1] };
  };

  OrganicJourney.prototype.loadSheet = function (index) {
    var self = this;
    var sheet = this.variant.clip.sheets[index];
    if (!sheet || this.loadedSheets.has(index)) return Promise.resolve(this.loadedSheets.get(index));
    if (this.pendingSheets.has(index)) return this.pendingSheets.get(index);

    var promise = loadBitmap(this.assetUrl(sheet.src))
      .then(function (bitmap) {
        self.pendingSheets.delete(index);
        if (self.destroyed) {
          if (bitmap && bitmap.close) bitmap.close();
          return null;
        }
        self.loadedSheets.set(index, bitmap);
        self.trimMemory(self.currentSheetIndex >= 0 ? self.currentSheetIndex : index);
        if (index === self.currentSheetIndex || (index === 0 && self.root.dataset.state !== "ready")) {
          self.drawFrame(self.pendingFrame);
        }
        self.root.dataset.state = "ready";
        return bitmap;
      })
      .catch(function (error) {
        self.pendingSheets.delete(index);
        if (!self.loadedSheets.size) self.fallback(error.message);
        return null;
      });

    this.pendingSheets.set(index, promise);
    return promise;
  };

  OrganicJourney.prototype.trimMemory = function (center) {
    var self = this;
    var windowSize = clamp(Number(this.variant.slidingWindow) || 3, 1, 3);
    var keep = new Set([center]);
    for (var distance = 1; keep.size < windowSize; distance += 1) {
      if (center + distance < this.variant.clip.sheets.length) keep.add(center + distance);
      if (keep.size < windowSize && center - distance >= 0) keep.add(center - distance);
      if (center + distance >= this.variant.clip.sheets.length && center - distance < 0) break;
    }

    this.loadedSheets.forEach(function (bitmap, index) {
      if (keep.has(index)) return;
      if (bitmap && bitmap.close) bitmap.close();
      self.loadedSheets.delete(index);
    });
  };

  OrganicJourney.prototype.prefetchNeighbors = function (center) {
    var total = this.variant.clip.sheets.length;
    if (center + 1 < total) this.loadSheet(center + 1);
    if (center - 1 >= 0) this.loadSheet(center - 1);
  };

  OrganicJourney.prototype.requestFrame = function (frameIndex) {
    var max = this.variant.clip.frameCount - 1;
    var frame = clamp(Math.round(frameIndex), 0, max);
    var target = this.sheetForFrame(frame);
    this.pendingFrame = frame;
    this.currentSheetIndex = target.index;
    if (this.loadedSheets.has(target.index)) {
      this.drawFrame(frame);
      this.prefetchNeighbors(target.index);
    } else {
      this.loadSheet(target.index);
    }
  };

  OrganicJourney.prototype.drawFrame = function (frameIndex) {
    var target = this.sheetForFrame(frameIndex);
    var bitmap = this.loadedSheets.get(target.index);
    if (!bitmap || !this.context) return;
    var sheet = target.sheet;
    var local = frameIndex - sheet.frameOffset;
    var sourceX = (local % sheet.columns) * this.variant.cell.width;
    var sourceY = Math.floor(local / sheet.columns) * this.variant.cell.height;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(
      bitmap,
      sourceX,
      sourceY,
      this.variant.cell.width,
      this.variant.cell.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  };

  OrganicJourney.prototype.progress = function () {
    var rect = this.root.getBoundingClientRect();
    var distance = Math.max(1, rect.height - window.innerHeight);
    return clamp(-rect.top / distance, 0, 1);
  };

  OrganicJourney.prototype.calculateTargetScale = function () {
    if (!this.config || !this.visual) return 1;
    var aperture = this.config.aperture;
    var rect = this.visual.getBoundingClientRect();
    var baseWidth = rect.width / Math.max(0.001, this.currentScale);
    var baseHeight = rect.height / Math.max(0.001, this.currentScale);
    var apertureWidth = baseWidth * aperture.width;
    var apertureHeight = baseHeight * aperture.height;
    return Math.max(window.innerWidth / apertureWidth, window.innerHeight / apertureHeight) * 1.06;
  };

  OrganicJourney.prototype.renderStatic = function () {
    if (!this.variant) return;
    this.poster.src = this.assetUrl(this.variant.finalStill.src || this.variant.poster.src);
    this.visual.style.setProperty("--aa-final-opacity", "0");
    this.root.style.setProperty("--aa-copy-opacity", "1");
  };

  OrganicJourney.prototype.renderProgress = function (progress) {
    if (!this.variant || this.staticMode) return;
    var timeline = this.config.timeline;
    var shadeProgress = ease((progress - timeline.shadeStart) / (timeline.shadeEnd - timeline.shadeStart));
    var zoomProgress = ease((progress - timeline.zoomStart) / (timeline.zoomEnd - timeline.zoomStart));
    var finalOpacity = ease((progress - timeline.finalSwap) / 0.08);
    var frame = shadeProgress * (this.variant.clip.frameCount - 1);
    this.requestFrame(frame);

    this.targetScale = this.calculateTargetScale();
    this.currentScale = 1 + (this.targetScale - 1) * zoomProgress;
    this.visual.style.setProperty("--aa-visual-scale", this.currentScale.toFixed(5));
    this.visual.style.setProperty("--aa-final-opacity", finalOpacity.toFixed(4));
    this.root.style.setProperty("--aa-progress", progress.toFixed(5));
    this.root.style.setProperty("--aa-copy-opacity", reveal(progress, 0.23, 0.52).toFixed(4));

    var offsets = [10, -16, 24];
    var vertical = [-2, 3, -4];
    this.clouds.forEach(function (cloud, index) {
      cloud.style.setProperty("--cloud-x", (offsets[index] * progress).toFixed(2) + "vw");
      cloud.style.setProperty("--cloud-y", (vertical[index] * progress).toFixed(2) + "vh");
    });
  };

  OrganicJourney.prototype.tick = function () {
    this.raf = 0;
    if (!this.active || this.destroyed || this.staticMode) return;
    this.renderProgress(this.progress());
    this.raf = requestAnimationFrame(this.tick);
  };

  OrganicJourney.prototype.onVisibility = function (entries) {
    this.active = entries.some(function (entry) { return entry.isIntersecting; });
    if (this.active && !this.raf && !this.staticMode) this.raf = requestAnimationFrame(this.tick);
    if (!this.active && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  };

  OrganicJourney.prototype.onResize = function () {
    this.targetScale = 1;
    if (this.variant && !this.staticMode) this.renderProgress(this.progress());
  };

  OrganicJourney.prototype.fallback = function (message) {
    this.staticMode = true;
    this.root.dataset.state = "fallback";
    this.root.style.height = "100dvh";
    if (this.status) this.status.textContent = message || "A still view is available";
    if (this.root.dataset.fallbackPoster) this.poster.src = this.root.dataset.fallbackPoster;
    this.root.style.setProperty("--aa-copy-opacity", "1");
  };

  OrganicJourney.prototype.destroy = function () {
    var self = this;
    this.destroyed = true;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.visibilityObserver.disconnect();
    this.resizeObserver.disconnect();
    this.loadedSheets.forEach(function (bitmap) {
      if (bitmap && bitmap.close) bitmap.close();
    });
    this.loadedSheets.clear();
    this.pendingSheets.clear();
    instances.delete(self.root);
  };

  function mount(root) {
    if (!root || instances.has(root)) return;
    instances.set(root, new OrganicJourney(root));
  }

  function mountWithin(scope) {
    if (scope && scope.matches && scope.matches("[data-journey-organic]")) mount(scope);
    (scope || document).querySelectorAll("[data-journey-organic]").forEach(mount);
  }

  function destroyWithin(scope) {
    if (!scope) return;
    var roots = [];
    if (scope.matches && scope.matches("[data-journey-organic]")) roots.push(scope);
    scope.querySelectorAll("[data-journey-organic]").forEach(function (root) { roots.push(root); });
    roots.forEach(function (root) {
      var instance = instances.get(root);
      if (instance) instance.destroy();
    });
  }

  window.__AAOrganicJourneyRuntime = {
    mountWithin: mountWithin,
    destroyWithin: destroyWithin
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mountWithin(document); }, { once: true });
  } else {
    mountWithin(document);
  }

  document.addEventListener("shopify:section:load", function (event) { mountWithin(event.target); });
  document.addEventListener("shopify:section:unload", function (event) { destroyWithin(event.target); });
})();
