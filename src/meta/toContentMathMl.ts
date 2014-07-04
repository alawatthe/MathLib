/**
 * A content MathML string representation
 *
 * @param {any} x - The value to which the MathML should be generated
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
export var toContentMathML = function (x, options : toContentMathMLOptions = {}) : string {
	var base = options.base || 10;

	if (Array.isArray(x)) {
		if (options.strict) {
			return '<apply><csymbol cd="list1">list</csymbol>' +
				x.map(entry => MathLib.toContentMathML(entry, options)).join('') +
				'</apply>';
		}
		else {
			return '<list>' + x.map(entry => MathLib.toContentMathML(entry, options)).join('') + '</list>';
		}
	}

	if (typeof x === 'object' && 'toContentMathML' in x) {
		return x.toContentMathML(options);
	}

	if (typeof x === 'number') {
		
		if (MathLib.isNaN(x)) {
			if (options.strict) {
				return '<csymbol cd="nums1">NaN</csymbol>';
			}
			else {
				return '<notanumber/>';
			}
		}
		
		else if (!MathLib.isFinite(x)) {
			if (x === Infinity) {
				if (options.strict) {
					return '<csymbol cd="nums1">infinity</csymbol>';
				}
				else {
					return '<infinity/>';
				}
			}
			else {
				if (options.strict) {
					return '<apply><csymbol cd="arith1">times</csymbol><cn>-1</cn><csymbol cd="nums1">infinity</csymbol></apply>';
				}
				else {
					return '<apply><times/><cn>-1</cn><infinity/></apply>';
				}
			}
		}

		if (base === 10) {
			return '<cn type="double">' + MathLib.toString(x) + '</cn>';
		}
		
		if (options.strict) {
			return '<apply><csymbol cd="nums1">based_float</csymbol>'
				 			+ '<cn type="integer">' + base + '</cn>'
							+ '<cs>' + MathLib.toString(x, {base: base}) + '</cs>'
							+ '</apply>';
		}

		return '<cn type="real" base="' + base + '">' + MathLib.toString(x, {base: base}) + '</cn>';
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