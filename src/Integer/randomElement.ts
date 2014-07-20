/**
 * Returns a random element of the ring of integers
 * in the intervall [start, end] (both endpoits included).
 * If the second argument is not provided, the intervall is
 * [start, 0] (if start is negative) or [0, start] (if start is positive).
 * Again, both endpoits are included.
 *
 * @param {start} Integer - the integer starting the intervall
 * @param {end} Integer - the integer ending the intervall
 * @return {Integer}
 */
static randomElement(start : Integer, end? : Integer) : Integer {
	var i, endMinusStart,
			arr = [],
			base = Math.pow(2, 26);

	if (arguments.length === 1) {
		endMinusStart = start;
	}
	else {
		endMinusStart = end.minus(start);
	}

	for (i = 1; i < endMinusStart.data.length; i++) {
		arr.push(Math.floor(Math.random() * base));
	}

	arr.push(Math.floor(Math.random() * (endMinusStart.data[endMinusStart.data.length - 1] + 1)));

	if (arguments.length === 1) {
		return (new MathLib.Integer(arr, {sign: start.sign}));
	}
	else {
		return (new MathLib.Integer(arr)).plus(start);
	}
}
