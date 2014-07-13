/**
 * Custom toString function
 *
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
toString(options : toPresentationOptions = {}) : string {
	var div, rem, temp,
			base = options.base || 10,
			blocksize = Math.floor(Math.log(Math.pow(2, 26) - 1) / Math.log(base)),
			factor = new MathLib.Integer(Math.pow(base, blocksize)),
			n = this.abs(),
			str = '';

	if (n.isZero()) {
		str = '0';
	}
	else {
		while (!n.isZero()) {
			temp = n.divrem(factor);
			div = temp[0];
			rem = temp[1];

			str	= ('000000' + rem.data[0].toString(base)).slice(-blocksize) + str;
			n = div;
		}

		str = str.replace(/^0+/, '');

		if (this.sign === '-') {
			str = '-' + str;
		}
	}

	if (options.sign && (this.sign === '+' || this.isZero())) {
		str = '+' + str;
	}

	if (options.baseSubscript) {
		if (base > 9) {
			str += '&#x208' + Math.floor(base / 10) + ';';
		}
		str += '&#x208' + (base % 10) + ';';
	}

	return str;
}
