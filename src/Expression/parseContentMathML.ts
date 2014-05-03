/**
 * Parses a content MathML string and returns an Expression.
 *
 * @param {string} MathMLString The string to be parsed as MathML
 * @return {Expression}
 */
static parseContentMathML(MathMLString : string) : Expression {
	var MathMLdoc,
			tokenizer = new DOMParser();


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
		}
		// We are in cs element, so don't do anything.
		else {
			return x;
		}
	}).join('cs>');


	// Gives an error in Firefox
	// MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml');
	MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');


	var handler = {
		apply: function (node) {
			var functnName, expr, cd,
					children = Array.prototype.slice.call(node.childNodes),
					functnNameNode = children.shift(),
					isMethod = true,
					functnNames = {
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
			}
			else {
				functnName = functnNameNode.nodeName;
			}

			// Change some function names for functions with different names in MathLib
			if (functnName in functnNames) {
				functnName = functnNames[functnName];
			}
			else if (functnName === 'minus' && children.length === 1) {
				functnName = 'negative';
			}
			else if (functnName === 'arctan' && cd === 'transc2') {
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
				return new MathLib.Integer(parsedChildren[1], {base: parsedChildren[0]});
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

			if (functnName in MathLib && MathLib[(<string>functnName)].type === 'functn') {
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
		cn: function (node) : any {
      var type = node.getAttribute('type');

			if (type === 'integer') {
				var base = node.getAttribute('base') !== null ? Number(node.getAttributes('base')) : 10;
				return new MathLib.Integer(node.textContent.trim(), {base: base});
			}
			else if (type === 'real' || type === null || type === '') {
				// TODO: adapt this, once the Real class exists
				return Number(node.textContent);
			}
			else if (type === 'double') {
				return Number(node.textContent);
			}
			// else if (type === 'hexdouble') {
			//   TODO: implement
			// }
			// else if (type === 'e-notation') {
			//   TODO: implement
			// }
			else if (type === 'rational') {
				return new MathLib.Rational(
					new MathLib.Integer(node.childNodes[0].textContent),
					new MathLib.Integer(node.childNodes[2].textContent)
					);
			}
			else if (type === 'complex-cartesian') {
				return new MathLib.Complex(Number(node.childNodes[0].textContent), Number(node.childNodes[2].textContent));
			}
			else if (type === 'complex-polar') {
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
			var doa, apply,
					bvar = [],
					i = 0;

			while (node.childNodes[i].nodeName === 'bvar') {
				bvar.push(MathLib.Expression.variable(node.childNodes[i].childNodes[0].textContent));
				i++;
			}

			if (node.childNodes[i].nodeName === 'domainofapplication') {
				doa = node.childNodes[i].childNodes[0].nodeName;

				if (doa === 'integers') {
					doa = MathLib.Integer;
				}
				else if (doa === 'rationals') {
					doa = MathLib.Rational;
				}
				else if (doa === 'complexes') {
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
			}
			else {
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
			return new MathLib.Matrix(
				Array.prototype.slice.call(node.childNodes).map(handler.matrixrow)
			);
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

	return parser(MathMLdoc.childNodes[0]) ;
}