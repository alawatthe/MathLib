
    'use strict';

    /* jshint -W079 */
    /*es6
    import {coerce, epsilon, goldenRatio, isNative, type} from 'meta';
    import {Expression} from 'Expression';
    es6*/
    define(['meta', 'Expression'], function(MathLib) {
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
});
