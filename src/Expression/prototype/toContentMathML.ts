/**
 * Convert the Expression to MathML.
 *
 * @return {string}
 */
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

		return '<apply><csymbol cd="' + this.cdgroup + '">' + this.contentMathMLName + '</csymbol>' +
			this.content.map(expr => expr.toContentMathML()).join('') +
			'</apply>';
	}

	if (this.subtype === 'functionDefinition') {
		return '<lambda><bvar><ci>' +
			this.args.join('</ci></bvar><bvar><ci>') +
			'</ci></bvar>' +
			this.content.map(expr => expr.toContentMathML()) +
			'</lambda>';
	}
}