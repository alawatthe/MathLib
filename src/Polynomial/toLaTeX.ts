/**
 * Returns a LaTeX representation of the polynomial
 *
 * @return {string}
 */
toLaTeX() : string {
	var str = MathLib.toString(this[this.deg]) + 'x^{' + this.deg + '}',
			i;

	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {
			// if (i === 0) {
			//   str += MathLib.toLaTeX(this[i]);
			// }
			// else {
				str += MathLib.toLaTeX(this[i], {sign: true});
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