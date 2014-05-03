/**
 * Returns the Gershgorin circles of the matrix.
 *
 * @return {array} Returns an array of circles
 */
gershgorin() {
	var c = [],
			rc = [],
			rr = [],
			circles = [],
			i, ii;

	for (i = 0, ii = this.rows; i < ii; i++) {
		rc.push(0);
		rr.push(0);
	}

	this.forEach(function (x, i, j) {
		if (i === j) {
			if (MathLib.is(x, 'complex')) {
				c.push(x.toPoint());
			}
			else {
				c.push(new MathLib.Point([x, 0, 1]));
			}
		}
		else {
			rc[j] += MathLib.abs(x);
			rr[i] += MathLib.abs(x);
		}
	});

	for (i = 0, ii = this.rows; i < ii; i++) {
		circles.push(new MathLib.Circle(c[i], Math.min(rc[i], rr[i])));
	}

	return circles;
}