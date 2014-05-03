/**
 * Determines an parallel line through a given point.
 *
 * @param {Point} p The Point through which the line should go through
 * @return {Line}
 */
parallelThrough(p : Point) : Line {
	var l = this,
			parallel = new MathLib.Line([0, 0, 0]);

	Object.defineProperties(parallel, {
		'0': {
			get: function () { return -l[0] * p[2]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent line.',
					method: 'Line#parallelThrough'
				});
			},
			enumerable: true
		},
		'1': {
			get: function () { return -l[1] * p[2]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent line.',
					method: 'Line#parallelThrough'
				});
			},
			enumerable: true
		},
		'2': {
			get: function () { return l[1] * p[1] + l[0] * p[0]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent line.',
					method: 'Line#parallelThrough'
				});
			},
			enumerable: true
		}
	});

	return parallel;
}