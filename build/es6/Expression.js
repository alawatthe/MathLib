
import MathLib from './meta.js';
// There is no DOMParser in Node, so we have to require one (done via a regexp replace)

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
    * Compares two expressions
    *
    * @param {Expression} expr The expression to compare
    * @return {number}
    */
    Expression.prototype.compare = function (expr) {
        return MathLib.sign(this.toString().localeCompare(expr.toString()));
    };

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
    * Evaluates the symbolic expression
    *
    * @return {any}
    */
    Expression.prototype.evaluate = function () {
        if (this.subtype === 'binaryOperator') {
            return MathLib[this.name].apply(null, this.content.map(function (x) {
                return x.evaluate();
            }));
        }
        if (this.subtype === 'brackets') {
            return this.content.evaluate();
        }
        if (this.subtype === 'complexNumber') {
            if (this.mode === 'cartesian') {
                return new MathLib.Complex(this.value[0].evaluate(), this.value[1].evaluate());
            } else if (this.mode === 'polar') {
                return MathLib.Complex.polar(this.value[0].evaluate(), this.value[1].evaluate());
            }
        }
        if (this.subtype === 'constant') {
            if (this.value === 'false') {
                return false;
            }
            if (this.value === 'pi') {
                return Math.PI;
            }
            if (this.value === 'true') {
                return true;
            }
        }
        if (this.subtype === 'functionCall') {
            if (this.isMethod) {
                var args = this.content.map(function (x) {
                    return x.evaluate();
                }), _this = args.shift();

                return _this[this.value].apply(_this, args);
            } else {
                return MathLib[this.value].apply(null, this.content.map(function (x) {
                    return x.evaluate();
                }));
            }
        }
        if (this.subtype === 'functionDefinition') {
            return MathLib.Functn(this.content[0].evaluate(), {
                name: 'f',
                expression: this.value
            });
        }
        if (this.subtype === 'matrix') {
            return new MathLib.Matrix(this.value.map(function (r) {
                return r.map(function (c) {
                    return c.evaluate();
                });
            }));
        }
        if (this.subtype === 'number') {
            return parseFloat(this.value);
        }
        if (this.subtype === 'naryOperator') {
            return MathLib[this.name].apply(null, this.content.map(function (x) {
                return x.evaluate();
            }));
        }
        if (this.subtype === 'rationalNumber') {
            return new MathLib.Rational(this.value[0].evaluate(), this.value[1].evaluate());
        }
        if (this.subtype === 'set') {
            return new MathLib.Set(this.value.map(function (x) {
                return x.evaluate();
            }));
        }
        if (this.subtype === 'string') {
            return this.value;
        }
        if (this.subtype === 'variable') {
            if (this.value in MathLib.Expression.variables) {
                return MathLib.Expression.variables[this.value];
            }
            return this;
        }
        if (this.subtype === 'vector') {
            return new MathLib.Vector(this.value.map(function (x) {
                return x.evaluate();
            }));
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
                properties[prop] = this[prop];
            }
        }

        mappedProperties = f(properties);
        if (Array.isArray(this.content)) {
            mappedProperties.content = this.content.map(function (expr) {
                return expr.map(f);
            });
        } else if (this.content) {
            mappedProperties.content = this.content.map(f);
        }

        return new MathLib.Expression(mappedProperties);
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
            // 		("whitespace internal to content of the element is collapsed canonically,
            // 		i.e., each sequence of 1 or more whitespace characters is replaced with one space character")
            // 2. Remove whitespace outside of token elements
            // 		("MathML ignores whitespace occurring outside token elements.")
            // 		and remove whitespace at the beginning and end of elements
            // 		("All whitespace at the beginning and end of the content is removed").
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
                var children = Array.prototype.slice.call(node.childNodes), functnName = children.shift().nodeName, isMethod = true, functnNames = {
                    ident: 'identity',
                    power: 'pow',
                    rem: 'mod',
                    setdifference: 'without'
                };

                // Change some function names for functions with different names in MathLib
                if (functnName in functnNames) {
                    functnName = functnNames[functnName];
                }

                if (MathLib[functnName]) {
                    isMethod = false;
                }

                return new MathLib.Expression({
                    subtype: 'functionCall',
                    value: functnName,
                    isMethod: isMethod,
                    content: parser(children)
                });
            },
            ci: function (node) {
                return new MathLib.Expression({
                    subtype: 'variable',
                    value: node.textContent
                });
            },
            cn: function (node) {
                var type = node.getAttribute('type');

                if (type === null || type === '') {
                    type = 'number';
                }

                if (type === 'number') {
                    // TODO: base conversions
                    // var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10';
                    return parser(node.childNodes[0]);
                } else if (type === 'rational') {
                    return new MathLib.Expression({
                        value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                        subtype: 'rationalNumber'
                    });
                } else if (type === 'complex-cartesian') {
                    return new MathLib.Expression({
                        value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                        subtype: 'complexNumber',
                        mode: 'cartesian'
                    });
                } else if (type === 'complex-polar') {
                    return new MathLib.Expression({
                        value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
                        subtype: 'complexNumber',
                        mode: 'polar'
                    });
                }
            },
            cs: function (node) {
                return new MathLib.Expression({
                    subtype: 'string',
                    value: node.textContent
                });
            },
            lambda: function (node) {
                var bvar = node.childNodes[0], doa = node.childNodes[1], apply = node.childNodes[2];

                return new MathLib.Expression({
                    subtype: 'functionDefinition',
                    domain: doa.childNodes[0].nodeName,
                    arguments: Array.prototype.map.call(bvar.childNodes, function (variable) {
                        return MathLib.Expression.variable(variable.textContent);
                    }),
                    content: [parser(apply)]
                });
            },
            math: function (node) {
                return parser(node.childNodes[0]);
            },
            matrix: function (node) {
                return new MathLib.Expression({
                    value: Array.prototype.slice.call(node.childNodes).map(handler.matrixrow),
                    subtype: 'matrix'
                });
            },
            matrixrow: function (node) {
                return Array.prototype.map.call(node.childNodes, parser);
            },
            set: function (node) {
                return new MathLib.Expression({
                    value: parser(Array.prototype.slice.call(node.childNodes)),
                    subtype: 'set'
                });
            },
            '#text': function (node) {
                if (node.parentNode.nodeName === 'cn') {
                    return MathLib.Expression.number(node.nodeValue.trim());
                }
                return node.nodeValue;
            },
            vector: function (node) {
                return new MathLib.Expression({
                    value: parser(Array.prototype.slice.call(node.childNodes)),
                    subtype: 'vector'
                });
            },
            false: function () {
                return MathLib.Expression.constant('false');
            },
            pi: function () {
                return MathLib.Expression.constant('pi');
            },
            true: function () {
                return MathLib.Expression.constant('true');
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
    * Convert the Expression to MathML.
    *
    * @return {string}
    */
    Expression.prototype.toContentMathML = function () {
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

        /*
        var transc1 = ['arccos', 'arccosh', 'arccot', 'arccoth', 'arccsc', 'arccsch', 'arcsec',
        'arcsech', 'arcsin', 'arcsinh', 'arctan', 'arctanh', 'cos', 'cosh', 'cot', 'coth',
        'csc', 'csch', 'exp', 'ln', 'log', 'sec', 'sech', 'sin', 'sinh', 'tan', 'tanh'];
        */
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

            return '<apply><csymbol cd="transc1">' + funcName + '</csymbol>' + this.content.map(function (expr) {
                return expr.toContentMathML();
            }).join('') + '</apply>';
        }

        if (this.subtype === 'functionDefinition') {
            return '<lambda><bvar><ci>' + this.arguments.join('</ci></bvar><bvar><ci>') + '</ci></bvar>' + this.content.map(function (expr) {
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
        var op;

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
        if (this.subtype === 'matrix') {
            return '\\begin{pmatrix}' + this.value.map(function (row) {
                return row.map(function (col) {
                    return col.toLaTeX();
                }).join('&');
            }).join('\\\\') + '\\end{pmatrix}';
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
        if (this.subtype === 'rationalNumber') {
            return '\\frac{' + this.value[0].toLaTeX() + '}{' + this.value[1].toLaTeX() + '}';
        }
        if (this.subtype === 'set') {
            return '\\left{' + this.value.map(function (x) {
                return x.toLaTeX();
            }).join(', ') + '\\right}';
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
        if (this.subtype === 'vector') {
            return '\\begin{pmatrix}' + this.value.map(function (x) {
                return x.toLaTeX();
            }).join('\\\\') + '\\end{pmatrix}';
        }

        if (this.subtype === 'functionCall') {
            // These operators are predefined by amsmath.
            // (There are more predefined ones, but these are the useful ones.)
            if ([
                'arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim',
                'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'].indexOf(this.value) + 1) {
                return '\\' + this.value + '\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                    return old + (idx ? ',' : '') + cur.toLaTeX();
                }, '') : 'x') + '\\right)';
            } else if (this.value === 'exp') {
                return 'e^{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
            } else if (this.value === 'sqrt') {
                return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
            } else {
                return '\\operatorname{' + this.value + '}\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
                    return old + (idx ? ',' : '') + cur.toLaTeX();
                }, '') : 'x') + '\\right)';
            }
        }

        if (this.subtype === 'functionDefinition') {
            return (this.arguments.length === 1 ? this.arguments[0] : '\\left(' + this.arguments.join(', ') + '\\right)') + ' \\longmapsto ' + (this.content.length === 1 ? this.content[0].toLaTeX() : '\\left(' + this.content.map(function (expr) {
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
        if (this.subtype === 'matrix') {
            return '<mrow><mo>(</mo><mtable><mtr><mtd>' + this.value.map(function (row) {
                return row.map(function (col) {
                    return col.toMathML();
                }).join('</mtd><mtd>');
            }).join('</mtd></mtr><mtr><mtd>') + '</mtd></mtr></mtable><mo>)</mo></mrow>';
        }
        if (this.subtype === 'number') {
            return '<mn>' + this.value + '</mn>';
        }
        if (this.subtype === 'rationalNumber') {
            return '<mfrac>' + this.value[0].toMathML() + this.value[1].toMathML() + '</mfrac>';
        }
        if (this.subtype === 'set') {
            return '<mrow><mo>{</mo>' + this.value.map(function (x) {
                return x.toMathML();
            }).join('<mo>,</mo>') + '<mo>}</mo></mrow>';
        }
        if (this.subtype === 'string') {
            return '<ms>' + this.value + '</ms>';
        }
        if (this.subtype === 'variable') {
            return '<mi>' + this.value + '</mi>';
        }
        if (this.subtype === 'vector') {
            return '<mrow><mo>(</mo><mtable><mtr><mtd>' + this.value.map(function (x) {
                return x.toMathML();
            }).join('</mtd></mtr><mtr><mtd>') + '</mtd></mtr></mtable><mo>)</mo></mrow>';
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
            }).join('') : '<mi>x</mi>') + '<mo>)</mo></mrow></mrow>';
        }

        if (this.subtype === 'functionDefinition') {
            return '<mrow>' + (this.arguments.length === 1 ? '<mi>' + this.arguments[0] + '</mi>' : '<mrow><mo>(</mo><mi>' + this.arguments.join('</mi><mo>,<mo><mi>') + '</mi><mo>)</mo></mrow>') + '<mo>&#x27FC;</mo>' + (this.content.length === 1 ? this.content[0].toMathML() : '<mrow><mo>(</mo>' + this.content.map(function (expr) {
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
        if (this.subtype === 'matrix') {
            var length = this.value.length;
            return this.value.map(function (row) {
                return row.map(function (col) {
                    return col.toString();
                }).join('\t');
            }).map(function (row, index) {
                if (index === 0) {
                    return '⎛' + row + '⎞';
                } else if (index === length - 1) {
                    return '⎝' + row + '⎠';
                } else {
                    return '⎜' + row + '⎟';
                }
            }).join('\n');
        }
        if (this.subtype === 'number' || this.subtype === 'variable') {
            return this.value;
        }
        if (this.subtype === 'naryOperator') {
            return this.content.reduce(function (old, cur) {
                return old + _this.value + cur;
            });
        }
        if (this.subtype === 'rationalNumber') {
            return this.value[0].toString() + '/' + this.value[1].toString();
        }
        if (this.subtype === 'set') {
            return '{' + this.value.map(function (x) {
                return x.toString();
            }).join(', ') + '}';
        }
        if (this.subtype === 'string') {
            return '"' + this.value + '"';
        }
        if (this.subtype === 'unaryOperator') {
            if (this.value === '-') {
                return '-' + this.content.toString();
            }
            return this.content.toString();
        }
        if (this.subtype === 'vector') {
            return '(' + this.value.map(function (x) {
                return x.toString();
            }).join(', ') + ')';
        }
        if (this.subtype === 'functionCall') {
            return this.value + '(' + (this.content.length ? this.content.map(function (expr) {
                return expr.toString();
            }).join(', ') : 'x') + ')';
        }
        if (this.subtype === 'functionDefinition') {
            return (this.arguments.length === 1 ? this.arguments[0] : '(' + this.arguments.join(', ') + ')') + ' ⟼ ' + (this.content.length === 1 ? this.content[0].toString() : '(' + this.content.map(function (expr) {
                return expr.toString();
            }).join(', ') + ')');
        }
    };

    /**
    * Constructs a variable expression.
    *
    * @param {String} n The variable to generate an expression from
    * @return {Expression}
    */
    Expression.variable = function (n) {
        return new MathLib.Expression({
            subtype: 'variable',
            value: n
        });
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

            function peekNextChar () {
                var idx = index;
                return ((idx < length) ? expression.charAt(idx) : '\x00');
            }

            function getNextChar () {
                var ch = '\x00', idx = index;
                if (idx < length) {
                    ch = expression.charAt(idx);
                    index += 1;
                }
                return ch;
            }

            function isWhiteSpace (ch) {
                return (ch === '\u0009') || (ch === ' ') || (ch === '\u00A0');
            }

            function isLetter (ch) {
                return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
            }

            function isDecimalDigit (ch) {
                return (ch >= '0') && (ch <= '9');
            }

            function createToken (type, value) {
                return {
                    type: type,
                    value: value,
                    start: marker,
                    end: index - 1
                };
            }

            function skipSpaces () {
                var ch;

                while (index < length) {
                    ch = peekNextChar();
                    if (!isWhiteSpace(ch)) {
                        break;
                    }
                    getNextChar();
                }
            }

            function scanOperator () {
                var ch = peekNextChar();
                if ('+-*/()^%=;,'.indexOf(ch) >= 0) {
                    return createToken(T.Operator, getNextChar());
                }
                return undefined;
            }

            function isIdentifierStart (ch) {
                return (ch === '_') || isLetter(ch);
            }

            function isIdentifierPart (ch) {
                return isIdentifierStart(ch) || isDecimalDigit(ch);
            }

            function scanIdentifier () {
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

            function scanNumber () {
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

            function reset (str) {
                expression = str;
                length = str.length;
                index = 0;
            }

            function next () {
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

            function peek () {
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

            function matchOp (token, op) {
                return (typeof token !== 'undefined') && token.type === T.Operator && token.value === op;
            }

            // ArgumentList := Expression |
            //                 Expression ',' ArgumentList
            function parseArgumentList () {
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
            function parseFunctionCall (name) {
                var token, args = [];

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

                return new MathLib.Expression({
                    subtype: 'functionCall',
                    value: name,
                    content: args
                });
            }

            // Primary ::= Identifier |
            //             Number |
            //             '(' Assignment ')' |
            //             FunctionCall
            function parsePrimary () {
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
                        return new MathLib.Expression({
                            subtype: 'Identifier',
                            value: token.value
                        });
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
            function parseUnary () {
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
            //                    Exponentiation '^' Unary |
            function parseExponentiation () {
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
            function parseMultiplicative () {
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
            function parseAdditive () {
                var token, left, right, r;

                left = parseMultiplicative();
                token = lexer.peek();
                if (matchOp(token, '+') || matchOp(token, '-')) {
                    token = lexer.next();
                    right = parseAdditive();

                    // Addition and subtractio is left associative:
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

            // Assignment ::= Identifier '=' Assignment |
            //                Additive
            function parseAssignment () {
                var expr;

                expr = parseAdditive();

                // TODO: support assignments
                // if (typeof expr !== 'undefined' && expr.Identifier) {
                // 	token = lexer.peek();
                // 	if (matchOp(token, '=')) {
                // 		lexer.next();
                // 		return new MathLib.Expression({
                // 				subtype: 'Assignment',
                // 				name: expr,
                // 				value: parseAssignment()
                // 			});
                // 	}
                // 	return expr;
                // }
                return expr;
            }

            // Expression ::= Assignment
            function parseExpression () {
                return parseAssignment();
            }

            function parse (expression) {
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

        return Parser().parse(str);
    };

    Expression.variables = {};
    return Expression;
})();
export default = Expression;

