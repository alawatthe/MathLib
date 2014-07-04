/**
 * Heavily based on Ariya Hidayat's [tapdigit library](https://code.google.com/p/tapdigit/)
 * and his series "math evaluator in javascript":
 * [Part 1: tokenizer](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part1.html)
 * [Part 2: parser](http://ariya.ofilabs.com/2011/08/math-evaluator-in-javascript-part-2.html)
 * [Part 3: interpreter](http://ariya.ofilabs.com/2011/08/math-expression-evaluator-in-javascript-part-3.html)
 *
 * @param {string} str - The string to parse
 * @return {Expression}
 */
static parse = function (str : string) : Expression {

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

		function peekNextChar (n = 1) {
			var idx = index;
			return ((idx < length) ? expression.substr(idx, n) : '\x00');
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
			if (peekNextChar(2) === ':=') {
				index += 2;

				return createToken(T.Operator, ':=');
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
				}
				else {
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

		// Assignment ::= Identifier ':=' Assignment |
		//                Additive
		function parseAssignment() {
			var expr, value, token,
					content = [];

			expr = parseAdditive();

			if (typeof expr !== 'undefined' && expr.subtype	=== 'variable') {

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
