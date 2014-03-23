test('pow()', 65, function () {
	// Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)
	equal(MathLib.pow(1, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(0, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-0, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(NaN, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(1, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(0, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-0, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(NaN, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');

	// Spec. 2: MathLib.pow (±0, y) = ±∞ (for y a finite, odd integer < 0)
	equal(MathLib.pow(+0, -5), +Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (or y a finite, odd integer < 0)');
	equal(MathLib.pow(-0, -5), -Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (or y a finite, odd integer < 0)');

	// Spec. 3: MathLib.pow(±0, -∞) = +∞
	equal(MathLib.pow(+0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(±0, -∞) = +∞');
	equal(MathLib.pow(-0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(±0, -∞) = +∞');

	// Spec. 4: MathLib.pow(±0, +∞) = +0
	equal(MathLib.isPosZero(MathLib.pow(+0, Infinity)), true, 'Spec. 4: MathLib.pow(±0, +∞) = +0');
	equal(MathLib.isPosZero(MathLib.pow(-0, Infinity)), true, 'Spec. 4: MathLib.pow(±0, +∞) = +0');

	// Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)
	equal(MathLib.pow(+0, -4), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(-0, -4), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(+0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(-0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');

	// Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)
	equal(MathLib.isPosZero(MathLib.pow(+0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)');
	equal(MathLib.isNegZero(MathLib.pow(-0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)');

	// Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)
	equal(MathLib.isPosZero(MathLib.pow(+0, 4)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(-0, 4)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(+0, 5.5)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(-0, 5.5)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');

	// Spec. 8: MathLib.pow(-1, ±∞) = 1
	equal(MathLib.pow(-1, +Infinity), 1, 'Spec. 8: MathLib.pow(-1, ±∞) = 1');
	equal(MathLib.pow(-1, -Infinity), 1, 'Spec. 8: MathLib.pow(-1, ±∞) = 1');

	// Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)
	equal(MathLib.pow(1, 2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, -2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, +Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, -Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, NaN), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');

	// Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)
	equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');
	equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');

	// Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)
	equal(MathLib.pow(3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)');
	equal(MathLib.pow(-3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)');

	// Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)
	equal(MathLib.isPosZero(MathLib.pow(3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)');
	equal(MathLib.isPosZero(MathLib.pow(-3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)');

	// Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)
	equal(MathLib.isPosZero(MathLib.pow(0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)');
	equal(MathLib.isPosZero(MathLib.pow(-0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)');

	// Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)
	equal(MathLib.pow(0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)');
	equal(MathLib.pow(-0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)');

	// Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)
	equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)');
	equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)');

	// Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)
	equal(MathLib.isPosZero(MathLib.pow(+Infinity, -2)), true, 'Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)');
	equal(MathLib.isPosZero(MathLib.pow(+Infinity, -Infinity)), true, 'Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)');

	// Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)
	equal(MathLib.pow(-Infinity, 2), Infinity, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, Infinity), Infinity, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, -Infinity), 0, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');

	// Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)
	equal(MathLib.isNaN(MathLib.pow(NaN, 1)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, -Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, NaN)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');

	// Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)
	equal(MathLib.isNaN(MathLib.pow(2, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(-Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(-0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');

	// Spec. 20: otherwise MathLib.pow(x, n) = x^n
	equal(MathLib.pow(2, 3), 8, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
	equal(MathLib.pow(2, -3), 0.125, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
});