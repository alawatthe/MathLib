// ### <a href="http://mathlib.de/en/docs/Expression/parseContentMathML">Expression.prototype.parseContentMathML</a>
// Parses a content MathML string and returns an Expression.
//
// *@return {Expression}*
static parseContentMathML(MathMLString) : Expression {
	var tokenizer = new DOMParser(),
			MathMLdoc,
			expr = {};


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
		false: function (node) {
			return new MathLib.Expression.constant('false');
		},
		pi: function (node) {
			return new MathLib.Expression.constant('pi');
		},
		true: function (node) {
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