var Parallax = (function () {
  'use strict';

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeGlobal$1 = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal$1 || freeSelf || Function('return this')();

  var root$1 = root;

  /** Built-in value references. */
  var Symbol = root$1.Symbol;

  var Symbol$1 = Symbol;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$2.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  var getPrototype$1 = getPrototype;

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * Checks if `value` is likely a DOM element.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */
  function isElement(value) {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
  }

  function checkListener(listener) {
      const listenerType = typeof listener;
      if (listenerType !== 'function') {
          throw new TypeError(`The "listener" argument must be of type Function. Received type ${listenerType}`);
      }
  }
  class Events {
      constructor() {
          this._events = {};
      }
      on(eventName, listener, prepend = false) {
          checkListener(listener);
          if (!this._events[eventName]) {
              this._events[eventName] = [];
          }
          const listeners = this._events[eventName];
          if (prepend) {
              listeners.unshift(listener);
          }
          else {
              listeners.push(listener);
          }
          return this;
      }
      off(eventName, listener) {
          const listeners = this._events[eventName];
          if (!listeners)
              return this;
          if (listener) {
              checkListener(listener);
              this._events[eventName] = listeners.filter((currentListener) => {
                  return currentListener !== listener;
              });
          }
          else {
              this._events[eventName] = [];
          }
          return this;
      }
      once(eventName, listener, prepend = false) {
          checkListener(listener);
          const proxyListener = (...args) => {
              this.off(eventName, proxyListener);
              listener.apply(this, args);
          };
          return this.on(eventName, proxyListener, prepend);
      }
      emit(eventName, ...args) {
          const listeners = this._events[eventName];
          if (!listeners || !listeners.length) {
              return false;
          }
          listeners.forEach((listener) => {
              listener.apply(this, args);
          });
          return true;
      }
  }

  class Dep {
      constructor(initialData) {
          this.subs = [];
          this.data = initialData;
      }
      addSub(watcher) {
          this.subs.push(watcher);
          if (this.data !== undefined) {
              watcher.update(this.data);
          }
      }
      notify(data) {
          this.subs.forEach((sub) => {
              sub.update(data);
          });
      }
  }

  function getStyleNumbers(style) {
      return style
          .match(/[$\d.]+/g)
          .filter(numStr => numStr)
          .map((numStr) => {
          return numStr[0] === '$' ? numStr.substring(1) : Number(numStr);
      });
  }
  function getStyleRenderer(options) {
      const { startProgress, endProgress, startStyle, endStyle, } = options;
      const startStyleNumbers = getStyleNumbers(startStyle);
      const endStyleNumbers = getStyleNumbers(endStyle);
      return function (progress) {
          const resultStyleNumbers = startStyleNumbers
              .map((startNumber, index) => {
              let endNumber = endStyleNumbers[index];
              let round = false;
              if (typeof startNumber === 'string') {
                  startNumber = Number(startNumber);
                  round = true;
              }
              if (typeof endNumber === 'string') {
                  endNumber = Number(endNumber);
                  round = true;
              }
              let resultNumber = (endNumber - startNumber) * ((progress - startProgress) / (endProgress - startProgress)) + startNumber;
              const min = startNumber < endNumber ? startNumber : endNumber;
              const max = startNumber < endNumber ? endNumber : startNumber;
              resultNumber = Math.max(Math.min(resultNumber, max), min);
              if (round) {
                  resultNumber = Math.round(resultNumber);
                  if (resultNumber < min) {
                      resultNumber = Math.ceil(min);
                  }
                  if (resultNumber > max) {
                      resultNumber = Math.floor(max);
                  }
              }
              return resultNumber;
          });
          let replaceIndex = 0;
          return endStyle.replace(/[$\d.]+/g, () => {
              return String(resultStyleNumbers[replaceIndex++]).trim();
          });
      };
  }
  class Watcher {
      constructor(options) {
          this.options = options;
          this.el = this.options.el;
          this.styleRenderer = getStyleRenderer(options);
      }
      update(progress) {
          const style = this.styleRenderer(progress);
          style
              .split(';')
              .forEach((styleItem) => {
              if (!styleItem) {
                  return;
              }
              const cssKeyValue = styleItem
                  .split(':')
                  .map(s => s.trim());
              this.el.style[cssKeyValue[0]] = cssKeyValue[1];
          });
      }
  }

  const EVENT_NAMES = ['init', 'progress'];
  function checkEventName(eventName) {
      if (EVENT_NAMES.indexOf(eventName) === -1) {
          console.warn(`[parallax warn]: Event name must one of members of Array ${EVENT_NAMES}. received ${eventName}.`);
      }
  }
  function getElements(el, container = document) {
      if (isElement(el)) {
          return [el];
      }
      if (typeof el === 'string') {
          const els = container.querySelectorAll(el);
          return Array.from(els);
      }
      return Array.from(el).filter((currentEl) => {
          return isElement(currentEl);
      });
  }
  function getElementTop(element) {
      return element.getBoundingClientRect().top;
  }
  function getProgress(value, startValue, endValue, minProgress, maxProgress) {
      let progress = (value - startValue) / (endValue - startValue);
      if (typeof minProgress === 'number') {
          progress = Math.max(minProgress, progress);
      }
      if (typeof maxProgress === 'number') {
          progress = Math.min(maxProgress, progress);
      }
      return progress;
  }
  const defaults = {
      elements: '.parallax-element',
      elementAttrPrefix: 'parallax',
      customProgress: false,
      startTop: 0,
      endTop: -500,
      on: {},
  };
  class Parallax {
      constructor(options) {
          this._eventEmitter = new Events();
          this.options = Object.assign({}, defaults, options);
          if (!this.options.customProgress) {
              const container = getElements(this.options.container, document)[0];
              if (!container) {
                  console.warn(`[parallax warn]: Cannot find element: "${this.options.container}". Check the option "container"`);
                  return this;
              }
              this.container = container;
          }
          this._initElements();
          this._initEvents();
          if (!this.options.customProgress) {
              this._initScroll();
              this.update(null, true);
          }
          this._eventEmitter.emit('init', this);
      }
      _initElements() {
          this._dispatcher = new Dep();
          const elements = getElements(this.options.elements, this.container);
          if (!elements.length) {
              console.warn(`[parallax warn]: Cannot find element: "${this.options.elements}". Check the option "elements"`);
              return this;
          }
          const startProgressAttrName = this.options.elementAttrPrefix + '-start-progress';
          const endProgressAttrName = this.options.elementAttrPrefix + '-end-progress';
          const startStyleAttrName = this.options.elementAttrPrefix + '-start-style';
          const endStyleAttrName = this.options.elementAttrPrefix + '-end-style';
          elements.forEach((el) => {
              const startProgress = Number(el.getAttribute(startProgressAttrName) || 0);
              const endProgress = Number(el.getAttribute(endProgressAttrName) || 1);
              const startStyle = el.getAttribute(startStyleAttrName);
              const endStyle = el.getAttribute(endStyleAttrName);
              if (!startStyle || !endStyle) {
                  return;
              }
              this._dispatcher.addSub(new Watcher({
                  el,
                  startProgress,
                  endProgress,
                  startStyle,
                  endStyle,
              }));
          });
      }
      _initScroll(scrollElement) {
          const scrollEl = scrollElement ? getElements(scrollElement)[0] : document;
          scrollEl.addEventListener('scroll', () => {
              this.update(null, true);
          });
      }
      _initEvents() {
          EVENT_NAMES.forEach((eventName) => {
              if (Object.prototype.hasOwnProperty.call(this.options.on, eventName)) {
                  this._eventEmitter.on(eventName, this.options.on[eventName]);
              }
          });
      }
      _updateProgress() {
          const containerTop = getElementTop(this.container);
          return this.progress = getProgress(containerTop, this.options.startTop, this.options.endTop, 0, 1);
      }
      update(progress, triggerProgressEvent = false) {
          const oldProgress = this.progress;
          if (typeof progress === 'number') {
              progress = Math.max(Math.min(progress, 1), 0);
              this.progress = progress;
          }
          else {
              if (this.options.customProgress) {
                  console.warn('[parallax warn]: In customProgress mode, the "progress" argument is required and must be of type number');
                  return;
              }
              this._updateProgress();
          }
          if (oldProgress === this.progress) {
              return;
          }
          this._dispatcher.notify(this.progress);
          if (triggerProgressEvent) {
              this._eventEmitter.emit('progress', this, this.progress);
          }
      }
      on(eventName, listener) {
          checkEventName(eventName);
          this._eventEmitter.on(eventName, listener);
          return this;
      }
  }

  return Parallax;

}());
//# sourceMappingURL=parallax.iife.js.map
