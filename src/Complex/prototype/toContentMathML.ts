/**
 * Returns the content MathML representation of the number
 *
 * @return {string}
 */
toContentMathML() : string {

	if (!this.isFinite()) {
		return '<csymbol cd="nums1">' +
			(this.re === Infinity ? 'infinity' : 'NaN') +
			'</csymbol>';
	}

	return '<apply><plus />' + MathLib.toContentMathML(this.re) + '<apply><times />'
					+ MathLib.toContentMathML(this.im) + '<imaginaryi /></apply></apply>';
}