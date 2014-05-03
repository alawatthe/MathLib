/**
 * Calculates the four polarity of a conic.
 *
 * @return {Point[]}
 */
polarity(x) {
	var object, m,
			c = this;

	if (x.type === 'line') {
		object = new MathLib.Point([0, 0, 0]);
		m = 'dual';
	}
	else if (x.type === 'point') {
		object = new MathLib.Line([0, 0, 0]);
		m = 'primal';
	}


	Object.defineProperties(object, {
		'0': {
			get: function () { return c[m][0][0] * x[0] + c[m][0][1] * x[1] + c[m][0][2] * x[2]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
					method: 'Conic#polarity'
				});
			},
			enumerable: true
		},
		'1': {
			get: function () { return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
					method: 'Conic#polarity'
				});
			},
			enumerable: true
		},
		'2': {
			get: function () { return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2]; },
			set: function () {
				MathLib.warning({
					message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
					method: 'Conic#polarity'
				});
			},
			enumerable: true
		}
	});

	return object;
}