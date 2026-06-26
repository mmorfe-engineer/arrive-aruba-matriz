/* @ds-bundle: {"format":3,"namespace":"ArriveArubaDesignSystem_4dc787","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"1f963ce6a7f3","components/commerce/ProductCard.jsx":"125b7327e8b4","components/core/Button.jsx":"092a966cce36","components/core/Card.jsx":"4436f9df48e1","components/core/Eyebrow.jsx":"d85fc7639a9a","components/core/Tag.jsx":"857d85ce08b3","components/forms/Input.jsx":"904e12b6132c","ui_kits/website/App.jsx":"e8874b6e92aa","ui_kits/website/Header.jsx":"b4641d57fede","ui_kits/website/Icons.jsx":"2251cdea99b6","ui_kits/website/ProductScreens.jsx":"30152ab40d55","ui_kits/website/Products.jsx":"0987b8a04c55","ui_kits/website/Sections.jsx":"703285ba8e00"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ArriveArubaDesignSystem_4dc787 = window.ArriveArubaDesignSystem_4dc787 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arrive Aruba primary logo lockup (image asset). Approved color pairings only.
 * tone: "sapphire" (on cream/white) or "white" (on sapphire/silver).
 * Always 100% opacity — never distort, shadow, or recolor outside approved set.
 */
function Logo({
  tone = "sapphire",
  height = 40,
  base = "",
  style = {},
  ...rest
}) {
  const src = tone === "white" ? `${base}assets/logos/main-logo-white.png` : `${base}assets/logos/main-logo-sapphire.png`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: "Arrive Aruba",
    style: {
      height: `${height}px`,
      width: "auto",
      opacity: 1,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Editorial product card — image, optional tag, serif product name, price.
 * Hover lifts gently. Used across shop grids.
 */
function ProductCard({
  image,
  name,
  price,
  tag,
  tagTone = "sapphire",
  collection,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: "#",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      color: "var(--text-primary)",
      transition: "transform var(--dur-base) var(--ease-out)",
      transform: hover ? "translateY(-6px)" : "translateY(0)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--surface-sunken)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transition: "box-shadow var(--dur-base) var(--ease-out)"
    }
  }, image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform var(--dur-slow) var(--ease-out)",
      transform: hover ? "scale(1.04)" : "scale(1)"
    }
  }), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "12px",
      left: "12px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: tagTone === "warm" ? "var(--accent-warm)" : "var(--aa-star-sapphire)",
      color: "var(--aa-white)",
      lineHeight: 1
    }
  }, tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, collection && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      marginBottom: "4px"
    }
  }, collection), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h4)",
      fontWeight: 500
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-secondary)"
    }
  }, price))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Arrive Aruba primary action. Pill-shaped, sapphire-led, quiet luxury.
 * Variants: primary (sapphire fill), secondary (silver outline), ghost (text),
 * accent (seasonal — use sparingly).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  disabled = false,
  accent = "warm",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "9px 18px",
      fontSize: "0.8125rem"
    },
    md: {
      padding: "13px 28px",
      fontSize: "0.9375rem"
    },
    lg: {
      padding: "16px 38px",
      fontSize: "1.0625rem"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5em",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    letterSpacing: "0.01em",
    lineHeight: 1,
    borderRadius: "var(--radius-pill)",
    border: "1.5px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
    textDecoration: "none",
    ...sizes[size]
  };
  const accentColor = accent === "cool" ? "var(--accent-cool)" : "var(--accent-warm)";
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--text-on-accent)",
      boxShadow: "var(--shadow-cta)"
    },
    secondary: {
      background: "transparent",
      color: "var(--action-primary)",
      borderColor: "var(--border-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--action-primary)"
    },
    accent: {
      background: accentColor,
      color: "var(--aa-white)"
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `aa-btn aa-btn--${variant}`,
    disabled: as === "button" ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface card. variant: plain (white, soft shadow) or sapphire (inverse).
 * Generous padding by default; quiet luxury.
 */
function Card({
  children,
  variant = "plain",
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const variants = {
    plain: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      boxShadow: "var(--shadow-md)"
    },
    sapphire: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-dark)",
      boxShadow: "var(--shadow-lg)"
    },
    outline: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-hairline)"
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: "var(--radius-lg)",
      padding,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small eyebrow label — spaced uppercase Geologica. Sits above serif titles.
 */
function Eyebrow({
  children,
  color,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "aa-eyebrow",
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-eyebrow)",
      fontWeight: 500,
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: color || "var(--text-secondary)",
      display: "inline-block",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small pill tag / badge. tone: neutral, sapphire, warm, cool.
 * Use for collection labels, "New", "Limited".
 */
function Tag({
  children,
  tone = "neutral",
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      background: "var(--surface-sunken)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-hairline)"
    },
    sapphire: {
      background: "var(--aa-star-sapphire)",
      color: "var(--aa-white)",
      border: "1px solid transparent"
    },
    warm: {
      background: "rgba(245,161,105,0.16)",
      color: "#b86a32",
      border: "1px solid rgba(245,161,105,0.4)"
    },
    cool: {
      background: "rgba(146,175,136,0.18)",
      color: "#5c7553",
      border: "1px solid rgba(146,175,136,0.45)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4em",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label. Hairline border, sapphire focus ring.
 * Quiet, editorial. Use for newsletter, search, checkout fields.
 */
function Input({
  label,
  hint,
  type = "text",
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `aa-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: 500,
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-primary)",
      background: "var(--surface-card)",
      padding: "13px 16px",
      borderRadius: "var(--radius-sm)",
      border: `1.5px solid ${focus ? "var(--focus-ring)" : "var(--border-hairline)"}`,
      outline: "none",
      boxShadow: focus ? "0 0 0 3px rgba(95,139,184,0.18)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)"
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      color: "var(--text-secondary)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
// Arrive Aruba website — interactive shell tying screens together.
function App() {
  const [view, setView] = React.useState("home"); // home | shop | product | contact
  const [active, setActive] = React.useState(null);
  const [bag, setBag] = React.useState([]);
  const [bagOpen, setBagOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const Header = window.AAHeader;
  const {
    AAHero,
    AACollectionStrip,
    AAEditorialBlock,
    AANewsletter,
    AAFooter,
    AAProductDetail,
    AABagDrawer
  } = window;
  const {
    Eyebrow,
    Input,
    Button
  } = window.ArriveArubaDesignSystem_4dc787;
  const openProduct = p => {
    setActive(p);
    setView("product");
    window.scrollTo(0, 0);
  };
  const nav = key => {
    setView(key);
    window.scrollTo(0, 0);
  };
  const addToBag = (p, size) => {
    setBag(b => [...b, {
      ...p,
      size
    }]);
    setToast(`${p.name} added`);
    setTimeout(() => setToast(null), 2200);
  };
  const dark = view === "home";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: dark ? "absolute" : "relative",
      top: 0,
      left: 0,
      right: 0,
      background: dark ? "transparent" : "var(--surface-card)",
      borderBottom: dark ? "none" : "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    onNav: nav,
    current: view === "product" ? "shop" : view,
    dark: dark,
    onOpenBag: () => setBagOpen(true),
    bagCount: bag.length
  })), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, view === "home" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AAHero, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(AACollectionStrip, {
    onOpen: openProduct
  }), /*#__PURE__*/React.createElement(AAEditorialBlock, null), /*#__PURE__*/React.createElement(AANewsletter, null)), view === "shop" && /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-8) clamp(24px,4vw,56px) var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Merch"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h1)",
      fontWeight: 500,
      margin: "10px 0 var(--space-7)"
    }
  }, "The Arrival Collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "clamp(18px,2.5vw,36px)"
    }
  }, window.AAProducts.map(p => /*#__PURE__*/React.createElement(window.AAProductTile, {
    key: p.id,
    product: p,
    onOpen: openProduct
  })))), view === "product" && active && /*#__PURE__*/React.createElement(AAProductDetail, {
    product: active,
    onAdd: addToBag,
    onBack: () => nav("shop")
  }), view === "contact" && /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-narrow)",
      margin: "0 auto",
      padding: "var(--space-9) clamp(24px,4vw,56px) var(--space-10)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h1)",
      fontWeight: 500,
      margin: "12px 0 8px"
    }
  }, "Say hello."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      marginBottom: "var(--space-7)"
    }
  }, "We answer slowly and warmly. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-warm)"
    }
  }, "\u2726")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      display: "grid",
      gap: "var(--space-4)",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Message",
    placeholder: "Tell us about your arrival"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    type: "submit",
    style: {
      marginTop: "8px",
      justifySelf: "start"
    }
  }, "Send \u2726")))), /*#__PURE__*/React.createElement(AAFooter, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(AABagDrawer, {
    open: bagOpen,
    items: bag,
    onClose: () => setBagOpen(false),
    onCheckout: () => {
      setBagOpen(false);
      setToast("Checkout is a demo ✦");
      setTimeout(() => setToast(null), 2200);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "28px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 60,
      background: "var(--surface-inverse)",
      color: "var(--text-on-dark)",
      padding: "14px 26px",
      borderRadius: "var(--radius-pill)",
      boxShadow: "var(--shadow-lg)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)"
    }
  }, toast));
}
window.AAApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Arrive Aruba website — top navigation header.
// Matches brand site: logo left, Home / Merch (dropdown) / Contact center, socials right.
function Header({
  onNav,
  current,
  dark = true,
  onOpenBag,
  bagCount = 0
}) {
  const {
    Logo
  } = window.ArriveArubaDesignSystem_4dc787;
  const {
    Instagram,
    Facebook,
    TikTok,
    WhatsApp,
    Mail,
    Bag,
    ChevronDown
  } = window.AAIcons;
  const [merchOpen, setMerchOpen] = React.useState(false);
  const text = dark ? "var(--text-on-dark)" : "var(--text-primary)";
  const subtle = dark ? "rgba(240,240,229,.82)" : "var(--text-secondary)";
  const navItem = (label, key) => /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav(key),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: "1.0625rem",
      fontWeight: current === key ? 600 : 400,
      color: current === key ? text : subtle,
      letterSpacing: "0.01em",
      padding: "6px 2px",
      position: "relative"
    }
  }, label);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      zIndex: 20,
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      padding: "26px clamp(24px,4vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("home"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      justifySelf: "start",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: dark ? "white" : "sapphire",
    height: 52,
    base: "../../"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "clamp(28px,4vw,64px)",
      alignItems: "center",
      justifySelf: "center"
    }
  }, navItem("Home", "home"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    onMouseEnter: () => setMerchOpen(true),
    onMouseLeave: () => setMerchOpen(false)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("shop"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      fontFamily: "var(--font-body)",
      fontSize: "1.0625rem",
      fontWeight: current === "shop" ? 600 : 400,
      color: current === "shop" ? text : subtle
    }
  }, "Merch ", /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16,
    style: {
      transform: merchOpen ? "rotate(180deg)" : "none",
      transition: "transform var(--dur-fast)"
    }
  })), merchOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 14px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      minWidth: "190px"
    }
  }, ["Chemise", "Cap", "Jacket"].map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => onNav("shop"),
    style: {
      display: "block",
      width: "100%",
      textAlign: "center",
      padding: "16px 24px",
      cursor: "pointer",
      background: i === 0 ? "var(--aa-silver-lake)" : "transparent",
      color: i === 0 ? "var(--aa-white)" : "var(--text-primary)",
      border: "none",
      borderTop: i === 2 ? "1px solid var(--border-hairline)" : "none",
      fontFamily: "var(--font-serif)",
      fontWeight: 700,
      fontSize: "1.0625rem"
    }
  }, m)))), navItem("Contact", "contact")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "18px",
      alignItems: "center",
      justifySelf: "end",
      color: text
    }
  }, /*#__PURE__*/React.createElement(Facebook, {
    size: 20
  }), /*#__PURE__*/React.createElement(Instagram, {
    size: 20
  }), /*#__PURE__*/React.createElement(TikTok, {
    size: 19
  }), /*#__PURE__*/React.createElement(WhatsApp, {
    size: 20
  }), /*#__PURE__*/React.createElement(Mail, {
    size: 21
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenBag,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: text,
      position: "relative",
      padding: "2px",
      marginLeft: "4px"
    }
  }, /*#__PURE__*/React.createElement(Bag, {
    size: 22
  }), bagCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "-4px",
      right: "-6px",
      background: "var(--accent-warm)",
      color: "#fff",
      fontSize: "11px",
      fontWeight: 600,
      width: "17px",
      height: "17px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, bagCount))));
}
window.AAHeader = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Icons.jsx
try { (() => {
// Arrive Aruba — UI kit icon set.
// Social marks use simple-icons single-path glyphs; UI icons are simple strokes.
// All inherit currentColor. No emoji, no hand-rolled decorative art.
const Svg = props => React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: props.size || 22,
  height: props.size || 22,
  viewBox: props.viewBox || "0 0 24 24",
  fill: props.fill || "none",
  stroke: props.stroke,
  strokeWidth: props.strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: props.style,
  "aria-hidden": true
}, props.children);

// --- Brand / social (filled, currentColor) ---
const Instagram = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  fill: "currentColor",
  stroke: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 4.13a4.09 4.09 0 1 1 0 8.18 4.09 4.09 0 0 1 0-8.18Zm0 6.75a2.66 2.66 0 1 0 0-5.32 2.66 2.66 0 0 0 0 5.32Zm5.2-6.93a.96.96 0 1 1-1.91 0 .96.96 0 0 1 1.91 0Z"
}));
const Facebook = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  fill: "currentColor",
  stroke: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
}));
const TikTok = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  fill: "currentColor",
  stroke: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"
}));
const WhatsApp = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  fill: "currentColor",
  stroke: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M.06 24l1.69-6.16a11.87 11.87 0 0 1-1.59-5.95C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.82 11.82 0 0 1 3.48 8.41c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.68-1.45L.06 24Zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.43 9.89-9.88A9.84 9.84 0 0 0 12.06 2c-5.46 0-9.89 4.43-9.89 9.89 0 2.22.65 3.89 1.74 5.63l-1 3.66 3.75-.98Zm10.8-5.96c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41Z"
}));
const Mail = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.6"
}, /*#__PURE__*/React.createElement("rect", {
  x: "2.5",
  y: "4.5",
  width: "19",
  height: "15",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 6 9 6 9-6"
}));
const Bag = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.6"
}, /*#__PURE__*/React.createElement("path", {
  d: "M6 8h12l-1 12H7L6 8Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 8V6a3 3 0 0 1 6 0v2"
}));
const Search = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.6"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "7"
}), /*#__PURE__*/React.createElement("path", {
  d: "m20 20-3.5-3.5"
}));
const ChevronDown = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.8"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const ArrowRight = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.8"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m13 6 6 6-6 6"
}));
const Close = ({
  size,
  style
}) => /*#__PURE__*/React.createElement(Svg, {
  size: size,
  style: style,
  stroke: "currentColor",
  strokeWidth: "1.8"
}, /*#__PURE__*/React.createElement("path", {
  d: "m6 6 12 12M18 6 6 18"
}));
window.AAIcons = {
  Instagram,
  Facebook,
  TikTok,
  WhatsApp,
  Mail,
  Bag,
  Search,
  ChevronDown,
  ArrowRight,
  Close
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductScreens.jsx
try { (() => {
// Arrive Aruba website — product detail screen + bag drawer.

function ProductDetail({
  product,
  onAdd,
  onBack
}) {
  const {
    Button,
    Eyebrow,
    Tag
  } = window.ArriveArubaDesignSystem_4dc787;
  const [size, setSize] = React.useState("M");
  const sizes = ["XS", "S", "M", "L", "XL"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-7) clamp(24px,4vw,56px) var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-body)",
      marginBottom: "var(--space-6)",
      fontSize: "var(--text-sm)"
    }
  }, "\u2190 Back to collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "clamp(32px,5vw,72px)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/5",
      borderRadius: "var(--radius-lg)",
      background: product.accent || "var(--aa-silver-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/icon-color-1.png",
    alt: "",
    style: {
      width: "44%",
      opacity: 0.92
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "var(--space-4)"
    }
  }, product.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      marginBottom: "14px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: product.tagTone === "warm" ? "warm" : "sapphire"
  }, product.tag)), /*#__PURE__*/React.createElement(Eyebrow, null, product.collection), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h1)",
      fontWeight: 500,
      margin: "10px 0 8px"
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-h3)",
      color: "var(--text-secondary)",
      marginBottom: "var(--space-6)"
    }
  }, product.price), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      lineHeight: "var(--leading-relaxed)",
      maxWidth: "44ch",
      marginBottom: "var(--space-6)"
    }
  }, "Washed linen, cut for warm air and the first walk off the plane. The divi-divi mark sits quietly at the hem."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      marginBottom: "10px"
    }
  }, "Size"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px"
    }
  }, sizes.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setSize(s),
    style: {
      width: "48px",
      height: "48px",
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: 500,
      background: size === s ? "var(--action-primary)" : "transparent",
      color: size === s ? "var(--text-on-accent)" : "var(--text-primary)",
      border: `1.5px solid ${size === s ? "var(--action-primary)" : "var(--border-strong)"}`,
      transition: "all var(--dur-fast) var(--ease-standard)"
    }
  }, s)))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => onAdd(product, size),
    style: {
      width: "100%"
    }
  }, "Add to bag \u2014 ", product.price), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-5)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      color: "var(--text-secondary)",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/divi-divi-line.svg",
    alt: "",
    style: {
      height: "28px"
    }
  }), " Divi-divi mark at hem \xB7 island-made"))));
}
function BagDrawer({
  open,
  items,
  onClose,
  onCheckout
}) {
  const {
    Button
  } = window.ArriveArubaDesignSystem_4dc787;
  const {
    Close
  } = window.AAIcons;
  const total = items.reduce((s, it) => s + parseInt(it.price.replace(/\D/g, ""), 10), 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(44,79,120,.35)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition: "opacity var(--dur-base)",
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "fixed",
      top: 0,
      right: 0,
      height: "100%",
      width: "min(420px,92vw)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-lg)",
      zIndex: 50,
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform var(--dur-base) var(--ease-out)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h3)",
      fontWeight: 500
    }
  }, "Your bag"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement(Close, {
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "var(--space-5) var(--space-6)"
    }
  }, items.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      textAlign: "center",
      marginTop: "var(--space-8)"
    }
  }, "Your bag is empty. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-warm)"
    }
  }, "\u2726")) : items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: "14px",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "56px",
      height: "70px",
      borderRadius: "var(--radius-sm)",
      background: it.accent || "var(--aa-silver-soft)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/icon-color-1.png",
    alt: "",
    style: {
      width: "60%"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-base)",
      fontWeight: 500
    }
  }, it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-secondary)"
    }
  }, "Size ", it.size)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-secondary)"
    }
  }, it.price)))), items.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "var(--space-4)",
      fontSize: "var(--text-lg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-secondary)"
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: 700
    }
  }, "$", total)), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      width: "100%"
    },
    onClick: onCheckout
  }, "Checkout \u2726"))));
}
Object.assign(window, {
  AAProductDetail: ProductDetail,
  AABagDrawer: BagDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Products.jsx
try { (() => {
// Arrive Aruba — sample catalog. Garment photography not provided in the
// brand kit, so tiles render a considered placeholder (cream surface + secondary
// mark). Drop real product shots into `image` to go live.
window.AAProducts = [{
  id: "linen-shirt",
  name: "Eagle Beach Linen Shirt",
  collection: "The Arrival",
  price: "$168",
  tag: "New",
  accent: "var(--aa-silver-soft)"
}, {
  id: "resort-polo",
  name: "Divi Resort Polo",
  collection: "Everyday Island",
  price: "$128",
  tag: null,
  accent: "var(--aa-sapphire-soft)"
}, {
  id: "horizon-cap",
  name: "Horizon Cap",
  collection: "Accessories",
  price: "$58",
  tag: "Limited",
  tagTone: "warm",
  accent: "var(--aa-cream-warm)"
}, {
  id: "coast-jacket",
  name: "Coast Linen Jacket",
  collection: "The Arrival",
  price: "$240",
  tag: null,
  accent: "var(--aa-silver-soft)"
}];

// A premium placeholder tile (used until real garment photography is supplied).
function ProductTile({
  product,
  onOpen
}) {
  const {
    Tag
  } = window.ArriveArubaDesignSystem_4dc787;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpen && onOpen(product);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      textDecoration: "none",
      color: "var(--text-primary)",
      transform: hover ? "translateY(-6px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4/5",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: product.accent || "var(--aa-silver-soft)",
      boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
      transition: "box-shadow var(--dur-base) var(--ease-out)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/icon-color-1.png",
    alt: "",
    style: {
      width: "46%",
      opacity: 0.9,
      transform: hover ? "scale(1.05)" : "none",
      transition: "transform var(--dur-slow) var(--ease-out)"
    }
  }), product.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "12px",
      left: "12px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: product.tagTone === "warm" ? "warm" : "sapphire"
  }, product.tag))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-secondary)",
      marginBottom: "5px"
    }
  }, product.collection), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h4)",
      fontWeight: 500
    }
  }, product.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      color: "var(--text-secondary)"
    }
  }, product.price))));
}
window.AAProductTile = ProductTile;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Products.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
// Arrive Aruba website — page sections (Hero, Collection, Editorial, Newsletter, Footer).

function Hero({
  onNav
}) {
  const {
    Button
  } = window.ArriveArubaDesignSystem_4dc787;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      minHeight: "calc(100vh - 104px)",
      display: "flex",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/landscape-dunes.png",
    alt: "Aruba coastline",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1,
      padding: "clamp(40px,7vw,90px) clamp(24px,4vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      color: "var(--text-on-dark)",
      fontSize: "clamp(3.4rem,8vw,7rem)",
      lineHeight: 0.98,
      margin: 0,
      maxWidth: "16ch",
      textShadow: "0 2px 30px rgba(44,79,120,.35)"
    }
  }, "The island stays", /*#__PURE__*/React.createElement("br", null), "with ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "normal"
    }
  }, "you")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: "#collection",
    size: "lg",
    onClick: e => {
      e.preventDefault();
      onNav("shop");
    }
  }, "Start \u2726"))));
}
function CollectionStrip({
  onOpen
}) {
  const {
    Eyebrow,
    Button
  } = window.ArriveArubaDesignSystem_4dc787;
  const ProductTile = window.AAProductTile;
  return /*#__PURE__*/React.createElement("section", {
    id: "collection",
    style: {
      padding: "var(--space-10) clamp(24px,4vw,56px)",
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "var(--space-7)",
      gap: "24px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "The Arrival Collection"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h1)",
      fontWeight: 500,
      marginTop: "10px",
      maxWidth: "14ch"
    }
  }, "Made for the moment you step off the plane.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onOpen && onOpen(window.AAProducts[0])
  }, "Shop all \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "clamp(18px,2.5vw,36px)"
    }
  }, window.AAProducts.map(p => /*#__PURE__*/React.createElement(ProductTile, {
    key: p.id,
    product: p,
    onOpen: onOpen
  }))));
}
function EditorialBlock() {
  const {
    Eyebrow
  } = window.ArriveArubaDesignSystem_4dc787;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      alignItems: "center",
      gap: "clamp(32px,5vw,80px)",
      padding: "var(--space-10) clamp(24px,4vw,56px)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "rgba(240,240,229,.7)"
  }, "Rooted in Aruba"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h1)",
      fontWeight: 500,
      color: "var(--text-on-dark)",
      margin: "14px 0 20px",
      maxWidth: "16ch"
    }
  }, "The divi-divi tree leans with the trade winds. So do we."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lg)",
      color: "rgba(240,240,229,.82)",
      maxWidth: "46ch",
      lineHeight: "var(--leading-relaxed)"
    }
  }, "Every piece is cut for warm air and slow afternoons \u2014 linen that breathes, color drawn from the water and the light. Quiet, considered, and unmistakably of the island."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "var(--text-h3)",
      color: "var(--text-on-dark)",
      marginTop: "26px"
    }
  }, "The island stays with you. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--aa-mock-orange)"
    }
  }, "\u2726"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/divi-divi.png",
    alt: "Divi-divi tree",
    style: {
      width: "min(360px,80%)",
      filter: "brightness(0) invert(1)",
      opacity: 0.92
    }
  }))));
}
function Newsletter() {
  const {
    Input,
    Button,
    Eyebrow
  } = window.ArriveArubaDesignSystem_4dc787;
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-10) clamp(24px,4vw,56px)",
      maxWidth: "var(--container-narrow)",
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Stay close to the island"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--text-h2)",
      fontWeight: 500,
      margin: "12px 0 8px"
    }
  }, "Join the list."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-secondary)",
      marginBottom: "var(--space-6)"
    }
  }, "New arrivals, quietly. No noise."), done ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-serif)",
      fontStyle: "italic",
      fontSize: "var(--text-h3)",
      color: "var(--text-primary)"
    }
  }, "Welcome aboard. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-warm)"
    }
  }, "\u2726")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-end",
      maxWidth: "460px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    style: {
      flex: 1,
      textAlign: "left"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, "Join")));
}
function Footer({
  onNav
}) {
  const {
    Logo
  } = window.ArriveArubaDesignSystem_4dc787;
  const {
    Instagram,
    Facebook,
    TikTok,
    WhatsApp,
    Mail
  } = window.AAIcons;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-sunken)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-8) clamp(24px,4vw,56px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "32px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: "sapphire",
    height: 48,
    base: "../../"
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "32px"
    }
  }, ["Home", "Merch", "Contact"].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNav(l === "Merch" ? "shop" : l.toLowerCase()),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      color: "var(--text-secondary)",
      fontSize: "var(--text-base)"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "18px",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement(Facebook, {
    size: 20
  }), /*#__PURE__*/React.createElement(Instagram, {
    size: 20
  }), /*#__PURE__*/React.createElement(TikTok, {
    size: 19
  }), /*#__PURE__*/React.createElement(WhatsApp, {
    size: 20
  }), /*#__PURE__*/React.createElement(Mail, {
    size: 21
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      paddingBottom: "var(--space-6)",
      color: "var(--text-secondary)",
      fontSize: "var(--text-sm)"
    }
  }, "\xA9 2026 Arrive Aruba \u2014 The island stays with you. ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent-warm)"
    }
  }, "\u2726")));
}
Object.assign(window, {
  AAHero: Hero,
  AACollectionStrip: CollectionStrip,
  AAEditorialBlock: EditorialBlock,
  AANewsletter: Newsletter,
  AAFooter: Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

})();
