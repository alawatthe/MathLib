// MathLib.js is a JavaScript library for mathematical computations.
//
// ## Version
// v0.6.1 - 2013-12-21  
// MathLib is currently in public beta testing.
//
// ## License
// Copyright (c) 2013 Alexander Zeilmann  
// MathLib.js is [licensed under the MIT license](<http://MathLib.de/en/license>)
//
// ## Documentation
// The source code is annotated using [Docco](https://github.com/jashkenas/docco "View Docco on GitHub")
// (with a modified css-file).
// The syntax is more or less the JSDoc syntax.
// A more detailed documentation will be coming soon.
//
//
// ## Code structure
// The code is separated into several modules.
// The first module contains some internal functions
//
// Next is the [Expression](#Expression "Jump to the Expression implementation") module 
// and the [functions](#Functn "Jump to the function implementation") module.
//
// Then drawing modules:
//
// - [screen](#Screen "Jump to the screen implementation")
// - [screen2D](#Screen2D "Jump to the implementation for 2D plotting")
// - [screen3D](#Screen3D "Jump to the implementation for 3D plotting")
//
// The next module is the [vector](#Vector "Jump to the vector implementation") module, because the Point and the Line module depend on it.
//
// And at last the other modules in alphabetic order:
//
// - [circle](#Circle "Jump to the circle implementation")
// - [complex](#Complex "Jump to the complex number implementation")
// - [expression](#Expression "Jump to the expression implementation")
// - [line](#Line "Jump to the line implementation")
// - [matrix](#Matrix "Jump to the matrix implementation")
// - [permutation](#Permutation "Jump to the permutation implementation")
// - [point](#Point "Jump to the point implementation")
// - [polynomial](#Polynomial "Jump to the polynomial implementation")
// - [rational](#Rational "Jump to the rational number implementation")
// - [set](#Set "Jump to the set implementation")
// The MathLib module which wraps everything
module MathLib {


	// Typescript is throwing the following error otherwise:
	// The property 'methodname' does not exist on value of type 'MathLib'
	// see [http://typescript.codeplex.com/discussions/397908](http://typescript.codeplex.com/discussions/397908)
	declare var MathLib : any;
	declare var MathJax : any;
	declare var THREE : any;



	MathLib.version = '0.6.1';
	MathLib.apery = 1.2020569031595942;
	MathLib.e = Math.E;
	// Number.EPSILON is probably coming in ES6
	// (see section 20.1.2.1 in the current draft)
	MathLib.epsilon = (<any>Number).EPSILON || (function () {
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

	MathLib.argToRgba = function (h){
  	var r, g, b;
  	h = -h / (2 * Math.PI);

  	function hue2rgb(t){
   	  if (t < 0) {
   	  	t += 1;
   	  }
     	if (t > 1) {
     		t -= 1;
     	}
     	if (t < 1/6) {
     		return 6 * t;
     	}
     	if (t < 1/2) {
     		return 1;
     	}
     	if (t < 2/3) {
     		return 4 - 6*t;
     	}
      return 0;
 	 }

  	r = hue2rgb(h + 1/3);
  	g = hue2rgb(h);
  	b = hue2rgb(h - 1/3);

  	return [r * 255, g * 255, b * 255, 255];
	};


	var flatten = function (a) {
				var flattendArray = [];
				a.forEach(function (x) {
					if (Array.isArray(x)) {
						flattendArray = flattendArray.concat(flatten(x));
					}
					else {
						flattendArray.push(x);
					}
				});
				return flattendArray;
			},
			extendObject = function (dest, src) {
				for (var prop in src) {
					if (typeof dest[prop] === 'object' && typeof src[prop] === 'object') {
						dest[prop] = extendObject(dest[prop], src[prop]);
					}
					else {
						dest[prop] = src[prop];
					}
				}
				return dest;
			},

			// A little function converting arrays to THREE.js vectors
			to3js = function (x) {
				if (x.length === 2) {
					return new THREE.Vector2(x[0], x[1]);
				}
				else if (x.length === 3) {
					return new THREE.Vector3(x[0], x[1], x[2]);
				}
			},

			colorConvert = function (n) {
				if (typeof n === 'number') {
					n = Math.max(Math.min(Math.floor(n), 0xffffff), 0);
					return '#' + ('00000' + n.toString(16)).slice(-6); 
				}
				return n;
			};
			
MathLib.extendObject = extendObject;


var template = function (data) {var p = [];p.push(' <figure class="MathLib_figure">     <div class="MathLib_wrapper" style="width: ');
p.push(data.width);
p.push('px; height: ');
p.push(data.height);
p.push('px">   <div class="MathLib_info_message">Your browser does not seem to support WebGL.<br>   Please update your browser to see the plot.</div>  </div>      ');
if (data.figcaption) {
	p.push('   <figcaption class="MathLib_figcaption">');
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
return p.join("");
}


var errors = [],
		warnings = [];


// ### [MathLib.on()](http://mathlib.de/en/docs/on)
// Binds an event handler to an event.
// 
// *@param {string}* The name of the event.  
// *@param {function}* The callback function.  
MathLib.on = function (type, callback) {
	if (type === 'error') {
		errors.push(callback);
	}
	else if (type === 'warning') {
		warnings.push(callback);
	}
}


// ### [MathLib.off()](http://mathlib.de/en/docs/off)
// Unbinds an event handler from an event.
//
// *@param {string}* The name of the event.  
// *@param {function}* The callback function.  
MathLib.off = function (type, callback) {
	if (type === 'error') {
		errors = errors.filter(x => x !== callback);
	}
	else if (type === 'warning') {
		warnings = warnings.filter(x => x !== callback);
	}
}


// ### MathLib.error()
// Fires an error event.
//
// *@param {oject}* An object describing the error further.  
MathLib.error = function (details) {
	errors.forEach(function (cb) {
		cb(details);
	});
};


// ### MathLib.warning()
// Fires a waring event.
//
// *@param {object}* An object describing the warning further.  
MathLib.warning = function (details) {
	warnings.forEach(function (cb) {
		cb(details);
	});
};


// ## <a id="Expression" href="http://mathlib.de/en/docs/Expression">Expression</a>
// MathLib.Expression is the MathLib implementation of symbolic expressions

export class Expression {

	type = 'expression';

	arguments: string[];
	content: any;
	isMethod: boolean;
	mode: string;
	name: string;
	subtype: string;
	value: any;


	constructor(expr = {}) {
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


// ### [Expression.prototype.compare()](http://mathlib.de/en/docs/Expression/compare)
// Compares two expressions
//
// *@param {Expression}* The expression to compare  
// *@return {number}*
compare(e) {
	return MathLib.sign(this.toString().localeCompare(e.toString()));
}


// ### Expression.constant
// Constructs a constant expression.
//
// *@return {Expression}*
static constant(n) : Expression {
	return new MathLib.Expression({
		subtype: 'constant',
		value: n
	});
}


// ### <a href="http://mathlib.de/en/docs/Expression/evaluate">Expression.prototype.evaluate</a>
// Evaluates the symbolic expression
//
// *@return {any}*
evaluate() : any {

	if (this.subtype === 'binaryOperator') {
		return MathLib[this.name].apply(null, this.content.map(x => x.evaluate()));
	}
	if (this.subtype === 'brackets') {
		return this.content.evaluate();
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return new MathLib.Complex(this.value[0].evaluate(), this.value[1].evaluate());
		}
		else if (this.mode === 'polar') {
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
			var args = this.content.map(x => x.evaluate()),
					_this = args.shift();

			return _this[this.value].apply(_this, args);
		}
		else {
			return MathLib[this.value].apply(null, this.content.map(x => x.evaluate()));
		}
	}
	if (this.subtype === 'functionDefinition') {
		return new MathLib.Functn(this.content[0].evaluate(), {
			name: 'f', 
			expression: this.value
		});
	}
	if (this.subtype === 'matrix') {
		return new MathLib.Matrix(this.value.map(r => r.map(c => c.evaluate())));
	}
	if (this.subtype === 'number') {
		return parseFloat(this.value);
	}
	if (this.subtype === 'naryOperator') {
		return MathLib[this.name].apply(null, this.content.map(x => x.evaluate()));
	}
	if (this.subtype === 'rationalNumber') {
		return new MathLib.Rational(this.value[0].evaluate(), this.value[1].evaluate());
	}
	if (this.subtype === 'set') {
		return new MathLib.Set(this.value.map(x => x.evaluate()));
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
		return new MathLib.Vector(this.value.map(x => x.evaluate()));
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return MathLib.negative(this.content.evaluate())
		}
		return this.content.evaluate();
	}

}


// ### Expression.prototype.map
// Maps the expression tree over to an other expression tree.
//
// *@return {Expression}*
map(f) : Expression {
	var prop,
			properties = {},
			mappedProperties;

	for (prop in this) {
		if (this.hasOwnProperty(prop) && prop !== 'content') {
			properties[prop] = this[prop];
		}
	}

	mappedProperties = f(properties);
	if (Array.isArray(this.content)) {
		mappedProperties.content = this.content.map(expr => expr.map(f));
	}
	else if (this.content) {
		mappedProperties.content = this.content.map(f);
	}

	return new MathLib.Expression(mappedProperties);
}


// ### Expression.number
// Constructs a number expression.
//
// *@return {Expression}*
static number(n) : Expression {
	return new MathLib.Expression({
		subtype: 'number',
		value: n
	});
}


// ### <a href="http://mathlib.de/en/docs/Expression/parse">Expression.parse</a>
// 
// Heavily based on Ariya Hidayat's [tapdigit library](https://code.google.com/p/tapdigit/)
// and his series "math evaluator in javascript":  
// [Part 1: tokenizer](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part1.html)  
// [Part 2: parser](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part-2.html)  
// [Part 3: interpreter](http://ariya.ofilabs.com/2011/08/math-expression-evaluator-in-javascript-part-3.html)  
//
// *@return {Expression}*
static parse = function (str) {

	var Token, Lexer, Parser;

	Token = {
		Operator: 'Operator',
		Identifier: 'Identifier',
		Number: 'Number'
	};

	Lexer = function () {
		var expression = '',
				length = 0,
				index = 0,
				marker = 0,
				T = Token;

		function peekNextChar () {
			var idx = index;
			return ((idx < length) ? expression.charAt(idx) : '\x00');
		}

		function getNextChar () {
			var ch = '\x00',
				idx = index;
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
			try {
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

		var lexer = new Lexer(),
				T = Token;

		function matchOp(token, op) {
			return (typeof token !== 'undefined') &&
				token.type === T.Operator &&
				token.value === op;
		}

		// ArgumentList := Expression |
		//                 Expression ',' ArgumentList
		function parseArgumentList() {
			var token, expr, args = [];

			while (true) {
				expr = parseExpression();
				if (typeof expr === 'undefined') {
					// TODO maybe throw exception?
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
		//                    Exponentiation '^' Unary |
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
				}
				
				else {
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
				}
				
				else {
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
		function parseAssignment() {
			var expr;

			expr = parseAdditive();

			/*
			TODO: support assignments
			if (typeof expr !== 'undefined' && expr.Identifier) {
				token = lexer.peek();
				if (matchOp(token, '=')) {
					lexer.next();
					return new MathLib.Expression({
							subtype: 'Assignment',
							name: expr,
							value: parseAssignment()
						});
				}
				return expr;
			}
			*/

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


	return Parser().parse(str);
};


// ### Expression.prototype.parseContentMathML
// Parses a content MathML string and returns an Expression.
//
// *@return {Expression}*
static parseContentMathML(MathMLString) : Expression {
	var tokenizer = new DOMParser(),
			MathMLdoc;


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
		}
		// We are in cs element, so don't do anything.
		else {
			return x;
		}
	}).join('cs>');


	// Gives an error in Firefox
	//* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); *
	MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');


	var handler = {
		apply: function (node) {
			var children = Array.prototype.slice.call(node.childNodes),
					functnName = children.shift().nodeName,
					isMethod = true,
					functnNames = {
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
			var type = node.getAttribute('type') !== null ? node.getAttribute('type') : 'number';

			if (type === 'number') {
				/* TODO: base conversions
				var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10'; */
				return parser(node.childNodes[0]);
			}
			else if (type === 'rational') {
				return new MathLib.Expression({
					value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
					subtype: 'rationalNumber'
				});
			}
			else if (type === 'complex-cartesian') {
				return new MathLib.Expression({
					value: [parser(node.childNodes[0]), parser(node.childNodes[2])],
					subtype: 'complexNumber',
					mode: 'cartesian'
				});
			}
			else if (type === 'complex-polar') {
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
			var bvar = node.childNodes[0],
					doa = node.childNodes[1],
					apply = node.childNodes[2];

			return new MathLib.Expression({
				subtype: 'functionDefinition',
				domain: doa.childNodes[0].nodeName,
				arguments: Array.prototype.map.call(bvar.childNodes, variable => new MathLib.Expression.variable(variable.textContent)),
				content: [parser(apply)]
			})
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
	}

	var parser = function (node) {
		if (Array.isArray(node)) {
			var nodes = node.map(parser);
			return nodes;
		}

		return handler[node.nodeName](node);
	};

	return parser(MathMLdoc.childNodes[0]) ;
}


// ### <a href="http://mathlib.de/en/docs/Expression/toContentMathML">Expression.prototype.toContentMathML</a>
// Convert the Expression to MathML.
//
// *@return {string}*
toContentMathML() : string {

	if (this.subtype === 'binaryOperator') {
		var op = this.name === 'pow' ? 'power' : this.name;

		return '<apply><csymbol cd="arith1">' + op + '</csymbol>' +
			this.content[0].toContentMathML() +
			this.content[1].toContentMathML() +
			'</apply>';
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
		return '<apply><csymbol cd="arith1">' + this.name + '</csymbol>' +
			this.content.map(expr => expr.toContentMathML()).join('') +
		'</apply>';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '<apply><csymbol cd="arith1">unary_minus</csymbol>' +
				this.content.toContentMathML() +
			'</apply>';
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
				},
				funcName;

		if (this.value in conversion) {
			funcName = conversion[this.value];
		}
		else {
			funcName = this.value;
		}

		return '<apply><csymbol cd="transc1">' + funcName + '</csymbol>' +
			this.content.map(expr => expr.toContentMathML()).join('') +
			'</apply>';
	}

	if (this.subtype === 'functionDefinition') {
		return '<lambda><bvar><ci>' +
			this.arguments.join('</ci></bvar><bvar><ci>') +
			'</ci></bvar>' +
			this.content.map(expr => expr.toContentMathML()) +
			'</lambda>';
	}
}


// ### <a href="http://mathlib.de/en/docs/Expression/toLaTeX">Expression.prototype.toLaTeX</a>
// Convert the expression to a LaTeX string
//
// *@return {string}*
toLaTeX(opts = {}) : string {
	var op;

	if (this.subtype === 'binaryOperator') {
		var str;

		if (this.value === '/') {
			str = '\\frac{' + this.content[0].toLaTeX() + '}';
		}
		else {
			str = this.content[0].toLaTeX() + this.value;
		}

		str += this.value !== '-' ? '{' : '';
		str += this.content[1].toLaTeX();
		str += this.value !== '-' ? '}' : '';

		return str;
	}
	if (this.subtype === 'brackets') {
		return '\\left(' + this.content.toLaTeX(opts) + '\\right)';
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return this.value[0] + '+' + this.value[1] + 'i';
		}
		else if (this.mode === 'polar') {
			return this.value[0] + ' \\cdot e^{' + this.value[1] + 'i}';
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return '\\pi';
		}
	}
	if (this.subtype === 'matrix') {
		return '\\begin{pmatrix}' 
			+ this.value.map(row => row.map(col => col.toLaTeX()).join('&') ).join('\\\\') 
			+ '\\end{pmatrix}';
	}
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		op = this.value === '*' ? '\\cdot' : this.value;
		return this.content.reduce((old, cur, idx) => old + (idx ? op : '') + cur.toLaTeX(opts), '');
	}
	if (this.subtype === 'rationalNumber') {
		return '\\frac{' + this.value[0].toLaTeX() + '}{' + this.value[1].toLaTeX() + '}';
	}
	if (this.subtype === 'set') {
		return '\\left{' + this.value.map(x => x.toLaTeX()).join(', ') + '\\right}';
	}
	if (this.subtype === 'string') {
		return '\\texttt{"{}' + this.value + '"}';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toLaTeX(opts)
		}
		return this.content.toLaTeX(opts);
	}
	if (this.subtype === 'vector') {
		return '\\begin{pmatrix}' + this.value.map(x => x.toLaTeX()).join('\\\\') + '\\end{pmatrix}';
	}

	if (this.subtype === 'functionCall') {
		// These operators are predefined by amsmath.
		// (There are more predefined ones, but these are the useful ones.)
		if (['arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim', 
		'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'].indexOf(this.value) + 1) {
			return '\\' + this.value + '\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ',' : '') + cur.toLaTeX(opts), '')
				: 'x') +
				'\\right)';
		}
		else if (this.value === 'exp') {
			return 'e^{' + (this.content.length ? this.content[0].toLaTeX(opts) : 'x') + '}';
		}
		else if (this.value === 'sqrt') {
			return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX(opts) : 'x') + '}';
		}
		else {
			return '\\operatorname{' + this.value + '}\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ',' : '') + cur.toLaTeX(opts), '') 
				: 'x') +
				'\\right)';
		}

	}

	if (this.subtype === 'functionDefinition') {
		return (this.arguments.length === 1
			? this.arguments[0]
			: '\\left(' + this.arguments.join(', ') + '\\right)') +
			
			' \\longmapsto ' +

			(this.content.length === 1
			? this.content[0].toLaTeX()
			: '\\left(' + this.content.map(expr => expr.toLaTeX()).join(', ') + '\\right)') 
	}
}


// ### <a href="http://mathlib.de/en/docs/Expression/toMathML">Expression.prototype.toMathML</a>
// Convert the Expression to MathML.
//
// *@return {string}*
toMathML() : string {

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
			return  '<mrow>' + this.value[0].toMathML() + '<mo>+</mo>' + this.value[1].toMathML() + '<mi>i</mi></mrow>';
		}
		else if (this.mode === 'polar') {
			return this.value[0].toMathML() + '<msup><mi>e</mi><mrow>' 
				+ this.value[1].toMathML() + '<mi>i</mi></mrow></msup>';
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return '<mi>&pi;</mi>';
		}
	}
	if (this.subtype === 'matrix') {
		return '<mrow><mo>(</mo><mtable><mtr><mtd>' 
			+ this.value.map(row => row.map(col => col.toMathML()).join('</mtd><mtd>') ).join('</mtd></mtr><mtr><mtd>') 
			+ '</mtd></mtr></mtable><mo>)</mo></mrow>';
	}
	if (this.subtype === 'number') {
		return '<mn>' + this.value + '</mn>';
	}
	if (this.subtype === 'rationalNumber') {
		return '<mfrac>' + this.value[0].toMathML() + this.value[1].toMathML() + '</mfrac>';
	}
	if (this.subtype === 'set') {
		return '<mrow><mo>{</mo>' + this.value.map(x => x.toMathML()).join('<mo>,</mo>') + '<mo>}</mo></mrow>';
	}
	if (this.subtype === 'string') {
		return '<ms>' + this.value + '</ms>';
	}
	if (this.subtype === 'variable') {
		return '<mi>' + this.value + '</mi>';
	}
	if (this.subtype === 'vector') {
		return '<mrow><mo>(</mo><mtable><mtr><mtd>' + this.value.map(x => x.toMathML()).join('</mtd></mtr><mtr><mtd>') + '</mtd></mtr></mtable><mo>)</mo></mrow>';
	}
	if (this.subtype === 'naryOperator') {
		return '<mrow>' + this.content.map(expr => expr.toMathML()).join('<mo>' + 
			(this.value === '*'
			? '&middot;'
			: this.value) +
			'</mo>') + '</mrow>';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '<mo>-</mo>' + this.content.toMathML()
		}
		return this.content.toMathML();
	}
	if (this.subtype === 'functionCall') {
		return '<mrow><mi>' + this.value + '</mi><mo>&af;</mo><mrow><mo>(</mo>' +
		( this.content.length
		? this.content.map(expr => expr.toMathML()).join('')
		: '<mi>x</mi>') +
		'<mo>)</mo></mrow></mrow>';
	}

	if (this.subtype === 'functionDefinition') {
		return '<mrow>' +
			(this.arguments.length === 1
			? '<mi>' + this.arguments[0] + '</mi>'
			: '<mrow><mo>(</mo><mi>' + this.arguments.join('</mi><mo>,<mo><mi>') + '</mi><mo>)</mo></mrow>') +
			
			'<mo>&#x27FC;</mo>' +

			(this.content.length === 1
			? this.content[0].toMathML()
			: '<mrow><mo>(</mo>' + this.content.map(expr => expr.toMathML()) + '<mo>)</mo></mrow>') +
			'</mrow>';
	}
}


// ### <a href="http://mathlib.de/en/docs/Expression/toString">Expression.prototype.toString</a>
// A custom toString function
//
// *@return {string}*
toString() : string {

	if (this.subtype === 'binaryOperator') {
		return this.content[0].toString() + this.value + this.content[1].toString();
	}
	if (this.subtype === 'brackets') {
		return '(' + this.content.toString() + ')';
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return this.value[0] + '+' + this.value[1] + 'i';
		}
		else if (this.mode === 'polar') {
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
		return this.value.map(row => row.map(col => col.toString()).join('\t') )
			.map(function (row, index) {
				if (index === 0) {
					return '⎛' + row + '⎞';
				}
				else if (index === length - 1) {
					return '⎝' + row + '⎠';
				}
				else {
					return  '⎜' + row + '⎟';
				}
			}).join('\n');
	}
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		return this.content.reduce((old, cur) => old + this.value + cur);
	}
	if (this.subtype === 'rationalNumber') {
		return this.value[0].toString() + '/' + this.value[1].toString();
	}
	if (this.subtype === 'set') {
		return '{' + this.value.map(x => x.toString()).join(', ') + '}';
	}
	if (this.subtype === 'string') {
		return '"' + this.value + '"';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toString()
		}
		return this.content.toString();
	}
	if (this.subtype === 'vector') {
		return '(' + this.value.map(x => x.toString()).join(', ') + ')';
	}
	if (this.subtype === 'functionCall') {
		return this.value + '(' +
			(this.content.length 
			? this.content.map((expr) => expr.toString()).join(', ')
			: 'x') +
			')';
	}
	if (this.subtype === 'functionDefinition') {
		return (this.arguments.length === 1
			? this.arguments[0]
			: '(' + this.arguments.join(', ') + ')') +
			
			' ⟼ ' +

			(this.content.length === 1
			? this.content[0].toString()
			: '(' + this.content.map(expr => expr.toString()).join(', ') + ')') 
	}
}


// ### Expression.variable
// Constructs a variable expression.
//
// *@return {Expression}*
static variable(n) : Expression {
	return new MathLib.Expression({
		subtype: 'variable',
		value: n
	});
}


// ### Expression.variables
// Stores all the values of variables in symbolic expressions.
//
// *@return {Expression}*
static variables = {};


}// ## <a id="Functn" href="http://mathlib.de/en/docs/Functn">Functn</a>
//
// Because 'Function' is a reserved word in JavaScript,
// the module is called 'Functn'.  

var functnPrototype : any = {};

MathLib.Functn = function (f, options) {
	options = options || {};

	var functn = function (x) {
		if (typeof x === 'number' || typeof x === 'boolean') {
			return f.apply('', arguments);
		}
		else if (x.type === 'functn') {
			
			// x -> f(x)
			// y -> g(y)
			// y -> f(g(y))
			var bvar = options.expression.arguments[0].value,
					composition = options.expression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {
							expr = x.expression.content[0];
						}
						return expr;
					});

			return new MathLib.Functn(function (y) {return f(x(y));}, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: x.expression.arguments,
						content: composition.content
					})
				});
		}
		else if (x.type === 'expression' && x.subtype === 'variable') {
			return new MathLib.Functn(f, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: x,
						content: x
					})
				});
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'complex') {
			return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (x.type === 'rational') {
			return f(x.toNumber());
		}
		else if (x.type === 'set') {
			return x.map(f);
		}
		else if (MathLib.type(x) === 'array') {
			return x.map(f);
		}
		else {
			return x[options.name]();
		}
	};

	for (var name in functnPrototype) {
		if (functnPrototype.hasOwnProperty(name)) {
			functn[name] = functnPrototype[name];
		}
	}
	(<any>functn).type = 'functn';
	(<any>functn).constructor = MathLib.Functn;


	Object.defineProperties(functn, {
		id: { value: options.name},
		expression: {value: options.expression}
	});

	return functn;
};


var binaryFunctions = {
	arctan2: Math.atan2,
	binomial: function (n, k) {
		// TODO: non integer values
		// What should be done with very big numbers?
		var binomial = 1, i, sign;

		// not finite means ±∞ or NaN
		if (MathLib.isNaN(n) || !MathLib.isFinite(k)) {
			return NaN;
		}

		// Exit early for areas which return 0
		if ( (n >= 0 && k <= -1)
			|| (n >= 0 && k > n)
			|| (k <  0 && k > n)) {
			return 0;
		}

		if (n < 0) {
			if (k < 0) {
				// negative odd number % 2 = -1 and not +1
				// This leads to the + 1 here.
				return ((n + k) % 2 * 2 + 1) * MathLib.binomial(-k - 1, -n - 1);
			}
			else {
				if (k === 0) {
					sign = 1;
				}
				else {
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
	},
};


var createBinaryFunction = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply('', arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
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


// ### [Functn.prototype.diff()](http://mathlib.de/en/docs/Functn/diff)
// Numeric derivative at a given point
//
// *@param {number}* The point  
// *@param {number}* Optional step size  
// *@return {number}*
functnPrototype.diff = function (x: number, h = 1e-5) : number {
	return (this(x + h) - this(x - h)) / (2 * h);
};


// ### [Functn.prototype.draw()](http://mathlib.de/en/docs/Functn/draw)
// Draws the function on the screen
//
// *@param {Screen}* The screen to draw the function onto.  
// *@param {object}* [options] Optional drawing options.  
// *@return {Functn}*
functnPrototype.draw = function (screen, options : any = {}) : number {
	var functn = this;
	if (Array.isArray(screen)) {
		screen.forEach(function (x) {
			x.path(functn, options);
		});
	}
	else {
		screen.path(functn, options);
	}

	return this;
};


// These functions will be added to the functn prototype soon.
var functionList1 = {
	divisors: function (x) {
		var divisors = x === 1 ? [] : [1],
				i, ii;
		for (i = 2, ii = x / 2; i <= ii; i++) {
			if (x % i === 0) {
				divisors.push(i);
			}
		}
		divisors.push(x);
		return MathLib.set(divisors);
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
	fallingFactorial: function (n, m, s) {
		var factorial = 1, j;
		s = s || 1;

		for (j = 0; j < m; j++) {
			factorial  *= (n - j * s);
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
			factorial  *= (n + j * s);
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
	},
	toContentMathML: function (x) {
		if (typeof x === 'number') {
			return '<cn>' + x + '</cn>';
		}
		else {
			return x.toContentMathML();
		}
	},
	toLaTeX: function (x, plus) {
		if (plus) {
			return (x < 0 ? '-' : '+') + Math.abs(x);
		}
		else {
			return (x < 0 ? '-' : '') + Math.abs(x);
		}
	},
	toMathML: function (x, plus) {
		if (plus) {
			return '<mo>' + (x < 0 ? '-' : '+') + '</mo><mn>' + Math.abs(x) + '</mn>';
		}
		else {
			return (x < 0 ? '<mo>-</mo>': '') + '<mn>' + Math.abs(x) + '</mn>';
		}
	},
	toString: function (x, plus) {
		if (plus) {
			return (x < 0 ? '-' : '+') + Math.abs(x);
		}
		else {
			return (x < 0 ? '-' : '') + Math.abs(x);
		}
	}
};




var createFunction1 = function (f, name) {
	return function (x) {
		if (typeof x === 'number') {
			return f.apply('', arguments);
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'set') {
			return new MathLib.Set( x.map(f) );
		}
		else if (x.type === 'complex') {
			return x[name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (Array.isArray(x)) {
			return x.map(f);
		}
		else {
			return x[name]();
		}
	};
};


// Add the functions to the MathLib object
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
	}
	else if (typeof a === 'number') {
		return MathLib.sign(a - b);
	}
	else if (typeof a === 'string') {
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
		return str.slice(0,1).toUpperCase() + str.slice(1);
	};

	if (MathLib.type(obj) === type) {
		return true;
	}
	else if (['circle', 'complex', 'expression', 'functn', 'line', 'matrix', 'permutation', 'point',
			'polynomial', 'rational', 'screen', 'screen2d', 'screen3d', 'set', 'vector'].indexOf(type) !== -1) {
		return obj instanceof MathLib[ucfirst(type)];
	}
	else {
		return obj instanceof window[ucfirst(type)];
	}
}


// ### MathLib.isMathMLSupported()
// Checks if MathML is supported by the browser.  
// Code stolen from [Modernizr](http://www.modernizr.com/)
//
// *@return {boolean}*
MathLib.isMathMLSupported = function () : boolean {
	var hasMathML = false,
			ns, div, mfrac;
	if (document.createElementNS) {
		ns = 'http://www.w3.org/1998/Math/MathML';
		div = document.createElement('div');
		div.style.position = 'absolute';
		mfrac = div.appendChild(document.createElementNS(ns, 'math'))
								.appendChild(document.createElementNS(ns, 'mfrac'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('xx'));
		mfrac.appendChild(document.createElementNS(ns, 'mi'))
				 .appendChild(document.createTextNode('yy'));
		document.body.appendChild(div);
		hasMathML = div.offsetHeight > div.offsetWidth;
		document.body.removeChild(div);
	}
	return hasMathML;
};


// ### MathLib.writeMathML()
// Writes MathML to an element.
//
// *@param {string}* The id of the element in which the MathML should be inserted.  
// *@param {string}* The MathML to be inserted.
MathLib.writeMathML = function (id : string, math : string) : void {
	var formula;
	document.getElementById(id).innerHTML = '<math>' + math + '</math>';
	if (typeof MathJax !== 'undefined') {
		formula = MathJax.Hub.getAllJax(id)[0];
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
	}
}


// ### MathLib.loadMathJax()
// Loads MathJax dynamically.
//
// *@param {string}* [config] Optional config options
MathLib.loadMathJax = function (config : string) : void {
	var script = <HTMLScriptElement>document.createElement('script');
	script.type = 'text/javascript';
	script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

	config = config ||	'MathJax.Hub.Config({' +
												'config: ["MMLorHTML.js"],' +
												'jax: ["input/TeX", "input/MathML", "output/HTML-CSS", "output/NativeMML"],' +
												'extensions: ["tex2jax.js", "mml2jax.js", "MathMenu.js", "MathZoom.js"],' +
												'TeX: {' +
													'extensions: ["AMSmath.js", "AMSsymbols.js", "noErrors.js", "noUndefined.js"]' +
												'}' +
										 	'});';

	if ((<any>window).opera) {
		script.innerHTML = config;
	}
	else {
		script.text = config;
	}

	document.getElementsByTagName('head')[0].appendChild(script);
}


// Functions that act on set-like structures and return one single number/boolean...
var nAryFunctions = {
	// ### MathLib.and()
	// Returns true iff all arguments are true.
	//
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	and: function (n) {
		return n.every(function (x) {return !!x;});
	},
	arithMean: function (n) {
		return MathLib.plus(n) / n.length;
	},
	gcd: function (a) {
		var min,
				reduction = function (x) {
					return x !== min ? x % min : x;
				},
				isntZero = function (x) {
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
		return n.length / MathLib.plus(n.map(MathLib.inverse));
	},
	hypot: function (n) {
		var a, b, max, min;

		if (n.length === 1) {
			return Math.abs(n[0]);
		}

		if (n.length > 2) {
			return n.reduce((a, b) => MathLib.hypot(a, b));
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
	// ### MathLib.isEqual()
	// Determines if all arguments are equal.
	//
	// *@param {number, MathLib object}* Expects an arbitrary number of numbers or MathLib objects  
	// *@return {boolean}*
	isEqual: function (n) {
		return n.every(function (a, i, args) {
			if (a === args[0]) {
				return true;
			}
			else if (typeof a === 'number' && typeof args[0] === 'number') {
				return Math.abs(a - args[0]) <= 3e-15;
			}
			else if (typeof a === 'object') {
				return a.isEqual(args[0]);
			}
			else if (typeof args[0] === 'object') {
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
		}
		else if (n.length === 2) {
			return MathLib.times(n) / MathLib.gcd(n);
		}
		else if (n.length > 2) {
			return n.reduce((x, y) => MathLib.lcm(x, y));
		}
	},
	max: function (n) {
		return Math.max.apply(null, n);
	},
	min: function (n) {
		return Math.min.apply(null, n);
	},
	// ### MathLib.or()
	// Returns true iff at least one argument is true.
	//
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	or: function (n) {
		return n.some(function (x) {return !!x;});
	},
	plus: function (n) {
		if (n.length === 0) {
			return 0;
		}
		return n.reduce(function (a, b) {
			var f1, f2, aExpr, bExpr;
			if (typeof a === 'number' && typeof b === 'number') {
				return a + b;
			}
			else if (a.type === 'functn' || b.type === 'functn') {
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
				}
				else if (b.type !== 'functn') {
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
						content: [new MathLib.Expression({
								content: [aExpr, bExpr],
								subtype: 'naryOperator',
								value: '+',
								name: 'plus'
							})
						]
					})
				});
			}
			else if (typeof a === 'object') {
				return a.plus(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
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
			}
			else if (a.type === 'functn' || b.type === 'functn') {
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
				}
				else if (b.type !== 'functn') {
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
						content: [new MathLib.Expression({
								content: [aExpr, bExpr],
								subtype: 'naryOperator',
								value: '*',
								name: 'times'
							})
						]
					})
				});
			}
			else if (typeof a === 'object') {
				return a.times(b);
			}
			// We're assuming that the operations are commutative
			else if (typeof b === 'object') {
				return b.times(a);
			}
		});
	},
	// ### MathLib.xor()
	// Returns true iff an odd number of the arguments is true.
	//
	// *@param {boolean}* Expects an arbitrary number of boolean arguments  
	// *@return {boolean}*
	xor: function (n) {
		return n.reduce(function (x, y) {return x + !!y;}, 0) % 2 !== 0;
	}
};


var createNaryFunction = function (f) {
	return function (n) {
		if (MathLib.type(n) === 'set') {
			return f(n.slice());
		}
		else if (MathLib.type(n) !== 'array') {
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


// ### [Functn.prototype.quad()](http://mathlib.de/en/docs/Functn/quad)
// Numeric evaluation of an integral using an adative simpson approach.
// 
// Inspired by "adaptsim.m" by Walter Gander
// and MatLab's "quad.m"
// 
// *@param {number}* The starting point  
// *@param {number}* The end point  
// *@param {number}* The tolerance  
// *@return {number}*
functnPrototype.quad = function (a, b, options : any = {}) : number {
	
	var f = this,
			warnMessage = [
				'Calculation succeded',
				'Minimum step size reached',
				'Maximum function count exceeded',
				'Infinite or NaN function value encountered'
			],
			Q;

	options.calls = 3;
	options.warn = 0;


	if (a === -Infinity) {
		a = -Number.MAX_VALUE;
	}

	if (b === 	Infinity) {
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
}



// Recursive function for the quad method
var quadstep = function  (f, a, b, fa, fc, fb, options) {

	var h = b - a,
			c = (a + b) / 2,
			fd = f((a + c) / 2),
			fe = f((c + b) / 2),

			// Three point Simpson's rule
			Q1 = (h / 6) * (fa + 4 * fc + fb),

			// Five point double Simpson's rule
			Q2 = (h / 12) * (fa + 4 * fd + 2 * fc + 4 * fe + fb),

			// Romberg extrapolation
			Q = Q2 + (Q2 - Q1) / 15;

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
	return quadstep(f, a, c, fa, fd, fc, options) +
					quadstep(f, c, b, fc, fe, fb, options);
}


// ### Functn.prototype.toContentMathML()
// Returns a content MathML representation of the function
//
// *@return {MathML}*
functnPrototype.toContentMathML = function () {
	return this.expression.toContentMathML();
};


// ### [Functn.prototype.toLaTeX()](http://mathlib.de/en/docs/Functn/toLaTeX)
// Returns a LaTeX representation of the function
//
// *@return {string}*
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


// ### Functn.prototype.toMathML()
// Returns a MathML representation of the function
//
// *@return {string}*
functnPrototype.toMathML = function () {
	return this.expression.toMathML();
};


// ### Functn.prototype.toMathMLString
// Returns a MathML representation of the function
//
// *@return {string}*
/*functnPrototype.toMathMLString = function () {
	return this.contentMathML.toMathMLString();
};*/


// ### [Functn.prototype.toString()](http://mathlib.de/en/docs/Functn/toString)
// Returns a string representation of the function
//
// *@return {string}*
functnPrototype.toString = function () {
	return this.expression.toString();

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
}


// ## unary functions
// Some functions for the functn prototype
var unaryFunctions = {
	abs: Math.abs,
	arccos: Math.acos,
	arccot: function (x) {
		return 1.5707963267948966 - Math.atan(x);
	},
	arccsc: function (x) {
		return Math.asin(1 / x);
	},
	arcosh: MathLib.isNative((<any>Math).acosh) || function (x) {
		return Math.log(x + Math.sqrt(x * x - 1));
	},
	arcoth: function (x) {
		// Handle ±∞
		if (!MathLib.isFinite(x)) {
			return 1 / x;
		}
		return 0.5 * Math.log((x + 1) / (x - 1));
	},
	arcsch: function (x) {
		// Handle ±0 and ±∞ separately
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
	arsinh: MathLib.isNative((<any>Math).asinh) || function (x) {
		// Handle ±0 and ±∞ separately
		if (x === 0 || !MathLib.isFinite(x)) {
			return x;
		}
		return Math.log(x + Math.sqrt(x * x + 1));
	},
	artanh: MathLib.isNative((<any>Math).atanh) || function (x) {
		// Handle ±0
		if (x === 0) {
			return x;
		}
		return 0.5 * Math.log((1 + x) / (1 - x));
	},
	ceil: function (x) {
		// Some implementations have a bug where Math.ceil(-0) = +0 (instead of -0)
		if (x === 0) {
			return x;
		}
		return Math.ceil(x);
	},
	cbrt: function (x) {
		var a3, a3x, an, a;

		// Handle ±0, NaN, ±∞
		if (x === 0 || x !== x || x === Infinity || x === -Infinity) {
			return x;
		}
		
		// Get an approximation
		a = MathLib.sign(x) * Math.pow(Math.abs(x), 1 / 3);

		// Halley's method
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
	cosh: MathLib.isNative((<any>Math).cosh) || function (x) {
		return (Math.exp(x) + Math.exp(-x)) / 2;
	},
	cot: function (x) {
		// Handle ±0 separate, because tan(pi/2 ± 0) is not ±∞
		if (x === 0) {
			return 1 / x;
		}
		// cot(x) = tan(pi/2 - x) is better than 1/tan(x)
		return Math.tan(1.5707963267948966 - x);
	},
	coth: function (x) {
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
	csc: function (x) {
		return 1 / Math.sin(x);
	},
	csch: function (x) {
		// csch(-0) should be -∞ not ∞
		if (x === 0) {
			return 1 / x;
		}
		return 2 / (Math.exp(x) - Math.exp(-x));
	},
	degToRad: function (x) {
		// Math.PI / 180 = 0.017453292519943295
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
		if ((x > 170 && MathLib.isInt(x)) || x === Infinity ) {
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
	isOne: function (a)    {
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
	isReal: function (x)    {
		return Math.abs(x) < Infinity;
	},
	isZero: function (x) {
		return Math.abs(x) < MathLib.epsilon;
	},
	lg: function (x) {
		return Math.log(x) / Math.LN10;
	},
	ln: Math.log,
	// Algorithm based on [Numerical Recipes Vol. 3, p. 257](www.nr.com)
	logGamma: function (x) {
		var j, tmp, y, ser,
				cof = [57.1562356658629235, -59.5979603554754912, 14.1360979747417471, -0.491913816097620199,
			0.339946499848118887e-4, 0.465236289270485756e-4, -0.983744753048795646e-4, 0.158088703224912494e-3,
			-0.210264441724104883e-3, 0.217439618115212643e-3, -0.164318106536763890e-3, 0.844182239838527433e-4,
			-0.261908384015814087e-4, 0.368991826595316234e-5];

		y = x;
		tmp = x + 5.24218750000000000; // Rational 671/128.
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
		// 180 / Math.PI = 57.29577951308232
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
	sinh: MathLib.isNative((<any>Math).sinh) || function (x) {
		// sinh(-0) should be -0
		if (x === 0) {
			return x;
		}
		return (Math.exp(x) - Math.exp(-x)) / 2;
	},
	sqrt: Math.sqrt,
	tan: Math.tan,
	tanh: MathLib.isNative((<any>Math).tanh) || function (x) {
		var p;

		// Handle ±0 and ±∞ separately
		// Their values happen to coincide with sign
		if (x === 0 || !MathLib.isFinite(x)) {
			return MathLib.sign(x);
		}

		p = Math.exp(x);
		return (p * p - 1) / (p * p + 1);
	}
};

	


// Create the unary functions
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
					content: [new MathLib.Expression({
							subtype: 'functionCall',
							content: [new MathLib.Expression({
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
		})
	}
}


// ## <a id="Screen"></a>Screen
// This module contains the common methods of all drawing modules.



export class Screen {
	type = 'screen';

	container: any;
	figure: any;
	wrapper: any;
	contextMenu: any;
	contextMenuOverlay: any;
	height: number;
	width: number;
	origHeight: number;
	origWidth: number;
	options: any;
	renderer: any;
	element: any;
	innerHTMLContextMenu: string;


	// 3D
	camera: any;


	constructor (id: string, options = {}) {

		var _this = this,
				defaults = {
					height: 500,
					width: 500,
					contextMenu: {
						screenshot: true,
						fullscreen: true,
						grid: true,
					},
					figcaption: ''
				},
				opts = extendObject(defaults, options),
				container = document.getElementById(id),
				innerHTMLContextMenu = '',
				uuid = +Date.now(),
				fullscreenchange,
				innerHTML;


		container.innerHTML = template(opts);
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


		if ((<any>options).contextMenu) {
			this.wrapper.oncontextmenu = (evt) => this.oncontextmenu(evt);
		
			if ((<any>opts).contextMenu.screenshot && !('opera' in window)) {
				this.contextMenu.getElementsByClassName('MathLib_screenshot')[0].onclick = function () {
					var dataURI,
							a = document.createElement('a');

					if (_this.options.renderer === 'Canvas' && _this.type === 'screen2D') {
						var canvas = document.createElement('canvas'),
								ctx = (<any>canvas).getContext('2d');

						(<any>canvas).height = _this.height;
						(<any>canvas).width = _this.width;

						ctx.drawImage((<any>_this).layer.back.element, 0, 0);
						ctx.drawImage((<any>_this).layer.grid.element, 0, 0);
						ctx.drawImage((<any>_this).layer.axes.element, 0, 0);
						ctx.drawImage((<any>_this).layer.main.element, 0, 0);


						dataURI = (<any>canvas).toDataURL('image/png');
						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.png';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/png', 'image/octet-stream');
						}
					}

					if (_this.options.renderer === 'WebGL' && _this.type === 'screen3D') {
						dataURI = _this.element.toDataURL('image/png');
						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.png';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/png', 'image/octet-stream');
						}
					}

					else if (_this.options.renderer === 'SVG') {
						dataURI = 'data:image/svg+xml,' + _this.element.parentElement.innerHTML;

						if ('download' in a) {
							(<any>a).href = dataURI;
							(<any>a).download = 'plot.svg';
							(<any>a).click();
						}
						else {
							window.location.href = dataURI.replace('image/svg+xml', 'image/octet-stream');
						}
					}
				}
			}


			if ((<any>opts).contextMenu.fullscreen && 'requestFullScreen' in document.body) {
				this.contextMenu.getElementsByClassName('MathLib_fullscreen')[0].onclick = function () {
					if ((<any>document).fullscreenElement) {
						(<any>document).exitFullScreen();
					}
					else {
						_this.container.requestFullScreen();
					}
				};
			}

			if ((<any>opts).contextMenu.grid) {
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[0].onchange = function () {
					(<any>_this).options.grid.type = 'cartesian';
					(<any>_this).draw();
				}
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[1].onchange = function () {
					(<any>_this).options.grid.type = 'polar';
					(<any>_this).draw();
				}
				this.contextMenu.getElementsByClassName('MathLib_grid_type')[2].onchange = function () {
					(<any>_this).options.grid.type = false;
					(<any>_this).draw();
				}
			}


		}



		fullscreenchange = function () {
			if ((<any>document).fullscreenElement) {
				_this.origWidth = _this.width;
				_this.origHeight = _this.height;
				(<any>_this).resize(window.outerWidth, window.outerHeight);
			}
			else {
				(<any>_this).resize(_this.origWidth, _this.origHeight);
				delete _this.origWidth;
				delete _this.origHeight;
			}
		};

		if ('onfullscreenchange' in this.container) {
			this.container.addEventListener('fullscreenchange', fullscreenchange);
		}

		// The mozfullscreenchange event is not firing at all.
		// Therefore the screen is not resized when going fullscreen.
		// FIXME: are there any workarounds?
		else if ('onmozfullscreenchange' in this.container) {
			this.container.addEventListener('mozfullscreenchange', fullscreenchange);
		}
		else if ('onwebkitfullscreenchange' in this.container) {
			this.container.addEventListener('webkitfullscreenchange', fullscreenchange);
		}

	}


// ### Screen.prototype.contextmenu()
// Handles the contextmenu event
//
// *@param {event}*
oncontextmenu(evt) {

	var listener,
			_this = this,
			menu = this.contextMenu,
			overlay = this.contextMenuOverlay;

	if (evt.preventDefault) {
	 evt.preventDefault();
	}
	evt.returnValue = false;


	menu.style.setProperty('top', (evt.clientY - 20) + 'px');
	menu.style.setProperty('left', evt.clientX + 'px');
	overlay.style.setProperty('display', 'block');
	


	listener = function () {
		overlay.style.setProperty('display', 'none');
		
		Array.prototype.forEach.call(_this.contextMenu.getElementsByClassName('MathLib_temporaryMenuItem'),
		function (x) {
			_this.contextMenu.removeChild(x);
		});

		overlay.removeEventListener('click', listener);
	};

	overlay.addEventListener('click', listener);
}


}// ## <a id="Layers"></a>Layers
// Layers for two dimensional plotting

export class Layer {


	ctx: any;
	element: any;
	id: string;
	screen: any;
	zIndex: number;
	stack: any;
	transformation: any;
	applyTransformation: any;


	// Drawing functions
	draw: any;
	circle: any;
	line: any;
	path: any;
	pixel: any;
	point: any;
	text: any;


	constructor (screen, id: string, zIndex) {
		var _this = this;
		this.screen = screen;
		this.id = id;
		this.zIndex = zIndex;

		this.stack = [];
		this.transformation = screen.transformation;

		var element;


		if (screen.options.renderer === 'Canvas') {

			// Create the canvas
			element = document.createElement('canvas');
			element.classList.add('MathLib_screen');
			element.width = screen.width;
			element.height = screen.height;
			screen.wrapper.appendChild(element);
			this.element = element;


			// Get the context and apply the transformations
			this.ctx = element.getContext('2d');
			this.applyTransformation =  function () {
				var m = _this.transformation;
				_this.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
			};
			this.applyTransformation();


			// Set the drawing functions
			if (id === 'back') {
				this.draw = function () {
					var top     = (              - screen.translation.y) / screen.scale.y,
							bottom  = (screen.height - screen.translation.y) / screen.scale.y,
							left    = (              - screen.translation.x) / screen.scale.x,
							right   = (screen.width  - screen.translation.x) / screen.scale.x;

					// Draw the background
					this.ctx.fillStyle = colorConvert(screen.options.background);
					this.ctx.fillRect(left, bottom, right - left, top - bottom);

					this.stack.forEach(function (x) {
						if (x.type === 'conic') {
							x.object.draw(_this, x.options, true);
						}
						else if (x.type === 'text') {
							_this.text(x.object, x.x, x.y, x.options, true);
						}
						else if (x.type === 'pixel') {
							_this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
						}
						else {
							_this[x.type](x.object, x.options, true);
						}
					});
				}
			}
			else if (id === 'grid') {
				this.ctx.strokeStyle = colorConvert(screen.options.grid.color) || '#cccccc';
				this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

				this.draw = function () {
//					_this.ctx.lineWidth = (screen.options.grid.lineWidth || 4) / (screen.scale.x - screen.scale.y);
					_this.screen.drawGrid();
				}
			}
			else if (id === 'axes') {
				this.ctx.strokeStyle = colorConvert(screen.options.axes.color) || '#000000';
				
				this.draw = function () {
					_this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
					_this.screen.drawAxes();
				}
			}
			else {
				this.ctx.strokeStyle = '#000000';
				this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

				this.draw = function () {
					_this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);

					this.stack.forEach(function (x) {
						if (x.type === 'conic' ) {
							x.object.draw(_this, x.options, true);
						}
						else if (x.type === 'text' ) {
							_this.text(x.object, x.x, x.y, x.options, true);
						}
						else if (x.type === 'pixel' ) {
							_this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
						}
						else {
							_this[x.type](x.object, x.options, true);
						}
					});
				
				}
			}


			this.circle = MathLib.Canvas.circle;
			this.line = MathLib.Canvas.line;
			this.path = MathLib.Canvas.path;
			this.pixel = MathLib.Canvas.pixel;
			this.point = MathLib.Canvas.point;
			this.text = MathLib.Canvas.text;

		}
		else if (screen.options.renderer === 'SVG') {
			var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
					m = screen.transformation;
			
			ctx.className.baseVal = 'MathLib_layer_' + id;
			ctx.setAttribute('transform',
				'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')' );
			screen.element.appendChild(ctx);
			this.ctx = ctx;


			// Set the drawing functions
			if (id === 'back') {
				this.draw = function () {
					this.stack.forEach(function (x) {
						if (x.type === 'conic') {
							x.object.draw(_this, x.options, true);
						}
						else if (x.type === 'text') {
							_this.text(x.object, x.x, x.y, x.options, true);
						}
						else if (x.type === 'pixel') {
							_this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
						}
						else {
							_this[x.type](x.object, x.options, true);
						}
					});
				}
			}
			else if (id === 'grid') {
				ctx.setAttribute('stroke', colorConvert(screen.options.grid.color) || '#cccccc');

				this.draw = function () {
					ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
					_this.screen.drawGrid();
				};

			}
			else if (id === 'axes') {
				ctx.setAttribute('stroke', colorConvert(screen.options.axes.color) || '#000000');
				
				this.draw = function () {
					ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
					_this.screen.drawAxes();
				}
			}
			else {
				this.draw = function () {

					this.stack.forEach(function (x) {
						if (x.type === 'conic' ) {
							x.object.draw(_this, x.options, true);
						}
						else if (x.type === 'text' ) {
							_this.text(x.object, x.x, x.y, x.options, true);
						}
						else if (x.type === 'pixel' ) {
							_this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
						}
						else {
							_this[x.type](x.object, x.options, true);
						}
					});
				}
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


// ### Layer.prototype.clear()
// Clears the Layer
//
// *@return {Layer}* Returns the current Layer
clear() {
	this.screen.renderer.clear(this);
	return this;
}


}// ## Canvas
// The Canvas renderer for 2D plotting
//
MathLib.Canvas = {


// ### Canvas.applyTransformation
// Applies the current transformations to the screen
//
applyTransformation: function () {
	var m = this.transformation;
	this.layer.forEach(function (l) {l.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2])});
},


// ### Canvas.circle
// Draws a circle on the screen.
//
// *@param {Circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
circle: function (circle, options = {}, redraw = false) {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts;

	ctx.save();
	ctx.lineWidth = ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

	// Set the drawing options
	if (options) {
		opts = MathLib.Canvas.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				ctx[prop] = opts[prop];
			}
		}

		if ('setLineDash' in ctx) {
			ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
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


// ### Canvas.clear
// Clears a given Layer.
//
// *@param {Layer}* The layer to be cleared
clear: function (layer) {
	var screen = layer.screen,
			left   = -screen.translation.x / screen.scale.x,
			top    = -screen.translation.y / screen.scale.y,
			width  =  screen.width         / screen.scale.x,
			height =  screen.height        / screen.scale.y;

	layer.ctx.clearRect(left, top, width, height);
},


// ### Canvas.convertOptions
// Converts the options to the Canvas options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fillStyle = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fillStyle = colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions.font = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions.fontSize = opt.fontSize;
	}


	if ('lineColor' in opt) {
		convertedOptions.strokeStyle = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		convertedOptions.strokeStyle = colorConvert(opt.color);
	}


	return convertedOptions;
},


// ### Canvas.line
// Draws a line on the screen.
//
// *@param {Line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
line: function (line, options = {}, redraw = false) {
	var screen = this.screen,
			points,
			ctx = this.ctx,
			prop, opts;

	ctx.save()
	ctx.lineWidth = ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

	// Don't try to draw the line at infinity
	if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
		return this;
	}
	else {
		points = this.screen.getLineEndPoints(line)
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
			ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
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


// ### Canvas.path
// Draws a path on the screen.
//
// *@param {Path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the scren
path: function (curve, options = {}, redraw = false) {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts, path, paths = [], x, y, i, fx, fxold,
			step = 2 / (screen.scale.x - screen.scale.y),
			from, to;

	ctx.save()
	ctx.lineWidth = ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y);


	// Set the drawing options
	if (options) {
		opts = MathLib.Canvas.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				ctx[prop] = opts[prop];
			}
		}

		if ('setLineDash' in ctx) {
			ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
		}
	}


	// If curve is a function f, the path will be (x, f(x))
	if (typeof curve === 'function') {
		path = [];
		from = ('from' in options ? (<any>options).from : ( - screen.translation.x) / screen.scale.x) - step;
		to = ('to' in options ? (<any>options).to : (screen.width  - screen.translation.x) / screen.scale.x) + step;

		for (i = from; i <= to; i += step) {
			fx = curve(i);
			// Inline NaN test and disontinuity test
			// Check if we are drawing a (nearly) vertical line, which should not be there.
			// i.e the vertical lines at π/2 for the tangent function
			// TODO: Find a better check if there is a discontinuity.
			if (fx !== fx ||
				// next the check for very steep lines
				(MathLib.abs((fxold - fx) / step) >= 1e2 && 
				// But those points additionally have to satisfy,
				// that the midpoint of the current interval is not in between
				// the two values of the function at the endpoints of the intervall.
				(fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {

				// Don't add empty subpaths
				if (path.length) {
					paths.push(path);
					path = [];
				}
			}
			else {
				path.push([i, fx]);
			}

			fxold = fx;
		}
		if (path.length) {
			paths.push(path);
		}
	}


	// If curve is an array of two functions [f, g], the path will be (f(x), g(x))
	else if (typeof curve[0] === 'function') {
		path = [];
		x = curve[0];
		y = curve[1];
		from = ('from' in options ? (<any>options).from : 0) - step;
		to = ('to' in options ? (<any>options).to : 2 * Math.PI) + step;
		for (i = from; i <= to; i += step) {
			path.push([x(i), y(i)]);
		}
		paths.push(path);
	}
	else {
		path = curve;
	}


	// Draw the path
	// Till now I haven't found a way to stroke and fill the path in one go.
	// The problem is basically, that moveTo creates a new subpath
	// and every subpath is filled on its own.
	if ((<any>options).fillColor || (<any>options).fillColor !== 'transparent') {
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
//		ctx.closePath();
	}

	if ((<any>options).lineColor || (<any>options).lineColor !== 'transparent') {
		ctx.beginPath();
		paths.forEach(function (path) {
			ctx.moveTo(path[0][0], path[0][1]);
			path.forEach(function (x) {
				ctx.lineTo(x[0], x[1]); 
			});
		});
		ctx.stroke();
//		ctx.closePath();
	}

	ctx.restore();

	if (!redraw) {
		if (options.conic) {
			this.stack.push({
				type: 'conic',
				object: options.conic,
				options: options
			});
		}
		else {
			this.stack.push({
				type: 'path',
				object: curve,
				options: options
			});
		}
	}

	return this;
},


// ### Canvas.pixel
// Draws pixel on the screen.
//
// *@param {function}* The pixel function  
// *@param {number}* The top coordinate of the draw rectangle  
// *@param {number}* The right coordinate of the draw rectangle  
// *@param {number}* The bottom coordinate of the draw rectangle  
// *@param {number}* The left coordinate of the draw rectangle  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
pixel: function (f, t, r, b, l, options = {}, redraw = false) {
	var screen = this.screen,
			top     = (              - screen.translation.y) / screen.scale.y,
			bottom  = (screen.height - screen.translation.y) / screen.scale.y,
			left    = (              - screen.translation.x) / screen.scale.x,
			right   = (screen.width  - screen.translation.x) / screen.scale.x,
			ctx = this.ctx,
			x, y, i;

	t = Math.min(top, t);
	r = Math.min(right, r);
	b = Math.max(bottom, b);
	l = Math.max(left, l);


	var tPxl = Math.floor(-t * screen.scale.y),
			rPxl = Math.floor( r * screen.scale.x),
			bPxl = Math.floor(-b * screen.scale.y),
			lPxl = Math.floor( l * screen.scale.x),
			w = (rPxl - lPxl),
			h = (bPxl - tPxl),
			imgData = ctx.createImageData(w, h),
			pxl;


	for (y = tPxl, i = 0; y > bPxl; y--) {
		for (x = lPxl; x < rPxl; x++, i++) {
			pxl = f(x / screen.scale.x, y / screen.scale.y);
			imgData.data[4 * i]     = pxl[0];
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


// ### Canvas.point
// Draws a point on the screen.
//
// *@param {Point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
point: function (point, options = {}, redraw = false) {
	var screen = this.screen,
			ctx = this.ctx,
			prop, opts, dist;

	ctx.save();
	ctx.lineWidth = ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y);

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
			ctx.setLineDash(('dash' in options ? (<any>options).dash : []));
		}
		if ('lineDashOffset' in ctx) {
			ctx.lineDashOffset = ('dashOffset' in options ? (<any>options).dashOffset : 0);
		}
	}


	// Draw the point
	ctx.beginPath();
	ctx.arc(point[0] / point[2], point[1] / point[2], ((<any>options).size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();


	if ((<any>options).label) {
		dist = 1.75 * ((<any>options).size || 10) + 0.75 * ((<any>options).lineWidth || 4);
		screen.text((<any>options).label,
			point[0] / point[2] + dist / (screen.scale.x - screen.scale.y),
			point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
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


// ### Canvas.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
text: function (str, x, y, options = {}, redraw = false) {
	var defaults = {
				font:       'Helvetica',
				fontSize:   12,
//				lineWidth:  0.05,
				textColor:  'rgba(0, 0, 0, 1)'
			},
			ctx, prop, opts;

	ctx = this.ctx;

	opts = MathLib.Canvas.convertOptions(extendObject(defaults, options));


	// Set the drawing options
	for (prop in opts) {
		if (opts.hasOwnProperty(prop)) {
			ctx[prop] = opts[prop];
		}
	}

	ctx.fillStyle = colorConvert((<any>options).textColor || (<any>options).color || defaults.textColor);
	ctx.strokeStyle = colorConvert((<any>options).textColor || (<any>options).color || defaults.textColor);

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
},


}// ## SVG
// The SVG renderer for 2D plotting
//
MathLib.SVG = {


// ### SVG.applyTransformation
// Applies the current transformations to the screen
//
applyTransformation: function () {
	var m = this.transformation;
	this.layer.forEach(function (l) {
		l.ctx.setAttribute('transform',
			'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')' )});
},


// ### SVG circle
// Draws a circle on the screen.
//
// *@param {Circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
circle: function (circle, options = {}, redraw = false) {
	var screen = this.screen,
			prop, opts,
			svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	svgCircle.setAttribute('cx', circle.center[0]);
	svgCircle.setAttribute('cy', circle.center[1]);
	svgCircle.setAttribute('r', circle.radius);

	if (options) {
		svgCircle.setAttribute('stroke-width', ((<any>options).lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');
		opts = MathLib.SVG.convertOptions(options);
		for (prop in opts) {
			if (opts.hasOwnProperty(prop)) {
				svgCircle.setAttribute(prop, opts[prop]);
			}
		}
	}

	this.ctx.appendChild(svgCircle)

	if (!redraw) {
		this.stack.push({
			type: 'circle',
			object: circle,
			options: options
		});
	}

	return this;
},


// ### SVG.clear
// Clears a given Layer.
//
// *@param {Layer}* The layer to be cleared  
clear: function (layer) {
	layer.ctx.textContent = '';
},


// ### SVG.convertOptions
// Converts the options to the SVG options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fill = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fill = colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions.font = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions.fontSize = opt.fontSize;
	}


	if ('lineColor' in opt) {
		convertedOptions.stroke = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
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


// ### SVG line
// Draws a line on the screen.
//
// *@param {Line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Canvas}* Returns the screen
line: function (line, options = {}, redraw = false) {
	var screen = this.screen,
			points,
			prop, opts,
			svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	// Don't try to draw the line at infinity
	if (line.type === 'line' && MathLib.isZero(line[0]) && MathLib.isZero(line[1])) {
		return this;
	}
	else {
		points = this.screen.getLineEndPoints(line)
	}

	svgLine.setAttribute('x1', points[0][0]);
	svgLine.setAttribute('y1', points[0][1]);
	svgLine.setAttribute('x2', points[1][0]);
	svgLine.setAttribute('y2', points[1][1]);

	if (options) {
		svgLine.setAttribute('stroke-width', ((<any>options).lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');
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


// ### SVG path
// Draws a path on the screen.
//
// *@param {curve}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
path: function (curve, options = {}, redraw = false) {
	var screen = this.screen,
			svgPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			svgPathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			step = 2 / (screen.scale.x - screen.scale.y),
			pathStringFill, pathStringStroke, from, to, prop, opts, x, y, i, path, paths = [], fx, fxold;

	// If curve is a function f, the path will be (x, f(x))
	if (typeof curve === 'function') {
		path = [];
		from = ('from' in options ? (<any>options).from :         - screen.translation.x  / screen.scale.x) - step;
		to = ('to' in options ? (<any>options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;
		for (i = from; i <= to; i += step) {
			fx = curve(i);
			
			// Inline NaN test and disontinuity test
			// For more info see the corresponding function for canvas
			if (fx !== fx ||
				(MathLib.abs((fxold - fx) / step) >= 1e2 && 
				(fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
				
				// Don't add empty subpaths
				if (path.length) {
					paths.push(path);
					path = [];
				}
			}
			else {
				path.push([i, fx]);
			}

			fxold = fx;
		}
		if (path.length) {
			paths.push(path);
		}
	}


	// If curve is an array of two functions [f, g], the path will be (f(x), g(x))
	else if (typeof curve[0] === 'function') {
		path = [];
		x = curve[0];
		y = curve[1];
		from = ('from' in options ? (<any>options).from : 0) - step;
		to = ('to' in options ? (<any>options).to : 2 * Math.PI) + step;
		for (i = from; i <= to; i += step) {
			path.push([x(i), y(i)]);
		}
		paths.push(path);
	}
	else {
		path = curve;
	}


	pathStringFill = 'M' + from + ' 0 ' + paths.reduce(function (previ, path) {
		return previ +
		// Bring the fill down to the zero line at the beginning of a subpath
		' L ' + path[0][0] + ' 0 ' +
		// The "normal" path
		path.reduce(function (prev, cur) {
			return prev + ' L ' + cur.join(' ');
		}, '') + 
		// Move the fill back to the zero line at the end of a subpath
		' L ' + path[path.length - 1][0] + ' 0 ';
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

	svgPathStroke.setAttribute('stroke-width', ((<any>options).lineWidth || 4 ) / (screen.scale.x - screen.scale.y) + '');


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
		}
		else {
			this.stack.push({
				type: 'path',
				object: curve,
				options: options
			});
		}
	}

	return this;
},


// ### SVG pixel
// Draws pixel on the screen.
//
// *@param {function}* The pixel function  
// *@param {number}* The top coordinate of the draw rectangle  
// *@param {number}* The right coordinate of the draw rectangle  
// *@param {number}* The bottom coordinate of the draw rectangle  
// *@param {number}* The left coordinate of the draw rectangle  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
pixel: function (f, t, r, b, l, options = {}, redraw = false) {
	var screen = this.screen,
			top     = (              - screen.translation.y) / screen.scale.y,
			bottom  = (screen.height - screen.translation.y) / screen.scale.y,
			left    = (              - screen.translation.x) / screen.scale.x,
			right   = (screen.width  - screen.translation.x) / screen.scale.x,
			canvas = <any>document.createElement('canvas'),
			canvasCtx = canvas.getContext('2d'),
			svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'),
			svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
			x, y, i, pxl,
			m = screen.transformation;

	canvas.width = screen.width;
	canvas.height = screen.height;
	canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2])



	svgContainer.setAttribute('transform', 'matrix(' + 1 / m[0][0] + ', 0, 0, ' + 1 / m[1][1] + ', -' + m[0][2] / m[0][0] + ', ' + -m[1][2] / m[1][1] + ')');
	svgImage.setAttribute('width', screen.width + 'px');
	svgImage.setAttribute('height', screen.height + 'px');
	svgImage.setAttribute('x', '0');
	svgImage.setAttribute('y', '0');



	t = Math.min(top, t);
	r = Math.min(right, r);
	b = Math.max(bottom, b);
	l = Math.max(left, l);


	var tPxl = Math.floor(-t * screen.scale.y),
			rPxl = Math.floor(r * screen.scale.x),
			bPxl = Math.floor(-b * screen.scale.y),
			lPxl = Math.floor(l * screen.scale.x),
			w = (rPxl - lPxl),
			h = (tPxl - bPxl),
			imgData = canvasCtx.createImageData(w, h);



	for (y = tPxl, i = 0; y > bPxl; y--) {
		for (x = lPxl; x < rPxl; x++, i++) {
			pxl = f(x / screen.scale.x, y / screen.scale.y);
			imgData.data[4 * i]     = pxl[0];
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


// ### SVG point
// Draws a point on the screen.
//
// *@param {Point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
point: function (point, options = {}, redraw = false) {
	var screen = this.screen,
			prop, opts, dist,
			svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

	svgPoint.setAttribute('cx', point[0] / point[2] + '');
	svgPoint.setAttribute('cy', point[1] / point[2] + '');
	svgPoint.setAttribute('r', ((<any>options).size || 10) / (screen.scale.x - screen.scale.y) + '');


	if (options) {
		svgPoint.setAttribute('stroke-width', ((<any>options).lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
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


	if ((<any>options).moveable) {
		svgPoint.setAttribute('cursor', 'move');

		// mousedown
		svgPoint.addEventListener('mousedown',
			function () {
				screen.options.interaction.type = 'move';
				var invTransformation = screen.transformation.inverse();

				var move = function (evt) {
							evt.stopPropagation();

							var evtPoint = invTransformation.times(screen.getEventPoint(evt));
							point[0] = evtPoint[0];
							point[1] = evtPoint[1];
							screen.draw();
						},

						up = function () {
							screen.options.interaction.type = '';

							document.body.removeEventListener('mousemove', move);
							document.body.removeEventListener('mouseup', up);
						};

				// mousemove
				document.body.addEventListener('mousemove', move);

				// mouseup
				document.body.addEventListener('mouseup', up);
			}
		);
	}


	this.ctx.appendChild(svgPoint);


	if ((<any>options).label) {
		dist = 1.75 * ((<any>options).size || 10) + 0.75 * ((<any>options).lineWidth || 4);
		screen.text((<any>options).label,
			point[0] / point[2] + dist / (screen.scale.x - screen.scale.y),
			point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
	}


	svgPoint.addEventListener('contextmenu', function () {
		screen.options.interaction.type = 'contextmenu';
		var x = (<any>svgPoint).cx.baseVal.value,
				y = (<any>svgPoint).cy.baseVal.value;

		screen.contextMenu.innerHTML = 
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_is_disabled MathLib_is_centered">Point</div>' +
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Coordinates' +
					'<menu class="MathLib_menu MathLib_submenu">' +
					'<div class="MathLib_menuItem">cartesian: <span class="MathLib_is_selectable MathLib_is_right">(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')</span></div>' +
					'<div class="MathLib_menuItem">polar: <span class="MathLib_is_selectable MathLib_is_right">(' + MathLib.hypot(x, y).toFixed(3) + ', ' + Math.atan2(y, x).toFixed(3) + ')</span></div>' +
				'</menu>' +
			'</div>' +
			'<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Options' +
				'<menu class="MathLib_menu MathLib_submenu">' +
					'<div class="MathLib_menuItem">Moveable:' +
						'<input type="checkbox" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Size:' +
						'<input type="spinner" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Fill color:' +
						'<input type="color" class="MathLib_is_right">' +
					'</div>' +
					'<div class="MathLib_menuItem">Line color:' +
						'<input type="color" class="MathLib_is_right">' +
					'</div>' +
				'</menu>' +
			'</div>' +
			'<hr class="MathLib_separator MathLib_temporaryMenuItem">' +
			screen.contextMenu.innerHTML;
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


// ### SVG text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@return {Screen}* Returns the screen
text: function (str, x, y, options = {}, redraw = false) {
	var defaults = {
				font:       'Helvetica',
				fontSize:   12,
//				lineWidth:  0.05,
				textColor:  'rgba(0, 0, 0, 1)'
			},
			opts,
			screen = this.screen,
			svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
			svgTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

	opts = MathLib.SVG.convertOptions(extendObject(defaults, options));

	svgTspan.textContent = str;
	svgTspan.setAttribute('x', x * screen.scale.x + '');
	svgTspan.setAttribute('y', y * screen.scale.y + '');
	svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
	svgText.setAttribute('font-family', opts.font);
	svgText.setAttribute('font-size', opts.fontSize);
	svgText.setAttribute('fill', colorConvert((<any>options).textColor || (<any>options).color) || defaults.textColor);
	svgText.setAttribute('fill-opacity', '1');
	svgText.setAttribute('stroke', colorConvert((<any>options).textColor || (<any>options).color) || defaults.textColor);
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


}// ## <a id="Screen2D"></a>Screen2D
// Two dimensional plotting


export class Screen2D extends Screen {
	type = 'screen2D';

	applyTransformation: any;
	background: any;
	renderer: any;
	axes: any;
	grid: any;
	layer: any;
	element: any;

	init: any;
	redraw: any;


	// Drawing functions
	draw: any;
	circle: any;
	line: any;
	path: any;
	pixel: any;
	point: any;
	text: any;


	// Transformation
	transformation: any;
	translation: any;
	scale: any;
	lookAt: any;
	range: any;


	// Interaction TODO
	interaction: any;
	zoomSpeed: any;


	constructor (id: string, options = {}) {
		super(id, options);
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
						
//						origin: {x: 0, y: 0},
//						tick: {x: 1, y: 1}
					},
					grid: {
						// angle: Math.PI / 8,
						type: 'cartesian',
						lineColor: 0xcccccc,
						lineWidth: 4,
						dash: [],
						dashOffset: 0,
						//tick: {x: 1, y: 1, r: 1}
						x: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						y: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						r: {tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0},
						angle: {tick: Math.PI / 8, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0}
					},
					interaction: {
						allowPan: true,
						allowZoom: true,
						zoomSpeed: 1
					},
					background: 0xffffff,
					lookAt: {x: 0, y: 0},
					range: {x: 1, y: 1},
					figcaption: '',
					renderer: 'Canvas',
					transformation: new MathLib.Matrix([[Math.min(this.height, this.width) / 2, 0, this.width / 2],
																							[0, -Math.min(this.height, this.width) / 2, this.height / 2],
																							[0, 0, 1]])
				},
				opts = extendObject(defaults, options),
				element,
				transformation = opts.transformation,
				_this = this;

		this.options = opts;
		this.renderer = MathLib[opts.renderer];


		this.circle = (...args : any[]) => this.renderer.circle.apply(this.layer.main, args);
		this.line   = (...args : any[]) => this.renderer.line.apply(  this.layer.main, args);
		this.path   = (...args : any[]) => this.renderer.path.apply(  this.layer.main, args);
		// Should the pixel method default to the main layer or to the back layer?
		this.pixel  = (...args : any[]) => this.renderer.pixel.apply( this.layer.main, args);
		this.point  = (...args : any[]) => this.renderer.point.apply( this.layer.main, args);
		this.text   = (...args : any[]) => this.renderer.text.apply(  this.layer.main, args);




		// Remove the warning message.
		this.wrapper.innerHTML = '';

		this.container.classList.add('MathLib_screen2D');

		// This is just a dummy method for the following few lines.
		// The real applyTransformation method is specified after the creation of the layers.
		this.applyTransformation = function () {};


		// The interaction methods
		this.translation = {};
		this.scale = {};
		this.transformation = transformation;

		Object.defineProperty(this.translation, 'x', {
			get: function () {return _this.transformation[0][2];},
			set: function (x) {_this.transformation[0][2] = x; _this.applyTransformation();}
		});

		Object.defineProperty(this.translation, 'y', {
			get: function () {return _this.transformation[1][2];},
			set: function (y) {_this.transformation[1][2] = y; _this.applyTransformation();}
		});

		Object.defineProperty(this.scale, 'x', {
			get: function () {return _this.transformation[0][0];},
			set: function (x) {_this.transformation[0][0] = x; _this.applyTransformation();}
		});

		Object.defineProperty(this.scale, 'y', {
			get: function () {return _this.transformation[1][1];},
			set: function (y) {_this.transformation[1][1] = y; _this.applyTransformation();}
		});



		this.lookAt = {};
		this.range = {};
		Object.defineProperty(this.lookAt, 'x', {
			get: function () {return (_this.width / 2 - _this.transformation[0][2]) / _this.transformation[0][0];},
			set: function (x) {_this.transformation[0][2] = _this.width / 2 - x * _this.transformation[0][0]; _this.applyTransformation();}
		});

		Object.defineProperty(this.lookAt, 'y', {
			get: function () {return (_this.height / 2 - _this.transformation[1][2]) / _this.transformation[1][1];},
			set: function (y) {_this.transformation[1][2] = _this.height / 2 - y * _this.transformation[1][1]; _this.applyTransformation();}
		});

		Object.defineProperty(this.range, 'x', {
			get: function () {return _this.width / (2 * _this.transformation[0][0]);},
			set: function (x) {_this.transformation[0][0] = 0.5 * _this.width / x; _this.applyTransformation();}
		});

		Object.defineProperty(this.range, 'y', {
			get: function () {return -_this.height / (2 * _this.transformation[1][1]);},
			set: function (y) {_this.transformation[1][1] = -0.5 * _this.height / y; _this.applyTransformation();}
		});


		this.range.x = opts.range.x
		this.range.y = opts.range.y
		this.lookAt.x = opts.lookAt.x
		this.lookAt.y = opts.lookAt.y



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

//			if ('background' in options) {
				var background = document.createElementNS('http://www.w3.org/2000/svg','rect');

				background.setAttribute('x', '0px');
				background.setAttribute('y', '0px');
				background.setAttribute('width', this.width + 'px');
				background.setAttribute('height', this.height + 'px');
				background.setAttribute('stroke', 'transparent');
				background.setAttribute('fill', 'background' in options ? colorConvert((<any>options).background) : 'white');
				background.setAttribute('fill-opacity', '1');
				this.element.appendChild(background);
//			}
		}



		// Create the Layers
		// =================
		this.layer = [];
		this.layer.back = new MathLib.Layer(this, 'back', 0);
		this.layer.grid = new MathLib.Layer(this, 'grid', 1);
		this.layer.axes = new MathLib.Layer(this, 'axes', 2);
		this.layer.main = new MathLib.Layer(this, 'main', 3);


		this.wrapper.addEventListener('mouseup',      (evt) => this.onmouseup(evt), false);
		this.wrapper.addEventListener('mousedown',    (evt) => this.onmousedown(evt), false);
		this.wrapper.addEventListener('mousemove',    (evt) => this.onmousemove(evt), false);
		this.wrapper.addEventListener('mousewheel',   (evt) => this.onmousewheel(evt), false);
		// For Firefox: [Bug report for the missing onmousewheel method](https://bugzilla.mozilla.org/show_bug.cgi?id=111647)
		this.wrapper.addEventListener('DOMMouseScroll', (evt) => this.onmousewheel(evt), false);


		this.applyTransformation = this.renderer.applyTransformation;


		this.draw = function (x, options = {}) {
			// Clear and redraw the screen
			if (arguments.length === 0) {
				this.layer.forEach(function (l) {
					l.clear().draw()
				});
			}
			else if (x.type === 'circle') {
				this.circle(x, options);
			}
			else if (x.type === 'line') {
				this.line(x, options);
			}
			else if (Array.isArray(x)) {
				x.forEach((y) => this[y.type](y, options));
			}
		};


		if (this.options.contextMenu) {
			var gridType = opts.grid.type ? opts.grid.type : 'none';
			this.contextMenu.querySelectorAll('.MathLib_grid_type[value=' + gridType + ']')[0].checked = true;
		}

		this.draw();
	}


// ### Screen.prototype.drawAxes
// Draws the axes.
//
// *@return {Screen2D}*
drawAxes() {

	var line = (...args : any[]) => this.renderer.line.apply(this.layer.axes, args),
			text = (...args : any[]) => this.renderer.text.apply(this.layer.axes, args),
			options = {
				lineColor: colorConvert(this.options.axes.color),
				'stroke-width': -1 / this.transformation[1][1]
			},
			textOptions = {
				font: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.font : '',
				fontSize: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.fontSize : '',
//				fontSize: this.options.axes.label.fontSize,
				strokeStyle: colorConvert(this.options.axes.textColor),
				fillStyle: colorConvert(this.options.axes.textColor)
			},
			top     = (            - this.translation.y) / this.scale.y,
			bottom  = (this.height - this.translation.y) / this.scale.y,
			left    = (            - this.translation.x) / this.scale.x,
			right   = (this.width  - this.translation.x) / this.scale.x,
			lengthX =  10 / this.transformation[0][0],
			lengthY = -10 / this.transformation[1][1],

			yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3),
			xExp = 1 - Math.floor(Math.log( this.transformation[0][0]) / Math.LN10 - 0.3),
			yTick = Math.pow(10, yExp),
			xTick = Math.pow(10, xExp),
			i;

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
	// The x axes
	if (this.options.axes.x) {
		for (i = left; i <= right; i += yTick) {
			line([[i, -lengthY], [i, lengthY]], options, true);
		}
	}

	// The y axes
	if (this.options.axes.y) {
		for (i = bottom; i <= top; i += xTick) {
			line([[-lengthX, i], [lengthX, i]], options, true);
		}
	}


	// The labels
	// The x axes
	// .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
	// .toFixed expects arguments between 0 and 20.
	var xLen = Math.max(0, Math.min(20, -xExp)),
			yLen = Math.max(0, Math.min(20, -yExp));

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
		}
		else {
			text(0..toFixed(yLen), 0, -2 * lengthY, textOptions, true);
		}
	}

	return this;
}


// ### Screen2D.prototype.drawGrid
// Draws the grid.
//
// *@return {Screen2D}*
drawGrid() {

	if (!this.options.grid) {
		return this;
	}

	var i, ii,
			line   = (...args : any[]) => this.renderer.line.apply(this.layer.grid, args),
			circle = (...args : any[]) => this.renderer.circle.apply(this.layer.grid, args),
			top    = (            - this.translation.y) / this.scale.y,
			bottom = (this.height - this.translation.y) / this.scale.y,
			left   = (            - this.translation.x) / this.scale.x,
			right  = (this.width  - this.translation.x) / this.scale.x,
			yTick  = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)),
			xTick  = Math.pow(10, 1 - Math.floor(Math.log( this.transformation[0][0]) / Math.LN10 - 0.3));


	if (this.options.grid.type === 'cartesian') {

		// The vertical lines
		if (this.options.grid.x) {
			for (i = left - (left % xTick); i <= right; i += xTick) {
				line([[i, bottom], [i, top]], extendObject(this.options.grid, this.options.grid.x), true);
			}
		}


		// The horizontal lines
		if (this.options.grid.y) {
			for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
				line([[left, i], [right, i]], extendObject(this.options.grid, this.options.grid.y), true);
			}
		}


		// Test for logarithmic plots
		/*for (i = left - (left % this.axes.tick.x); i <= right; i += this.axes.tick.x) {
			for (var j = 1; j <= 10; j++ ) {
				this.line([[i * Math.log(10) + Math.log(j), bottom], [i * Math.log(10) + Math.log(j), top]], options);
			}
		}*/


	}
	else if (this.options.grid.type === 'polar') {
		var max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right)),
				min = 0; // TODO: improve this estimate

		if (this.options.grid.angle) {
			for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle.tick) {
				line([[0, 0], [max * Math.cos(i), max * Math.sin(i)]], extendObject(this.options.grid, this.options.grid.angle), true);
			}
		}

		if (this.options.grid.r) {
			for (i = min; i <= max; i += Math.min(xTick, yTick)) {
				circle(new MathLib.Circle([0, 0, 1], i), extendObject(this.options.grid, this.options.grid.r), true);
			}
		}
	}

	return this;
}


// ### Screen.prototype.getEventPoint
// Creates a point based on the coordinates of an event.
//
// *@param {event}*  
// *@return {Point}*
getEventPoint(evt) {
	var x, y;
	if (evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else {
		x = evt.layerX;
		y = evt.layerY;
	}
	return new MathLib.Point([x, y, 1]);
}


// ### Screen2D.prototype.getineEndPoint()
// Calculates the both endpoints for the line
// for drawing purposes
//
// *@param {Line|array}*  
// *@return {array}* The array has the format [[x1, y1], [x2, y2]]
getLineEndPoints (l) {
	if (l.type === 'line') {
		var top    = (            - this.translation.y) / this.scale.y,
				bottom = (this.height - this.translation.y) / this.scale.y,
				left   = (            - this.translation.x) / this.scale.x,
				right  = (this.width  - this.translation.x) / this.scale.x,
				lineRight  = -(l[2] + l[0] * right)  / l[1],
				lineTop    = -(l[2] + l[1] * top)    / l[0],
				lineLeft   = -(l[2] + l[0] * left)   / l[1],
				lineBottom = -(l[2] + l[1] * bottom) / l[0],
				points = [];

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
	}
	else {
		return l;
	}
}


// ### Screen2D.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}*
onmousedown(evt) {
	// Only start the action if the left mouse button was clicked
	if (evt.button !== 0) {
		return;
	}


	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;

	// Pan mode
	if (this.options.interaction.allowPan && !this.options.interaction.type) {
		this.options.interaction.type = 'pan'
		this.options.interaction.startPoint = this.getEventPoint(evt);
		this.options.interaction.startTransformation = this.transformation.copy();
	}
}


// ### Screen.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}*
onmousemove(evt) {
	var p;

	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;
	

	// Pan mode
	if (this.options.interaction.type === 'pan') {
		p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
		this.translation.x = this.options.interaction.startTransformation[0][2] + p[0];
		this.translation.y = this.options.interaction.startTransformation[1][2] + p[1];
		this.draw();
	}
}


// ### Screen.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}*
onmouseup(evt) {
	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;

	// Go back to normal mode
	if (this.options.interaction.type === 'pan') {
		delete this.options.interaction.type;
		delete this.options.interaction.startPoint;
		delete this.options.interaction.startTransformation;
	}

}


// ### Screen.prototype.onmousewheel()
// Handles the mousewheel event
//
// *@param {event}*
onmousewheel(evt) {
	var delta, s, p, z;

	if (this.options.interaction.allowZoom) {

		if (evt.preventDefault) {
			evt.preventDefault();
		}
		evt.returnValue = false;


		// Chrome/Safari
		if (evt.wheelDelta) {
			delta = evt.wheelDelta / 360;
		}
		// Firefox
		else {
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
}


// ### Screen2D.prototype.resize()
// Adjust the rendering if the screen is resized
//
// *@param {number}* The new width  
// *@param {number}* The new height  
// *@return {Screen2D}*
resize(width : number, height : number) : Screen2D {
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

		this.layer.axes.element.width = width;
		this.layer.axes.element.height = height;
		this.layer.axes.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
		this.layer.axes.ctx.strokeStyle = colorConvert(this.options.axes.color) || '#000000';

		this.layer.main.element.width = width;
		this.layer.main.element.height = height;
		this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
	}


	else if (this.options.renderer === 'SVG') {
		this.element.setAttribute('width', width + 'px');
		this.element.setAttribute('height', height + 'px');
	}

	this.applyTransformation();
	this.draw();

	return this;
}


}// ## <a id="Screen3D"></a>Screen3D
// Two dimensional plotting

export class Screen3D extends Screen {
	type = 'screen3D';

	grid: any;
	axes: any;
	render: any;
	camera: any;
	element: any;
	scene: any;

	constructor (id: string, options = {}) {
		super(id, options);

		var defaults = {
					anaglyphMode: false,
					axes: true,
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
							tick: {x: 1, y: 1, r: 1}
						},
						xz: {
							angle: Math.PI / 8,
							color: 0xcccccc,
							type: 'none',
							tick: {x: 1, z: 1, r: 1}
						},
						yz: {
							angle: Math.PI / 8,
							color: 0xcccccc,
							type: 'none',
							tick: {y: 1, z: 1, r: 1}
						}
					},
					height: 500,
					renderer: 'WebGL',
					width: 500
				},
				opts = extendObject(defaults, options),
				scene = new THREE.Scene(),
				//clock = new THREE.Clock(),
				camera, renderer, controls, viewAngle, aspect, near, far;

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
		renderer = new THREE[opts.renderer + 'Renderer']({antialias: true, preserveDrawingBuffer: true});
		// Remove the warning message.
		this.wrapper.innerHTML = '';
		this.wrapper.appendChild(renderer.domElement);


		// Storing the the original renderer to recover it easily when leaving anaglyph mode
		var origRenderer = renderer;

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
		}
		// A update function for the controls doing nothing.
		// The function is called in the update function.
		else {
			controls = {
				update: function () {}
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
		renderer.setClearColorHex(opts.background, 1);
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
		function animate () {
			requestAnimationFrame(animate);
			render();
			update();
		}

		function update () {
			//var delta = clock.getDelta();
			controls.update();
		}

		// Render the scene
		function render () {
			renderer.render(scene, camera);
		}


		// kick of the animation loop
		animate();


		this.options = opts;
		this.element = renderer.domElement;
		this.renderer = renderer;
		this.camera = camera;

		this.container.classList.add('MathLib_screen3D');
	}


// ### Screen3D.prototype.drawGrid
// Draws the grid.
//
// *@return {Screen3D}*
drawGrid() {
	if (!this.options.grid) {
		return this;
	}

	var _this = this,
			gridDrawer = function (opts, rotX, rotY) {
				var size = 10,
						grid = new THREE.Object3D(),
						color = new THREE.Color(opts.color),
						i, ii;

				if (opts.type === 'cartesian') {
					var tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y,
							tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y,
							lines = new THREE.Shape();

					for (i = -size; i <= size; i += tickX) {
						lines.moveTo(-size, i);
						lines.lineTo(size, i);
					}

					for (i = -size; i <= size; i += tickY) {
						lines.moveTo(i, -size);
						lines.lineTo(i, size);
					}

					grid.add(new THREE.Line(lines.createPointsGeometry(), new THREE.LineBasicMaterial({color: color}), THREE.LinePieces));

					grid.rotation.x = rotX;
					grid.rotation.y = rotY;

					_this.scene.add(grid);
				}

				else if (opts.type === 'polar') {

					var circles = new THREE.Shape(),
							rays = new THREE.Shape();

					for (i = 0; i <= size; i += opts.tick.r) {
						circles.moveTo(i, 0);
						circles.absarc(0, 0, i, 0, 2 * Math.PI + 0.001, false);
					}
					grid.add(new THREE.Line(circles.createPointsGeometry(),
											new THREE.LineBasicMaterial({color: color})));

					for (i = 0, ii = 2 * Math.PI; i < ii; i += opts.angle) {
						rays.moveTo(0, 0);
						rays.lineTo(size * Math.cos(i), size * Math.sin(i));
					}

					grid.add(new THREE.Line(rays.createPointsGeometry(), new THREE.LineBasicMaterial({color: color})));

					grid.rotation.x = rotX;
					grid.rotation.y = rotY;

					_this.scene.add(grid);

				}
			};


	gridDrawer(this.options.grid.xy, 0, 0);
	gridDrawer(this.options.grid.xz, Math.PI / 2, 0);
	gridDrawer(this.options.grid.yz, 0, Math.PI / 2);

	return this;
}


// ### Matrix.parametricPlot3D()
//
//
// *@param {function}* The function which is called on every argument  
// *@return {Screen3D}*
parametricPlot3D(f, options) : Screen3D {

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
			},
			opts = extendObject(defaults, options),


			Curve = THREE.Curve.create(
				function () {},
				function (t) {
					t = (opts.max - opts.min) * t + opts.min;
					var ft = f(t);
					return new THREE.Vector3(ft[0], ft[1], ft[2]);
				}
			),
		

			mesh = new THREE.Mesh(
				new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug),
				new THREE[opts.material.type + 'Material'](opts.material)
			);


	this.scene.add(mesh);


	/*
	guiObj = {
		color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
	};


	var folder = _3D.datGUI.addFolder(options.name);
	folder.add(mesh, 'visible');
	folder.addColor(guiObj, 'color')
		.onChange(function (value) {mesh.material.color.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);});
	*/

	return this;
}


// ### Screen3D.prototype.plot3D()
//
//
// *@param {function}* The map for the height  
// *@param {object}* Options  
// *@return {Screen3D}*
plot3D(f, options) : Screen3D {
	return this.surfacePlot3D(function (u, v) {
		return [u, v, f(u, v)];
	},
	options);
}


// ### Screen3D.prototype.resize()
// Adjust the rendering if the screen is resized
//
// *@param {number}* The new width  
// *@param {number}* The new height  
// *@return {Screen3D}*
resize(width : number, height : number) : Screen3D {
	this.renderer.setSize(width, height);
	this.camera.aspect = width / height;
	this.camera.updateProjectionMatrix();

	return this;
}


// ### screen3D.prototype.surfacePlot()
//
//
// *@param {function}* The map for the surface    
// *@param {object}* Options  
// *@return {Screen3D}*
surfacePlot3D(f, options) : Screen3D {
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
			},
			opts = extendObject(defaults, options),
			map = function (u, v) {
				u = (opts.xmax - opts.xmin) * u + opts.xmin;
				v = (opts.ymax - opts.ymin) * v + opts.ymin;
				var fuv = f(u, v);
				return new THREE.Vector3(fuv[0], fuv[1], fuv[2]);
			},
			material = new THREE[opts.material.type + 'Material'](opts.material),
			mesh;

			material.side = THREE.DoubleSide;

			mesh = new THREE.Mesh(
				new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false),
				material
			);

	this.scene.add(mesh);

	// if (options.datGUI) {
	//   guiObj = {
	//     color: [mesh.material.color.r, mesh.material.color.g, mesh.material.color.b]
	//   };

	//   var folder = _3D.datGUI.addFolder(options.datGUI.name);
	//   if (options.datGUI.visible) {
	//     folder.add(mesh, 'visible');
	//   }

	//   if (options.datGUI.wireframe) {
	//     folder.add(mesh.material, 'wireframe');
	//   }


	//   if (options.datGUI.color) {
	//     color = mesh.material.color.getHex();
	//     var guiObj = {
	//       color: color
	//     };

	//     folder.addColor(guiObj, 'color').name('color')
	//       .onChange(function (value) {mesh.material.color = new THREE.Color(value);});
	//   }
	// }

	return this;
}


}// ## <a id="Vector" href="http://mathlib.de/en/docs/Vector">Vector</a>
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `new MathLib.Vector([1, 2, 3])`
// to create the following vector:  
//    ⎛ 1 ⎞  
//    ⎜ 2 ⎟  
//    ⎝ 3 ⎠

export class Vector {
	type = 'vector';

	length: number;

	constructor (coords: number[]) {
		coords.forEach((x, i) => {this[i] = x;});
		this.length = coords.length;
	}


// ### [Vector.prototype.areLinearIndependent()](http://mathlib.de/en/docs/Vector/areLinearIndependent)
// Checks if the vectors are linear independent.
//
// *@param {array}* An array containing the vectors.  
// *@return {boolean}*
static areLinearIndependent = function (v : Vector[]) : boolean {
	var n = v.length,
			m = v[0].length;

	if (n > m) {
		return false;
	}

	if (! v.every(function (x) {
		return x.length === m;
		}) ) {
		return undefined;
	}

	return (new MathLib.Matrix(v)).rank() === n;
};


// ### [Vector.prototype.compare()](http://mathlib.de/en/docs/Vector/compare)
// Compares two vectors.
//
// *@param {Vector}* The vector to compare  
// *@return {number}*
compare(v : Vector) : number {
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
}


// ### [Vector.prototype.every()](http://mathlib.de/en/docs/Vector/every)
// Works like Array.prototype.every.
//
// *@return {boolean}*
every(f : (value : any, index : number, vector : Vector ) => boolean) : boolean {
	return Array.prototype.every.call(this, f);
}


// ### [Vector.prototype.forEach()](http://mathlib.de/en/docs/Vector/forEach)
// Works like Array.prototype.forEach.
//
forEach(f : (value : any, index : number, vector : Vector ) => void) : void {
	Array.prototype.forEach.call(this, f);
}


// ### [Vector.prototype.isEqual()](http://mathlib.de/en/docs/Vector/isEqual)
// Determines if two vectors are equal
//
// *@param {Vector}* v The vector to compare  
// *@return {boolean}*
isEqual(v : Vector) : boolean {
	if (this.length !== v.length) {
		return false;
	}

	return this.every(function (x, i) {
		return MathLib.isEqual(x, v[i]);
	});
}


// ### [Vector.prototype.isZero()](http://mathlib.de/en/docs/Vector/isZero)
// Determines if the vector is the zero vector.
//
// *@return {boolean}*
isZero() : boolean {
	return this.every(MathLib.isZero);
}


// ### [Vector.prototype.map()](http://mathlib.de/en/docs/Vector/map)
// Works like Array.prototype.map.
//
// *@param {function}*  
// *@return {Vector}*
map(f : (value : any, index : number, vector : Vector ) => any) : any {
	return new this['constructor'](Array.prototype.map.call(this, f));
}


// ### [Vector.prototype.minus()](http://mathlib.de/en/docs/Vector/minus)
// Calculates the difference of two vectors.
//
// *@param {Vector}* The vector to be subtracted.  
// *@return {Vector}*
minus(v : Vector) : Vector {
	if (this.length === v.length) {
		return this.plus(v.negative());
	}
	else {
		MathLib.error({message: 'Vector sizes not matching', method: 'Vector#minus'});
		return;
	}
}


// ### [Vector.prototype.negative()](http://mathlib.de/en/docs/Vector/negative)
// Returns the negative vector.
//
// *@return {Vector}*
negative() : Vector {
	return this.map(MathLib.negative);
}


// ### [Vector.prototype.norm()](http://mathlib.de/en/docs/Vector/norm)
// Calcultes the norm of the vector.
//
// *@param {number}* [default=2] The p for the p-norm  
// *@return {number}*
norm(p = 2) : number {
	if (p === 2) {
		return MathLib.hypot.apply(null, this.toArray());
	}
	else if (p === Infinity) {
		return Math.max.apply(null, this.map(Math.abs).toArray());
	}
	else {
		return MathLib.root(this.reduce(function (prev, curr) {
			return prev + Math.pow(Math.abs(curr), p);
		}, 0), p);
	}
}


// ### [Vector.prototype.outerProduct()](http://mathlib.de/en/docs/Vector/outerProduct)
// Calculates the outer product of two vectors.
//
// *@param {Vector}*  
// *@return {Matrix}*
outerProduct(v : Vector) : Matrix {
	return new MathLib.Matrix(this.map(function (x) {
		return v.map(function (y) {
			return MathLib.times(x, y);
		});
	}));
}


// ### [Vector.prototype.plus()](http://mathlib.de/en/docs/Vector/plus)
// Calculates the sum of two vectors.
//
// *@param {Vector}*  
// *@return {Vector}*
plus(v : Vector) : Vector {
	if (this.length === v.length) {
		return new MathLib.Vector(this.map(function (x, i) {
			return MathLib.plus(x, v[i]);
		}));
	}
	else {
		MathLib.error({message: 'Vector sizes not matching', method: 'Vector#plus'});
		return;
	}
}


// ### [Vector.prototype.reduce()](http://mathlib.de/en/docs/Vector/reduce)
// Works like Array.prototype.reduce.
//
// *@return {any}*
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, args);
}


// ### [Vector.prototype.scalarProduct()](http://mathlib.de/en/docs/Vector/scalarProduct)
// Calculates the scalar product of two vectors.
//
// *@param {Vector}*  
// *@return {number|Complex}*
scalarProduct(v : Vector) : any {
	if (this.length === v.length) {
		return this.reduce(function (old, cur, i, w) {
			return MathLib.plus(old, MathLib.times(w[i], v[i]));
		}, 0);
	}
	else {
		MathLib.error({message: 'Vector sizes not matching', method: 'Vector#scalarProduct'});
		return;
	}
}


// ### [Vector.prototype.slice()](http://mathlib.de/en/docs/Vector/slice)
// Works like the Array.prototype.slice function
//
// *@return {array}*
slice(...args : any[]) : any[] {
	return Array.prototype.slice.apply(this, args);
}


// ### [Vector.prototype.times()](http://mathlib.de/en/docs/Vector/times)
// Multiplies the vector by a (complex) number or a matrix.
// The vector is multiplied from left to the matrix. 
// If you want to multiply it from the right use
// matrix.times(vector) instead of vector.times(matrix)
//
// *@param {number|Complex|Matrix}*  
// *@return {Vector}*
times(n : any) : any {
	var i, ii, colVectors,
			product = [];
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
		}
		else {
			MathLib.error({message: 'Vector/Matrix sizes not matching', method: 'Vector#times'});
			return;
		}
	}
}


// ### [Vector.prototype.toArray()](http://mathlib.de/en/docs/Vector/toArray)
// Converts the vector to an array.
//
// *@return {array}*
toArray() : any[] {
	return Array.prototype.slice.call(this);
}


// ### [Vector.prototype.toContentMathML()](http://mathlib.de/en/docs/Vector/toContentMathML)
// Returns the content MathML representation of the vector.
//
// *@return {string}*
toContentMathML() : string {
	return this.reduce(function (old, cur) {
		return old + MathLib.toContentMathML(cur);
	}, '<vector>') + '</vector>';
}


// ### [Vector.prototype.toLaTeX()](http://mathlib.de/en/docs/Vector/toLaTeX)
// Returns a LaTeX representation of the vector.
//
// *@return {string}*
toLaTeX() : string {
	return '\\begin{pmatrix}\n\t' + this.reduce(function (old, cur) {
		return old + '\\\\\n\t' + MathLib.toLaTeX(cur);
	}) + '\n\\end{pmatrix}';
}


// ### [Vector.prototype.toMathML()](http://mathlib.de/en/docs/Vector/toMathML)
// Returns the (presentation) MathML representation of the vector.
//
// *@return {string}*
toMathML() : string {
	return this.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}


// ### [Vector.prototype.toString()](http://mathlib.de/en/docs/Vector/toString)
// Returns a string representation of the vector.
//
// *@return {string}*
toString() : string {
	return '(' + this.reduce(function (old, cur) {
		return old + ', ' + MathLib.toString(cur);
	}) + ')';
}


// ### [Vector.prototype.vectorProduct()](http://mathlib.de/en/docs/Vector/vectorProduct)
// Calculates the vector product of two vectors.
//
// *@param {Vector}*  
// *@return {Vector}*
vectorProduct(v : Vector) : Vector {
	/* TODO: Implement vectorproduct for non three-dimensional vectors */
	if (this.length === 3 && v.length === 3) {
		return new MathLib.Vector([
			MathLib.minus(MathLib.times(this[1], v[2]), MathLib.times(this[2], v[1])),
			MathLib.minus(MathLib.times(this[2], v[0]), MathLib.times(this[0], v[2])),
			MathLib.minus(MathLib.times(this[0], v[1]), MathLib.times(this[1], v[0]))
		]);
	}
	else {
		MathLib.error({message: 'Vectors are not three-dimensional', method: 'Vector#vectorProduct'});
		return;
	}
}


// ### [Vector.prototype.zero()](http://mathlib.de/en/docs/Vector/zero)
// Returns a zero vector of given size.
//
// *@param {number}* The number of entries in the vector.  
// *@return {Vector}*
static zero = function (n : number) : Vector {
	var vector = [], i;
	for (i = 0; i < n; i++) {
		vector.push(0);
	}
	return new MathLib.Vector(vector);
}


}// ## <a id="Circle" href="http://mathlib.de/en/docs/Circle">Circle</a>
// MathLib.Circle expects two arguments.
// First the center in the form of an Array or a MathLib.point.
// The second argument should be the radius of the circle.
//
// #### Simple use case:  
// ```
// // Create a circle with center (1, 2) and radius 3.  
// var c = new MathLib.Circle([1, 2], 3);  
// c.center                   // The center of the circle (point)  
// c.radius                   // returns the radius of the circle
// ```

export class Circle {

	type = 'circle';

	center: Point;
	radius: number;

	constructor (center: any, radius: number) {

		if (center.type === undefined) {
			center = new MathLib.Point(center.concat(1));
		}

		this.center = center;
		this.radius = radius;
	}



// ### [Circle.prototype.area()](http://mathlib.de/en/docs/Circle/area)
// Calculates the area of the circle.
//
// *@return {number}* The area of the circle
area() : number {
	return this.radius * this.radius * Math.PI;
}


// ### [Circle.prototype.circumference()](http://mathlib.de/en/docs/Circle/circumference)
// Calculates the circumference of the circle.
//
// *@return {number}* The circumference of the circle
circumference() : number {
	return 2 * this.radius * Math.PI;
}


// ### [Circle.prototype.compare()](http://mathlib.de/en/docs/Circle/compare)
// Compares two circles
//
// *@param {Circle}* The circle to compare  
// *@return {number}*
compare(c : Circle) : number {
	return MathLib.sign(this.center.compare(c.center)) || MathLib.sign(this.radius - c.radius);
}


// ### [Circle.prototype.draw()](http://mathlib.de/en/docs/Circle/draw)
// Draw the circle onto the screen.
//
// *@param {Screen}* The screen to draw onto.  
// *@param {object}* Optional drawing options  
// *@return {Circle}* Returns the circle for chaining
draw(screen, options) {
	if (Array.isArray(screen)) {
		var circle = this;
		screen.forEach(function (x) {
			x.circle(circle, options);
		});
	}
	else {
		screen.circle(this, options);
	}
	return this;
}


// ### [Circle.prototype.isEqual()](http://mathlib.de/en/docs/Circle/isEqual)
// Checks if two circles are equal
//
// *@return {boolean}*
isEqual(c: Circle) : boolean {
	return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
}


// ### [Circle.prototype.positionOf()](http://mathlib.de/en/docs/Circle/positionOf)
// Determine if a point is in, on or outside a circle.
//
// *@return {string}*
positionOf(p) : string {
	var diff;
	if (p.type === 'point' && p.dimension === 2) {
		diff = p.distanceTo(this.center) - this.radius;
		if (MathLib.isZero(diff)) {
			return 'on';
		}
		else if (diff < 0) {
			return 'in';
		}
		else {
			return 'out';
		}
	}
}


// ### [Circle.prototype.reflectAt()](http://mathlib.de/en/docs/Circle/reflectAt)
// Reflect the circle at a point or line
//
// *@return {Circle}*
reflectAt(a) : Circle {
	return new MathLib.Circle(this.center.reflectAt(a), this.radius);
}


// ### [Circle.prototype.toLaTeX()](http://mathlib.de/en/docs/Circle/toLaTeX)
// Returns a LaTeX expression of the circle
//
// *@return {string}* 
toLaTeX() : string {
	return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
}


// ### [Circle.prototype.toMatrix()](http://mathlib.de/en/docs/Circle/toMatrix)
// Converts the circle to the corresponding matrix.
//
// *@return {Matrix}* 
toMatrix() : Matrix {
	var x = this.center[0] / this.center[2],
			y = this.center[1] / this.center[2],
			r = this.radius;
	return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
}


}// ## <a id="Complex"></a>Complex
// MathLib.Complex is the MathLib implementation of complex numbers.
//
// There are two ways of defining complex numbers:
//
// * Two numbers representing the real and the complex part.
// * MathLib.Complex.polar(abs, arg)
//
// #### Simple example:
// ```
// // Create the complex number 1 + 2i  
// var c = new MathLib.Complex(1, 2);  
// ```

export class Complex {

	type = 'complex';

	re: number;
	im: number;

	constructor (re: number, im = 0) {
		if (MathLib.isNaN(re) || MathLib.isNaN(im)) {
			this.re = NaN;
			this.im = NaN;
		}
		else if (!MathLib.isFinite(re) || !MathLib.isFinite(im)) {
			this.re = Infinity;
			this.im = Infinity;
		}
		else {
			this.re = re;		
			this.im = im;
		}
	}


// ### [Complex.prototype.abs()](http://mathlib.de/en/docs/Complex/abs)
// Returns the absolute value of the number.
//
// *@return {number}*
abs() : number {
	return MathLib.hypot(this.re, this.im);
}


// ### [Complex.prototype.arccos()](http://mathlib.de/en/docs/Complex/arccos)
// Returns the inverse cosine of the number.
//
// *@return {Complex}*
arccos() : Complex {
	return MathLib.minus(Math.PI / 2, this.arcsin());
}


// ### [Complex.prototype.arccot()](http://mathlib.de/en/docs/Complex/arccot)
// Returns the inverse cotangent of the number.
//
// *@return {Complex}*
arccot() : Complex {
	if (this.isZero()) {
		return new MathLib.Complex(MathLib.sign(1/this.re) * Math.PI / 2, -this.im);
	}
	return this.inverse().arctan();
	//var c = this.arctan();
	//console.log(c.toString());
	//return new MathLib.Complex(Math.PI / 2 - c.re, c.im);
	//return MathLib.minus(Math.PI / 2, this.arctan());
}


// ### [Complex.prototype.arccsc()](http://mathlib.de/en/docs/Complex/arccsc)
// Returns the inverse cosecant of the number
//
// *@return {Complex}*
arccsc() : Complex {

	// arccsc(0) = ComplexInfinity not ComplexNaN
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return this.inverse().arcsin();
}


// ### [Complex.prototype.arcsec()](http://mathlib.de/en/docs/Complex/arcsec)
// Returns the inverse secant of the number
//
// *@return {Complex}*
arcsec() : Complex {

	// arcsec(0) = ComplexInfinity not ComplexNaN
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return this.inverse().arccos();
}


// ### [Complex.prototype.arcsin()](http://mathlib.de/en/docs/Complex/arcsin)
// Returns the inverse sine of the number
//
// *@return {Complex}*
arcsin() : Complex {
	var a = this.re,
			b = this.im,
			aa = a * a,
			bb = b * b,
			sqrt = Math.sqrt(Math.pow(aa + bb - 1, 2) + 4 * bb),
			sgn = function (x) {
				if (x > 0) {
					return 1; 
				}
				if (x < 0) {
					return -1; 
				}
				if (1/x === Infinity) {
					return 1; 
				}
				if (1/x === -Infinity) {
					return -1; 
				}
			};

	if (a === Infinity) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(
			sgn(a) / 2 * MathLib.arccos(sqrt - (aa + bb)),
			sgn(b) / 2 * MathLib.arcosh(sqrt + (aa + bb))
		);
}


// ### [Complex.prototype.arctan()](http://mathlib.de/en/docs/Complex/arctan)
// Returns the inverse tangent of the number
//
// *@return {Complex}*
arctan() : Complex {
	var res,
			iz = new MathLib.Complex(-this.im, this.re);

	if (this.isZero()) {
		return new MathLib.Complex(this.re, this.im);
	}
	
	res = MathLib.times(new MathLib.Complex(0, -0.5),
		MathLib.plus(1, iz).divide(MathLib.minus(1, iz)).ln());

	// Correct some values on the axis imaginary axis.
	// TODO: Are this all the wrong values?
	if (MathLib.isNegZero(this.re) && res.re !== Infinity && (this.im < 0 || this.im > 1)) {
		res.re = -res.re;
	}

	return res;
}


// ### [Complex.prototype.arg()](http://mathlib.de/en/docs/Complex/arg)
// Returns the argument (= the angle) of the complex number
//
// *@return {number}*
arg() : number {
	if (this.re === Infinity) {
		return NaN;
	}
	return Math.atan2(this.im, this.re);
}


// ### Complex.prototype.artanh()
// Returns the inverse hyperbolic tangent of the number
//
// *@return {Complex}*
artanh() : Complex {
	if (this.isZero()) {
		return new MathLib.Complex(this.re, this.im);
	}
	
	if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}

	return MathLib.times(0.5, MathLib.minus(MathLib.ln(MathLib.plus(1, this)), MathLib.ln(MathLib.minus(1, this))));
}


// ### [Complex.prototype.compare()](http://mathlib.de/en/docs/Complex/compare)
// Compares two complex numbers
//
// *@return {number}*
compare(x) : number {
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
}


// ### [Complex.prototype.conjugate()](http://mathlib.de/en/docs/Complex/conjugate)
// Calculates the conjugate of a complex number
//
// *@return {Complex}*
conjugate() : Complex {
	return new MathLib.Complex(this.re, MathLib.negative(this.im));
}


// ### [Complex.prototype.copy()](http://mathlib.de/en/docs/Complex/copy)
// Copies the complex number
//
// *@return {Complex}*
copy() : Complex {
	return new MathLib.Complex(MathLib.copy(this.re), MathLib.copy(this.im));
}


// ### [Complex.prototype.cos()](http://mathlib.de/en/docs/Complex/cos)
// Calculates the cosine of a complex number
//
// *@return {Complex}*
cos() : Complex {
	return new MathLib.Complex(MathLib.cos(this.re) * MathLib.cosh(this.im), -MathLib.sin(this.re) * MathLib.sinh(this.im));
}


// ### [Complex.prototype.cosh()](http://mathlib.de/en/docs/Complex/cosh)
// Calculates the hyperbolic cosine of a complex number
//
// *@return {Complex}*
cosh() : Complex {
	return new MathLib.Complex(MathLib.cos(this.im) * MathLib.cosh(this.re), MathLib.sin(this.im) * MathLib.sinh(this.re));
}


// ### [Complex.prototype.cot()](http://mathlib.de/en/docs/Complex/cot)
// Calculates the cotangent of a complex number
//
// *@return {Complex}*
cot() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cos(aa) - MathLib.cosh(bb);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}
			
	return new MathLib.Complex(-MathLib.sin(aa) / d , MathLib.sinh(bb) / d);
}


// ### [Complex.prototype.coth()](http://mathlib.de/en/docs/Complex/coth)
// Calculates the hyperbolic cotangent of a complex number
//
// *@return {Complex}*
coth() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cosh(aa) - MathLib.cos(bb);

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(MathLib.sinh(aa) / d , -MathLib.sin(bb) / d);
}


// ### [Complex.prototype.csc()](http://mathlib.de/en/docs/Complex/csc)
// Calculates the cosecant of a complex number
//
// *@return {Complex}*
csc() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cos(2 * a) - MathLib.cosh(2 * b);
	
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(-2 * MathLib.sin(a) * MathLib.cosh(b) / d , 2 * MathLib.cos(a) * MathLib.sinh(b) / d);
}


// ### [Complex.prototype.csch()](http://mathlib.de/en/docs/Complex/csch)
// Calculates the hyperbolic cosecant of a complex number
//
// *@return {Complex}*
csch() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cosh(2 * a) - MathLib.cos(2 * b);
	
	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	return new MathLib.Complex(2 * MathLib.sinh(a) * MathLib.cos(b) / d , -2 * MathLib.cosh(a) * MathLib.sin(b) / d);
}


// ### [Complex.prototype.divide()](http://mathlib.de/en/docs/Complex/divide)
// Divides a complex number by an other
//
// *@param {number|Complex}* The divisor  
// *@return {Complex}*
divide(c) : Complex {
	return this.times(MathLib.inverse(c));
}


// ### [Complex.prototype.exp()](http://mathlib.de/en/docs/Complex/exp)
// Evaluates the exponential function with a complex argument
//
// *@return {Complex}*
exp() : Complex {
	return new MathLib.Complex(MathLib.exp(this.re) * MathLib.cos(this.im), MathLib.exp(this.re) * MathLib.sin(this.im));
}


// ### [Complex.prototype.inverse()](http://mathlib.de/en/docs/Complex/inverse)
// Calculates the inverse of a complex number
//
// *@return {Complex}*
inverse() : Complex {
	var d = MathLib.plus(MathLib.pow(this.re, 2), MathLib.pow(this.im, 2));

	if (this.isZero()) {
		return new MathLib.Complex(Infinity);
	}

	if (this.re === Infinity) {
		return new MathLib.Complex(0);
	}

	return new MathLib.Complex(MathLib.divide(this.re, d), MathLib.divide(MathLib.negative(this.im), d));
}


// ### [Complex.prototype.isEqual()](http://mathlib.de/en/docs/Complex/isEqual)
// Determines if the complex number is equal to another number.
//
// *@param {Complex|number|Rational}* The number to be compared  
// *@return {boolean}*
isEqual(n) : boolean {
	if (typeof n === 'number') {
		return MathLib.isEqual(this.re, n) && MathLib.isZero(this.im);
	}
	if (n.type === 'complex') {
		return MathLib.isEqual(this.re, n.re) && MathLib.isEqual(this.im, n.im);
	}
	return false;
}


// ### [Complex.prototype.isFinite()](http://mathlib.de/en/docs/Complex/isFinite)
// Determines if the complex number is finite.
//
// *@return {boolean}*
isFinite() : boolean {
	return MathLib.isFinite(this.re);
}


// ### [Complex.prototype.isZero()](http://mathlib.de/en/docs/Complex/isZero)
// Determines if the complex number is equal to 0.
//
// *@return {boolean}*
isZero() : boolean {
	return MathLib.isZero(this.re) && MathLib.isZero(this.im);
}


// ### [Complex.prototype.ln()](http://mathlib.de/en/docs/Complex/ln)
// Evaluates the natural logarithm with complex arguments
//
// *@return {Complex}*
ln() : Complex {
	if (this.re === Infinity) {
		return new MathLib.Complex(Infinity);
	}
	return new MathLib.Complex(MathLib.ln(this.abs()), this.arg());
}


// ### [Complex.prototype.minus()](http://mathlib.de/en/docs/Complex/minus)
// Calculates the difference of two complex numbers
//
// *@param {number|Complex}* The subtrahend  
// *@return {Complex}*
minus(c) : Complex {
	return this.plus(MathLib.negative(c));
}


// ### [Complex.prototype.negative()](http://mathlib.de/en/docs/Complex/negative)
// Calculates the negative of the complex number
//
// *@return {Complex}*
negative() : Complex {
	return new MathLib.Complex(MathLib.negative(this.re), MathLib.negative(this.im));
}


// ### [Complex.prototype.plus()](http://mathlib.de/en/docs/Complex/plus)
// Add complex numbers
//
// *@param {Complex|number|Rational}* The number to be added  
// *@return {Complex}*
plus(c) : Complex {
	if (c.type === 'complex') {
		return new MathLib.Complex(MathLib.plus(this.re, c.re), MathLib.plus(this.im, c.im));
	}
	else if (c.type === 'rational') {
		c = c.toNumber();
	}
	if (typeof c === 'number') {
		return new MathLib.Complex(MathLib.plus(this.re, c), this.im);
	}
}


// ### [Complex.polar()](http://mathlib.de/en/docs/Complex/polar)
// Construct a complex number out of the absolute value and the argument
//
// *@return {Complex}*
static polar = function (abs, arg) : Complex {
	if (abs === Infinity) {
		return new MathLib.Complex(Infinity);
	}
	return new MathLib.Complex(abs * Math.cos(arg), abs * Math.sin(arg));
};


// ### [Complex.prototype.pow()](http://mathlib.de/en/docs/Complex/pow)
// Calculates the complex number raised to some power
//
// *@param {numeric}* The power to which the complex number should be raised   
// *@return {Complex}*
pow(c) : Complex {	
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

		return MathLib.Complex.polar(
			MathLib.times(
				MathLib.pow(abs, re),
				MathLib.exp(
					MathLib.negative(
						MathLib.times(im, arg)
					)
				)
			),
			MathLib.plus(MathLib.times(re, arg), MathLib.times(im, MathLib.ln(abs)))
		);
	}
	else {
		// The naive pow method has some rounding errrors. For example
		// (2+5i)^3 = -142.00000000000006-64.99999999999999i  
		// instead of -142-65i which are errors of magnitude around 1e-14.
		// This error increases quickly for increasing exponents.
		// (2+5i)^21 has an error of 5.8 in the real part
		/*
		return MathLib.Complex.polar(MathLib.pow(abs, c), MathLib.times(arg, c));
		*/

		// The following algorithm uses a sifferent approach for integer exponents,
		// where it yields exact results.
		// Non integer exponents are evaluated using the naive approach.
		// TODO: Improve the algorithm.
		var i,
				int = MathLib.floor(Math.abs(c)),
				res = new MathLib.Complex(1),
				power = this,
				bin = int.toString(2);

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
}


// ### [Complex.prototype.sec()](http://mathlib.de/en/docs/Complex/sec)
// Calculates the secant of a complex number
//
// *@return {Complex}*
sec() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cos(2 * a) + MathLib.cosh(2 * b);
			
	return new MathLib.Complex(2 * MathLib.cos(a) * MathLib.cosh(b) / d , 2 * MathLib.sin(a) * MathLib.sinh(b) / d);
}


// ### [Complex.prototype.sech()](http://mathlib.de/en/docs/Complex/sech)
// Calculates the hyperbolic secant of a complex number
//
// *@return {Complex}*
sech() : Complex {
	var a = this.re,
			b = this.im,
			d = MathLib.cosh(2 * a) + MathLib.cos(2 * b);
			
	return new MathLib.Complex(2 * MathLib.cosh(a) * MathLib.cos(b) / d , -2 * MathLib.sinh(a) * MathLib.sin(b) / d);
}


// ### [Complex.prototype.sign()](http://mathlib.de/en/docs/Complex/sign)
// Calculates the signum of a complex number
//
// *@return {Complex}*
sign() : Complex {
	if (this.isZero() || MathLib.isNaN(this.re)) {
		return this;
	}
	else if (this.re === Infinity) {
		return new MathLib.Complex(NaN);
	}
	return MathLib.Complex.polar(1, this.arg());
}


// ### [Complex.prototype.sin()](http://mathlib.de/en/docs/Complex/sin)
// Calculates the sine of a complex number
//
// *@return {Complex}*
sin() : Complex {
	return new MathLib.Complex(MathLib.sin(this.re) * MathLib.cosh(this.im), MathLib.cos(this.re) * MathLib.sinh(this.im));
}


// ### [Complex.prototype.sinh()](http://mathlib.de/en/docs/Complex/sinh)
// Calculates the hyperbolic sine of a complex number
//
// *@return {Complex}*
sinh() : Complex {
	return new MathLib.Complex(MathLib.cos(this.im) * MathLib.sinh(this.re), MathLib.sin(this.im) * MathLib.cosh(this.re));
}


// ### [Complex.prototype.sqrt()](http://mathlib.de/en/docs/Complex/sqrt)
// Takes the square root of a complex number
//
// *@return {Complex}*
sqrt() : Complex {
	return MathLib.Complex.polar(Math.sqrt(this.abs()), this.arg() / 2);
}


// ### [Complex.prototype.tan()](http://mathlib.de/en/docs/Complex/tan)
// Calculates the tangent of a complex number
//
// *@return {Complex}*
tan() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cos(aa) + MathLib.cosh(bb);
			
	return new MathLib.Complex(MathLib.sin(aa) / d , MathLib.sinh(bb) / d);
}


// ### [Complex.prototype.tanh()](http://mathlib.de/en/docs/Complex/tanh)
// Calculates the hyperbolic tangent of a complex number
//
// *@return {Complex}*
tanh() : Complex {
	var aa = 2 * this.re,
			bb = 2 * this.im,
			d = MathLib.cosh(aa) + MathLib.cos(bb);
			
	return new MathLib.Complex(MathLib.sinh(aa) / d , MathLib.sin(bb) / d);
}


// ### [Complex.prototype.times()](http://mathlib.de/en/docs/Complex/times)
// Multiplies complex numbers
//
// *@param {Complex|number|Rational}* The number to be multiplied  
// *@return {Complex}*
times(c) : Complex {
	if (c.type === 'complex') {
		if (this.re === Infinity) {
			if (c.isZero() || MathLib.isNaN(c.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		if (c.re === Infinity) {
			if (this.isZero() || MathLib.isNaN(this.re)) {
				return new MathLib.Complex(NaN);
			}
			else {
				return new MathLib.Complex(Infinity);
			}
		}

		return new MathLib.Complex(MathLib.minus(MathLib.times(this.re, c.re), MathLib.times(this.im, c.im)),
			MathLib.plus(MathLib.times(this.re, c.im), MathLib.times(this.im, c.re)));
	}
	else if (c.type === 'rational') {
		c = c.toNumber();
	}
	if (typeof c === 'number') {
		return new MathLib.Complex(MathLib.times(this.re, c), MathLib.times(this.im, c));
	}
}


// ### [Complex.prototype.toContentMathML()](http://mathlib.de/en/docs/Complex/toContentMathML)
// Returns the content MathML representation of the number
//
// *@return {string}*
toContentMathML() : string {

	if (!this.isFinite()) {
		return '<csymbol cd="nums1">' + 
			(this.re === Infinity ? 'infinity' : 'NaN') +
			'</csymbol>';
	}

	return '<apply><plus />' + MathLib.toContentMathML(this.re) + '<apply><times />'
					+ MathLib.toContentMathML(this.im) + '<imaginaryi /></apply></apply>'
}


// ### [Complex.prototype.toLaTeX()](http://mathlib.de/en/docs/Complex/toLaTeX)
// Returns the LaTeX representation of the complex number
//
// *@return {string}*
toLaTeX() : string {
	var str = '',
			reFlag = false;

	if (!this.isFinite()) {
		return '\\text{Complex' + this.re + '}';
	}

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
}


// ### [Complex.prototype.toMathML()](http://mathlib.de/en/docs/Complex/toMathML)
// Returns the (presentation) MathML representation of the number
//
// *@return {string}*
toMathML() : string {
	var str = '', reFlag = false;

	if (!this.isFinite()) {
		return '<mi>Complex' + this.re + '</mi>';
	}

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
}


// ### [Complex.prototype.toPoint()](http://mathlib.de/en/docs/Complex/toPoint)

// Interprets the complex number as point in the two dimensional plane
//
// *@return {Point}*
toPoint() : Point {

	if (this.re == Infinity || MathLib.isNaN(this.re)) {
		return new MathLib.Point([0, 0, 0]);
	}

	return new MathLib.Point(this.re, this.im);
}


// ### [Complex.prototype.toString()](http://mathlib.de/en/docs/Complex/toString)
// Custom toString function
//
// *@return {string}*
toString() : string {
	var str = '';

	if (!this.isFinite()) {
		return 'Complex' + this.re;
	}

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
}


}// ## <a id="Line"></a>Line
// The line implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)

export class Line extends Vector {
	type = 'line';

	dimension: number;

	constructor (coords: number[]) {
		super(coords);
		this.dimension = 2;
	}


// ### Line.prototype.draw()
// Draws the line on one or more screens
//
// *@param {Screen}* The screen to draw onto.  
// *@param {object}* [options] Drawing options  
// *@return {boolean}*
draw(screen, options) {
	if (Array.isArray(screen)) {
		var line = this;
		screen.forEach(function (x) {
			x.line(line, options);
		});
	}
	else {
		screen.line(this, options);
	}
	return this;
}


// ### Line.prototype.isEqual()
// Determines if two lines are equal.
//
// *@param {Line}*  
// *@return {boolean}*
isEqual(q : Line) : boolean {
	var p = this.normalize();
			q = q.normalize();

	if (this.length !== q.length) {
		return false;
	}

	return p.every(function (x, i) {
		return MathLib.isEqual(x, q[i]);
	});
}


// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@return {boolean}*
isFinite() : boolean {
	return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
}


// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {Line}*  
// *@return {boolean}*
isParallelTo(l : Line) : boolean {
	return MathLib.isZero(this[0]*l[1] - this[1]*l[0]);
}


// ### Line.prototype.meet()
// Calculates the meeting point of two lines
//
// *@param {Line}*  
// *@return {Point}*
meet(l : Line) : Point {
	var point,
			k = this;

	if (this.dimension === 2 && l.dimension === 2) {
		point = new MathLib.Point(this.vectorProduct(l));

		Object.defineProperties(point, {
			'0': {
				get: function () { return k[1] * l[2] - k[2] * l[1]; },
				set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet'});},
				enumerable: true
			},
			'1': {
				get: function () { return k[2] * l[0] - k[0] * l[2]; },
				set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet'});},
				enumerable: true
			},
			'2': {
				get: function () { return k[0] * l[1] - k[1] * l[0]; },
				set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet'});},
				enumerable: true
			}
		});
		
		return point;
	}
}


// ### Line.prototype.normalize()
// Normalizes the line.
//
// *@return {Line}*
normalize() : Line {
	var h = MathLib.hypot(this[0], this[1]);

	if (h !== 0){
		return this.map(function (x) {
			return x / h;
		});
	}
	else {
		return new MathLib.Line([0, 0, 1]);
	}
}


// ### Line.prototype.parallelThrough()
// Determines an parallel line through a given point.
//
// *@param {Point}*  
// *@return {Line}*
parallelThrough(p : Point) : Line {
	var l = this,
			parallel = new MathLib.Line([0,0,0]);

	Object.defineProperties(parallel, {
		'0': {
			get: function () { return -l[0] * p[2]; },
			set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough'});},
			enumerable: true
		},
		'1': {
			get: function () { return -l[1] * p[2]; },
			set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough'});},
			enumerable: true
		},
		'2': {
			get: function () { return l[1] * p[1] + l[0] * p[0]; },
			set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough'});},
			enumerable: true
		}
	});

	return parallel;
}


}// ## <a id="Matrix"></a>Matrix
// The matrix implementation of MathLib makes calculations with matrices of
// arbitrary size possible. The entries of a matrix can be numbers and complex
// numbers.
//
// It is as easy as
// ```
// new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
// ```
// to create the following matrix:  
//    ⎛ 1 2 3 ⎞  
//    ⎜ 4 5 6 ⎟  
//    ⎝ 7 8 9 ⎠

export class Matrix {
	type = 'matrix';

	length: number;
	cols: number;
	rows: number;
	LUpermutation: Permutation;

	constructor (matrix) {
		if (typeof matrix === 'string') {
			// If there is a < in the string we assume it's MathML
			if (matrix.indexOf('<') > -1) {
				return new MathLib.Expression.parseMathML(matrix).evaluate();
			}
			// else we assume it's MatLab notation
			else {
				matrix = matrix.trim().replace(/;?\n/g, '],[');
				matrix = JSON.parse('[[' + matrix + ']]');
			}
		}
		matrix.forEach((x, i) => {this[i] = x;});
		this.length = matrix.length;
		this.cols = matrix[0].length;
		this.rows = matrix.length;

	}


// ### Matrix.prototype.LU()
// Calculates the LU decomposition of a matrix
// The result is cached.
//
// *@return {Matrix}*
LU() {
	var i, j, k, t, p,
			LU = this.toArray(),
			m = this.rows,
			n = this.cols,
			permutation = [];

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
			t = LU[p]; LU[p] = LU[k]; LU[k] = t;
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
}


// ### Matrix.prototype.adjoint()
// Calculates the adjoint matrix
//
// *@return {Matrix}*
adjoint() : Matrix {
	return this.map(MathLib.conjugate).transpose();
}


// ### Matrix.prototype.adjugate()
// Calculates the adjugate matrix
//
// *@return {Matrix}*
adjugate() : Matrix {
	return this.map(function (x, r, c, m) {
		return MathLib.times(m.remove(c, r).determinant(), 1 - ((r + c) % 2) * 2);
	});
}


// ### Matrix.prototype.cholesky()
// The cholesky decomposition of a matrix
// using the Cholesky–Banachiewicz algorithm.
// Does not change the current matrix, but returns a new one.
// The result is cached.
//
// *@return {Matrix}*
cholesky() : Matrix {
	var i, ii, j, jj, k, kk, sum, choleskyMatrix,
			cholesky = [];

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
}


// ### Matrix.prototype.compare()
// Compares the matrix to an other matrix.
//
// *@param {Matrix}* The matrix to compare.  
// *@return {number}*
compare(m : Matrix) : number {
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
}


// ### Matrix.prototype.copy()
// Copies the matrix
//
// *@return {Matrix}*
copy() : Matrix {
	return this.map(MathLib.copy);
}


// ### Matrix.prototype.determinant()
// Calculates the determinant of the matrix via the LU decomposition.
// The result is cached.
//
// *@return {number|Complex}*
determinant() : any {
	var LU, determinant;
	
	if (!this.isSquare()) {
		MathLib.error({message: 'Determinant of non square matrix', method: 'Matrix#determinant'});
		return;
	}

	if (this.rank() < this.rows) {
		determinant = 0;
	}
	else {
		LU = this.LU();
		determinant = MathLib.times(this.LUpermutation.sgn(), MathLib.times.apply(null, LU.diag()));
	}

	this.determinant = function () {
		return determinant;
	};
	return determinant;

}


// ### Matrix.prototype.diag()
// Returns the entries on the diagonal in an array
//
// *@return {array}*
diag() : any[] {
	var diagonal = [],
			i, ii;
	for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
		diagonal.push(this[i][i]);
	}
	return diagonal;
}


// ### Matrix.prototype.divide()
// Multiplies the matrix by the inverse of a number or a matrix
//
// *@return {Matrix}*
divide(n : any) : Matrix {
	return this.times(MathLib.inverse(n));
}


// ### Matrix.prototype.every()
// This function works like the Array.prototype.every function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@return {boolean}*
every(f) : boolean {
	return Array.prototype.every.call(this, function (x, i) {
		return Array.prototype.every.call(x, function (y, j) {
			return f(y, i, j, this);
		});
	});
}


// ### Matrix.prototype.forEach()
// This function works like the Array.prototype.forEach function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument
forEach(f) {
	Array.prototype.forEach.call(this, function (x, i) {
		return Array.prototype.forEach.call(x, function (y, j) {
			return f(y, i, j, this);
		});
	});
}


// ### Matrix.prototype.gershgorin()
// Returns the Gershgorin circles of the matrix.
//
// *@return {array}* Returns an array of circles
gershgorin() {
	var c = [],
			rc = [],
			rr = [],
			circles = [],
			i, ii;

	for (i = 0, ii = this.rows; i < ii; i++) {
		rc.push(0);
		rr.push(0);
	}

	this.forEach(function (x, i, j) {
		if (i === j) {
			if (MathLib.is(x, 'complex')) {
				c.push(x.toPoint());
			}
			else {
				c.push(new MathLib.Point([x, 0, 1]));
			}
		}
		else {
			rc[j] += MathLib.abs(x); 
			rr[i] += MathLib.abs(x); 
		}
	});

	for (i = 0, ii = this.rows; i < ii; i++) {
		circles.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
	}

	return circles;
}


// ### Matrix.prototype.givens()
// QR decomposition with the givens method.
//
// *@return {[Matrix, Matrix]}*
givens() {
	var rows = this.rows,
			cols = this.cols,
			R = this.copy(),
			Q = MathLib.Matrix.identity(rows),
			c, s, rho, i, j, k, ri, rj, qi, qj; 
			
	for (i = 0; i < cols; i++) {
		for (j = i + 1; j < rows; j++) {

			if (!MathLib.isZero(R[j][i])) {
				// We can't use the sign function here, because we want the factor 
				// to be 1 if A[i][i] is zero.
				rho = (R[i][i] < 0 ? -1 : 1) * MathLib.hypot(R[i][i],  R[j][i]);
				c   = R[i][i] / rho;
				s   = R[j][i] / rho;

				// Apply the rotation
				ri = [];
				rj = [];
				qi = [];
				qj = [];
				
				// Multiply to R
				for (k = 0; k < cols; k++) {
					ri.push(R[i][k]);
					rj.push(R[j][k]);
				}
				for (k = 0; k < cols; k++) {
					R[i][k] = rj[k] * s + ri[k] * c;
					R[j][k] = rj[k] * c - ri[k] * s;
				}

				// Multiply to Q
				for (k = 0; k < rows; k++) {
					qi.push(Q[k][i]);
					qj.push(Q[k][j]);
				}
				for (k = 0; k < rows; k++) {
					Q[k][i] =  qi[k] * c + qj[k] * s;
					Q[k][j] = -qi[k] * s + qj[k] * c;
				}
			}
		}
	}

	return [Q, R];
}


// ### Matrix.givensMatrix()
// This function returns a givens matrix
//
// *@param {number}* The size of the matrix.  
// *@param {number}* The first row/column.  
// *@param {number}* The second row/column.  
// *@param {number}* The angle (in radians).  
// *@return {Matrix}*
static givensMatrix = function (n, i, k, phi) {
	var givens = MathLib.Matrix.identity(n);
	givens[k][k] = givens[i][i] = Math.cos(phi);
	givens[i][k] = Math.sin(phi);
	givens[k][i] = -givens[i][k];
	return givens;
};


// ### Matrix.identity
// Returns the identity matrix.
//
// *@param {number}* The number of rows and columns.  
// *@return {Matrix}*
static identity = function (n) {
	var row = [],
			matrix = [],
			i, ii;
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


// ### Matrix.prototype.inverse()
// Calculates the inverse matrix.
//
// *@return {Matrix}*
inverse() {
	var i, ii, res, inverse,
			col = [],
			matrix = [],
			n = this.rows;

	if (!this.isSquare()) {
		MathLib.error({message: 'Inverse of non square matrix', method: 'Matrix#inverse'});
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
		res = this.solve(col.slice(n - i - 1, 2 * n - i - 1))

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
}


// ### Matrix.prototype.isBandMatrix()
// Determines if the matrix is a band matrix.
//
// *@param {number}*  
// *@param {number}*  
// *@return {boolean}*
isBandMatrix(l, u) : boolean {
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
}


// ### Matrix.prototype.isDiag()
// Determines if the matrix is a diagonal matrix.
//
// *@return {boolean}*
isDiag() : boolean {
	var i, j, ii, jj;
	if (Number(this.hasOwnProperty('isUpper') && this.isUpper()) + 
			Number(this.hasOwnProperty('isLower') && this.isLower()) + 
			Number(this.hasOwnProperty('isSymmetric') && this.isSymmetric()) > 1) {
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
}


// ### Matrix.prototype.isEqual()
// Determines if the matrix is equal to an other matrix.
//
// *@param {Matrix}* the matrix to compare with  
// *@return {boolean}*
isEqual(x) : boolean {
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
}


// ### Matrix.prototype.isIdentity()
// Determines if the matrix is a identity matrix.
//
// *@return {boolean}*
isIdentity() : boolean {
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
}


// ### Matrix.prototype.isInvertible()
// Determines if the matrix is invertible.
//
// *@return {boolean}*
isInvertible() : boolean {
	return this.isSquare() && this.rank() === this.rows;
}


// ### Matrix.prototype.isLower()
// Determines if the matrix is a lower triangular matrix.
//
// *@return {boolean}*
isLower() : boolean {
	return this.slice(0, -1).every(function (x, i) {
		return x.slice(i + 1).every(MathLib.isZero);
	});
}


// ### Matrix.prototype.isNegDefinite()
// Determines if the matrix is negative definite
//
// *@return {boolean}*
isNegDefinite() : boolean {
	if (!this.isSquare()) {
		return;
	}
	if (this.rows === 1) {
		return this[0][0] < 0;
	}
	// Sylvester's criterion
	if (this.rows % 2 === 0) {
		return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
	}
	else {
		return this.determinant() < 0 && this.remove(this.rows - 1, this.cols - 1).isNegDefinite();
	}
}


// ### Matrix.prototype.isOrthogonal()
// Determines if the matrix is a orthogonal.
//
// *@return {boolean}*
isOrthogonal() : boolean {
	return this.transpose().times(this).isIdentity();
}


// ### Matrix.prototype.isPermutation()
// Determines if the matrix is a permutation matrix
//
// *@return {boolean}*
isPermutation() : boolean {
	var rows = [],
			cols = [];

	return this.every(function (x, r, c) {
		if (MathLib.isOne(x)) {
			if (rows[r] || cols[c]) {
				return false;
			}
			else {
				rows[r] = true;
				cols[c] = true;
				return true;
			}
		}
		else if (MathLib.isZero(x)) {
			return true;
		}
		return false;
	}) && rows.length === this.rows && cols.length === this.cols;
}


// ### Matrix.prototype.isPosDefinite()
// Determines if the matrix is positive definite
//
// *@return {boolean}*
isPosDefinite() : boolean {
	if (!this.isSquare()) {
		return;
	}
	if (this.rows === 1) {
		return this[0][0] > 0;
	}
	// Sylvester's criterion
	return this.determinant() > 0 && this.remove(this.rows - 1, this.cols - 1).isPosDefinite();
}


// ### Matrix.prototype.isReal()
// Determines if the matrix has only real entries
//
// *@return {boolean}*
isReal() : boolean {
	return this.every(MathLib.isReal);
}


// ### Matrix.prototype.isScalar()
// Determines if the matrix is a scalar matrix
// (that is a multiple of the identity matrix)
//
// *@return {boolean}*
isScalar() : boolean {
	var i, ii,
			diag = this.diag;
	if (this.hasOwnProperty('isIdentity') && this.hasOwnProperty('isZero')) {
		if (this.isIdentity() || this.isZero()) {
			return true;
		}
		else {
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
}


// ### Matrix.prototype.isSquare()
// Determines if the matrix is a square matrix
//
// *@return {boolean}*
isSquare() : boolean {
	return this.cols === this.rows;
}


// ### Matrix.prototype.isSymmetric()
// Determines if the matrix is symmetric
//
// *@return {boolean}*
isSymmetric() : boolean {
	var i, ii, j, jj,
			isSymmetric = true;

	if (!this.isSquare()) {
		isSymmetric = false;
	}
	else {
lp: for (i = 0, ii = this.rows; i < ii; i++) {
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
}


// ### Matrix.prototype.isUpper()
// Determines if the matrix is a upper triangular matrix
//
// *@return {boolean}*
isUpper() : boolean {
	return this.slice(1).every(function (x, i) {
		return x.slice(0, i + 1).every(MathLib.isZero);
	});
}


// ### Matrix.prototype.isVector()
// Determines if the matrix is a vector
// (only one row or one column)
//
// *@return {boolean}*
isVector() : boolean {
	return (this.rows === 1) || (this.cols === 1);
}


// ### Matrix.prototype.isZero()
// Determines if the matrix the zero matrix
// The result is cached.
//
// *@return {boolean}*
isZero() : boolean {
	var isZero = this.every(MathLib.isZero);

	this.isZero = function () {
		return isZero;
	};
	return isZero;
}


// ### Matrix.prototype.map()
// This function works like the Array.prototype.map function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@return {Matrix}*
map(f) {
	var m = this;
	return new MathLib.Matrix(
		Array.prototype.map.call(this, function (x, i) {
			return Array.prototype.map.call(x, function (y, j) {
				return f(y, i, j, m);
			});
		})
	);
}


// ### Matrix.prototype.minor()
// Calculates a minor
//
// *@param {number}* The row to be removed.  
// *@param {number}* The column to be removed.  
// *@return {Matrix}*
minor(r, c) {
	return this.remove(r, c).determinant();
}


// ### Matrix.prototype.minus()
// Calculates the difference of two matrices
//
// *@param {Matrix}* The matrix to be subtracted.  
// *@return {Matrix}*
minus(m) {
	if (this.rows === m.rows && this.cols === m.cols) {
		return this.plus(m.negative());
	}
	else {
		MathLib.error({message: 'Matrix sizes not matching', method: 'Matrix#minus'});
		return;
	}
}


// ### Matrix.prototype.negative()
// Returns the negative matrix
//
// *@return {Matrix}*
negative() {
	var i, ii,
			negative = [];
			
	for (i = 0, ii = this.rows; i < ii; i++) {
		negative.push(this[i].map(MathLib.negative));
	}
	return new MathLib.Matrix(negative);
}


// ### Matrix.numbers()
// Returns a matrix consisting completely of a given number
//
// *@param {number}* The number.  
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@return {Matrix}*
static numbers = function (n, r, c) {
	var i, ii,
			row = [],
			matrix = [];
			
	for (i = 0, ii = c || r || 1; i < ii; i++) {
		row.push(n);
	}
	for (i = 0, ii = r || 1; i < ii ; i++) {
		matrix.push(row.slice(0));
	}
	return new MathLib.Matrix(matrix);
};


// ### Matrix.one()
// Returns a matrix consisting completely of ones.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@return {Matrix}*
static one = function (r, c) {
	r = r || 1;
	c = c || 1;
	return MathLib.Matrix.numbers(1, r, c);
};


// ### Matrix.prototype.plus()
// This function adds a matrix to the current matrix
// and returns the result as a new matrix.
//
// *@param {Matrix}* The matrix to be added.  
// *@return {Matrix}*
plus(m) {
	var i, ii, j, jj,
			sum = [];

	if (this.rows === m.rows && this.cols === m.cols) {
		for (i = 0, ii = this.rows; i < ii; i++) {
			sum[i] = [];
			for (j = 0, jj = this.cols ; j < jj; j++) {
				sum[i][j] = MathLib.plus(this[i][j], m[i][j]);
			}
		}
		return new MathLib.Matrix(sum);
	}
	else {
		MathLib.error({message: 'Matrix sizes not matching', method: 'Matrix#plus'});
		return;
	}
}


// ### Matrix.random()
// Returns a matrix consisting completely of random numbers between 0 and 1
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@return {Matrix}*
static random = function (r, c) {
	var row,
			matrix = [],
			i, j, ii, jj;
	for (i = 0, ii = r || 1; i < ii; i++) {
		row = [];
		for (j = 0, jj = c || r || 1; j < jj; j++) {
			row.push(Math.random());
		}
		matrix.push(row);
	}
	return new MathLib.Matrix(matrix);
};


// ### Matrix.prototype.rank()
// Determines the rank of the matrix
//
// *@return {number}*
rank() {
	var i, j,
			rank = 0,
			mat = this.rref();

	rankloop: for (i = Math.min(this.rows, this.cols) - 1; i >= 0; i--) {
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
}


// ### Matrix.prototype.reduce()
// This function works like the Array.prototype.reduce function.
//
// *@return {any}*
reduce(...args : any[]) {
	return Array.prototype.reduce.apply(this, args);
}


// ### Matrix.prototype.remove()
// This function removes the specified rows and/or columns for the matrix.
//
// *@param {number|array}* The row(s) to be removed.  
// *@param {number|array}* The column(s) to be removed.  
// *@return {Matrix}*
remove(row, col) {
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
}


// ### Matrix.prototype.rref()
// Calculate the reduced row echelon form (rref) of a matrix.
//
// *@return {Matrix}*
rref() {
	var i, ii, j, jj, k, kk, pivot, factor, swap,
			lead = 0,
			rref = this.toArray();

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

		// Divide the pivot row by the pivot element
		for (j = lead, jj = this.cols; j < jj; j++) {
			rref[i][j] /= pivot;
		}

		// Reduce the other rows with the pivot row
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
}


// ### Matrix.prototype.slice()
// This function works like the Array.prototype.slice function.
//
// *@return {array}*
slice(...args : any[]) {
	return Array.prototype.slice.apply(this, args);
}


// ### Matrix.prototype.solve()
// Solves the system of linear equations Ax = b
// given by the matrix A and a vector or point b.
//
// *@param {Vector|Point}* The b in Ax = b  
// *@return {Vector|Point}*
solve(b) {
	// Ax = b -> LUx = b. Then y is defined to be Ux
	var LU = this.LU(),
			i, j,
			n = b.length,
			x = [],
			y = [];

	// Permutate b according to the LU decomposition
	b = this.LUpermutation.applyTo(b);


	// Forward solve Ly = b
	for (i = 0; i < n; i++) {
		y[i] = b[i];
		for (j = 0; j < i; j++) {
			y[i] = MathLib.minus(y[i], MathLib.times(LU[i][j], y[j]));
		}
	}

	// Backward solve Ux = y
	for (i = n - 1; i >= 0; i--) {
		x[i] = y[i];
		for (j = i + 1; j < n; j++) {
			x[i] = MathLib.minus(x[i], MathLib.times(LU[i][j], x[j]));
		}

		if (LU[i][i] === 0) {
			if (x[i] !== 0) {
				return undefined;
			}
			else {
				x[i] = x[i];
			}
		}
		else {
			x[i] = MathLib.divide(x[i], LU[i][i]);
		}
	}

	if (MathLib.type(b) === 'array') {
		return x;
	}
	else {
		return new b.constructor(x);
	}
}


// ### Matrix.prototype.some()
// This function works like the Array.prototype.some function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@return {boolean}*
some(f) : boolean {
	return Array.prototype.some.call(this, function (x, i) {
		return Array.prototype.some.call(x, function (y, j) {
			return f(y, i, j, this);
		});
	});
}


// ### Matrix.prototype.times()
// Multiplies the current matrix with a number, a matrix, a point or a vector.
//
// *@param {number|Matrix|Point|Rational|Vector}*  
// *@return {Matrix|Point|Vector}*
times(a) {
	var i, ii, j, jj, k, kk,
			product = [], entry;

	if (a.type === 'rational') {
		a = a.toNumber(); 
	}
	if (typeof a === 'number' || a.type === 'complex') {
		return this.map(function (x) {
			return MathLib.times(x, a);
		});
	}

	else if (a.type === 'matrix') {
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
		}
		else {
			MathLib.error({message: 'Matrix sizes not matching', method: 'Matrix#times'});
			return;
		}
	}

	else if (a.type === 'point' || a.type === 'vector') {
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
}


// ### Matrix.prototype.toArray()
// Converts the matrix to a two-dimensional array
//
// *@return {array}*
toArray() {
	return Array.prototype.map.call(this, function (x) {
		return Array.prototype.map.call(x, function (y) {
			return MathLib.copy(y);
		});
	});
}


// ### Matrix.prototype.toColVectors()
// Converts the columns of the matrix to vectors
//
// *@return {array}*
toColVectors() {
	return this.transpose().toRowVectors();
}


// ### Matrix.prototype.toContentMathML()
// converting the matrix to content MathML
//
// *@return {string}*
toContentMathML() : string {
	return this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + MathLib.toContentMathML(cur);
		}, '<matrixrow>') + '</matrixrow>';
	}, '<matrix>') + '</matrix>';
}


// ### Matrix.prototype.toLaTeX()
// Converting the matrix to LaTeX
//
// *@return {string}*
toLaTeX() : string {
	return '\\begin{pmatrix}\n' + this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + ' & ' + MathLib.toLaTeX(cur);
		}) + '\\\n';
	}, '').slice(0, -2) + '\n\\end{pmatrix}';
}


// ### Matrix.prototype.toMathML()
// converting the matrix to (presentation) MathML
//
// *@return {string}*
toMathML() : string {
	return this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + '<mtd>' + MathLib.toMathML(cur) + '</mtd>';
		}, '<mtr>') + '</mtr>';
	}, '<mrow><mo> ( </mo><mtable>') + '</mtable><mo> ) </mo></mrow>';
}


// ### Matrix.prototype.toRowVectors()
// Converts the rows of the matrix to vectors
//
// *@return {array}*
toRowVectors() : string {
	return this.toArray().map(function (v) {return new MathLib.Vector(v);});
}


// ### Matrix.prototype.toString()
// Creating a custom .toString() function
//
// *@return {string}*
toString() : string {
	return this.reduce(function (str, x) {
		return str + x.reduce(function (prev, cur) {
			return prev + '\t' + MathLib.toString(cur);
		}) + '\n';
	}, '').slice(0, -1);
}


// ### Matrix.prototype.trace()
// Calculating the trace of the matrix
//
// *@return {number|Complex}*
trace() {
	var trace = MathLib.plus.apply(null, this.diag());

	this.trace = function () {
		return trace;
	};
	return trace;
}


// ### Matrix.prototype.transpose()
// Calculating the transpose of the matrix
// The result is cached.
//
// *@return {Matrix}*
transpose() : Matrix {
	var transposedMatrix, row, i, j, ii, jj,
			transpose = [];

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
}


// ### Matrix.zero()
// Returns a matrix consisting completely of zeros.
//
// *@param {number}* The number of rows.  
// *@param {number}* The number of columns.  
// *@return {Matrix}*
static zero = function (r, c) {
	r = r || 1;
	c = c || 1;
	return MathLib.Matrix.numbers(0, r, c);
};


}// ## <a id="Permutation"></a>Permutation

export class Permutation {

	type = 'permutation';

	length: number;
	cycle: any[];


	constructor (p) {
		var cycle, permutation;
		
		if (Array.isArray(p[0])) {
			cycle = p;
			permutation = Permutation.cycleToList(cycle);
		}
		else {
			permutation = p;
			cycle = Permutation.listToCycle(permutation);
		}

		permutation.forEach((x, i) => {this[i] = x;});
		this.length = permutation.length;
		this.cycle = cycle;

	}


// ### Permutation.prototype.applyTo()
// Applies the permutation to a number or a array/matrix/point/vector
//
// *@param {number|array|Matrix|Point|Vector}*  
// *@return {number|array|Matrix|Point|Vector}*
applyTo(n : any) : any {
	var p, permutatedObj;
	if (typeof n === 'number') {
		if (n >= this.length) {
			return n;
		}
		return this[n];
	}
	else {
		p = this;
		permutatedObj = n.map(function (x, i) {
			return n[p.applyTo(i)];
		});

		return (n.type === undefined ? permutatedObj : new n.constructor(permutatedObj));
	}
}


// ### Permutation.prototype.compare()
// Compares two permutations.
//
// *@param {Permutation}* The permutation to compare  
// *@return {number}*
compare(p : Permutation) : number {
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
}


// ### Permutation.cycleToList()
// Converts a cycle representation to a list representation
// 
// *@param {array}* cycle The cycle to be converted  
// *@return {array}*
static cycleToList(cycle : any) : number[] {
	var index, list = [],
			cur, i, ii, j, jj, max;

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
}


// ### Permutation.id()
// The id permutation
// 
// *@return {Permutation}*
static id = new Permutation([[]]);


// ### Permutation.prototype.inverse()
// Calculates the inverse of the permutation
//
// *@return {Permutation}*
inverse() : Permutation {
	var cycle = this.cycle.slice(0);
	cycle.reverse().forEach(function (e) {
		e.reverse();
	});
	return new MathLib.Permutation(cycle);
}


// ### Permutation.listToCycle()
// Converts a list representation to a cycle representation
// 
// *@param {array}* list The list to be converted  
// *@return {array}*
static listToCycle(list : number[]) : any {
	var finished = [],
			cur, i, ii, cycle, cycles = [];

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
}


// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@return {Permutation}*
map(...args: any[]) : Permutation {
	return new MathLib.Permutation(Array.prototype.map.apply(this, args));
}


// ### Permutation.prototype.sgn()
// Calculates the signum of the permutation
//
// *@return {number}*
sgn() : number {
	var i, ii,
			count = 0;
			
	for (i = 0, ii = this.cycle.length; i < ii; i++) {
		count += this.cycle[i].length;
	}
	count += this.cycle.length;
	return -2 * (count % 2) + 1;
}


// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@return {Permutation}*
times(p : Permutation) : Permutation {
	var a = this;
	return p.map(function (x) {
		return a[x];
	});
}


// ### Permutation.prototype.toMatrix()
// Converts the permuatation to a matrix.
//
// *@param {number}* [size] The size of the matrix  
// *@return {Matrix}*
toMatrix(n : number) : Matrix {
	var row = [],
			matrix = [],
			index, i, ii;
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
}


// ### Permutation.prototype.toString()
// String representation of the permutation. 
//
// *@return {string}*
toString() : string {
	var str = '';
	this.cycle.forEach(function (elem) {
		str += '(' + elem.toString() + ')';
	});
	return str;
}


}// ## <a id="Conic" href="http://mathlib.de/en/docs/Conic">Conic</a>
// The conic implementation of MathLib makes calculations with conics possible.

export class Conic {
	type = 'conic';

	primal: Matrix;
	dual: Matrix;

	constructor (primal: Matrix, dual?: Matrix) {
		if (primal.type !== 'matrix') {
			primal = new MathLib.Matrix(primal);
		}
		this.primal = primal;

//		if (!dual) {
//			dual = primal.adjugate();
//		}
		//else if (!primal.times(dual).isScalar()) {
			// Throw error
		//}


		if (primal.rank() > 1) {
			Object.defineProperties(this, {
				'dual': {
					get : function () { return this.primal.adjugate() },
					set : function () {},
					enumerable : true,
					configurable : true
				}
			});
		}
		else {
			this.dual = dual;
		}

	}


// ### [Conic.prototype.draw()](http://mathlib.de/en/docs/Conic/draw)
// Draws the conic on one or more screens
//
// *@param {Screen}* The screen to draw onto.  
// *@param {object}* [options] Drawing options  
// *@return {boolean}*
draw(screen, options, redraw = false) {
	if (Array.isArray(screen)) {
		var conic = this;
		screen.forEach(function (x) {
			conic.draw(x, options);
		});
	}
	else {
		options.from = 0;
		options.to = 2 * Math.PI;
		options.conic = this;

		var lines, alpha, cos, sin, sgn,
				a = this.primal[0][0],
				b = this.primal[0][1] * 2,
				c = this.primal[1][1],
				d = this.primal[0][2] * 2,
				e = this.primal[1][2] * 2,
				disc = 4*a*c - b*b,
				rank = this.primal.rank(),
				cx = (b*e - 2*c*d) / (4*a*c - b*b),
				cy = (b*d - 2*a*e) / (4*a*c - b*b),

				normalForm = this.normalize(),
				A = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[0][0])),
				C = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[1][1]));




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
					t => cx + cos * param * t * t - sin * 2 * param * t,
					t => cy + sin * param * t * t + cos * 2 * param * t
				], options, redraw);
			}


			// Ellipse
			else if (disc > 0) {
				options.from = 0;
				options.to = 2 * Math.PI;

				screen.path([
					t => cx + cos * Math.cos(t) * A - sin * Math.sin(t) * C,
					t => cy + sin * Math.cos(t) * A + cos * Math.sin(t) * C
				], options, redraw);
			}


			// Hyperbola
			else if (disc < 0) {
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

				}
				else {
					cos = Math.cos(alpha);
					sin = Math.sin(alpha);
				}

				screen.path([
					t => cx + cos * MathLib.sec(t) * A - sin * MathLib.tan(t) * C * sgn(t),
					t => cy + sin * MathLib.sec(t) * A + cos * MathLib.tan(t) * C * sgn(t)
				], options, redraw);
			}

			
		}

		else if (rank === 2) {
			lines = this.splitDegenerated();

			screen.line(lines[0], options);
			screen.line(lines[1], options);
		}

		else if (rank === 1) {
			lines = this.splitDegenerated();

			screen.line(lines[0], options);
		}


	}
	return this;
}


// ### [Conic.prototype.eccentricity()](http://mathlib.de/en/docs/Conic/eccentricity)
// Calculates the eccentricity of a conic.
//
// *@return {number}*
eccentricity() : number {
	var normalform = this.normalize(),
			a = normalform.primal[0][0],
			c = normalform.primal[1][1];

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
}


// ### [Conic.prototype.isDegenerated()](http://mathlib.de/en/docs/Conic/isDegenerated)
// Determines if a conic is degenerated.
//
// *@return {boolean}*
isDegenerated() : boolean {
	return this.primal.rank() !== 3;
}


// ### [Conic.prototype.isEqual()](http://mathlib.de/en/docs/Conic/isEqual)
// Determines if two conics are equal.
//
// *@param {Conic}*  
// *@return {boolean}*
isEqual(c : Conic) : boolean {
	if (this === c) {
		return true;
	}

	var compare = function (M, N) {
		var i, j, m, n;

		if (M === N) {
			return true;
		}

		nonZeroSearch: for (i = 0; i < 3; i++) {
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
	}

	return compare(this.primal, c.primal) && compare(this.dual, c.dual);
}


// ### [Conic.prototype.latusRectum()](http://mathlib.de/en/docs/Conic/latusRectum)
// Calculates the latusRectum of a conic.
//
// *@return {number}*
latusRectum() : number {
	var normalForm = this.normalize(),
			a = normalForm.primal[0][0],
			c = normalForm.primal[1][1],
			min = Math.min(Math.abs(a), Math.abs(c)),
			max = Math.max(Math.abs(a), Math.abs(c));

	if (!this.isDegenerated()) {

		// Parabola
		if (c === 0) {
			return -2 * normalForm.primal[1][2] / a;
		}

		return 2 * Math.sqrt(max) / min;
	}
}


// ### [Conic.prototype.linearEccentricity()](http://mathlib.de/en/docs/Conic/linearEccentricity)
// Calculates the linear eccentricity of a conic.
//
// *@return {number}*
linearEccentricity() : number {
	var normalForm = this.normalize(),
			a = normalForm.primal[0][0],
			c = normalForm.primal[1][1],
			max = Math.max(Math.abs(a), Math.abs(c)), 
			min = Math.min(Math.abs(a), Math.abs(c));

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
}


// ### [Conic.prototype.meet()](http://mathlib.de/en/docs/Conic/meet)
// Calculates the meet of the conic with a line or a conic.
//
// *@return {Point[]}*
meet(x) {
	var B, C, alpha, i, j, p1, p2, Ml,
			a, b, c, d, Delta0, Delta1, lambda, degenerated, lines,
			A = this.primal;
			
	if (x.type === 'line') {

		var setter = function () {
					MathLib.warning({message: 'Trying to change the coordinates of a completely dependent point.', method: 'Conic#meet'});
				},
				recalculate = function () {
					Ml = new MathLib.Matrix([[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]);
					B = Ml.transpose().times(A).times(Ml);

					if (!MathLib.isZero(x[0])) {
						alpha = Math.sqrt(B[2][1] * B[1][2] - B[1][1] * B[2][2]) / x[0];
					}
					else if (!MathLib.isZero(x[1])) {
						alpha = Math.sqrt(B[0][2] * B[2][0] - B[2][2] * B[0][0]) / x[1];
					}
					else {
						alpha = Math.sqrt(B[1][0] * B[0][1] - B[0][0] * B[1][1]) / x[2];
					}

					C = Ml.times(alpha).plus(B);


					nonZeroSearch: for (i = 0; i < 3; i++) {
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
	}
	else if (x.type === 'conic') {
		B = x.primal;
		a = A.determinant();
		b = (new MathLib.Matrix([A[0], A[1], B[2]])).plus(new MathLib.Matrix([A[0], B[1], A[2]])).plus(new MathLib.Matrix([B[0], A[1], A[2]])).determinant();
		c = (new MathLib.Matrix([A[0], B[1], B[2]])).plus(new MathLib.Matrix([B[0], A[1], B[2]])).plus(new MathLib.Matrix([B[0], B[1], A[2]])).determinant();
		d = B.determinant();
		Delta0 = b * b - 3 * a * c;
		Delta1 = 2 * b * b - 9 * a * b * c + 27 * a * a * d;
		C = MathLib.cbrt((Delta1 + Math.sqrt(Math.pow(Delta1, 2) - 4 * Math.pow(Delta0, 3))) / 2);
		lambda = - (b + C + Delta0 / C) / (3 * a);
		degenerated = new MathLib.Conic(B.times(lambda).plus(A));
		lines = degenerated.splitDegenerated();

		return this.meet(lines[0]).concat(this.meet(lines[1]));
	}
}


// ### [Conic.prototype.normalize()](http://mathlib.de/en/docs/Conic/normalize)
// Calculates the normal form of a conic.
//
// *@return {Conic}*
normalize() : Conic {
	var A = this.primal[0][0],
			B = this.primal[0][1] * 2,
			C = this.primal[1][1],
			D = this.primal[0][2] * 2,
			E = this.primal[1][2] * 2,
			F = this.primal[2][2],

			r = Math.atan2(B, A - C) / 2,
			cos = Math.cos(r),
			sin = Math.sin(r),

			a = A * cos * cos + B * sin * cos + C * sin * sin,
			c = A * sin * sin - B * sin * cos + C * cos * cos,
			d = D * cos + E * sin,
			e = E * cos - D * sin,
			f = F;

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

	return new MathLib.Conic([[a, 0, d/2], [0, c, e/2], [d/2, e/2, f]]);
}


// ### [Conic.prototype.polarity()](http://mathlib.de/en/docs/Conic/polarity)
// Calculates the four polarity of a conic.
//
// *@return {Point[]}*
polarity(x) {
	var object, m,
			c = this


	if (x.type === 'line') {
		object = new MathLib.Point([0, 0, 0]);
		m = 'dual';
	}
	else if (x.type === 'point') {
		object = new MathLib.Line([0, 0, 0]);
		m = 'primal';
	}


	Object.defineProperties(object, {
		'0': {
			get: function () { return c[m][0][0] * x[0] + c[m][0][1] * x[1] + c[m][0][2] * x[2]; },
			set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity'});},
			enumerable: true
		},
		'1': {
			get: function () { return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2]; },
			set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity'});},
			enumerable: true
		},
		'2': {
			get: function () { return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2]; },
			set: function () { MathLib.warning({message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.', method: 'Conic#polarity'});},
			enumerable: true
		}
	});

	return object;
}


// ### [Conic.prototype.splitDegenerated()](http://mathlib.de/en/docs/Conic/splitDegenerated)
// Splits a conic into one or two lines if the conic is degenerated.
//
// *@return {boolean}*
splitDegenerated() {
	var n, i, j, B, C, p0, p1, p2,
			rank = this.primal.rank(),
			nonZeroSearch = function (C) {
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
		}
		else if (this.dual[1][1] !== 0) {
			n = 1;
		}
		else {
			n = 2;
		}

		if (this.dual[n][n] < 0) {
			B = this.dual.negative();
		}
		else {
			B = this.dual;
		}

		p0 = B[0][n] / Math.sqrt(B[n][n]);
		p1 = B[1][n] / Math.sqrt(B[n][n]);
		p2 = B[2][n] / Math.sqrt(B[n][n]);
		C = this.primal.plus(new MathLib.Matrix([[0, p2, -p1], [-p2, 0, p0], [p1, -p0, 0]]));

		nonZeroSearch(C);

		return [new MathLib.Line(C[i]), new MathLib.Line([C[0][j], C[1][j], C[2][j]])];
	}


	else if (rank === 1) {
		nonZeroSearch(this.primal);
		return [new MathLib.Line(this.primal[i]), new MathLib.Line(this.primal[i])];
	}
}


// ### [Conic.prototype.throughFivePoints()](http://mathlib.de/en/docs/Conic/throughFivePoints)
// Calculates the conic through five points.
//
// *@return {Conic}*
static throughFivePoints(p, q, r, s, t) : Conic {

	var conic = new MathLib.Conic([[1,0,0], [0,1,0], [0,0,1]]);

	Object.defineProperties(conic, {
			'primal': {
				get : function () {
					var G = p.vectorProduct(r).outerProduct(q.vectorProduct(s)),
							H = p.vectorProduct(s).outerProduct(q.vectorProduct(r)),
							M = G.times(t.times(H).scalarProduct(t)).minus(H.times(t.times(G).scalarProduct(t)));
					return M.transpose().plus(M);
				},
				set : function () {},
				enumerable : true,
				configurable : true
			}
		});

	return conic;
}


}// ## <a id="Point"></a>Point
// The point implementation of MathLib makes calculations with point in
// arbitrary dimensions possible.
//
// MathLib uses the homogeneous form of a point for calculations and storage.
//
// To create the point (4, 2) on the two dimensional plane use
// `new MathLib.Point([4, 2, 1])`
// Alternatively you can use
// `new MathLib.Point(4, 2)`
// The 1 will be added for you.


export class Point extends Vector {
	type = 'point';

	dimension: number;

	constructor (coords: number[]) {
		super(arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);

		this.dimension = 2;

	}


// ### Point.I
// The Point I = (-i, 0, 1).
// This is NOT the complex number i.
//
// *@return {Point}*
static I = new Point([new MathLib.Complex(0, -1), 0, 1]);


// ### Point.J
// The Point J = (i, 0, 1).
//
// *@return {Point}*
static J = new Point([new MathLib.Complex(0, 1), 0, 1]);


// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {Point}* a The point A  
// *@param {Point}* b The point B  
// *@param {Point}* c The point C  
// *@param {Point}* d The point D  
// *@return {number}*
crossRatio(a : Point, b : Point, c : Point, d : Point) : number {
	var xa = this.vectorProduct(a),
			xb = this.vectorProduct(b);

	return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
}


// ### Point.prototype.distanceTo()
// Calculates the distance to an other point.
// If no other point is provided, it calculates the distance to the origin.
//
// *@param {Point}* [point] The point to calculate the distance to  
// *@return {number}*
distanceTo(p : Point /*, geom = MathLib.Geometry.active*/) : number {
	if (arguments.length === 0) {
		return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
	}

	if (p.type === 'point' && this.dimension === p.dimension) {
		return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
	}

//	if (p.type === 'point' && this.dimension === p.dimension) {
//		var Otp = this.times(geom.fundamentalConic.primal).times(p),
//				Ott = this.times(geom.fundamentalConic.primal).times(this),
//				Opp = p.times(geom.fundamentalConic.primal).times(p),
//				Dtp = Math.sqrt(Otp * Otp - Ott * Opp);
//
//		return MathLib.Geometry.active.cDist * Math.log((Otp + Dtp) / (Otp - Dtp));
//	}
}


// ### Point.prototype.draw()
// Draws the point on a canvas or svg element.
//
// *@param {Screen}* screen The screen to draw onto  
// *@param {object}* [options] Drawing options  
// *@return {Point}* The current point
draw(screen, options) {
	if (Array.isArray(screen)) {
		var point = this;
		screen.forEach(function (x) {
			x.point(point, options);
		});
	}
	else {
		screen.point(this, options);
	}

	return this;
}


// ### Point.prototype.isEqual()
// Determines if the point has the same coordinates as an other point
//
// *@param {Point}* The point to compare  
// *@return {boolean}*
isEqual(q : Point) : boolean {
	var p = this.normalize();
	q = q.normalize();

	if (this.length !== q.length) {
		return false;
	}

	return p.every(function (x, i) {
		return MathLib.isEqual(x, q[i]);
	});
}


// ### Point.prototype.isFinite()
// Determines if the point is finite
//
// *@return {boolean}*
isFinite() : boolean {
	return !MathLib.isZero(this[this.length - 1]);
}


// ### Point.prototype.isInside()
// Determines wether a point is inside a circle
//
// *@param {Circle}*  
// *@return {boolean}*
isInside(a : Circle) : boolean {
	if (a.type === 'circle') {
		return this.distanceTo(a.center) < a.radius;
	}
}


// ### Point.prototype.isOn()
// Determines wether a point is on a line or circle
//
// *@param {Line|Point}*  
// *@return {boolean}*
isOn(a : Circle) : boolean {
	if (a.type === 'line') {
		return this.distanceTo(a.center) === a.radius;
	}
	else if (a.type === 'circle') {
		return this.distanceTo(a.center) === a.radius;
	}
}


// ### Point.prototype.isOutside()
// Determines wether a point is outside a circle
//
// *@param {Circle}*  
// *@return {boolean}*
isOutside(a : Circle) : boolean {
	if (a.type === 'circle') {
		return this.distanceTo(a.center) > a.radius;
	}
}


// ### Point.prototype.join()
// Calculates a line connecting two points
//
// *@param {Point}* The point to calculate the line to  
// *@return {Line}*
join(q : Point) : Line {
	var line,
			p = this;

	if (this.dimension === 2 && q.dimension === 2) {
		line = new MathLib.Line(this.vectorProduct(q));

		Object.defineProperties(line, {
			'0': {
				get: function () { return p[1] * q[2] - p[2] * q[1]; },
				set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join'});},
				enumerable: true
			},
			'1': {
				get: function () { return p[2] * q[0] - p[0] * q[2]; },
				set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join'});},
				enumerable : true
			},
			'2': {
				get: function () { return p[0] * q[1] - p[1] * q[0]; },
				set: function () {	MathLib.warning({message: 'Trying to change the coordinates of a completely dependent line.', method: 'Point#join'});},
				enumerable: true
			}
		});

		return line;
	}
}


// ### Point.prototype.normalize()
// Normalizes the point.
//
// *@return {Point}*
normalize() : Point {
	var last = this[this.dimension] || 1;
	return this.map(function (x) {
		return x / last;
	});
}


// ### Point.prototype.reflectAt()
// Reflects the point at an other point
//
// *@return {Point}*
reflectAt(a : Point) : Point {
	var i, ii,
			reflectedPoint = [],
			p = this.normalize();

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
}


// ### Point.prototype.restrictTo()
// Restricts the point to a line.
//
// *@param {Line}*
restrictTo(l : Line) {
	var p = this.slice();

	Object.defineProperties(this, {
		'0': {
			get : function () { return l[1] * l[1] * p[0] - l[0] * (l[1] * p[1] + l[2] * p[2]); },
			set : function (point) {p[0] = point},
			enumerable : true,
			configurable : true
		},
		'1': {
			get : function () { return - l[1] * l[2] * p[2] + l[0] * (l[0] * p[1] - l[1] * p[0]); },
			set : function (point) {p[1] = point},
			enumerable : true,
			configurable : true
		},
		'2': {
			get : function () { return l[1] * l[1] * p[2] + l[0] * l[0] * p[2]; },
			set : function (point) {p[2] = point},
			enumerable : true,
			configurable : true
		}
	});
}


// ### Point.prototype.toComplex()
// Converts a two dimensional point to the corresponding complex number.
//
// *@return {Complex}*
toComplex() : Complex {
	if (this.dimension === 2) {
		if (MathLib.isZero(this[2])) {
			return MathLib.Complex.infinity;
		}
		return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
	}
}


// ### Point.prototype.toContentMathML()
// Returns content MathML representation of the point
//
// *@return {string}*
/* toContentMathML(opt) { */
/* } */


// ### Point.prototype.toLaTeX()
// Returns LaTeX representation of the point
//
// *@param {boolean}* Optional parameter to indicate if the output should be projective.  
// *@return {string}*
toLaTeX(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
		return old + '\\\\' + MathLib.toLaTeX(cur);
	}) + '\\end{pmatrix}';
}


// ### Point.prototype.toMathML()
// Returns (presentation) MathML representation of the point
//
// *@param {boolean}* Optional parameter to indicate if the output should be projective.  
// *@return {string}*
toMathML(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return p.reduce(function (old, cur) {
		return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
	}, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
}


// ### Point.prototype.toString()
// Returns string representation of the point
//
// *@param {boolean}* Optional parameter to indicate if the output should be projective.  
// *@return {string}*
toString(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return '(' + p.reduce(function (old, cur) {
		return old + ', ' + MathLib.toString(cur);
	}) + ')';
}


}// ## <a id="Polynomial"></a>Polynomial
// The polynomial implementation of MathLib makes calculations with polynomials.
// Both the coefficients and the arguments of a polynomial can be numbers,
// complex numbers and matrices.
//
// It is as easy as
// ```
// new MathLib.Polynomial([1, 2, 3])
// ```
// to create the polynomial 1 + 2x + 3x²  
// The polynomial x¹⁰⁰ can be created with the following statement:
// ```
// new MathLib.Polynomial(100)
// ```


//declare var Polynomial : any;

export class Polynomial {

	type = 'polynomial';

	deg: number;
	length: number;
	subdeg: number;

	constructor (polynomial) {
		var coefficients = [];

		if (polynomial === undefined || polynomial.length === 0) {
			polynomial = [0];
		}
		else if (typeof polynomial === 'number') {
			while (polynomial--) {
				coefficients.push(0);
			}
			coefficients.push(1);
			polynomial = coefficients;
		}

		polynomial.forEach((x, i) => {this[i] = x});
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


// ### Polynomial.prototype.compare()
// Compares two polynomials.
//
// *@param {Polynomial}* The polynomial to compare  
// *@return {number}*
compare(p : Polynomial) : number {
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
}


// ### Polynomial.prototype.differentiate()
// Differentiates the polynomial
//
// *@param {number}* [n] the number of times to differentiate the polynomial.  
// *@return {Polynomial}*
differentiate(n = 1) : Polynomial {
	var i, ii,
			derivative = [];

	if (n === 0) {
		return this;
	}

	for (i = 0, ii = this.deg - n; i <= ii; i++) {
		derivative[i] = MathLib.times(this[i + n], MathLib.fallingFactorial(i + n, n));
	}
	return new MathLib.Polynomial(derivative);
}


// ### Polynomial.prototype.draw()
// Draws the polynomial on the screen
//
// *@param {Screen}* The screen to draw the polynomial onto.  
// *@param {object}* [options] Optional drawing options.  
// *@return {Polynomial}*
draw(screen, options) {
	var path = [], i,
			line = this;

	if (this.deg < 2) {
		if (Array.isArray(screen)) {
			screen.forEach(function (x) {
				x.line([[-50, line.valueAt(-50)], [50, line.valueAt(50)]], options);
			});
		}
		else {
			screen.line([[-50, this.valueAt(-50)], [50, this.valueAt(50)]], options);
		}
	}

	else {
		for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
			path.push([i, this.valueAt(i)]);
		}
		if (Array.isArray(screen)) {
			screen.forEach(function (x) {
				x.path(path, options);
			});
		}
		else {
			screen.path(path, options);
		}
	}

	return this;
}


// ### Polynomial.prototype.every()
// Works like Array.prototype.every.
//
// *@return {boolean}*
every(f : (value : any, index : number, vector : Vector ) => boolean) : boolean {
	return Array.prototype.every.call(this, f);
}


// ### Polynomial.prototype.forEach()
// Works like the Array.prototype.forEach function
// 
forEach(...args : any[]) : void {
	Array.prototype.forEach.apply(this, args);
}


// ### Polynomial.prototype.integrate()
// Integrates the polynomial
//
// *@param {number}* [n] the number of times to integrate the polynomial.  
// *@return {Polynomial}*
integrate(n = 1) : Polynomial {
	var i, ii, 
			antiderivative = [];

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
}


// ### Polynomial.interpolation
// Interpolates points.
//
// *@return {Polynomial}*
static interpolation(a, b) {
	var basisPolynomial,
			interpolant = new MathLib.Polynomial([0]),
			n = a.length,
			i, j;

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
}


// ### Polynomial.prototype.isEqual()
// Decides if two polynomials are equal.
//
// *@param {Polynomial}*  
// *@return {boolean}*
isEqual(p : Polynomial) : boolean {
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
}


// ### Polynomial.prototype.map()
// Works like the Array.prototype.map function
//
// *@return {Polynomial}*
map(f) : Polynomial {
	return new MathLib.Polynomial(Array.prototype.map.call(this, f));
}


// ### Polynomial.prototype.negative()
// Returns the negative polynomial
//
// *@return {Polynomial}*
negative() : Polynomial {
	return new MathLib.Polynomial(this.map(MathLib.negative));
}


// ### Polynomial.one
// Returns the one polynomial
//
// *@return {Polynomial}*
static one = new Polynomial([1]);


// ### Polynomial.prototype.plus()
// Adds a number or a polynomial
//
// *@return {Polynomial}*
plus(a) : Polynomial {
	var plus = [],
			i;
	if (typeof a === 'number') {
		plus = this.slice();
		plus[0] = MathLib.plus(plus[0], a);
	}
	else if (a.type === 'polynomial') {
		for (i = 0; i <= Math.min(this.deg, a.deg); i++) {
			plus[i] = MathLib.plus(this[i], a[i]);
		}
		plus = plus.concat((this.deg > a.deg ? this : a).slice(i));
	}
	return new MathLib.Polynomial(plus);
}


// ### Polynomial.regression
// Calculates the regression line for some points
//
// *@return {Polynomial}*
static regression(x, y) : Polynomial {
	var length = x.length,
			xy = 0,
			xi = 0,
			yi = 0,
			x2 = 0,
			m, c, i;

	if (arguments.length === 2) {
		for (i = 0; i < length; i++) {
			xy += x[i] * y[i];
			xi += x[i];
			yi += y[i];
			x2 += x[i] * x[i];
		}
	}
	else {
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
}


// ### Polynomial.roots
// Returns a polynomial with the specified roots
//
// *@return {Polynomial}*
static roots(zeros) : Polynomial {
	var elemSymPoly, i, ii,
			coef = [];

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
}


// ### Polynomial.prototype.slice()
// Works like the Array.prototype.slice function
//
// *@return {array}*
slice(...args : any[]) : any[] {
	return Array.prototype.slice.apply(this, args);
}


// ### Polynomial.prototype.times()
// Multiplies the polynomial by a number or an other polynomial  
//
// *@param {number|Polynomial}* The multiplicator  
// *@return {Polynomial}*
times(a) : Polynomial {
	var i, ii, j, jj,
			product = [];
			
	if (a.type === 'polynomial') {
		for (i = 0, ii = this.deg; i <= ii; i++) {
			for (j = 0, jj = a.deg; j <= jj; j++) {
				product[i + j] = MathLib.plus((product[i + j] ? product[i + j] : 0), MathLib.times(this[i], a[j]));
			}
		}
		return new MathLib.Polynomial(product);
	}
	else if (a.type === 'rational') {
		a = a.toNumber(); 
	}
  // we we multiply it to every coefficient
	return this.map(function (b) {
											return MathLib.times(a, b);
										});
}


// ### Polynomial.prototype.toContentMathML()
// Returns a content MathML representation of the polynomial
//
// *@return {string}*
toContentMathML(math) : string {
	var str = '<apply><csymbol cd="arith1">plus</csymbol>', i;
	for (i = this.deg; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {
			if (i === 0) {
				str += MathLib.toContentMathML(this[i]);
			}
			else {
				str += '<apply><csymbol cd="arith1">times</csymbol>' + MathLib.toContentMathML(this[i], true);
			}

			if (i > 1) {
				str += '<apply><csymbol cd="arith1">power</csymbol><ci>x</ci>' + MathLib.toContentMathML(i) + '</apply></apply>';
			}
			else if (i === 1) {
				str += '<ci>x</ci></apply>';
			}
		}
	}

	str += '</apply>';

	if (math) {
		str = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + str + '</lambda></math>';
	}

	return str;
}


// ### Polynomial.prototype.toExpression()
// Custom toExpression function
//
// *@return {Expression}*
toExpression() : Expression {
	var content = [],
			sum, i;

	for (i = this.deg; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {


			if (i > 1) {
				content.push(new MathLib.Expression({
						subtype: 'naryOperator',
						value: '^',
						name: 'pow',
						content: [new MathLib.Expression({
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
							}),
						]
					})
				);
			}
			else if (i === 1) {
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
					})
				);
			}
			else if (i === 0) {
				content.push(new MathLib.Expression({
						subtype: 'number',
						value: this[i].toString()
					})
				);
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
}


// ### Polynomial.prototype.toFunctn()
// Converts the polynomial to a functn
//
// *@return {Functn}*
toFunctn() {
	var str = '', i, ii;
	for (i = 0, ii = this.deg; i <= ii; i++) {
		if (!MathLib.isZero(this[i])) {
			if (i === 0) {
				str += MathLib.toString(this[i]);
			}
			else {
				str += MathLib.toString(this[i], true);
			}

			if (i > 1) {
				str += ' * Math.pow(x, ' + MathLib.toString(i) + ')';
			}
			else if (i === 1) {
				str += ' * x';
			}
		}
	}

	return new MathLib.Functn(new Function('x', 'return ' + str), {
		expression: this.toExpression()
	});
}


// ### Polynomial.prototype.toLaTeX()
// Returns a LaTeX representation of the polynomial
//
// *@return {string}*
toLaTeX() : string {
	var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}',
			i;

	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {
			// if (i === 0) {
			//   str += MathLib.toLaTeX(this[i]);
			// }
			// else {
				str += MathLib.toLaTeX(this[i], true);
			// }

			if (i > 1) {
				str += 'x^{' + MathLib.toLaTeX(i) + '}';
			}
			else if (i === 1) {
				str += 'x';
			}
		}
	}
	return str;
}


// ### Polynomial.prototype.toMathML()
// Returns a MathML representation of the polynomial
//
// *@return {string}*
toMathML() : string {
	var str = '<mrow>' + MathLib.toMathML(this[this.deg]) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>',
			i;
	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {
			// if (i === 0) {
			//   str += MathLib.toMathML(this[i]);
			// }
			// else {
				str += MathLib.toMathML(this[i], true);
			// }

			if (i > 1) {
				str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i) + '</msup>';
			}
			else if (i === 1) {
				str += '<mo>&#x2062;</mo><mi>x</mi>';
			}
		}
	}

	str += '</mrow>';

	return str;
}


// ### Polynomial.prototype.toString()
// Custom toString function
//
// *@return {string}*
toString() : string {
	var str = MathLib.toString(this[this.deg]) + '*x^' + this.deg,
			i;
	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {

			str += MathLib.toString(this[i], true);

			if (i > 1) {
				str += '*x^' + MathLib.toString(i);
			}
			else if (i === 1) {
				str += '*x';
			}
		}
	}
	return str;
}


// ### Polynomial.prototype.valueAt()
// Evaluates the polynomial at a given point
//
// *@param {number|Complex|Matrix}*  
// *@return {number|Complex|Matrix}*
valueAt(x) {
	var pot = MathLib.is(x, 'matrix') ? MathLib.Matrix.identity(x.rows, x.cols) : 1,
			value = MathLib.is(x, 'matrix') ? MathLib.Matrix.zero(x.rows, x.cols) : 0,
			i, ii;
	
	for (i = 0, ii = this.deg; i <= ii; i++) {
		value = MathLib.plus(value, MathLib.times(this[i], pot));
		pot = MathLib.times(pot, x);
	}
	return value;
}


// ### Polynomial.zero
// Returns the zero polynomial
//
// *@return {Polynomial}*
static zero = new Polynomial([0]);


}// ## <a id="Rational" href="http://mathlib.de/en/docs/Rational">Rational</a>
// MathLib.Rational is the MathLib implementation of rational numbers.
//
//
// #### Simple use case:
// ```
// // Create the rational number 2/3  
// var r = new MathLib.Rational(2, 3);  
// ```

export class Rational {

	type = 'rational';

	numerator: number;
	denominator: number;

	constructor (numerator: number, denominator = 1) {
		if (MathLib.isZero(denominator)) {
			MathLib.error({message: 'The denominator cannot be zero.', method: 'Rational.constructor'});
			throw 'The denominator cannot be zero.';
		}
		this.numerator = numerator;
		this.denominator = denominator;
	}


// ### [Rational.prototype.compare()](http://mathlib.de/en/docs/Rational/compare)
// Compares two rational numbers
//
// *@param {Rational}* The number to compare  
// *@return {number}*
compare(r : Rational) : number {
	return MathLib.sign(this.numerator * r.denominator - this.denominator * r.numerator);
}


// ### [Rational.prototype.divide()](http://mathlib.de/en/docs/Rational/divide)
// Divides rational numbers
//
// *@param {Rational|number}* The divisor  
// *@return {Rational}*
divide(r) {
	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(this.numerator, MathLib.times(this.denominator, r));
	}
	// For complex numbers
	else {
		return r.inverse().times(this);
	}
}


// ### [Rational.prototype.inverse()](http://mathlib.de/en/docs/Rational/inverse)
// Calculates the inverse of a rational number
//
// *@return {Rational}*
inverse() : Rational {
	if (!MathLib.isZero(this.numerator)) {
		return new MathLib.Rational(this.denominator, this.numerator);
	}
}


// ### [Rational.prototype.isEqual()](http://mathlib.de/en/docs/Rational/isEqual)
// Checks if the rational number is equal to an other number
//
// *@return {boolean}*
isEqual(r) : boolean {
	return MathLib.isEqual(MathLib.times(this.numerator, r.denominator), MathLib.times(this.denominator, r.numerator));
}


// ### [Rational.prototype.isZero()](http://mathlib.de/en/docs/Rational/isZero)
// Checks if the rational number is zero
//
// *@return {boolean}*
isZero() : boolean {
	return MathLib.isZero(this.numerator);
}


// ### [Rational.prototype.minus()](http://mathlib.de/en/docs/Rational/minus)
// Subtracts rational numbers
//
// *@param {Rational|number}* The number to be subtracted  
// *@return {Rational}*
minus(r) {
	var n = this.numerator,
			d = this.denominator;

	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.minus(MathLib.times(n, r.denominator), MathLib.times(d, r.numerator)),
			MathLib.times(d, r.denominator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(MathLib.minus(n, MathLib.times(r, d)), d);
	}
	// For complex numbers
	else {
		return r.minus(this).negative();
	}
}


// ### [Rational.prototype.negative()](http://mathlib.de/en/docs/Rational/negative)
// Calculates the negative of a rational number
//
// *@return {Rational}*
negative() : Rational {
	return new MathLib.Rational(-this.numerator, this.denominator);
}


// ### [Rational.prototype.plus()](http://mathlib.de/en/docs/Rational/plus)
// Adds rational numbers
//
// *@param {Rational|number}* The number to be added  
// *@return {Rational}*
plus(r) {
	var n = this.numerator,
			d = this.denominator;

	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.plus(MathLib.times(d, r.numerator), MathLib.times(n, r.denominator)),
			MathLib.times(d, r.denominator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(MathLib.plus(n, MathLib.times(r, d)), d);
	}
	// For complex numbers
	else {
		return r.plus(this);
	}
}


// ### [Rational.prototype.reduce()](http://mathlib.de/en/docs/Rational/reduce)
// Reduces the rational number
//
// *@return {Rational}*
reduce() : Rational {
	var gcd = MathLib.sign(this.denominator) * MathLib.gcd([this.numerator, this.denominator]);
	return new MathLib.Rational(this.numerator / gcd, this.denominator / gcd);
}


// ### [Rational.prototype.times()](http://mathlib.de/en/docs/Rational/times)
// Multiplies rational numbers
//
// *@param {Rational|number}* The number to be multiplied  
// *@return {Rational}*
times(r) {
	if (r.type === 'rational') {
		return new MathLib.Rational(MathLib.times(this.numerator, r.numerator), MathLib.times(this.denominator, r.denominator));
	}
	else if (typeof r === 'number') {
		return new MathLib.Rational(MathLib.times(this.numerator, r), this.denominator);
	}
	// For complex numbers, matrices, vectors, polynomials
	else {
		return r.times(this);
	}
}


// ### [Rational.prototype.toContentMathML()](http://mathlib.de/en/docs/Rational/toContentMathML)
// Returns the Content MathML representation of the rational number
//
// *@return {string}*
toContentMathML() : string {
	return '<cn type="rational">' + this.numerator + '<sep/>' + this.denominator + '</cn>';
}


// ### [Rational.prototype.toLaTeX()](http://mathlib.de/en/docs/Rational/toLaTeX)
// Returns the LaTeX representation of the rational number
//
// *@return {string}*
toLaTeX() : string {
	return '\\frac{' + MathLib.toLaTeX(this.numerator) + '}{' + MathLib.toLaTeX(this.denominator) + '}';
}


// ### [Rational.prototype.toMathML()](http://mathlib.de/en/docs/Rational/toMathML)
// Returns the MathML representation of the rational number
//
// *@return {string}*
toMathML() : string {
	return '<mfrac>' + MathLib.toMathML(this.numerator) + MathLib.toMathML(this.denominator) + '</mfrac>';
}


// ### [Rational.prototype.toNumber()](http://mathlib.de/en/docs/Rational/toNumber)
// Returns the number represented by the rational number
//
// *@return {number}*
toNumber() : number {
	return this.numerator / this.denominator;
}


// ### [Rational.prototype.toString()](http://mathlib.de/en/docs/Rational/toString)
// Custom toString function
//
// *@return {string}*
toString() : string {
	return MathLib.toString(this.numerator) + '/' + MathLib.toString(this.denominator);
}


}// ## <a id="Set"></a>Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// new MathLib.Set([1, 2, 3, 4, 5])
// ```
export class Set {

	type = 'set';

	length: number;
	card: number;

	constructor (elements) {
		if (!elements) {
			elements = [];
		}

		elements = elements.sort(MathLib.compare)
		.filter(function (x, i, a) {
			return (a.length === i + 1) || !MathLib.isEqual(x, a[i + 1]);
		});

		elements.forEach((x, i) => {this[i] = x;});
		this.length = elements.length;
		this.card = elements.length;
	}


// ### Set.prototype.compare()
// Compare function for sets
//
// *@return {number}*
compare(x : any) : number {
	var a, i, ii;

	if (this.card !== x.card) {
		return MathLib.sign(this.card - x.card);
	}
	else {
		for (i = 0, ii = this.card; i < ii; i++) {
			a = MathLib.compare(this[i], x[i])
			if (a !== 0) {
				return a;
			}
		}
		return 0;
	}
}


// ### Set.prototype.every()
// Works like the Array.prototype.every function
//  
// *@return {boolean}*
every(...args : any[]) : boolean {
	return Array.prototype.every.apply(this, args);
}


// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@return {Set}*
filter(...args : any[]) : Set {
	return new MathLib.Set(Array.prototype.filter.apply(this, args));
}


// ### Set.prototype.forEach()
// Works like the Array.prototype.forEach function
// 
// 
forEach(...args : any[]) : void {
	Array.prototype.forEach.apply(this, args);
}


// ### Set.prototype.fromTo()
// Creates a set containing the numbers from a start value to a end value.
//
// *@param {number}* The number to start from  
// *@param {number}* The number to end with  
// *@param {number}* The stepsize (default = 1)  
// *@return {Set}*
static fromTo = function (f : number, t : number, s : number = 1) : Set {
	var i, set = [];
	if (f <= t) {
		for (i = f; i <= t; i += s) {
			set.push(i);
		}
		return new MathLib.Set(set);
	}
};


// ### Set.prototype.indexOf()
// Works like the Array.prototype.indexOf function
//  
// *@return {number}*
indexOf(...args : any[]) : number {
	return Array.prototype.indexOf.apply(this, args);
}


// ### Set.prototype.insert()
// Inserts an element into the set.
//
// *@return {Set}* Returns the current set
insert(x : any) : Set {
	var i = this.locate(x);
	if (this[i] !== x) {
		this.splice(i, 0, x);
		this.card++;
	}
	return this;
}


// ### Set.prototype.intersect()
// Returns the intersection of two sets.
//
// *@param {Set}*  
// *@return {Set}*
intersect = Set.createSetOperation(false, true, false);


// ### Set.prototype.isEmpty()
// Determines if the set is empty.
//
// *@return {boolean}*
isEmpty() : boolean {
	return this.card === 0;
}


// ### Set.prototype.isEqual()
// Determines if the set is equal to an other set.
//
// *@param {Set}* The set to compare  
// *@return {boolean}*
isEqual(x : Set) : boolean {
	if (this.card !== x.card) {
		return false;
	}
	else {
		return this.every(function (y, i) {
			return MathLib.isEqual(y, x[i]);
		});
	}
}


// ### Set.prototype.isSubsetOf()
// Determines if the set is a subset of an other set.
//
// *@param {Set}* The potential superset  
// *@return {boolean}*
isSubsetOf(a : Set) : boolean {
	return this.every(function (x) {
		return a.indexOf(x) !== -1;
	});
}


// ### Set.prototype.locate()
// Array.prototype.indexOf() returns only the position of an element in the
// array and not the position where one should be inserted.
//
// *@param {Set}* The element to locate  
// *@return {number}*
locate(x : any) : number {
	var left = 0,
			right = this.card - 1,
			middle,
			i = this.indexOf(x);

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
}


// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@return {Set}*
map(...args : any[]) : any {
	return new MathLib.Set(Array.prototype.map.apply(this, args));
}


// ### Set.prototype.plus()
// Adds the argument to all elements in the set,  
// or if no argument is provided adds up all the elements in the set.
//
// *@param {number|MathLib object}*  
// *@return {Set|any}*
plus(n : any) : any {
	var sum = [];
	if (!arguments.length) {
		return MathLib.plus.apply(null, this.toArray());
	}
	else if (n.type === 'set') {
		this.forEach(function (x) {
				n.forEach(function (y) {
					sum.push(MathLib.plus(x, y));
				});
			});

		return new MathLib.Set(sum);
	}
	else {
		return this.map(function (x) {
			return MathLib.plus(x, n);
		});
	}
}


// ### Set.prototype.powerset()
// Returns the powerset
//
// *@return {Set}*
powerset() : Set {
	var flag, subset, i, ii, j, jj,
			powerset = [];

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
}


// ### Set.prototype.reduce()
// Works like the Array.prototype.reduce function
//  
// *@return {any}*
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, arguments);
}


// ### Set.prototype.remove()
// Removes a element from a set
//
// *@return {Set}*
remove(a : any) : Set {
	var i = this.indexOf(a);
	if (i !== -1) {
		this.splice(i, 1);
		this.card--;
	}
	return this;
}


static createSetOperation = function (left, both, right) {
	return function (a) {
		var set = [],
				i = 0,
				j = 0,
				tl = this.card,
				al = a.card;

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
		}
		else if (right && i === tl) {
			set = set.concat(a.slice(j));
		}
		return new MathLib.Set(set);
	};
};


// ### Set.prototype.slice()
// Works like the Array.prototype.slice function
//
// *@return {array}*
slice(...args : any[]) : any {
	return Array.prototype.slice.apply(this, args);
}


// ### Set.prototype.some()
// Works like the Array.prototype.some function
//  
// *@return {boolean}*
some(...args : any[]) : boolean {
	return Array.prototype.some.apply(this, args);
}


// ### Set.prototype.splice()
// Works like the Array.prototype.splice function
//
// *@return {Set}*
splice(...args : any[]) : any {
	return Array.prototype.splice.apply(this, args);
}


// ### Set.prototype.times()
// Multiplies all elements in the set if no argument is passed.
// Multiplies all elements by a argument if one is passed.
//
// *@param {number|MathLib object}*  
// *@return {Set}*
times(n : any) : any {
	if (!arguments.length) {
		return MathLib.times.apply(null, this.toArray());
	}
	else {
		return this.map(function (x) {
			return MathLib.times(x, n);
		});
	}
}


// ### Set.prototype.toArray()
// Converts the set to an array
//
// *@return {array}*
toArray() : any[] {
	return Array.prototype.slice.call(this);
}


// ### Set.prototype.toContentMathML()
// Returns the content MathML representation of the set
//
// *@return {string}*
toContentMathML() : string {
	if (this.isEmpty()) {
		return '<emptyset/>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toContentMathML(cur);
		}, '<set>') + '</set>';
	}
}


// ### Set.prototype.toLaTeX()
// Returns the LaTeX representation of the set
//
// *@return {string}*
toLaTeX() : string {
	if (this.isEmpty()) {
		return '\\emptyset';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toLaTeX(cur) + ', ';
		}, '\\{').slice(0, -2) + '\\}';
	}
}


// ### Set.prototype.toMathML()
// Returns the (presentation) MathML representation of the set
//
// *@return {string}*
toMathML() : string {
	if (this.isEmpty()) {
		return '<mi>&#x2205;</mi>';
	}
	else {
		return this.reduce(function (old, cur) {
			return old + MathLib.toMathML(cur) + '<mo>,</mo>';
		}, '<mrow><mo>{</mo>').slice(0, -10) + '<mo>}</mo></mrow>';
	}
}


// ### Set.prototype.toString()
// Returns a string representation of the set
//
// *@return {string}*
toString() : string {
	if (this.isEmpty()) {
		return '∅';
	}
	return '{' + Array.prototype.join.call(this, ', ') + '}';
}


// ### Set.prototype.union()
// Returns the union of two sets.
//
// *@param {Set}*  
// *@return {Set}*
union = Set.createSetOperation(true, true, true);


// ### Set.prototype.without()
// Returns all elements, which are in the first set, but not in the second.
//
// *@param {Set}*  
// *@return {Set}*
without = Set.createSetOperation(true, false, false);


// ### Set.prototype.xor()
// Returns all elements which are in either the first or the second set.
//
// *@param {Set}*  
// *@return {Set}*
xor = Set.createSetOperation(true, false, true);


}
}


// [Specification](https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html)  
// Chrome: ~  
// Firefox: ~ [Unprefix the DOM fullscreen API](https://bugzilla.mozilla.org/show_bug.cgi?id=743198)  
// Safari: ✗  
// Internet Explorer: ✗  
// Opera: ✗  


// @fileoverview game-shim - Shims to normalize gaming-related APIs to their respective specs
// @author Brandon Jones
// @version 1.2


/* Copyright (c) 2012, Brandon Jones. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
	list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
	this list of conditions and the following disclaimer in the documentation 
	and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

(function (global) {
	'use strict';

	var elementPrototype = (global.HTMLElement || global.Element)['prototype'];
	var getter;


	// document.fullscreenEnabled
	if (!document.hasOwnProperty('fullscreenEnabled')) {
		getter = (function () {
			// These are the functions that match the spec, and should be preferred
			if ('webkitIsFullScreen' in document) {
				return function () { return (<any>document).webkitFullscreenEnabled; };
			}
			if ('mozFullScreenEnabled' in document) {
				return function () { return (<any>document).mozFullScreenEnabled; };
			}

			return function () { return false; }; // not supported, never fullscreen
		})();


	}

	if (!document.hasOwnProperty('fullscreenElement')) {
		getter = (function () {
			// These are the functions that match the spec, and should be preferred
			var i, ii,
					name = ['webkitCurrentFullScreenElement', 'webkitFullscreenElement', 'mozFullScreenElement'];
			for (i = 0, ii = name.length; i < ii; i++)
			{
				if (name[i] in document)
				{
					return function () { return document[name[i]]; };
				}
			}
			return function () { return null; }; // not supported
		})();

		Object.defineProperty(document, 'fullscreenElement', {
			enumerable: true, configurable: false, writeable: false,
			get: getter
		});
	}

	// Document event: fullscreenchange
	function fullscreenchange() {
		var newEvent = document.createEvent('CustomEvent');
		(<any>newEvent).initCustomEvent('fullscreenchange', true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenchange', fullscreenchange, false);
	document.addEventListener('mozfullscreenchange', fullscreenchange, false);

	// Document event: fullscreenerror
	function fullscreenerror() {
		var newEvent = document.createEvent('CustomEvent');
		(<any>newEvent).initCustomEvent('fullscreenerror', true, false, null);
		// TODO: Any need for variable copy?
		document.dispatchEvent(newEvent);
	}
	document.addEventListener('webkitfullscreenerror', fullscreenerror, false);
	document.addEventListener('mozfullscreenerror', fullscreenerror, false);

	// element.requestFullScreen
	if (!elementPrototype.requestFullScreen) {
		elementPrototype.requestFullScreen = (function () {
			if (elementPrototype.webkitRequestFullScreen) {
				return function () {
					this.webkitRequestFullScreen((<any>Element).ALLOW_KEYBOARD_INPUT);
				};
			}

			if (elementPrototype.mozRequestFullScreen) {
				return function () {
					this.mozRequestFullScreen();
				};
			}

			return function () {};
		})();
	}

	// document.exitFullScreen
	if (!(<any>document).exitFullScreen) {
		(<any>document).exitFullScreen = (function () {
			return  (<any>document).webkitCancelFullScreen ||
					(<any>document).mozCancelFullScreen ||
					function () {};
		})();
	}

})(window);


// [Specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#line-styles)  
// Chrome: ✓ [Implement canvas v5 line dash feature](http://trac.webkit.org/changeset/128116)  
// Firefox: ~ [Implement canvasRenderingContext2D.get/setLineDash](https://bugzilla.mozilla.org/show_bug.cgi?id=768067)  
// Safari: ✗  
// Internet Explorer: ✗  
// Opera: ✗  

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

	}

	// Safari isn't supporting webkitLineDash any longer, but it also has no support for setLineDash.
	// Additionally extending the CanvasRenderingContext2D.prototype is only possible with a weird hack.
	/*
	else if ('webkitLineDash' in CanvasRenderingContext2D.prototype) {
		prototype = document.createElement('canvas').getContext('2d').__proto__;
		setLineDash = function (dash) {
			this.webkitLineDash = dash;
		};
		getLineDash = function () {
			return this.webkitLineDash;
		};

		setLineDashOffset = function (dashOffset) {
			this.webkitLineDashOffset = dashOffset;
		};
		getLineDashOffset = function () {
			return this.webkitLineDashOffset;
		};
	}
	*/
	else {
		prototype = CanvasRenderingContext2D.prototype;
		setLineDash = function () {};
		getLineDash = function () {};
		setLineDashOffset = function () {};
		getLineDashOffset = function () {};
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


// Copyright 2012 Kap IT (http://www.kapit.fr/)
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Author : François de Campredon (http://francois.de-campredon.fr/),

// Object.observe PolyFill
// =======================

// *See [The harmony proposal page](http://wiki.ecmascript.org/doku.php?id=harmony:observe)*
if ((<any>Object).observe === undefined) {
	
	(function (global) {
		'use strict';


		// Utilities
		// ---------



		// setImmediate shim used to deliver changes records asynchronously

		//use setImmediate if available
		var setImmediate = global.setImmediate || global.msSetImmediate;
		var clearImmediate = global.clearImmediate || global.msClearImmediate;
		if (!setImmediate) {
			// fallback on setTimeout if not
			setImmediate = function (func, args) {
				return setTimeout(func, 0, args);
			};
			clearImmediate = function (id) {
				clearTimeout(id);
			};
		}



		// Internal Properties
		// -------------------

		// An ordered list used to provide a deterministic ordering in which callbacks are called.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#observercallbacks)
		var observerCallbacks = [];

		// This object is used as the prototype of all the notifiers that are returned by Object.getNotifier(O).
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#notifierprototype)
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
				var target = notifier.target,
					newRecord = Object.create(Object.prototype);
				Object.defineProperty(newRecord, 'object', {
					value: target,
					writable : false,
					enumerable : true,
					configurable: false
				});
				for (var prop in changeRecord) {
					if (prop !== 'object') {
						var value = changeRecord[prop];
						Object.defineProperty(newRecord, prop, {
							value: value,
							writable : false,
							enumerable : true,
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
			configurable : true
		});

		// Used to store immediate uid reference
		var changeDeliveryImmediateUid;

		// Used to schedule a call to deliverAllChangeRecords
		function setUpChangesDelivery () {
			clearImmediate(changeDeliveryImmediateUid);
			changeDeliveryImmediateUid = setImmediate(deliverAllChangeRecords, 0);
		}



		// Key used to store reference to notifier in objects
		var notifierProperty = '__notifier__';

		// Implementation of the internal algorithm 'GetNotifier'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#getnotifier)
		function getNotifier (target) {
			if (!target.hasOwnProperty(notifierProperty)) {
				var notifier = Object.create(NotifierPrototype);
				notifier.target = target;
				notifier.changeObservers = [];

				Object.defineProperty(target, notifierProperty, {
					value : notifier,
					enumerable: false,
					configurable: true,
					writable: true
				});
			}
			return target[notifierProperty];
		}



		// Key used to store reference to a list of pending changeRecords
		// in observer callback.
		var pendingChangesProperty = '__pendingChangeRecords__';

		// Implementation of the internal algorithm 'EnqueueChangeRecord'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#enqueuechangerecord)
		function enqueueChangeRecord (newRecord, observers) {
			for (var i = 0, l = observers.length; i < l; i++) {
				var observer = observers[i];
				if (!observer.hasOwnProperty(pendingChangesProperty)) {
					Object.defineProperty(observer, pendingChangesProperty, {
						value : null,
						enumerable: false,
						configurable: true,
						writable: true
					});
				}
				var pendingChangeRecords = observer[pendingChangesProperty] || (observer[pendingChangesProperty] = []);
				pendingChangeRecords.push(newRecord);
			}
		}

		// key used to store a count of associated notifier to a function
		var attachedNotifierCountProperty = '___attachedNotifierCount__';

		// Remove reference all reference to an observer callback,
		// if this one is not used anymore.
		// In the proposal the ObserverCallBack has a weak reference over observers,
		// Without this possibility we need to clean this list to avoid memory leak
		function cleanObserver (observer) {
			if (!observer[attachedNotifierCountProperty] && !observer[pendingChangesProperty]) {
				var index = observerCallbacks.indexOf(observer);
				if (index !== -1) {
					observerCallbacks.splice(index, 1);
				}
			}
		}

		// Implementation of the internal algorithm 'DeliverChangeRecords'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#deliverchangerecords)
		function deliverChangeRecords (observer) {
			var pendingChangeRecords = observer[pendingChangesProperty];
			observer[pendingChangesProperty] = null;
			if (!pendingChangeRecords || pendingChangeRecords.length === 0) {
				return false;
			}
			try {
				observer.call(undefined, pendingChangeRecords);
			}
			catch (e) {
				//TODO examine this
				console.log(e);
			}

			cleanObserver(observer);
			return true;
		}

		// Implementation of the internal algorithm 'DeliverAllChangeRecords'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#deliverallchangerecords)
		function deliverAllChangeRecords () {
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




		// Implementation of the public api 'Object.observe'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#object.observe)
		(<any>Object).observe = function (target, observer) {
			if (Object(target) !== target) {
				throw new TypeError('target must be an Object, given ' + target);
			}
			if (typeof observer !== 'function') {
				throw new TypeError('observerCallBack must be a function, given ' + observer);
			}

			if (Object.isFrozen(observer)) {
				throw new TypeError('observer cannot be frozen');
			}

			var notifier = getNotifier(target),
				changeObservers = notifier.changeObservers;

			if (changeObservers.indexOf(observer) === -1) {
				changeObservers.push(observer);
				if (observerCallbacks.indexOf(observer) === -1) {
					observerCallbacks.push(observer);
				}
				if (!observer.hasOwnProperty(attachedNotifierCountProperty)) {
					Object.defineProperty(observer, attachedNotifierCountProperty, {
						value : 0,
						enumerable: false,
						configurable: true,
						writable: true
					});
				}
				observer[attachedNotifierCountProperty]++;
			}
			return target;
		};

		// Implementation of the public api 'Object.unobseve'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#object.unobseve)
		(<any>Object).unobserve = function (target, observer) {
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

		// Implementation of the public api 'Object.deliverChangeRecords'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#object.deliverchangerecords)
		(<any>Object).deliverChangeRecords = function (observer) {
			if (typeof observer !== 'function') {
				throw new TypeError('callback must be a function, given ' + observer);
			}
			while (deliverChangeRecords(observer)) {}
		};

		// Implementation of the public api 'Object.getNotifier'
		// described in the proposal.
		// [Corresponding Section in ecma script wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe#object.getnotifier)
		(<any>Object).getNotifier = function (target) {
			if (Object(target) !== target) {
				throw new TypeError('target must be an Object, given ' + target);
			}
			return getNotifier(target);
		};


	})(this);

}
