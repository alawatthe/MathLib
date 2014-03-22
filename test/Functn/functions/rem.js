test('.rem()', 37, function () {
	ok(MathLib.isNaN(MathLib.rem(NaN, NaN)), 'NaN rem NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(NaN, Infinity)), 'NaN rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(NaN, -Infinity)), 'NaN rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, NaN)), '-∞ rem NaN = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, NaN)), '-∞ rem -NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(NaN, 3)), 'NaN rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(NaN, -3)), 'NaN rem -3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(4, NaN)), '-4 rem NaN = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, NaN)), '-4 rem -NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(Infinity, Infinity)), '∞ rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, -Infinity)), '∞ rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, Infinity)), '-∞ rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, -Infinity)), '-∞ rem -∞ = NaN');

	ok(MathLib.isNaN(MathLib.rem(Infinity, 3)), '∞ rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, -3)), '∞ rem -3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, 3)), '-∞ rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, -3)), '-∞ rem -3 = NaN');

	ok(MathLib.isNaN(MathLib.rem(4, Infinity)), '4 rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(4, -Infinity)), '4 rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, Infinity)), '-4 rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, -Infinity)), '-4 rem -∞ = NaN');

	equal(MathLib.rem(4, 3), 1, '4 rem 3 = 1');
	equal(MathLib.rem(4, -3), 1, '4 rem -3 = 1');
	equal(MathLib.rem(-4, 3), -1, '-4 rem 3 = -1');
	equal(MathLib.rem(-4, -3), -1, '-4 rem -3 = -1');

	// Tests for the Safari 5 bug.
	// For more information see the src/Functn/functions/rem.ts file.
	equal(MathLib.rem(4, -1), 0, '4 rem -1 = 0');
	equal(MathLib.rem(4, -2), 0, '4 rem -2 = 0');
	equal(MathLib.rem(4, -4), 0, '4 rem -4 = 0');
	equal(MathLib.rem(4, -5), 4, '4 rem -5 = 4');
	equal(MathLib.rem(7, -1), 0, '7 rem -1 = 0');
	equal(MathLib.rem(7, -2), 1, '7 rem -2 = 1');
	equal(MathLib.rem(7, -4), 3, '7 rem -4 = 3');
	equal(MathLib.rem(7, -5), 2, '7 rem -5 = 2');
	equal(MathLib.rem(123456789, -10), 9, '123456789 rem -10 = 9');
	equal(MathLib.rem(123456789, -100), 89, '123456789 rem -100 = 89');
	equal(MathLib.rem(123456789, -1000), 789, '123456789 rem -1000 = 789');
	equal(MathLib.rem(987654321, -123456789), 9, '987654321 rem -123456789 = 9');
});