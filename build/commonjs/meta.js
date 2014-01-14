/**
 *
 * @module MathLib
 */
var MathLib = {};

    

    MathLib.version = '0.6.1';
    MathLib.apery = 1.2020569031595942;
    MathLib.e = Math.E;

    // Number.EPSILON is probably coming in ES6
    // (see section 20.1.2.1 in the current draft)
    MathLib.epsilon = Number.EPSILON || (function () {
        var next, result;
        for (next = 1; 1 + next !== 1; next = next / 2) {
            result = next;
        }
        return result;
    }());
    MathLib.eulerMascheroni = 0.5772156649015329;
    MathLib.goldenRatio = 1.618033988749895;
    MathLib.pi = Math.PI;

    MathLib.isArrayLike = function (x) {
        return typeof x === 'object' && 'length' in x;
    };

    MathLib.isNative = function (fn) {
        return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
    };

    MathLib.argToRgba = function (h) {
        var r, g, b;
        h = -h / (2 * Math.PI);

        function hue2rgb (t) {
            if (t < 0) {
                t += 1;
            }
            if (t > 1) {
                t -= 1;
            }
            if (t < 1 / 6) {
                return 6 * t;
            }
            if (t < 1 / 2) {
                return 1;
            }
            if (t < 2 / 3) {
                return 4 - 6 * t;
            }
            return 0;
        }

        r = hue2rgb(h + 1 / 3);
        g = hue2rgb(h);
        b = hue2rgb(h - 1 / 3);

        return [r * 255, g * 255, b * 255, 255];
    };

    MathLib.extendObject = function (dest, src) {
        for (var prop in src) {
            if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
                dest[prop] = MathLib.extendObject(dest[prop], src[prop]);
            } else {
                dest[prop] = src[prop];
            }
        }
        return dest;
    };

    MathLib.colorConvert = function (n) {
        if (typeof n === 'number') {
            n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
            return '#' + ('00000' + n.toString(16)).slice(-6);
        }
        return n;
    };

    MathLib.coerceTo = function (obj, type) {
        if (typeof obj === 'object') {
            return obj.coerceTo(type);
        }

        if (typeof obj === 'number') {
            if (type === 'integer') {
                return new MathLib.Integer(obj);
            }
            if (type === 'rational') {
                return new MathLib.Rational(obj);
            }
            if (type === 'number') {
                return obj;
            }
            if (type === 'complex') {
                return new MathLib.Complex(obj);
            }
        }
    };

    MathLib.coerce = function () {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
        var type = function (x) {
            return x.type || typeof x;
        }, numberTypes = ['integer', 'rational', 'number', 'complex'], numberType = numberTypes[Math.max.apply(null, args.map(function (x) {
            return numberTypes.indexOf(type(x));
        }))];

        return args.map(function (x) {
            return MathLib.coerceTo(x, numberType);
        });
    };

    var flatten = function (a) {
        var flattendArray = [];
        a.forEach(function (x) {
            if (Array.isArray(x)) {
                flattendArray = flattendArray.concat(flatten(x));
            } else {
                flattendArray.push(x);
            }
        });
        return flattendArray;
    };

    var errors = [], warnings = [];

    /**
    * ### [MathLib.on()](http://mathlib.de/en/docs/on)
    * Binds an event handler to an event.
    *
    * @param {string} The name of the event.
    * @param {function} The callback function.
    */
    MathLib.on = function (type, callback) {
        if (type === 'error') {
            errors.push(callback);
        } else if (type === 'warning') {
            warnings.push(callback);
        }
    };

    /**
    * ### [MathLib.off()](http://mathlib.de/en/docs/off)
    * Unbinds an event handler from an event.
    *
    * @param {string} The name of the event.
    * @param {function} The callback function.
    */
    MathLib.off = function (type, callback) {
        if (type === 'error') {
            errors = errors.filter(function (x) {
                return x !== callback;
            });
        } else if (type === 'warning') {
            warnings = warnings.filter(function (x) {
                return x !== callback;
            });
        }
    };

    /**
    * ### MathLib.error()
    * Fires an error event.
    *
    * @param {oject} An object describing the error further.
    */
    MathLib.error = function (details) {
        errors.forEach(function (cb) {
            cb(details);
        });
    };

    /**
    * ### MathLib.warning()
    * Fires a waring event.
    *
    * @param {object} An object describing the warning further.
    */
    MathLib.warning = function (details) {
        warnings.forEach(function (cb) {
            cb(details);
        });
    };

    module.exports = MathLib

