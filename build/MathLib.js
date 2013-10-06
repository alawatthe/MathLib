var __extends = this.__extends || function (d, b) {
			for (var p in b) {
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
var MathLib;
(function (MathLib) {
	MathLib.version = '0.6.0';
	MathLib.apery = 1.2020569031595942;
	MathLib.e = Math.E;

	MathLib.epsilon = (Number).EPSILON || ((function () {
		var next, result;
		for (next = 1; 1 + next !== 1; next = next / 2) {
			result = next;
		}
		return result;
	})());
	MathLib.eulerMascheroni = 0.5772156649015329;
	MathLib.goldenRatio = 1.618033988749895;
	MathLib.pi = Math.PI;

	MathLib.isArrayLike = function (x) {
		return typeof x === 'object' && 'length' in x;
	};

	MathLib.isNative = function (fn) {
		return fn && /^[^{]+\{\s*\[native \w/.test(fn.toString()) ? fn : false;
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
	}, extendObject = function (dest, src) {
		for (var prop in src) {
			if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
				dest[prop] = extendObject(dest[prop], src[prop]);
			} else {
				dest[prop] = src[prop];
			}
		}
		return dest;
	}, to3js = function (x) {
		if (x.length === 2) {
			return new THREE.Vector2(x[0], x[1]);
		} else if (x.length === 3) {
			return new THREE.Vector3(x[0], x[1], x[2]);
		}
	}, colorConvert = function (n) {
		if (typeof n === 'number') {
			n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
			return '#' + ('00000' + n.toString(16)).slice(-6);
		}
		return n;
	};

	var errors = [], warnings = [];

	MathLib.on = function (type, callback) {
		if (type === 'error') {
			errors.push(callback);
		} else if (type === 'warning') {
			warnings.push(callback);
		}
	};

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

	MathLib.error = function (details) {
		errors.forEach(function (cb) {
			cb(details);
		});
	};

	MathLib.warning = function (details) {
		warnings.forEach(function (cb) {
			cb(details);
		});
	};

	var Expression = (function () {
		function Expression(expr) {
			if (typeof expr === 'undefined') { expr = {}; }
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
		Expression.prototype.compare = function (e) {
			return MathLib.sign(this.toString().localeCompare(e.toString()));
		};

		Expression.constant = function (n) {
			return new MathLib.Expression({
				subtype: 'constant',
				value: n
			});
		};

		Expression.prototype.evaluate = function () {
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
				return new MathLib.Functn(this.content[0].evaluate(), {
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

		Expression.number = function (n) {
			return new MathLib.Expression({
				subtype: 'number',
				value: n
			});
		};

		Expression.parseContentMathML = function (MathMLString) {
			var tokenizer = new DOMParser(), MathMLdoc;

			MathMLString = MathMLString.split('cs>').map(function (x, i) {
				if (i % 2 === 0) {
					return x.replace(/\s+/g, ' ').replace(/ </g, '<').replace(/> /g, '>');
				} else {
					return x;
				}
			}).join('cs>');

			MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');

			var handler = {
				apply: function (node) {
					var children = Array.prototype.slice.call(node.childNodes), functnName = children.shift().nodeName, isMethod = true, functnNames = {
						ident: 'identity',
						power: 'pow',
						rem: 'mod',
						setdifference: 'without'
					};

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
					var type = node.getAttribute('type') !== null ? node.getAttribute('type') : 'number';

					if (type === 'number') {
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
							return new MathLib.Expression.variable(variable.textContent);
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
						return new MathLib.Expression.number(node.nodeValue.trim());
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
					return new MathLib.Expression.constant('false');
				},
				pi: function () {
					return new MathLib.Expression.constant('pi');
				},
				true: function () {
					return new MathLib.Expression.constant('true');
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

		Expression.prototype.toContentMathML = function () {
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

		Expression.prototype.toLaTeX = function (opts) {
			if (typeof opts === 'undefined') { opts = {}; }
			var op;

			if (this.subtype === 'brackets') {
				return '\\left(' + this.content.toLaTeX(opts) + '\\right)';
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
					return old + (idx ? op : '') + cur.toLaTeX(opts);
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
					return '-' + this.content.toLaTeX(opts);
				}
				return this.content.toLaTeX(opts);
			}
			if (this.subtype === 'vector') {
				return '\\begin{pmatrix}' + this.value.map(function (x) {
					return x.toLaTeX();
				}).join('\\\\') + '\\end{pmatrix}';
			}

			if (this.subtype === 'functionCall') {
				if ([
					'arccos',
					'arcsin',
					'arctan',
					'arg',
					'cos',
					'cosh',
					'cot',
					'coth',
					'csc',
					'deg',
					'det',
					'dim',
					'gcd',
					'lg',
					'ln',
					'log',
					'max',
					'min',
					'sec',
					'sin',
					'sinh',
					'tan',
					'tanh'
				].indexOf(this.value) + 1) {
					return '\\' + this.value + '\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
						return old + (idx ? ',' : '') + cur.toLaTeX(opts);
					}, '') : 'x') + '\\right)';
				} else if (this.value === 'exp') {
					return 'e^{' + (this.content.length ? this.content[0].toLaTeX(opts) : 'x') + '}';
				} else if (this.value === 'sqrt') {
					return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX(opts) : 'x') + '}';
				} else {
					return '\\operatorname{' + this.value + '}\\left(' + (this.content.length ? this.content.reduce(function (old, cur, idx) {
						return old + (idx ? ',' : '') + cur.toLaTeX(opts);
					}, '') : 'x') + '\\right)';
				}
			}

			if (this.subtype === 'functionDefinition') {
				return (this.arguments.length === 1 ? this.arguments[0] : '\\left(' + this.arguments.join(', ') + '\\right)') + ' \\longmapsto ' + (this.content.length === 1 ? this.content[0].toLaTeX() : '\\left(' + this.content.map(function (expr) {
					return expr.toLaTeX();
				}).join(', ') + '\\right)');
			}
		};

		Expression.prototype.toMathML = function () {
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

		Expression.prototype.toString = function () {
			var _this = this;
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

				function peekNextChar() {
					var idx = index;
					return ((idx < length) ? expression.charAt(idx) : '\x00');
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

				function parseFunctionCall(name) {
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

				function parseExponentiation() {
					var token, left, right;

					left = parseUnary();
					token = lexer.peek();
					if (matchOp(token, '^')) {
						token = lexer.next();

						right = parseExponentiation();

						return new MathLib.Expression({
							subtype: 'naryOperator',
							value: '^',
							content: [left, right],
							name: 'pow'
						});
					}
					return left;
				}

				function parseMultiplicative() {
					var token, left, right, r;

					left = parseExponentiation();
					token = lexer.peek();
					if (matchOp(token, '*') || matchOp(token, '/')) {
						token = lexer.next();

						right = parseMultiplicative();

						if (right.subtype === 'naryOperator') {
							r = right;
							while (r.content[0].subtype === 'naryOperator') {
								r = r.content[0];
							}

							r.content[0] = new MathLib.Expression({
								subtype: 'naryOperator',
								content: [left, r.content[0]],
								value: token.value,
								name: token.value === '*' ? 'times' : 'divide'
							});
							return right;
						} else {
							return new MathLib.Expression({
								subtype: 'naryOperator',
								value: token.value,
								name: token.value === '*' ? 'times' : 'divide',
								content: [left, right]
							});
						}
					}
					return left;
				}

				function parseAdditive() {
					var token, left, right, r;

					left = parseMultiplicative();
					token = lexer.peek();
					if (matchOp(token, '+') || matchOp(token, '-')) {
						token = lexer.next();
						right = parseAdditive();

						if (right.value === '+' || right.value === '-') {
							r = right;
							while (r.content[0].subtype === 'naryOperator') {
								r = r.content[0];
							}

							r.content[0] = new MathLib.Expression({
								subtype: 'naryOperator',
								content: [left, r.content[0]],
								value: token.value,
								name: token.value === '+' ? 'plus' : 'minus'
							});
							return right;
						} else {
							return new MathLib.Expression({
								subtype: 'naryOperator',
								value: token.value,
								name: token.value === '+' ? 'plus' : 'minus',
								content: [left, right]
							});
						}
					}
					return left;
				}

				function parseAssignment() {
					var expr;

					expr = parseAdditive();

					return expr;
				}

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

			return Parser().parse(str);
		};

		Expression.variables = {};
		return Expression;
	})();
	MathLib.Expression = Expression;

	var functnPrototype = {};

	MathLib.Functn = function (f, options) {
		options = options || {};

		var functn = function (x) {
			if (typeof x === 'number' || typeof x === 'boolean') {
				return f.apply('', arguments);
			} else if (x.type === 'functn') {
				var bvar = options.expression.arguments[0].value, composition = options.expression.map(function (expr) {
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
						arguments: x.expression.arguments,
						content: composition.content
					})
				});
			} else if (x.type === 'expression' && x.subtype === 'variable') {
				return new MathLib.Functn(f, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: x,
						content: x
					})
				});
			} else if (typeof x === 'function') {
				return function (y) {
					return f(x(y));
				};
			} else if (x.type === 'complex') {
				return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
			} else if (x.type === 'rational') {
				return f(x.toNumber());
			} else if (x.type === 'set') {
				return x.map(f);
			} else if (MathLib.type(x) === 'array') {
				return x.map(f);
			} else {
				return x[options.name]();
			}
		};

		for (var name in functnPrototype) {
			if (functnPrototype.hasOwnProperty(name)) {
				functn[name] = functnPrototype[name];
			}
		}
		(functn).type = 'functn';
		(functn).constructor = MathLib.Functn;

		Object.defineProperties(functn, {
			id: { value: options.name },
			expression: { value: options.expression }
		});

		return functn;
	};

	var binaryFunctions = {
		arctan2: Math.atan2,
		binomial: function (n, k) {
			var binomial = 1, i, sign;

			if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
				return NaN;
			}

			if ((n >= 0 && k <= -1) || (n >= 0 && k > n) || (k < 0 && k > n)) {
				return 0;
			}

			if (n < 0) {
				if (k < 0) {
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
		divide: function (a, b) {
			return MathLib.times(a, MathLib.inverse(b));
		},
		log: function (base, x) {
			if (arguments.length === 1) {
				x = base;
				base = 10;
			}
			return Math.log(x) / Math.log(base);
		},
		minus: function (a, b) {
			return MathLib.plus(a, MathLib.negative(b));
		},
		mod: function (n, m) {
			var nm = n % m;
			return nm >= 0 ? nm : nm + m;
		},
		pow: function (x, y) {
			if (x === 1 || (x === -1 && (y === Infinity || y === -Infinity))) {
				return 1;
			}
			return Math.pow(x, y);
		},
		root: function (x, root) {
			if (arguments.length === 1) {
				return Math.sqrt(x);
			}
			return Math.pow(x, 1 / root);
		}
	};

	var createBinaryFunction = function (f, name) {
		return function (x) {
			if (typeof x === 'number') {
				return f.apply('', arguments);
			} else if (typeof x === 'function') {
				return function (y) {
					return f(x(y));
				};
			} else if (x.type === 'set') {
				return new MathLib.Set(x.map(f));
			} else if (x.type === 'complex') {
				return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
			} else if (Array.isArray(x)) {
				return x.map(f);
			} else {
				return x[name]();
			}
		};
	};

	var func, cur;
	for (func in binaryFunctions) {
		if (binaryFunctions.hasOwnProperty(func)) {
			cur = binaryFunctions[func];
			Object.defineProperty(MathLib, func, {
				value: createBinaryFunction(binaryFunctions[func], func)
			});
		}
	}

	functnPrototype.diff = function (x, h) {
		if (typeof h === 'undefined') { h = 1e-5; }
		return (this(x + h) - this(x - h)) / (2 * h);
	};

	functnPrototype.draw = function (screen, options) {
		if (typeof options === 'undefined') { options = {}; }
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

	var functionList1 = {
		divisors: function (x) {
			var divisors = x === 1 ? [] : [1], i, ii;
			for (i = 2, ii = x / 2; i <= ii; i++) {
				if (x % i === 0) {
					divisors.push(i);
				}
			}
			divisors.push(x);
			return MathLib.set(divisors);
		},
		factor: function (n) {
			var factors = [], i;
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
			if (x === 0) {
				return x;
			}
			return Math.round(x);
		},
		trunc: function (x, n) {
			return x.toFixed(n || 0);
		},
		toContentMathML: function (x) {
			if (typeof x === 'number') {
				return '<cn>' + x + '</cn>';
			} else {
				return x.toContentMathML();
			}
		},
		toLaTeX: function (x, plus) {
			if (plus) {
				return (x < 0 ? '-' : '+') + Math.abs(x);
			} else {
				return (x < 0 ? '-' : '') + Math.abs(x);
			}
		},
		toMathML: function (x, plus) {
			if (plus) {
				return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
			} else {
				return (x < 0 ? '<mo>-</mo>' : '') + '<mn>' + Math.abs(x) + '</mn>';
			}
		},
		toString: function (x, plus) {
			if (plus) {
				return (x < 0 ? '-' : '+') + Math.abs(x);
			} else {
				return (x < 0 ? '-' : '') + Math.abs(x);
			}
		}
	};

	var createFunction1 = function (f, name) {
		return function (x) {
			if (typeof x === 'number') {
				return f.apply('', arguments);
			} else if (typeof x === 'function') {
				return function (y) {
					return f(x(y));
				};
			} else if (x.type === 'set') {
				return new MathLib.Set(x.map(f));
			} else if (x.type === 'complex') {
				return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
			} else if (Array.isArray(x)) {
				return x.map(f);
			} else {
				return x[name]();
			}
		};
	};

	for (func in functionList1) {
		if (functionList1.hasOwnProperty(func)) {
			cur = functionList1[func];
			Object.defineProperty(MathLib, func, {
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
		};

		if (MathLib.type(obj) === type) {
			return true;
		} else if ([
			'circle',
			'complex',
			'expression',
			'functn',
			'line',
			'matrix',
			'permutation',
			'point',
			'polynomial',
			'rational',
			'screen',
			'screen2d',
			'screen3d',
			'set',
			'vector'
		].indexOf(type) !== -1) {
			return obj instanceof MathLib[ucfirst(type)];
		} else {
			return obj instanceof window[ucfirst(type)];
		}
	};

	MathLib.isMathMLSupported = function () {
		var hasMathML = false, ns, div, mfrac;
		if (document.createElementNS) {
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

	MathLib.writeMathML = function (id, math) {
		var formula;
		document.getElementById(id).innerHTML = '<math>' + math + '</math>';
		if (typeof MathJax !== 'undefined') {
			formula = MathJax.Hub.getAllJax(id)[0];
			MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
		}
	};

	MathLib.loadMathJax = function (config) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

		config = config || 'MathJax.Hub.Config({' + 'config: ["MMLorHTML.js"],' + 'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' + 'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' + 'TeX: {' + 'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' + '}' + '});';

		if ((window).opera) {
			script.innerHTML = config;
		} else {
			script.text = config;
		}

		document.getElementsByTagName('head')[0].appendChild(script);
	};

	var nAryFunctions = {
		and: function (n) {
			return n.every(function (x) {
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
			return n.length / MathLib.plus(n.map(MathLib.inverse));
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

			if (a === Infinity || b === Infinity) {
				return Infinity;
			}

			if (a === 0 && b === 0) {
				return 0;
			}

			max = Math.max(a, b);
			min = Math.min(a, b);

			return max * Math.sqrt(1 + Math.pow(min / max, 2));
		},
		hypot2: function (n) {
			if (n.some(function (x) {
				return x === Infinity || x === -Infinity;
			})) {
				return Infinity;
			}
			return n.reduce(function (old, cur) {
				return old + cur * cur;
			}, 0);
		},
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
		or: function (n) {
			return n.some(function (x) {
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
					return new MathLib.Functn(function (x) {
						return MathLib.plus(f1(x), f2(x));
					}, {
						expression: new MathLib.Expression({
							subtype: 'functionDefinition',
							arguments: ['x'],
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
					return new MathLib.Functn(function (x) {
						return MathLib.times(f1(x), f2(x));
					}, {
						expression: new MathLib.Expression({
							subtype: 'functionDefinition',
							arguments: ['x'],
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
		xor: function (n) {
			return n.reduce(function (x, y) {
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
		if (nAryFunctions.hasOwnProperty(func)) {
			Object.defineProperty(MathLib, func, {
				value: createNaryFunction(nAryFunctions[func])
			});
		}
	}

	functnPrototype.quad = function (a, b, options) {
		if (typeof options === 'undefined') { options = {}; }
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

	var quadstep = function (f, a, b, fa, fc, fb, options) {
		var h = b - a, c = (a + b) / 2, fd = f((a + c) / 2), fe = f((c + b) / 2), Q1 = (h / 6) * (fa + 4 * fc + fb), Q2 = (h / 12) * (fa + 4 * fd + 2 * fc + 4 * fe + fb), Q = Q2 + (Q2 - Q1) / 15;

		options.calls = options.calls + 2;

		if (!MathLib.isFinite(Q)) {
			options.warn = Math.max(options.warn, 3);
			return Q;
		}

		if (options.calls > options.maxCalls) {
			options.warn = Math.max(options.warn, 2);
			return Q;
		}

		if (Math.abs(Q2 - Q) <= options.tolerance) {
			return Q;
		}

		if (Math.abs(h) < options.minStep || c === a || c === b) {
			options.warn = Math.max(options.warn, 1);
			return Q;
		}

		return quadstep(f, a, c, fa, fd, fc, options) + quadstep(f, c, b, fc, fe, fb, options);
	};

	functnPrototype.toContentMathML = function () {
		return this.expression.toContentMathML();
	};

	functnPrototype.toLaTeX = function () {
		return this.expression.toLaTeX();
	};

	functnPrototype.toMathML = function () {
		return this.expression.toMathML();
	};

	functnPrototype.toString = function () {
		return this.expression.toString();
	};

	var unaryFunctions = {
		abs: Math.abs,
		arccos: Math.acos,
		arccot: function (x) {
			return 1.5707963267948966 - Math.atan(x);
		},
		arccsc: function (x) {
			return Math.asin(1 / x);
		},
		arcosh: MathLib.isNative((Math).acosh) || function (x) {
			return Math.log(x + Math.sqrt(x * x - 1));
		},
		arcoth: function (x) {
			if (!MathLib.isFinite(x)) {
				return 1 / x;
			}
			return 0.5 * Math.log((x + 1) / (x - 1));
		},
		arcsch: function (x) {
			if (x === 0 || !MathLib.isFinite(x)) {
				return 1 / x;
			}
			return Math.log(1 / x + Math.sqrt(1 / (x * x) + 1));
		},
		arcsec: function (x) {
			return Math.acos(1 / x);
		},
		arcsin: Math.asin,
		arctan: Math.atan,
		arsech: function (x) {
			return Math.log((1 + Math.sqrt(1 - x * x)) / x);
		},
		arsinh: MathLib.isNative((Math).asinh) || function (x) {
			if (x === 0 || !MathLib.isFinite(x)) {
				return x;
			}
			return Math.log(x + Math.sqrt(x * x + 1));
		},
		artanh: MathLib.isNative((Math).atanh) || function (x) {
			if (x === 0) {
				return x;
			}
			return 0.5 * Math.log((1 + x) / (1 - x));
		},
		ceil: function (x) {
			if (x === 0) {
				return x;
			}
			return Math.ceil(x);
		},
		cbrt: function (x) {
			var a3, a3x, an, a;

			if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
				return x;
			}

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
		conjugate: function (x) {
			return x;
		},
		copy: function (x) {
			return x;
		},
		cos: Math.cos,
		cosh: MathLib.isNative((Math).cosh) || function (x) {
			return (Math.exp(x) + Math.exp(-x)) / 2;
		},
		cot: function (x) {
			if (x === 0) {
				return 1 / x;
			}

			return Math.tan(1.5707963267948966 - x);
		},
		coth: function (x) {
			if (x === 0) {
				return 1 / x;
			}

			if (!MathLib.isFinite(x)) {
				return MathLib.sign(x);
			}

			return (Math.exp(x) + Math.exp(-x)) / (Math.exp(x) - Math.exp(-x));
		},
		csc: function (x) {
			return 1 / Math.sin(x);
		},
		csch: function (x) {
			if (x === 0) {
				return 1 / x;
			}
			return 2 / (Math.exp(x) - Math.exp(-x));
		},
		degToRad: function (x) {
			return x * 0.017453292519943295;
		},
		digitsum: function (x) {
			var out = 0;
			while (x > 9) {
				out += x % 10;
				x = Math.floor(x / 10);
			}
			return out + x;
		},
		exp: Math.exp,
		factorial: function (x) {
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
		floor: Math.floor,
		identity: function (x) {
			return x;
		},
		inverse: function (x) {
			return 1 / x;
		},
		isFinite: function (x) {
			return Math.abs(x) < Infinity;
		},
		isInt: function (x) {
			return x % 1 === 0;
		},
		isNaN: function (x) {
			return x !== x;
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
		isPrime: function (x) {
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
		isReal: function (x) {
			return Math.abs(x) < Infinity;
		},
		isZero: function (x) {
			return Math.abs(x) < MathLib.epsilon;
		},
		lg: function (x) {
			return Math.log(x) / Math.LN10;
		},
		ln: Math.log,
		logGamma: function (x) {
			var j, tmp, y, ser, cof = [
				57.1562356658629235,
				-59.5979603554754912,
				14.1360979747417471,
				-0.491913816097620199,
				0.339946499848118887e-4,
				0.465236289270485756e-4,
				-0.983744753048795646e-4,
				0.158088703224912494e-3,
				-0.210264441724104883e-3,
				0.217439618115212643e-3,
				-0.164318106536763890e-3,
				0.844182239838527433e-4,
				-0.261908384015814087e-4,
				0.368991826595316234e-5
			];

			y = x;
			tmp = x + 5.24218750000000000;
			tmp = (x + 0.5) * Math.log(tmp) - tmp;
			ser = 0.999999999999997092;
			for (j = 0; j < 14; j++) {
				ser += cof[j] / ++y;
			}
			return tmp + Math.log(2.5066282746310005 * ser / x);
		},
		negative: function (x) {
			return -x;
		},
		not: function (x) {
			return !x;
		},
		radToDeg: function (x) {
			return x * 57.29577951308232;
		},
		sec: function (x) {
			return 1 / Math.cos(x);
		},
		sech: function (x) {
			return 2 / (Math.exp(x) + Math.exp(-x));
		},
		sign: function (x) {
			return x && (x < 0 ? -1 : 1);
		},
		sin: Math.sin,
		sinh: MathLib.isNative((Math).sinh) || function (x) {
			if (x === 0) {
				return x;
			}
			return (Math.exp(x) - Math.exp(-x)) / 2;
		},
		sqrt: Math.sqrt,
		tan: Math.tan,
		tanh: MathLib.isNative((Math).tanh) || function (x) {
			var p;

			if (x === 0 || !MathLib.isFinite(x)) {
				return MathLib.sign(x);
			}

			p = Math.exp(x);
			return (p * p - 1) / (p * p + 1);
		}
	};

	for (var elemfn in unaryFunctions) {
		if (unaryFunctions.hasOwnProperty(elemfn)) {
			Object.defineProperty(MathLib, elemfn, {
				value: new MathLib.Functn(unaryFunctions[elemfn], {
					name: elemfn,
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: [
							new MathLib.Expression({
								subtype: 'variable',
								value: 'x'
							})
						],
						content: [
							new MathLib.Expression({
								subtype: 'functionCall',
								content: [
									new MathLib.Expression({
										subtype: 'variable',
										value: 'x'
									})
								],
								value: elemfn
							})
						]
					})
				}),
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
	}

	var Screen = (function () {
		function Screen(id, options) {
			if (typeof options === 'undefined') { options = {}; }
			var _this = this;
			this.type = 'screen';
			var _this = this, defaults = {
				height: 500,
				width: 500,
				contextMenu: {
					screenshot: true,
					fullscreen: true,
					grid: true
				},
				figcaption: ''
			}, opts = extendObject(defaults, options), container = document.getElementById(id), innerHTMLContextMenu = '', uuid = +Date.now(), fullscreenchange, innerHTML;

			if ((opts).contextMenu) {
				if ((opts).contextMenu.screenshot && !('opera' in window)) {
					innerHTMLContextMenu += '<div class="MathLib_screenshot MathLib_menuItem">Save Screenshot</div>';
				}
				if ((opts).contextMenu.fullscreen && 'requestFullScreen' in document.body) {
					innerHTMLContextMenu += '<div class="MathLib_fullscreen MathLib_menuItem"><span class="needs-nofullscreen">Enter Fullscreen</span><span class="needs-fullscreen">Exit Fullscreen</span></div>';
				}

				if ((opts).contextMenu.grid) {
					innerHTMLContextMenu += '<div class="MathLib_menuItem MathLib_hasSubmenu">Grid';
					innerHTMLContextMenu += '<menu class="MathLib_menu MathLib_submenu">';

					innerHTMLContextMenu += [
						'<div class="MathLib_needs2D">',
						'<label class="MathLib_menuItem">',
						'<input type="radio" name="MathLib_grid_type_' + uuid + '" class="MathLib_radio MathLib_grid_type" value="cartesian">cartesian',
						'</label>',
						'<label class="MathLib_menuItem">',
						'<input type="radio" name="MathLib_grid_type_' + uuid + '" class="MathLib_radio MathLib_grid_type" value="polar">polar',
						'</label>',
						'<label class="MathLib_menuItem">',
						'<input type="radio" name="MathLib_grid_type_' + uuid + '" class="MathLib_radio MathLib_grid_type" value="none">none',
						'</label>',
						'</div>'
					].join('');
					innerHTMLContextMenu += '<div class="MathLib_needs3D MathLib_menuItem MathLib_is_disabled" style="font-size: 0.7em">Gridoptions for 3D are coming soon.</div>';

					innerHTMLContextMenu += '</menu></div>';
				}

				innerHTMLContextMenu += '<hr class="MathLib_separator"><div class="MathLib_is_disabled MathLib_menuItem MathLib_is_centered" style="font-size:0.83em">Plot generated by MathLib.js</div>';
			}

			innerHTML = [
				'<figure class="MathLib_figure">',
				'<div class="MathLib_wrapper" style="width: ' + opts.width + 'px; height: ' + opts.height + 'px">',
				'<div class="MathLib_info_message">Your browser does not seem to support WebGL.<br>',
				'Please update your browser to see the plot.</div>',
				'</div>',
				(opts).figcaption ? '<figcaption class="MathLib_figcaption">' + (opts).figcaption + '</figcaption>' : '',
				'</figure>',
				'<div class="MathLib_contextMenuOverlay">',
				'<menu class="MathLib_menu MathLib_mainmenu">',
				innerHTMLContextMenu,
				'</menu>',
				'</div>'
			].join('');

			container.innerHTML = innerHTML;
			container.classList.add('MathLib_container');

			this.height = opts.height;
			this.width = opts.width;
			this.options = opts;
			this.container = container;
			this.figure = container.getElementsByClassName('MathLib_figure')[0];
			this.wrapper = container.getElementsByClassName('MathLib_wrapper')[0];
			this.contextMenu = container.getElementsByClassName('MathLib_mainmenu')[0];
			this.contextMenuOverlay = container.getElementsByClassName('MathLib_contextMenuOverlay')[0];
			this.innerHTMLContextMenu = innerHTMLContextMenu;

			if ((options).contextMenu) {
				this.wrapper.oncontextmenu = function (evt) {
					return _this.oncontextmenu(evt);
				};

				if ((opts).contextMenu.screenshot && !('opera' in window)) {
					this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
						var dataURI, a = document.createElement('a');

						if (_this.options.renderer === 'Canvas' && _this.type === 'screen2D') {
							var canvas = document.createElement('canvas'), ctx = (canvas).getContext('2d');

							(canvas).height = _this.height;
							(canvas).width = _this.width;

							ctx.drawImage((_this).layer.back.element, 0, 0);
							ctx.drawImage((_this).layer.grid.element, 0, 0);
							ctx.drawImage((_this).layer.axis.element, 0, 0);
							ctx.drawImage((_this).layer.main.element, 0, 0);

							dataURI = (canvas).toDataURL('image/png');
							if ('download' in a) {
								(a).href = dataURI;
								(a).download = 'plot.png';
								(a).click();
							} else {
								window.location.href = dataURI.replace('image/png', 'image/octet-stream');
							}
						}

						if (_this.options.renderer === 'WebGL' && _this.type === 'screen3D') {
							dataURI = _this.element.toDataURL('image/png');
							if ('download' in a) {
								(a).href = dataURI;
								(a).download = 'plot.png';
								(a).click();
							} else {
								window.location.href = dataURI.replace('image/png', 'image/octet-stream');
							}
						} else if (_this.options.renderer === 'SVG') {
							dataURI = 'data:image/svg+xml,' + _this.element.parentElement.innerHTML;

							if ('download' in a) {
								(a).href = dataURI;
								(a).download = 'plot.svg';
								(a).click();
							} else {
								window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
							}
						}
					};
				}

				if ((opts).contextMenu.fullscreen && 'requestFullScreen' in document.body) {
					this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
						if ((document).fullscreenElement) {
							(document).exitFullScreen();
						} else {
							_this.container.requestFullScreen();
						}
					};
				}

				if ((opts).contextMenu.grid) {
					this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
						(_this).options.grid.type = 'cartesian';
						(_this).draw();
					};
					this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
						(_this).options.grid.type = 'polar';
						(_this).draw();
					};
					this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
						(_this).options.grid.type = false;
						(_this).draw();
					};
				}
			}

			fullscreenchange = function () {
				if ((document).fullscreenElement) {
					_this.origWidth = _this.width;
					_this.origHeight = _this.height;
					(_this).resize(window.outerWidth, window.outerHeight);
				} else {
					(_this).resize(_this.origWidth, _this.origHeight);
					delete _this.origWidth;
					delete _this.origHeight;
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

	var Layer = (function () {
		function Layer(screen, id, zIndex) {
			var _this = this;
			this.screen = screen;
			this.id = id;
			this.zIndex = zIndex;

			this.stack = [];
			this.transformation = screen.transformation;

			var element;

			if (screen.options.renderer === 'Canvas') {
				element = document.createElement('canvas');
				element.classList.add('MathLib_screen');
				element.width = screen.width;
				element.height = screen.height;
				screen.wrapper.appendChild(element);
				this.element = element;

				this.ctx = element.getContext('2d');
				this.applyTransformation = function () {
					var m = _this.transformation;
					_this.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
				};
				this.applyTransformation();

				if (id === 'back') {
					this.draw = function () {
						var top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x;

						this.ctx.fillStyle = colorConvert(screen.options.background);
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
					this.ctx.strokeStyle = colorConvert(screen.options.grid.color) || '#cccccc';
					this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

					this.draw = function () {
						_this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
						_this.screen.drawGrid();
					};
				} else if (id === 'axis') {
					this.ctx.strokeStyle = colorConvert(screen.options.axis.color) || '#000000';

					this.draw = function () {
						_this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
						_this.screen.drawAxis();
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
				ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
				screen.element.appendChild(ctx);
				this.ctx = ctx;

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
					ctx.setAttribute('stroke', colorConvert(screen.options.grid.color) || '#cccccc');

					this.draw = function () {
						ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
						_this.screen.drawGrid();
					};
				} else if (id === 'axis') {
					ctx.setAttribute('stroke', colorConvert(screen.options.axis.color) || '#000000');

					this.draw = function () {
						ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
						_this.screen.drawAxis();
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

			screen.layer.splice(zIndex, 0, this);
		}
		Layer.prototype.clear = function () {
			this.screen.renderer.clear(this);
			return this;
		};
		return Layer;
	})();
	MathLib.Layer = Layer;

	MathLib.Canvas = {
		applyTransformation: function () {
			var m = this.transformation;
			this.layer.forEach(function (l) {
				l.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
			});
		},
		circle: function (circle, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, ctx = this.ctx, prop, opts;

			ctx.save();
			ctx.lineWidth = ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

			if (options) {
				opts = MathLib.Canvas.convertOptions(options);
				for (prop in opts) {
					if (opts.hasOwnProperty(prop)) {
						ctx[prop] = opts[prop];
					}
				}

				if ('setLineDash' in ctx) {
					ctx.setLineDash(('dash' in options ? (options).dash : []));
				}
				if ('lineDashOffset' in ctx) {
					ctx.lineDashOffset = ('dashOffset' in options ? (options).dashOffset : 0);
				}
			}

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
		clear: function (layer) {
			var screen = layer.screen, left = -screen.translation.x / screen.scale.x, top = -screen.translation.y / screen.scale.y, width = screen.width / screen.scale.x, height = screen.height / screen.scale.y;

			layer.ctx.clearRect(left, top, width, height);
		},
		convertOptions: function (opt) {
			var convertedOptions = {};
			if ('fillColor' in opt) {
				convertedOptions.fillStyle = colorConvert(opt.fillColor);
			} else if ('color' in opt) {
				convertedOptions.fillStyle = colorConvert(opt.color);
			}

			if ('font' in opt) {
				convertedOptions['font-family'] = opt.font;
			}

			if ('fontSize' in opt) {
				convertedOptions['font-size'] = opt.fontSize;
			}

			if ('lineColor' in opt) {
				convertedOptions.strokeStyle = colorConvert(opt.lineColor);
			} else if ('color' in opt) {
				convertedOptions.strokeStyle = colorConvert(opt.color);
			}

			return convertedOptions;
		},
		line: function (line, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, points = this.screen.getLineEndPoints(line), ctx = this.ctx, prop, opts;

			ctx.save();
			ctx.lineWidth = ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

			if (options) {
				opts = MathLib.Canvas.convertOptions(options);
				for (prop in opts) {
					if (opts.hasOwnProperty(prop)) {
						ctx[prop] = opts[prop];
					}
				}

				if ('setLineDash' in ctx) {
					ctx.setLineDash(('dash' in options ? (options).dash : []));
				}
				if ('lineDashOffset' in ctx) {
					ctx.lineDashOffset = ('dashOffset' in options ? (options).dashOffset : 0);
				}
			}

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
		path: function (curve, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, ctx = this.ctx, prop, opts, path, x, y, i, step = 2 / (screen.scale.x - screen.scale.y), from, to;

			from = ('from' in options ? (options).from : (-screen.translation.x) / screen.scale.x) - step;
			to = ('to' in options ? (options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;

			ctx.save();
			ctx.lineWidth = ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

			if (options) {
				opts = MathLib.Canvas.convertOptions(options);
				for (prop in opts) {
					if (opts.hasOwnProperty(prop)) {
						ctx[prop] = opts[prop];
					}
				}

				if ('setLineDash' in ctx) {
					ctx.setLineDash(('dash' in options ? (options).dash : []));
				}
				if ('lineDashOffset' in ctx) {
					ctx.lineDashOffset = ('dashOffset' in options ? (options).dashOffset : 0);
				}
			}

			if (typeof curve === 'function') {
				path = [];
				for (i = from; i <= to; i += step) {
					path.push([i, curve(i)]);
				}
			} else if (typeof curve[0] === 'function') {
				path = [];
				x = curve[0];
				y = curve[1];
				for (i = from; i <= to; i += step) {
					path.push([x(i), y(i)]);
				}
			} else {
				path = curve;
			}

			ctx.beginPath();
			ctx.moveTo(path[0][0], path[0][1]);
			path.forEach(function (x) {
				ctx.lineTo(x[0], x[1]);
			});
			ctx.stroke();
			ctx.closePath();
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
		pixel: function (f, t, r, b, l, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
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
		point: function (point, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, ctx = this.ctx, prop, opts, dist;

			ctx.save();
			ctx.lineWidth = ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

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
					ctx.setLineDash(('dash' in options ? (options).dash : []));
				}
				if ('lineDashOffset' in ctx) {
					ctx.lineDashOffset = ('dashOffset' in options ? (options).dashOffset : 0);
				}
			}

			ctx.beginPath();
			ctx.arc(point[0] / point[2], point[1] / point[2], ((options).size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.restore();

			if ((options).label) {
				dist = 1.75 * ((options).size || 10) + 0.75 * ((options).lineWidth || 4);
				screen.text((options).label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), {}, true);
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
		text: function (str, x, y, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var defaults = {
				font: 'Helvetica',
				fontSize: 10,
				fillColor: 'rgba(0, 0, 0, 1)',
				lineColor: 'rgba(0, 0, 0, 1)',
				lineWidth: 0.05
			}, ctx, prop, opts;

			ctx = this.ctx;

			opts = MathLib.Canvas.convertOptions(extendObject(defaults, options));

			for (prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					ctx[prop] = opts[prop];
				}
			}

			ctx.font = '10px Helvetica';
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

	MathLib.SVG = {
		applyTransformation: function () {
			var m = this.transformation;
			this.layer.forEach(function (l) {
				l.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
			});
		},
		circle: function (circle, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, prop, opts, svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

			svgCircle.setAttribute('cx', circle.center[0]);
			svgCircle.setAttribute('cy', circle.center[1]);
			svgCircle.setAttribute('r', circle.radius);

			if (options) {
				svgCircle.setAttribute('stroke-width', ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
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
		clear: function (layer) {
			layer.ctx.textContent = '';
		},
		convertOptions: function (opt) {
			var convertedOptions = {};
			if ('fillColor' in opt) {
				convertedOptions.fill = colorConvert(opt.fillColor);
			} else if ('color' in opt) {
				convertedOptions.fill = colorConvert(opt.color);
			}

			if ('font' in opt) {
				convertedOptions['font-family'] = opt.font;
			}

			if ('fontSize' in opt) {
				convertedOptions['font-size'] = opt.fontSize;
			}

			if ('size' in opt) {
				convertedOptions.size = opt.size;
			}

			if ('lineColor' in opt) {
				convertedOptions.stroke = colorConvert(opt.lineColor);
			} else if ('color' in opt) {
				convertedOptions.stroke = colorConvert(opt.color);
			}

			if ('dash' in opt && opt.dash.length !== 0) {
				convertedOptions['stroke-dasharray'] = opt.dash;
			}

			if ('dashOffset' in opt && opt.dashOffset !== 0) {
				convertedOptions['stroke-dashoffset'] = opt.dashOffset;
			}

			return convertedOptions;
		},
		line: function (line, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, points = this.screen.getLineEndPoints(line), prop, opts, svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

			svgLine.setAttribute('x1', points[0][0]);
			svgLine.setAttribute('y1', points[0][1]);
			svgLine.setAttribute('x2', points[1][0]);
			svgLine.setAttribute('y2', points[1][1]);

			if (options) {
				svgLine.setAttribute('stroke-width', ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
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
		path: function (curve, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'), step = 2 / (screen.scale.x - screen.scale.y), pathString, from, to, prop, opts, x, y, i, path;

			from = ('from' in options ? (options).from : -screen.translation.x / screen.scale.x) - step;
			to = ('to' in options ? (options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;

			if (typeof curve === 'function') {
				path = [];
				for (i = from; i <= to; i += step) {
					path.push([i, curve(i)]);
				}
			} else if (typeof curve[0] === 'function') {
				path = [];
				x = curve[0];
				y = curve[1];
				for (i = from; i <= to; i += step) {
					path.push([x(i), y(i)]);
				}
			} else {
				path = curve;
			}

			pathString = 'M' + path.reduce(function (prev, cur) {
				return prev + ' L' + cur.join(' ');
			});
			svgPath.setAttribute('d', pathString);

			svgPath.setAttribute('stroke-width', ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');

			if (options) {
				opts = MathLib.SVG.convertOptions(options);
				for (prop in opts) {
					if (opts.hasOwnProperty(prop)) {
						svgPath.setAttribute(prop, opts[prop]);
					}
				}
			}

			this.ctx.appendChild(svgPath);

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
		pixel: function (f, t, r, b, l, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
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
		point: function (point, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, prop, opts, dist, svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

			svgPoint.setAttribute('cx', point[0] / point[2] + '');
			svgPoint.setAttribute('cy', point[1] / point[2] + '');
			svgPoint.setAttribute('r', ((options).size || 10) / (screen.scale.x - screen.scale.y) + '');

			if (options) {
				svgPoint.setAttribute('stroke-width', ((options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
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

			if ((options).moveable) {
				svgPoint.setAttribute('cursor', 'move');

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

					document.body.addEventListener('mousemove', move);

					document.body.addEventListener('mouseup', up);
				});
			}

			this.ctx.appendChild(svgPoint);

			if ((options).label) {
				dist = 1.75 * ((options).size || 10) + 0.75 * ((options).lineWidth || 4);
				screen.text((options).label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), {}, true);
			}

			svgPoint.addEventListener('contextmenu', function () {
				screen.options.interaction.type = 'contextmenu';
				var x = (svgPoint).cx.baseVal.value, y = (svgPoint).cy.baseVal.value;

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
		text: function (str, x, y, options, redraw) {
			if (typeof options === 'undefined') { options = {}; }
			if (typeof redraw === 'undefined') { redraw = false; }
			var screen = this.screen, svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');

			svgText.textContent = str;
			svgText.setAttribute('x', x * screen.scale.x + '');
			svgText.setAttribute('y', y * screen.scale.y + '');
			svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
			svgText.setAttribute('font-family', 'Helvetica');
			svgText.setAttribute('fill', colorConvert((options).color) || '#000000');
			svgText.setAttribute('fill-opacity', '1');
			svgText.setAttribute('stroke', colorConvert((options).color) || '#000000');
			svgText.setAttribute('text-anchor', 'middle');

			svgText.setAttribute('alignment-baseline', 'middle');

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

	var Screen2D = (function (_super) {
		__extends(Screen2D, _super);
		function Screen2D(id, options) {
			if (typeof options === 'undefined') { options = {}; }
			var _this = this;
			_super.call(this, id, options);
			this.type = 'screen2D';
			var defaults = {
				axis: {
					color: 0x000000,
					textColor: 0x000000,
					tick: { x: 1, y: 1 }
				},
				grid: {
					angle: Math.PI / 8,
					color: 0xcccccc,
					type: 'cartesian',
					tick: { x: 1, y: 1, r: 1 }
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
			}, opts = extendObject(defaults, options), element, transformation = opts.transformation, _this = this;

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

			this.wrapper.innerHTML = '';

			this.container.classList.add('MathLib_screen2D');

			this.applyTransformation = function () {
			};

			this.translation = {};
			this.scale = {};
			this.transformation = transformation;

			Object.defineProperty(this.translation, 'x', {
				get: function () {
					return _this.transformation[0][2];
				},
				set: function (x) {
					_this.transformation[0][2] = x;
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.translation, 'y', {
				get: function () {
					return _this.transformation[1][2];
				},
				set: function (y) {
					_this.transformation[1][2] = y;
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.scale, 'x', {
				get: function () {
					return _this.transformation[0][0];
				},
				set: function (x) {
					_this.transformation[0][0] = x;
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.scale, 'y', {
				get: function () {
					return _this.transformation[1][1];
				},
				set: function (y) {
					_this.transformation[1][1] = y;
					_this.applyTransformation();
				}
			});

			this.lookAt = {};
			this.range = {};
			Object.defineProperty(this.lookAt, 'x', {
				get: function () {
					return (_this.width / 2 - _this.transformation[0][2]) / _this.transformation[0][0];
				},
				set: function (x) {
					_this.transformation[0][2] = _this.width / 2 - x * _this.transformation[0][0];
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.lookAt, 'y', {
				get: function () {
					return (_this.height / 2 - _this.transformation[1][2]) / _this.transformation[1][1];
				},
				set: function (y) {
					_this.transformation[1][2] = _this.height / 2 - y * _this.transformation[1][1];
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.range, 'x', {
				get: function () {
					return _this.width / (2 * _this.transformation[0][0]);
				},
				set: function (x) {
					_this.transformation[0][0] = 0.5 * _this.width / x;
					_this.applyTransformation();
				}
			});

			Object.defineProperty(this.range, 'y', {
				get: function () {
					return -_this.height / (2 * _this.transformation[1][1]);
				},
				set: function (y) {
					_this.transformation[1][1] = -0.5 * _this.height / y;
					_this.applyTransformation();
				}
			});

			this.range.x = opts.range.x;
			this.range.y = opts.range.y;
			this.lookAt.x = opts.lookAt.x;
			this.lookAt.y = opts.lookAt.y;

			if (opts.renderer === 'SVG') {
				element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

				element.className.baseVal = 'MathLib_screen';
				element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
				element.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
				element.setAttribute('height', this.height + 'px');
				element.setAttribute('width', this.width + 'px');
				element.setAttribute('version', '1.1');

				element.setAttribute('stroke', '#000000');
				element.setAttribute('stroke-opacity', '1');
				element.setAttribute('fill', '#ffffff');
				element.setAttribute('fill-opacity', '0');

				this.element = element;
				this.wrapper.appendChild(element);

				if ('background' in options) {
					var background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

					background.setAttribute('x', '0px');
					background.setAttribute('y', '0px');
					background.setAttribute('width', this.width + 'px');
					background.setAttribute('height', this.height + 'px');
					background.setAttribute('fill', colorConvert((options).background));
					background.setAttribute('fill-opacity', '1');
					this.element.appendChild(background);
				}
			}

			this.layer = [];
			this.layer.back = new MathLib.Layer(this, 'back', 0);
			this.layer.grid = new MathLib.Layer(this, 'grid', 1);
			this.layer.axis = new MathLib.Layer(this, 'axis', 2);
			this.layer.main = new MathLib.Layer(this, 'main', 3);

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

			this.wrapper.addEventListener('DOMMouseScroll', function (evt) {
				return _this.onmousewheel(evt);
			}, false);

			this.applyTransformation = this.renderer.applyTransformation;

			this.draw = function (x, options) {
				if (typeof options === 'undefined') { options = {}; }
				var _this = this;
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
		Screen2D.prototype.drawAxis = function () {
			var _this = this;
			var line = function () {
				var args = [];
				for (var _i = 0; _i < (arguments.length - 0); _i++) {
					args[_i] = arguments[_i + 0];
				}
				return _this.renderer.line.apply(_this.layer.axis, args);
			}, text = function () {
				var args = [];
				for (var _i = 0; _i < (arguments.length - 0); _i++) {
					args[_i] = arguments[_i + 0];
				}
				return _this.renderer.text.apply(_this.layer.axis, args);
			}, options = {
				lineColor: colorConvert(this.options.axis.color),
				'stroke-width': -1 / this.transformation[1][1]
			}, textOptions = {
				strokeStyle: colorConvert(this.options.axis.textColor),
				fillStyle: colorConvert(this.options.axis.textColor)
			}, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lengthX = 10 / this.transformation[0][0], lengthY = -10 / this.transformation[1][1], yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3), xExp = 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3), yTick = Math.pow(10, yExp), xTick = Math.pow(10, xExp), i;

			if (!this.options.axis) {
				return this;
			}

			line([[left, 0], [right, 0]], options, true);
			line([[0, bottom], [0, top]], options, true);

			if (this.options.grid.tick) {
				for (i = -yTick; i >= left; i -= yTick) {
					line([[i, -lengthY], [i, lengthY]], options, true);
				}
				for (i = yTick; i <= right; i += yTick) {
					line([[i, -lengthY], [i, lengthY]], options, true);
				}

				for (i = -xTick; i >= bottom; i -= xTick) {
					line([[-lengthX, i], [lengthX, i]], options, true);
				}
				for (i = xTick; i <= top; i += xTick) {
					line([[-lengthX, i], [lengthX, i]], options, true);
				}
			}

			var xLen = Math.max(0, Math.min(20, -xExp)), yLen = Math.max(0, Math.min(20, -yExp));

			for (i = -yTick; i >= left; i -= yTick) {
				text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
			}
			for (i = yTick; i <= right; i += yTick) {
				text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
			}

			for (i = -xTick; i >= bottom; i -= xTick) {
				text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
			}
			for (i = xTick; i <= top; i += xTick) {
				text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
			}

			return this;
		};

		Screen2D.prototype.drawGrid = function () {
			var _this = this;
			if (!this.options.grid) {
				return this;
			}

			var line = function () {
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
			}, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, yTick = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)), xTick = Math.pow(10, 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3)), i, ii;

			if (this.options.grid.type === 'cartesian') {
				for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
					line([[left, i], [right, i]], false, true);
				}

				for (i = left - (left % xTick); i <= right; i += xTick) {
					line([[i, bottom], [i, top]], false, true);
				}
			} else if (this.options.grid.type === 'polar') {
				var max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right)), min = 0;

				for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle) {
					line([[0, 0], [max * Math.cos(i), max * Math.sin(i)]], false, true);
				}

				for (i = min; i <= max; i += Math.min(xTick, yTick)) {
					circle(new MathLib.Circle([0, 0, 1], i), false, true);
				}
			}

			return this;
		};

		Screen2D.prototype.getEventPoint = function (evt) {
			var x, y;
			if (evt.offsetX) {
				x = evt.offsetX;
				y = evt.offsetY;
			} else {
				x = evt.layerX;
				y = evt.layerY;
			}
			return new MathLib.Point([x, y, 1]);
		};

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

		Screen2D.prototype.onmousedown = function (evt) {
			if (evt.button !== 0) {
				return;
			}

			if (evt.preventDefault) {
				evt.preventDefault();
			}

			evt.returnValue = false;

			if (this.options.interaction.allowPan && !this.options.interaction.type) {
				this.options.interaction.type = 'pan';
				this.options.interaction.startPoint = this.getEventPoint(evt);
				this.options.interaction.startTransformation = this.transformation.copy();
			}
		};

		Screen2D.prototype.onmousemove = function (evt) {
			var p;

			if (evt.preventDefault) {
				evt.preventDefault();
			}

			evt.returnValue = false;

			if (this.options.interaction.type === 'pan') {
				p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
				this.translation.x = this.options.interaction.startTransformation[0][2] + p[0];
				this.translation.y = this.options.interaction.startTransformation[1][2] + p[1];
				this.draw();
			}
		};

		Screen2D.prototype.onmouseup = function (evt) {
			if (evt.preventDefault) {
				evt.preventDefault();
			}

			evt.returnValue = false;

			if (this.options.interaction.type === 'pan') {
				delete this.options.interaction.type;
				delete this.options.interaction.startPoint;
				delete this.options.interaction.startTransformation;
			}
		};

		Screen2D.prototype.onmousewheel = function (evt) {
			var delta, s, p, z;

			if (this.options.interaction.allowZoom) {
				if (evt.preventDefault) {
					evt.preventDefault();
				}
				evt.returnValue = false;

				if (evt.wheelDelta) {
					delta = evt.wheelDelta / 360;
				} else {
					delta = evt.detail / -9;
				}

				z = Math.pow(1 + this.options.interaction.zoomSpeed, delta);

				p = this.transformation.inverse().times(this.getEventPoint(evt));

				s = new MathLib.Matrix([[z, 0, p[0] - p[0] * z], [0, z, p[1] - p[1] * z], [0, 0, 1]]);

				this.transformation = this.transformation.times(s);

				this.applyTransformation();
				this.draw();
			}
		};

		Screen2D.prototype.resize = function (width, height) {
			this.height = height;
			this.width = width;

			if (this.options.renderer === 'Canvas') {
				this.layer.back.element.width = width;
				this.layer.back.element.height = height;
				this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

				this.layer.grid.element.width = width;
				this.layer.grid.element.height = height;
				this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
				this.layer.grid.ctx.strokeStyle = colorConvert(this.options.grid.color) || '#cccccc';

				this.layer.axis.element.width = width;
				this.layer.axis.element.height = height;
				this.layer.axis.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
				this.layer.axis.ctx.strokeStyle = colorConvert(this.options.axis.color) || '#000000';

				this.layer.main.element.width = width;
				this.layer.main.element.height = height;
				this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
			} else if (this.options.renderer === 'SVG') {
				this.element.setAttribute('width', width + 'px');
				this.element.setAttribute('height', height + 'px');
			}

			this.applyTransformation();
			this.draw();

			return this;
		};
		return Screen2D;
	})(Screen);
	MathLib.Screen2D = Screen2D;

	var Screen3D = (function (_super) {
		__extends(Screen3D, _super);
		function Screen3D(id, options) {
			if (typeof options === 'undefined') { options = {}; }
			_super.call(this, id, options);
			this.type = 'screen3D';

			var defaults = {
				anaglyphMode: false,
				axis: true,
				background: 0xffffff,
				camera: {
					lookAt: [0, 0, 0],
					position: [10, 10, 10]
				},
				controls: 'Trackball',
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
			}, opts = extendObject(defaults, options), scene = new THREE.Scene(), camera, renderer, controls, viewAngle, aspect, near, far;

			this.options = opts;
			this.scene = scene;

			viewAngle = 45;
			aspect = opts.width / opts.height;
			near = 0.1;
			far = 20000;

			camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
			camera.position = to3js(opts.camera.position);
			camera.lookAt(to3js(opts.camera.lookAt));
			camera.up = new THREE.Vector3(0, 0, 1);
			scene.add(camera);

			renderer = new THREE[opts.renderer + 'Renderer']({ antialias: true, preserveDrawingBuffer: true });

			this.wrapper.innerHTML = '';
			this.wrapper.appendChild(renderer.domElement);

			var origRenderer = renderer;

			if (opts.anaglyphMode) {
				renderer = new THREE.AnaglyphEffect(renderer);
			}

			renderer.setSize(opts.width, opts.height);

			if (opts.controls) {
				controls = new THREE[opts.controls + 'Controls'](camera, renderer.domElement);
			} else {
				controls = {
					update: function () {
					}
				};
			}

			var light1 = new THREE.PointLight(0xffffff);
			light1.position.set(0, 0, 200);
			scene.add(light1);
			var light2 = new THREE.PointLight(0xffffff);
			light2.position.set(0, 0, -200);
			scene.add(light2);

			renderer.setClearColorHex(opts.background, 1);
			renderer.clear();

			if (opts.grid) {
				this.drawGrid();
			}

			if (opts.axis) {
				var axis = new THREE.AxisHelper(10);
				scene.add(axis);
			}

			function animate() {
				requestAnimationFrame(animate);
				render();
				update();
			}

			function update() {
				controls.update();
			}

			function render() {
				renderer.render(scene, camera);
			}

			animate();

			this.options = opts;
			this.element = renderer.domElement;
			this.renderer = renderer;
			this.camera = camera;

			this.container.classList.add('MathLib_screen3D');
		}
		Screen3D.prototype.drawGrid = function () {
			if (!this.options.grid) {
				return this;
			}

			var _this = this, gridDrawer = function (opts, rotX, rotY) {
				var size = 10, grid = new THREE.Object3D(), color = new THREE.Color(opts.color), i, ii;

				if (opts.type === 'cartesian') {
					var tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y, tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y, lines = new THREE.Shape();

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
					var circles = new THREE.Shape(), rays = new THREE.Shape();

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
			}, opts = extendObject(defaults, options), Curve = THREE.Curve.create(function () {
			}, function (t) {
				t = (opts.max - opts.min) * t + opts.min;
				var ft = f(t);
				return new THREE.Vector3(ft[0], ft[1], ft[2]);
			}), mesh = new THREE.Mesh(new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug), new THREE[opts.material.type + 'Material'](opts.material));

			this.scene.add(mesh);

			return this;
		};

		Screen3D.prototype.plot3D = function (f, options) {
			return this.surfacePlot3D(function (u, v) {
				return [u, v, f(u, v)];
			}, options);
		};

		Screen3D.prototype.resize = function (width, height) {
			this.renderer.setSize(width, height);
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();

			return this;
		};

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
			}, opts = extendObject(defaults, options), map = function (u, v) {
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
	})(Screen);
	MathLib.Screen3D = Screen3D;

	var Vector = (function () {
		function Vector(coords) {
			var _this = this;
			this.type = 'vector';
			coords.forEach(function (x, i) {
				_this[i] = x;
			});
			this.length = coords.length;
		}
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

		Vector.prototype.every = function (f) {
			return Array.prototype.every.call(this, f);
		};

		Vector.prototype.forEach = function (f) {
			Array.prototype.forEach.call(this, f);
		};

		Vector.prototype.isEqual = function (v) {
			if (this.length !== v.length) {
				return false;
			}

			return this.every(function (x, i) {
				return MathLib.isEqual(x, v[i]);
			});
		};

		Vector.prototype.isZero = function () {
			return this.every(MathLib.isZero);
		};

		Vector.prototype.map = function (f) {
			return new this['constructor'](Array.prototype.map.call(this, f));
		};

		Vector.prototype.minus = function (v) {
			if (this.length === v.length) {
				return this.plus(v.negative());
			} else {
				MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#minus' });
				return;
			}
		};

		Vector.prototype.negative = function () {
			return this.map(MathLib.negative);
		};

		Vector.prototype.norm = function (p) {
			if (typeof p === 'undefined') { p = 2; }
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

		Vector.prototype.outerProduct = function (v) {
			return new MathLib.Matrix(this.map(function (x) {
				return v.map(function (y) {
					return MathLib.times(x, y);
				});
			}));
		};

		Vector.prototype.plus = function (v) {
			if (this.length === v.length) {
				return new MathLib.Vector(this.map(function (x, i) {
					return MathLib.plus(x, v[i]);
				}));
			} else {
				MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#plus' });
				return;
			}
		};

		Vector.prototype.reduce = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.reduce.apply(this, args);
		};

		Vector.prototype.scalarProduct = function (v) {
			if (this.length === v.length) {
				return this.reduce(function (old, cur, i, w) {
					return MathLib.plus(old, MathLib.times(w[i], v[i]));
				}, 0);
			} else {
				MathLib.error({ message: 'Vector sizes not matching', method: 'Vector#scalarProduct' });
				return;
			}
		};

		Vector.prototype.slice = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.slice.apply(this, args);
		};

		Vector.prototype.times = function (n) {
			var i, ii, colVectors, product = [];
			if (n.type === 'rational') {
				n = n.toNumber();
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
					MathLib.error({ message: 'Vector/Matrix sizes not matching', method: 'Vector#times' });
					return;
				}
			}
		};

		Vector.prototype.toArray = function () {
			return Array.prototype.slice.call(this);
		};

		Vector.prototype.toContentMathML = function () {
			return this.reduce(function (old, cur) {
				return old + MathLib.toContentMathML(cur);
			}, '<vector>') + '</vector>';
		};

		Vector.prototype.toLaTeX = function () {
			return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
				return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
			}) + '\n\\end{pmatrix}';
		};

		Vector.prototype.toMathML = function () {
			return this.reduce(function (old, cur) {
				return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
			}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
		};

		Vector.prototype.toString = function () {
			return '(' + this.reduce(function (old, cur) {
				return old + ', ' + MathLib.toString(cur);
			}) + ')';
		};

		Vector.prototype.vectorProduct = function (v) {
			if (this.length === 3 && v.length === 3) {
				return new MathLib.Vector([
					MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
					MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
					MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
				]);
			} else {
				MathLib.error({ message: 'Vectors are not three-dimensional', method: 'Vector#vectorProduct' });
				return;
			}
		};
		Vector.areLinearIndependent = function (v) {
			var n = v.length, m = v[0].length;

			if (n > m) {
				return false;
			}

			if (!v.every(function (x) {
				return x.length === m;
			})) {
				return undefined;
			}

			return (new MathLib.Matrix(v)).rank() === n;
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

	var Circle = (function () {
		function Circle(center, radius) {
			this.type = 'circle';
			if (center.type === undefined) {
				center = new MathLib.Point(center.concat(1));
			}

			this.center = center;
			this.radius = radius;
		}
		Circle.prototype.area = function () {
			return this.radius * this.radius * Math.PI;
		};

		Circle.prototype.circumference = function () {
			return 2 * this.radius * Math.PI;
		};

		Circle.prototype.compare = function (c) {
			return MathLib.sign(this.center.compare(c.center)) || MathLib.sign(this.radius - c.radius);
		};

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

		Circle.prototype.isEqual = function (c) {
			return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
		};

		Circle.prototype.positionOf = function (p) {
			var diff;
			if (p.type === 'point' && p.dimension === 2) {
				diff = p.distanceTo(this.center) - this.radius;
				if (MathLib.isZero(diff)) {
					return 'on';
				} else if (diff < 0) {
					return 'in';
				} else {
					return 'out';
				}
			}
		};

		Circle.prototype.reflectAt = function (a) {
			return new MathLib.Circle(this.center.reflectAt(a), this.radius);
		};

		Circle.prototype.toLaTeX = function () {
			return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
		};

		Circle.prototype.toMatrix = function () {
			var x = this.center[0] / this.center[2], y = this.center[1] / this.center[2], r = this.radius;
			return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
		};
		return Circle;
	})();
	MathLib.Circle = Circle;

	var Complex = (function () {
		function Complex(re, im) {
			if (typeof im === 'undefined') { im = 0; }
			this.type = 'complex';
			this.re = re;
			this.im = im;
		}
		Complex.prototype.abs = function () {
			return MathLib.hypot(this.re, this.im);
		};

		Complex.prototype.arccos = function () {
			return MathLib.minus(Math.PI / 2, this.arcsin());
		};

		Complex.prototype.arccot = function () {
			return MathLib.minus(Math.PI / 2, this.arctan());
		};

		Complex.prototype.arccsc = function () {
			return MathLib.times(new MathLib.Complex(0, 1), MathLib.ln(MathLib.plus(MathLib.sqrt(MathLib.minus(1, MathLib.divide(1, MathLib.times(this, this)))), MathLib.divide(new MathLib.Complex(0, 1), this))));
		};

		Complex.prototype.arcsin = function () {
			var a = this.re, b = this.im, aa = a * a, bb = b * b;
			return new MathLib.Complex(MathLib.sign(a) / 2 * MathLib.arccos(Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb) - (aa + bb)), MathLib.sign(b) / 2 * MathLib.arcosh(Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb) + (aa + bb)));
		};

		Complex.prototype.arctan = function () {
			var iz = new MathLib.Complex(-this.im, this.re);
			return MathLib.times(new MathLib.Complex(0, 0.5), MathLib.ln(MathLib.divide(MathLib.plus(1, iz), MathLib.minus(1, iz))));
		};

		Complex.prototype.arg = function () {
			return Math.atan2(this.im, this.re);
		};

		Complex.prototype.artanh = function () {
			return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
		};

		Complex.prototype.compare = function (x) {
			var a = MathLib.sign(this.abs() - x.abs());
			return a ? a : MathLib.sign(this.arg() - x.arg());
		};

		Complex.prototype.conjugate = function () {
			return new MathLib.Complex(this.re, MathLib.negative(this.im));
		};

		Complex.prototype.copy = function () {
			return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
		};

		Complex.prototype.cos = function () {
			return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
		};

		Complex.prototype.cosh = function () {
			return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
		};

		Complex.prototype.divide = function (c) {
			return this.times(MathLib.inverse(c));
		};

		Complex.prototype.exp = function () {
			return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
		};

		Complex.prototype.inverse = function () {
			return new MathLib.Complex(MathLib.divide(this.re, MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))), MathLib.divide(MathLib.negative(this.im), MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2))));
		};

		Complex.prototype.isEqual = function (n) {
			if (typeof n === 'number') {
				return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
			}
			if (n.type === 'complex') {
				return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
			}
			return false;
		};

		Complex.prototype.isFinite = function () {
			return MathLib.isFinite(this.re) && MathLib.isFinite(this.im);
		};

		Complex.prototype.isOne = function () {
			return MathLib.isOne(this.re) && MathLib.isZero(this.im);
		};

		Complex.prototype.isReal = function () {
			return MathLib.isZero(this.im);
		};

		Complex.prototype.isZero = function () {
			return MathLib.isZero(this.re) && MathLib.isZero(this.im);
		};

		Complex.prototype.ln = function () {
			return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
		};

		Complex.prototype.minus = function (c) {
			return this.plus(MathLib.negative(c));
		};

		Complex.prototype.negative = function () {
			return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
		};

		Complex.prototype.plus = function (c) {
			if (c.type === 'complex') {
				return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
			} else if (c.type === 'rational') {
				c = c.toNumber();
			}
			if (typeof c === 'number') {
				return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
			}
		};

		Complex.prototype.pow = function (n) {
			return new MathLib.Complex(Math.pow(this.abs(), n), n * this.arg());
		};

		Complex.prototype.sign = function () {
			return MathLib.Complex.polar(1, this.arg());
		};

		Complex.prototype.sin = function () {
			return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
		};

		Complex.prototype.sinh = function () {
			return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
		};

		Complex.prototype.sqrt = function () {
			return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
		};

		Complex.prototype.times = function (c) {
			if (c.type === 'complex') {
				return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)), MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
			} else if (c.type === 'rational') {
				c = c.toNumber();
			}
			if (typeof c === 'number') {
				return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
			}
		};

		Complex.prototype.toContentMathML = function () {
			return '<cn type="complex-cartesian">' + this.re + '<sep/>' + this.im + '</cn>';
		};

		Complex.prototype.toLaTeX = function () {
			var str = '', reFlag = false;

			if (!MathLib.isZero(this.re)) {
				str = MathLib.toLaTeX(this.re);
				reFlag = true;
			}
			if (!MathLib.isZero(this.im)) {
				str += MathLib.toLaTeX(this.im, reFlag) + 'i';
			}
			if (str.length === 0) {
				str = '0';
			}
			return str;
		};

		Complex.prototype.toMathML = function () {
			var str = '', reFlag = false;

			if (!MathLib.isZero(this.re)) {
				str = MathLib.toMathML(this.re);
				reFlag = true;
			}
			if (!MathLib.isZero(this.im)) {
				str += MathLib.toMathML(this.im, reFlag) + '<mo>&#x2062;</mo><mi>i</mi>';
			}
			if (str.length === 0) {
				str = '<mn>0</mn>';
			}
			return str;
		};

		Complex.prototype.toMatrix = function () {
			return new MathLib.Matrix([[this.re, MathLib.negative(this.im)], [this.im, this.re]]);
		};

		Complex.prototype.toPoint = function () {
			return new MathLib.Point(this.re, this.im);
		};

		Complex.prototype.toString = function () {
			var str = '';

			if (!MathLib.isZero(this.re)) {
				str = MathLib.toString(this.re);
			}
			if (!MathLib.isZero(this.im)) {
				str += (this.im > 0 ? (str.length ? '+' : '') : '-') + MathLib.toString(Math.abs(this.im)) + 'i';
			}
			if (str.length === 0) {
				str = '0';
			}
			return str;
		};
		Complex.infinity = 'complexInfinity';

		Complex.one = new Complex(1, 0);

		Complex.polar = function (abs, arg) {
			return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
		};

		Complex.zero = new Complex(0, 0);
		return Complex;
	})();
	MathLib.Complex = Complex;

	var Line = (function (_super) {
		__extends(Line, _super);
		function Line(coords) {
			_super.call(this, coords);
			this.type = 'line';
			this.dimension = 2;
		}
		Line.prototype.draw = function (screen, options) {
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

		Line.prototype.isEqual = function (q) {
			var p = this.normalize();
			q = q.normalize();

			if (this.length !== q.length) {
				return false;
			}

			return p.every(function (x, i) {
				return MathLib.isEqual(x, q[i]);
			});
		};

		Line.prototype.isFinite = function () {
			return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
		};

		Line.prototype.isParallelTo = function (l) {
			return MathLib.isZero(this[0] * l[1] - this[1] * l[0]);
		};

		Line.prototype.meet = function (l) {
			var point, k = this;

			if (this.dimension === 2 && l.dimension === 2) {
				point = new MathLib.Point(this.vectorProduct(l));

				Object.defineProperties(point, {
					'0': {
						get: function () {
							return k[1] * l[2] - k[2] * l[1];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
						},
						enumerable: true
					},
					'1': {
						get: function () {
							return k[2] * l[0] - k[0] * l[2];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
						},
						enumerable: true
					},
					'2': {
						get: function () {
							return k[0] * l[1] - k[1] * l[0];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
						},
						enumerable: true
					}
				});

				return point;
			}
		};

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

		Line.prototype.parallelThrough = function (p) {
			var l = this, parallel = new MathLib.Line([0, 0, 0]);

			Object.defineProperties(parallel, {
				'0': {
					get: function () {
						return -l[0] * p[2];
					},
					set: function () {
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
					},
					enumerable: true
				},
				'1': {
					get: function () {
						return -l[1] * p[2];
					},
					set: function () {
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
					},
					enumerable: true
				},
				'2': {
					get: function () {
						return l[1] * p[1] + l[0] * p[0];
					},
					set: function () {
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
					},
					enumerable: true
				}
			});

			return parallel;
		};
		return Line;
	})(Vector);
	MathLib.Line = Line;

	var Matrix = (function () {
		function Matrix(matrix) {
			var _this = this;
			this.type = 'matrix';
			if (typeof matrix === 'string') {
				if (matrix.indexOf('<') > -1) {
					return new MathLib.Expression.parseMathML(matrix).evaluate();
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
		Matrix.prototype.LU = function () {
			var i, j, k, t, p, LU = this.toArray(), m = this.rows, n = this.cols, permutation = [];

			for (k = 0; k < n; k++) {
				p = k;
				for (i = k + 1; i < m; i++) {
					if (Math.abs(LU[i][k]) > Math.abs(LU[p][k])) {
						p = i;
					}
				}

				if (p !== k) {
					permutation.unshift([p, k]);
					t = LU[p];
					LU[p] = LU[k];
					LU[k] = t;
				}

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

		Matrix.prototype.adjoint = function () {
			return this.map(MathLib.conjugate).transpose();
		};

		Matrix.prototype.adjugate = function () {
			return this.map(function (x, r, c, m) {
				return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
			});
		};

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

		Matrix.prototype.copy = function () {
			return this.map(MathLib.copy);
		};

		Matrix.prototype.determinant = function () {
			var LU, determinant;

			if (!this.isSquare()) {
				MathLib.error({ message: 'Determinant of non square matrix', method: 'Matrix#determinant' });
				return;
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

		Matrix.prototype.diag = function () {
			var diagonal = [], i, ii;
			for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
				diagonal.push(this[i][i]);
			}
			return diagonal;
		};

		Matrix.prototype.divide = function (n) {
			return this.times(MathLib.inverse(n));
		};

		Matrix.prototype.every = function (f) {
			return Array.prototype.every.call(this, function (x, i) {
				return Array.prototype.every.call(x, function (y, j) {
					return f(y, i, j, this);
				});
			});
		};

		Matrix.prototype.forEach = function (f) {
			Array.prototype.forEach.call(this, function (x, i) {
				return Array.prototype.forEach.call(x, function (y, j) {
					return f(y, i, j, this);
				});
			});
		};

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

		Matrix.prototype.givens = function () {
			var rows = this.rows, cols = this.cols, R = this.copy(), Q = MathLib.Matrix.identity(rows), c, s, rho, i, j, k, ri, rj, qi, qj;

			for (i = 0; i < cols; i++) {
				for (j = i + 1; j < rows; j++) {
					if (!MathLib.isZero(R[j][i])) {
						rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i], R[j][i]);
						c = R[i][i] / rho;
						s = R[j][i] / rho;

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

		Matrix.prototype.inverse = function () {
			var i, ii, res, inverse, col = [], matrix = [], n = this.rows;

			if (!this.isSquare()) {
				MathLib.error({ message: 'Inverse of non square matrix', method: 'Matrix#inverse' });
				return;
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

		Matrix.prototype.isBandMatrix = function (l, u) {
			if (arguments.length === 1) {
				u = l;
			}

			return this.every(function (x, i, j) {
				return (i - l <= j && i + u >= j) || MathLib.isZero(x);
			});
		};

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

		Matrix.prototype.isEqual = function (x) {
			var i, j, ii, jj;
			if (this === x) {
				return true;
			}
			if (this.rows === x.rows && this.cols === x.cols) {
				for (i = 0, ii = this.rows; i < ii; i++) {
					for (j = 0, jj = this.cols; j < jj; j++) {
						if (!MathLib.isEqual(this[i][j], x[i][j])) {
							return false;
						}
					}
				}
				return true;
			}
			return false;
		};

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

		Matrix.prototype.isInvertible = function () {
			return this.isSquare() && this.rank() === this.rows;
		};

		Matrix.prototype.isLower = function () {
			return this.slice(0, -1).every(function (x, i) {
				return x.slice(i + 1).every(MathLib.isZero);
			});
		};

		Matrix.prototype.isNegDefinite = function () {
			if (!this.isSquare()) {
				return;
			}
			if (this.rows === 1) {
				return this[0][0] < 0;
			}

			if (this.rows % 2 === 0) {
				return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
			} else {
				return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
			}
		};

		Matrix.prototype.isOrthogonal = function () {
			return this.transpose().times(this).isIdentity();
		};

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

		Matrix.prototype.isPosDefinite = function () {
			if (!this.isSquare()) {
				return;
			}
			if (this.rows === 1) {
				return this[0][0] > 0;
			}

			return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
		};

		Matrix.prototype.isReal = function () {
			return this.every(MathLib.isReal);
		};

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

		Matrix.prototype.isSquare = function () {
			return this.cols === this.rows;
		};

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

		Matrix.prototype.isUpper = function () {
			return this.slice(1).every(function (x, i) {
				return x.slice(0, i + 1).every(MathLib.isZero);
			});
		};

		Matrix.prototype.isVector = function () {
			return (this.rows === 1) || (this.cols === 1);
		};

		Matrix.prototype.isZero = function () {
			var isZero = this.every(MathLib.isZero);

			this.isZero = function () {
				return isZero;
			};
			return isZero;
		};

		Matrix.prototype.map = function (f) {
			var m = this;
			return new MathLib.Matrix(Array.prototype.map.call(this, function (x, i) {
				return Array.prototype.map.call(x, function (y, j) {
					return f(y, i, j, m);
				});
			}));
		};

		Matrix.prototype.minor = function (r, c) {
			return this.remove(r, c).determinant();
		};

		Matrix.prototype.minus = function (m) {
			if (this.rows === m.rows && this.cols === m.cols) {
				return this.plus(m.negative());
			} else {
				MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#minus' });
				return;
			}
		};

		Matrix.prototype.negative = function () {
			var i, ii, negative = [];

			for (i = 0, ii = this.rows; i < ii; i++) {
				negative.push(this[i].map(MathLib.negative));
			}
			return new MathLib.Matrix(negative);
		};

		Matrix.prototype.plus = function (m) {
			var i, ii, j, jj, sum = [];

			if (this.rows === m.rows && this.cols === m.cols) {
				for (i = 0, ii = this.rows; i < ii; i++) {
					sum[i] = [];
					for (j = 0, jj = this.cols; j < jj; j++) {
						sum[i][j] = MathLib.plus(this[i][j], m[i][j]);
					}
				}
				return new MathLib.Matrix(sum);
			} else {
				MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#plus' });
				return;
			}
		};

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

		Matrix.prototype.reduce = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.reduce.apply(this, args);
		};

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

		Matrix.prototype.rref = function () {
			var i, ii, j, jj, k, kk, pivot, factor, swap, lead = 0, rref = this.toArray();

			for (i = 0, ii = this.rows; i < ii; i++) {
				if (this.cols <= lead) {
					return new MathLib.Matrix(rref);
				}

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

		Matrix.prototype.slice = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.slice.apply(this, args);
		};

		Matrix.prototype.solve = function (b) {
			var LU = this.LU(), i, j, n = b.length, x = [], y = [];

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

		Matrix.prototype.some = function (f) {
			return Array.prototype.some.call(this, function (x, i) {
				return Array.prototype.some.call(x, function (y, j) {
					return f(y, i, j, this);
				});
			});
		};

		Matrix.prototype.times = function (a) {
			var i, ii, j, jj, k, kk, product = [], entry;

			if (a.type === 'rational') {
				a = a.toNumber();
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
					MathLib.error({ message: 'Matrix sizes not matching', method: 'Matrix#times' });
					return;
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

		Matrix.prototype.toArray = function () {
			return Array.prototype.map.call(this, function (x) {
				return Array.prototype.map.call(x, function (y) {
					return MathLib.copy(y);
				});
			});
		};

		Matrix.prototype.toColVectors = function () {
			return this.transpose().toRowVectors();
		};

		Matrix.prototype.toContentMathML = function () {
			return this.reduce(function (str, x) {
				return str + x.reduce(function (prev, cur) {
					return prev + MathLib.toContentMathML(cur);
				}, '<matrixrow>') + '</matrixrow>';
			}, '<matrix>') + '</matrix>';
		};

		Matrix.prototype.toLaTeX = function () {
			return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
				return str + x.reduce(function (prev, cur) {
					return prev + ' & ' + MathLib.toLaTeX(cur);
				}) + '\\\n';
			}, '').slice(0, -2) + '\n\\end{pmatrix}';
		};

		Matrix.prototype.toMathML = function () {
			return this.reduce(function (str, x) {
				return str + x.reduce(function (prev, cur) {
					return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
				}, '<mtr>') + '</mtr>';
			}, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
		};

		Matrix.prototype.toRowVectors = function () {
			return this.toArray().map(function (v) {
				return new MathLib.Vector(v);
			});
		};

		Matrix.prototype.toString = function () {
			return this.reduce(function (str, x) {
				return str + x.reduce(function (prev, cur) {
					return prev + '\t' + MathLib.toString(cur);
				}) + '\n';
			}, '').slice(0, -1);
		};

		Matrix.prototype.trace = function () {
			var trace = MathLib.plus.apply(null, this.diag());

			this.trace = function () {
				return trace;
			};
			return trace;
		};

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
			r = r || 1;
			c = c || 1;
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
			r = r || 1;
			c = c || 1;
			return MathLib.Matrix.numbers(0, r, c);
		};
		return Matrix;
	})();
	MathLib.Matrix = Matrix;

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

		Permutation.prototype.inverse = function () {
			var cycle = this.cycle.slice(0);
			cycle.reverse().forEach(function (e) {
				e.reverse();
			});
			return new MathLib.Permutation(cycle);
		};

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

		Permutation.prototype.map = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return new MathLib.Permutation(Array.prototype.map.apply(this, args));
		};

		Permutation.prototype.sgn = function () {
			var i, ii, count = 0;

			for (i = 0, ii = this.cycle.length; i < ii; i++) {
				count += this.cycle[i].length;
			}
			count += this.cycle.length;
			return -2 * (count % 2) + 1;
		};

		Permutation.prototype.times = function (p) {
			var a = this;
			return p.map(function (x) {
				return a[x];
			});
		};

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

	var Conic = (function () {
		function Conic(primal, dual) {
			this.type = 'conic';
			if (primal.type !== 'matrix') {
				primal = new MathLib.Matrix(primal);
			}
			this.primal = primal;

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
		Conic.prototype.draw = function (screen, options, redraw) {
			if (typeof redraw === 'undefined') { redraw = false; }
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

		Conic.prototype.eccentricity = function () {
			var normalform = this.normalize(), a = normalform.primal[0][0], c = normalform.primal[1][1];

			if (!this.isDegenerated()) {
				if (c === 0) {
					return 1;
				}
				if (c > 0) {
					return Math.sqrt(1 - c / a);
				}
				return Math.sqrt(1 - a / c);
			}
		};

		Conic.prototype.isDegenerated = function () {
			return this.primal.rank() !== 3;
		};

		Conic.prototype.isEqual = function (c) {
			if (this === c) {
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

			return compare(this.primal, c.primal) && compare(this.dual, c.dual);
		};

		Conic.prototype.latusRectum = function () {
			var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], min = Math.min(Math.abs(a), Math.abs(c)), max = Math.max(Math.abs(a), Math.abs(c));

			if (!this.isDegenerated()) {
				if (c === 0) {
					return -2 * normalForm.primal[1][2] / a;
				}

				return 2 * Math.sqrt(max) / min;
			}
		};

		Conic.prototype.linearEccentricity = function () {
			var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], max = Math.max(Math.abs(a), Math.abs(c)), min = Math.min(Math.abs(a), Math.abs(c));

			if (!this.isDegenerated()) {
				if (c === 0) {
					return normalForm.primal[1][2] / (-2 * a);
				}

				if (c > 0) {
					return Math.sqrt(1 / min - 1 / max);
				}
				return Math.sqrt(1 / max + 1 / min);
			}
		};

		Conic.prototype.meet = function (x) {
			var B, C, alpha, i, j, p1, p2, Ml, a, b, c, d, Delta0, Delta1, lambda, degenerated, lines, A = this.primal;

			if (x.type === 'line') {
				var setter = function () {
					MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Conic#meet' });
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

			return new MathLib.Conic([[a, 0, d / 2], [0, c, e / 2], [d / 2, e / 2, f]]);
		};

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
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
					},
					enumerable: true
				},
				'1': {
					get: function () {
						return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2];
					},
					set: function () {
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
					},
					enumerable: true
				},
				'2': {
					get: function () {
						return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2];
					},
					set: function () {
						MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity' });
					},
					enumerable: true
				}
			});

			return object;
		};

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

		Conic.throughFivePoints = function (p, q, r, s, t) {
			var conic = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

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
		return Conic;
	})();
	MathLib.Conic = Conic;

	var Point = (function (_super) {
		__extends(Point, _super);
		function Point(coords) {
			_super.call(this, arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);
			this.type = 'point';

			this.dimension = 2;
		}
		Point.prototype.crossRatio = function (a, b, c, d) {
			var xa = this.vectorProduct(a), xb = this.vectorProduct(b);

			return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
		};

		Point.prototype.distanceTo = function (p) {
			if (arguments.length === 0) {
				return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
			}

			if (p.type === 'point' && this.dimension === p.dimension) {
				return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
			}
		};

		Point.prototype.draw = function (screen, options) {
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

		Point.prototype.isFinite = function () {
			return !MathLib.isZero(this[this.length - 1]);
		};

		Point.prototype.isInside = function (a) {
			if (a.type === 'circle') {
				return this.distanceTo(a.center) < a.radius;
			}
		};

		Point.prototype.isOn = function (a) {
			if (a.type === 'line') {
				return this.distanceTo(a.center) === a.radius;
			} else if (a.type === 'circle') {
				return this.distanceTo(a.center) === a.radius;
			}
		};

		Point.prototype.isOutside = function (a) {
			if (a.type === 'circle') {
				return this.distanceTo(a.center) > a.radius;
			}
		};

		Point.prototype.join = function (q) {
			var line, p = this;

			if (this.dimension === 2 && q.dimension === 2) {
				line = new MathLib.Line(this.vectorProduct(q));

				Object.defineProperties(line, {
					'0': {
						get: function () {
							return p[1] * q[2] - p[2] * q[1];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
						},
						enumerable: true
					},
					'1': {
						get: function () {
							return p[2] * q[0] - p[0] * q[2];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
						},
						enumerable: true
					},
					'2': {
						get: function () {
							return p[0] * q[1] - p[1] * q[0];
						},
						set: function () {
							MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join' });
						},
						enumerable: true
					}
				});

				return line;
			}
		};

		Point.prototype.normalize = function () {
			var last = this[this.dimension] || 1;
			return this.map(function (x) {
				return x / last;
			});
		};

		Point.prototype.reflectAt = function (a) {
			var i, ii, reflectedPoint = [], p = this.normalize();

			if (a.type === 'point') {
				if (this.dimension === a.dimension) {
					a = a.normalize();
					for (i = 0, ii = this.dimension; i < ii; i++) {
						reflectedPoint.push(2 * a[i] - p[i]);
					}
					reflectedPoint.push(1);
					return new MathLib.Point(reflectedPoint);
				}
			}
		};

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

		Point.prototype.toComplex = function () {
			if (this.dimension === 2) {
				if (MathLib.isZero(this[2])) {
					return MathLib.Complex.infinity;
				}
				return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
			}
		};

		Point.prototype.toLaTeX = function (opt) {
			if (typeof opt === 'undefined') { opt = false; }
			var p = opt ? this.toArray() : this.normalize().slice(0, -1);

			return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
				return old + '\\\\' + MathLib.toLaTeX(cur);
			}) + '\\end{pmatrix}';
		};

		Point.prototype.toMathML = function (opt) {
			if (typeof opt === 'undefined') { opt = false; }
			var p = opt ? this.toArray() : this.normalize().slice(0, -1);

			return p.reduce(function (old, cur) {
				return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
			}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
		};

		Point.prototype.toString = function (opt) {
			if (typeof opt === 'undefined') { opt = false; }
			var p = opt ? this.toArray() : this.normalize().slice(0, -1);

			return '(' + p.reduce(function (old, cur) {
				return old + ', ' + MathLib.toString(cur);
			}) + ')';
		};
		Point.I = new Point([new MathLib.Complex(0, -1), 0, 1]);

		Point.J = new Point([new MathLib.Complex(0, 1), 0, 1]);
		return Point;
	})(Vector);
	MathLib.Point = Point;

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
			this.subdeg = ((function (a) {
				var i = 0;
				if (a.length > 1 || a[0]) {
					while (i < a.length && MathLib.isZero(a[i])) {
						i++;
					}
					return i;
				}
				return Infinity;
			})(polynomial));
		}
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

		Polynomial.prototype.differentiate = function (n) {
			if (typeof n === 'undefined') { n = 1; }
			var i, ii, derivative = [];

			if (n === 0) {
				return this;
			}

			for (i = 0, ii = this.deg - n; i <= ii; i++) {
				derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
			}
			return new MathLib.Polynomial(derivative);
		};

		Polynomial.prototype.draw = function (screen, options) {
			var path = [], i, line = this;

			if (this.deg < 2) {
				if (Array.isArray(screen)) {
					screen.forEach(function (x) {
						x.line([[-50, line.valueAt(-50)], [50, line.valueAt(50)]], options);
					});
				} else {
					screen.line([[-50, this.valueAt(-50)], [50, this.valueAt(50)]], options);
				}
			} else {
				for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
					path.push([i, this.valueAt(i)]);
				}
				if (Array.isArray(screen)) {
					screen.forEach(function (x) {
						x.path(path, options);
					});
				} else {
					screen.path(path, options);
				}
			}

			return this;
		};

		Polynomial.prototype.every = function (f) {
			return Array.prototype.every.call(this, f);
		};

		Polynomial.prototype.forEach = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			Array.prototype.forEach.apply(this, args);
		};

		Polynomial.prototype.integrate = function (n) {
			if (typeof n === 'undefined') { n = 1; }
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

		Polynomial.prototype.map = function (f) {
			return new MathLib.Polynomial(Array.prototype.map.call(this, f));
		};

		Polynomial.prototype.negative = function () {
			return new MathLib.Polynomial(this.map(MathLib.negative));
		};

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

		Polynomial.roots = function (zeros) {
			var elemSymPoly, i, ii, coef = [];

			if (MathLib.type(zeros) === 'array') {
				zeros = new MathLib.Set(zeros);
			}

			elemSymPoly = zeros.powerset();
			for (i = 0, ii = zeros.card; i < ii; i++) {
				coef[i] = 0;
			}

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

		Polynomial.prototype.slice = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.slice.apply(this, args);
		};

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
				a = a.toNumber();
			}

			return this.map(function (b) {
				return MathLib.times(a, b);
			});
		};

		Polynomial.prototype.toContentMathML = function (math) {
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

			if (math) {
				str = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + str + '</lambda></math>';
			}

			return str;
		};

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
				arguments: ['x'],
				content: [sum]
			});
		};

		Polynomial.prototype.toFunctn = function () {
			var str = '', i, ii;
			for (i = 0, ii = this.deg; i <= ii; i++) {
				if (!MathLib.isZero(this[i])) {
					if (i === 0) {
						str += MathLib.toString(this[i]);
					} else {
						str += MathLib.toString(this[i], true);
					}

					if (i > 1) {
						str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
					} else if (i === 1) {
						str += ' * x';
					}
				}
			}

			return new MathLib.Functn(new Function('x', 'return ' + str), {
				expression: this.toExpression()
			});
		};

		Polynomial.prototype.toLaTeX = function () {
			var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}', i;

			for (i = this.deg - 1; i >= 0; i--) {
				if (!MathLib.isZero(this[i])) {
					str += MathLib.toLaTeX(this[i], true);

					if (i > 1) {
						str += 'x^{' + MathLib.toLaTeX(i) + '}';
					} else if (i === 1) {
						str += 'x';
					}
				}
			}
			return str;
		};

		Polynomial.prototype.toMathML = function () {
			var str = '<mrow>' + MathLib.toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>', i;
			for (i = this.deg - 1; i >= 0; i--) {
				if (!MathLib.isZero(this[i])) {
					str += MathLib.toMathML(this[i], true);

					if (i > 1) {
						str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i) + '</msup>';
					} else if (i === 1) {
						str += '<mo>&#x2062;</mo><mi>x</mi>';
					}
				}
			}

			str += '</mrow>';

			return str;
		};

		Polynomial.prototype.toString = function () {
			var str = MathLib.toString(this[this.deg]) + '*x^' + this.deg, i;
			for (i = this.deg - 1; i >= 0; i--) {
				if (!MathLib.isZero(this[i])) {
					str += MathLib.toString(this[i], true);

					if (i > 1) {
						str += '*x^' + MathLib.toString(i);
					} else if (i === 1) {
						str += '*x';
					}
				}
			}
			return str;
		};

		Polynomial.prototype.valueAt = function (x) {
			var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows, x.cols) : 1, value = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0, i, ii;

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

	var Rational = (function () {
		function Rational(numerator, denominator) {
			if (typeof denominator === 'undefined') { denominator = 1; }
			this.type = 'rational';
			if (MathLib.isZero(denominator)) {
				MathLib.error({ message: 'The denominator cannot be zero.', method: 'Rational.constructor' });
				throw 'The denominator cannot be zero.';
			}
			this.numerator = numerator;
			this.denominator = denominator;
		}
		Rational.prototype.compare = function (r) {
			return MathLib.sign(this.numerator * r.denominator - this.denominator * r.numerator);
		};

		Rational.prototype.divide = function (r) {
			if (r.type === 'rational') {
				return new MathLib.Rational(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
			} else if (typeof r === 'number') {
				return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, r));
			} else {
				return r.inverse().times(this);
			}
		};

		Rational.prototype.inverse = function () {
			if (!MathLib.isZero(this.numerator)) {
				return new MathLib.Rational(this.denominator, this.numerator);
			}
		};

		Rational.prototype.isEqual = function (r) {
			return MathLib.isEqual(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
		};

		Rational.prototype.isZero = function () {
			return MathLib.isZero(this.numerator);
		};

		Rational.prototype.minus = function (r) {
			var n = this.numerator, d = this.denominator;

			if (r.type === 'rational') {
				return new MathLib.Rational(MathLib.minus(MathLib.times(n, r.denominator), MathLib.times(d, r.numerator)), MathLib.times(d, r.denominator));
			} else if (typeof r === 'number') {
				return new MathLib.Rational(MathLib.minus(n, MathLib.times(r, d)), d);
			} else {
				return r.minus(this).negative();
			}
		};

		Rational.prototype.negative = function () {
			return new MathLib.Rational(-this.numerator, this.denominator);
		};

		Rational.prototype.plus = function (r) {
			var n = this.numerator, d = this.denominator;

			if (r.type === 'rational') {
				return new MathLib.Rational(MathLib.plus(MathLib.times(d, r.numerator), MathLib.times(n, r.denominator)), MathLib.times(d, r.denominator));
			} else if (typeof r === 'number') {
				return new MathLib.Rational(MathLib.plus(n, MathLib.times(r, d)), d);
			} else {
				return r.plus(this);
			}
		};

		Rational.prototype.reduce = function () {
			var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
			return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
		};

		Rational.prototype.times = function (r) {
			if (r.type === 'rational') {
				return new MathLib.Rational(MathLib.times(this.numerator, r.numerator), MathLib.times(this.denominator, r.denominator));
			} else if (typeof r === 'number') {
				return new MathLib.Rational(MathLib.times(this.numerator, r), this.denominator);
			} else {
				return r.times(this);
			}
		};

		Rational.prototype.toContentMathML = function () {
			return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
		};

		Rational.prototype.toLaTeX = function () {
			return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
		};

		Rational.prototype.toMathML = function () {
			return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
		};

		Rational.prototype.toNumber = function () {
			return this.numerator / this.denominator;
		};

		Rational.prototype.toString = function () {
			return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
		};
		return Rational;
	})();
	MathLib.Rational = Rational;

	var Set = (function () {
		function Set(elements) {
			var _this = this;
			this.type = 'set';
			this.intersect = Set.createSetOperation(false, true, false);
			this.union = Set.createSetOperation(true, true, true);
			this.without = Set.createSetOperation(true, false, false);
			this.xor = Set.createSetOperation(true, false, true);
			if (!elements) {
				elements = [];
			}

			elements = elements.sort(MathLib.compare).filter(function (x, i, a) {
				return (a.length === i + 1) || !MathLib.isEqual(x, a[i + 1]);
			});

			elements.forEach(function (x, i) {
				_this[i] = x;
			});
			this.length = elements.length;
			this.card = elements.length;
		}
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

		Set.prototype.every = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.every.apply(this, args);
		};

		Set.prototype.filter = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return new MathLib.Set(Array.prototype.filter.apply(this, args));
		};

		Set.prototype.forEach = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			Array.prototype.forEach.apply(this, args);
		};

		Set.prototype.indexOf = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.indexOf.apply(this, args);
		};

		Set.prototype.insert = function (x) {
			var i = this.locate(x);
			if (this[i] !== x) {
				this.splice(i, 0, x);
				this.card++;
			}
			return this;
		};

		Set.prototype.isEmpty = function () {
			return this.card === 0;
		};

		Set.prototype.isEqual = function (x) {
			if (this.card !== x.card) {
				return false;
			} else {
				return this.every(function (y, i) {
					return MathLib.isEqual(y, x[i]);
				});
			}
		};

		Set.prototype.isSubsetOf = function (a) {
			return this.every(function (x) {
				return a.indexOf(x) !== -1;
			});
		};

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

		Set.prototype.map = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return new MathLib.Set(Array.prototype.map.apply(this, args));
		};

		Set.prototype.plus = function (n) {
			var sum = [];
			if (!arguments.length) {
				return MathLib.plus.apply(null, this.toArray());
			} else if (n.type === 'set') {
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

		Set.prototype.reduce = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.reduce.apply(this, arguments);
		};

		Set.prototype.remove = function (a) {
			var i = this.indexOf(a);
			if (i !== -1) {
				this.splice(i, 1);
				this.card--;
			}
			return this;
		};

		Set.prototype.slice = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.slice.apply(this, args);
		};

		Set.prototype.some = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.some.apply(this, args);
		};

		Set.prototype.splice = function () {
			var args = [];
			for (var _i = 0; _i < (arguments.length - 0); _i++) {
				args[_i] = arguments[_i + 0];
			}
			return Array.prototype.splice.apply(this, args);
		};

		Set.prototype.times = function (n) {
			if (!arguments.length) {
				return MathLib.times.apply(null, this.toArray());
			} else {
				return this.map(function (x) {
					return MathLib.times(x, n);
				});
			}
		};

		Set.prototype.toArray = function () {
			return Array.prototype.slice.call(this);
		};

		Set.prototype.toContentMathML = function () {
			if (this.isEmpty()) {
				return '<emptyset/>';
			} else {
				return this.reduce(function (old, cur) {
					return old + MathLib.toContentMathML(cur);
				}, '<set>') + '</set>';
			}
		};

		Set.prototype.toLaTeX = function () {
			if (this.isEmpty()) {
				return '\\emptyset';
			} else {
				return this.reduce(function (old, cur) {
					return old + MathLib.toLaTeX(cur) + ', ';
				}, '\\{').slice(0, -2) + '\\}';
			}
		};

		Set.prototype.toMathML = function () {
			if (this.isEmpty()) {
				return '<mi>&#x2205;</mi>';
			} else {
				return this.reduce(function (old, cur) {
					return old + MathLib.toMathML(cur) + '<mo>,</mo>';
				}, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
			}
		};

		Set.prototype.toString = function () {
			if (this.isEmpty()) {
				return '∅';
			}
			return '{' + Array.prototype.join.call(this, ', ') + '}';
		};
		Set.fromTo = function (f, t, s) {
			if (typeof s === 'undefined') { s = 1; }
			var i, set = [];
			if (f <= t) {
				for (i = f; i <= t; i += s) {
					set.push(i);
				}
				return new MathLib.Set(set);
			}
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
		return Set;
	})();
	MathLib.Set = Set;
})(MathLib || (MathLib = {}));

(function (global) {
	'use strict';

	var elementPrototype = (global.HTMLElement || global.Element)['prototype'];
	var getter;

	if (!document.hasOwnProperty('fullscreenEnabled')) {
		getter = (function () {
			if ('webkitIsFullScreen' in document) {
				return function () {
					return (document).webkitFullscreenEnabled;
				};
			}
			if ('mozFullScreenEnabled' in document) {
				return function () {
					return (document).mozFullScreenEnabled;
				};
			}

			return function () {
				return false;
			};
		})();
	}

	if (!document.hasOwnProperty('fullscreenElement')) {
		getter = (function () {
			var i, ii, name = ['webkitCurrentFullScreenElement', 'webkitFullscreenElement', 'mozFullScreenElement'];
			for (i = 0, ii = name.length; i < ii; i++) {
				if (name[i] in document) {
					return function () {
						return document[name[i]];
					};
				}
			}
			return function () {
				return null;
			};
		})();

		Object.defineProperty(document, 'fullscreenElement', {
			enumerable: true,
			configurable: false,
			writeable: false,
			get: getter
		});
	}

	function fullscreenchange() {
		var newEvent = document.createEvent('CustomEvent');
		(newEvent).initCustomEvent('fullscreenchange', true, false, null);

		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenchange', fullscreenchange, false);
	document.addEventListener('mozfullscreenchange', fullscreenchange, false);

	function fullscreenerror() {
		var newEvent = document.createEvent('CustomEvent');
		(newEvent).initCustomEvent('fullscreenerror', true, false, null);

		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenerror', fullscreenerror, false);
	document.addEventListener('mozfullscreenerror', fullscreenerror, false);

	if (!elementPrototype.requestFullScreen) {
		elementPrototype.requestFullScreen = (function () {
			if (elementPrototype.webkitRequestFullScreen) {
				return function () {
					this.webkitRequestFullScreen((Element).ALLOW_KEYBOARD_INPUT);
				};
			}

			if (elementPrototype.mozRequestFullScreen) {
				return function () {
					this.mozRequestFullScreen();
				};
			}

			return function () {
			};
		})();
	}

	if (!(document).exitFullScreen) {
		(document).exitFullScreen = (function () {
			return (document).webkitCancelFullScreen || (document).mozCancelFullScreen || function () {
			};
		})();
	}
})(window);

if (!('setLineDash' in CanvasRenderingContext2D.prototype)) {
	var setLineDash, getLineDash, setLineDashOffset, getLineDashOffset, prototype;

	if ('mozDash' in CanvasRenderingContext2D.prototype) {
		prototype = CanvasRenderingContext2D.prototype;
		setLineDash = function (dash) {
			this.mozDash = dash;
		};
		getLineDash = function () {
			return this.mozDash;
		};

		setLineDashOffset = function (dashOffset) {
			this.mozDashOffset = dashOffset;
		};
		getLineDashOffset = function () {
			return this.mozDashOffset;
		};
	} else {
		prototype = CanvasRenderingContext2D.prototype;
		setLineDash = function () {
		};
		getLineDash = function () {
		};
		setLineDashOffset = function () {
		};
		getLineDashOffset = function () {
		};
	}

	Object.defineProperty(prototype, 'setLineDash', {
		value: setLineDash,
		enumerable: true,
		configurable: false,
		writeable: false
	});

	Object.defineProperty(prototype, 'getLineDash', {
		value: getLineDash,
		enumerable: true,
		configurable: false,
		writeable: false
	});

	Object.defineProperty(prototype, 'lineDashOffset', {
		set: setLineDashOffset,
		get: getLineDashOffset,
		enumerable: true,
		configurable: false,
		writeable: false
	});
}

if ((Object).observe === undefined) {
	(function (global) {
		'use strict';

		var setImmediate = global.setImmediate || global.msSetImmediate;
		var clearImmediate = global.clearImmediate || global.msClearImmediate;
		if (!setImmediate) {
			setImmediate = function (func, args) {
				return setTimeout(func, 0, args);
			};
			clearImmediate = function (id) {
				clearTimeout(id);
			};
		}

		var observerCallbacks = [];

		var NotifierPrototype = Object.create(Object.prototype);
		Object.defineProperty(NotifierPrototype, 'notify', {
			value: function (changeRecord) {
				var notifier = this;
				if (Object(notifier) !== notifier) {
					throw new TypeError('this must be an Object, given ' + notifier);
				}
				if (Object(notifier) !== notifier) {
					throw new TypeError('changeRecord must be an Object, given ' + changeRecord);
				}
				if (!this.target) {
					return;
				}

				var type = changeRecord.type;
				if (typeof type !== 'string') {
					throw new TypeError('changeRecord.type must be a string, given ' + type);
				}

				var changeObservers = notifier.changeObservers;
				if (!changeObservers || changeObservers.length === 0) {
					return;
				}
				var target = notifier.target, newRecord = Object.create(Object.prototype);
				Object.defineProperty(newRecord, 'object', {
					value: target,
					writable: false,
					enumerable: true,
					configurable: false
				});
				for (var prop in changeRecord) {
					if (prop !== 'object') {
						var value = changeRecord[prop];
						Object.defineProperty(newRecord, prop, {
							value: value,
							writable: false,
							enumerable: true,
							configurable: false
						});
					}
				}
				Object.preventExtensions(newRecord);
				enqueueChangeRecord(newRecord, changeObservers);
				setUpChangesDelivery();
			},
			writable: true,
			enumerable: false,
			configurable: true
		});

		var changeDeliveryImmediateUid;

		function setUpChangesDelivery() {
			clearImmediate(changeDeliveryImmediateUid);
			changeDeliveryImmediateUid = setImmediate(deliverAllChangeRecords, 0);
		}

		var notifierProperty = '__notifier__';

		function getNotifier(target) {
			if (!target.hasOwnProperty(notifierProperty)) {
				var notifier = Object.create(NotifierPrototype);
				notifier.target = target;
				notifier.changeObservers = [];

				Object.defineProperty(target, notifierProperty, {
					value: notifier,
					enumerable: false,
					configurable: true,
					writable: true
				});
			}
			return target[notifierProperty];
		}

		var pendingChangesProperty = '__pendingChangeRecords__';

		function enqueueChangeRecord(newRecord, observers) {
			for (var i = 0, l = observers.length; i < l; i++) {
				var observer = observers[i];
				if (!observer.hasOwnProperty(pendingChangesProperty)) {
					Object.defineProperty(observer, pendingChangesProperty, {
						value: null,
						enumerable: false,
						configurable: true,
						writable: true
					});
				}
				var pendingChangeRecords = observer[pendingChangesProperty] || (observer[pendingChangesProperty] = []);
				pendingChangeRecords.push(newRecord);
			}
		}

		var attachedNotifierCountProperty = '___attachedNotifierCount__';

		function cleanObserver(observer) {
			if (!observer[attachedNotifierCountProperty] && !observer[pendingChangesProperty]) {
				var index = observerCallbacks.indexOf(observer);
				if (index !== -1) {
					observerCallbacks.splice(index, 1);
				}
			}
		}

		function deliverChangeRecords(observer) {
			var pendingChangeRecords = observer[pendingChangesProperty];
			observer[pendingChangesProperty] = null;
			if (!pendingChangeRecords || pendingChangeRecords.length === 0) {
				return false;
			}
			try  {
				observer.call(undefined, pendingChangeRecords);
			} catch (e) {
				console.log(e);
			}

			cleanObserver(observer);
			return true;
		}

		function deliverAllChangeRecords() {
			var observers = observerCallbacks.slice(0);
			var anyWorkDone = false;
			for (var i = 0, l = observers.length; i < l; i++) {
				var observer = observers[i];
				if (deliverChangeRecords(observer)) {
					anyWorkDone = true;
				}
			}
			return anyWorkDone;
		}

		(Object).observe = function (target, observer) {
			if (Object(target) !== target) {
				throw new TypeError('target must be an Object, given ' + target);
			}
			if (typeof observer !== 'function') {
				throw new TypeError('observerCallBack must be a function, given ' + observer);
			}

			if (Object.isFrozen(observer)) {
				throw new TypeError('observer cannot be frozen');
			}

			var notifier = getNotifier(target), changeObservers = notifier.changeObservers;

			if (changeObservers.indexOf(observer) === -1) {
				changeObservers.push(observer);
				if (observerCallbacks.indexOf(observer) === -1) {
					observerCallbacks.push(observer);
				}
				if (!observer.hasOwnProperty(attachedNotifierCountProperty)) {
					Object.defineProperty(observer, attachedNotifierCountProperty, {
						value: 0,
						enumerable: false,
						configurable: true,
						writable: true
					});
				}
				observer[attachedNotifierCountProperty]++;
			}
			return target;
		};

		(Object).unobserve = function (target, observer) {
			if (Object(target) !== target) {
				throw new TypeError('target must be an Object, given ' + target);
			}
			if (typeof observer !== 'function') {
				throw new TypeError('observerCallBack must be a function, given ' + observer);
			}
			var notifier = getNotifier(target);
			var changeObservers = notifier.changeObservers;
			var index = notifier.changeObservers.indexOf(observer);
			if (index !== -1) {
				changeObservers.splice(index, 1);
				observer[attachedNotifierCountProperty]--;
				cleanObserver(observer);
			}
			return target;
		};

		(Object).deliverChangeRecords = function (observer) {
			if (typeof observer !== 'function') {
				throw new TypeError('callback must be a function, given ' + observer);
			}
			while (deliverChangeRecords(observer)) {
			}
		};

		(Object).getNotifier = function (target) {
			if (Object(target) !== target) {
				throw new TypeError('target must be an Object, given ' + target);
			}
			return getNotifier(target);
		};
	})(this);
}
//@ sourceMappingURL=MathLib.js.map
