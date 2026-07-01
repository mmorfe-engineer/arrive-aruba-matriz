(function () {
  var CART_KEY = 'arriveAruba.cart.v1';
  var EVENT = 'aa-cart-update';

  function readCart() {
    try {
      var parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }

  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent(EVENT, { detail: items })); } catch (e) {}
    return items;
  }

  function addToCart(item) {
    var items = readCart();
    var idx = items.findIndex(function (i) { return i.id === item.id; });
    if (idx >= 0) {
      items[idx] = Object.assign({}, items[idx], { qty: items[idx].qty + (item.qty || 1) });
    } else {
      items = [Object.assign({ qty: 1 }, item)].concat(items);
    }
    return writeCart(items);
  }

  function updateQty(id, qty) {
    var items = readCart();
    if (qty <= 0) {
      items = items.filter(function (i) { return i.id !== id; });
    } else {
      items = items.map(function (i) { return i.id === id ? Object.assign({}, i, { qty: qty }) : i; });
    }
    return writeCart(items);
  }

  function removeFromCart(id) {
    var items = readCart().filter(function (i) { return i.id !== id; });
    return writeCart(items);
  }

  function clearCart() { return writeCart([]); }

  function getCount(items) {
    items = items || readCart();
    return items.reduce(function (s, i) { return s + (i.qty || 1); }, 0);
  }

  function getTotal(items) {
    items = items || readCart();
    return items.reduce(function (s, i) { return s + (parseFloat(i.price) || 0) * (i.qty || 1); }, 0);
  }

  function onChange(cb) {
    var handler = function () { cb(readCart()); };
    window.addEventListener(EVENT, handler);
    var storageHandler = function (e) { if (!e.key || e.key === CART_KEY) handler(); };
    window.addEventListener('storage', storageHandler);
    return function () {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener('storage', storageHandler);
    };
  }

  window.AACart = {
    read: readCart,
    write: writeCart,
    add: addToCart,
    updateQty: updateQty,
    remove: removeFromCart,
    clear: clearCart,
    count: getCount,
    total: getTotal,
    onChange: onChange,
  };
})();
