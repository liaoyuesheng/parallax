
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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

class Dep {
    constructor(initialData) {
        this.data = initialData;
    }
    addSub(watcher) {
        this.subs.push(watcher);
        watcher.update(this.data);
    }
    notify(data) {
        this.subs.forEach((sub) => {
            sub.update(data);
        });
    }
}

function getStyleNumbers(style) {
    return style
        .split(/\$?[^\d.]+/g)
        .filter(numStr => numStr)
        .map((numStr) => {
        return numStr[0] === '$' ? numStr : Number(numStr);
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
            if (round) {
                resultNumber = Math.round(resultNumber);
                if (resultNumber < startNumber) {
                    resultNumber = Math.ceil(startNumber);
                }
                if (resultNumber > endNumber) {
                    resultNumber = Math.floor(startNumber);
                }
            }
            return resultNumber;
        });
        let replaceIndex = 0;
        return endStyle.replace(/\$?[^\d.]+/g, () => {
            return String(resultStyleNumbers[replaceIndex++]);
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
        this.el.setAttribute('style', this.styleRenderer(progress));
    }
}

function getElements(el, container = document) {
    if (isElement(el)) {
        return [el];
    }
    if (typeof el === 'string') {
        const els = container.querySelectorAll(el);
        if (!els) {
            throw new TypeError(`[parallax warn]: Cannot find element ${el}`);
        }
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
        progress = Math.min(minProgress, progress);
    }
    return progress;
}
const defaults = {
    container: '.parallax-container',
    elementClass: '.parallax-element',
    elementAttrPrefix: 'parallax',
    startTop: 0,
};
class Parallax {
    constructor(options) {
        this.options = Object.assign({}, defaults, options);
        this.container = getElements(this.options.container, document)[0];
        const elements = getElements(this.options.elements);
        const startProgressAttrName = this.options.elementAttrPrefix + '-start-progress';
        const endProgressAttrName = this.options.elementAttrPrefix + '-end-progress';
        const startStyleAttrName = this.options.elementAttrPrefix + '-start-style';
        const endStyleAttrName = this.options.elementAttrPrefix + '-end-style';
        if (typeof this.options.endTop !== 'number') {
            this.options.endTop = -this.container.offsetHeight;
        }
        this._updateProgress();
        this.dispatcher = new Dep(this.progress);
        elements.forEach((el) => {
            const startProgress = Number(el.getAttribute(startProgressAttrName) || 0);
            const endProgress = Number(el.getAttribute(endProgressAttrName) || 0);
            const startStyle = el.getAttribute(startStyleAttrName);
            const endStyle = el.getAttribute(endStyleAttrName);
            this._dispatcher.addSub(new Watcher({
                el,
                startProgress,
                endProgress,
                startStyle,
                endStyle,
            }));
        });
        this._initScroll();
    }
    _initScroll(scrollElement) {
        const scrollEl = scrollElement ? getElements(scrollElement)[0] : document;
        scrollEl.addEventListener('scroll', () => {
            this.update();
        });
    }
    _updateProgress() {
        const containerTop = getElementTop(this.container);
        this.progress = getProgress(containerTop, this.options.startTop, this.options.endTop, 0, 1);
    }
    update(progress) {
        if (typeof progress === 'number') {
            this.progress = progress;
        }
        else {
            this._updateProgress();
        }
        this._dispatcher.notify(this.progress);
    }
}

export { Parallax as default };
//# sourceMappingURL=events.esm.js.map
