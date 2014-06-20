test('.hypot()', 16, function () {
	// Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite
	equal(MathLib.hypot(+Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(NaN, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(-Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(NaN, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(+Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(2, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(-Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(2, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');

	// Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite
	equal(MathLib.isNaN(MathLib.hypot(NaN, 2)), true,
		'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');
	equal(MathLib.isNaN(MathLib.hypot(2, NaN)), true,
		'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');

	// Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0
	equal(MathLib.isPosZero(MathLib.hypot(0, 0)), true, 'Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');
	equal(MathLib.isPosZero(MathLib.hypot(-0, -0)), true, 'Spec. 3:MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');


	// Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments
	equal(MathLib.isEqual(MathLib.hypot(3), 3), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(-3), 3), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
});