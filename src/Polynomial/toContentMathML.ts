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