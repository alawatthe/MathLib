/**
 * Calculates the meeting point of two lines
 *
 * @param {Line} l The line to intersect the current line with
 * @return {Point}
 */
meet(l : Line) : Point {
	var point,
			k = this;

	if (this.dimension === 2 && l.dimension === 2) {
		point = new MathLib.Point(this.vectorProduct(l).toArray());

		Object.defineProperties(point, {
			'0': {
				get: function () { return k[1] * l[2] - k[2] * l[1]; },
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent point.',
						method: 'Line#meet'});
				},
				enumerable: true
			},
			'1': {
				get: function () { return k[2] * l[0] - k[0] * l[2]; },
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent point.',
						method: 'Line#meet'
					});
				},
				enumerable: true
			},
			'2': {
				get: function () { return k[0] * l[1] - k[1] * l[0]; },
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent point.',
						method: 'Line#meet'
					});
				},
				enumerable: true
			}
		});

		return point;
	}
}
