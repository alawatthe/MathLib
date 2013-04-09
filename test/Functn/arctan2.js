test('.arctan2()', 24, function () {
	// Spec. 1: arctan2(±0, -0) is ±π
	equal(MathLib.arctan2(+0, -0), Math.PI, 'Spec. 1: arctan2(±0, -0) is ±π');
	equal(MathLib.arctan2(-0, -0), -Math.PI, 'Spec. 1: arctan2(±0, -0) is ±π');

	// Spec. 2: arctan2(±0, +0) is ±0
	equal(MathLib.isPosZero(MathLib.arctan2(+0, 0)), true, 'Spec. 2: arctan2(±0, +0) is ±0');
	equal(MathLib.isNegZero(MathLib.arctan2(-0, 0)), true, 'Spec. 2: arctan2(±0, +0) is ±0');

	// Spec. 3: arctan2(±0, x) is ±π for x<0
	equal(MathLib.arctan2(+0, -4), Math.PI, 'Spec. 3: arctan2(±0, x) is ±π for x<0');
	equal(MathLib.arctan2(-0, -4), -Math.PI, 'Spec. 3: arctan2(±0, x) is ±π for x<0');

	// Spec. 4: arctan2(±0, x) is ±0 for x>0
	equal(MathLib.isPosZero(MathLib.arctan2(+0, 4)), true, 'Spec. 4: arctan2(±0, x) is ±0 for x>0');
	equal(MathLib.isNegZero(MathLib.arctan2(-0, 4)), true, 'Spec. 4: arctan2(±0, x) is ±0 for x>0');

	// Spec. 5: arctan2(y, ±0) is -π/2 for y < 0
	equal(MathLib.arctan2(-4, 0), -Math.PI / 2, 'Spec. 5: arctan2(y, ±0) is -π/2 for y < 0');
	equal(MathLib.arctan2(-4, -0), -Math.PI / 2, 'Spec. 5: arctan2(y, ±0) is -π/2 for y < 0');

	// Spec. 6: arctan2(y, ±0) is +π/2 for y > 0
	equal(MathLib.arctan2(4, 0), Math.PI / 2, 'Spec. 6: arctan2(y, ±0) is +π/2 for y > 0');
	equal(MathLib.arctan2(4, -0), Math.PI / 2, 'Spec. 6: arctan2(y, ±0) is +π/2 for y > 0');

	// Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0
	equal(MathLib.arctan2(4, -Infinity), Math.PI, 'Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0');
	equal(MathLib.arctan2(-4, -Infinity), -Math.PI, 'Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0');

	// Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0
	equal(MathLib.isPosZero(MathLib.arctan2(4, Infinity)), true, 'Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0');
	equal(MathLib.isNegZero(MathLib.arctan2(-4, Infinity)), true, 'Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0');

	// Spec. 9: arctan2(±∞, x) is ±π/2 for finite x
	equal(MathLib.arctan2(Infinity, 4), Math.PI / 2, 'Spec. 9: arctan2(±∞, x) is ±π/2 for finite x');
	equal(MathLib.arctan2(-Infinity, 4), -Math.PI / 2, 'Spec. 9: arctan2(±∞, x) is ±π/2 for finite x');

	// Spec. 10: arctan2(±∞, -∞) is ±3π/4
	equal(MathLib.arctan2(Infinity, -Infinity), 3 / 4 * Math.PI, 'Spec. 10: arctan2(±∞, -∞) is ±3π/4');
	equal(MathLib.arctan2(-Infinity, -Infinity), -3 / 4 * Math.PI, 'Spec. 10: arctan2(±∞, -∞) is ±3π/4');

	// Spec. 11: arctan2(±∞, +∞) is ±π/4
	equal(MathLib.arctan2(Infinity, Infinity), Math.PI / 4, 'Spec. 11: arctan2(±∞, +∞) is ±π/4');
	equal(MathLib.arctan2(-Infinity, Infinity), -Math.PI / 4, 'Spec. 11: arctan2(±∞, +∞) is ±π/4');

	// Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)
	equal(MathLib.arctan2(1, 1), Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
	equal(MathLib.arctan2(-1, 1), -Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
});