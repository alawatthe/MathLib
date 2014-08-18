/*!
 * MathLib JavaScript Library v0.7.3
 * http://mathlib.de/
 *
 * Copyright 2012 - 2014 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2014-08-18
 */

var __extends = this.__extends || function (d, b) {
        for (var p in b) {
            /* istanbul ignore else */
            if (b.hasOwnProperty(p)) {
                d[p] = b[p];
            }
        }
        function __() {
            this.constructor = d;
        }
        __.prototype = b.prototype;
        d.prototype = new __();
	};

/**
 *
 * @module MathLib
 */
var MathLib = {};
(function (MathLib) {
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
    'export MathLib';
})(MathLib);


(function (MathLib) {
    'use strict';

    /// no import
    /**
    * MathLib.CoercionError is thrown if it is not possible to perform the coercion.
    *
    */
    MathLib.CoercionError = function (message, options) {
        var tmp = Error.apply(this, arguments);
        tmp.name = this.name = 'CoercionError';

        this.constructor = MathLib.CoercionError;
        this.message = tmp.message;
        this.method = options.method;
        this.stack = tmp.stack;
        this.type = 'coercionError';
    };

    MathLib.CoercionError.prototype = new Error();
})(MathLib);


(function (MathLib) {
    'use strict';

    /// no import
    /**
    * MathLib.EvaluationError is thrown if it is not possible to perform the Evaluation.
    .*
    */
    MathLib.EvaluationError = function (message, options) {
        var tmp = Error.apply(this, arguments);
        tmp.name = this.name = 'EvaluationError';

        this.constructor = MathLib.EvaluationError;
        this.message = tmp.message;
        this.method = options.method;
        this.stack = tmp.stack;
        this.type = 'evaluationError';
    };

    MathLib.EvaluationError.prototype = new Error();
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {evaluate, negative, sign} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Complex} from 'Complex';
    import {Functn} from 'Functn';
    import {Integer} from 'Integer';
    import {Matrix} from 'Matrix';
    import {Rational} from 'Rational';
    import {Vector} from 'Vector';
    es6*/
    /// no import
    // There is no DOMParser in Node, so we have to require one (done via a regexp replace)
    /// DOMParser
    /**
    * MathLib.Expression is the MathLib implementation of symbolic expressions
    *
    * @class
    * @this {Expression}
    */
    var Expression = (function () {
        function Expression(expr) {
            if (typeof expr === "undefined") { expr = {}; }
            this.type = 'expression';
            var prop;

            if (typeof expr === 'string') {
                expr = MathLib.Expression.parse(expr);
            }
            for (prop in expr) {
                if (expr.hasOwnProperty(prop)) {
                    this[prop] = expr[prop];
                }
            }
        }
        /**
        * Constructs a constant expression.
        *
        * @param {String} n The constant to generate an expression from
        * @return {Expression}
        */
        Expression.constant = function (n) {
            return new MathLib.Expression({
                subtype: 'constant',
                value: n
            });
        };

        /**
        * Constructs a number expression.
        *
        * @param {String} n The number to generate an expression from
        * @return {Expression}
        */
        Expression.number = function (n) {
            return new MathLib.Expression({
                subtype: 'number',
                value: n
            });
        };

        /**
        * Parses a content MathML string and returns an Expression.
        *
        * @param {string} MathMLString The string to be parsed as MathML
        * @return {Expression}
        */
        Expression.parseContentMathML = function (MathMLString) {
            var MathMLdoc, tokenizer = new DOMParser();

            // Whitespace normalization (see section 2.1.7 of the MathML 3 specification)
            // TODO: Find a better way of normalizing whitespace.
            MathMLString = MathMLString.split('cs>').map(function (x, i) {
                // We are not in an cs element.
                // 1. normalize multiple spaces to one space
                //    ("whitespace internal to content of the element is collapsed canonically,
                //    i.e., each sequence of 1 or more whitespace characters is replaced with one space character")
                // 2. Remove whitespace outside of token elements
                //    ("MathML ignores whitespace occurring outside token elements.")
                //    and remove whitespace at the beginning and end of elements
                //    ("All whitespace at the beginning and end of the content is removed").
                if (i % 2 === 0) {
                    return x.replace(/\s+/g, ' ').replace(/ </g, '<').replace(/> /g, '>');
                } else {
                    return x;
                }
            }).join('cs>');

            // Gives an error in Firefox
            // MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml');
            MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');

            var handler = {
                apply: function (node) {
                    var functnName, expr, cd, children = Array.prototype.slice.call(node.childNodes), functnNameNode = children.shift(), isMethod = true, functnNames = {
                        arccosh: 'arcosh',
                        arccoth: 'arcoth',
                        arccsch: 'arcsch',
                        arcsech: 'arsech',
                        arcsinh: 'arsinh',
                        arctanh: 'artanh',
                        ceiling: 'ceil',
                        ident: 'identity',
                        power: 'pow',
                        remainder: 'rem',
                        setdifference: 'without',
                        unary_minus: 'negative'
                    };

                    if (functnNameNode.nodeName === 'csymbol') {
                        functnName = functnNameNode.textContent;
                        cd = functnNameNode.getAttribute('cd');
                    } else {
                        functnName = functnNameNode.nodeName;
                    }

                    // Change some function names for functions with different names in MathLib
                    if (functnName in functnNames) {
                        functnName = functnNames[functnName];
                    } else if (functnName === 'minus' && children.length === 1) {
                        functnName = 'negative';
                    } else if (functnName === 'arctan' && cd === 'transc2') {
                        functnName = 'arctan2';
                    }

                    if (functnName === 'list') {
                        return parser(children);
                    }

                    if (functnName === 'rational') {
                        var parsedChildren = parser(children);
                        return new MathLib.Rational(parsedChildren[0], parsedChildren[1]);
                    }

                    if (functnName === 'based_integer') {
                        var parsedChildren = parser(children);
                        return new MathLib.Integer(parsedChildren[1], { base: parsedChildren[0] });
                    }

                    if (MathLib[functnName]) {
                        isMethod = false;
                    }

                    expr = new MathLib.Expression({
                        subtype: 'functionCall',
                        value: functnName,
                        isMethod: isMethod,
                        content: parser(children)
                    });

                    if (functnName in MathLib && MathLib[functnName].type === 'functn') {
                        if (MathLib[functnName].expression.content[0].hasOwnProperty('cdgroup')) {
                            expr.cdgroup = MathLib[functnName].expression.content[0].cdgroup;
                        }

                        if (MathLib[functnName].expression.content[0].hasOwnProperty('contentMathMLName')) {
                            expr.contentMathMLName = MathLib[functnName].expression.content[0].contentMathMLName;
                        }

                        if (MathLib[functnName].expression.content[0].hasOwnProperty('toContentMathML')) {
                            expr.toContentMathML = MathLib[functnName].expression.content[0].toContentMathML;
                        }

                        if (MathLib[functnName].expression.content[0].hasOwnProperty('toLaTeX')) {
                            expr.toLaTeX = MathLib[functnName].expression.content[0].toLaTeX;
                        }

                        if (MathLib[functnName].expression.content[0].hasOwnProperty('toMathML')) {
                            expr.toMathML = MathLib[functnName].expression.content[0].toMathML;
                        }

                        if (MathLib[functnName].expression.content[0].hasOwnProperty('toString')) {
                            expr.toString = MathLib[functnName].expression.content[0].toString;
                        }
                    }

                    return expr;
                },
                ci: function (node) {
                    return new MathLib.Expression({
                        subtype: 'variable',
                        value: node.textContent
                    });
                },
                cn: function (node) {
                    var type = node.getAttribute('type');

                    if (type === 'integer') {
                        var base = node.getAttribute('base') !== null ? Number(node.getAttributes('base')) : 10;
                        return new MathLib.Integer(node.textContent.trim(), { base: base });
                    } else if (type === 'real' || type === null || type === '') {
                        // TODO: adapt this, once the Real class exists
                        return Number(node.textContent);
                    } else if (type === 'double') {
                        return Number(node.textContent);
                    } else if (type === 'rational') {
                        return new MathLib.Rational(new MathLib.Integer(node.childNodes[0].textContent), new MathLib.Integer(node.childNodes[2].textContent));
                    } else if (type === 'complex-cartesian') {
                        return new MathLib.Complex(Number(node.childNodes[0].textContent), Number(node.childNodes[2].textContent));
                    } else if (type === 'complex-polar') {
                        return MathLib.Complex.polar(Number(node.childNodes[0].textContent), Number(node.childNodes[2].textContent));
                        /*
                        return new MathLib.Expression({
                        value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                        subtype: 'complexNumber',
                        mode: 'polar'
                        });
                        */
                    }
                    // else if (type === 'constant') {
                    //   TODO: implement
                    // }
                },
                cs: function (node) {
                    return node.textContent;
                },
                csymbol: function (node) {
                    var cd = node.getAttribute('cd');

                    if (cd === 'logic1') {
                        if (node.textContent === 'true') {
                            return true;
                        }
                        if (node.textContent === 'false') {
                            return false;
                        }
                    }
                },
                lambda: function (node) {
                    var doa, apply, bvar = [], i = 0;

                    while (node.childNodes[i].nodeName === 'bvar') {
                        bvar.push(MathLib.Expression.variable(node.childNodes[i].childNodes[0].textContent));
                        i++;
                    }

                    if (node.childNodes[i].nodeName === 'domainofapplication') {
                        doa = node.childNodes[i].childNodes[0].nodeName;

                        if (doa === 'integers') {
                            doa = MathLib.Integer;
                        } else if (doa === 'rationals') {
                            doa = MathLib.Rational;
                        } else if (doa === 'complexes') {
                            doa = MathLib.Complex;
                        }
                        i++;
                    }

                    apply = node.childNodes[i];

                    if (doa) {
                        return new MathLib.Expression({
                            subtype: 'functionDefinition',
                            domain: doa,
                            args: bvar,
                            content: [parser(apply)]
                        });
                    } else {
                        return new MathLib.Expression({
                            subtype: 'functionDefinition',
                            args: bvar,
                            content: [parser(apply)]
                        });
                    }
                },
                list: function (node) {
                    return parser(Array.prototype.slice.call(node.childNodes));
                },
                math: function (node) {
                    return parser(node.childNodes[0]);
                },
                matrix: function (node) {
                    return new MathLib.Matrix(Array.prototype.slice.call(node.childNodes).map(handler.matrixrow));
                },
                matrixrow: function (node) {
                    return Array.prototype.map.call(node.childNodes, parser);
                },
                set: function (node) {
                    return new MathLib.Set(parser(Array.prototype.slice.call(node.childNodes)));
                },
                '#text': function (node) {
                    return node.nodeValue;
                },
                vector: function (node) {
                    return new MathLib.Vector(parser(Array.prototype.slice.call(node.childNodes)));
                },
                false: function () {
                    return false;
                },
                pi: function () {
                    return MathLib.Expression.constant('pi');
                },
                true: function () {
                    return true;
                }
            };

            var parser = function (node) {
                if (Array.isArray(node)) {
                    var nodes = node.map(parser);
                    return nodes;
                }

                return handler[node.nodeName](node);
            };

            return parser(MathMLdoc.childNodes[0]);
        };

        /**
        * Constructs a variable expression.
        *
        * @param {string} n - The variable to generate an expression from
        * @return {Expression}
        */
        Expression.variable = function (n) {
            return new MathLib.Expression({
                subtype: 'variable',
                value: n
            });
        };

        /**
        * Compares two expressions
        *
        * @param {Expression} expr The expression to compare
        * @return {number}
        */
        Expression.prototype.compare = function (expr) {
            return MathLib.sign(this.toString().localeCompare(expr.toString()));
        };

        /**
        * Copies the Expression
        * @return {Expression} The copied expression
        */
        Expression.prototype.copy = function () {
            return this.map(function (x) {
                return x;
            });
        };

        /**
        * Evaluates the symbolic expression
        *
        * @return {any}
        */
        Expression.prototype.evaluate = function () {
            if (this.subtype === 'assignment') {
                var value = this.value;
                this.content.forEach(function (variable) {
                    MathLib.Expression.variables[variable.value] = value;
                });
                return this.value;
            }
            if (this.subtype === 'binaryOperator') {
                return MathLib[this.name].apply(null, this.content.map(function (x) {
                    return MathLib.evaluate(x);
                }));
            }
            if (this.subtype === 'brackets') {
                return MathLib.evaluate(this.content);
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return new MathLib.Complex(this.value[0].evaluate(), this.value[1].evaluate());
                } else if (this.mode === 'polar') {
                    return MathLib.Complex.polar(this.value[0].evaluate(), this.value[1].evaluate());
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return Math.PI;
                }
            }
            if (this.subtype === 'functionCall') {
                if (this.isMethod) {
                    var args = this.content.map(function (x) {
                        return MathLib.evaluate(x);
                    }), _this = args.shift();

                    return _this[this.value].apply(_this, args);
                } else {
                    return MathLib[this.value].apply(null, this.content.map(function (x) {
                        return MathLib.evaluate(x);
                    }));
                }
            }
            if (this.subtype === 'functionDefinition') {
                return MathLib.Functn(this.content[0].evaluate(), {
                    name: 'f',
                    expression: this
                });
            }
            if (this.subtype === 'number') {
                return parseFloat(this.value);
            }
            if (this.subtype === 'naryOperator') {
                return MathLib[this.name].apply(null, this.content.map(function (x) {
                    return MathLib.evaluate(x);
                }));
            }
            if (this.subtype === 'variable') {
                if (this.value in MathLib.Expression.variables) {
                    return MathLib.evaluate(MathLib.Expression.variables[this.value]);
                }
                return this;
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return MathLib.negative(this.content.evaluate());
                }
                return this.content.evaluate();
            }
        };

        /**
        * Maps the expression tree over to an other expression tree.
        *
        * @param {function} f The function to apply to all the nodes in the tree.
        * @return {Expression}
        */
        Expression.prototype.map = function (f) {
            var prop, properties = {}, mappedProperties;

            for (prop in this) {
                if (this.hasOwnProperty(prop) && prop !== 'content') {
                    if (Array.isArray(this[prop])) {
                        properties[prop] = this[prop].map(f);
                    } else {
                        properties[prop] = this[prop];
                    }
                }
            }

            mappedProperties = f(properties);
            if (Array.isArray(this.content)) {
                mappedProperties.content = this.content.map(function (expr) {
                    if (expr.type === 'expression') {
                        return expr.map(f);
                    } else {
                        return f(expr);
                    }
                });
            } else if (this.content) {
                mappedProperties.content = this.content.map(f);
            }

            if (typeof mappedProperties === 'object') {
                return new MathLib.Expression(mappedProperties);
            } else {
                return mappedProperties;
            }
        };

        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        Expression.prototype.toContentMathML = function () {
            if (this.subtype === 'assignment') {
                var str, i, ii;

                str = '<apply><csymbol cd="prog1">assignment</csymbol>' + this.content.map(MathLib.toContentMathML).join('<apply><csymbol cd="prog1">assignment</csymbol>') + MathLib.toContentMathML(this.value);

                for (i = 0, ii = this.content.length; i < ii; i++) {
                    str += '</apply>';
                }

                return str;
            }
            if (this.subtype === 'binaryOperator') {
                var op = this.name === 'pow' ? 'power' : this.name;

                return '<apply><csymbol cd="arith1">' + op + '</csymbol>' + this.content[0].toContentMathML() + this.content[1].toContentMathML() + '</apply>';
            }
            if (this.subtype === 'brackets') {
                return this.content.toContentMathML();
            }
            if (this.subtype === 'number') {
                return '<cn>' + this.value + '</cn>';
            }
            if (this.subtype === 'variable') {
                return '<ci>' + this.value + '</ci>';
            }
            if (this.subtype === 'naryOperator') {
                return '<apply><csymbol cd="arith1">' + this.name + '</csymbol>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }).join('') + '</apply>';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '<apply><csymbol cd="arith1">unary_minus</csymbol>' + this.content.toContentMathML() + '</apply>';
                }
                return this.content.toContentMathML();
            }
            if (this.subtype === 'functionCall') {
                // There are some functions which have different names in MathML
                var conversion = {
                    arcosh: 'arccosh',
                    arcoth: 'arccoth',
                    arcsch: 'arccsch',
                    arsech: 'arcsech',
                    arsinh: 'arcsinh',
                    artanh: 'arctanh',
                    identity: 'ident'
                }, funcName;

                if (this.value in conversion) {
                    funcName = conversion[this.value];
                } else {
                    funcName = this.value;
                }

                return '<apply><csymbol cd="' + this.cdgroup + '">' + this.contentMathMLName + '</csymbol>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }).join('') + '</apply>';
            }

            if (this.subtype === 'functionDefinition') {
                return '<lambda><bvar><ci>' + this.args.join('</ci></bvar><bvar><ci>') + '</ci></bvar>' + this.content.map(function (expr) {
                    return expr.toContentMathML();
                }) + '</lambda>';
            }
        };

        /**
        * Convert the expression to a LaTeX string
        *
        * @return {string}
        */
        Expression.prototype.toLaTeX = function () {
            var op, amsmath;

            if (this.subtype === 'assignment') {
                return this.content.map(MathLib.toLaTeX).join(' := ') + ' := ' + MathLib.toLaTeX(this.value);
            }
            if (this.subtype === 'binaryOperator') {
                var str;

                if (this.value === '/') {
                    str = '\\frac{' + this.content[0].toLaTeX() + '}';
                } else {
                    str = this.content[0].toLaTeX() + this.value;
                }

                str += this.value !== '-' ? '{' : '';
                str += this.content[1].toLaTeX();
                str += this.value !== '-' ? '}' : '';

                return str;
            }
            if (this.subtype === 'brackets') {
                return '\\left(' + this.content.toLaTeX() + '\\right)';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return this.value[0] + '+' + this.value[1] + 'i';
                } else if (this.mode === 'polar') {
                    return this.value[0] + ' \\cdot e^{' + this.value[1] + 'i}';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return '\\pi';
                }
            }
            if (this.subtype === 'number' || this.subtype === 'variable') {
                return this.value;
            }
            if (this.subtype === 'naryOperator') {
                op = this.value === '*' ? '\\cdot' : this.value;
                return this.content.reduce(function (old, cur, idx) {
                    return old + (idx ? op : '') + cur.toLaTeX();
                }, '');
            }
            if (this.subtype === 'string') {
                return '\\texttt{"{}' + this.value + '"}';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '-' + this.content.toLaTeX();
                }
                return this.content.toLaTeX();
            }
            if (this.subtype === 'functionCall') {
                // These operators are predefined by amsmath.
                // (There are more predefined ones, but these are the useful ones.)
                amsmath = [
                    'arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim',
                    'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'
                ];
                if (amsmath.indexOf(this.value) + 1) {
                    return '\\' + this.value + '\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                        return old + (idx ? ', ' : '') + MathLib.toLaTeX(cur);
                    }, '') : 'x') + '\\right)';
                } else {
                    return '\\operatorname{' + this.value + '}\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                        return old + (idx ? ', ' : '') + cur.toLaTeX();
                    }, '') : 'x') + '\\right)';
                }
            }

            if (this.subtype === 'functionDefinition') {
                return (this.args.length === 1 ? this.args[0] : '\\left(' + this.args.join(', ') + '\\right)') + ' \\longmapsto ' + (this.content.length === 1 ? this.content[0].toLaTeX() : '\\left(' + this.content.map(function (expr) {
                    return expr.toLaTeX();
                }).join(', ') + '\\right)');
            }
        };

        /**
        * Convert the Expression to MathML.
        *
        * @return {string}
        */
        Expression.prototype.toMathML = function () {
            if (this.subtype === 'assignment') {
                return this.content.map(MathLib.toMathML).join('<mo>:=</mo>') + '<mo>:=</mo>' + MathLib.toMathML(this.value);
            }
            if (this.subtype === 'binaryOperator') {
                if (this.value === '-') {
                    return this.content[0].toMathML() + '<mo>-</mo>' + this.content[1].toMathML();
                }
                if (this.value === '/') {
                    return '<mfrac>' + this.content[0].toMathML() + this.content[1].toMathML() + '</mfrac>';
                }
                if (this.value === '^') {
                    return '<msup>' + this.content[0].toMathML() + this.content[1].toMathML() + '</msup>';
                }
            }
            if (this.subtype === 'brackets') {
                return '<mrow><mo>(</mo>' + this.content.toMathML() + '<mo>)</mo></mrow>';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return '<mrow>' + this.value[0].toMathML() + '<mo>+</mo>' + this.value[1].toMathML() + '<mi>i</mi></mrow>';
                } else if (this.mode === 'polar') {
                    return this.value[0].toMathML() + '<msup><mi>e</mi><mrow>' + this.value[1].toMathML() + '<mi>i</mi></mrow></msup>';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return '<mi>&pi;</mi>';
                }
            }
            if (this.subtype === 'number') {
                return '<mn>' + this.value + '</mn>';
            }
            if (this.subtype === 'variable') {
                return '<mi>' + this.value + '</mi>';
            }
            if (this.subtype === 'naryOperator') {
                return '<mrow>' + this.content.map(function (expr) {
                    return expr.toMathML();
                }).join('<mo>' + (this.value === '*' ? '&middot;' : this.value) + '</mo>') + '</mrow>';
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '<mo>-</mo>' + this.content.toMathML();
                }
                return this.content.toMathML();
            }
            if (this.subtype === 'functionCall') {
                return '<mrow><mi>' + this.value + '</mi><mo>&af;</mo><mrow><mo>(</mo>' + (this.content.length ? this.content.map(function (expr) {
                    return expr.toMathML();
                }).join('<mo>,</mo>') : '<mi>x</mi>') + '<mo>)</mo></mrow></mrow>';
            }

            if (this.subtype === 'functionDefinition') {
                return '<mrow>' + (this.args.length === 1 ? '<mi>' + this.args[0] + '</mi>' : '<mrow><mo>(</mo><mi>' + this.args.join('</mi><mo>,</mo><mi>') + '</mi><mo>)</mo></mrow>') + '<mo>&#x27FC;</mo>' + (this.content.length === 1 ? this.content[0].toMathML() : '<mrow><mo>(</mo>' + this.content.map(function (expr) {
                    return expr.toMathML();
                }) + '<mo>)</mo></mrow>') + '</mrow>';
            }
        };

        /**
        * A custom toString function
        *
        * @return {string}
        */
        Expression.prototype.toString = function () {
            var _this = this;
            if (this.subtype === 'assignment') {
                return this.content.map(MathLib.toString).join(' := ') + ' := ' + MathLib.toString(this.value);
            }
            if (this.subtype === 'binaryOperator') {
                return this.content[0].toString() + this.value + this.content[1].toString();
            }
            if (this.subtype === 'brackets') {
                return '(' + this.content.toString() + ')';
            }
            if (this.subtype === 'complexNumber') {
                if (this.mode === 'cartesian') {
                    return this.value[0] + '+' + this.value[1] + 'i';
                } else if (this.mode === 'polar') {
                    return this.value[0] + '*e^' + this.value[1] + 'i';
                }
            }
            if (this.subtype === 'constant') {
                if (this.value === 'pi') {
                    return 'π';
                }
            }
            if (this.subtype === 'number' || this.subtype === 'variable') {
                return this.value;
            }
            if (this.subtype === 'naryOperator') {
                return this.content.reduce(function (old, cur) {
                    return old + _this.value + cur;
                });
            }
            if (this.subtype === 'unaryOperator') {
                if (this.value === '-') {
                    return '-' + this.content.toString();
                }
                return this.content.toString();
            }
            if (this.subtype === 'functionCall') {
                return this.value + '(' + (this.content.length ? this.content.map(function (expr) {
                    return expr.toString();
                }).join(', ') : 'x') + ')';
            }
            if (this.subtype === 'functionDefinition') {
                return (this.args.length === 1 ? this.args[0] : '(' + this.args.join(', ') + ')') + ' ⟼ ' + (this.content.length === 1 ? this.content[0].toString() : '(' + this.content.map(function (expr) {
                    return expr.toString();
                }).join(', ') + ')');
            }
        };
        Expression.parse = function (str) {
            var Token, Lexer, Parser;

            Token = {
                Operator: 'Operator',
                Identifier: 'Identifier',
                Number: 'Number'
            };

            Lexer = function () {
                var expression = '', length = 0, index = 0, marker = 0, T = Token;

                function peekNextChar(n) {
                    if (typeof n === "undefined") { n = 1; }
                    var idx = index;
                    return ((idx < length) ? expression.substr(idx, n) : '\x00');
                }

                function getNextChar() {
                    var ch = '\x00', idx = index;
                    if (idx < length) {
                        ch = expression.charAt(idx);
                        index += 1;
                    }
                    return ch;
                }

                function isWhiteSpace(ch) {
                    return (ch === '\u0009') || (ch === ' ') || (ch === '\u00A0');
                }

                function isLetter(ch) {
                    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
                }

                function isDecimalDigit(ch) {
                    return (ch >= '0') && (ch <= '9');
                }

                function createToken(type, value) {
                    return {
                        type: type,
                        value: value,
                        start: marker,
                        end: index - 1
                    };
                }

                function skipSpaces() {
                    var ch;

                    while (index < length) {
                        ch = peekNextChar();
                        if (!isWhiteSpace(ch)) {
                            break;
                        }
                        getNextChar();
                    }
                }

                function scanOperator() {
                    var ch = peekNextChar();
                    if ('+-*/()^%=;,'.indexOf(ch) >= 0) {
                        return createToken(T.Operator, getNextChar());
                    }
                    if (peekNextChar(2) === ':=') {
                        index += 2;

                        return createToken(T.Operator, ':=');
                    }
                    return undefined;
                }

                function isIdentifierStart(ch) {
                    return (ch === '_') || isLetter(ch);
                }

                function isIdentifierPart(ch) {
                    return isIdentifierStart(ch) || isDecimalDigit(ch);
                }

                function scanIdentifier() {
                    var ch, id;

                    ch = peekNextChar();
                    if (!isIdentifierStart(ch)) {
                        return undefined;
                    }

                    id = getNextChar();
                    while (true) {
                        ch = peekNextChar();
                        if (!isIdentifierPart(ch)) {
                            break;
                        }
                        id += getNextChar();
                    }

                    return createToken(T.Identifier, id);
                }

                function scanNumber() {
                    var ch, number;

                    ch = peekNextChar();
                    if (!isDecimalDigit(ch) && (ch !== '.')) {
                        return undefined;
                    }

                    number = '';
                    if (ch !== '.') {
                        number = getNextChar();
                        while (true) {
                            ch = peekNextChar();
                            if (!isDecimalDigit(ch)) {
                                break;
                            }
                            number += getNextChar();
                        }
                    }

                    if (ch === '.') {
                        number += getNextChar();
                        while (true) {
                            ch = peekNextChar();
                            if (!isDecimalDigit(ch)) {
                                break;
                            }
                            number += getNextChar();
                        }
                    }

                    if (ch === 'e' || ch === 'E') {
                        number += getNextChar();
                        ch = peekNextChar();
                        if (ch === '+' || ch === '-' || isDecimalDigit(ch)) {
                            number += getNextChar();
                            while (true) {
                                ch = peekNextChar();
                                if (!isDecimalDigit(ch)) {
                                    break;
                                }
                                number += getNextChar();
                            }
                        } else {
                            ch = 'character ' + ch;
                            if (index >= length) {
                                ch = '<end>';
                            }
                            throw new SyntaxError('Unexpected ' + ch + ' after the exponent sign');
                        }
                    }

                    if (number === '.') {
                        throw new SyntaxError('Expecting decimal digits after the dot sign');
                    }

                    return createToken(T.Number, number);
                }

                function reset(str) {
                    expression = str;
                    length = str.length;
                    index = 0;
                }

                function next() {
                    var token;

                    skipSpaces();
                    if (index >= length) {
                        return undefined;
                    }

                    marker = index;

                    token = scanNumber();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    token = scanOperator();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    token = scanIdentifier();
                    if (typeof token !== 'undefined') {
                        return token;
                    }

                    throw new SyntaxError('Unknown token from character ' + peekNextChar());
                }

                function peek() {
                    var token, idx;

                    idx = index;
                    try  {
                        token = next();
                        delete token.start;
                        delete token.end;
                    } catch (e) {
                        token = undefined;
                    }
                    index = idx;

                    return token;
                }

                return {
                    reset: reset,
                    next: next,
                    peek: peek
                };
            };

            Parser = function () {
                var lexer = new Lexer(), T = Token;

                function matchOp(token, op) {
                    return (typeof token !== 'undefined') && token.type === T.Operator && token.value === op;
                }

                // ArgumentList := Expression |
                //                 Expression ',' ArgumentList
                function parseArgumentList() {
                    var token, expr, args = [];

                    while (true) {
                        expr = parseExpression();
                        if (typeof expr === 'undefined') {
                            break;
                        }
                        args.push(expr);
                        token = lexer.peek();
                        if (!matchOp(token, ',')) {
                            break;
                        }
                        lexer.next();
                    }

                    return args;
                }

                // FunctionCall ::= Identifier '(' ')' ||
                //                  Identifier '(' ArgumentList ')'
                function parseFunctionCall(name) {
                    var token, expr, args = [];

                    token = lexer.next();
                    if (!matchOp(token, '(')) {
                        throw new SyntaxError('Expecting ( in a function call "' + name + '"');
                    }

                    token = lexer.peek();
                    if (!matchOp(token, ')')) {
                        args = parseArgumentList();
                    }

                    token = lexer.next();
                    if (!matchOp(token, ')')) {
                        throw new SyntaxError('Expecting ) in a function call "' + name + '"');
                    }

                    expr = new MathLib.Expression({
                        subtype: 'functionCall',
                        value: name,
                        content: args
                    });

                    if (name in MathLib && MathLib[name].type === 'functn') {
                        if (MathLib[name].expression.content[0].hasOwnProperty('cdgroup')) {
                            expr.cdgroup = MathLib[name].expression.content[0].cdgroup;
                        }

                        if (MathLib[name].expression.content[0].hasOwnProperty('contentMathMLName')) {
                            expr.contentMathMLName = MathLib[name].expression.content[0].contentMathMLName;
                        }

                        if (MathLib[name].expression.content[0].hasOwnProperty('toContentMathML')) {
                            expr.toContentMathML = MathLib[name].expression.content[0].toContentMathML;
                        }

                        if (MathLib[name].expression.content[0].hasOwnProperty('toLaTeX')) {
                            expr.toLaTeX = MathLib[name].expression.content[0].toLaTeX;
                        }

                        if (MathLib[name].expression.content[0].hasOwnProperty('toMathML')) {
                            expr.toMathML = MathLib[name].expression.content[0].toMathML;
                        }

                        if (MathLib[name].expression.content[0].hasOwnProperty('toString')) {
                            expr.toString = MathLib[name].expression.content[0].toString;
                        }
                    }

                    return expr;
                }

                // Primary ::= Identifier |
                //             Number |
                //             '(' Assignment ')' |
                //             FunctionCall
                function parsePrimary() {
                    var token, expr;

                    token = lexer.peek();

                    if (typeof token === 'undefined') {
                        throw new SyntaxError('Unexpected termination of expression');
                    }

                    if (token.type === T.Identifier) {
                        token = lexer.next();
                        if (matchOp(lexer.peek(), '(')) {
                            return parseFunctionCall(token.value);
                        } else {
                            return MathLib.Expression.variable(token.value);
                        }
                    }

                    if (token.type === T.Number) {
                        token = lexer.next();
                        return MathLib.Expression.number(token.value);
                    }

                    if (matchOp(token, '(')) {
                        lexer.next();
                        expr = parseAssignment();
                        token = lexer.next();
                        if (!matchOp(token, ')')) {
                            throw new SyntaxError('Expecting )');
                        }
                        return new MathLib.Expression({
                            subtype: 'brackets',
                            value: 'brackets',
                            content: expr
                        });
                    }

                    throw new SyntaxError('Parse error, can not process token ' + token.value);
                }

                // Unary ::= Primary |
                //           '-' Unary
                function parseUnary() {
                    var token, expr;

                    token = lexer.peek();
                    if (matchOp(token, '-') || matchOp(token, '+')) {
                        token = lexer.next();
                        expr = parseUnary();
                        return new MathLib.Expression({
                            subtype: 'unaryOperator',
                            value: token.value,
                            content: expr
                        });
                    }

                    return parsePrimary();
                }

                // Exponentiation ::= Unary |
                //                    Unary '^' Exponentiation
                function parseExponentiation() {
                    var token, left, right;

                    left = parseUnary();
                    token = lexer.peek();
                    if (matchOp(token, '^')) {
                        token = lexer.next();

                        right = parseExponentiation();

                        // Exponentiation is right associative
                        // a^b^c should be a^(b^c) and not (a^b)^c
                        return new MathLib.Expression({
                            subtype: 'binaryOperator',
                            value: '^',
                            content: [left, right],
                            name: 'pow'
                        });
                    }
                    return left;
                }

                // Multiplicative ::= Exponentiation |
                //                    Multiplicative '*' Exponentiation |
                //                    Multiplicative '/' Exponentiation
                function parseMultiplicative() {
                    var token, left, right, r;

                    left = parseExponentiation();
                    token = lexer.peek();
                    if (matchOp(token, '*') || matchOp(token, '/')) {
                        token = lexer.next();

                        right = parseMultiplicative();

                        // Multiplication and division is left associative:
                        // a/b/c should be (a/b)/c and not a/(b/c)
                        if (right.subtype === 'naryOperator' || right.subtype === 'binaryOperator') {
                            r = right;
                            while (r.content[0].subtype === 'naryOperator' || r.content[0].subtype === 'binaryOperator') {
                                r = r.content[0];
                            }

                            r.content[0] = new MathLib.Expression({
                                subtype: token.value === '*' ? 'naryOperator' : 'binaryOperator',
                                content: [left, r.content[0]],
                                value: token.value,
                                name: token.value === '*' ? 'times' : 'divide'
                            });
                            return right;
                        } else {
                            return new MathLib.Expression({
                                subtype: token.value === '*' ? 'naryOperator' : 'binaryOperator',
                                value: token.value,
                                name: token.value === '*' ? 'times' : 'divide',
                                content: [left, right]
                            });
                        }
                    }
                    return left;
                }

                // Additive ::= Multiplicative |
                //              Additive '+' Multiplicative |
                //              Additive '-' Multiplicative
                function parseAdditive() {
                    var token, left, right, r;

                    left = parseMultiplicative();
                    token = lexer.peek();
                    if (matchOp(token, '+') || matchOp(token, '-')) {
                        token = lexer.next();
                        right = parseAdditive();

                        // Addition and subtraction is left associative:
                        // a-b-c should be (a-b)-c and not a-(b-c)
                        if (right.value === '+' || right.value === '-') {
                            r = right;
                            while (r.content[0].subtype === 'naryOperator') {
                                r = r.content[0];
                            }

                            r.content[0] = new MathLib.Expression({
                                subtype: token.value === '+' ? 'naryOperator' : 'binaryOperator',
                                content: [left, r.content[0]],
                                value: token.value,
                                name: token.value === '+' ? 'plus' : 'minus'
                            });
                            return right;
                        } else {
                            return new MathLib.Expression({
                                subtype: token.value === '+' ? 'naryOperator' : 'binaryOperator',
                                value: token.value,
                                name: token.value === '+' ? 'plus' : 'minus',
                                content: [left, right]
                            });
                        }
                    }
                    return left;
                }

                // Assignment ::= Identifier ':=' Assignment |
                //                Additive
                function parseAssignment() {
                    var expr, value, token, content = [];

                    expr = parseAdditive();

                    if (typeof expr !== 'undefined' && expr.subtype === 'variable') {
                        token = lexer.peek();
                        if (matchOp(token, ':=')) {
                            lexer.next();

                            content.push(expr);
                            value = parseAssignment();

                            while (value.subtype === 'assignment') {
                                content = content.concat(value.content);
                                value = value.value;
                            }

                            return new MathLib.Expression({
                                subtype: 'assignment',
                                content: content,
                                value: value
                            });
                        }
                        return expr;
                    }

                    return expr;
                }

                // Expression ::= Assignment
                function parseExpression() {
                    return parseAssignment();
                }

                function parse(expression) {
                    var expr, token;

                    lexer.reset(expression);
                    expr = parseExpression();

                    token = lexer.next();
                    if (typeof token !== 'undefined') {
                        throw new SyntaxError('Unexpected token ' + token.value);
                    }

                    return new MathLib.Expression(expr);
                }

                return {
                    parse: parse
                };
            };

            return (new Parser()).parse(str);
        };

        Expression.variables = {};
        return Expression;
    })();
    MathLib.Expression = Expression;
})(MathLib);


(function (MathLib) {
    'use strict';

    /* jshint -W079 */
    /*es6
    import {coerce, epsilon, goldenRatio, isNative, type} from 'meta';
    import {Expression} from 'Expression';
    es6*/
    /// import Expression
    var functnPrototype = {};

    /*es6
    var abs, arccos, arccot, arccsc, arcosh, arcoth, arcsch, arcsec, arcsin, arctan, arsech, arsinh, artanh, binomial, ceil, cbrt, conjugate, copy, cos, cosh, cot, coth, csc, csch, degToRad, exp, factorial, floor, identity, inverse, isFinite, isInt, isNaN, isNegZero, isOne, isPosZero, isPrime, isReal, isZero, lg, ln, logGamma, negative, not, radToDeg, rem, sec, sech, sign, sin, sinh, sqrt, tan, tanh, arctan2, divide, equivalent, implies, log, minus, mod, pow, root, divisors, factor, fallingFactorial, fibonacci, risingFactorial, round, trunc, and, arithMean, gcd, geoMean, harmonicMean, hypot, hypot2, isEqual, lcm, max, min, or, plus, times, xor;
    es6*/
    /**
    * MathLib.Functn is the MathLib implementation of mathematical functions
    *
    * Because 'Function' is a reserved word in JavaScript,
    * the class is called 'Functn'.
    *
    * @class
    * @this {Functn}
    */
    MathLib.Functn = function (f, options) {
        options = options || {};

        var functn = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var firstArg, i, ii, x = args[0], arity = options.arity, isNumeric = function (arg) {
                return ['complex', 'integer', 'number', 'rational'].indexOf(MathLib.type(arg)) !== -1;
            };

            if (args.length > 1 && args.every(isNumeric)) {
                args = MathLib.coerce.apply(null, args);
            }

            firstArg = args[0];

            if (args.length < arity || (args.length === arity && args.some(function (arg) {
                return arg === undefined || arg.type === 'functn' || arg.type === 'expression';
            }))) {
                var bvar, partialAppliedExpression = options.expression.copy(), bvarIndex = 0;

                for (i = 0, ii = args.length; i < ii; i++) {
                    if (args[i] === undefined) {
                        bvarIndex++;
                    } else if (args[i].type === 'functn') {
                        // Get the variable name
                        bvar = partialAppliedExpression.args[bvarIndex].value;

                        // Replace the variable in the expression by the function expression
                        partialAppliedExpression = partialAppliedExpression.map(function (expr) {
                            if (expr.subtype === 'variable' && expr.value === bvar) {
                                return args[i].expression.content[0];
                            }
                            return expr;
                        });

                        // Remove the variable from the list of arguments and add the new ones
                        partialAppliedExpression.args.splice(bvarIndex, 1, args[i].expression.args);
                        bvarIndex += args[i].expression.args.length;
                    } else if (args[i].type === 'expression' && args[i].subtype === 'variable') {
                        // Get the variable name
                        bvar = partialAppliedExpression.args[bvarIndex].value;

                        // Replace the variable in the expression by the function expression
                        partialAppliedExpression = partialAppliedExpression.map(function (expr) {
                            if (expr.subtype === 'variable' && expr.value === bvar) {
                                return args[i];
                            }
                            return expr;
                        });

                        // Remove the variable from the list of arguments and add the new ones
                        partialAppliedExpression.args.splice(bvarIndex, 1, [args[i]]);
                        bvarIndex++;
                    } else {
                        // Get the variable name
                        bvar = partialAppliedExpression.args[bvarIndex].value;

                        // Replace the variable in the expression by the argument
                        partialAppliedExpression = partialAppliedExpression.map(function (expr) {
                            if (expr.subtype === 'variable' && expr.value === bvar) {
                                return args[i];
                            }
                            return expr;
                        });

                        // Remove the variable from the list of arguments
                        partialAppliedExpression.args.splice(bvarIndex, 1);
                    }
                }

                return MathLib.Functn(function () {
                    var j, jj, argus = [], argumentsIndex = 0;

                    for (j = 0, jj = args.length; j < jj; j++) {
                        if (args[j] === undefined || args[j].type === 'expression') {
                            argus.push(arguments[argumentsIndex]);
                            argumentsIndex++;
                        } else if (args[j].type === 'functn') {
                            argus.push(args[j](arguments[argumentsIndex]));
                            argumentsIndex++;
                        } else {
                            argus.push(args[j]);
                        }
                    }

                    argus = argus.concat(Array.prototype.slice.call(arguments, argumentsIndex));

                    return f.apply(this, argus);
                }, {
                    expression: partialAppliedExpression
                });
            } else if (firstArg.type === 'complex') {
                return firstArg[options.name].apply(firstArg, Array.prototype.slice.call(arguments, 1));
            } else if (args.every(function (arg) {
                return ['function', 'undefined', 'object'].indexOf(typeof arg) === -1;
            })) {
                return f.apply(null, args);
            } else if (x.type === 'functn') {
                // x -> f(x)
                // y -> g(y)
                // y -> f(g(y))
                var bvar = options.expression.args[0].value, composition = options.expression.map(function (expr) {
                    if (expr.subtype === 'variable' && expr.value === bvar) {
                        expr = x.expression.content[0];
                    }
                    return expr;
                });

                return new MathLib.Functn(function (y) {
                    return f(x(y));
                }, {
                    expression: new MathLib.Expression({
                        subtype: 'functionDefinition',
                        args: x.expression.args,
                        content: composition.content
                    })
                });
            } else if (typeof x === 'function') {
                return function (y) {
                    return f(x(y));
                };
            } else if (firstArg.type === 'integer' || firstArg.type === 'rational') {
                if (firstArg[options.name]) {
                    return firstArg[options.name].apply(firstArg, Array.prototype.slice.call(arguments, 1));
                }
                return f(firstArg.coerceTo('number'));
            } else if (x.type === 'set') {
                return x.map(f);
            } else if (MathLib.type(firstArg) === 'array') {
                var ff, res = [];

                for (i = 0, ii = firstArg.length; i < ii; i++) {
                    ff = f(firstArg[i]);
                    if (typeof ff === 'function') {
                        res.push(ff.apply(null, args.slice(1)));
                    } else {
                        res.push(ff);
                    }
                }
                return res;
            } else {
                return x[options.name]();
            }
        };

        for (var name in functnPrototype) {
            /* istanbul ignore else */
            if (functnPrototype.hasOwnProperty(name)) {
                functn[name] = functnPrototype[name];
            }
        }
        functn.type = 'functn';
        functn.constructor = MathLib.Functn;

        Object.defineProperties(functn, {
            args: { value: options.args },
            id: { value: options.name },
            expression: { value: options.expression }
        });

        return functn;
    };

    var exports = {};
    var fns = {};

    /**
    * The absolute value
    *
    */
    fns.abs = {
        functn: Math.abs,
        cdgroup: 'arith1',
        toLaTeX: ['\\left|', '\\right|'],
        toMathML: ['<mo>|</mo>', '<mo>|</mo>'],
        toString: ['|', '|']
    };

    /**
    * The inverse cosine function
    *
    */
    fns.arccos = {
        functn: Math.acos,
        cdgroup: 'transc1'
    };

    /**
    * The inverse cotangent function
    *
    */
    fns.arccot = {
        functn: function (x) {
            return 1.5707963267948966 - Math.atan(x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The inverse cosecant function
    *
    */
    fns.arccsc = {
        functn: function (x) {
            return Math.asin(1 / x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The inverse hyperbolic cosine function
    *
    */
    fns.arcosh = {
        functn: MathLib.isNative(Math.acosh) || function (x) {
            return Math.log(x + Math.sqrt(x * x - 1));
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arccosh'
    };

    /**
    * The inverse hyperbolic cotangent function
    *
    */
    fns.arcoth = {
        functn: function (x) {
            // Handle ±∞
            if (!MathLib.isFinite(x)) {
                return 1 / x;
            }
            return 0.5 * Math.log((x + 1) / (x - 1));
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arccoth'
    };

    /**
    * The inverse hyperbolic cosecant function
    *
    */
    fns.arcsch = {
        functn: function (x) {
            // Handle ±0 and ±∞ separately
            if (x === 0 || !MathLib.isFinite(x)) {
                return 1 / x;
            }
            return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arccsch'
    };

    /**
    * The inverse secant function
    *
    */
    fns.arcsec = {
        functn: function (x) {
            return Math.acos(1 / x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The inverse sine function
    *
    */
    fns.arcsin = {
        functn: Math.asin,
        cdgroup: 'transc1'
    };

    /**
    * The inverse tangent function
    *
    */
    fns.arctan = {
        functn: Math.atan,
        cdgroup: 'transc1'
    };

    /**
    * The arctan2 function
    *
    */
    fns.arctan2 = {
        functn: Math.atan2,
        arity: 2,
        cdgroup: 'transc2',
        contentMathMLName: 'arctan'
    };

    /**
    * The inverse hyperbolic secant function
    *
    */
    fns.arsech = {
        functn: function (x) {
            return Math.log((1 + Math.sqrt(1 - x * x)) / x);
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arcsech'
    };

    /**
    * The inverse hyperbolic sine function
    *
    */
    fns.arsinh = {
        functn: MathLib.isNative(Math.asinh) || function (x) {
            // Handle ±0 and ±∞ separately
            if (x === 0 || !MathLib.isFinite(x)) {
                return x;
            }
            return Math.log(x + Math.sqrt(x * x + 1));
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arcsinh'
    };

    /**
    * The inverse hyperbolic tangent function
    *
    */
    fns.artanh = {
        functn: MathLib.isNative(Math.atanh) || function (x) {
            // Handle ±0
            if (x === 0) {
                return x;
            }
            return 0.5 * Math.log((1 + x) / (1 - x));
        },
        cdgroup: 'transc1',
        toContentMathMLName: 'arctanh'
    };

    /**
    * The binomial coefficient
    *
    */
    fns.binomial = {
        functn: function (n, k) {
            // TODO: non integer values
            // What should be done with very big numbers?
            var binomial = 1, i, sign;

            // not finite means ±∞ or NaN
            if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
                return NaN;
            }

            // Exit early for areas which return 0
            if ((n >= 0 && k <= -1) || (n >= 0 && k > n) || (k < 0 && k > n)) {
                return 0;
            }

            if (n < 0) {
                if (k < 0) {
                    // negative odd number % 2 = -1 and not +1
                    // This leads to the + 1 here.
                    return ((n + k) % 2 * 2 + 1) * MathLib.binomial(-k - 1, -n - 1);
                } else {
                    if (k === 0) {
                        sign = 1;
                    } else {
                        sign = -(k % 2 * 2 - 1);
                    }
                    binomial = sign * MathLib.binomial(k - n - 1, k);
                }
            }

            if (k > n / 2) {
                k = n - k;
            }

            for (i = 1; i <= k; i++) {
                binomial *= (n + 1 - i) / i;
            }
            return binomial;
        },
        args: ['n', 'k'],
        cdgroup: 'combinat1',
        toLaTeX: ['{', ' \\choose ', '}'],
        toMathML: ['<mfenced><mfrac linethickness=\"0\">', '', '</mfrac></mfenced>']
    };

    /**
    * The cube root function
    *
    */
    fns.cbrt = {
        functn: function (x) {
            var a3, a3x, an, a;

            // Handle ±0, NaN, ±∞
            if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
                return x;
            }

            // Get an approximation
            a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

            while (true) {
                a3 = Math.pow(a, 3);
                a3x = a3 + x;
                an = a * (a3x + x) / (a3x + a3);
                if (MathLib.isZero(an - a)) {
                    break;
                }
                a = an;
            }
            return an;
        },
        cdgroup: 'arith1',
        toContentMathML: ['<csymbol cd="arith1">root</csymbol>', '<cn>3</cn>'],
        toLaTeX: ['\\sqrt[3]{', '}'],
        toMathML: ['<mroot>', '<mn>3</mn></mroot>']
    };

    /**
    * The ceil function
    *
    */
    fns.ceil = {
        functn: function (x) {
            // Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
            if (x === 0) {
                return x;
            }
            return Math.ceil(x);
        },
        cdgroup: 'rounding1',
        contentMathMLName: 'ceiling',
        toLaTeX: ['\\lceil', '\\rceil'],
        toMathML: ['<mo>&lceil;</mo>', '<mo>&rceil;</mo>'],
        toString: ['⌈', '⌉']
    };

    /**
    * The conjugate function
    *
    */
    fns.conjugate = {
        functn: function (x) {
            return x;
        },
        cdgroup: 'complex1',
        toLaTeX: ['\\overline{', '}'],
        toMathML: ['<mover>', '<mo>‾</mo></mover>']
    };

    /**
    * The copy function
    *
    */
    fns.copy = {
        functn: function (x) {
            return x;
        },
        toContentMathML: ['<ci>copy</ci>']
    };

    /**
    * The cosine function
    *
    */
    fns.cos = {
        functn: Math.cos,
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic cosine function
    *
    */
    fns.cosh = {
        // In my current version of Chrome 34.0.1847.60 beta
        // Math.cosh(-Infinity) = -Infinity
        // but should be +Infinity
        functn: function (x) {
            var ex = Math.exp(x);
            return (ex + 1 / ex) / 2;
        },
        cdgroup: 'transc1'
    };

    /**
    * The cotangent function
    *
    */
    fns.cot = {
        functn: function (x) {
            // Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
            if (x === 0) {
                return 1 / x;
            }

            // cot(x) = tan(pi/2 - x) is better than 1/tan(x)
            return Math.tan(1.5707963267948966 - x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic cotangent function
    *
    */
    fns.coth = {
        functn: function (x) {
            // Handle ±0
            if (x === 0) {
                return 1 / x;
            }

            // Handle ±∞
            if (!MathLib.isFinite(x)) {
                return MathLib.sign(x);
            }

            return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
        },
        cdgroup: 'transc1'
    };

    /**
    * The cosecant function
    *
    */
    fns.csc = {
        functn: function (x) {
            return 1 / Math.sin(x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic cosecant function
    *
    */
    fns.csch = {
        functn: function (x) {
            // csch(-0) should be -∞ not ∞
            if (x === 0) {
                return 1 / x;
            }
            return 2 / (Math.exp(x) - Math.exp(-x));
        },
        cdgroup: 'transc1'
    };

    /**
    * A function converting from degree to radian
    *
    */
    fns.degToRad = {
        functn: function (x) {
            // Math.PI / 180 = 0.017453292519943295
            return x * 0.017453292519943295;
        },
        toContentMathML: ['<csymbol cd="arith1">times</csymbol><apply>' + '<csymbol cd="arith1">divide</csymbol><csymbol cd="nums1">pi</csymbol><cn>180</cn></apply>', ''],
        toLaTeX: ['\\frac{\\pi}{180}', ''],
        toMathML: ['<mfrac><mi>&pi;</mi><mn>180</mn></mfrac><mo>&#x2062;</mo>', ''],
        toString: ['π/180*', '']
    };

    /**
    * The division function
    *
    */
    fns.divide = {
        functn: function (x, y) {
            return MathLib.times(x, MathLib.inverse(y));
        },
        arity: 2,
        cdgroup: 'arith1',
        toLaTeX: ['\\frac{', '}{', '}'],
        toMathML: ['<mfrac>', '', '</mfrac>'],
        toString: ['', '/', '']
    };

    /**
    * This function determines if the arguments are equivalent as booleans
    *
    */
    fns.equivalent = {
        functn: function (x, y) {
            return Boolean(x) === Boolean(y);
        },
        arity: 2,
        cdgroup: 'logic1',
        toLaTeX: ['', ' \\Leftrightarrow ', ''],
        toMathML: ['', '<mo>&#x21D4;</mo>', ''],
        toString: ['', ' ⇔ ', '']
    };

    /**
    * The exponential function
    *
    */
    fns.exp = {
        functn: Math.exp,
        cdgroup: 'transc1',
        toLaTeX: ['e^{', '}']
    };

    /**
    * The cosine function
    *
    */
    fns.factorial = {
        functn: function (x) {
            var factorial = 1, i;
            if ((x > 170 && MathLib.isInt(x)) || x === Infinity) {
                return Infinity;
            }
            if (x < 0 || !MathLib.isInt(x) || MathLib.isNaN(x)) {
                return NaN;
            }
            for (i = 1; i <= x; i++) {
                factorial *= i;
            }
            return factorial;
        },
        args: ['n'],
        cdgroup: 'integer1',
        toLaTeX: ['', '!'],
        toMathML: ['', '<mo>!</mo>'],
        toString: ['', '!']
    };

    /**
    * The floor function
    *
    */
    fns.floor = {
        functn: Math.floor,
        cdgroup: 'rounding1',
        toLaTeX: ['\\lfloor', '\\rfloor'],
        toMathML: ['<mo>&lfloor;</mo>', '<mo>&rfloor;</mo>'],
        toString: ['⌊', '⌋']
    };

    /**
    * The identity function
    *
    */
    fns.identity = {
        functn: function (x) {
            return x;
        },
        cdgroup: 'fns1',
        toLaTeX: ['', ''],
        toMathML: ['', ''],
        toString: ['', '']
    };

    /**
    * The logic implies function
    *
    */
    fns.implies = {
        functn: function (x, y) {
            if (Boolean(x) && !Boolean(y)) {
                return false;
            }
            return true;
        },
        arity: 2,
        cdgroup: 'logic1',
        toLaTeX: ['', ' \\Rightarrow ', ''],
        toMathML: ['', '<mo>&#x21D2;</mo>', ''],
        toString: ['', ' ⇒ ', '']
    };

    /**
    * This function calculates the multiplicative inverse
    *
    */
    fns.inverse = {
        functn: function (x) {
            return 1 / x;
        },
        toContentMathML: ['<csymbol cd="arith1">divide</csymbol><cn>1</cn>', ''],
        toLaTeX: ['\\frac{1}{', '}'],
        toMathML: ['<mfrac><mn>1</mn>', '</mfrac>'],
        toString: ['1/', '']
    };

    /**
    * Checks whether a number is NaN or not
    *
    */
    fns.isNaN = {
        functn: function (x) {
            return x !== x;
        },
        toContentMathML: ['<csymbol cd="relation1">eq</csymbol>', '<csymbol cd="nums1">NaN</csymbol>']
    };

    /**
    * Checks whether a number is a prime or not
    *
    */
    fns.isPrime = {
        functn: function (x) {
            var sqrt = Math.sqrt(x), i;
            if (x % 1 === 0 && x > 1) {
                if (x === 2) {
                    return true;
                }
                if (x % 2 === 0) {
                    return false;
                }
                for (i = 3; i <= sqrt; i += 2) {
                    if (x % i === 0) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        },
        toContentMathML: ['<csymbol cd="set1">in</csymbol>', '<csymbol cd="setname1">P</csymbol>']
    };

    /**
    * The lg function
    *
    */
    fns.lg = {
        functn: function (x) {
            return Math.log(x) / Math.LN10;
        },
        toContentMathML: ['<csymbol cd="transc1">log</csymbol><cn>10</cn>', ''],
        toLaTeX: ['\\lg\\left(', '\\right)'],
        toMathML: ['<mi>lg</mi><mo>&#x2061;</mo><mo>(</mo>', '<mo>)</mo>'],
        toString: ['lg(', ')']
    };

    /**
    * The natural logarithm function
    *
    */
    fns.ln = {
        functn: Math.log,
        cdgroup: 'transc1'
    };

    /**
    * The log function
    *
    */
    fns.log = {
        functn: function (b, x) {
            return Math.log(x) / Math.log(b);
        },
        args: ['b', 'x'],
        cdgroup: 'transc1',
        toLaTeX: ['\\log_{', '}\\left(', '\\right)'],
        toMathML: ['<msub><mi>log</mi>', '</msub><mo>&#x2061;</mo><mo>(</mo>', '<mo>)</mo>'],
        toString: ['log_', '(', ')']
    };

    /**
    * The logarithm of the gamma function
    *
    * Algorithm based on [Numerical Recipes Vol. 3, p. 257](www.nr.com)
    */
    fns.logGamma = {
        functn: function (x) {
            var j, tmp, y, ser, cof = [
                57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199,
                0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4,
                0.158088703224912494e-3, -0.210264441724104883e-3, 0.217439618115212643e-3,
                -0.164318106536763890e-3, 0.844182239838527433e-4, -0.261908384015814087e-4,
                0.368991826595316234e-5
            ];

            if (x === Infinity) {
                return Infinity;
            }

            y = x;
            tmp = x + 5.24218750000000000; // Rational 671/128.
            tmp = (x + 0.5) * Math.log(tmp) - tmp;
            ser = 0.999999999999997092;
            for (j = 0; j < 14; j++) {
                ser += cof[j] / ++y;
            }
            return tmp + Math.log(2.5066282746310005 * ser / x);
        },
        toContentMathML: ['<csymbol cd="transc1">ln</csymbol><apply><ci>Gamma</ci>', '</apply>'],
        toLaTeX: ['\\log\\left(\\Gamma\\left(', '\\right)\\right)'],
        toMathML: [
            '<mi>log</mi><mo>&#x2061;</mo><mo>(</mo><mi mathvariant="normal">&#x0393;</mi><mo>&#x2061;</mo><mo>(</mo>',
            '<mo>)</mo><mo>)</mo>'],
        toString: ['log(Γ(', '))']
    };

    /**
    * The subtraction function
    *
    */
    fns.minus = {
        functn: function (x, y) {
            return MathLib.plus(x, MathLib.negative(y));
        },
        arity: 2,
        cdgroup: 'arith1',
        toLaTeX: ['', '-', ''],
        toMathML: ['', '<mo>-</mo>', ''],
        toString: ['', ' - ', '']
    };

    /**
    * The modulo function
    *
    */
    fns.mod = {
        functn: function (n, m) {
            return n - (m * Math.floor(n / m));
        },
        args: ['n', 'm'],
        toContentMathML: ['<ci>mod</ci>', '', ''],
        toLaTeX: ['', ' \\mod ', ''],
        toMathML: ['', '<mi>mod</mi>', ''],
        toString: ['', ' mod ', '']
    };

    /**
    * The negative function
    *
    */
    fns.negative = {
        functn: function (x) {
            return -x;
        },
        cdgroup: 'arith1',
        contentMathMLName: 'unary_minus',
        toLaTeX: ['-', ''],
        toMathML: ['<mo>&#x2212;</mo>', ''],
        toString: ['-', '']
    };

    /**
    * The logic not function
    *
    */
    fns.not = {
        functn: function (x) {
            return !x;
        },
        cdgroup: 'logic1',
        toLaTeX: ['\\neg ', ''],
        toMathML: ['<mo>&#xac;</mo>', ''],
        toString: ['¬', '']
    };

    /**
    * The pow function
    *
    */
    fns.pow = {
        functn: function (x, y) {
            if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
                return 1;
            }

            // Bugfix for Opera 12, where
            //  > MathLib.pow(-0, -5) == -Infinity // should be Infinity
            //  > MathLib.pow(-0, 5) == +0 // should be -0
            // Weirdly this problem occurs only sometimes, in a very random way...
            /* istanbul ignore if */
            if (MathLib.isNegZero(x) && Math.abs(y % 2) === 1) {
                return y < 0 ? -Infinity : -0;
            }
            return Math.pow(x, y);
        },
        arity: 2,
        cdgroup: 'arith1',
        toContentMathML: ['<csymbol cd="arith1">power</csymbol>', '', ''],
        toLaTeX: ['\\left(', '\\right)^{', '}'],
        toMathML: ['<msup>', '', '</msup>'],
        toString: ['(', ')^(', ')']
    };

    /**
    * A function converting from radian to degree
    *
    */
    fns.radToDeg = {
        functn: function (x) {
            // 180 / Math.PI = 57.29577951308232
            return x * 57.29577951308232;
        },
        toContentMathML: ['<csymbol cd="arith1">times</csymbol><apply>' + '<csymbol cd="arith1">divide</csymbol><cn>180</cn><csymbol cd="nums1">pi</csymbol></apply>', ''],
        toLaTeX: ['\\frac{180}{\\pi}', ''],
        toMathML: ['<mfrac><mn>180</mn><mi>&pi;</mi></mfrac><mo>&#x2062;</mo>', ''],
        toString: ['180/π*', '']
    };

    /**
    * The remainder function
    *
    */
    fns.rem = {
        functn: function (n, m) {
            var x = 4, y = -3;

            if (!MathLib.isFinite(m)) {
                return NaN;
            }

            // This is a bug fix for a very weird bug in Safari 5 on Windows 7.
            // Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2
            // It does not occur in OS X 10.6. I can't test other platforms right now.
            //
            //   > 4%-3 = 1
            // This is correct. But if we do the following:
            //   > n = 4;
            //   > m = -3;
            //   > n%m = -1
            // This is obviously not correct.
            /* istanbul ignore if */
            if (x % y === -1 && n > 0 && m < 0) {
                return -(n % m);
            }

            return n % m;
        },
        args: ['n', 'm'],
        cdgroup: 'integer1',
        contentMathMLName: 'remainder',
        toLaTeX: ['', ' \\operatorname{rem} ', ''],
        toMathML: ['', '<mi>rem</mi>', ''],
        toString: ['', ' rem ', '']
    };

    /**
    * The root function
    *
    */
    fns.root = {
        functn: function (x, y) {
            return Math.pow(x, 1 / y);
        },
        arity: 2,
        cdgroup: 'arith1',
        // toLaTeX can't use \sqrt since this requires the arguments in reverse order.
        // toLaTeX: ['\\sqrt[', ']{', '}'],
        toLaTeX: ['\\left(', '\\right)^{\\frac{1}{', '}}'],
        toMathML: ['<mroot>', '', '</mroot>'],
        toString: ['(', ')^(1/', ')']
    };

    /**
    * The secant function
    *
    */
    fns.sec = {
        functn: function (x) {
            return 1 / Math.cos(x);
        },
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic secant function
    *
    */
    fns.sech = {
        functn: function (x) {
            var ex = Math.exp(x);
            return 2 / (ex + 1 / ex);
        },
        cdgroup: 'transc1'
    };

    /**
    * The sign function
    *
    */
    fns.sign = {
        functn: function (x) {
            return x && (x < 0 ? -1 : 1);
        },
        toContentMathML: ['<ci>sign</ci>']
    };

    /**
    * The sine function
    *
    */
    fns.sin = {
        functn: Math.sin,
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic sine function
    *
    */
    fns.sinh = {
        functn: MathLib.isNative(Math.sinh) || function (x) {
            var ex;

            // sinh(-0) should be -0
            if (x === 0) {
                return x;
            }

            ex = Math.exp(x);
            return (ex - 1 / ex) / 2;
        },
        cdgroup: 'transc1'
    };

    /**
    * The square root function
    *
    */
    fns.sqrt = {
        functn: Math.sqrt,
        cdgroup: 'arith1',
        toContentMathML: ['<csymbol cd="arith1">root</csymbol>', '<cn>2</cn>'],
        toLaTeX: ['\\sqrt{', '}'],
        toMathML: ['<msqrt>', '</msqrt>']
    };

    /**
    * The tangent function
    *
    */
    fns.tan = {
        functn: Math.tan,
        cdgroup: 'transc1'
    };

    /**
    * The hyperbolic tangent function
    *
    */
    fns.tanh = {
        functn: MathLib.isNative(Math.tanh) || function (x) {
            var p;

            // Handle ±0 and ±∞ separately
            // Their values happen to coincide with sign
            if (x === 0 || !MathLib.isFinite(x)) {
                return MathLib.sign(x);
            }

            p = Math.exp(x);
            return (p * p - 1) / (p * p + 1);
        },
        cdgroup: 'transc1'
    };

    /**
    * Numeric derivative at a given point
    *
    * @param {number} x The value to calculate the derivative at
    * @param {number} h Optional step size
    * @return {number}
    */
    functnPrototype.diff = function (x, h) {
        if (typeof h === "undefined") { h = 1e-5; }
        return (this(x + h) - this(x - h)) / (2 * h);
    };

    /**
    * Draws the function on the screen
    *
    * @param {Screen} screen The screen to draw the function onto.
    * @param {object} options Optional drawing options.
    * @return {Functn} Returns the functn for chaining
    */
    functnPrototype.draw = function (screen, options) {
        if (typeof options === "undefined") { options = {}; }
        var functn = this;
        if (Array.isArray(screen)) {
            screen.forEach(function (x) {
                x.path(functn, options);
            });
        } else {
            screen.path(functn, options);
        }

        return this;
    };

    // Recursive function for the quad method
    var quadstep = function (f, a, b, fa, fc, fb, options) {
        var h = b - a, c = (a + b) / 2, fd = f((a + c) / 2), fe = f((c + b) / 2), Q1 = (h / 6) * (fa + 4 * fc + fb), Q2 = (h / 12) * (fa + 4 * fd + 2 * fc + 4 * fe + fb), Q = Q2 + (Q2 - Q1) / 15;

        options.calls = options.calls + 2;

        // Infinite or Not-a-Number function value encountered
        if (!MathLib.isFinite(Q)) {
            options.warn = Math.max(options.warn, 3);
            return Q;
        }

        // Maximum function count exceeded; singularity likely
        if (options.calls > options.maxCalls) {
            options.warn = Math.max(options.warn, 2);
            return Q;
        }

        // Accuracy over this subinterval is acceptable
        if (Math.abs(Q2 - Q) <= options.tolerance) {
            return Q;
        }

        // Minimum step size reached; singularity possible
        if (Math.abs(h) < options.minStep || c === a || c === b) {
            options.warn = Math.max(options.warn, 1);
            return Q;
        }

        // Otherwise, divide the interval into two subintervals
        return quadstep(f, a, c, fa, fd, fc, options) + quadstep(f, c, b, fc, fe, fb, options);
    };

    /**
    * Numeric evaluation of an integral using an adative simpson approach.
    *
    * Inspired by "adaptsim.m" by Walter Gander
    * and MatLab's "quad.m"
    *
    * @param {number} a The starting point
    * @param {number} b The end point
    * @param {number} options Optional options
    * @return {number}
    */
    functnPrototype.quad = function (a, b, options) {
        if (typeof options === "undefined") { options = {}; }
        var f = this, warnMessage = [
            'Calculation succeded',
            'Minimum step size reached',
            'Maximum function count exceeded',
            'Infinite or NaN function value encountered'
        ], Q;

        options.calls = 3;
        options.warn = 0;

        if (a === -Infinity) {
            a = -Number.MAX_VALUE;
        }

        if (b === Infinity) {
            b = Number.MAX_VALUE;
        }

        if (!('minStep' in options)) {
            options.minStep = 1e-15;
        }

        if (!('maxCalls' in options)) {
            options.maxCalls = 10000;
        }

        if (!('tolerance' in options)) {
            options.tolerance = 1e-5;
        }

        Q = quadstep(f, a, b, f(a), f((a + b) / 2), f(b), options);

        options.warnMessage = warnMessage[options.warn];

        return Q;
    };

    /**
    * Returns a content MathML representation of the function
    *
    * @return {MathML}
    */
    functnPrototype.toContentMathML = function () {
        return this.expression.toContentMathML();
    };

    /**
    * Returns a LaTeX representation of the function
    *
    * @return {string}
    */
    functnPrototype.toLaTeX = function () {
        return this.expression.toLaTeX();
        /*
        / / List of functions to be executed on the specified node type
        var handlers = {
        apply: function (n) {
        var f = n.childNodes[0],
        args = n.childNodes.slice(1).map(function (x) {
        return handlers[x.nodeName](x);
        }),
        str = '';
        if (f.nodeName === 'plus') {
        str = args.join('+');
        }
        else if (f.nodeName === 'times') {
        str = args.join('*');
        }
        else if (f.nodeName === 'power') {
        str = args[0] + '^{' + args[1] + '}';
        }
        else {
        / / TODO: not all functions can be written like \sin some have to be written like \operatorname{argmax}
        str = '\\' + f.nodeName + '(' + args.join(', ') + ')';
        }
        return str;
        },
        bvar: function () {return '';},
        ci: function (n) {return bvar || n.innerMathML;},
        cn: function (n) {return n.innerMathML;},
        cs: function (n) {return n.innerMathML;},
        domainofapplication: function () {return '';},
        lambda: function (n) {
        return n.childNodes.reduce(function (old, cur) {
        return old + handlers[cur.nodeName](cur);
        }, '');
        },
        '#text': function (n) {return n.innerMathML;}
        };
        / / Start the node handling with the first real element (not the <math> element)
        return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
        */
    };

    /**
    * Returns a MathML representation of the function
    *
    * @return {string}
    */
    functnPrototype.toMathML = function () {
        return this.expression.toMathML();
    };

    /**
    * Returns a string representation of the function
    *
    * @return {string}
    */
    functnPrototype.toString = function () {
        return this.expression.toString();
    };

    /*
    / / List of functions to be executed on the specified node type
    var handlers = {
    apply: function (n) {
    var f = n.childNodes[0],
    args = n.childNodes.slice(1).map(function (x) {
    return handlers[x.nodeName](x);
    }),
    str = '';
    if (f.nodeName === 'plus') {
    str = args.join('+');
    }
    else if (f.nodeName === 'times') {
    str = args.join('*');
    }
    else if (f.nodeName === 'power') {
    str = args[0] + '^' + args[1];
    }
    else {
    str = f.nodeName + '(' + args.join(', ') + ')';
    }
    return str;
    },
    bvar: function () {return '';},
    ci: function (n) {return bvar || n.innerMathML;},
    cn: function (n) {return n.innerMathML;},
    cs: function (n) {return n.innerMathML;},
    domainofapplication: function () {return '';},
    lambda: function (n) {
    return n.childNodes.reduce(function (old, cur) {
    return old + handlers[cur.nodeName](cur);
    }, '');
    },
    '#text': function (n) {return n.innerMathML;}
    };
    / / Start the node handling with the first real element (not the <math> element)
    return handlers[this.contentMathML.childNodes[0].nodeName](this.contentMathML.childNodes[0]);
    */
    // These functions will be added to the functn prototype soon.
    var functionList1 = {
        /*
        divisors: function (x) {
        var divisors = x === 1 ? [] : [1],
        i, ii;
        for (i = 2, ii = x / 2; i <= ii; i++) {
        if (x % i === 0) {
        divisors.push(i);
        }
        }
        divisors.push(x);
        return new MathLib.Set(divisors);
        },
        factor: function (n) {
        var factors = [],
        i;
        n = Math.abs(n);
        while (n % 2 === 0) {
        n = n / 2;
        factors.push(2);
        }
        i = 3;
        while (n !== 1) {
        while (n % i === 0) {
        n = n / i;
        factors.push(i);
        }
        i += 2;
        }
        return new MathLib.Set(factors, true);
        },
        */
        fallingFactorial: function (n, m, s) {
            var factorial = 1, j;
            s = s || 1;

            for (j = 0; j < m; j++) {
                factorial *= (n - j * s);
            }
            return factorial;
        },
        fibonacci: function (n) {
            return Math.floor(Math.pow(MathLib.goldenRatio, n) / Math.sqrt(5));
        },
        isFinite: function (x) {
            return Math.abs(x) < Infinity;
        },
        isInt: function (x) {
            return x % 1 === 0;
        },
        isNegZero: function (x) {
            return 1 / x === -Infinity;
        },
        isOne: function (a) {
            return Math.abs(a - 1) < MathLib.epsilon;
        },
        isPosZero: function (x) {
            return 1 / x === Infinity;
        },
        isReal: function (x) {
            return Math.abs(x) < Infinity;
        },
        isZero: function (x) {
            return Math.abs(x) < MathLib.epsilon;
        },
        random: Math.random,
        risingFactorial: function (n, m, s) {
            var factorial = 1, j;
            s = s || 1;

            for (j = 0; j < m; j++) {
                factorial *= (n + j * s);
            }
            return factorial;
        },
        round: function (x) {
            // Some implementations have a bug where Math.round(-0) = +0 (instead of -0).
            if (x === 0) {
                return x;
            }
            return Math.round(x);
        },
        trunc: function (x, n) {
            return x.toFixed(n || 0);
        }
    };

    var createFunction1 = function (f, name) {
        return function (x) {
            if (typeof x === 'number') {
                return f.apply(null, arguments);
            } else if (typeof x === 'function') {
                return function (y) {
                    return f(x(y));
                };
            } else if (x.type === 'set') {
                return new MathLib.Set(x.map(f));
            } else if (x.type === 'complex' || x.type === 'integer' || x.type === 'rational') {
                return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
            } else if (Array.isArray(x)) {
                return x.map(f);
            } else {
                return x[name]();
            }
        };
    };

    var func, cur;

    for (func in functionList1) {
        /* istanbul ignore else */
        if (functionList1.hasOwnProperty(func)) {
            cur = functionList1[func];
            Object.defineProperty(exports, func, {
                value: createFunction1(functionList1[func], func)
            });
        }
    }

    MathLib.compare = function (a, b) {
        if (MathLib.type(a) !== MathLib.type(b)) {
            return MathLib.sign(MathLib.type(a).localeCompare(MathLib.type(b)));
        } else if (typeof a === 'number') {
            return MathLib.sign(a - b);
        } else if (typeof a === 'string') {
            return a.localeCompare(b);
        }
        return a.compare(b);
    };

    MathLib.evaluate = function (x) {
        if (Array.isArray(x)) {
            return x.map(MathLib.evaluate);
        } else if (typeof x === 'object' && 'evaluate' in Object.getPrototypeOf(x)) {
            return x.evaluate();
        } else {
            return x;
        }
    };

    MathLib.type = function (x) {
        if (x === null) {
            return 'null';
        }
        if (x === undefined) {
            return 'undefined';
        }
        return x.type ? x.type : (x.constructor.name || Object.prototype.toString.call(x).slice(8, -1)).toLowerCase();
    };

    MathLib.is = function (obj, type) {
        var ucfirst = function (str) {
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        }, global = global, window = window, glbl = {
            Object: Object,
            Function: Function,
            RegExp: RegExp,
            Array: Array
        }, classes = [
            'circle', 'complex', 'conic', 'expression', 'functn', 'integer', 'line', 'matrix', 'permutation',
            'point', 'polynomial', 'rational', 'screen', 'screen2d', 'screen3d', 'set', 'vector'
        ];

        if (MathLib.type(obj) === type) {
            return true;
        } else if (classes.indexOf(type) !== -1) {
            return obj instanceof MathLib[ucfirst(type)];
        } else {
            // if (window) {
            return obj instanceof glbl[ucfirst(type)];
            // }
            // if (global) {
            //   return obj instanceof global[ucfirst(type)];
            // }
        }
    };

    /**
    * Checks if MathML is supported by the browser.
    * Code stolen from [Modernizr](http://www.modernizr.com/)
    *
    * @return {boolean}
    */
    MathLib.isMathMLSupported = function () {
        var hasMathML = false, ns, div, mfrac;

        // If document is undefined (e.g. in Node) we return false
        if (typeof document !== 'undefined' && document.createElementNS) {
            ns = 'http://www.w3.org/1998/Math/MathML';
            div = document.createElement('div');
            div.style.position = 'absolute';
            mfrac = div.appendChild(document.createElementNS(ns, 'math')).appendChild(document.createElementNS(ns, 'mfrac'));
            mfrac.appendChild(document.createElementNS(ns, 'mi')).appendChild(document.createTextNode('xx'));
            mfrac.appendChild(document.createElementNS(ns, 'mi')).appendChild(document.createTextNode('yy'));
            document.body.appendChild(div);
            hasMathML = div.offsetHeight > div.offsetWidth;
            document.body.removeChild(div);
        }
        return hasMathML;
    };

    /**
    * ### MathLib.writeMathML()
    * Writes MathML to an element.
    *
    * @param {string} id The id of the element in which the MathML should be inserted.
    * @param {string} math The MathML to be inserted.
    */
    MathLib.writeMathML = function (id, math) {
        var formula;
        document.getElementById(id).innerHTML = '<math>' + math + '</math>';
        if (typeof MathJax !== 'undefined') {
            formula = MathJax.Hub.getAllJax(id)[0];
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
        }
    };

    /**
    * ### MathLib.loadMathJax()
    * Loads MathJax dynamically.
    *
    * @param {string} config Optional config options
    */
    MathLib.loadMathJax = function (config) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

        config = config || 'MathJax.Hub.Config({' + 'config: ["MMLorHTML.js"],' + 'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' + 'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' + 'TeX: {' + 'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' + '}' + '});';

        if (window.opera) {
            script.innerHTML = config;
        } else {
            script.text = config;
        }

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    // Functions that act on set-like structures and return one single number/boolean...
    var nAryFunctions = {
        /**
        * Returns true iff all arguments are true.
        *
        * @param {...boolean} args - Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        and: function (args) {
            return args.every(function (x) {
                return !!x;
            });
        },
        arithMean: function (n) {
            return MathLib.plus(n) / n.length;
        },
        gcd: function (a) {
            var min, reduction = function (x) {
                return x !== min ? x % min : x;
            }, isntZero = function (x) {
                return x !== 0;
            };

            // remove zeros and make negative values positive
            a = a.filter(isntZero).map(Math.abs);

            if (a.length === 0) {
                return 0;
            }

            while (a.length > 1) {
                min = MathLib.min(a);
                a = a.map(reduction).filter(isntZero);
            }
            return a[0] || min;
        },
        geoMean: function (n) {
            return MathLib.root(MathLib.times(n), n.length);
        },
        harmonicMean: function (n) {
            return n.length / MathLib.plus(n.map(function (entry) {
                return MathLib.inverse(entry);
            }));
        },
        hypot: function (n) {
            var a, b, max, min;

            if (n.length === 1) {
                return Math.abs(n[0]);
            }

            if (n.length > 2) {
                return n.reduce(function (a, b) {
                    return MathLib.hypot(a, b);
                });
            }

            a = MathLib.abs(n[0]);
            b = MathLib.abs(n[1]);

            // Return Infinity if one value is infinite, even if the other value is NaN.
            // (see IEEE 754-2008, 9.2.1)
            if (a === Infinity || b === Infinity) {
                return Infinity;
            }

            // Return +0 if both values are ±0 (see IEEE 754-2008, 9.2.1)
            if (a === 0 && b === 0) {
                return 0;
            }

            max = Math.max(a, b);
            min = Math.min(a, b);

            return max * Math.sqrt(1 + Math.pow(min / max, 2));
        },
        hypot2: function (n) {
            // Return Infinity if one value is infinite
            if (n.some(function (x) {
                return x === Infinity || x === -Infinity;
            })) {
                return Infinity;
            }
            return n.reduce(function (old, cur) {
                return old + cur * cur;
            }, 0);
        },
        /**
        * ### MathLib.isEqual()
        * Determines if all arguments are equal.
        *
        * @param {...number|MathLib object} n Expects an arbitrary number of numbers or MathLib objects
        * @return {boolean}
        */
        isEqual: function (n) {
            return n.every(function (a, i, args) {
                if (a === args[0]) {
                    return true;
                } else if (typeof a === 'number' && typeof args[0] === 'number') {
                    return Math.abs(a - args[0]) <= 3e-15;
                } else if (typeof a === 'object') {
                    return a.isEqual(args[0]);
                } else if (typeof args[0] === 'object') {
                    return args[0].isEqual(a);
                }
                return false;
            });
        },
        lcm: function (n) {
            if (n.length === 0) {
                return 0;
            }
            if (n.length === 1) {
                return n[0];
            } else if (n.length === 2) {
                return MathLib.times(n) / MathLib.gcd(n);
            } else if (n.length > 2) {
                return n.reduce(function (x, y) {
                    return MathLib.lcm(x, y);
                });
            }
        },
        max: function (n) {
            return Math.max.apply(null, n);
        },
        min: function (n) {
            return Math.min.apply(null, n);
        },
        /**
        * ### MathLib.or()
        * Returns true iff at least one argument is true.
        *
        * @param {...boolean} args - Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        or: function (args) {
            return args.some(function (x) {
                return !!x;
            });
        },
        plus: function (n) {
            if (n.length === 0) {
                return 0;
            }
            return n.reduce(function (a, b) {
                var f1, f2, aExpr, bExpr;
                if (typeof a === 'number' && typeof b === 'number') {
                    return a + b;
                } else if (a.type === 'functn' || b.type === 'functn') {
                    f1 = a;
                    f2 = b;
                    aExpr = a.expression ? a.expression.content[0] : {};
                    bExpr = b.expression ? b.expression.content[0] : {};

                    if (a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                        aExpr = new MathLib.Expression({
                            value: a,
                            subtype: 'number'
                        });
                    } else if (b.type !== 'functn') {
                        f2 = function () {
                            return b;
                        };
                        bExpr = new MathLib.Expression({
                            value: b,
                            subtype: 'number'
                        });
                    }
                    return MathLib.Functn(function (x) {
                        return MathLib.plus(f1(x), f2(x));
                    }, {
                        expression: new MathLib.Expression({
                            subtype: 'functionDefinition',
                            args: ['x'],
                            content: [
                                new MathLib.Expression({
                                    content: [aExpr, bExpr],
                                    subtype: 'naryOperator',
                                    value: '+',
                                    name: 'plus'
                                })
                            ]
                        })
                    });
                } else if (typeof a === 'object') {
                    return a.plus(b);
                } else if (typeof b === 'object') {
                    return b.plus(a);
                }
            });
        },
        times: function (n) {
            if (n.length === 0) {
                return 1;
            }
            return n.reduce(function (a, b) {
                var f1, f2, aExpr, bExpr;
                if (typeof a === 'number' && typeof b === 'number') {
                    return a * b;
                } else if (a.type === 'functn' || b.type === 'functn') {
                    f1 = a;
                    f2 = b;
                    aExpr = a.expression ? a.expression.content[0] : {};
                    bExpr = b.expression ? b.expression.content[0] : {};

                    if (a.type !== 'functn') {
                        f1 = function () {
                            return a;
                        };
                        aExpr = new MathLib.Expression({
                            value: a,
                            subtype: 'number'
                        });
                    } else if (b.type !== 'functn') {
                        f2 = function () {
                            return b;
                        };
                        bExpr = new MathLib.Expression({
                            value: b,
                            subtype: 'number'
                        });
                    }
                    return MathLib.Functn(function (x) {
                        return MathLib.times(f1(x), f2(x));
                    }, {
                        expression: new MathLib.Expression({
                            subtype: 'functionDefinition',
                            args: ['x'],
                            content: [
                                new MathLib.Expression({
                                    content: [aExpr, bExpr],
                                    subtype: 'naryOperator',
                                    value: '*',
                                    name: 'times'
                                })
                            ]
                        })
                    });
                } else if (typeof a === 'object') {
                    return a.times(b);
                } else if (typeof b === 'object') {
                    return b.times(a);
                }
            });
        },
        /**
        * ### MathLib.xor()
        * Returns true iff an odd number of the arguments is true.
        *
        * @param {...boolean} args - Expects an arbitrary number of boolean arguments
        * @return {boolean}
        */
        xor: function (args) {
            return args.reduce(function (x, y) {
                return x + !!y;
            }, 0) % 2 !== 0;
        }
    };

    var createNaryFunction = function (f) {
        return function (n) {
            if (MathLib.type(n) === 'set') {
                return f(n.slice());
            } else if (MathLib.type(n) !== 'array') {
                n = Array.prototype.slice.apply(arguments);
            }
            return f(n);
        };
    };

    for (func in nAryFunctions) {
        /* istanbul ignore else */
        if (nAryFunctions.hasOwnProperty(func)) {
            Object.defineProperty(exports, func, {
                value: createNaryFunction(nAryFunctions[func])
            });
        }
    }
    var args, fn;
    for (var fnName in fns) {
        /* istanbul ignore else */
        if (fns.hasOwnProperty(fnName)) {
            fn = fns[fnName];

            if ('args' in fn) {
                args = fn.args.map(function (x) {
                    return MathLib.Expression.variable(x);
                });
            } else if ('arity' in fn) {
                args = ['x', 'y', 'z'].slice(0, fn.arity).map(function (x) {
                    return MathLib.Expression.variable(x);
                });
            } else {
                args = [MathLib.Expression.variable('x')];
            }

            Object.defineProperty(exports, fnName, {
                value: MathLib.Functn(fns[fnName].functn, {
                    name: fnName,
                    arity: args.length,
                    expression: new MathLib.Expression({
                        subtype: 'functionDefinition',
                        args: args,
                        content: [
                            new MathLib.Expression({
                                subtype: 'functionCall',
                                content: args,
                                value: fnName,
                                cdgroup: fn.cdgroup,
                                contentMathMLName: fn.contentMathMLName || fnName
                            })
                        ]
                    })
                }),
                writable: true,
                enumerable: true,
                configurable: true
            });

            if ('toContentMathML' in fn) {
                exports[fnName].expression.content[0].toContentMathML = (function (fn) {
                    return function () {
                        var MathML = '<apply>';

                        for (var i = 0, ii = fn.toContentMathML.length - 1; i < ii; i++) {
                            MathML += fn.toContentMathML[i] + this.content[i].toContentMathML();
                        }

                        MathML += fn.toContentMathML[i];
                        MathML += '</apply>';

                        return MathML;
                    };
                })(fn);
            }

            if ('toLaTeX' in fn) {
                exports[fnName].expression.content[0].toLaTeX = (function (fn) {
                    return function () {
                        var LaTeX = '';

                        for (var i = 0, ii = fn.toLaTeX.length - 1; i < ii; i++) {
                            LaTeX += fn.toLaTeX[i] + this.content[i].toLaTeX();
                        }

                        LaTeX += fn.toLaTeX[i];

                        return LaTeX;
                    };
                })(fn);
            }

            if ('toMathML' in fn) {
                exports[fnName].expression.content[0].toMathML = (function (fn) {
                    return function () {
                        var MathML = '<mrow>';

                        for (var i = 0, ii = fn.toMathML.length - 1; i < ii; i++) {
                            MathML += fn.toMathML[i] + this.content[i].toMathML();
                        }

                        MathML += fn.toMathML[i];
                        MathML += '</mrow>';

                        return MathML;
                    };
                })(fn);
            }

            if (fn.hasOwnProperty('toString')) {
                exports[fnName].expression.content[0].toString = (function (fn) {
                    return function () {
                        var str = '';

                        for (var i = 0, ii = fn.toString.length - 1; i < ii; i++) {
                            str += fn.toString[i] + this.content[i].toString();
                        }

                        str += fn.toString[i];

                        return str;
                    };
                })(fn);
            }
        }
    }

    MathLib.abs = exports.abs;
    MathLib.arccos = exports.arccos;
    MathLib.arccot = exports.arccot;
    MathLib.arccsc = exports.arccsc;
    MathLib.arcosh = exports.arcosh;
    MathLib.arcoth = exports.arcoth;
    MathLib.arcsch = exports.arcsch;
    MathLib.arcsec = exports.arcsec;
    MathLib.arcsin = exports.arcsin;
    MathLib.arctan = exports.arctan;
    MathLib.arsech = exports.arsech;
    MathLib.arsinh = exports.arsinh;
    MathLib.artanh = exports.artanh;
    MathLib.binomial = exports.binomial;
    MathLib.ceil = exports.ceil;
    MathLib.cbrt = exports.cbrt;
    MathLib.conjugate = exports.conjugate;
    MathLib.copy = exports.copy;
    MathLib.cos = exports.cos;
    MathLib.cosh = exports.cosh;
    MathLib.cot = exports.cot;
    MathLib.coth = exports.coth;
    MathLib.csc = exports.csc;
    MathLib.csch = exports.csch;
    MathLib.degToRad = exports.degToRad;
    MathLib.exp = exports.exp;
    MathLib.factorial = exports.factorial;
    MathLib.floor = exports.floor;
    MathLib.identity = exports.identity;
    MathLib.inverse = exports.inverse;
    MathLib.isFinite = exports.isFinite;
    MathLib.isInt = exports.isInt;
    MathLib.isNaN = exports.isNaN;
    MathLib.isNegZero = exports.isNegZero;
    MathLib.isOne = exports.isOne;
    MathLib.isPosZero = exports.isPosZero;
    MathLib.isPrime = exports.isPrime;
    MathLib.isReal = exports.isReal;
    MathLib.isZero = exports.isZero;
    MathLib.lg = exports.lg;
    MathLib.ln = exports.ln;
    MathLib.logGamma = exports.logGamma;
    MathLib.negative = exports.negative;
    MathLib.not = exports.not;
    MathLib.radToDeg = exports.radToDeg;
    MathLib.rem = exports.rem;
    MathLib.sec = exports.sec;
    MathLib.sech = exports.sech;
    MathLib.sign = exports.sign;
    MathLib.sin = exports.sin;
    MathLib.sinh = exports.sinh;
    MathLib.sqrt = exports.sqrt;
    MathLib.tan = exports.tan;
    MathLib.tanh = exports.tanh;

    MathLib.arctan2 = exports.arctan2;
    MathLib.divide = exports.divide;
    MathLib.equivalent = exports.equivalent;
    MathLib.implies = exports.implies;
    MathLib.log = exports.log;
    MathLib.minus = exports.minus;
    MathLib.mod = exports.mod;
    MathLib.pow = exports.pow;
    MathLib.root = exports.root;

    MathLib.divisors = exports.divisors;
    MathLib.factor = exports.factor;
    MathLib.fallingFactorial = exports.fallingFactorial;
    MathLib.fibonacci = exports.fibonacci;
    MathLib.risingFactorial = exports.risingFactorial;
    MathLib.round = exports.round;
    MathLib.trunc = exports.trunc;

    MathLib.and = exports.and;
    MathLib.arithMean = exports.arithMean;
    MathLib.gcd = exports.gcd;
    MathLib.geoMean = exports.geoMean;
    MathLib.harmonicMean = exports.harmonicMean;
    MathLib.hypot = exports.hypot;
    MathLib.hypot2 = exports.hypot2;
    MathLib.isEqual = exports.isEqual;
    MathLib.lcm = exports.lcm;
    MathLib.max = exports.max;
    MathLib.min = exports.min;
    MathLib.or = exports.or;
    MathLib.plus = exports.plus;
    MathLib.times = exports.times;
    MathLib.xor = exports.xor;
})(MathLib);


(function (MathLib) {
    'use strict';

    /* tslint:disable */
    var template = function (data) {
        var p = [];
        p.push(' <figure class="MathLib_figure" aria-describedby="MathLib_figcaption_');
        p.push(data.uuid);
        p.push('">     <div class="MathLib_wrapper" style="width: ');
        p.push(data.width);
        p.push('px; height: ');
        p.push(data.height);
        p.push('px" tabindex="0" aria-hidden="true">   <div class="MathLib_info_message">Your browser does not seem to support WebGL.<br>   Please update your browser to see the plot.</div>  </div>      ');
        if (data.figcaption) {
            p.push('   <figcaption class="MathLib_figcaption" id="MathLib_figcaption_');
            p.push(data.uuid);
            p.push('">');
            p.push(data.figcaption);
            p.push('</figcaption>  ');
        }
        p.push('  </figure>  ');
        if (data.contextMenu) {
            p.push('  <div class="MathLib_contextMenuOverlay">   <menu class="MathLib_menu MathLib_mainmenu">          ');
            if (data.contextMenu.screenshot) {
                p.push('     <div class="MathLib_screenshot MathLib_menuItem">Save Screenshot</div>    ');
            }
            p.push('      ');
            if (data.contextMenu.fullscreen) {
                p.push('     <div class="MathLib_fullscreen MathLib_menuItem">      <span class="needs-nofullscreen">Enter Fullscreen</span>      <span class="needs-fullscreen">Exit Fullscreen</span>     </div>    ');
            }
            p.push('      ');
            if (data.contextMenu.grid) {
                p.push('     <div class="MathLib_menuItem MathLib_hasSubmenu">      Grid      <menu class="MathLib_menu MathLib_submenu">       <div class="MathLib_needs2D">        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="cartesian">cartesian        </label>        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="polar">polar        </label>        <label class="MathLib_menuItem">         <input type="radio" name="MathLib_grid_type_');
                p.push(data.uuid);
                p.push('" class="MathLib_radio MathLib_grid_type" value="none">none        </label>       </div>        <div class="MathLib_needs3D MathLib_menuItem MathLib_is_disabled" style="font-size: 0.7em">        Gridoptions for 3D are coming soon.       </div>      </menu>     </div>    ');
            }
            p.push('      <hr class="MathLib_separator">    <div class="MathLib_is_disabled MathLib_menuItem MathLib_is_centered" style="font-size:0.83em">     Plot generated by MathLib.js    </div>   </menu>  </div> ');
        }
        p.push('');
        return p.join('');
    };

    /* tslint:enable */
    /*es6
    import {extendObject} from 'meta';
    es6*/
    /// no import
    /**
    * This module contains the common methods of all drawing modules.
    *
    * @class
    * @this {Screen}
    */
    var Screen = (function () {
        function Screen(id, options) {
            if (typeof options === "undefined") { options = {}; }
            var _this = this;
            this.type = 'screen';
            var that = this, defaults = {
                height: 500,
                width: 500,
                contextMenu: {
                    screenshot: true,
                    fullscreen: true,
                    grid: true
                },
                figcaption: ''
            }, opts = MathLib.extendObject(defaults, options), container = document.getElementById(id), innerHTMLContextMenu = '', fullscreenchange;

            opts.uuid = +new Date();
            container.innerHTML = template(opts);
            container.className += ' MathLib_container';

            this.height = opts.height;
            this.width = opts.width;
            this.options = opts;
            this.container = container;
            this.figure = container.getElementsByClassName('MathLib_figure')[0];
            this.wrapper = container.getElementsByClassName('MathLib_wrapper')[0];
            this.contextMenu = container.getElementsByClassName('MathLib_mainmenu')[0];
            this.contextMenuOverlay = container.getElementsByClassName('MathLib_contextMenuOverlay')[0];
            this.innerHTMLContextMenu = innerHTMLContextMenu;

            this.wrapper.addEventListener('click', function () {
                return _this.wrapper.focus();
            });

            if (options.contextMenu) {
                this.wrapper.oncontextmenu = function (evt) {
                    return _this.oncontextmenu(evt);
                };

                if (opts.contextMenu.screenshot && !('opera' in window)) {
                    this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
                        var dataURI, a = document.createElement('a');

                        if (that.options.renderer === 'Canvas' && that.type === 'screen2D') {
                            var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');

                            canvas.height = that.height;
                            canvas.width = that.width;

                            ctx.drawImage(that.layer.back.element, 0, 0);
                            ctx.drawImage(that.layer.grid.element, 0, 0);
                            ctx.drawImage(that.layer.axes.element, 0, 0);
                            ctx.drawImage(that.layer.main.element, 0, 0);

                            dataURI = canvas.toDataURL('image/png');
                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.png';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/png', 'image/octet-stream');
                            }
                        }

                        if (that.options.renderer === 'WebGL' && that.type === 'screen3D') {
                            dataURI = that.element.toDataURL('image/png');
                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.png';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/png', 'image/octet-stream');
                            }
                        } else if (that.options.renderer === 'SVG') {
                            dataURI = 'data:image/svg+xml,' + that.element.parentElement.innerHTML;

                            if ('download' in a) {
                                a.href = dataURI;
                                a.download = 'plot.svg';
                                a.click();
                            } else {
                                window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
                            }
                        }
                    };
                }

                if (opts.contextMenu.fullscreen && 'requestFullScreen' in document.body) {
                    this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
                        if (document.fullscreenElement) {
                            document.exitFullScreen();
                        } else {
                            that.container.requestFullScreen();
                        }
                    };
                }

                if (opts.contextMenu.grid) {
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
                        that.options.grid.type = 'cartesian';
                        that.draw();
                    };
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
                        that.options.grid.type = 'polar';
                        that.draw();
                    };
                    this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
                        that.options.grid.type = false;
                        that.draw();
                    };
                }
            }

            fullscreenchange = function () {
                if (document.fullscreenElement) {
                    that.origWidth = that.width;
                    that.origHeight = that.height;
                    that.resize(window.outerWidth, window.outerHeight);
                } else {
                    that.resize(that.origWidth, that.origHeight);
                    delete that.origWidth;
                    delete that.origHeight;
                }
            };

            if ('onfullscreenchange' in this.container) {
                this.container.addEventListener('fullscreenchange', fullscreenchange);
            } else if ('onmozfullscreenchange' in this.container) {
                this.container.addEventListener('mozfullscreenchange', fullscreenchange);
            } else if ('onwebkitfullscreenchange' in this.container) {
                this.container.addEventListener('webkitfullscreenchange', fullscreenchange);
            }
        }
        /**
        * Handles the contextmenu event
        *
        * @param {event} evt The event object
        */
        Screen.prototype.oncontextmenu = function (evt) {
            var listener, _this = this, menu = this.contextMenu, overlay = this.contextMenuOverlay;

            if (evt.preventDefault) {
                evt.preventDefault();
            }
            evt.returnValue = false;

            menu.style.setProperty('top', (evt.clientY - 20) + 'px');
            menu.style.setProperty('left', evt.clientX + 'px');
            overlay.style.setProperty('display', 'block');

            listener = function () {
                overlay.style.setProperty('display', 'none');

                Array.prototype.forEach.call(_this.contextMenu.getElementsByClassName('MathLib_temporaryMenuItem'), function (x) {
                    _this.contextMenu.removeChild(x);
                });

                overlay.removeEventListener('click', listener);
            };

            overlay.addEventListener('click', listener);
        };
        return Screen;
    })();
    MathLib.Screen = Screen;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {colorConvert} from 'meta';
    import {Canvas} from 'Canvas';
    import {SVG} from 'SVG';
    es6*/
    /// import Screen2D
    /**
    * Layers for two dimensional plotting
    *
    * @class Layer
    * @this {Layer}
    */
    var Layer = (function () {
        function Layer(screen, id, zIndex) {
            var _this = this;
            this.screen = screen;
            this.id = id;
            this.zIndex = zIndex;

            this.stack = [];
            this.transformation = screen.transformation;

            var element, devicePixelRatio = window.devicePixelRatio || 1;

            if (screen.options.renderer === 'Canvas') {
                // Create the canvas
                element = document.createElement('canvas');
                element.className += ' MathLib_screen';
                element.width = screen.width * devicePixelRatio;
                element.height = screen.height * devicePixelRatio;

                if (devicePixelRatio !== 1) {
                    element.style.transformOrigin = 'top left';
                    element.style['-ms-transformOrigin'] = 'top left';
                    element.style.transform = 'scale(' + 1 / devicePixelRatio + ')';
                    element.style['-ms-transform'] = 'scale(' + 1 / devicePixelRatio + ')';
                    element.style['-webkit-transform'] = 'translate(-' + screen.width / devicePixelRatio + 'px, -' + screen.height / devicePixelRatio + 'px) scale(' + 1 / devicePixelRatio + ')';
                }

                screen.wrapper.appendChild(element);
                this.element = element;

                // Get the context and apply the transformations
                this.ctx = element.getContext('2d');

                this.applyTransformation = function () {
                    var m = _this.transformation;
                    _this.ctx.setTransform(devicePixelRatio * m[0][0], m[1][0], m[0][1], devicePixelRatio * m[1][1], devicePixelRatio * m[0][2], devicePixelRatio * m[1][2]);
                };
                this.applyTransformation();

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        var top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x;

                        // Draw the background
                        this.ctx.fillStyle = MathLib.colorConvert(screen.options.background);
                        this.ctx.fillRect(left, bottom, right - left, top - bottom);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.grid.color) || '#cccccc';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        // _this.ctx.lineWidth = (screen.options.grid.lineWidth || 4) / (screen.scale.x - screen.scale.y);
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.axes.color) || '#000000';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
                        _this.screen.drawAxes();
                    };
                } else {
                    this.ctx.strokeStyle = '#000000';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.Canvas.circle;
                this.line = MathLib.Canvas.line;
                this.path = MathLib.Canvas.path;
                this.pixel = MathLib.Canvas.pixel;
                this.point = MathLib.Canvas.point;
                this.text = MathLib.Canvas.text;
            } else if (screen.options.renderer === 'SVG') {
                var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g'), m = screen.transformation;

                ctx.className.baseVal = 'MathLib_layer_' + id;
                ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
                screen.element.appendChild(ctx);
                this.ctx = ctx;

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.grid.color) || '#cccccc');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.axes.color) || '#000000');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawAxes();
                    };
                } else {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.SVG.circle;
                this.line = MathLib.SVG.line;
                this.path = MathLib.SVG.path;
                this.pixel = MathLib.SVG.pixel;
                this.point = MathLib.SVG.point;
                this.text = MathLib.SVG.text;
            }

            // Insert the layer into the layer array of the screen object.
            screen.layer.splice(zIndex, 0, this);
        }
        /**
        * Clears the Layer
        *
        * @return {Layer} Returns the current Layer
        */
        Layer.prototype.clear = function () {
            this.screen.renderer.clear(this);
            return this;
        };
        return Layer;
    })();
    MathLib.Layer = Layer;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {abs, isZero} from 'Functn';
    import {colorConvert, extendObject} from 'meta';
    es6*/
    /// import Screen2D
    /**
    * The Canvas renderer for 2D plotting
    */
    MathLib.Canvas = {
        /**
        * Applies the current transformations to the screen
        */
        applyTransformation: function () {
            var m = this.transformation, devicePixelRatio = window.devicePixelRatio || 1;

            this.layer.forEach(function (l) {
                l.ctx.setTransform(devicePixelRatio * m[0][0], m[1][0], m[0][1], devicePixelRatio * m[1][1], devicePixelRatio * m[0][2], devicePixelRatio * m[1][2]);
            });
        },
        /**
        * Draws a circle on the screen.
        *
        * @param {Circle} circle The circle to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        circle: function (circle, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the circle
            ctx.beginPath();
            ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'circle',
                    object: circle,
                    options: options
                });
            }

            return this;
        },
        /**
        * Clears a given Layer.
        *
        * @param {Layer} layer The layer to be cleared
        */
        clear: function (layer) {
            var screen = layer.screen, left = -screen.translation.x / screen.scale.x, top = -screen.translation.y / screen.scale.y, width = screen.width / screen.scale.x, height = screen.height / screen.scale.y;

            layer.ctx.clearRect(left, top, width, height);
        },
        /**
        * Converts the options to the Canvas options format
        *
        * @param {drawingOptions} options The drawing options
        * @return {canvasDrawingOptions} The converted options
        */
        convertOptions: function (options) {
            var convertedOptions = {};

            if ('fillColor' in options) {
                convertedOptions.fillStyle = MathLib.colorConvert(options.fillColor);
            } else if ('color' in options) {
                convertedOptions.fillStyle = MathLib.colorConvert(options.color);
            }

            if ('font' in options) {
                convertedOptions.font = options.font;
            }

            if ('fontSize' in options) {
                convertedOptions.fontSize = options.fontSize;
            }

            if ('lineColor' in options) {
                convertedOptions.strokeStyle = MathLib.colorConvert(options.lineColor);
            } else if ('color' in options) {
                convertedOptions.strokeStyle = MathLib.colorConvert(options.color);
            }

            return convertedOptions;
        },
        /**
        * Draws a line on the screen.
        *
        * @param {Line} line The line to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        line: function (line, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, points, ctx = this.ctx, prop, opts;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Don't try to draw the line at infinity
            if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
                return this;
            } else {
                points = this.screen.getLineEndPoints(line);
            }

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the line
            ctx.beginPath();
            ctx.moveTo(points[0][0], points[0][1]);
            ctx.lineTo(points[1][0], points[1][1]);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'line',
                    object: line,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a path on the screen.
        *
        * @param {Path} curve The path to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the scren
        */
        path: function (curve, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts, path, paths = [], x, y, i, fx, fxold, step = 2 / (screen.scale.x - screen.scale.y), from, to;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // If curve is a function f, the path will be (x, f(x))
            if (typeof curve === 'function') {
                path = [];
                from = ('from' in options ? (options).from : (-screen.translation.x) / screen.scale.x) - step;
                to = ('to' in options ? (options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;

                for (i = from; i <= to; i += step) {
                    fx = curve(i);

                    // Inline NaN test and disontinuity test
                    // Check if we are drawing a (nearly) vertical line, which should not be there.
                    // i.e the vertical lines at π/2 for the tangent function
                    // TODO: Find a better check if there is a discontinuity.
                    if (fx !== fx || (MathLib.abs((fxold - fx) / step) >= 1e2 && (fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
                        // Don't add empty subpaths
                        if (path.length) {
                            paths.push(path);
                            path = [];
                        }
                    } else {
                        path.push([i, fx]);
                    }

                    fxold = fx;
                }
                if (path.length) {
                    paths.push(path);
                }
            } else if (typeof curve[0] === 'function') {
                path = [];
                x = curve[0];
                y = curve[1];
                from = ('from' in options ? (options).from : 0) - step;
                to = ('to' in options ? (options).to : 2 * Math.PI) + step;
                for (i = from; i <= to; i += step) {
                    path.push([x(i), y(i)]);
                }
                paths.push(path);
            } else {
                path = curve;
            }

            // Draw the path
            // Till now I haven't found a way to stroke and fill the path in one go.
            // The problem is basically, that moveTo creates a new subpath
            // and every subpath is filled on its own.
            if (options.fillColor || options.fillColor !== 'transparent') {
                ctx.beginPath();
                ctx.lineTo(from, 0);
                paths.forEach(function (path) {
                    // The following line (and the line four lines afterwards) fixes the fill at holes in the path.
                    ctx.lineTo(path[0][0], 0);
                    path.forEach(function (x) {
                        ctx.lineTo(x[0], x[1]);
                    });
                    ctx.lineTo(path[path.length - 1][0], 0);
                });
                ctx.fill();
                // ctx.closePath();
            }

            if (options.lineColor || options.lineColor !== 'transparent') {
                ctx.beginPath();
                paths.forEach(function (path) {
                    ctx.moveTo(path[0][0], path[0][1]);
                    path.forEach(function (x) {
                        ctx.lineTo(x[0], x[1]);
                    });
                });
                ctx.stroke();
                // ctx.closePath();
            }

            ctx.restore();

            if (!redraw) {
                if (options.conic) {
                    this.stack.push({
                        type: 'conic',
                        object: options.conic,
                        options: options
                    });
                } else {
                    this.stack.push({
                        type: 'path',
                        object: curve,
                        options: options
                    });
                }
            }

            return this;
        },
        /**
        * Draws pixel on the screen.
        *
        * @param {function} f The pixel function
        * @param {number} t The top coordinate of the draw rectangle
        * @param {number} r The right coordinate of the draw rectangle
        * @param {number} b The bottom coordinate of the draw rectangle
        * @param {number} l The left coordinate of the draw rectangle
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        pixel: function (f, t, r, b, l, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, ctx = this.ctx, x, y, i;

            t = Math.min(top, t);
            r = Math.min(right, r);
            b = Math.max(bottom, b);
            l = Math.max(left, l);

            var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (bPxl - tPxl), imgData = ctx.createImageData(w, h), pxl;

            for (y = tPxl, i = 0; y > bPxl; y--) {
                for (x = lPxl; x < rPxl; x++, i++) {
                    pxl = f(x / screen.scale.x, y / screen.scale.y);
                    imgData.data[4 * i] = pxl[0];
                    imgData.data[4 * i + 1] = pxl[1];
                    imgData.data[4 * i + 2] = pxl[2];
                    imgData.data[4 * i + 3] = pxl[3];
                }
            }

            ctx.putImageData(imgData, (left - l) * screen.scale.x, (t - top) * screen.scale.y);

            if (!redraw) {
                this.stack.push({
                    type: 'pixel',
                    object: f,
                    t: t,
                    r: r,
                    b: b,
                    l: l,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a point on the screen.
        *
        * @param {Point} point The point to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        point: function (point, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, ctx = this.ctx, prop, opts, dist;

            ctx.save();
            ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

            // Set the drawing options
            if (options) {
                opts = MathLib.Canvas.convertOptions(options);

                if (!('fillColor' in options) && !('color' in options)) {
                    opts.fillStyle = 'black';
                }

                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        ctx[prop] = opts[prop];
                    }
                }

                if ('setLineDash' in ctx) {
                    ctx.setLineDash(('dash' in options ? options.dash : []));
                }
                if ('lineDashOffset' in ctx) {
                    ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
                }
            }

            // Draw the point
            ctx.beginPath();
            ctx.arc(point[0] / point[2], point[1] / point[2], (options.size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            if (options.label) {
                dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
                screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
            }

            if (!redraw) {
                this.stack.push({
                    type: 'point',
                    object: point,
                    options: options
                });
            }

            return this;
        },
        /**
        * Writes text on the screen.
        *
        * @param {string} str The string to be drawn
        * @param {number} x The x coordinate
        * @param {number} y The y coordinate
        * @param {drawingOptions} options Optional drawing options
        * @return {Screen} Returns the screen
        */
        text: function (str, x, y, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var defaults = {
                font: 'Helvetica',
                fontSize: 12,
                // lineWidth:  0.05,
                textColor: 'rgba(0, 0, 0, 1)'
            }, ctx, prop, opts;

            ctx = this.ctx;

            opts = MathLib.Canvas.convertOptions(MathLib.extendObject(defaults, options));

            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            ctx.fillStyle = MathLib.colorConvert(options.textColor || options.color || defaults.textColor);
            ctx.strokeStyle = MathLib.colorConvert(options.textColor || options.color || defaults.textColor);

            ctx.font = opts.fontSize + 'px ' + opts.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            var tf = this.screen.transformation;

            ctx.save();
            ctx.transform(1 / tf[0][0], 0, 0, 1 / tf[1][1], 0, 0);
            ctx.fillText(str, tf[0][0] * x, tf[1][1] * y);
            ctx.restore();

            if (!redraw) {
                this.stack.push({
                    type: 'text',
                    object: str,
                    x: x,
                    y: y,
                    options: options
                });
            }

            return this;
        }
    };
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {abs, hypot, isZero} from 'Functn';
    import {colorConvert, extendObject} from 'meta';
    es6*/
    /// import Screen2D
    /**
    * The SVG renderer for 2D plotting
    */
    MathLib.SVG = {
        /**
        * Applies the current transformations to the screen
        */
        applyTransformation: function () {
            var m = this.transformation;
            this.layer.forEach(function (l) {
                l.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
            });
        },
        /**
        * Draws a circle on the screen.
        *
        * @param {Circle} circle The circle to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        circle: function (circle, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, prop, opts, svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            svgCircle.setAttribute('cx', circle.center[0]);
            svgCircle.setAttribute('cy', circle.center[1]);
            svgCircle.setAttribute('r', circle.radius);

            if (options) {
                svgCircle.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgCircle.setAttribute(prop, opts[prop]);
                    }
                }
            }

            this.ctx.appendChild(svgCircle);

            if (!redraw) {
                this.stack.push({
                    type: 'circle',
                    object: circle,
                    options: options
                });
            }

            return this;
        },
        /**
        * Clears a given Layer.
        *
        * @param {Layer} layer The layer to be cleared
        */
        clear: function (layer) {
            layer.ctx.textContent = '';
        },
        /**
        * Converts the options to the SVG options format
        *
        * @param {drawingOptions} options The drawing options
        * @return {svgDrawingOptions} The converted options
        */
        convertOptions: function (options) {
            var convertedOptions = {};
            if ('fillColor' in options) {
                convertedOptions.fill = MathLib.colorConvert(options.fillColor);
            } else if ('color' in options) {
                convertedOptions.fill = MathLib.colorConvert(options.color);
            }

            if ('font' in options) {
                convertedOptions.font = options.font;
            }

            if ('fontSize' in options) {
                convertedOptions.fontSize = options.fontSize;
            }

            if ('lineColor' in options) {
                convertedOptions.stroke = MathLib.colorConvert(options.lineColor);
            } else if ('color' in options) {
                convertedOptions.stroke = MathLib.colorConvert(options.color);
            }

            if ('dash' in options && options.dash.length !== 0) {
                convertedOptions['stroke-dasharray'] = options.dash;
            }

            if ('dashOffset' in options && options.dashOffset !== 0) {
                convertedOptions['stroke-dashoffset'] = options.dashOffset;
            }

            return convertedOptions;
        },
        /**
        * Draws a line on the screen.
        *
        * @param {Line} line The line to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Canvas} Returns the screen
        */
        line: function (line, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, points, prop, opts, svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            // Don't try to draw the line at infinity
            if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
                return this;
            } else {
                points = this.screen.getLineEndPoints(line);
            }

            svgLine.setAttribute('x1', points[0][0]);
            svgLine.setAttribute('y1', points[0][1]);
            svgLine.setAttribute('x2', points[1][0]);
            svgLine.setAttribute('y2', points[1][1]);

            if (options) {
                svgLine.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgLine.setAttribute(prop, opts[prop]);
                    }
                }
            }

            this.ctx.appendChild(svgLine);

            if (!redraw) {
                this.stack.push({
                    type: 'line',
                    object: line,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a path on the screen.
        *
        * @param {any} curve The path to be drawn
        * @param {pathDrawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        path: function (curve, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, svgPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'), svgPathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path'), step = 2 / (screen.scale.x - screen.scale.y), pathStringFill, pathStringStroke, from, to, prop, opts, x, y, i, path, paths = [], fx, fxold;

            // If curve is a function f, the path will be (x, f(x))
            if (typeof curve === 'function') {
                path = [];
                from = ('from' in options ? options.from : -screen.translation.x / screen.scale.x) - step;
                to = ('to' in options ? options.to : (screen.width - screen.translation.x) / screen.scale.x) + step;
                for (i = from; i <= to; i += step) {
                    fx = curve(i);

                    // Inline NaN test and disontinuity test
                    // For more info see the corresponding function for canvas
                    if (fx !== fx || (MathLib.abs((fxold - fx) / step) >= 1e2 && (fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
                        // Don't add empty subpaths
                        if (path.length) {
                            paths.push(path);
                            path = [];
                        }
                    } else {
                        path.push([i, fx]);
                    }

                    fxold = fx;
                }
                if (path.length) {
                    paths.push(path);
                }
            } else if (typeof curve[0] === 'function') {
                path = [];
                x = curve[0];
                y = curve[1];
                from = ('from' in options ? options.from : 0) - step;
                to = ('to' in options ? options.to : 2 * Math.PI) + step;
                for (i = from; i <= to; i += step) {
                    path.push([x(i), y(i)]);
                }
                paths.push(path);
            } else {
                path = curve;
            }

            pathStringFill = 'M' + from + ' 0 ' + paths.reduce(function (previ, path) {
                return previ + ' L ' + path[0][0] + ' 0 ' + path.reduce(function (prev, cur) {
                    return prev + ' L ' + cur.join(' ');
                }, '') + ' L ' + path[path.length - 1][0] + ' 0 ';
            }, '');

            pathStringStroke = paths.reduce(function (previ, path) {
                return previ + ' M ' + path[0].join(' ') + path.reduce(function (prev, cur) {
                    return prev + ' L ' + cur.join(' ');
                }, '');
            }, '');

            if (pathStringFill !== '') {
                svgPathFill.setAttribute('d', pathStringFill);
            }
            if (pathStringStroke) {
                svgPathStroke.setAttribute('d', pathStringStroke);
            }

            svgPathStroke.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');

            if (options) {
                opts = MathLib.SVG.convertOptions(options);
                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgPathFill.setAttribute(prop, opts[prop]);
                        svgPathStroke.setAttribute(prop, opts[prop]);
                    }
                }
            }

            svgPathFill.setAttribute('stroke', 'transparent');
            svgPathStroke.setAttribute('fill', 'transparent');

            this.ctx.appendChild(svgPathFill);
            this.ctx.appendChild(svgPathStroke);

            if (!redraw) {
                if (options.conic) {
                    this.stack.push({
                        type: 'conic',
                        object: options.conic,
                        options: options
                    });
                } else {
                    this.stack.push({
                        type: 'path',
                        object: curve,
                        options: options
                    });
                }
            }

            return this;
        },
        /**
        * Draws pixel on the screen.
        *
        * @param {function} f The pixel function
        * @param {number} t The top coordinate of the draw rectangle
        * @param {number} r The right coordinate of the draw rectangle
        * @param {number} b The bottom coordinate of the draw rectangle
        * @param {number} l The left coordinate of the draw rectangle
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        pixel: function (f, t, r, b, l, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, canvas = document.createElement('canvas'), canvasCtx = canvas.getContext('2d'), svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'), svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'), x, y, i, pxl, m = screen.transformation;

            canvas.width = screen.width;
            canvas.height = screen.height;
            canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

            svgContainer.setAttribute('transform', 'matrix(' + 1 / m[0][0] + ', 0, 0, ' + 1 / m[1][1] + ', -' + m[0][2] / m[0][0] + ', ' + -m[1][2] / m[1][1] + ')');
            svgImage.setAttribute('width', screen.width + 'px');
            svgImage.setAttribute('height', screen.height + 'px');
            svgImage.setAttribute('x', '0');
            svgImage.setAttribute('y', '0');

            t = Math.min(top, t);
            r = Math.min(right, r);
            b = Math.max(bottom, b);
            l = Math.max(left, l);

            var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (tPxl - bPxl), imgData = canvasCtx.createImageData(w, h);

            for (y = tPxl, i = 0; y > bPxl; y--) {
                for (x = lPxl; x < rPxl; x++, i++) {
                    pxl = f(x / screen.scale.x, y / screen.scale.y);
                    imgData.data[4 * i] = pxl[0];
                    imgData.data[4 * i + 1] = pxl[1];
                    imgData.data[4 * i + 2] = pxl[2];
                    imgData.data[4 * i + 3] = pxl[3];
                }
            }

            canvasCtx.putImageData(imgData, 0, 0);

            svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', canvas.toDataURL());

            svgContainer.appendChild(svgImage);
            this.ctx.appendChild(svgContainer);

            if (!redraw) {
                this.stack.push({
                    type: 'pixel',
                    object: f,
                    t: t,
                    r: r,
                    b: b,
                    l: l,
                    options: options
                });
            }

            return this;
        },
        /**
        * Draws a point on the screen.
        *
        * @param {Point} point The point to be drawn
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        point: function (point, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var screen = this.screen, prop, opts, dist, svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

            svgPoint.setAttribute('cx', point[0] / point[2] + '');
            svgPoint.setAttribute('cy', point[1] / point[2] + '');
            svgPoint.setAttribute('r', (options.size || 10) / (screen.scale.x - screen.scale.y) + '');

            if (options) {
                svgPoint.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
                opts = MathLib.SVG.convertOptions(options);

                if (!('fillOpacity' in options)) {
                    opts['fill-opacity'] = '1';
                }

                if (!('fillColor' in options) && !('color' in options)) {
                    opts.fill = 'black';
                }

                for (prop in opts) {
                    if (opts.hasOwnProperty(prop)) {
                        svgPoint.setAttribute(prop, opts[prop]);
                    }
                }
            }

            if (options.moveable) {
                svgPoint.setAttribute('cursor', 'move');

                // mousedown
                svgPoint.addEventListener('mousedown', function () {
                    screen.options.interaction.type = 'move';
                    var invTransformation = screen.transformation.inverse();

                    var move = function (evt) {
                        evt.stopPropagation();

                        var evtPoint = invTransformation.times(screen.getEventPoint(evt));
                        point[0] = evtPoint[0];
                        point[1] = evtPoint[1];
                        screen.draw();
                    }, up = function () {
                        screen.options.interaction.type = '';

                        document.body.removeEventListener('mousemove', move);
                        document.body.removeEventListener('mouseup', up);
                    };

                    // mousemove
                    document.body.addEventListener('mousemove', move);

                    // mouseup
                    document.body.addEventListener('mouseup', up);
                });
            }

            this.ctx.appendChild(svgPoint);

            if (options.label) {
                dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
                screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
            }

            svgPoint.addEventListener('contextmenu', function () {
                screen.options.interaction.type = 'contextmenu';
                var x = svgPoint.cx.baseVal.value, y = svgPoint.cy.baseVal.value;

                screen.contextMenu.innerHTML = '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_is_disabled MathLib_is_centered">Point</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Coordinates' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">cartesian: <span class="MathLib_is_selectable MathLib_is_right">(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')</span></div>' + '<div class="MathLib_menuItem">polar: <span class="MathLib_is_selectable MathLib_is_right">(' + MathLib.hypot(x, y).toFixed(3) + ', ' + Math.atan2(y, x).toFixed(3) + ')</span></div>' + '</menu>' + '</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Options' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">Moveable:' + '<input type="checkbox" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Size:' + '<input type="spinner" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Fill color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Line color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '</menu>' + '</div>' + '<hr class="MathLib_separator MathLib_temporaryMenuItem">' + screen.contextMenu.innerHTML;
            });

            if (!redraw) {
                this.stack.push({
                    type: 'point',
                    object: point,
                    options: options
                });
            }

            return this;
        },
        /**
        * Writes text on the screen.
        *
        * @param {string} str The string to be drawn
        * @param {number} x The x coordinate
        * @param {number} y The y coordinate
        * @param {drawingOptions} options Optional drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Screen} Returns the screen
        */
        text: function (str, x, y, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            var defaults = {
                font: 'Helvetica',
                fontSize: 12,
                // lineWidth:  0.05,
                textColor: 'rgba(0, 0, 0, 1)'
            }, opts, screen = this.screen, svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'), svgTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

            opts = MathLib.SVG.convertOptions(MathLib.extendObject(defaults, options));

            svgTspan.textContent = str;
            svgTspan.setAttribute('x', x * screen.scale.x + '');
            svgTspan.setAttribute('y', y * screen.scale.y + '');
            svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
            svgText.setAttribute('font-family', opts.font);
            svgText.setAttribute('font-size', opts.fontSize);
            svgText.setAttribute('fill', MathLib.colorConvert(options.textColor || options.color) || defaults.textColor);
            svgText.setAttribute('fill-opacity', '1');
            svgText.setAttribute('stroke', MathLib.colorConvert(options.textColor || options.color) || defaults.textColor);
            svgText.setAttribute('text-anchor', 'middle');

            // alignment-baseline isn't defined for text elements,
            // only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.
            // see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)
            // But it works for text elements, so we don't need an additional tspan element.
            svgTspan.setAttribute('alignment-baseline', 'middle');

            svgText.appendChild(svgTspan);
            this.ctx.appendChild(svgText);

            if (!redraw) {
                this.stack.push({
                    type: 'text',
                    object: str,
                    x: x,
                    y: y,
                    options: options
                });
            }

            return this;
        }
    };
})(MathLib);



(function (MathLib) {
    'use strict';

    /*es6
    import {} from 'Functn';
    import {colorConvert, extendObject} from 'meta';
    import {Circle} from 'Circle';
    import {Layer} from 'Layer';
    import {Matrix} from 'Matrix';
    import {Point} from 'Point';
    import {Screen} from 'Screen';
    es6*/
    /// import Screen
    /**
    * Two dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen2D}
    */
    var Screen2D = (function (_super) {
        __extends(Screen2D, _super);
        function Screen2D(id, options) {
            if (typeof options === "undefined") { options = {}; }
            var _this = this;
            _super.call(this, id, options);
            this.type = 'screen2D';
            var defaults = {
                axes: {
                    color: 0x000000,
                    lineColor: 0x000000,
                    textColor: 0x000000,
                    /*						label: true
                    label: false
                    label: {
                    x: true,
                    y: false
                    }
                    */
                    label: {
                        fontSize: 12,
                        font: 'Helvetica',
                        x: true,
                        y: true
                    },
                    x: true,
                    y: true
                },
                grid: {
                    // angle: Math.PI / 8,
                    type: 'cartesian',
                    lineColor: 0xcccccc,
                    lineWidth: 4,
                    dash: [],
                    dashOffset: 0,
                    // tick: {x: 1, y: 1, r: 1}
                    x: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    y: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    r: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                    angle: { tick: Math.PI / 8, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 }
                },
                interaction: {
                    allowPan: true,
                    allowZoom: true,
                    zoomSpeed: 1
                },
                background: 0xffffff,
                lookAt: { x: 0, y: 0 },
                range: { x: 1, y: 1 },
                figcaption: '',
                renderer: 'Canvas',
                transformation: new MathLib.Matrix([
                    [Math.min(this.height, this.width) / 2, 0, this.width / 2],
                    [0, -Math.min(this.height, this.width) / 2, this.height / 2],
                    [0, 0, 1]
                ])
            }, opts = MathLib.extendObject(defaults, options), element, transformation = opts.transformation, that = this;

            this.options = opts;
            this.renderer = MathLib[opts.renderer];

            this.circle = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.circle.apply(_this.layer.main, args);
            };
            this.line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.main, args);
            };
            this.path = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.path.apply(_this.layer.main, args);
            };

            // Should the pixel method default to the main layer or to the back layer?
            this.pixel = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.pixel.apply(_this.layer.main, args);
            };
            this.point = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.point.apply(_this.layer.main, args);
            };
            this.text = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.text.apply(_this.layer.main, args);
            };

            // Remove the warning message.
            this.wrapper.innerHTML = '';

            this.container.className += ' MathLib_screen2D';

            // This is just a dummy method for the following few lines.
            // The real applyTransformation method is specified after the creation of the layers.
            this.applyTransformation = function () {
            };

            // The interaction methods
            this.translation = {};
            this.scale = {};
            this.transformation = transformation;

            Object.defineProperty(this.translation, 'x', {
                get: function () {
                    return that.transformation[0][2];
                },
                set: function (x) {
                    that.transformation[0][2] = x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.translation, 'y', {
                get: function () {
                    return that.transformation[1][2];
                },
                set: function (y) {
                    that.transformation[1][2] = y;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.scale, 'x', {
                get: function () {
                    return that.transformation[0][0];
                },
                set: function (x) {
                    that.transformation[0][0] = x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.scale, 'y', {
                get: function () {
                    return that.transformation[1][1];
                },
                set: function (y) {
                    that.transformation[1][1] = y;
                    that.applyTransformation();
                }
            });

            this.lookAt = {};
            this.range = {};
            Object.defineProperty(this.lookAt, 'x', {
                get: function () {
                    return (that.width / 2 - that.transformation[0][2]) / that.transformation[0][0];
                },
                set: function (x) {
                    that.transformation[0][2] = that.width / 2 - x * that.transformation[0][0];
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.lookAt, 'y', {
                get: function () {
                    return (that.height / 2 - that.transformation[1][2]) / that.transformation[1][1];
                },
                set: function (y) {
                    that.transformation[1][2] = that.height / 2 - y * that.transformation[1][1];
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.range, 'x', {
                get: function () {
                    return that.width / (2 * that.transformation[0][0]);
                },
                set: function (x) {
                    that.transformation[0][0] = 0.5 * that.width / x;
                    that.applyTransformation();
                }
            });

            Object.defineProperty(this.range, 'y', {
                get: function () {
                    return -that.height / (2 * that.transformation[1][1]);
                },
                set: function (y) {
                    that.transformation[1][1] = -0.5 * that.height / y;
                    that.applyTransformation();
                }
            });

            this.range.x = opts.range.x;
            this.range.y = opts.range.y;
            this.lookAt.x = opts.lookAt.x;
            this.lookAt.y = opts.lookAt.y;

            // Create the SVG element which contains the layers
            if (opts.renderer === 'SVG') {
                // Create the canvas
                element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                // Safari does not support .classList on SVG elements
                // This feature has be in webkit since [08/02/12](http://trac.webkit.org/changeset/124499)
                /* element.classList.add('MathLib_screen'); */
                element.className.baseVal = 'MathLib_screen';
                element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                element.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
                element.setAttribute('height', this.height + 'px');
                element.setAttribute('width', this.width + 'px');
                element.setAttribute('version', '1.1');

                element.setAttribute('stroke', '#000000');
                element.setAttribute('stroke-opacity', '1');
                element.setAttribute('fill', 'transparent');

                this.element = element;
                this.wrapper.appendChild(element);

                // if ('background' in options) {
                var background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

                background.setAttribute('x', '0px');
                background.setAttribute('y', '0px');
                background.setAttribute('width', this.width + 'px');
                background.setAttribute('height', this.height + 'px');
                background.setAttribute('stroke', 'transparent');
                background.setAttribute('fill', 'background' in options ? MathLib.colorConvert(options.background) : 'white');
                background.setAttribute('fill-opacity', '1');
                this.element.appendChild(background);
                // }
            }

            // Create the Layers
            // =================
            this.layer = [];
            this.layer.back = new MathLib.Layer(this, 'back', 0);
            this.layer.grid = new MathLib.Layer(this, 'grid', 1);
            this.layer.axes = new MathLib.Layer(this, 'axes', 2);
            this.layer.main = new MathLib.Layer(this, 'main', 3);

            this.wrapper.addEventListener('keydown', function (evt) {
                return _this.onkeydown(evt);
            }, false);
            this.wrapper.addEventListener('mouseup', function (evt) {
                return _this.onmouseup(evt);
            }, false);
            this.wrapper.addEventListener('mousedown', function (evt) {
                return _this.onmousedown(evt);
            }, false);
            this.wrapper.addEventListener('mousemove', function (evt) {
                return _this.onmousemove(evt);
            }, false);
            this.wrapper.addEventListener('mousewheel', function (evt) {
                return _this.onmousewheel(evt);
            }, false);

            // For Firefox: [Bug report for the missing onmousewheel method](https://bugzilla.mozilla.org/show_bug.cgi?id=111647)
            this.wrapper.addEventListener('DOMMouseScroll', function (evt) {
                return _this.onmousewheel(evt);
            }, false);

            this.applyTransformation = this.renderer.applyTransformation;

            this.draw = function (x, options) {
                var _this = this;
                if (typeof options === "undefined") { options = {}; }
                // Clear and redraw the screen
                if (arguments.length === 0) {
                    this.layer.forEach(function (l) {
                        l.clear().draw();
                    });
                } else if (x.type === 'circle') {
                    this.circle(x, options);
                } else if (x.type === 'line') {
                    this.line(x, options);
                } else if (Array.isArray(x)) {
                    x.forEach(function (y) {
                        return _this[y.type](y, options);
                    });
                }
            };

            if (this.options.contextMenu) {
                var gridType = opts.grid.type ? opts.grid.type : 'none';
                this.contextMenu.querySelectorAll('.MathLib_grid_type[value=' + gridType + ']')[0].checked = true;
            }

            this.draw();
        }
        /**
        * Draws the axes.
        *
        * @return {Screen2D}
        */
        Screen2D.prototype.drawAxes = function () {
            var _this = this;
            var i, line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.axes, args);
            }, text = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.text.apply(_this.layer.axes, args);
            }, options = {
                lineColor: MathLib.colorConvert(this.options.axes.color),
                'stroke-width': -1 / this.transformation[1][1]
            }, textOptions = {
                font: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.font : '',
                fontSize: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.fontSize : '',
                // fontSize: this.options.axes.label.fontSize,
                strokeStyle: MathLib.colorConvert(this.options.axes.textColor),
                fillStyle: MathLib.colorConvert(this.options.axes.textColor)
            }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lengthX = 10 / this.transformation[0][0], lengthY = -10 / this.transformation[1][1], yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3), xExp = 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3), yTick = Math.pow(10, yExp), xTick = Math.pow(10, xExp), xLen = Math.max(0, Math.min(20, -xExp)), yLen = Math.max(0, Math.min(20, -yExp));

            if (!this.options.axes) {
                return this;
            }

            // The axes
            if (this.options.axes.x) {
                line([[left, 0], [right, 0]], options, true);
            }
            if (this.options.axes.y) {
                line([[0, bottom], [0, top]], options, true);
            }

            // The ticks on the axes
            // The x axis
            if (this.options.axes.x) {
                for (i = 0; i >= left; i -= yTick) {
                    line([[i, -lengthY], [i, lengthY]], options, true);
                }
                for (i = yTick; i <= right; i += yTick) {
                    line([[i, -lengthY], [i, lengthY]], options, true);
                }
            }

            // The y axis
            if (this.options.axes.y) {
                for (i = 0; i >= bottom; i -= xTick) {
                    line([[-lengthX, i], [lengthX, i]], options, true);
                }
                for (i = xTick; i <= top; i += xTick) {
                    line([[-lengthX, i], [lengthX, i]], options, true);
                }
            }

            // The labels
            // The x axes
            // .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
            // .toFixed expects arguments between 0 and 20.
            if (this.options.axes.label) {
                if (this.options.axes.x) {
                    for (i = -yTick; i >= left; i -= yTick) {
                        text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                    }
                    for (i = yTick; i <= right; i += yTick) {
                        text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                    }
                }

                // The y axes
                if (this.options.axes.y) {
                    for (i = -xTick; i >= bottom; i -= xTick) {
                        text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                    }
                    for (i = xTick; i <= top; i += xTick) {
                        text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                    }
                } else {
                    text((0).toFixed(yLen), 0, -2 * lengthY, textOptions, true);
                }
            }

            return this;
        };

        /**
        * Draws the grid.
        *
        * @return {Screen2D}
        */
        Screen2D.prototype.drawGrid = function () {
            var _this = this;
            if (!this.options.grid) {
                return this;
            }

            var i, ii, min, max, line = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.line.apply(_this.layer.grid, args);
            }, circle = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                return _this.renderer.circle.apply(_this.layer.grid, args);
            }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, yTick = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)), xTick = Math.pow(10, 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3));

            if (this.options.grid.type === 'cartesian') {
                // The vertical lines
                if (this.options.grid.x) {
                    for (i = left - (left % xTick); i <= right; i += xTick) {
                        line([[i, bottom], [i, top]], MathLib.extendObject(this.options.grid, this.options.grid.x), true);
                    }
                }

                // The horizontal lines
                if (this.options.grid.y) {
                    for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
                        line([[left, i], [right, i]], MathLib.extendObject(this.options.grid, this.options.grid.y), true);
                    }
                }
                // Test for logarithmic plots
                /*for (i = left - (left % this.axes.tick.x); i <= right; i += this.axes.tick.x) {
                for (var j = 1; j <= 10; j++ ) {
                this.line([[i * Math.log(10) + Math.log(j), bottom], [i * Math.log(10) + Math.log(j), top]], options);
                }
                }*/
            } else if (this.options.grid.type === 'polar') {
                max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right));
                min = 0; // TODO: improve this estimate

                if (this.options.grid.angle) {
                    for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle.tick) {
                        line([
                            [0, 0],
                            [max * Math.cos(i), max * Math.sin(i)]], MathLib.extendObject(this.options.grid, this.options.grid.angle), true);
                    }
                }

                if (this.options.grid.r) {
                    for (i = min; i <= max; i += Math.min(xTick, yTick)) {
                        circle(new MathLib.Circle([0, 0, 1], i), MathLib.extendObject(this.options.grid, this.options.grid.r), true);
                    }
                }
            }

            return this;
        };

        /**
        * Creates a point based on the coordinates of an event.
        *
        * @param {event} evt The event object
        * @return {Point}
        */
        Screen2D.prototype.getEventPoint = function (evt) {
            var x, y;
            if (evt.offsetX) {
                x = evt.offsetX;
                y = evt.offsetY;
            } else {
                x = evt.layerX;
                y = evt.layerY;
            }

            if (this.options.renderer === 'Canvas') {
                x /= window.devicePixelRatio;
                y /= window.devicePixelRatio;
            }

            return new MathLib.Point([x, y, 1]);
        };

        /**
        * Calculates the both endpoints for the line
        * for drawing purposes
        *
        * @param {Line|array} l The Line to calculate the end points to
        * @return {array} The array has the format [[x1, y1], [x2, y2]]
        */
        Screen2D.prototype.getLineEndPoints = function (l) {
            if (l.type === 'line') {
                var top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lineRight = -(l[2] + l[0] * right) / l[1], lineTop = -(l[2] + l[1] * top) / l[0], lineLeft = -(l[2] + l[0] * left) / l[1], lineBottom = -(l[2] + l[1] * bottom) / l[0], points = [];

                if (lineRight <= top && lineRight >= bottom) {
                    points.push([right, lineRight]);
                }
                if (lineLeft <= top && lineLeft >= bottom) {
                    points.push([left, lineLeft]);
                }
                if (lineTop < right && lineTop > left) {
                    points.push([lineTop, top]);
                }
                if (lineBottom < right && lineBottom > left) {
                    points.push([lineBottom, bottom]);
                }
                return points;
            } else {
                return l;
            }
        };

        /**
        * Handles the keydown event
        *
        * @param {KeyboardEvent} evt The event object
        */
        Screen2D.prototype.onkeydown = function (evt) {
            var keyCode, keyTable = {
                Left: 37,
                Up: 38,
                Right: 39,
                Down: 40
            };

            // evt.key is the new property to identify the key pressed.
            // http://www.w3.org/TR/DOM-Level-3-Events/#widl-KeyboardEvent-key
            // Not supported in all browsers yet.
            if (evt.key) {
                if (['Up', 'Right', 'Down', 'Left'].indexOf(evt.key) === -1) {
                    return;
                } else {
                    keyCode = keyTable[evt.key];
                }
            } else if (evt.keyCode) {
                if ([37, 38, 39, 40].indexOf(evt.keyCode) === -1) {
                    return;
                } else {
                    keyCode = evt.keyCode;
                }
            } else {
                return;
            }

            evt.preventDefault();

            this.options.interaction.startTransformation = this.transformation.copy();

            this.translation.x = this.options.interaction.startTransformation[0][2] - 2 * ((evt.keyCode - 38) % 2);
            this.translation.y = this.options.interaction.startTransformation[1][2] - 2 * ((evt.keyCode - 39) % 2);
            this.draw();
        };

        /**
        * Handles the mousedown event
        *
        * @param {MouseEvent} evt The event object
        */
        Screen2D.prototype.onmousedown = function (evt) {
            // Only start the action if the left mouse button was clicked
            if (evt.button !== 0) {
                return;
            }

            evt.preventDefault();

            // Pan mode
            if (this.options.interaction.allowPan && !this.options.interaction.type) {
                this.options.interaction.type = 'pan';
                this.options.interaction.startPoint = this.getEventPoint(evt);
                this.options.interaction.startTransformation = this.transformation.copy();
            }
        };

        /**
        * Handles the mousemove event
        *
        * @param {MouseEvent} evt The event object
        */
        Screen2D.prototype.onmousemove = function (evt) {
            var p, devicePixelRatio = window.devicePixelRatio || 1;

            evt.preventDefault();

            // Pan mode
            if (this.options.interaction.type === 'pan') {
                p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
                this.translation.x = this.options.interaction.startTransformation[0][2] + p[0] / devicePixelRatio;
                this.translation.y = this.options.interaction.startTransformation[1][2] + p[1] / devicePixelRatio;
                this.draw();
            }
        };

        /**
        * Handles the mouseup event
        *
        * @param {MouseEvent} evt The event object
        */
        Screen2D.prototype.onmouseup = function (evt) {
            evt.preventDefault();

            // Go back to normal mode
            if (this.options.interaction.type === 'pan') {
                delete this.options.interaction.type;
                delete this.options.interaction.startPoint;
                delete this.options.interaction.startTransformation;
            }
        };

        /**
        * Handles the mousewheel event
        *
        * @param {MouseEvent} evt The event object
        */
        Screen2D.prototype.onmousewheel = function (evt) {
            var delta, s, p, z;

            if (this.options.interaction.allowZoom) {
                evt.preventDefault();

                // Chrome/Safari
                if (evt.wheelDelta) {
                    delta = evt.wheelDelta / 360;
                } else {
                    delta = evt.detail / -9;
                }

                // The amount of zoom is determined by the zoom speed
                // and the amount how much the scrollwheel has been moved
                z = Math.pow(1 + this.options.interaction.zoomSpeed, delta);

                // Transform the (computer-)screen coordinates of the mouse to the internal coordinates
                p = this.transformation.inverse().times(this.getEventPoint(evt));

                // Compute new scale matrix in current mouse position
                s = new MathLib.Matrix([[z, 0, p[0] - p[0] * z], [0, z, p[1] - p[1] * z], [0, 0, 1]]);

                this.transformation = this.transformation.times(s);

                this.applyTransformation();
                this.draw();
            }
        };

        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen2D}
        */
        Screen2D.prototype.resize = function (width, height) {
            var lookAtX = this.lookAt.x, lookAtY = this.lookAt.y;

            this.height = height;
            this.width = width;

            if (this.options.renderer === 'Canvas') {
                this.layer.back.element.width = width;
                this.layer.back.element.height = height;
                this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                this.layer.grid.element.width = width;
                this.layer.grid.element.height = height;
                this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                this.layer.grid.ctx.strokeStyle = MathLib.colorConvert(this.options.grid.color) || '#cccccc';

                this.layer.axes.element.width = width;
                this.layer.axes.element.height = height;
                this.layer.axes.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                this.layer.axes.ctx.strokeStyle = MathLib.colorConvert(this.options.axes.color) || '#000000';

                this.layer.main.element.width = width;
                this.layer.main.element.height = height;
                this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            } else if (this.options.renderer === 'SVG') {
                this.element.setAttribute('width', width + 'px');
                this.element.setAttribute('height', height + 'px');
            }

            this.lookAt.x = lookAtX;
            this.lookAt.y = lookAtY;

            this.applyTransformation();
            this.draw();

            return this;
        };
        return Screen2D;
    })(MathLib.Screen);
    MathLib.Screen2D = Screen2D;
})(MathLib);



(function (MathLib) {
    'use strict';

    // A function converting arrays to THREE.js vectors
    var to3js = function (x) {
        if (x.length === 2) {
            return new THREE.Vector2(x[0], x[1]);
        } else if (x.length === 3) {
            return new THREE.Vector3(x[0], x[1], x[2]);
        }
    };

    /*es6
    import {extendObject} from 'meta';
    import {Screen} from 'Screen';
    es6*/
    /// import Screen
    /**
    * Three dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen3D}
    */
    var Screen3D = (function (_super) {
        __extends(Screen3D, _super);
        function Screen3D(id, options) {
            if (typeof options === "undefined") { options = {}; }
            _super.call(this, id, options);
            this.type = 'screen3D';

            var defaults = {
                anaglyphMode: false,
                axes: true,
                background: 0xffffff,
                camera: {
                    lookAt: [0, 0, 0],
                    position: [10, 10, 10]
                },
                // controls: 'Trackball',
                grid: {
                    xy: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, y: 1, r: 1 }
                    },
                    xz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, z: 1, r: 1 }
                    },
                    yz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { y: 1, z: 1, r: 1 }
                    }
                },
                height: 500,
                renderer: 'WebGL',
                width: 500
            }, opts = MathLib.extendObject(defaults, options), scene = new THREE.Scene(), camera, renderer, controls, viewAngle, aspect, near, far;

            this.options = opts;
            this.scene = scene;

            // Camera
            // ======
            viewAngle = 45;
            aspect = opts.width / opts.height;
            near = 0.1;
            far = 20000;

            camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
            camera.position = to3js(opts.camera.position);
            camera.lookAt(to3js(opts.camera.lookAt));
            camera.up = new THREE.Vector3(0, 0, 1);
            scene.add(camera);

            // Renderer
            // ========
            renderer = new THREE[opts.renderer + 'Renderer']({ antialias: true, preserveDrawingBuffer: true });

            // Remove the warning message.
            this.wrapper.innerHTML = '';
            this.wrapper.appendChild(renderer.domElement);

            // Overwrite the renderer with the anaglyph mode renderer
            if (opts.anaglyphMode) {
                renderer = new THREE.AnaglyphEffect(renderer);
            }

            renderer.setSize(opts.width, opts.height);

            // Controls
            // ========
            // Other possible values are: 'FirstPerson', 'Fly', 'Orbit', 'Path', 'Roll', 'Trackback' or false
            // MathLib defaults to the TrackballControls
            // move mouse and left   click (or hold 'A') to rotate
            //                middle click (or hold 'S') to zoom
            //                right  click (or hold 'D') to pan
            if (opts.controls) {
                controls = new THREE[opts.controls + 'Controls'](camera, renderer.domElement);
            } else {
                controls = {
                    update: function () {
                    }
                };
            }

            // Light
            // =====
            var light1 = new THREE.PointLight(0xffffff);
            light1.position.set(0, 0, 200);
            scene.add(light1);
            var light2 = new THREE.PointLight(0xffffff);
            light2.position.set(0, 0, -200);
            scene.add(light2);

            // Background
            // ==========
            renderer.setClearColor(opts.background, 1);
            renderer.clear();

            // Grid
            // ====
            if (opts.grid) {
                this.drawGrid();
            }

            // Axes
            // ====
            if (opts.axes) {
                var axes = new THREE.AxisHelper(10);
                scene.add(axes);
            }

            // Animate the scene
            // =================
            function animate() {
                requestAnimationFrame(animate);
                render();
                update();
            }

            function update() {
                // var delta = clock.getDelta();
                controls.update();
            }

            // Render the scene
            function render() {
                renderer.render(scene, camera);
            }

            // kick of the animation loop
            animate();

            this.options = opts;
            this.element = renderer.domElement;
            this.renderer = renderer;
            this.camera = camera;

            this.container.className += ' MathLib_screen3D';
        }
        /**
        * Draws the grid.
        *
        * @return {Screen3D}
        */
        Screen3D.prototype.drawGrid = function () {
            if (!this.options.grid) {
                return this;
            }

            var _this = this, gridDrawer = function (opts, rotX, rotY) {
                var i, ii, tickX, tickY, lines, circles, rays, size = 10, grid = new THREE.Object3D(), color = new THREE.Color(opts.color);

                if (opts.type === 'cartesian') {
                    tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y;
                    tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y;
                    lines = new THREE.Shape();

                    for (i = -size; i <= size; i += tickX) {
                        lines.moveTo(-size, i);
                        lines.lineTo(size, i);
                    }

                    for (i = -size; i <= size; i += tickY) {
                        lines.moveTo(i, -size);
                        lines.lineTo(i, size);
                    }

                    grid.add(new THREE.Line(lines.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color }), THREE.LinePieces));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                } else if (opts.type === 'polar') {
                    circles = new THREE.Shape();
                    rays = new THREE.Shape();

                    for (i = 0; i <= size; i += opts.tick.r) {
                        circles.moveTo(i, 0);
                        circles.absarc(0, 0, i, 0, 2 * Math.PI + 0.001, false);
                    }
                    grid.add(new THREE.Line(circles.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    for (i = 0, ii = 2 * Math.PI; i < ii; i += opts.angle) {
                        rays.moveTo(0, 0);
                        rays.lineTo(size * Math.cos(i), size * Math.sin(i));
                    }

                    grid.add(new THREE.Line(rays.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                }
            };

            gridDrawer(this.options.grid.xy, 0, 0);
            gridDrawer(this.options.grid.xz, Math.PI / 2, 0);
            gridDrawer(this.options.grid.yz, 0, Math.PI / 2);

            return this;
        };

        /**
        * Creates a parametric plot
        *
        * @param {function} f The function which is called on every argument
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.parametricPlot3D = function (f, options) {
            var defaults = {
                closed: false,
                debug: false,
                min: 0,
                max: 1,
                pointNum: 1000,
                radius: 0.05,
                segmentsRadius: 6,
                material: {
                    type: 'MeshLambert'
                }
            }, opts = MathLib.extendObject(defaults, options), Curve = THREE.Curve.create(function () {
            }, function (t) {
                t = (opts.max - opts.min) * t + opts.min;
                var ft = f(t);
                return new THREE.Vector3(ft[0], ft[1], ft[2]);
            }), mesh = new THREE.Mesh(new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug), new THREE[opts.material.type + 'Material'](opts.material));

            this.scene.add(mesh);

            return this;
        };

        /**
        * Creates a plot of a three dimensional function
        *
        * @param {function} f The map for the height
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.plot3D = function (f, options) {
            return this.surfacePlot3D(function (u, v) {
                return [u, v, f(u, v)];
            }, options);
        };

        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen3D}
        */
        Screen3D.prototype.resize = function (width, height) {
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            return this;
        };

        /**
        * Creates a surface plot.
        *
        * @param {function} f The map for the surface
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.surfacePlot3D = function (f, options) {
            var defaults = {
                material: {
                    type: 'MeshLambert'
                },
                pointNumX: 100,
                pointNumY: 100,
                xmin: 0,
                xmax: 1,
                ymin: 0,
                ymax: 1
            }, opts = MathLib.extendObject(defaults, options), map = function (u, v) {
                u = (opts.xmax - opts.xmin) * u + opts.xmin;
                v = (opts.ymax - opts.ymin) * v + opts.ymin;
                var fuv = f(u, v);
                return new THREE.Vector3(fuv[0], fuv[1], fuv[2]);
            }, material = new THREE[opts.material.type + 'Material'](opts.material), mesh;

            material.side = THREE.DoubleSide;

            mesh = new THREE.Mesh(new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false), material);

            this.scene.add(mesh);

            return this;
        };
        return Screen3D;
    })(MathLib.Screen);
    MathLib.Screen3D = Screen3D;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {evaluate, hypot, isEqual, isZero, minus, negative, plus, root, sign, times, toContentMathML, toLaTeX, toMathML, toString} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {EvaluationError} from 'EvaluationError';
    import {Matrix} from 'Matrix';
    es6*/
    /// import Functn
    /**
    * The vector implementation of MathLib makes calculations with vectors of
    * arbitrary size possible. The entries of the vector can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * `new MathLib.Vector([1, 2, 3])`
    * to create the following vector:
    *    ⎛ 1 ⎞
    *    ⎜ 2 ⎟
    *    ⎝ 3 ⎠
    *
    * @class
    * @this {Vector}
    */
    var Vector = (function () {
        function Vector(coords) {
            var _this = this;
            this.type = 'vector';
            Array.prototype.forEach.call(coords, function (x, i) {
                _this[i] = x;
            });
            this.length = coords.length;
        }
        /**
        * Compares two vectors.
        *
        * @param {Vector} v The vector to compare
        * @return {number}
        */
        Vector.prototype.compare = function (v) {
            var i, ii;

            if (this.length !== v.length) {
                return MathLib.sign(this.length - v.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (v[i] - this[i]) {
                    return MathLib.sign(this[i] - v[i]);
                }
            }

            return 0;
        };

        /**
        * Evaluates the entries of the vector
        *
        * @return {Vector}
        */
        Vector.prototype.evaluate = function () {
            return this.map(MathLib.evaluate);
        };

        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        Vector.prototype.every = function (f) {
            return Array.prototype.every.call(this, f);
        };

        /**
        * Works like Array.prototype.forEach.
        *
        * @param {function} f The function to be applied to all the values
        */
        Vector.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, f);
        };

        /**
        * Determines if two vectors are equal
        *
        * @param {Vector} v The vector to compare
        * @return {boolean}
        */
        Vector.prototype.isEqual = function (v) {
            if (this.length !== v.length) {
                return false;
            }

            return this.every(function (x, i) {
                return MathLib.isEqual(x, v[i]);
            });
        };

        /**
        * Determines if the vector is the zero vector.
        *
        * @return {boolean}
        */
        Vector.prototype.isZero = function () {
            return this.every(MathLib.isZero);
        };

        /**
        * Works like Array.prototype.map.
        *
        * @param {function} f The function to be applied to all the values
        * @return {Vector}
        */
        Vector.prototype.map = function (f) {
            return new MathLib[this.type.slice(0, 1).toUpperCase() + this.type.slice(1)](Array.prototype.map.call(this, f));
        };

        /**
        * Calculates the difference of two vectors.
        *
        * @param {Vector} v The vector to be subtracted.
        * @return {Vector}
        */
        Vector.prototype.minus = function (v) {
            if (this.length === v.length) {
                return this.plus(v.negative());
            } else {
                throw new MathLib.EvaluationError('Vector sizes not matching', { method: 'Vector#minus' });
            }
        };

        /**
        * Returns the negative vector.
        *
        * @return {Vector}
        */
        Vector.prototype.negative = function () {
            return this.map(function (entry) {
                return MathLib.negative(entry);
            });
        };

        /**
        * Calcultes the norm of the vector.
        *
        * @param {number} p The p for the p-norm
        * @return {number}
        */
        Vector.prototype.norm = function (p) {
            if (typeof p === "undefined") { p = 2; }
            if (p === 2) {
                return MathLib.hypot.apply(null, this.toArray());
            } else if (p === Infinity) {
                return Math.max.apply(null, this.map(Math.abs).toArray());
            } else {
                return MathLib.root(this.reduce(function (prev, curr) {
                    return prev + Math.pow(Math.abs(curr), p);
                }, 0), p);
            }
        };

        /**
        * Calculates the outer product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the outer product with.
        * @return {Matrix}
        */
        Vector.prototype.outerProduct = function (v) {
            return new MathLib.Matrix(this.map(function (x) {
                return v.map(function (y) {
                    return MathLib.times(x, y);
                });
            }));
        };

        /**
        * Calculates the sum of two vectors.
        *
        * @param {Vector} v The vector to add to the current vector.
        * @return {Vector}
        */
        Vector.prototype.plus = function (v) {
            if (this.length === v.length) {
                return new MathLib.Vector(this.map(function (x, i) {
                    return MathLib.plus(x, v[i]);
                }));
            } else {
                throw new MathLib.EvaluationError('Vector sizes not matching', { method: 'Vector#plus' });
            }
        };

        /**
        * Works like Array.prototype.reduce.
        *
        * @return {any}
        */
        Vector.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, args);
        };

        /**
        * Calculates the scalar product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the scalar product with.
        * @return {number|Complex}
        */
        Vector.prototype.scalarProduct = function (v) {
            if (this.length === v.length) {
                return this.reduce(function (old, cur, i, w) {
                    return MathLib.plus(old, MathLib.times(w[i], v[i]));
                }, 0);
            } else {
                throw new MathLib.EvaluationError('Vector sizes not matching', { method: 'Vector#scalarProduct' });
            }
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Vector.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Multiplies the vector by a (complex) number or a matrix.
        * The vector is multiplied from left to the matrix.
        * If you want to multiply it from the right use
        * matrix.times(vector) instead of vector.times(matrix)
        *
        * @param {number|Complex|Matrix} n The object to multiply to the vector
        * @return {Vector}
        */
        Vector.prototype.times = function (n) {
            var i, ii, colVectors, product = [];
            if (n.type === 'rational') {
                n = n.coerceTo('number');
            }
            if (typeof n === 'number' || n.type === 'complex') {
                return this.map(function (x) {
                    return MathLib.times(n, x);
                });
            }
            if (n.type === 'matrix') {
                if (this.length === n.rows) {
                    colVectors = n.toColVectors();
                    for (i = 0, ii = colVectors.length; i < ii; i++) {
                        product[i] = this.scalarProduct(colVectors[i]);
                    }
                    return new MathLib.Vector(product);
                } else {
                    throw MathLib.EvaluationError('Vector/Matrix sizes not matching', { method: 'Vector.prototype.times' });
                }
            }
        };

        /**
        * Converts the vector to an array.
        *
        * @return {array}
        */
        Vector.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };

        /**
        * Returns the content MathML representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Vector.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toContentMathML(cur, options);
                }, '<apply><csymbol cd="linalg2">vector</csymbol>') + '</apply>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toContentMathML(cur, options);
                }, '<vector>') + '</vector>';
            }
        };

        /**
        * Returns a LaTeX representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Vector.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
                return old + '\\\\\n\t' + MathLib.toLaTeX(cur, options);
            }) + '\n\\end{pmatrix}';
        };

        /**
        * Returns the (presentation) MathML representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Vector.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            return this.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathML(cur, options) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };

        /**
        * Returns a string representation of the vector.
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Vector.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            return '(' + this.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur, options);
            }) + ')';
        };

        /**
        * Calculates the vector product of two vectors.
        *
        * @param {Vector} v The second vector to calculate the vector product with.
        * @return {Vector}
        */
        Vector.prototype.vectorProduct = function (v) {
            /* TODO: Implement vectorproduct for non three-dimensional vectors */
            if (this.length === 3 && v.length === 3) {
                return new MathLib.Vector([
                    MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
                    MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
                    MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
                ]);
            } else {
                throw new MathLib.EvaluationError('Vectors are not three-dimensional', { method: 'Vector.prototype.vectorProduct' });
            }
        };
        Vector.areLinearIndependent = function (vectors) {
            var n = vectors.length, m = vectors[0].length;

            if (n > m) {
                return false;
            }

            if (!vectors.every(function (x) {
                return x.length === m;
            })) {
                return undefined;
            }

            return (new MathLib.Matrix(vectors)).rank() === n;
        };

        Vector.zero = function (n) {
            var vector = [], i;
            for (i = 0; i < n; i++) {
                vector.push(0);
            }
            return new MathLib.Vector(vector);
        };
        return Vector;
    })();
    MathLib.Vector = Vector;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {isEqual, isZero, sign} from 'Functn';
    import {toLaTeX} from 'meta';
    import {Matrix} from 'Matrix';
    import {Point} from 'Point';
    es6*/
    /// import Point
    /**
    * Creates a MathLib circle
    * MathLib.Circle expects two arguments.
    * First the center in the form of an Array or a MathLib.point.
    * The second argument should be the radius of the circle.
    * #### Simple use case:
    *
    * ```
    * // Create a circle with center (1, 2) and radius 3.
    * var c = new MathLib.Circle([1, 2], 3);
    * c.center                   // The center of the circle (point)
    * c.radius                   // returns the radius of the circle
    * ```
    *
    * @class
    * @this {Circle}
    */
    var Circle = (function () {
        function Circle(center, radius) {
            this.type = 'circle';
            if (center.type === undefined) {
                center = new MathLib.Point(center.concat(1));
            }

            this.center = center;
            this.radius = radius;
        }
        /**
        * Calculates the area of the circle.
        *
        * @return {number} The area of the circle
        */
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };

        /**
        * Calculates the circumference of the circle.
        *
        * @return {number} The circumference of the circle
        */
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };

        /**
        * Compares two circles
        *
        * @param {Circle} circle The circle to compare
        * @return {number}
        */
        Circle.prototype.compare = function (circle) {
            return MathLib.sign(this.center.compare(circle.center)) || MathLib.sign(this.radius - circle.radius);
        };

        /**
        * Draw the circle onto the screen.
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {drawingOptions} options Optional drawing options
        * @return {Circle} Returns the circle for chaining
        */
        Circle.prototype.draw = function (screen, options) {
            if (Array.isArray(screen)) {
                var circle = this;
                screen.forEach(function (x) {
                    x.circle(circle, options);
                });
            } else {
                screen.circle(this, options);
            }
            return this;
        };

        /**
        * Checks if two circles are equal
        *
        * @param {Circle} circle The circle to compare
        * @return {boolean}
        */
        Circle.prototype.isEqual = function (circle) {
            return MathLib.isEqual(this.radius, circle.radius) && this.center.isEqual(circle.center);
        };

        /**
        * Determine if a point is in, on or outside a circle.
        *
        * @param {Point} point The Point to determine the position of
        * @return {string}
        */
        Circle.prototype.positionOf = function (point) {
            var diff;
            if (point.type === 'point' && point.dimension === 2) {
                diff = point.distanceTo(this.center) - this.radius;
                if (MathLib.isZero(diff)) {
                    return 'on';
                } else if (diff < 0) {
                    return 'in';
                } else {
                    return 'out';
                }
            }
        };

        /**
        * Reflect the circle at a point or line
        *
        * @return {Circle}
        */
        Circle.prototype.reflectAt = function (a) {
            return new MathLib.Circle(this.center.reflectAt(a), this.radius);
        };

        /**
        * Returns a LaTeX expression of the circle
        *
        * @return {string}
        */
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };

        /**
        * Converts the circle to the corresponding matrix.
        *
        * @return {Matrix}
        */
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2], y = this.center[1] / this.center[2], r = this.radius;
            return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
        };
        return Circle;
    })();
    MathLib.Circle = Circle;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {abs, arccos, arcosh, coerce, coerceTo, copy, cos, cosh, divide, exp, floor, hypot, inverse, isEqual, isNegZero, isPosZero, isZero, ln, minus, negative, plus, pow, sign, sin, sinh, times, type} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {CoercionError} from 'CoercionError';
    import {Integer} from 'Integer';
    import {Point} from 'Point';
    es6*/
    /// import Functn, Point
    /**
    * MathLib.Complex is the MathLib implementation of complex numbers.
    *
    * There are two ways of defining complex numbers:
    *
    * * Two numbers representing the real and the complex part.
    * * MathLib.Complex.polar(abs, arg)
    *
    * #### Simple example:
    * ```
    * // Create the complex number 1 + 2i
    * var c = new MathLib.Complex(1, 2);
    * ```
    *
    * @class
    * @this {Complex}
    */
    var Complex = (function () {
        function Complex(re, im) {
            if (typeof im === "undefined") { im = 0; }
            this.type = 'complex';
            if (MathLib.isNaN(re) || MathLib.isNaN(im)) {
                this.re = NaN;
                this.im = NaN;
            } else if (!MathLib.isFinite(re) || !MathLib.isFinite(im)) {
                this.re = Infinity;
                this.im = Infinity;
            } else {
                this.re = re;
                this.im = im;
            }
        }
        /**
        * The characteristic of the complex field is 0.
        *
        * @return {Integer}
        */
        Complex.characteristic = function () {
            return new MathLib.Integer(0);
        };

        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Complex.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return '<csymbol cd="setname1">C</csymbol>';
            }
            return '<complexes/>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Complex.toLaTeX = function () {
            return 'Complex Field $\\mathbb{C}$';
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Complex.toMathML = function () {
            return '<mrow><mtext>Complex Field</mtext><mi mathvariant="double-struck">C</mi></mrow>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Complex.toString = function () {
            return 'Complex Field ℂ';
        };

        /**
        * Returns the absolute value of the number.
        *
        * @return {number}
        */
        Complex.prototype.abs = function () {
            return MathLib.hypot(this.re, this.im);
        };

        /**
        * Returns the inverse cosine of the number.
        *
        * @return {Complex}
        */
        Complex.prototype.arccos = function () {
            return (new MathLib.Complex(Math.PI / 2, -0)).minus(this.arcsin());
        };

        /**
        * Returns the inverse cotangent of the number.
        *
        * @return {Complex}
        */
        Complex.prototype.arccot = function () {
            if (this.isZero()) {
                return new MathLib.Complex(MathLib.sign(1 / this.re) * Math.PI / 2, -this.im);
            }
            return this.inverse().arctan();
        };

        /**
        * Returns the inverse cosecant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arccsc = function () {
            // arccsc(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arcsin();
        };

        /**
        * Returns the inverse hyperbolic cosine of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcosh = function () {
            var arccos;

            if (this.isZero()) {
                return new MathLib.Complex(0, 1.5707963267948966192);
            }

            arccos = this.arccos();
            arccos = arccos.times(new MathLib.Complex(0, arccos.im > 0 ? -1 : 1));

            if (MathLib.isNegZero(this.im) && this.re >= -1) {
                arccos.im = -arccos.im;
            }

            return arccos;
        };

        /**
        * Returns the inverse hyperbolic cotangent of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcoth = function () {
            var one = new MathLib.Complex(1, -0);

            if (MathLib.isZero(this.re)) {
                if (MathLib.isPosZero(this.im)) {
                    return new MathLib.Complex(this.re, -1.5707963267948966192);
                }
                if (MathLib.isNegZero(this.im)) {
                    return new MathLib.Complex(this.re, 1.5707963267948966192);
                }
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(0, 0);
            }

            return MathLib.times(0.5, this.plus(one).divide(this.minus(one)).ln());
        };

        /**
        * Returns the inverse hyperbolic cosecant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcsch = function () {
            return this.inverse().arsinh();
        };

        /**
        * Returns the inverse secant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcsec = function () {
            // arcsec(0) = ComplexInfinity not ComplexNaN
            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return this.inverse().arccos();
        };

        /**
        * Returns the inverse sine of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arcsin = function () {
            var a = this.re, b = this.im, aa = a * a, bb = b * b, sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb), sgn = function (x) {
                if (x > 0) {
                    return 1;
                }
                if (x < 0) {
                    return -1;
                }
                if (1 / x === Infinity) {
                    return 1;
                }
                if (1 / x === -Infinity) {
                    return -1;
                }
            };

            if (a === Infinity) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(sgn(a) / 2 * MathLib.arccos(sqrt - (aa + bb)), sgn(b) / 2 * MathLib.arcosh(sqrt + (aa + bb)));
        };

        /**
        * Returns the inverse tangent of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arctan = function () {
            var res, one = new MathLib.Complex(1, -0), iz = new MathLib.Complex(-this.im, this.re);

            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            res = MathLib.times(new MathLib.Complex(0, -0.5), MathLib.plus(one, iz).divide(MathLib.minus(one, iz)).ln());

            // Correct some values on the axis imaginary axis.
            // TODO: Are this all the wrong values?
            if (MathLib.isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
                res.re = -res.re;
            }

            return res;
        };

        /**
        * Returns the argument (= the angle) of the complex number
        *
        * @return {number}
        */
        Complex.prototype.arg = function () {
            if (this.re === Infinity) {
                return NaN;
            }
            return Math.atan2(this.im, this.re);
        };

        /**
        * Returns the inverse hyperbolic secant of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arsech = function () {
            if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }
            return this.inverse().arcosh();
        };

        /**
        * Returns the inverse hyperbolic sine of the number
        *
        * @return {Complex}
        */
        Complex.prototype.arsinh = function () {
            var a = this.re, b = this.im, aa = a * a, bb = b * b, sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * aa), sgn = function (x) {
                if (x > 0) {
                    return 1;
                }
                if (x < 0) {
                    return -1;
                }
                if (1 / x === Infinity) {
                    return 1;
                }
                if (1 / x === -Infinity) {
                    return -1;
                }
            };

            if (a === Infinity) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(sgn(a) / 2 * MathLib.arcosh(sqrt + (aa + bb)), sgn(b) / 2 * MathLib.arccos(sqrt - (aa + bb)));
        };

        /**
        * Returns the inverse hyperbolic tangent of the number
        *
        * @return {Complex}
        */
        Complex.prototype.artanh = function () {
            var one = new MathLib.Complex(1, -0);

            if (this.isZero()) {
                return new MathLib.Complex(this.re, this.im);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }

            return MathLib.times(0.5, MathLib.minus(one.plus(this).ln(), one.minus(this).ln()));
        };

        /**
        * Coerces the complex number to some other data type
        *
        * @param {string} type The type to coerce the complex number into
        * @return {Rational|number|Complex}
        */
        Complex.prototype.coerceTo = function (type) {
            if (type === 'complex') {
                return this.copy();
            }

            if (MathLib.isZero(this.im)) {
                return MathLib.coerceTo(this.re, type);
            } else {
                if (type === 'integer') {
                    throw new MathLib.CoercionError('Cannot coerce the complex number to an integer, since the imaginary part is not zero.', {
                        method: 'Complex.prototype.coerceTo'
                    });
                } else if (type === 'rational') {
                    throw new MathLib.CoercionError('Cannot coerce the complex number to a rational number, since the imaginary part is not zero.', {
                        method: 'Complex.prototype.coerceTo'
                    });
                } else if (type === 'number') {
                    throw new MathLib.CoercionError('Cannot coerce the complex number to a number, since the imaginary part is not zero.', {
                        method: 'Complex.prototype.coerceTo'
                    });
                } else {
                    throw new MathLib.CoercionError('Cannot coerce the complex number to "' + type + '".', {
                        method: 'Complex.prototype.coerceTo'
                    });
                }
            }
        };

        /**
        * Compares two complex numbers
        *
        * @param {Complex} x The complex number to compare the current number to
        * @return {number}
        */
        Complex.prototype.compare = function (x) {
            var a = MathLib.sign(this.abs() - x.abs());

            if (MathLib.isNaN(this.re)) {
                if (MathLib.isNaN(x.re)) {
                    return 0;
                }
                return -1;
            }

            if (this.re === Infinity) {
                if (x.re === Infinity) {
                    return 0;
                }
                return 1;
            }

            return a ? a : MathLib.sign(this.arg() - x.arg());
        };

        /**
        * Calculates the conjugate of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.conjugate = function () {
            return new MathLib.Complex(this.re, MathLib.negative(this.im));
        };

        /**
        * Copies the complex number
        *
        * @return {Complex}
        */
        Complex.prototype.copy = function () {
            return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
        };

        /**
        * Calculates the cosine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cos = function () {
            return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
        };

        /*
        * Calculates the hyperbolic cosine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cosh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
        };

        /**
        * Calculates the cotangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.cot = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) - MathLib.cosh(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        /**
        * Calculates the hyperbolic cotangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.coth = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) - MathLib.cos(bb);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(MathLib.sinh(aa) / d, -MathLib.sin(bb) / d);
        };

        /**
        * Calculates the cosecant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.csc = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) - MathLib.cosh(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(-2 * MathLib.sin(a) * MathLib.cosh(b) / d, 2 * MathLib.cos(a) * MathLib.sinh(b) / d);
        };

        /**
        * Calculates the hyperbolic cosecant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.csch = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) - MathLib.cos(2 * b);

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            return new MathLib.Complex(2 * MathLib.sinh(a) * MathLib.cos(b) / d, -2 * MathLib.cosh(a) * MathLib.sin(b) / d);
        };

        /**
        * Divides a complex number by an other
        *
        * @param {number|Complex} divisor The divisor
        * @return {Complex}
        */
        Complex.prototype.divide = function (divisor) {
            return this.times(MathLib.inverse(divisor));
        };

        /**
        * Evaluates the exponential function with a complex argument
        *
        * @return {Complex}
        */
        Complex.prototype.exp = function () {
            return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
        };

        /**
        * Calculates the inverse of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.inverse = function () {
            var d = MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2));

            if (this.isZero()) {
                return new MathLib.Complex(Infinity);
            }

            if (this.re === Infinity) {
                return new MathLib.Complex(0);
            }

            return new MathLib.Complex(MathLib.divide(this.re, d), MathLib.divide(MathLib.negative(this.im), d));
        };

        /**
        * Determines if the complex number is equal to another number.
        *
        * @param {Integer|Rational|number|Complex} n The number to be compared
        * @return {boolean}
        */
        Complex.prototype.isEqual = function (n) {
            if (n.type !== 'complex') {
                if (MathLib.isZero(this.im)) {
                    return MathLib.isEqual.apply(null, MathLib.coerce(this.re, n));
                } else {
                    return false;
                }
            } else {
                return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
            }
        };

        /**
        * Determines if the complex number is finite.
        *
        * @return {boolean}
        */
        Complex.prototype.isFinite = function () {
            return MathLib.isFinite(this.re);
        };

        /**
        * Determines if the complex number is equal to 0.
        *
        * @return {boolean}
        */
        Complex.prototype.isZero = function () {
            return MathLib.isZero(this.re) && MathLib.isZero(this.im);
        };

        /*
        * Evaluates the natural logarithm with complex arguments
        *
        * @return {Complex}
        */
        Complex.prototype.ln = function () {
            if (this.re === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
        };

        /**
        * Calculates the difference of two complex numbers
        *
        * @param {number|Complex} subtrahend The subtrahend
        * @return {Complex}
        */
        Complex.prototype.minus = function (subtrahend) {
            return this.plus(MathLib.negative(subtrahend));
        };

        /**
        * Calculates the negative of the complex number
        *
        * @return {Complex}
        */
        Complex.prototype.negative = function () {
            return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
        };

        /**
        * Add complex numbers
        *
        * @param {Integer|Rational|number|Complex} summand The number to be added
        * @return {Complex}
        */
        Complex.prototype.plus = function (summand) {
            if (summand.type !== 'complex') {
                return new MathLib.Complex(MathLib.plus.apply(null, MathLib.coerce(this.re, summand)), this.im);
            } else {
                return new MathLib.Complex(MathLib.plus(this.re, summand.re), MathLib.plus(this.im, summand.im));
            }
        };

        /**
        * Calculates the complex number raised to some power
        *
        * @param {numeric} c The power to which the complex number should be raised
        * @return {Complex}
        */
        Complex.prototype.pow = function (c) {
            var re, im, abs, arg;

            if (MathLib.type(c) === 'complex') {
                re = c.re;
                im = c.im;
                abs = this.abs();
                arg = this.arg();

                // Fixes inf^(2+5i) = inf and 0^(2+5i) = 0
                if ((this.isZero() || this.re === Infinity) && !(c.isZero() || c.re === Infinity || MathLib.isNaN(c.re))) {
                    return new MathLib.Complex(this.re, this.im);
                }

                return MathLib.Complex.polar(MathLib.times(MathLib.pow(abs, re), MathLib.exp(MathLib.negative(MathLib.times(im, arg)))), MathLib.plus(MathLib.times(re, arg), MathLib.times(im, MathLib.ln(abs))));
            } else {
                // The naive pow method has some rounding errrors. For example
                // (2+5i)^3 = -142.00000000000006-64.99999999999999i
                // instead of -142-65i which are errors of magnitude around 1e-14.
                // This error increases quickly for increasing exponents.
                // (2+5i)^21 has an error of 5.8 in the real part
                // return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                // The following algorithm uses a different approach for integer exponents,
                // where it yields exact results.
                // Non integer exponents are evaluated using the naive approach.
                // TODO: Improve the algorithm.
                var i, int = MathLib.floor(Math.abs(c)), res = new MathLib.Complex(1), power = this, bin = int.toString(2);

                // If the exponent is not an integer we use the naive approach
                if (c % 1) {
                    abs = this.abs();
                    arg = this.arg();
                    return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
                }

                // The imaginary part of (2+5i)^-0 should be -0 not +0.
                if (MathLib.isZero(c)) {
                    return new MathLib.Complex(1, c);
                }

                for (i = bin.length - 1; i >= 0; i--) {
                    if (bin[i] === '1') {
                        res = MathLib.times(res, power);
                    }
                    power = MathLib.times(power, power);
                }

                if (c < 0) {
                    res = res.inverse();
                }

                return res;
            }
        };

        /**
        * Calculates the secant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sec = function () {
            var a = this.re, b = this.im, d = MathLib.cos(2 * a) + MathLib.cosh(2 * b);

            return new MathLib.Complex(2 * MathLib.cos(a) * MathLib.cosh(b) / d, 2 * MathLib.sin(a) * MathLib.sinh(b) / d);
        };

        /**
        * Calculates the hyperbolic secant of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sech = function () {
            var a = this.re, b = this.im, d = MathLib.cosh(2 * a) + MathLib.cos(2 * b);

            return new MathLib.Complex(2 * MathLib.cosh(a) * MathLib.cos(b) / d, -2 * MathLib.sinh(a) * MathLib.sin(b) / d);
        };

        /**
        * Calculates the signum of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sign = function () {
            if (this.isZero() || MathLib.isNaN(this.re)) {
                return this;
            } else if (this.re === Infinity) {
                return new MathLib.Complex(NaN);
            }
            return MathLib.Complex.polar(1, this.arg());
        };

        /**
        * Calculates the sine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sin = function () {
            return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
        };

        /**
        * Calculates the hyperbolic sine of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sinh = function () {
            return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
        };

        /**
        * Takes the square root of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.sqrt = function () {
            return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
        };

        /**
        * Calculates the tangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.tan = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cos(aa) + MathLib.cosh(bb);

            return new MathLib.Complex(MathLib.sin(aa) / d, MathLib.sinh(bb) / d);
        };

        /**
        * Calculates the hyperbolic tangent of a complex number
        *
        * @return {Complex}
        */
        Complex.prototype.tanh = function () {
            var aa = 2 * this.re, bb = 2 * this.im, d = MathLib.cosh(aa) + MathLib.cos(bb);

            return new MathLib.Complex(MathLib.sinh(aa) / d, MathLib.sin(bb) / d);
        };

        /**
        * Multiplies complex numbers
        *
        * @param {Complex|number|Rational} factor The number to be multiplied
        * @return {Complex}
        */
        Complex.prototype.times = function (factor) {
            if (factor.type === 'complex') {
                if (this.re === Infinity) {
                    if (factor.isZero() || MathLib.isNaN(factor.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                if (factor.re === Infinity) {
                    if (this.isZero() || MathLib.isNaN(this.re)) {
                        return new MathLib.Complex(NaN);
                    } else {
                        return new MathLib.Complex(Infinity);
                    }
                }

                return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, factor.re), MathLib.times(this.im, factor.im)), MathLib.plus(MathLib.times(this.re, factor.im), MathLib.times(this.im, factor.re)));
            } else if (factor.type === 'rational') {
                factor = factor.coerceTo('number');
            }
            if (typeof factor === 'number') {
                return new MathLib.Complex(MathLib.times(this.re, factor), MathLib.times(this.im, factor));
            }
        };

        /**
        * Returns the content MathML representation of the number
        *
        * @return {string}
        */
        Complex.prototype.toContentMathML = function () {
            if (!this.isFinite()) {
                return '<csymbol cd="nums1">' + (this.re === Infinity ? 'infinity' : 'NaN') + '</csymbol>';
            }

            return '<apply><plus />' + MathLib.toContentMathML(this.re) + '<apply><times />' + MathLib.toContentMathML(this.im) + '<imaginaryi /></apply></apply>';
        };

        /**
        * Returns the LaTeX representation of the complex number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Complex.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var option, str = '', reFlag = !MathLib.isZero(this.re), passOptions = {};

            if (!this.isFinite()) {
                return (options.sign ? '+' : '') + '\\text{Complex' + this.re + '}';
            }

            if (!MathLib.isZero(this.im)) {
                for (option in options) {
                    if (options.hasOwnProperty(option) && option !== 'sign') {
                        passOptions[option] = options[option];
                    }
                }

                passOptions.sign = reFlag || options.sign;

                str += MathLib.toLaTeX(this.im, passOptions) + 'i';
            }

            if (reFlag || str.length === 0) {
                str = MathLib.toLaTeX(this.re, options) + str;
            }

            return str;
        };

        /**
        * Returns the (presentation) MathML representation of the number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Complex.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var str = '', option, reFlag = !MathLib.isZero(this.re), passOptions = {};

            if (!this.isFinite()) {
                return (options.sign ? '<mo>+</mo>' : '') + '<mi>Complex' + this.re + '</mi>';
            }

            if (!MathLib.isZero(this.im)) {
                for (option in options) {
                    if (options.hasOwnProperty(option) && option !== 'sign') {
                        passOptions[option] = options[option];
                    }
                }

                if (reFlag || options.sign) {
                    passOptions.sign = false;
                    str += '<mo>' + MathLib.toString(this.im, { sign: true }).slice(0, 1) + '</mo><mrow>' + MathLib.toMathML(MathLib.abs(this.im), passOptions) + '<mo>&#x2062;</mo><mi>i</mi></mrow>';
                } else {
                    str += '<mrow>' + MathLib.toMathML(this.im, passOptions) + '<mo>&#x2062;</mo><mi>i</mi></mrow>';
                }
            }

            if (reFlag || str.length === 0) {
                str = MathLib.toMathML(this.re, options) + str;
            }

            return str;
        };

        /**
        * Interprets the complex number as point in the two dimensional plane
        *
        * @return {Point}
        */
        Complex.prototype.toPoint = function () {
            if (this.re === Infinity || MathLib.isNaN(this.re)) {
                return new MathLib.Point([0, 0, 0]);
            }

            return new MathLib.Point([this.re, this.im, 1]);
        };

        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Complex.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var str = '', option, reFlag = !MathLib.isZero(this.re), passOptions = {};

            if (!this.isFinite()) {
                return (options.sign ? '+' : '') + 'Complex' + this.re;
            }

            if (!MathLib.isZero(this.im)) {
                for (option in options) {
                    if (options.hasOwnProperty(option) && option !== 'sign') {
                        passOptions[option] = options[option];
                    }
                }

                passOptions.sign = reFlag || options.sign;

                str += MathLib.toString(this.im, passOptions) + 'i';
            }

            if (reFlag || str.length === 0) {
                str = MathLib.toString(this.re, options) + str;
            }

            return str;
        };
        Complex.polar = function (abs, arg) {
            if (abs === Infinity) {
                return new MathLib.Complex(Infinity);
            }
            return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
        };
        return Complex;
    })();
    MathLib.Complex = Complex;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {coerce, divide, isEqual, isPosZero, minus, mod, plus, pow, sign, times} from 'Functn';
    import {CoercionError} from 'CoercionError';
    import {Complex} from 'Complex';
    import {Rational} from 'Rational';
    es6*/
    /// import Functn, CoercionError
    /**
    * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
    *
    *
    * #### Simple example:
    * ```
    * // Create the integer
    * var int = new MathLib.Integer('123456789');
    * ```
    *
    * @class
    * @this {Integer}
    */
    var Integer = (function () {
        function Integer(integer, options) {
            if (typeof options === "undefined") { options = {}; }
            this.type = 'integer';
            var i, res, factor, blocksize, inputBase = options.base || 10, base = Math.pow(2, 26), data = [], sign = '+';

            if (Array.isArray(integer)) {
                i = integer.length - 1;
                while (integer[i] === 0) {
                    i--;
                }
                data = integer.slice(0, i + 1);
            }

            if (typeof integer === 'number') {
                if (integer === 0) {
                    sign = MathLib.isPosZero(integer) ? '+' : '-';
                    data.push(0);
                } else {
                    if (integer < 0) {
                        sign = '-';
                        integer = -integer;
                    }
                    while (integer) {
                        data.push(integer % base);
                        integer = Math.floor(integer / base);
                    }
                }
            } else if (typeof integer === 'string') {
                if (integer[0] === '+' || integer[0] === '-') {
                    sign = integer[0];
                    integer = integer.slice(1);
                }

                data = [];
                blocksize = Math.floor(Math.log(Math.pow(2, 53)) / Math.log(inputBase));

                while (integer.length > blocksize) {
                    data.push(new MathLib.Integer(parseInt(integer.slice(-blocksize), inputBase)));
                    integer = integer.slice(0, -blocksize);
                }
                data.push(new MathLib.Integer(parseInt(integer, inputBase)));

                res = data[data.length - 1];
                factor = new MathLib.Integer(Math.pow(inputBase, blocksize));
                for (i = data.length - 2; i >= 0; i--) {
                    res = res.times(factor).plus(data[i]);
                }

                data = res.data;
                /*
                data.push(
                Number(
                Array.prototype.reduceRight.call(integer, function (old, cur) {
                if (old.length === blocksize) {
                data.push(Number(cur + old));
                return '';
                }
                return cur + old;
                })
                )
                )
                */
            }

            if ('sign' in options) {
                sign = options.sign;
            }

            this.data = data;
            this.sign = sign;
        }
        /**
        * The characteristic of the ring of integers is 0.
        *
        * @return {Integer}
        */
        Integer.characteristic = function () {
            return new MathLib.Integer(0);
        };

        /**
        * Returns a random element of the ring of integers
        * in the intervall [start, end] (both endpoits included).
        * If the second argument is not provided, the intervall is
        * [start, 0] (if start is negative) or [0, start] (if start is positive).
        * Again, both endpoits are included.
        *
        * @param {start} Integer - the integer starting the intervall
        * @param {end} Integer - the integer ending the intervall
        * @return {Integer}
        */
        Integer.randomElement = function (start, end) {
            var i, endMinusStart, arr = [], base = Math.pow(2, 26);

            if (arguments.length === 1) {
                endMinusStart = start;
            } else {
                endMinusStart = end.minus(start);
            }

            for (i = 1; i < endMinusStart.data.length; i++) {
                arr.push(Math.floor(Math.random() * base));
            }

            arr.push(Math.floor(Math.random() * (endMinusStart.data[endMinusStart.data.length - 1] + 1)));

            if (arguments.length === 1) {
                return (new MathLib.Integer(arr, { sign: start.sign }));
            } else {
                return (new MathLib.Integer(arr)).plus(start);
            }
        };

        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Integer.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return '<csymbol cd="setname1">Z</csymbol>';
            }
            return '<integers/>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Integer.toLaTeX = function () {
            return 'Integer Ring $\\mathbb{Z}$';
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Integer.toMathML = function () {
            return '<mrow><mtext>Integer Ring</mtext><mi mathvariant="double-struck">Z</mi></mrow>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Integer.toString = function () {
            return 'Integer Ring ℤ';
        };

        /**
        * Calculates the absolute value of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.abs = function () {
            return new MathLib.Integer(this.data, { sign: '+' });
        };

        /**
        * Calculates the ceil of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.ceil = function () {
            return this.copy();
        };

        /**
        * Coerces the integer to some other data type
        *
        * @param {string} type The type to coerce the integer into
        * @return {Integer|Rational|number|Complex}
        */
        Integer.prototype.coerceTo = function (type) {
            var num;

            if (type === 'integer') {
                return this.copy();
            } else if (type === 'rational') {
                return new MathLib.Rational(this, 1);
            } else if (type === 'complex') {
                return new MathLib.Complex(this, 0);
            } else if (type === 'number') {
                // TODO: Warn when the number is bigger that 2^53
                num = this.data.reduce(function (old, cur, i) {
                    return old + cur * Math.pow(1e7, i);
                }, 0);

                if (this.sign === '-') {
                    num = -num;
                }

                return num;
            } else {
                throw new MathLib.CoercionError('Cannot coerce the integer to "' + type + '".', {
                    method: 'Integer.prototype.coerceTo'
                });
            }
        };

        /**
        * Compares the integer
        *
        * @return {Integer}
        */
        Integer.prototype.compare = function (n) {
            var i;
            if (this.sign !== n.sign) {
                if (this.isZero() && n.isZero()) {
                    return 0;
                }
                if (this.sign === '+') {
                    return 1;
                }
                return -1;
            }

            if (this.data.length !== n.data.length) {
                if (this.sign === '+') {
                    return MathLib.sign(this.data.length - n.data.length);
                } else {
                    return MathLib.sign(n.data.length - this.data.length);
                }
            } else {
                for (i = this.data.length - 1; i >= 0; i--) {
                    if (this.data[i] !== n.data[i]) {
                        if (this.sign === '+') {
                            return MathLib.sign(this.data[i] - n.data[i]);
                        } else {
                            return MathLib.sign(n.data[i] - this.data[i]);
                        }
                    }
                }
                return 0;
            }
        };

        /**
        * Calculates the complex conjugate of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.conjugate = function () {
            return this.copy();
        };

        /**
        * Copy the integer
        *
        * @return {Integer}
        */
        Integer.prototype.copy = function () {
            return new MathLib.Integer(this.data, { sign: this.sign });
        };

        /**
        * Calculates the digit sum to a given base
        *
        * @param {number} [base=10] - The base
        * @return {Integer}
        */
        Integer.prototype.digitSum = function (base) {
            if (typeof base === "undefined") { base = 10; }
            return new MathLib.Integer(this.digits(base).reduce(function (x, y) {
                return x + y;
            }));
        };

        /**
        * Returns the digits of the integer in a given base
        *
        * @param {number} [base=10] - The base
        * @return {number[]}
        */
        Integer.prototype.digits = function (base) {
            if (typeof base === "undefined") { base = 10; }
            var div, rem, temp, factor = new MathLib.Integer(base), n = this.abs(), digits = [];

            if (n.isZero()) {
                return [0];
            } else {
                while (!n.isZero()) {
                    temp = n.divrem(factor);
                    div = temp[0];
                    rem = temp[1];

                    digits.unshift(rem.data[0]);
                    n = div;
                }
            }

            return digits;
        };

        /**
        * Divides the integer by some other number.
        *
        * @param {Integer|Rational|number|Complex} divisor - The divisor
        * @return {Integer|Rational|number|Complex}
        */
        Integer.prototype.divide = function (divisor) {
            var divrem;

            if (divisor.type !== 'integer') {
                return MathLib.divide.apply(null, MathLib.coerce(this, divisor));
            } else {
                divrem = this.divrem(divisor);

                if (divrem[1].isZero()) {
                    return divrem[0];
                }

                return new MathLib.Rational(this, divisor);
            }
        };

        /**
        * Returns an array containing the quotient and the remainder of the division.
        *
        * Based on the "Schoolbook Division" in
        * Karl Hasselström's "Fast Division of Large Integers"
        * http://www.treskal.com/kalle/exjobb/original-report.pdf
        *
        * @param {Integer} divisor - The divisor
        * @return {Integer[]}
        */
        Integer.prototype.divrem = function (divisor) {
            var main, subroutine, quot, mult, temp, rem, base = Math.pow(2, 26);

            // Algorithm 3.1 Schoolbook division subroutine
            subroutine = function (A, B) {
                var q, T, temp, B1, n = A.data.length - 1;

                // Step 1
                if (A.data[n] >= B.data[n - 1]) {
                    B1 = B.copy();
                    B1.data.unshift(0);
                    temp = subroutine(A.minus(B1), B);
                    return [temp[0].plus(new MathLib.Integer(base)), temp[1]];
                }

                // Step 2
                // nothing to do
                // Step 3
                q = new MathLib.Integer(Math.min(Math.floor((A.data[n] * base + A.data[n - 1]) / B.data[n - 1]), base - 1));

                // Step 4
                T = B.times(q);

                // Step 5
                if (T.compare(A) === 1) {
                    q = q.minus(new MathLib.Integer(1));
                    T = T.minus(B);
                }

                // Step 6
                if (T.compare(A) === 1) {
                    q = q.minus(new MathLib.Integer(1));
                    T = T.minus(B);
                }

                // Step 7
                return [q, A.minus(T)];
            };

            // Algorithm 3.2 Schoolbook division
            main = function (A, B) {
                var q, r, q1, r1, temp, A1, s, m = A.data.length - 1, n = B.data.length - 1;

                // Step 1
                if (m < n) {
                    return [new MathLib.Integer(0), A.copy()];
                }

                // Step 2
                if (m === n) {
                    if (A.compare(B) === -1) {
                        return [new MathLib.Integer(0), A.copy()];
                    } else {
                        return [new MathLib.Integer(1), A.minus(B)];
                    }
                }

                // Step 3
                if (m === n + 1) {
                    return subroutine(A, B);
                }

                // Step 4
                // A1 = floor(A / base^(m-n-1))
                A1 = new MathLib.Integer(A.data.slice(m - n - 1));
                s = new MathLib.Integer(A.data.slice(0, m - n - 1));

                // Step 5
                temp = subroutine(A1, B);
                q1 = temp[0];
                r1 = temp[1];

                // Step 6
                temp = main(new MathLib.Integer(s.data.concat(r1.data)), B);
                q = temp[0];
                r = temp[1];

                // Step 7
                return [new MathLib.Integer(q.data.concat(q1.data)), r];
            };

            if (this.isZero()) {
                return [new MathLib.Integer(0), new MathLib.Integer(0)];
            }

            if (divisor.data[divisor.data.length - 1] < base / 2) {
                mult = new MathLib.Integer(Math.ceil(base / (2 * divisor.data[divisor.data.length - 1])));
                temp = main(this.abs().times(mult), divisor.abs().times(mult));
                quot = temp[0];
                rem = new MathLib.Integer(temp[1].data[0] / mult.data[0]);
            } else {
                temp = main(this.abs(), divisor.abs());
                quot = temp[0];
                rem = temp[1];
            }

            if (this.sign === '-' && !rem.isZero()) {
                quot = quot.plus(new MathLib.Integer(1));
                rem = divisor.abs().minus(rem);
            }

            if (this.sign !== divisor.sign) {
                quot = quot.negative();
            }

            return [quot, rem];
        };

        /**
        * Calculates the factorial of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.factorial = function () {
            if (this.isZero()) {
                return new MathLib.Integer('1');
            }

            if (this.sign === '-') {
                return new MathLib.Complex(Infinity);
            }

            var factorial = this, n = this.minus(new MathLib.Integer('1'));

            while (!n.isZero()) {
                factorial = factorial.times(n);
                n = n.minus(new MathLib.Integer('1'));
            }

            return factorial;
        };

        /**
        * Calculates the floor of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.floor = function () {
            return this.copy();
        };

        /**
        * Checks if the current integer is equal to some other number
        *
        * @param {any} n The number to check
        * @return {boolean}
        */
        Integer.prototype.isEqual = function (n) {
            var i, ii;

            if (n.type !== 'integer') {
                return MathLib.isEqual(MathLib.coerce(this, n));
            } else {
                if (this.sign !== n.sign) {
                    if (this.isZero() && n.isZero()) {
                        return true;
                    }
                    return false;
                }

                if (this.data.length !== n.data.length) {
                    return false;
                }

                for (i = 0, ii = this.data.length; i < ii; i++) {
                    if (this.data[i] !== n.data[i]) {
                        return false;
                    }
                }

                return true;
            }
        };

        /**
        * All integers are finite
        *
        * @return {boolean}
        */
        Integer.prototype.isFinite = function () {
            return true;
        };

        /**
        * No Integer is NaN
        *
        * @return {boolean}
        */
        Integer.prototype.isNaN = function () {
            return false;
        };

        /**
        * Checks if the integer is a unit in the ring of integers or not
        *
        * @return {boolean}
        */
        Integer.prototype.isUnit = function () {
            var i, ii;

            for (i = 1, ii = this.data.length; i < ii; i++) {
                if (this.data[i] !== 0) {
                    return false;
                }
            }

            if (this.data[0] === 1) {
                return true;
            }

            return false;
        };

        /**
        * Checks if the integer is zero or not
        *
        * @return {boolean}
        */
        Integer.prototype.isZero = function () {
            return this.data.every(function (x) {
                return x === 0;
            });
        };

        /**
        * Calculates the floor of the square root of the integer
        *
        * @return {Integer}
        */
        Integer.prototype.isqrt = function () {
            var y, two = new MathLib.Integer('2'), numberofbits = ((this.data.length - 1) * 25 + 1 + Math.log(this.data[this.data.length - 1]) / Math.log(2)), x = (new MathLib.Integer(2)).pow(new MathLib.Integer(Math.ceil(numberofbits / 2)));

            while (true) {
                y = x.plus(this.divrem(x)[0]).divrem(two)[0];

                if (y.minus(x).isZero()) {
                    return x;
                }
                x = y;
            }
        };

        /**
        * Subtracts a number from the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to subtract
        * @return {Integer}
        */
        Integer.prototype.minus = function (n) {
            var i, ii, temp, resPos, A, B, data = [], carry = 0, sign = '+', base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.minus.apply(null, MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '-') {
                        return n.negative().minus(this.negative());
                    } else {
                        temp = this.negative().plus(n);
                        temp.sign = '-';
                        return temp;
                    }
                } else {
                    if (n.sign === '-') {
                        return this.plus(n.negative());
                    }
                }

                if (this.data.length !== n.data.length) {
                    resPos = this.data.length > n.data.length;

                    while (this.data.length < n.data.length) {
                        this.data.push(0);
                    }
                    while (this.data.length > n.data.length) {
                        n.data.push(0);
                    }
                } else {
                    for (i = this.data.length - 1; i >= 0; i--) {
                        if (this.data[i] !== n.data[i]) {
                            resPos = this.data[i] > n.data[i];
                            break;
                        }
                    }
                    if (typeof resPos === 'undefined') {
                        return new MathLib.Integer(0);
                    }
                }

                if (resPos) {
                    A = this;
                    B = n;
                    sign = '+';
                } else {
                    A = n;
                    B = this;
                    sign = '-';
                }

                for (i = 0, ii = A.data.length; i < ii; i++) {
                    temp = A.data[i] - B.data[i] + carry;
                    carry = Math.floor(temp / base);
                    data[i] = MathLib.mod(temp, base);
                }

                return new MathLib.Integer(data, { sign: sign });
            }
        };

        /**
        * Reduces the integer modulo an other number.
        *
        * @param {Integer|number} n - The number with which the current integer should be reduced
        * @return {Integer|number}
        */
        Integer.prototype.mod = function (n) {
            if (n.type !== 'integer') {
                return MathLib.mod.apply(null, MathLib.coerce(this, n));
            } else {
                return this.divrem(n)[1];
            }
        };

        /**
        * Calculates the negative integer
        *
        * @return {Integer}
        */
        Integer.prototype.negative = function () {
            return new MathLib.Integer(this.data, { sign: this.sign === '-' ? '+' : '-' });
        };

        /**
        * Adds a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to add
        * @return {Integer}
        */
        Integer.prototype.plus = function (n) {
            var i, ii, temp, data = [], carry = 0, base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.plus(MathLib.coerce(this, n));
            } else {
                if (this.sign === '-') {
                    if (n.sign === '+') {
                        return n.minus(this.negative());
                    }
                } else if (n.sign === '-') {
                    return this.minus(n.negative());
                }

                if (this.data.length !== n.data.length) {
                    while (this.data.length < n.data.length) {
                        this.data.push(0);
                    }
                    while (this.data.length > n.data.length) {
                        n.data.push(0);
                    }
                }

                for (i = 0, ii = this.data.length; i < ii; i++) {
                    temp = this.data[i] + n.data[i] + carry;

                    data[i] = temp % base;
                    carry = Math.floor(temp / base);
                }

                if (carry !== 0) {
                    data[i] = carry;
                }

                return new MathLib.Integer(data, { sign: this.sign });
            }
        };

        /**
        * Raises the integer to a certain power.
        *
        * @param {Integer|Rational|number|Complex} exponent - The exponent
        * @return {Integer|Rational}
        */
        Integer.prototype.pow = function (exponent) {
            var powInt, result;

            if (exponent.type !== 'integer') {
                return MathLib.pow.apply(null, MathLib.coerce(this, exponent));
            } else {
                powInt = function (b, e) {
                    var res, i, half = [], carry = 0;

                    if (e.data.length === 1 && e.data[0] === 1) {
                        return b;
                    }

                    for (i = e.data.length - 1; i >= 0; i--) {
                        half[i] = Math.floor(e.data[i] / 2) + carry;

                        if (e.data[i] % 2) {
                            carry = 5e6;
                        } else {
                            carry = 0;
                        }
                    }

                    res = powInt(b, new MathLib.Integer(half));
                    res = res.times(res);

                    if (e.data[0] % 2) {
                        res = res.times(b);
                    }

                    return res;
                };

                if (exponent.isZero()) {
                    return new MathLib.Integer(1);
                }

                result = powInt(this, exponent);

                if (exponent.sign === '-') {
                    return new MathLib.Rational(new MathLib.Integer('1'), result);
                }

                return result;
            }
        };

        /**
        * Multiplies a number to the current integer
        *
        * @param {Integer|Rational|number|Complex} n - The number to multiply
        * @return {Integer}
        */
        Integer.prototype.times = function (n) {
            var i, ii, j, jj, temp, data = [], carry = 0, base = Math.pow(2, 26);

            if (n.type !== 'integer') {
                return MathLib.times(MathLib.coerce(this, n));
            } else {
                for (i = 0, ii = this.data.length; i < ii; i++) {
                    for (j = 0, jj = n.data.length; j < jj; j++) {
                        if (data[i + j] === undefined) {
                            data[i + j] = this.data[i] * n.data[j];
                        } else {
                            data[i + j] += this.data[i] * n.data[j];
                        }
                    }
                }

                for (i = 0, ii = this.data.length + n.data.length - 1; i < ii; i++) {
                    temp = data[i] + carry;
                    carry = Math.floor(temp / base);
                    data[i] = temp % base;
                }
                data[i] = carry;

                return new MathLib.Integer(data, { sign: this.sign === n.sign ? '+' : '-' });
            }
        };

        /**
        * A content MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var base = options.base || 10;

            // In section 4.2.1.3 in the MathML 3 specification
            // under "Rewrite: cn based_integer" it says
            // "A base attribute with value 10 is simply removed"
            if (base === 10) {
                return '<cn type="integer">' + this.toString() + '</cn>';
            } else if (options.strict) {
                return '<apply><csymbol cd="nums1">based_integer</csymbol><cn>' + base + '</cn><cs>' + this.toString({ base: base }) + '</cs></apply>';
            } else {
                return '<cn type="integer" base="' + base + '">' + this.toString({ base: base }) + '</cn>';
            }
        };

        /**
        * A LaTeX string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var option, str, base = options.base || 10, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
                    passOptions[option] = options[option];
                }
            }

            str = this.toString(passOptions);

            if (options.baseSubscript) {
                str += '_{' + base + '}';
            }

            return str;
        };

        /**
        * A presentation MathML string representation
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var str, option, base = options.base || 10, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'baseSubscript') {
                    passOptions[option] = options[option];
                }
            }

            str = '<mn>' + this.toString(passOptions) + '</mn>';

            if (options.baseSubscript) {
                str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
            }

            return str;
        };

        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Integer.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var div, rem, temp, base = options.base || 10, blocksize = Math.floor(Math.log(Math.pow(2, 26) - 1) / Math.log(base)), factor = new MathLib.Integer(Math.pow(base, blocksize)), n = this.abs(), str = '';

            if (n.isZero()) {
                str = '0';
            } else {
                while (!n.isZero()) {
                    temp = n.divrem(factor);
                    div = temp[0];
                    rem = temp[1];

                    str = ('000000' + rem.data[0].toString(base)).slice(-blocksize) + str;
                    n = div;
                }

                str = str.replace(/^0+/, '');

                if (this.sign === '-') {
                    str = '-' + str;
                }
            }

            if (options.sign && (this.sign === '+' || this.isZero())) {
                str = '+' + str;
            }

            if (options.baseSubscript) {
                if (base > 9) {
                    str += '&#x208' + Math.floor(base / 10) + ';';
                }
                str += '&#x208' + (base % 10) + ';';
            }

            return str;
        };
        return Integer;
    })();
    MathLib.Integer = Integer;
})(MathLib);



(function (MathLib) {
    'use strict';

    /*es6
    import {hypot, isEqual, isZero} from 'Functn';
    import {warning} from 'meta';
    import {Point} from 'Point';
    import {Vector} from 'Vector';
    es6*/
    /// import Functn, Vector
    /**
    * The line implementation of MathLib makes calculations with lines in the
    * real plane possible. (Higher dimensions will be supported later)
    *
    * @class
    * @augments Vector
    * @this {Line}
    */
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(coords) {
            _super.call(this, coords);
            this.type = 'line';
            this.dimension = 2;
        }
        /**
        * Draws the line on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @return {Line} Returns the line for chaining
        */
        Line.prototype.draw = function (screen, options) {
            if (typeof options === "undefined") { options = {}; }
            if (Array.isArray(screen)) {
                var line = this;
                screen.forEach(function (x) {
                    x.line(line, options);
                });
            } else {
                screen.line(this, options);
            }
            return this;
        };

        /**
        * Determines if two lines are equal.
        *
        * @param {Line} l The line to compare with
        * @return {boolean}
        */
        Line.prototype.isEqual = function (l) {
            var p = this.normalize();
            l = l.normalize();

            if (this.length !== l.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, l[i]);
            });
        };

        /**
        * Determines if the line is finite
        *
        * @return {boolean}
        */
        Line.prototype.isFinite = function () {
            return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
        };

        /**
        * Determines if two lines are parallel.
        *
        * @param {Line} l The other line
        * @return {boolean}
        */
        Line.prototype.isParallelTo = function (l) {
            return MathLib.isZero(this[0] * l[1] - this[1] * l[0]);
        };

        /**
        * Calculates the meeting point of two lines
        *
        * @param {Line} l The line to intersect the current line with
        * @return {Point}
        */
        Line.prototype.meet = function (l) {
            var point, k = this;

            if (this.dimension === 2 && l.dimension === 2) {
                point = new MathLib.Point(this.vectorProduct(l).toArray());

                Object.defineProperties(point, {
                    '0': {
                        get: function () {
                            return k[1] * l[2] - k[2] * l[1];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return k[2] * l[0] - k[0] * l[2];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet'
                            });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return k[0] * l[1] - k[1] * l[0];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet'
                            });
                        },
                        enumerable: true
                    }
                });

                return point;
            }
        };

        /**
        * Normalizes the line.
        *
        * @return {Line}
        */
        Line.prototype.normalize = function () {
            var h = MathLib.hypot(this[0], this[1]);

            if (h !== 0) {
                return this.map(function (x) {
                    return x / h;
                });
            } else {
                return new MathLib.Line([0, 0, 1]);
            }
        };

        /**
        * Determines an parallel line through a given point.
        *
        * @param {Point} p The Point through which the line should go through
        * @return {Line}
        */
        Line.prototype.parallelThrough = function (p) {
            var l = this, parallel = new MathLib.Line([0, 0, 0]);

            Object.defineProperties(parallel, {
                '0': {
                    get: function () {
                        return -l[0] * p[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * p[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return l[1] * p[1] + l[0] * p[0];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                }
            });

            return parallel;
        };
        return Line;
    })(MathLib.Vector);
    MathLib.Line = Line;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {abs, conjugate, copy, divide, evaluate, hypot, inverse, is, isEqual, isOne, isReal, isZero, minus, plus, sign, times, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Circle} from 'Circle';
    import {EvaluationError} from 'EvaluationError';
    import {Expression} from 'Expression';
    import {Permutation} from 'Permutation';
    import {Point} from 'Point';
    import {Vector} from 'Vector';
    es6*/
    /// import Functn, Permutation
    /**
    * The matrix implementation of MathLib makes calculations with matrices of
    * arbitrary size possible. The entries of a matrix can be numbers and complex
    * numbers.
    *
    * It is as easy as
    * ```
    * new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    * ```
    * to create the following matrix:
    *    ⎛ 1 2 3 ⎞
    *    ⎜ 4 5 6 ⎟
    *    ⎝ 7 8 9 ⎠
    *
    * @class
    * @this {Matrix}
    */
    var Matrix = (function () {
        function Matrix(matrix) {
            var _this = this;
            this.type = 'matrix';
            if (typeof matrix === 'string') {
                // If there is a < in the string we assume it's MathML
                if (matrix.indexOf('<') > -1) {
                    return MathLib.Expression.parseContentMathML(matrix).evaluate();
                } else {
                    matrix = matrix.trim().replace(/;?\n/g, '],[');
                    matrix = JSON.parse('[[' + matrix + ']]');
                }
            }
            matrix.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = matrix.length;
            this.cols = matrix[0].length;
            this.rows = matrix.length;
        }
        /**
        * Calculates the LU decomposition of a matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.LU = function () {
            var i, j, k, t, p, LU = this.toArray(), m = this.rows, n = this.cols, permutation = [];

            for (k = 0; k < n; k++) {
                // Find the pivot
                p = k;
                for (i = k + 1; i < m; i++) {
                    if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
                        p = i;
                    }
                }

                // Exchange if necessary
                if (p !== k) {
                    permutation.unshift([p, k]);
                    t = LU[p];
                    LU[p] = LU[k];
                    LU[k] = t;
                }

                // The elimination
                if (LU[k][k] !== 0) {
                    for (i = k + 1; i < m; i++) {
                        LU[i][k] = MathLib.divide(LU[i][k], LU[k][k]);
                        for (j = k + 1; j < n; j++) {
                            LU[i][j] = MathLib.minus(LU[i][j], MathLib.times(LU[i][k], LU[k][j]));
                        }
                    }
                }
            }
            LU = new MathLib.Matrix(LU);
            this.LU = function () {
                return LU;
            };
            this.LUpermutation = new MathLib.Permutation(permutation);
            return LU;
        };

        /**
        * Calculates the adjoint matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.adjoint = function () {
            return this.map(function (entry) {
                return MathLib.conjugate(entry);
            }).transpose();
        };

        /**
        * Calculates the adjugate matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.adjugate = function () {
            return this.map(function (x, r, c, m) {
                return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
            });
        };

        /**
        * The cholesky decomposition of a matrix
        * using the Cholesky–Banachiewicz algorithm.
        * Does not change the current matrix, but returns a new one.
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.cholesky = function () {
            var i, ii, j, jj, k, kk, sum, choleskyMatrix, cholesky = [];

            for (i = 0, ii = this.rows; i < ii; i++) {
                cholesky.push([]);
            }

            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0; j < i; j++) {
                    sum = 0;
                    for (k = 0, kk = j; k < kk; k++) {
                        sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[j][k]));
                    }
                    cholesky[i][j] = (this[i][j] - sum) / cholesky[j][j];
                }

                sum = 0;
                for (k = 0, kk = j; k < kk; k++) {
                    sum = MathLib.plus(sum, MathLib.times(cholesky[i][k], cholesky[i][k]));
                }
                cholesky[i][j] = Math.sqrt(this[j][j] - sum);

                for (j++, jj = this.cols; j < jj; j++) {
                    cholesky[i][j] = 0;
                }
            }
            choleskyMatrix = new MathLib.Matrix(cholesky);

            this.cholesky = function () {
                return choleskyMatrix;
            };
            return choleskyMatrix;
        };

        /**
        * Compares the matrix to an other matrix.
        *
        * @param {Matrix} m The matrix to compare.
        * @return {number}
        */
        Matrix.prototype.compare = function (m) {
            var i, ii, j, jj;

            if (this.rows !== m.rows) {
                return MathLib.sign(this.rows - m.rows);
            }

            if (this.cols !== m.cols) {
                return MathLib.sign(this.cols - m.cols);
            }

            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0, jj = this.cols; j < jj; j++) {
                    if (this[i][j] - m[i][j]) {
                        return MathLib.sign(this[i][j] - m[i][j]);
                    }
                }
            }

            return 0;
        };

        /**
        * Copies the matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.copy = function () {
            return this.map(function (entry) {
                return MathLib.copy(entry);
            });
        };

        /**
        * Calculates the determinant of the matrix via the LU decomposition.
        * The result is cached.
        *
        * @return {number|Complex}
        */
        Matrix.prototype.determinant = function () {
            var LU, determinant;

            if (!this.isSquare()) {
                throw new MathLib.EvaluationError('Determinant of non square matrix', {
                    method: 'Matrix.prototype.determinant'
                });
            }

            if (this.rank() < this.rows) {
                determinant = 0;
            } else {
                LU = this.LU();
                determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, LU.diag()));
            }

            this.determinant = function () {
                return determinant;
            };
            return determinant;
        };

        /**
        * Returns the entries on the diagonal in an array
        *
        * @return {array}
        */
        Matrix.prototype.diag = function () {
            var diagonal = [], i, ii;
            for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
                diagonal.push(this[i][i]);
            }
            return diagonal;
        };

        /**
        * Multiplies the matrix by the inverse of a number or a matrix
        *
        * @return {Matrix|number} n The number or Matrix to be inverted and multiplied
        */
        Matrix.prototype.divide = function (n) {
            return this.times(MathLib.inverse(n));
        };

        /**
        * Evaluates the entries of the matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.evaluate = function () {
            return this.map(MathLib.evaluate);
        };

        /**
        * This function works like the Array.prototype.every function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        Matrix.prototype.every = function (f) {
            return Array.prototype.every.call(this, function (x, i) {
                return Array.prototype.every.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * This function works like the Array.prototype.forEach function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        */
        Matrix.prototype.forEach = function (f) {
            Array.prototype.forEach.call(this, function (x, i) {
                return Array.prototype.forEach.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * Returns the Gershgorin circles of the matrix.
        *
        * @return {array} Returns an array of circles
        */
        Matrix.prototype.gershgorin = function () {
            var c = [], rc = [], rr = [], circles = [], i, ii;

            for (i = 0, ii = this.rows; i < ii; i++) {
                rc.push(0);
                rr.push(0);
            }

            this.forEach(function (x, i, j) {
                if (i === j) {
                    if (MathLib.is(x, 'complex')) {
                        c.push(x.toPoint());
                    } else {
                        c.push(new MathLib.Point([x, 0, 1]));
                    }
                } else {
                    rc[j] += MathLib.abs(x);
                    rr[i] += MathLib.abs(x);
                }
            });

            for (i = 0, ii = this.rows; i < ii; i++) {
                circles.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
            }

            return circles;
        };

        /**
        * QR decomposition with the givens method.
        *
        * @return {[Matrix, Matrix]}
        */
        Matrix.prototype.givens = function () {
            var rows = this.rows, cols = this.cols, R = this.copy(), Q = MathLib.Matrix.identity(rows), c, s, rho, i, j, k, ri, rj, qi, qj;

            for (i = 0; i < cols; i++) {
                for (j = i + 1; j < rows; j++) {
                    if (!MathLib.isZero(R[j][i])) {
                        // We can't use the sign function here, because we want the factor
                        // to be 1 if A[i][i] is zero.
                        rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i], R[j][i]);
                        c = R[i][i] / rho;
                        s = R[j][i] / rho;

                        // Apply the rotation
                        ri = [];
                        rj = [];
                        qi = [];
                        qj = [];

                        for (k = 0; k < cols; k++) {
                            ri.push(R[i][k]);
                            rj.push(R[j][k]);
                        }
                        for (k = 0; k < cols; k++) {
                            R[i][k] = rj[k] * s + ri[k] * c;
                            R[j][k] = rj[k] * c - ri[k] * s;
                        }

                        for (k = 0; k < rows; k++) {
                            qi.push(Q[k][i]);
                            qj.push(Q[k][j]);
                        }
                        for (k = 0; k < rows; k++) {
                            Q[k][i] = qi[k] * c + qj[k] * s;
                            Q[k][j] = -qi[k] * s + qj[k] * c;
                        }
                    }
                }
            }

            return [Q, R];
        };

        /**
        * Calculates the inverse matrix.
        *
        * @return {Matrix}
        */
        Matrix.prototype.inverse = function () {
            var i, ii, res, inverse, col = [], matrix = [], n = this.rows;

            if (!this.isSquare()) {
                throw MathLib.EvaluationError('Inverse of non square matrix', { method: 'Matrix.prototype.inverse' });
            }

            for (i = 0, ii = n - 1; i < ii; i++) {
                matrix.push([]);
                col.push(0);
            }

            matrix.push([]);

            col.push(1);
            col = col.concat(col).slice(0, -1);

            for (i = 0, ii = n; i < ii; i++) {
                res = this.solve(col.slice(n - i - 1, 2 * n - i - 1));

                if (res === undefined) {
                    return;
                }

                res.forEach(function (x, i) {
                    matrix[i].push(x);
                });
            }

            inverse = new MathLib.Matrix(matrix);
            this.inverse = function () {
                return inverse;
            };
            return inverse;
        };

        /**
        * Determines if the matrix is a band matrix.
        *
        * @param {number} l The wished lower bandwidth
        * @param {number} u The wished upper bandwidth
        * @return {boolean}
        */
        Matrix.prototype.isBandMatrix = function (l, u) {
            // var i, j, ii, jj;
            if (arguments.length === 1) {
                u = l;
            }

            return this.every(function (x, i, j) {
                return (i - l <= j && i + u >= j) || MathLib.isZero(x);
            });
            // for (i = 0, ii = this.rows; i < ii; i++) {
            //   for (j = 0, jj = this.cols; j < jj; j++) {
            //     if (i - j < l && this[i][j] !== 0) {
            //       return false;
            //     }
            //   }
            // }
            // return true;
        };

        /**
        * Determines if the matrix is a diagonal matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isDiag = function () {
            var i, j, ii, jj;
            if (Number(this.hasOwnProperty('isUpper') && this.isUpper()) + Number(this.hasOwnProperty('isLower') && this.isLower()) + Number(this.hasOwnProperty('isSymmetric') && this.isSymmetric()) > 1) {
                return true;
            }
            for (i = 0, ii = this.rows; i < ii; i++) {
                for (j = 0, jj = this.cols; j < jj; j++) {
                    if (i !== j && !MathLib.isZero(this[i][j])) {
                        return false;
                    }
                }
            }
            return true;
        };

        /**
        * Determines if the matrix is equal to an other matrix.
        *
        * @param {Matrix} matrix The matrix to compare with
        * @return {boolean}
        */
        Matrix.prototype.isEqual = function (matrix) {
            var i, j, ii, jj;
            if (this === matrix) {
                return true;
            }
            if (this.rows === matrix.rows && this.cols === matrix.cols) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    for (j = 0, jj = this.cols; j < jj; j++) {
                        if (!MathLib.isEqual(this[i][j], matrix[i][j])) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        };

        /**
        * Determines if the matrix is a identity matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isIdentity = function () {
            if (!this.isSquare()) {
                return false;
            }

            var isIdentity = this.every(function (x, r, c) {
                return r === c ? MathLib.isOne(x) : MathLib.isZero(x);
            });

            this.isIdentity = function () {
                return isIdentity;
            };
            return isIdentity;
        };

        /**
        * Determines if the matrix is invertible.
        *
        * @return {boolean}
        */
        Matrix.prototype.isInvertible = function () {
            return this.isSquare() && this.rank() === this.rows;
        };

        /**
        * Determines if the matrix is a lower triangular matrix.
        *
        * @return {boolean}
        */
        Matrix.prototype.isLower = function () {
            return this.slice(0, -1).every(function (x, i) {
                return x.slice(i + 1).every(MathLib.isZero);
            });
        };

        /**
        * Determines if the matrix is negative definite
        *
        * @return {boolean}
        */
        Matrix.prototype.isNegDefinite = function () {
            if (!this.isSquare()) {
                return;
            }
            if (this.rows === 1) {
                return this[0][0] < 0;
            }

            // Sylvester's criterion
            if (this.rows % 2 === 0) {
                return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            } else {
                return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
            }
        };

        /**
        * Determines if the matrix is a orthogonal.
        *
        * @return {boolean}
        */
        Matrix.prototype.isOrthogonal = function () {
            return this.transpose().times(this).isIdentity();
        };

        /**
        * Determines if the matrix is a permutation matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isPermutation = function () {
            var rows = [], cols = [];

            return this.every(function (x, r, c) {
                if (MathLib.isOne(x)) {
                    if (rows[r] || cols[c]) {
                        return false;
                    } else {
                        rows[r] = true;
                        cols[c] = true;
                        return true;
                    }
                } else if (MathLib.isZero(x)) {
                    return true;
                }
                return false;
            }) && rows.length === this.rows && cols.length === this.cols;
        };

        /**
        * Determines if the matrix is positive definite
        *
        * @return {boolean}
        */
        Matrix.prototype.isPosDefinite = function () {
            if (!this.isSquare()) {
                return;
            }
            if (this.rows === 1) {
                return this[0][0] > 0;
            }

            // Sylvester's criterion
            return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
        };

        /**
        * Determines if the matrix has only real entries
        *
        * @return {boolean}
        */
        Matrix.prototype.isReal = function () {
            return this.every(MathLib.isReal);
        };

        /**
        * Determines if the matrix is a scalar matrix
        * (that is a multiple of the identity matrix)
        *
        * @return {boolean}
        */
        Matrix.prototype.isScalar = function () {
            var i, ii, diag = this.diag;
            if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
                if (this.isIdentity() || this.isZero()) {
                    return true;
                } else {
                    return false;
                }
            }
            if (this.isDiag()) {
                for (i = 1, ii = this.rows; i < ii; i++) {
                    if (!MathLib.isEqual(diag[0], diag[i])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };

        /**
        * Determines if the matrix is a square matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isSquare = function () {
            return this.cols === this.rows;
        };

        /**
        * Determines if the matrix is symmetric
        *
        * @return {boolean}
        */
        Matrix.prototype.isSymmetric = function () {
            var i, ii, j, jj, isSymmetric = true;

            if (!this.isSquare()) {
                isSymmetric = false;
            } else {
                lp:
                for (i = 0, ii = this.rows; i < ii; i++) {
                    for (j = i + 1, jj = this.cols; j < jj; j++) {
                        if (!MathLib.isEqual(this[i][j], this[j][i])) {
                            isSymmetric = false;
                            break lp;
                        }
                    }
                }
            }

            this.isSymmetric = function () {
                return isSymmetric;
            };
            return isSymmetric;
        };

        /**
        * Determines if the matrix is a upper triangular matrix
        *
        * @return {boolean}
        */
        Matrix.prototype.isUpper = function () {
            return this.slice(1).every(function (x, i) {
                return x.slice(0, i + 1).every(MathLib.isZero);
            });
        };

        /**
        * Determines if the matrix is a vector
        * (only one row or one column)
        *
        * @return {boolean}
        */
        Matrix.prototype.isVector = function () {
            return (this.rows === 1) || (this.cols === 1);
        };

        /**
        * Determines if the matrix the zero matrix
        * The result is cached.
        *
        * @return {boolean}
        */
        Matrix.prototype.isZero = function () {
            var isZero = this.every(MathLib.isZero);

            this.isZero = function () {
                return isZero;
            };
            return isZero;
        };

        /**
        * This function works like the Array.prototype.map function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {Matrix}
        */
        Matrix.prototype.map = function (f) {
            var m = this;
            return new MathLib.Matrix(Array.prototype.map.call(this, function (x, i) {
                return Array.prototype.map.call(x, function (y, j) {
                    return f(y, i, j, m);
                });
            }));
        };

        /**
        * Calculates a minor
        *
        * @param {number} r The row to be removed.
        * @param {number} c The column to be removed.
        * @return {Matrix}
        */
        Matrix.prototype.minor = function (r, c) {
            return this.remove(r, c).determinant();
        };

        /**
        * Calculates the difference of two matrices
        *
        * @param {Matrix} subtrahend The matrix to be subtracted.
        * @return {Matrix}
        */
        Matrix.prototype.minus = function (subtrahend) {
            if (this.rows === subtrahend.rows && this.cols === subtrahend.cols) {
                return this.plus(subtrahend.negative());
            } else {
                throw MathLib.EvaluationError('Matrix sizes not matching', { method: 'Matrix.prototype.minus' });
            }
        };

        /**
        * Returns the negative matrix
        *
        * @return {Matrix}
        */
        Matrix.prototype.negative = function () {
            var i, ii, negative = [];

            for (i = 0, ii = this.rows; i < ii; i++) {
                negative.push(this[i].map(function (entry) {
                    return MathLib.negative(entry);
                }));
            }
            return new MathLib.Matrix(negative);
        };

        /**
        * This function adds a matrix to the current matrix
        * and returns the result as a new matrix.
        *
        * @param {Matrix} summand The matrix to be added.
        * @return {Matrix}
        */
        Matrix.prototype.plus = function (summand) {
            var i, ii, j, jj, sum = [];

            if (this.rows === summand.rows && this.cols === summand.cols) {
                for (i = 0, ii = this.rows; i < ii; i++) {
                    sum[i] = [];
                    for (j = 0, jj = this.cols; j < jj; j++) {
                        sum[i][j] = MathLib.plus(this[i][j], summand[i][j]);
                    }
                }
                return new MathLib.Matrix(sum);
            } else {
                throw MathLib.EvaluationError('Matrix sizes not matching', { method: 'Matrix.prototype.plus' });
            }
        };

        /**
        * Determines the rank of the matrix
        *
        * @return {number}
        */
        Matrix.prototype.rank = function () {
            var i, j, rank = 0, mat = this.rref();

            rankloop:
            for (i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
                for (j = this.cols - 1; j >= i; j--) {
                    if (!MathLib.isZero(mat[i][j])) {
                        rank = i + 1;
                        break rankloop;
                    }
                }
            }

            this.rank = function () {
                return rank;
            };
            return rank;
        };

        /**
        * This function works like the Array.prototype.reduce function.
        *
        * @return {any}
        */
        Matrix.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, args);
        };

        /**
        * This function removes the specified rows and/or columns for the matrix.
        *
        * @param {number|array} row The row(s) to be removed.
        * @param {number|array} col The column(s) to be removed.
        * @return {Matrix}
        */
        Matrix.prototype.remove = function (row, col) {
            var rest = this.toArray();

            if (row || row === 0) {
                if (typeof row === 'number') {
                    row = [row];
                }
                rest = rest.filter(function (x, i) {
                    return row.indexOf(i) === -1;
                });
            }

            if (col || col === 0) {
                if (typeof col === 'number') {
                    col = [col];
                }
                col = col.sort().reverse();
                col.forEach(function (n) {
                    rest = rest.map(function (x) {
                        x.splice(n, 1);
                        return x;
                    });
                });
            }

            return new MathLib.Matrix(rest);
        };

        /**
        * Calculate the reduced row echelon form (rref) of a matrix.
        *
        * @return {Matrix}
        */
        Matrix.prototype.rref = function () {
            var i, ii, j, jj, k, kk, pivot, factor, swap, lead = 0, rref = this.toArray();

            for (i = 0, ii = this.rows; i < ii; i++) {
                if (this.cols <= lead) {
                    return new MathLib.Matrix(rref);
                }

                // Find the row with the biggest pivot element
                j = i;
                while (rref[j][lead] === 0) {
                    j++;
                    if (this.rows === j) {
                        j = i;
                        lead++;
                        if (this.cols === lead) {
                            return new MathLib.Matrix(rref);
                        }
                    }
                }

                // Swap the pivot row to the top
                if (i !== j) {
                    swap = rref[j];
                    rref[j] = rref[i];
                    rref[i] = swap;
                }

                pivot = rref[i][lead];

                for (j = lead, jj = this.cols; j < jj; j++) {
                    rref[i][j] /= pivot;
                }

                for (j = 0, jj = this.rows; j < jj; j++) {
                    if (j === i) {
                        continue;
                    }
                    factor = rref[j][lead];
                    for (k = 0, kk = this.cols; k < kk; k++) {
                        rref[j][k] = MathLib.minus(rref[j][k], MathLib.times(factor, rref[i][k]));
                    }
                }
                lead++;
            }
            return new MathLib.Matrix(rref);
        };

        /**
        * This function works like the Array.prototype.slice function.
        *
        * @return {array}
        */
        Matrix.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Solves the system of linear equations Ax = b
        * given by the matrix A and a vector or point b.
        *
        * @param {Vector} b The b in Ax = b
        * @return {Vector}
        */
        Matrix.prototype.solve = function (b) {
            // Ax = b -> LUx = b. Then y is defined to be Ux
            var LU = this.LU(), i, j, n = b.length, x = [], y = [];

            // Permutate b according to the LU decomposition
            b = this.LUpermutation.applyTo(b);

            for (i = 0; i < n; i++) {
                y[i] = b[i];
                for (j = 0; j < i; j++) {
                    y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
                }
            }

            for (i = n - 1; i >= 0; i--) {
                x[i] = y[i];
                for (j = i + 1; j < n; j++) {
                    x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
                }

                if (LU[i][i] === 0) {
                    if (x[i] !== 0) {
                        return undefined;
                    } else {
                        x[i] = x[i];
                    }
                } else {
                    x[i] = MathLib.divide(x[i], LU[i][i]);
                }
            }

            if (MathLib.type(b) === 'array') {
                return x;
            } else {
                return new b.constructor(x);
            }
        };

        /**
        * This function works like the Array.prototype.some function.
        * The matrix is processed row by row.
        * The function is called with the following arguments:
        * the entry at the current position, the number of the row,
        * the number of the column and the complete matrix
        *
        * @param {function} f The function which is called on every argument
        * @return {boolean}
        */
        Matrix.prototype.some = function (f) {
            return Array.prototype.some.call(this, function (x, i) {
                return Array.prototype.some.call(x, function (y, j) {
                    return f(y, i, j, this);
                });
            });
        };

        /**
        * Multiplies the current matrix with a number, a matrix, a point or a vector.
        *
        * @param {number|Matrix|Point|Rational|Vector} a The object to multiply to the current matrix
        * @return {Matrix|Point|Vector}
        */
        Matrix.prototype.times = function (a) {
            var i, ii, j, jj, k, kk, product = [], entry;

            if (a.type === 'rational') {
                a = a.coerceTo('number');
            }
            if (typeof a === 'number' || a.type === 'complex') {
                return this.map(function (x) {
                    return MathLib.times(x, a);
                });
            } else if (a.type === 'matrix') {
                if (this.cols === a.rows) {
                    for (i = 0, ii = this.rows; i < ii; i++) {
                        product[i] = [];
                        for (j = 0, jj = a.cols; j < jj; j++) {
                            entry = 0;

                            for (k = 0, kk = this.cols; k < kk; k++) {
                                entry = MathLib.plus(entry, MathLib.times(this[i][k], a[k][j]));
                            }
                            product[i][j] = entry;
                        }
                    }
                    return new MathLib.Matrix(product);
                } else {
                    throw MathLib.EvaluationError('Matrix sizes not matching', { method: 'Matrix#times' });
                }
            } else if (a.type === 'point' || a.type === 'vector') {
                if (this.cols === a.length) {
                    for (i = 0, ii = this.rows; i < ii; i++) {
                        entry = 0;
                        for (j = 0, jj = this.cols; j < jj; j++) {
                            entry = MathLib.plus(entry, MathLib.times(this[i][j], a[j]));
                        }
                        product.push(entry);
                    }
                    return new a.constructor(product);
                }
            }
        };

        /**
        * Converts the matrix to a two-dimensional array
        *
        * @return {array}
        */
        Matrix.prototype.toArray = function () {
            return Array.prototype.map.call(this, function (x) {
                return Array.prototype.map.call(x, function (y) {
                    return MathLib.copy(y);
                });
            });
        };

        /**
        * Converts the columns of the matrix to vectors
        *
        * @return {array}
        */
        Matrix.prototype.toColVectors = function () {
            return this.transpose().toRowVectors();
        };

        /**
        * converting the matrix to content MathML
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Matrix.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return this.reduce(function (str, x) {
                    return str + '<apply><csymbol cd="linalg2">matrixrow</csymbol>' + x.map(function (entry) {
                        return MathLib.toContentMathML(entry, options);
                    }).join('') + '</apply>';
                }, '<apply><csymbol cd="linalg2">matrix</csymbol>') + '</apply>';
            } else {
                return this.reduce(function (str, x) {
                    return str + '<matrixrow>' + x.map(function (entry) {
                        return MathLib.toContentMathML(entry, options);
                    }).join('') + '</matrixrow>';
                }, '<matrix>') + '</matrix>';
            }
        };

        /**
        * Converting the matrix to LaTeX
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Matrix.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var passOptions = { base: options.base, baseSubscript: options.baseSubscript };

            return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
                return str + x.map(function (entry) {
                    return MathLib.toLaTeX(entry, passOptions);
                }).join(' & ') + '\\\n';
            }, '').slice(0, -2) + '\n\\end{pmatrix}';
        };

        /**
        * converting the matrix to (presentation) MathML
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Matrix.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var passOptions = { base: options.base, baseSubscript: options.baseSubscript };

            return this.reduce(function (str, x) {
                return str + '<mtr><mtd>' + x.map(function (entry) {
                    return MathLib.toMathML(entry, passOptions);
                }).join('</mtd><mtd>') + '</mtd></mtr>';
            }, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
        };

        /**
        * Converts the rows of the matrix to vectors
        *
        * @return {array}
        */
        Matrix.prototype.toRowVectors = function () {
            return this.toArray().map(function (v) {
                return new MathLib.Vector(v);
            });
        };

        /**
        * Creating a custom .toString() function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Matrix.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var passOptions = { base: options.base, baseSubscript: options.baseSubscript };

            return this.reduce(function (str, x) {
                return str + x.map(function (entry) {
                    return MathLib.toString(entry, passOptions);
                }).join('\t') + '\n';
            }, '').slice(0, -1);
        };

        /**
        * Calculating the trace of the matrix
        *
        * @return {number|Complex}
        */
        Matrix.prototype.trace = function () {
            var trace = MathLib.plus.apply(null, this.diag());

            this.trace = function () {
                return trace;
            };
            return trace;
        };

        /**
        * Calculating the transpose of the matrix
        * The result is cached.
        *
        * @return {Matrix}
        */
        Matrix.prototype.transpose = function () {
            var transposedMatrix, row, i, j, ii, jj, transpose = [];

            for (i = 0, ii = this.cols; i < ii; i++) {
                row = [];
                for (j = 0, jj = this.rows; j < jj; j++) {
                    row.push(this[j][i]);
                }
                transpose.push(row);
            }

            transposedMatrix = new MathLib.Matrix(transpose);
            this.transpose = function () {
                return transposedMatrix;
            };
            return transposedMatrix;
        };
        Matrix.givensMatrix = function (n, i, k, phi) {
            var givens = MathLib.Matrix.identity(n);
            givens[k][k] = givens[i][i] = Math.cos(phi);
            givens[i][k] = Math.sin(phi);
            givens[k][i] = -givens[i][k];
            return givens;
        };

        Matrix.identity = function (n) {
            var row = [], matrix = [], i, ii;
            n = n || 1;

            for (i = 0, ii = n - 1; i < ii; i++) {
                row.push(0);
            }
            row.push(1);
            row = row.concat(row);
            row = row.slice(0, -1);

            for (i = 0, ii = n; i < ii; i++) {
                matrix.push(row.slice(n - i - 1, 2 * n - i - 1));
            }

            return new MathLib.Matrix(matrix);
        };

        Matrix.numbers = function (n, r, c) {
            var i, ii, row = [], matrix = [];

            for (i = 0, ii = c || r || 1; i < ii; i++) {
                row.push(n);
            }
            for (i = 0, ii = r || 1; i < ii; i++) {
                matrix.push(row.slice(0));
            }
            return new MathLib.Matrix(matrix);
        };

        Matrix.one = function (r, c) {
            if (typeof r === "undefined") { r = 1; }
            if (typeof c === "undefined") { c = r; }
            return MathLib.Matrix.numbers(1, r, c);
        };

        Matrix.random = function (r, c) {
            var row, matrix = [], i, j, ii, jj;
            for (i = 0, ii = r || 1; i < ii; i++) {
                row = [];
                for (j = 0, jj = c || r || 1; j < jj; j++) {
                    row.push(Math.random());
                }
                matrix.push(row);
            }
            return new MathLib.Matrix(matrix);
        };

        Matrix.zero = function (r, c) {
            if (typeof r === "undefined") { r = 1; }
            if (typeof c === "undefined") { c = r; }
            return MathLib.Matrix.numbers(0, r, c);
        };
        return Matrix;
    })();
    MathLib.Matrix = Matrix;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {sign} from 'Functn';
    import {Matrix} from 'Matrix';
    es6*/
    /// import Functn, Matrix
    /**
    * The permutation class for MathLib
    *
    * @class
    * @this {Permutation}
    */
    var Permutation = (function () {
        function Permutation(p) {
            var _this = this;
            this.type = 'permutation';
            var cycle, permutation;

            if (Array.isArray(p[0])) {
                cycle = p;
                permutation = Permutation.cycleToList(cycle);
            } else {
                permutation = p;
                cycle = Permutation.listToCycle(permutation);
            }

            permutation.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = permutation.length;
            this.cycle = cycle;
        }
        /**
        * Converts a cycle representation to a list representation
        *
        * @param {array} cycle The cycle to be converted
        * @return {array}
        */
        Permutation.cycleToList = function (cycle) {
            var index, list = [], cur, i, ii, j, jj, max;

            max = cycle.map(function (b) {
                return Math.max.apply(null, b);
            });
            max = Math.max.apply(null, max);

            for (i = 0, ii = max; i <= ii; i++) {
                cur = i;
                for (j = 0, jj = cycle.length; j < jj; j++) {
                    index = cycle[j].indexOf(cur);
                    if (++index) {
                        cur = cycle[j][index % cycle[j].length];
                    }
                }
                list.push(cur);
            }
            return list;
        };

        /**
        * Converts a list representation to a cycle representation
        *
        * @param {array} list The list to be converted
        * @return {array}
        */
        Permutation.listToCycle = function (list) {
            var finished = [], cur, i, ii, cycle, cycles = [];

            for (i = 0, ii = list.length; i < ii; i++) {
                cur = i;
                cycle = [];
                while (!finished[cur]) {
                    finished[cur] = true;
                    cycle.push(cur);
                    cur = list[cur];
                }
                if (cycle.length) {
                    cycles.push(cycle);
                }
            }
            return cycles;
        };

        /**
        * Applies the permutation to a number or a array/matrix/point/vector
        *
        * @param {number|array|Matrix|Point|Vector} n The object to apply the permutation to
        * @return {number|array|Matrix|Point|Vector}
        */
        Permutation.prototype.applyTo = function (n) {
            var p, permutatedObj;
            if (typeof n === 'number') {
                if (n >= this.length) {
                    return n;
                }
                return this[n];
            } else {
                p = this;
                permutatedObj = n.map(function (x, i) {
                    return n[p.applyTo(i)];
                });

                return (n.type === undefined ? permutatedObj : new n.constructor(permutatedObj));
            }
        };

        /**
        * Compares two permutations.
        *
        * @param {Permutation} p The permutation to compare
        * @return {number}
        */
        Permutation.prototype.compare = function (p) {
            var i, ii;

            if (this.length !== p.length) {
                return MathLib.sign(this.length - p.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (p[i] - this[i]) {
                    return MathLib.sign(this[i] - p[i]);
                }
            }

            return 0;
        };

        /**
        * Calculates the inverse of the permutation
        *
        * @return {Permutation}
        */
        Permutation.prototype.inverse = function () {
            var cycle = this.cycle.slice(0);
            cycle.reverse().forEach(function (e) {
                e.reverse();
            });
            return new MathLib.Permutation(cycle);
        };

        /**
        * Works like Array.prototype.map.
        *
        * @return {Permutation}
        */
        Permutation.prototype.map = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Permutation(Array.prototype.map.apply(this, args));
        };

        /**
        * Calculates the signum of the permutation
        *
        * @return {number}
        */
        Permutation.prototype.sgn = function () {
            var i, ii, count = 0;

            for (i = 0, ii = this.cycle.length; i < ii; i++) {
                count += this.cycle[i].length;
            }
            count += this.cycle.length;
            return -2 * (count % 2) + 1;
        };

        /**
        * Multiplies two permutations
        *
        * @param {Permutation} p The permutation to multiply
        * @return {Permutation}
        */
        Permutation.prototype.times = function (p) {
            var a = this;
            return p.map(function (x) {
                return a[x];
            });
        };

        /**
        * Converts the permuatation to a matrix.
        *
        * @param {number} n The size of the matrix
        * @return {Matrix}
        */
        Permutation.prototype.toMatrix = function (n) {
            var row = [], matrix = [], index, i, ii;
            n = n || this.length;

            for (i = 0, ii = n - 1; i < ii; i++) {
                row.push(0);
            }
            row = row.concat([1]).concat(row);
            for (i = 0, ii = n; i < ii; i++) {
                index = n - this.applyTo(i) - 1;
                matrix.push(row.slice(index, index + n));
            }
            return new MathLib.Matrix(matrix);
        };

        /**
        * String representation of the permutation.
        *
        * @return {string}
        */
        Permutation.prototype.toString = function () {
            var str = '';
            this.cycle.forEach(function (elem) {
                str += '(' + elem.toString() + ')';
            });
            return str;
        };
        Permutation.id = new Permutation([[]]);
        return Permutation;
    })();
    MathLib.Permutation = Permutation;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {cbrt, isZero, sec, tan, warning} from 'Functn';
    import {Line} from 'Line';
    import {Matrix} from 'Matrix';
    import {Point} from 'Point';
    es6*/
    /// import Functn, Matrix
    /**
    * The conic implementation of MathLib makes calculations with conics possible.
    *
    * @class Conic
    * @this {Conic}
    */
    var Conic = (function () {
        function Conic(primal, dual) {
            this.type = 'conic';
            if (primal.type !== 'matrix') {
                primal = new MathLib.Matrix(primal);
            }
            this.primal = primal;

            // if (!dual) {
            //   dual = primal.adjugate();
            // }
            // else if (!primal.times(dual).isScalar()) {
            //   // Throw error
            // }
            if (primal.rank() > 1) {
                Object.defineProperties(this, {
                    'dual': {
                        get: function () {
                            return this.primal.adjugate();
                        },
                        set: function () {
                        },
                        enumerable: true,
                        configurable: true
                    }
                });
            } else {
                this.dual = dual;
            }
        }
        /**
        * Calculates the conic through five points.
        *
        * @param {Point} p The first point
        * @param {Point} q The second point
        * @param {Point} r The third point
        * @param {Point} s The fourth point
        * @param {Point} t The fifth point
        * @return {Conic}
        */
        Conic.throughFivePoints = function (p, q, r, s, t) {
            var conic = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));

            Object.defineProperties(conic, {
                'primal': {
                    get: function () {
                        var G = p.vectorProduct(r).outerProduct(q.vectorProduct(s)), H = p.vectorProduct(s).outerProduct(q.vectorProduct(r)), M = G.times(t.times(H).scalarProduct(t)).minus(H.times(t.times(G).scalarProduct(t)));
                        return M.transpose().plus(M);
                    },
                    set: function () {
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return conic;
        };

        /**
        * Draws the conic on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Conic} Returns the conic for chaining
        */
        Conic.prototype.draw = function (screen, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            if (Array.isArray(screen)) {
                var conic = this;
                screen.forEach(function (x) {
                    conic.draw(x, options);
                });
            } else {
                options.from = 0;
                options.to = 2 * Math.PI;
                options.conic = this;

                var lines, alpha, cos, sin, sgn, a = this.primal[0][0], b = this.primal[0][1] * 2, c = this.primal[1][1], d = this.primal[0][2] * 2, e = this.primal[1][2] * 2, disc = 4 * a * c - b * b, rank = this.primal.rank(), cx = (b * e - 2 * c * d) / (4 * a * c - b * b), cy = (b * d - 2 * a * e) / (4 * a * c - b * b), normalForm = this.normalize(), A = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[0][0])), C = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[1][1]));

                if (rank === 3) {
                    alpha = Math.atan2(b, a - c) / 2;
                    cos = Math.cos(alpha);
                    sin = Math.sin(alpha);

                    // Parabola
                    if (disc === 0) {
                        options.from = -10;
                        options.to = 10;

                        var param = -this.primal[1][2] / (2 * this.primal[0][0]);
                        cx = 0;
                        cy = this.primal[2][2] / this.primal[0][0];

                        screen.path([
                            function (t) {
                                return cx + cos * param * t * t - sin * 2 * param * t;
                            },
                            function (t) {
                                return cy + sin * param * t * t + cos * 2 * param * t;
                            }
                        ], options, redraw);
                    } else if (disc > 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        screen.path([
                            function (t) {
                                return cx + cos * Math.cos(t) * A - sin * Math.sin(t) * C;
                            },
                            function (t) {
                                return cy + sin * Math.cos(t) * A + cos * Math.sin(t) * C;
                            }
                        ], options, redraw);
                    } else if (disc < 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        // This function changes the direction of the path for the second branch.
                        // Otherwise we get some lines which shouldn't be there.
                        sgn = function (t) {
                            return +((t + Math.PI / 2) % (2 * Math.PI) < Math.PI) * 2 - 1;
                        };

                        if (normalForm.primal[2][2] * normalForm.primal[0][0] > 0) {
                            var swap = A;
                            A = C;
                            C = swap;

                            cos = Math.cos(alpha + Math.PI / 2);
                            sin = Math.sin(alpha + Math.PI / 2);
                        } else {
                            cos = Math.cos(alpha);
                            sin = Math.sin(alpha);
                        }

                        screen.path([
                            function (t) {
                                return cx + cos * MathLib.sec(t) * A - sin * MathLib.tan(t) * C * sgn(t);
                            },
                            function (t) {
                                return cy + sin * MathLib.sec(t) * A + cos * MathLib.tan(t) * C * sgn(t);
                            }
                        ], options, redraw);
                    }
                } else if (rank === 2) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                    screen.line(lines[1], options);
                } else if (rank === 1) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                }
            }
            return this;
        };

        /**
        * Calculates the eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.eccentricity = function () {
            var normalform = this.normalize(), a = normalform.primal[0][0], c = normalform.primal[1][1];

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return 1;
                }
                if (c > 0) {
                    return Math.sqrt(1 - c / a);
                }
                return Math.sqrt(1 - a / c);
            }
        };

        /**
        * Determines if a conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.isDegenerated = function () {
            return this.primal.rank() !== 3;
        };

        /**
        * Determines if two conics are equal.
        *
        * @param {Conic} conic The conic to be compared
        * @return {boolean}
        */
        Conic.prototype.isEqual = function (conic) {
            if (this === conic) {
                return true;
            }

            var compare = function (M, N) {
                var i, j, m, n;

                if (M === N) {
                    return true;
                }

                nonZeroSearch:
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (M[i][j] !== 0) {
                            break nonZeroSearch;
                        }
                    }
                }

                if (N[i][j] === 0) {
                    return false;
                }

                m = M[i][j];
                n = N[i][j];

                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (n / m * M[i][j] !== N[i][j]) {
                            return false;
                        }
                    }
                }

                return true;
            };

            return compare(this.primal, conic.primal) && compare(this.dual, conic.dual);
        };

        /**
        * Calculates the latusRectum of a conic.
        *
        * @return {number}
        */
        Conic.prototype.latusRectum = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], min = Math.min(Math.abs(a), Math.abs(c)), max = Math.max(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // Parabola
                if (c === 0) {
                    return -2 * normalForm.primal[1][2] / a;
                }

                return 2 * Math.sqrt(max) / min;
            }
        };

        /**
        * Calculates the linear eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.linearEccentricity = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], max = Math.max(Math.abs(a), Math.abs(c)), min = Math.min(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return normalForm.primal[1][2] / (-2 * a);
                }

                if (c > 0) {
                    return Math.sqrt(1 / min - 1 / max);
                }
                return Math.sqrt(1 / max + 1 / min);
            }
        };

        /**
        * Calculates the meet of the conic with a line or a conic.
        *
        * @param {Line|Conic} x The line or conic to intersect with
        * @return {Point[]}
        */
        Conic.prototype.meet = function (x) {
            var B, C, alpha, i, j, p1, p2, Ml, a, b, c, d, Delta0, Delta1, lambda, degenerated, lines, A = this.primal;

            if (x.type === 'line') {
                var setter = function () {
                    MathLib.warning({
                        message: 'Trying to change the coordinates of a completely dependent point.',
                        method: 'Conic#meet'
                    });
                }, recalculate = function () {
                    Ml = new MathLib.Matrix([[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]);
                    B = Ml.transpose().times(A).times(Ml);

                    if (!MathLib.isZero(x[0])) {
                        alpha = Math.sqrt(B[2][1] * B[1][2] - B[1][1] * B[2][2]) / x[0];
                    } else if (!MathLib.isZero(x[1])) {
                        alpha = Math.sqrt(B[0][2] * B[2][0] - B[2][2] * B[0][0]) / x[1];
                    } else {
                        alpha = Math.sqrt(B[1][0] * B[0][1] - B[0][0] * B[1][1]) / x[2];
                    }

                    C = Ml.times(alpha).plus(B);

                    nonZeroSearch:
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            if (C[i][j] !== 0) {
                                break nonZeroSearch;
                            }
                        }
                    }
                };

                recalculate();

                p1 = new MathLib.Point(C[i]);
                Object.defineProperties(p1, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[i][0];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[i][1];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[i][2];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                p2 = new MathLib.Point([C[0][j], C[1][j], C[2][j]]);
                Object.defineProperties(p2, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[0][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[1][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[2][j];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                return [p1, p2];
            } else if (x.type === 'conic') {
                B = x.primal;
                a = A.determinant();
                b = (new MathLib.Matrix([A[0], A[1], B[2]])).plus(new MathLib.Matrix([A[0], B[1], A[2]])).plus(new MathLib.Matrix([B[0], A[1], A[2]])).determinant();
                c = (new MathLib.Matrix([A[0], B[1], B[2]])).plus(new MathLib.Matrix([B[0], A[1], B[2]])).plus(new MathLib.Matrix([B[0], B[1], A[2]])).determinant();
                d = B.determinant();
                Delta0 = b * b - 3 * a * c;
                Delta1 = 2 * b * b - 9 * a * b * c + 27 * a * a * d;
                C = MathLib.cbrt((Delta1 + Math.sqrt(Math.pow(Delta1, 2) - 4 * Math.pow(Delta0, 3))) / 2);
                lambda = -(b + C + Delta0 / C) / (3 * a);
                degenerated = new MathLib.Conic(B.times(lambda).plus(A));
                lines = degenerated.splitDegenerated();

                return this.meet(lines[0]).concat(this.meet(lines[1]));
            }
        };

        /**
        * Calculates the normal form of a conic.
        *
        * @return {Conic}
        */
        Conic.prototype.normalize = function () {
            var A = this.primal[0][0], B = this.primal[0][1] * 2, C = this.primal[1][1], D = this.primal[0][2] * 2, E = this.primal[1][2] * 2, F = this.primal[2][2], r = Math.atan2(B, A - C) / 2, cos = Math.cos(r), sin = Math.sin(r), a = A * cos * cos + B * sin * cos + C * sin * sin, c = A * sin * sin - B * sin * cos + C * cos * cos, d = D * cos + E * sin, e = E * cos - D * sin, f = F;

            if (a !== 0) {
                f += -d * d / (4 * a);
                d = 0;
            }

            if (c !== 0) {
                f += -e * e / (4 * c);
                e = 0;
            }

            if (f !== 0) {
                a = -a / f;
                c = -c / f;
                d = -d / f;
                e = -e / f;
                f = -1;
            }

            return new MathLib.Conic(new MathLib.Matrix([[a, 0, d / 2], [0, c, e / 2], [d / 2, e / 2, f]]));
        };

        /**
        * Calculates the four polarity of a conic.
        *
        * @return {Point[]}
        */
        Conic.prototype.polarity = function (x) {
            var object, m, c = this;

            if (x.type === 'line') {
                object = new MathLib.Point([0, 0, 0]);
                m = 'dual';
            } else if (x.type === 'point') {
                object = new MathLib.Line([0, 0, 0]);
                m = 'primal';
            }

            Object.defineProperties(object, {
                '0': {
                    get: function () {
                        return c[m][0][0] * x[0] + c[m][0][1] * x[1] + c[m][0][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                }
            });

            return object;
        };

        /**
        * Splits a conic into one or two lines if the conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.splitDegenerated = function () {
            var n, i, j, B, C, p0, p1, p2, rank = this.primal.rank(), nonZeroSearch = function (C) {
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (C[i][j] !== 0) {
                            return;
                        }
                    }
                }
            };

            if (rank === 2) {
                if (this.dual[0][0] !== 0) {
                    n = 0;
                } else if (this.dual[1][1] !== 0) {
                    n = 1;
                } else {
                    n = 2;
                }

                if (this.dual[n][n] < 0) {
                    B = this.dual.negative();
                } else {
                    B = this.dual;
                }

                p0 = B[0][n] / Math.sqrt(B[n][n]);
                p1 = B[1][n] / Math.sqrt(B[n][n]);
                p2 = B[2][n] / Math.sqrt(B[n][n]);
                C = this.primal.plus(new MathLib.Matrix([[0, p2, -p1], [-p2, 0, p0], [p1, -p0, 0]]));

                nonZeroSearch(C);

                return [new MathLib.Line(C[i]), new MathLib.Line([C[0][j], C[1][j], C[2][j]])];
            } else if (rank === 1) {
                nonZeroSearch(this.primal);
                return [new MathLib.Line(this.primal[i]), new MathLib.Line(this.primal[i])];
            }
        };
        return Conic;
    })();
    MathLib.Conic = Conic;
})(MathLib);



(function (MathLib) {
    'use strict';

    /*es6
    import {hypot, isEqual, isZero} from 'Functn';
    import {toLaTeX, toMathML, toString, warning} from 'meta';
    import {Complex} from 'Complex';
    import {Line} from 'Line';
    import {Vector} from 'Vector';
    es6*/
    /// import Complex, Vector
    /**
    * The point implementation of MathLib makes calculations with point in
    * arbitrary dimensions possible.
    *
    * MathLib uses the homogeneous form of a point for calculations and storage.
    *
    * To create the point (4, 2) on the two dimensional plane use
    * `new MathLib.Point([4, 2, 1])`
    * Alternatively you can use
    * `new MathLib.Point(4, 2)`
    * The 1 will be added for you.
    *
    * @class
    * @augments Vector
    * @this {Point}
    */
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(coords) {
            _super.call(this, arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);
            this.type = 'point';

            this.dimension = 2;
        }
        /**
        * Calculates the distance crossratio (A,B,C,D) of four points
        * as seen from the current point.
        *
        * @param {Point} a The point A
        * @param {Point} b The point B
        * @param {Point} c The point C
        * @param {Point} d The point D
        * @return {number}
        */
        Point.prototype.crossRatio = function (a, b, c, d) {
            var xa = this.vectorProduct(a), xb = this.vectorProduct(b);

            return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
        };

        /**
        * Calculates the distance to an other point.
        * If no other point is provided, it calculates the distance to the origin.
        *
        * @param {Point} p The point to calculate the distance to
        * @return {number}
        */
        Point.prototype.distanceTo = function (p) {
            if (arguments.length === 0) {
                return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
            }

            if (p.type === 'point' && this.dimension === p.dimension) {
                return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
            }
        };

        /**
        * Draws the point on a canvas or svg element.
        *
        * @param {Screen} screen The screen to draw onto
        * @param {object} options Drawing options
        * @return {Point} Returns the point for chaining
        */
        Point.prototype.draw = function (screen, options) {
            if (typeof options === "undefined") { options = {}; }
            if (Array.isArray(screen)) {
                var point = this;
                screen.forEach(function (x) {
                    x.point(point, options);
                });
            } else {
                screen.point(this, options);
            }

            return this;
        };

        /**
        * Determines if the point has the same coordinates as an other point
        *
        * @param {Point} q The point to compare
        * @return {boolean}
        */
        Point.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();

            if (this.length !== q.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };

        /**
        * Determines if the point is finite
        *
        * @return {boolean}
        */
        Point.prototype.isFinite = function () {
            return !MathLib.isZero(this[this.length - 1]);
        };

        /**
        * Calculates a line connecting two points
        *
        * @param {Point} q The point to calculate the line to
        * @return {Line}
        */
        Point.prototype.join = function (q) {
            var line, p = this;

            if (this.dimension === 2 && q.dimension === 2) {
                line = new MathLib.Line(this.vectorProduct(q).toArray());

                Object.defineProperties(line, {
                    '0': {
                        get: function () {
                            return p[1] * q[2] - p[2] * q[1];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return p[2] * q[0] - p[0] * q[2];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return p[0] * q[1] - p[1] * q[0];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    }
                });

                return line;
            }
        };

        /**
        * Normalizes the point.
        *
        * @return {Point}
        */
        Point.prototype.normalize = function () {
            var last = this[this.dimension] || 1;
            return this.map(function (x) {
                return x / last;
            });
        };

        /**
        * Reflects the point at an other point
        *
        * @param {Point} q The point to reflect the current point at.
        * @return {Point}
        */
        Point.prototype.reflectAt = function (q) {
            var i, ii, reflectedPoint = [], p = this.normalize();

            if (q.type === 'point') {
                if (this.dimension === q.dimension) {
                    q = q.normalize();
                    for (i = 0, ii = this.dimension; i < ii; i++) {
                        reflectedPoint.push(2 * q[i] - p[i]);
                    }
                    reflectedPoint.push(1);
                    return new MathLib.Point(reflectedPoint);
                }
            }
        };

        /**
        * Restricts the point to a line.
        *
        * @param {Line} l The line to restrict the point to.
        */
        Point.prototype.restrictTo = function (l) {
            var p = this.slice();

            Object.defineProperties(this, {
                '0': {
                    get: function () {
                        return l[1] * l[1] * p[0] - l[0] * (l[1] * p[1] + l[2] * p[2]);
                    },
                    set: function (point) {
                        p[0] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * l[2] * p[2] + l[0] * (l[0] * p[1] - l[1] * p[0]);
                    },
                    set: function (point) {
                        p[1] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '2': {
                    get: function () {
                        return l[1] * l[1] * p[2] + l[0] * l[0] * p[2];
                    },
                    set: function (point) {
                        p[2] = point;
                    },
                    enumerable: true,
                    configurable: true
                }
            });
        };

        /**
        * Converts a two dimensional point to the corresponding complex number.
        *
        * @return {Complex}
        */
        Point.prototype.toComplex = function () {
            if (this.dimension === 2) {
                if (MathLib.isZero(this[2])) {
                    return new MathLib.Complex(Infinity);
                }
                return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
            }
        };

        /**
        * TODO: implement
        * Returns content MathML representation of the point
        *
        * @return {string}
        */
        // toContentMathML(opt) {
        // }
        /**
        * Returns LaTeX representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toLaTeX = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
                return old + '\\\\' + MathLib.toLaTeX(cur);
            }) + '\\end{pmatrix}';
        };

        /**
        * Returns (presentation) MathML representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toMathML = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return p.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };

        /**
        * Returns string representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toString = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '(' + p.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };
        Point.I = new Point([new MathLib.Complex(0, -1), 0, 1]);

        Point.J = new Point([new MathLib.Complex(0, 1), 0, 1]);
        return Point;
    })(MathLib.Vector);
    MathLib.Point = Point;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {fallingFactorial, is, isEqual, isZero, negative, plus, sign, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Expression} from 'Expression';
    import {Functn} from 'Functn';
    import {Matrix} from 'Matrix';
    es6*/
    /// import Functn
    /**
    * The polynomial implementation of MathLib makes calculations with polynomials.
    * Both the coefficients and the arguments of a polynomial can be numbers,
    * complex numbers and matrices.
    *
    * It is as easy as
    * ```
    * new MathLib.Polynomial([1, 2, 3])
    * ```
    * to create the polynomial 1 + 2x + 3x²
    * The polynomial x¹⁰⁰ can be created with the following statement:
    * ```
    * new MathLib.Polynomial(100)
    * ```
    *
    * @class
    * @this {Polynomial}
    */
    var Polynomial = (function () {
        function Polynomial(polynomial) {
            var _this = this;
            this.type = 'polynomial';
            var coefficients = [];

            if (polynomial === undefined || polynomial.length === 0) {
                polynomial = [0];
            } else if (typeof polynomial === 'number') {
                while (polynomial--) {
                    coefficients.push(0);
                }
                coefficients.push(1);
                polynomial = coefficients;
            }

            polynomial.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = polynomial.length;
            this.deg = polynomial.length - 1;
            this.subdeg = (function (a) {
                var i = 0;
                if (a.length > 1 || a[0]) {
                    while (i < a.length && MathLib.isZero(a[i])) {
                        i++;
                    }
                    return i;
                }
                return Infinity;
            }(polynomial));
        }
        /**
        * Interpolates points.
        *
        * @return {Polynomial}
        */
        Polynomial.interpolation = function (a, b) {
            var basisPolynomial, interpolant = new MathLib.Polynomial([0]), n = a.length, i, j;

            if (arguments.length === 2) {
                a = a.map(function (x, i) {
                    return [x, b[i]];
                });
            }

            for (i = 0; i < n; i++) {
                basisPolynomial = new MathLib.Polynomial([1]);
                for (j = 0; j < n; j++) {
                    if (i !== j) {
                        basisPolynomial = basisPolynomial.times(new MathLib.Polynomial([-a[j][0] / (a[i][0] - a[j][0]), 1 / (a[i][0] - a[j][0])]));
                    }
                }
                interpolant = interpolant.plus(basisPolynomial.times(a[i][1]));
            }
            return interpolant;
        };

        /**
        * Calculates the regression line for some points
        *
        * @param {array} x The x values
        * @param {array} y The y values
        * @return {Polynomial}
        */
        Polynomial.regression = function (x, y) {
            var length = x.length, xy = 0, xi = 0, yi = 0, x2 = 0, m, c, i;

            if (arguments.length === 2) {
                for (i = 0; i < length; i++) {
                    xy += x[i] * y[i];
                    xi += x[i];
                    yi += y[i];
                    x2 += x[i] * x[i];
                }
            } else {
                for (i = 0; i < length; i++) {
                    xy += x[i][0] * x[i][1];
                    xi += x[i][0];
                    yi += x[i][1];
                    x2 += x[i][0] * x[i][0];
                }
            }

            m = (length * xy - xi * yi) / (length * x2 - xi * xi);
            c = (yi * x2 - xy * xi) / (length * x2 - xi * xi);
            return new MathLib.Polynomial([c, m]);
        };

        /**
        * Returns a polynomial with the specified roots
        *
        * @param {array|Set} zeros The wished zeros.
        * @return {Polynomial}
        */
        Polynomial.roots = function (zeros) {
            var elemSymPoly, i, ii, coef = [];

            if (MathLib.type(zeros) === 'array') {
                zeros = new MathLib.Set(zeros);
            }

            elemSymPoly = zeros.powerset();
            for (i = 0, ii = zeros.card; i < ii; i++) {
                coef[i] = 0;
            }

            // Vieta's theorem
            elemSymPoly.slice(1).forEach(function (x) {
                coef[ii - x.card] = MathLib.plus(coef[ii - x.card], x.times());
            });

            coef = coef.map(function (x, i) {
                if ((ii - i) % 2) {
                    return MathLib.negative(x);
                }
                return x;
            });

            coef.push(1);
            return new MathLib.Polynomial(coef);
        };

        /**
        * Compares two polynomials.
        *
        * @param {Polynomial} p The polynomial to compare
        * @return {number}
        */
        Polynomial.prototype.compare = function (p) {
            var i, ii;

            if (this.length !== p.length) {
                return MathLib.sign(this.length - p.length);
            }

            for (i = 0, ii = this.length; i < ii; i++) {
                if (p[i] - this[i]) {
                    return MathLib.sign(this[i] - p[i]);
                }
            }

            return 0;
        };

        /**
        * Differentiates the polynomial
        *
        * @param {number} n the number of times to differentiate the polynomial.
        * @return {Polynomial}
        */
        Polynomial.prototype.differentiate = function (n) {
            if (typeof n === "undefined") { n = 1; }
            var i, ii, derivative = [];

            if (n === 0) {
                return this;
            }

            for (i = 0, ii = this.deg - n; i <= ii; i++) {
                derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
            }
            return new MathLib.Polynomial(derivative);
        };

        /**
        * Draws the polynomial on the screen
        *
        * @param {Screen} screen The screen to draw the polynomial onto.
        * @param {object} options Optional drawing options.
        * @return {Polynomial} Returns the polynomial for chaining
        */
        Polynomial.prototype.draw = function (screen, options) {
            if (typeof options === "undefined") { options = {}; }
            return this.toFunctn().draw(screen, options);
        };

        /**
        * Works like Array.prototype.every.
        *
        * @param {function} f The function to be applied to all the values
        * @return {boolean}
        */
        Polynomial.prototype.every = function (f) {
            return Array.prototype.every.call(this, f);
        };

        /**
        * Works like the Array.prototype.forEach function
        */
        Polynomial.prototype.forEach = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            Array.prototype.forEach.apply(this, args);
        };

        /**
        * Integrates the polynomial
        *
        * @param {number} n The number of times to integrate the polynomial.
        * @return {Polynomial}
        */
        Polynomial.prototype.integrate = function (n) {
            if (typeof n === "undefined") { n = 1; }
            var i, ii, antiderivative = [];

            if (MathLib.isZero(n)) {
                return this;
            }

            for (i = 0; i < n; i++) {
                antiderivative.push(0);
            }

            for (i = 0, ii = this.deg; i <= ii; i++) {
                antiderivative[i + n] = this[i] / MathLib.fallingFactorial(i + n, n);
            }
            return new MathLib.Polynomial(antiderivative);
        };

        /**
        * Decides if two polynomials are equal.
        *
        * @param {Polynomial} p The polynomial to compare.
        * @return {boolean}
        */
        Polynomial.prototype.isEqual = function (p) {
            var i, ii;
            if (this.deg !== p.deg || this.subdeg !== p.subdeg) {
                return false;
            }
            for (i = 0, ii = this.deg; i <= ii; i++) {
                if (!MathLib.isEqual(this[i], p[i])) {
                    return false;
                }
            }
            return true;
        };

        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} f The function to be applied to all the values
        * @return {Polynomial}
        */
        Polynomial.prototype.map = function (f) {
            return new MathLib.Polynomial(Array.prototype.map.call(this, f));
        };

        /**
        * Returns the negative polynomial
        *
        * @return {Polynomial}
        */
        Polynomial.prototype.negative = function () {
            return new MathLib.Polynomial(this.map(function (entry) {
                return MathLib.negative(entry);
            }));
        };

        /**
        * Adds a number or a polynomial
        *
        * @param {number|Polynomial} a The number or polynomial to add to the current polynomial
        * @return {Polynomial}
        */
        Polynomial.prototype.plus = function (a) {
            var plus = [], i;
            if (typeof a === 'number') {
                plus = this.slice();
                plus[0] = MathLib.plus(plus[0], a);
            } else if (a.type === 'polynomial') {
                for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
                    plus[i] = MathLib.plus(this[i], a[i]);
                }
                plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
            }
            return new MathLib.Polynomial(plus);
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Polynomial.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Multiplies the polynomial by a number or an other polynomial
        *
        * @param {number|Polynomial} a The multiplicator
        * @return {Polynomial}
        */
        Polynomial.prototype.times = function (a) {
            var i, ii, j, jj, product = [];

            if (a.type === 'polynomial') {
                for (i = 0, ii = this.deg; i <= ii; i++) {
                    for (j = 0, jj = a.deg; j <= jj; j++) {
                        product[i + j] = MathLib.plus((product[i + j] ? product[i + j] : 0), MathLib.times(this[i], a[j]));
                    }
                }
                return new MathLib.Polynomial(product);
            } else if (a.type === 'rational') {
                a = a.coerceTo('number');
            }

            // we we multiply it to every coefficient
            return this.map(function (b) {
                return MathLib.times(a, b);
            });
        };

        /**
        * Returns a content MathML representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toContentMathML = function () {
            var str = '<apply><csymbol cd="arith1">plus</csymbol>', i;
            for (i = this.deg; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toContentMathML(this[i]);
                    } else {
                        str += '<apply><csymbol cd="arith1">times</csymbol>' + MathLib.toContentMathML(this[i], true);
                    }

                    if (i > 1) {
                        str += '<apply><csymbol cd="arith1">power</csymbol><ci>x</ci>' + MathLib.toContentMathML(i) + '</apply></apply>';
                    } else if (i === 1) {
                        str += '<ci>x</ci></apply>';
                    }
                }
            }

            str += '</apply>';

            return str;
        };

        /**
        * Custom toExpression function
        *
        * @return {Expression}
        */
        Polynomial.prototype.toExpression = function () {
            var content = [], sum, i;

            for (i = this.deg; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    if (i > 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            value: '^',
                            name: 'pow',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'naryOperator',
                                    content: [
                                        new MathLib.Expression({
                                            subtype: 'number',
                                            value: this[i].toString()
                                        }),
                                        new MathLib.Expression({
                                            subtype: 'variable',
                                            value: 'x'
                                        })
                                    ],
                                    value: '*',
                                    name: 'times'
                                }),
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: i.toString()
                                })
                            ]
                        }));
                    } else if (i === 1) {
                        content.push(new MathLib.Expression({
                            subtype: 'naryOperator',
                            content: [
                                new MathLib.Expression({
                                    subtype: 'number',
                                    value: this[i].toString()
                                }),
                                new MathLib.Expression({
                                    subtype: 'variable',
                                    value: 'x'
                                })
                            ],
                            value: '*',
                            name: 'times'
                        }));
                    } else if (i === 0) {
                        content.push(new MathLib.Expression({
                            subtype: 'number',
                            value: this[i].toString()
                        }));
                    }
                }
            }

            sum = new MathLib.Expression({
                content: content,
                subtype: 'naryOperator',
                value: '+',
                name: 'plus'
            });

            return new MathLib.Expression({
                subtype: 'functionDefinition',
                args: ['x'],
                content: [sum]
            });
        };

        /**
        * Converts the polynomial to a functn
        *
        * @return {Functn}
        */
        Polynomial.prototype.toFunctn = function () {
            var str = '', i, ii;
            for (i = 0, ii = this.deg; i <= ii; i++) {
                if (!MathLib.isZero(this[i])) {
                    if (i === 0) {
                        str += MathLib.toString(this[i]);
                    } else {
                        str += MathLib.toString(this[i], { sign: true });
                    }

                    if (i > 1) {
                        str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
                    } else if (i === 1) {
                        str += ' * x';
                    }
                }
            }

            return MathLib.Functn(new Function('x', 'return ' + str), {
                expression: this.toExpression()
            });
        };

        /**
        * Returns a LaTeX representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toLaTeX = function () {
            var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}', i;

            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toLaTeX(this[i]);
                    // }
                    // else {
                    str += MathLib.toLaTeX(this[i], { sign: true });

                    // }
                    if (i > 1) {
                        str += 'x^{' + MathLib.toLaTeX(i) + '}';
                    } else if (i === 1) {
                        str += 'x';
                    }
                }
            }
            return str;
        };

        /**
        * Returns a MathML representation of the polynomial
        *
        * @return {string}
        */
        Polynomial.prototype.toMathML = function () {
            var str = '<mrow>' + MathLib.toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>', i;
            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    // if (i === 0) {
                    //   str += MathLib.toMathML(this[i]);
                    // }
                    // else {
                    str += MathLib.toMathML(this[i], { sign: true });

                    // }
                    if (i > 1) {
                        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i).slice(6, -7) + '</msup>';
                    } else if (i === 1) {
                        str += '<mo>&#x2062;</mo><mi>x</mi>';
                    }
                }
            }

            str += '</mrow>';

            return str;
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Polynomial.prototype.toString = function () {
            var i, str = MathLib.toString(this[this.deg]) + '*x^' + this.deg;

            for (i = this.deg - 1; i >= 0; i--) {
                if (!MathLib.isZero(this[i])) {
                    str += MathLib.toString(this[i], { sign: true });

                    if (i > 1) {
                        str += '*x^' + MathLib.toString(i);
                    } else if (i === 1) {
                        str += '*x';
                    }
                }
            }
            return str;
        };

        /**
        * Evaluates the polynomial at a given point
        *
        * @param {number|Complex|Matrix} x The value to evaluate the polynomial at.
        * @return {number|Complex|Matrix}
        */
        Polynomial.prototype.valueAt = function (x) {
            // TODO: warn if x is non square matrix
            var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows) : 1, value = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0, i, ii;

            for (i = 0, ii = this.deg; i <= ii; i++) {
                value = MathLib.plus(value, MathLib.times(this[i], pot));
                pot = MathLib.times(pot, x);
            }
            return value;
        };
        Polynomial.one = new Polynomial([1]);

        Polynomial.zero = new Polynomial([0]);
        return Polynomial;
    })();
    MathLib.Polynomial = Polynomial;
})(MathLib);


(function (MathLib) {
    'use strict';

    /*es6
    import {abs, coerce, copy, isEqual, isZero, minus, negative, plus, sign, times} from 'Functn';
    import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
    import {Complex} from 'Complex';
    import {CoercionError} from 'CoercionError';
    import {EvaluationError} from 'EvaluationError';
    import {Integer} from 'Integer';
    es6*/
    /// import Functn
    /**
    * MathLib.Rational is the MathLib implementation of rational numbers.
    *
    * #### Simple use case:
    * ```
    * // Create the rational number 2/3
    * var r = new MathLib.Rational(2, 3);
    * ```
    *
    * @class
    * @this {Rational}
    */
    var Rational = (function () {
        function Rational(numerator, denominator) {
            if (typeof denominator === "undefined") { denominator = 1; }
            this.type = 'rational';
            if (MathLib.isZero(denominator)) {
                throw new MathLib.EvaluationError('The denominator of a rational number cannot be zero.', {
                    method: 'Rational.constructor'
                });
            }
            if (MathLib.isNaN(numerator)) {
                throw new MathLib.EvaluationError('The numerator of a rational number cannot be NaN.', {
                    method: 'Rational.constructor'
                });
            }
            if (MathLib.isNaN(denominator)) {
                throw new MathLib.EvaluationError('The denominator of a rational number cannot be NaN.', {
                    method: 'Rational.constructor'
                });
            }

            if ((typeof denominator === 'number' && denominator < 0) || (denominator.type === 'integer' && denominator.sign === '-')) {
                numerator = MathLib.negative(numerator);
                denominator = MathLib.negative(denominator);
            }

            this.numerator = numerator;
            this.denominator = denominator;
        }
        /**
        * The characteristic of the rational field is 0.
        *
        * @return {Integer}
        */
        Rational.characteristic = function () {
            return new MathLib.Integer(0);
        };

        /**
        * A content MathML string representation
        *
        * @return {string}
        */
        Rational.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                return '<csymbol cd="setname1">Q</csymbol>';
            }
            return '<rationals/>';
        };

        /**
        * A LaTeX string representation
        *
        * @return {string}
        */
        Rational.toLaTeX = function () {
            return 'Rational Field $\\mathbb{Q}$';
        };

        /**
        * A presentation MathML string representation
        *
        * @return {string}
        */
        Rational.toMathML = function () {
            return '<mrow><mtext>Rational Field</mtext><mi mathvariant="double-struck">Q</mi></mrow>';
        };

        /**
        * Custom toString function
        *
        * @return {string}
        */
        Rational.toString = function () {
            return 'Rational Field ℚ';
        };

        /**
        * Coerces the rational number to some other data type
        *
        * @param {string} type The type to coerce the rational number into
        * @return {Integer|Rational|number|Complex}
        */
        Rational.prototype.coerceTo = function (type) {
            if (type === 'integer') {
                if (this.denominator === 1) {
                    return new MathLib.Integer(this.numerator);
                }
                throw new MathLib.CoercionError('Cannot coerce the rational number to an integer, since the denominator is not 1.', {
                    method: 'Rational.prototype.coerceTo'
                });
            } else if (type === 'rational') {
                return this.copy();
            } else if (type === 'complex') {
                // return new MathLib.Complex(this, new MathLib.Rational(0));
                return new MathLib.Complex(this, 0);
            } else if (type === 'number') {
                return this.numerator / this.denominator;
            } else {
                throw new MathLib.CoercionError('Cannot coerce the rational number to "' + type + '".', {
                    method: 'Rational.prototype.coerceTo'
                });
            }
        };

        /**
        * Compares two rational numbers
        *
        * @param {Rational} rational The number to compare
        * @return {number}
        */
        Rational.prototype.compare = function (rational) {
            return MathLib.sign(this.numerator * rational.denominator - this.denominator * rational.numerator);
        };

        /**
        * Copy the rational number
        *
        * @return {Rational}
        */
        Rational.prototype.copy = function () {
            return new MathLib.Rational(MathLib.copy(this.numerator), MathLib.copy(this.denominator));
        };

        /**
        * Divides rational numbers
        *
        * @param {Rational|number} divisor The divisor
        * @return {Rational}
        */
        Rational.prototype.divide = function (divisor) {
            if (divisor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, divisor.denominator), MathLib.times(this.denominator, divisor.numerator));
            } else if (typeof divisor === 'number') {
                return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, divisor));
            } else {
                return divisor.inverse().times(this);
            }
        };

        /**
        * Calculates the inverse of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.inverse = function () {
            if (!MathLib.isZero(this.numerator)) {
                return new MathLib.Rational(this.denominator, this.numerator);
            }
        };

        /**
        * Checks if the rational number is equal to an other number
        *
        * @param {Integer|Rational|number|Complex} n The number to compare
        * @return {boolean}
        */
        Rational.prototype.isEqual = function (n) {
            if (n.type !== 'rational') {
                return MathLib.isEqual.apply(null, MathLib.coerce(this, n));
            } else {
                return MathLib.isEqual(MathLib.times(this.numerator, n.denominator), MathLib.times(this.denominator, n.numerator));
            }
        };

        /**
        * Checks if the rational number is zero
        *
        * @return {boolean}
        */
        Rational.prototype.isZero = function () {
            return MathLib.isZero(this.numerator);
        };

        /**
        * Subtracts rational numbers
        *
        * @param {Rational|number} subtrahend The number to be subtracted
        * @return {Rational}
        */
        Rational.prototype.minus = function (subtrahend) {
            if (subtrahend.type !== 'rational') {
                return MathLib.minus.apply(null, MathLib.coerce(this, subtrahend));
            } else {
                return new MathLib.Rational(MathLib.minus(MathLib.times(this.numerator, subtrahend.denominator), MathLib.times(this.denominator, subtrahend.numerator)), MathLib.times(this.denominator, subtrahend.denominator));
            }
        };

        /**
        * Calculates the negative of a rational number
        *
        * @return {Rational}
        */
        Rational.prototype.negative = function () {
            return new MathLib.Rational(-this.numerator, this.denominator);
        };

        /**
        * Adds rational numbers
        *
        * @param {Integer|Rational|number|Complex} summand The number to be added
        * @return {Rational|number|Complex}
        */
        Rational.prototype.plus = function (summand) {
            if (summand.type !== 'rational') {
                return MathLib.plus.apply(null, MathLib.coerce(this, summand));
            } else {
                return new MathLib.Rational(MathLib.plus(MathLib.times(this.denominator, summand.numerator), MathLib.times(this.numerator, summand.denominator)), MathLib.times(this.denominator, summand.denominator));
            }
        };

        /**
        * Reduces the rational number
        *
        * @return {Rational}
        */
        Rational.prototype.reduce = function () {
            var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
            return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
        };

        /**
        * Multiplies rational numbers
        *
        * @param {Rational|number} factor The number to be multiplied
        * @return {Rational}
        */
        Rational.prototype.times = function (factor) {
            if (factor.type === 'rational') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor.numerator), MathLib.times(this.denominator, factor.denominator));
            } else if (typeof factor === 'number') {
                return new MathLib.Rational(MathLib.times(this.numerator, factor), this.denominator);
            } else {
                return factor.times(this);
            }
        };

        /**
        * Returns the Content MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var base;

            if (options.strict) {
                return '<apply><csymbol cd="nums1">rational</csymbol>' + MathLib.toContentMathML(this.numerator, options) + MathLib.toContentMathML(this.denominator, options) + '</apply>';
            } else {
                base = (options.base || 10);
                return '<cn type="rational"' + ((base !== 10) ? ' base="' + base + '"' : '') + '>' + MathLib.toString(this.numerator, { base: base }) + '<sep/>' + MathLib.toString(this.denominator, { base: base }) + '</cn>';
            }
        };

        /**
        * Returns the LaTeX representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var numerator, option, str = '', passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            if (options.sign) {
                str = MathLib.toString(this.numerator, { sign: true }).slice(0, 1);
                numerator = MathLib.toLaTeX(MathLib.abs(this.numerator), passOptions);
            } else {
                numerator = MathLib.toLaTeX(this.numerator, passOptions);
            }

            return str + '\\frac{' + numerator + '}{' + MathLib.toLaTeX(this.denominator, passOptions) + '}';
        };

        /**
        * Returns the MathML representation of the rational number
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var numerator, option, str = '', passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            if (options.sign) {
                str = '<mo>' + MathLib.toString(this.numerator, { sign: true }).slice(0, 1) + '</mo>';
                numerator = MathLib.toMathML(MathLib.abs(this.numerator), passOptions);
            } else {
                numerator = MathLib.toMathML(this.numerator, passOptions);
            }

            return str + '<mfrac>' + numerator + MathLib.toMathML(this.denominator, passOptions) + '</mfrac>';
        };

        /**
        * Custom toString function
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Rational.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            var option, passOptions = {};

            for (option in options) {
                if (options.hasOwnProperty(option) && option !== 'sign') {
                    passOptions[option] = options[option];
                }
            }

            return MathLib.toString(this.numerator, options) + '/' + MathLib.toString(this.denominator, passOptions);
        };
        return Rational;
    })();
    MathLib.Rational = Rational;
})(MathLib);


(function (MathLib) {
    'use strict';

    /* jshint -W079 */
    /*es6
    import {compare, evaluate, isEqual, plus, sign, times, toContentMathML, toLaTeX, toMathML, toString} from 'Functn';
    import {toLaTeX, toMathML, toString} from 'meta';
    es6*/
    /// no import
    /**
    * The Implementation of sets in MathLib
    *
    * To generate the set {1, 2, 3, 4, 5} you simply need to type
    * ```
    * new MathLib.Set([1, 2, 3, 4, 5])
    * ```
    * @class
    * @this {Set}
    */
    var Set = (function () {
        function Set(elements) {
            var _this = this;
            this.type = 'set';
            /**
            * Returns the intersection of two sets.
            *
            * @param {Set} set The set to intersect the current set with.
            * @return {Set}
            */
            this.intersect = Set.createSetOperation(false, true, false);
            /**
            * Returns the union of two sets.
            *
            * @param {Set} set The set to join the current set with.
            * @return {Set}
            */
            this.union = Set.createSetOperation(true, true, true);
            /**
            * Returns all elements, which are in the first set, but not in the second.
            *
            * @param {Set} set The set whose elements should be removed from the current set.
            * @return {Set}
            */
            this.without = Set.createSetOperation(true, false, false);
            /**
            * Returns all elements which are in either the first or the second set.
            *
            * @param {Set} set The second set.
            * @return {Set}
            */
            this.xor = Set.createSetOperation(true, false, true);
            if (!elements) {
                elements = [];
            }

            elements = elements.sort(MathLib.compare).filter(function (x, i, a) {
                return (a.length === i + 1) || !MathLib.isEqual(x, a[i + 1]) || (typeof x.isEqual !== 'undefined' && !x.isEqual(a[i + 1]));
            });

            elements.forEach(function (x, i) {
                _this[i] = x;
            });
            this.length = elements.length;
            this.card = elements.length;
        }
        /**
        * Compare function for sets
        *
        * @param {Set} x The set to compare the current set to
        * @return {number}
        */
        Set.prototype.compare = function (x) {
            var a, i, ii;

            if (this.card !== x.card) {
                return MathLib.sign(this.card - x.card);
            } else {
                for (i = 0, ii = this.card; i < ii; i++) {
                    a = MathLib.compare(this[i], x[i]);
                    if (a !== 0) {
                        return a;
                    }
                }
                return 0;
            }
        };

        /**
        * Evaluates the elements of the set
        *
        * @return {Set}
        */
        Set.prototype.evaluate = function () {
            return this.map(MathLib.evaluate);
        };

        /**
        * Works like the Array.prototype.every function
        *
        * @return {boolean}
        */
        Set.prototype.every = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.every.apply(this, args);
        };

        /**
        * Works like the Array.prototype.filter function
        *
        * @return {Set}
        */
        Set.prototype.filter = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return new MathLib.Set(Array.prototype.filter.apply(this, args));
        };

        /**
        * Works like the Array.prototype.forEach function
        */
        Set.prototype.forEach = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            Array.prototype.forEach.apply(this, args);
        };

        /**
        * Works like the Array.prototype.indexOf function
        *
        * @return {number}
        */
        Set.prototype.indexOf = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.indexOf.apply(this, args);
        };

        /**
        * Inserts an element into the set.
        *
        * @param {any} x The element to insert in the set.
        * @return {Set} Returns the current set
        */
        Set.prototype.insert = function (x) {
            var i = this.locate(x);
            if (this[i] !== x) {
                this.splice(i, 0, x);
                this.card++;
            }
            return this;
        };

        /**
        * Determines if the set is empty.
        *
        * @return {boolean}
        */
        Set.prototype.isEmpty = function () {
            return this.card === 0;
        };

        /**
        * Determines if the set is equal to an other set.
        *
        * @param {Set} set The set to compare
        * @return {boolean}
        */
        Set.prototype.isEqual = function (set) {
            if (this.card !== set.card) {
                return false;
            } else {
                return this.every(function (y, i) {
                    return MathLib.isEqual(y, set[i]);
                });
            }
        };

        /**
        * Determines if the set is a subset of an other set.
        *
        * @param {Set} set The potential superset
        * @return {boolean}
        */
        Set.prototype.isSubsetOf = function (set) {
            return this.every(function (x) {
                return set.indexOf(x) !== -1;
            });
        };

        /**
        * Array.prototype.indexOf() returns only the position of an element in the
        * array and not the position where one should be inserted.
        *
        * @param {Set} x The element to locate
        * @return {number}
        */
        Set.prototype.locate = function (x) {
            var left = 0, right = this.card - 1, middle, i = this.indexOf(x);

            if (i !== -1) {
                return i;
            }

            while (left <= right) {
                middle = left + Math.floor((right - left) / 2);
                if (this[middle] < x) {
                    left = middle + 1;
                } else if (this[middle] > x) {
                    right = middle - 1;
                } else {
                    return middle;
                }
            }
            return left;
        };

        /**
        * Works like the Array.prototype.map function
        *
        * @param {function} callback - The mapping function
        * @param {object} [thisArg] - The value to use as this when executing the callback.
        * @return {Set}
        */
        Set.prototype.map = function (callback, thisArg) {
            return new MathLib.Set(Array.prototype.map.call(this, callback, thisArg));
        };

        /**
        * Adds the argument to all elements in the set.
        *
        * @param {number|MathLib object} n The object to add to the elements in the set.
        * @return {Set|any}
        */
        Set.prototype.plus = function (n) {
            var sum = [];

            if (n.type === 'set') {
                this.forEach(function (x) {
                    n.forEach(function (y) {
                        sum.push(MathLib.plus(x, y));
                    });
                });

                return new MathLib.Set(sum);
            } else {
                return this.map(function (x) {
                    return MathLib.plus(x, n);
                });
            }
        };

        /**
        * Returns the powerset
        *
        * @return {Set}
        */
        Set.prototype.powerset = function () {
            var flag, subset, i, ii, j, jj, powerset = [];

            for (i = 0, ii = Math.pow(2, this.card); i < ii; i++) {
                flag = i.toString(2).split('').reverse();
                subset = [];
                for (j = 0, jj = this.card; j < jj; j++) {
                    if (flag[j] === '1') {
                        subset.push(this[j]);
                    }
                }
                powerset.push(new MathLib.Set(subset));
            }

            return new MathLib.Set(powerset);
        };

        /**
        * Works like the Array.prototype.reduce function
        *
        * @return {any}
        */
        Set.prototype.reduce = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.reduce.apply(this, arguments);
        };

        /**
        * Removes a element from a set
        *
        * @param {any} element The element to remove from the set.
        * @return {Set}
        */
        Set.prototype.remove = function (element) {
            var i = this.indexOf(element);
            if (i !== -1) {
                this.splice(i, 1);
                this.card--;
            }
            return this;
        };

        /**
        * Works like the Array.prototype.slice function
        *
        * @return {array}
        */
        Set.prototype.slice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.slice.apply(this, args);
        };

        /**
        * Works like the Array.prototype.some function
        *
        * @return {boolean}
        */
        Set.prototype.some = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.some.apply(this, args);
        };

        /**
        * Works like the Array.prototype.splice function
        *
        * @return {Set}
        */
        Set.prototype.splice = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return Array.prototype.splice.apply(this, args);
        };

        /**
        * Multiplies all elements by an argument.
        *
        * @param {number|MathLib object} n The object to multiply the elements with
        * @return {Set}
        */
        Set.prototype.times = function (n) {
            return this.map(function (x) {
                return MathLib.times(x, n);
            });
        };

        /**
        * Converts the set to an array
        *
        * @return {array}
        */
        Set.prototype.toArray = function () {
            return Array.prototype.slice.call(this);
        };

        /**
        * Returns the content MathML representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Set.prototype.toContentMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (options.strict) {
                if (this.isEmpty()) {
                    return '<csymbol cd="set1">emptyset</csymbol>';
                } else {
                    return this.reduce(function (old, cur) {
                        return old + MathLib.toContentMathML(cur, options);
                    }, '<apply><csymbol cd="set1">set</csymbol>') + '</apply>';
                }
            } else {
                if (this.isEmpty()) {
                    return '<emptyset/>';
                } else {
                    return this.reduce(function (old, cur) {
                        return old + MathLib.toContentMathML(cur, options);
                    }, '<set>') + '</set>';
                }
            }
        };

        /**
        * Returns the LaTeX representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Set.prototype.toLaTeX = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (this.isEmpty()) {
                return '\\emptyset';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toLaTeX(cur, options) + ', ';
                }, '\\left{').slice(0, -2) + '\\right}';
            }
        };

        /**
        * Returns the (presentation) MathML representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Set.prototype.toMathML = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (this.isEmpty()) {
                return '<mi>&#x2205;</mi>';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toMathML(cur, options) + '<mo>,</mo>';
                }, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
            }
        };

        /**
        * Returns a string representation of the set
        *
        * @param {object} [options] - Optional options to style the output
        * @return {string}
        */
        Set.prototype.toString = function (options) {
            if (typeof options === "undefined") { options = {}; }
            if (this.isEmpty()) {
                return '∅';
            } else {
                return this.reduce(function (old, cur) {
                    return old + MathLib.toString(cur, options) + ', ';
                }, '{').slice(0, -2) + '}';
            }
        };

        /**
        * Adds up all the elements in the set.
        *
        * @param {number|MathLib object} n The object to add to the elements in the set.
        * @return {Set|any}
        */
        Set.prototype.total = function () {
            return MathLib.plus.apply(null, this.toArray());
        };
        Set.createSetOperation = function (left, both, right) {
            return function (a) {
                var set = [], i = 0, j = 0, tl = this.card, al = a.card;

                while (i < tl && j < al) {
                    if (MathLib.compare(this[i], a[j]) < 0) {
                        if (left) {
                            set.push(this[i]);
                        }
                        i++;
                        continue;
                    }
                    if (MathLib.compare(this[i], a[j]) > 0) {
                        if (right) {
                            set.push(a[j]);
                        }
                        j++;
                        continue;
                    }
                    if (MathLib.isEqual(this[i], a[j])) {
                        if (both) {
                            set.push(this[i]);
                        }
                        i++;
                        j++;
                        continue;
                    }
                }
                if (left && j === al) {
                    set = set.concat(this.slice(i));
                } else if (right && i === tl) {
                    set = set.concat(a.slice(j));
                }
                return new MathLib.Set(set);
            };
        };

        Set.fromTo = function (start, end, step) {
            if (typeof step === "undefined") { step = 1; }
            var i, set = [];

            if (start <= end) {
                for (i = start; i <= end; i += step) {
                    set.push(i);
                }
                return new MathLib.Set(set);
            }
        };
        return Set;
    })();
    MathLib.Set = Set;
})(MathLib);
