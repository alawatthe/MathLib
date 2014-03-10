test('.rem()', 25, function () {
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
});