/**
 * Calculates the floor of the square root of the integer
 *
 * @return {Integer}
 */
isqrt() : Integer {
	var y,
			two = new MathLib.Integer('2'),
			numberofbits = ((this.data.length - 1) * 25 + 1 + Math.log(this.data[this.data.length - 1]) / Math.log(2)),
			x = (new MathLib.Integer(2)).pow(new MathLib.Integer(Math.ceil( numberofbits / 2 )));

	while (true) {
		y = x.plus(this.divrem(x)[0]).divrem(two)[0];

		if (y.minus(x).isZero()) {
			return x;
		}
		x = y;
	}
}