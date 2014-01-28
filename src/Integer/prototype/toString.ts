/**
 * Custom toString function
 *
 * @return {string}
 */
toString() : string {
	var div, rem, temp,
			n = this.abs(),
			factor = new MathLib.Integer(1e7),
			str = '';

	if (n.isZero()) {
		return '0';
	}

	while (!n.isZero()) {
		temp = n.divrem(factor)
		div = temp[0];
		rem = temp[1];

		str	= ('000000' + rem.data[0]).slice(-7) + str;
		n = div;
	}

	str = str.replace(/^0+/, '');

	if (this.sign === '-') {
		str = '-' + str;
	}

	return str;
}