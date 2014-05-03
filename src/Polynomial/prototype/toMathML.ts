/**
 * Returns a MathML representation of the polynomial
 *
 * @return {string}
 */
toMathML() : string {
	var str = '<mrow>' + MathLib.toMathML(this[this.deg]) +
				'<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(this.deg) + '</msup>',
			i;
	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {
			// if (i === 0) {
			//   str += MathLib.toMathML(this[i]);
			// }
			// else {
				str += MathLib.toMathML(this[i], {sign: true});
			// }

			if (i > 1) {
				str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathML(i).slice(6, -7) + '</msup>';
			}
			else if (i === 1) {
				str += '<mo>&#x2062;</mo><mi>x</mi>';
			}
		}
	}

	str += '</mrow>';

	return str;
}