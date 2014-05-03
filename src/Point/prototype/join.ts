/**
 * Calculates a line connecting two points
 *
 * @param {Point} q The point to calculate the line to  
 * @return {Line}
 */
join(q : Point) : Line {
	var line,
			p = this;

	if (this.dimension === 2 && q.dimension === 2) {
		line = new MathLib.Line(this.vectorProduct(q).toArray());

		Object.defineProperties(line, {
			'0': {
				get: function () {
					return p[1] * q[2] - p[2] * q[1];
				},
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent line.',
						method: 'Point#join'
					});
				},
				enumerable: true
			},
			'1': {
				get: function () {
					return p[2] * q[0] - p[0] * q[2];
				},
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent line.',
						method: 'Point#join'
					});
				},
				enumerable : true
			},
			'2': {
				get: function () {
					return p[0] * q[1] - p[1] * q[0];
				},
				set: function () {
					MathLib.warning({
						message: 'Trying to change the coordinates of a completely dependent line.',
						method: 'Point#join'
					});
				},
				enumerable: true
			}
		});

		return line;
	}
}