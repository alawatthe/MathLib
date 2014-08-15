/**
 *
 * @module MathLib
 */
var MathLib = {};

    'use strict';

    /*es6
    import {warning} from 'meta';
    import {Complex} from 'Complex';
    import {Integer} from 'Integer';
    import {Rational} from 'Rational';
    es6*/
    MathLib.version = '0.7.3';
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

    MathLib.isNative = function (fn) {
        return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
    };

    MathLib.argToRgba = function (h) {
        var r, g, b;
        h = -h / (2 * Math.PI);

        function hue2rgb(t) {
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

    var errors = [], warnings = [];

    /**
    * ### [MathLib.on()](http://mathlib.de/en/docs/on)
    * Binds an event handler to an event.
    *
    * @param {string} type - The name of the event.
    * @param {function} callback - The callback function.
    */
    MathLib.on = function (type, callback) {
        if (type === 'error') {
            console.warn('MathLib.on("error", fn) is deprecated');
            errors.push(callback);
        } else if (type === 'warning') {
            warnings.push(callback);
        }
    };

    /**
    * ### [MathLib.off()](http://mathlib.de/en/docs/off)
    * Unbinds an event handler from an event.
    *
    * @param {string} type - The name of the event.
    * @param {function} callback - The callback function.
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
    * @param {oject} details - An object describing the error further.
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
    * @param {object} details - An object describing the warning further.
    */
    MathLib.warning = function (details) {
        warnings.forEach(function (cb) {
            cb(details);
        });
    };

    /**
    * Custom toString function
    *
    * @param {any} x - The value to which the String should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    MathLib.toString = function (x, options) {
        if (typeof options === "undefined") { options = {}; }
        var str, base = options.base || 10;

        if (Array.isArray(x)) {
            return '[' + x.map(function (entry) {
                return MathLib.toString(entry, options);
            }).join() + ']';
        }

        if (typeof x === 'object') {
            return x.toString(options);
        }

        if (typeof x === 'number') {
            if (!MathLib.isFinite(x)) {
                return x.toString();
            }

            str = Math.abs(x).toString(base);

            if (x < 0) {
                str = '-' + str;
            } else if (options.sign) {
                str = '+' + str;
            }

            if (options.baseSubscript) {
                if (base > 9) {
                    str += '&#x208' + Math.floor(base / 10) + ';';
                }
                str += '&#x208' + (base % 10) + ';';
            }

            return str;
        }

        if (typeof x === 'boolean') {
            return x.toString();
        }

        /* istanbul ignore else */
        if (typeof x === 'string') {
            if (options.quotes) {
                return options.quotes[0] + x + options.quotes[1];
            }
            return '"' + x + '"';
        }
    };

    /**
    * A content MathML string representation
    *
    * @param {any} x - The value to which the MathML should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    MathLib.toContentMathML = function (x, options) {
        if (typeof options === "undefined") { options = {}; }
        var base = options.base || 10;

        if (Array.isArray(x)) {
            if (options.strict) {
                return '<apply><csymbol cd="list1">list</csymbol>' + x.map(function (entry) {
                    return MathLib.toContentMathML(entry, options);
                }).join('') + '</apply>';
            } else {
                return '<list>' + x.map(function (entry) {
                    return MathLib.toContentMathML(entry, options);
                }).join('') + '</list>';
            }
        }

        if (typeof x === 'object' && 'toContentMathML' in x) {
            return x.toContentMathML(options);
        }

        if (typeof x === 'number') {
            if (MathLib.isNaN(x)) {
                if (options.strict) {
                    return '<csymbol cd="nums1">NaN</csymbol>';
                } else {
                    return '<notanumber/>';
                }
            } else if (!MathLib.isFinite(x)) {
                if (x === Infinity) {
                    if (options.strict) {
                        return '<csymbol cd="nums1">infinity</csymbol>';
                    } else {
                        return '<infinity/>';
                    }
                } else {
                    if (options.strict) {
                        return '<apply><csymbol cd="arith1">times</csymbol><cn>-1</cn><csymbol cd="nums1">infinity</csymbol></apply>';
                    } else {
                        return '<apply><times/><cn>-1</cn><infinity/></apply>';
                    }
                }
            }

            if (base === 10) {
                return '<cn type="double">' + MathLib.toString(x) + '</cn>';
            }

            if (options.strict) {
                return '<apply><csymbol cd="nums1">based_float</csymbol>' + '<cn type="integer">' + base + '</cn>' + '<cs>' + MathLib.toString(x, { base: base }) + '</cs>' + '</apply>';
            }

            return '<cn type="real" base="' + base + '">' + MathLib.toString(x, { base: base }) + '</cn>';
        }

        if (typeof x === 'boolean') {
            if (options.strict) {
                return '<csymbol cd="logic1">' + x + '</csymbol>';
            }
            return '<' + x + '/>';
        }

        /* istanbul ignore else */
        if (typeof x === 'string') {
            return '<cs>' + x + '</cs>';
        }
    };

    /**
    * A LaTeX string representation
    *
    * @param {any} x - The value to which the LaTeX should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    MathLib.toLaTeX = function (x, options) {
        if (typeof options === "undefined") { options = {}; }
        var base = options.base || 10, str = MathLib.toString(x, { base: base, sign: options.sign }), stringToLaTeX = function (str) {
            return str.replace(/\\/g, '\\textbackslash').replace(/#/g, '\\#').replace(/\$/g, '\\$').replace(/%/g, '\\%').replace(/&/g, '\\&').replace(/_/g, '\\_').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\^/g, '\\^{}').replace(/\\textbackslash/g, '\\textbackslash{}').replace(/~/g, '\\~{}').replace(/\"/g, '\\texttt{"}').replace(/'/g, '{\\ttfamily\\char\'15}');
        };

        if (Array.isArray(x)) {
            return '[' + x.map(function (entry) {
                return MathLib.toLaTeX(entry, options);
            }).join() + ']';
        }

        if (typeof x === 'object' && 'toLaTeX' in x) {
            return x.toLaTeX(options);
        }

        if (typeof x === 'number') {
            if (MathLib.isNaN(x)) {
                return '\\text{ NaN }';
            } else if (x === Infinity) {
                return '\\infty';
            } else if (x === -Infinity) {
                return '-\\infty';
            }

            if (options.baseSubscript) {
                str += '_{' + base + '}';
            }

            return str;
        }

        if (typeof x === 'boolean') {
            return '\\text{ ' + x + ' }';
        }

        /* istanbul ignore else */
        if (typeof x === 'string') {
            x = stringToLaTeX(x);

            if (options.quotes) {
                return stringToLaTeX(options.quotes[0]) + '\\texttt{' + x + '}' + stringToLaTeX(options.quotes[1]);
            }
            return '\\texttt{"' + x + '"}';
        }
    };

    /**
    * A presentation MathML string representation
    *
    * @param {any} x - The value to which the MathML should be generated
    * @param {object} [options] - Optional options to style the output
    * @return {string}
    */
    MathLib.toMathML = function (x, options) {
        if (typeof options === "undefined") { options = {}; }
        var str, base = options.base || 10;

        if (Array.isArray(x)) {
            return '<mrow><mo>[</mo>' + x.map(function (entry) {
                return MathLib.toMathML(entry, options);
            }).join('<mo>,</mo>') + '<mo>]</mo></mrow>';
        }

        if (typeof x === 'object' && 'toMathML' in x) {
            return x.toMathML(options);
        }

        if (typeof x === 'number') {
            if (options.sign) {
                str = MathLib.toString(Math.abs(x), { base: base });
            } else {
                str = MathLib.toString(x, { base: base });
            }

            str = '<mn>' + str + '</mn>';

            if (MathLib.isNaN(x)) {
                return '<mi>NaN</mi>';
            } else if (x === Infinity) {
                return '<mi>&#x221e;</mi>';
            } else if (x === -Infinity) {
                return '<mrow><mo>-</mo><mi>&#x221e;</mi></mrow>';
            }

            if (options.baseSubscript) {
                str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
            }

            if (options.sign) {
                if (x < 0) {
                    str = '<mo>-</mo>' + str;
                } else {
                    str = '<mo>+</mo>' + str;
                }
            }

            return str;
        }

        if (typeof x === 'boolean') {
            return '<mi>' + x + '</mi>';
        }

        /* istanbul ignore else */
        if (typeof x === 'string') {
            if (options.quotes) {
                return '<ms lquote="' + options.quotes[0] + '" rquote="' + options.quotes[1] + '">' + x + '</ms>';
            }
            return '<ms>' + x + '</ms>';
        }
    };
    module.exports = MathLib

