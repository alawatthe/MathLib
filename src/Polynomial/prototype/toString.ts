/**
 * Custom toString function
 *
 * @return {string}
 */
toString() : string {
	var i,
			str = MathLib.toString(this[this.deg]) + '*x^' + this.deg;

	for (i = this.deg - 1; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {

			str += MathLib.toString(this[i], {sign: true});

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