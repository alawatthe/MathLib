test('.mod()', 25, function () {
	ok(MathLib.isNaN(MathLib.mod(NaN, NaN)), 'NaN mod NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(NaN, Infinity)), 'NaN mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(NaN, -Infinity)), 'NaN mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, NaN)), '-∞ mod NaN = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, NaN)), '-∞ mod -NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(NaN, 3)), 'NaN mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(NaN, -3)), 'NaN mod -3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(4, NaN)), '-4 mod NaN = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, NaN)), '-4 mod -NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(Infinity, Infinity)), '∞ mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, -Infinity)), '∞ mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, Infinity)), '-∞ mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, -Infinity)), '-∞ mod -∞ = NaN');

	ok(MathLib.isNaN(MathLib.mod(Infinity, 3)), '∞ mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, -3)), '∞ mod -3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, 3)), '-∞ mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, -3)), '-∞ mod -3 = NaN');

	ok(MathLib.isNaN(MathLib.mod(4, Infinity)), '4 mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(4, -Infinity)), '4 mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, Infinity)), '-4 mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, -Infinity)), '-4 mod -∞ = NaN');

	equal(MathLib.mod(4, 3), 1, '4 mod 3 = 1');
	equal(MathLib.mod(4, -3), -2, '4 mod -3 = -2');
	equal(MathLib.mod(-4, 3), 2, '-4 mod 3 = 2');
	equal(MathLib.mod(-4, -3), -1, '-4 mod -3 = -1');
});