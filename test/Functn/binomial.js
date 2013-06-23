test('.binomial()', 52, function () {
	equal(MathLib.isNaN(MathLib.binomial(NaN, NaN)), true, 'binomial(NaN, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, Infinity)), true, 'binomial(NaN, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -Infinity)), true, 'binomial(NaN, -∞)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, 0)), true, 'binomial(NaN, 0)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -0)), true, 'binomial(NaN, -0)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, 1)), true, 'binomial(NaN, 1)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -1)), true, 'binomial(NaN, -1)');


	equal(MathLib.isNaN(MathLib.binomial(Infinity, NaN)), true, 'binomial(∞, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(Infinity, Infinity)), true, 'binomial(∞, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(Infinity, -Infinity)), true, 'binomial(∞, -∞)');
	equal(MathLib.binomial(Infinity, 0), 1, 'binomial(∞, 0)');
	equal(MathLib.binomial(Infinity, -0), 1, 'binomial(∞, -0)');
	equal(MathLib.binomial(Infinity, 1), Infinity, 'binomial(∞, 1)');
	equal(MathLib.isPosZero(MathLib.binomial(Infinity, -1)), true, 'binomial(∞, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-Infinity, NaN)), true, 'binomial(-∞, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-Infinity, Infinity)), true, 'binomial(-∞, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-Infinity, -Infinity)), true, 'binomial(-∞, -∞)');
	equal(MathLib.binomial(-Infinity, 0), 1, 'binomial(-∞, 0)');
	equal(MathLib.binomial(-Infinity, -0), 1, 'binomial(-∞, -0)');
	equal(MathLib.binomial(-Infinity, 1), -Infinity, 'binomial(-∞, 1)');
	equal(MathLib.isPosZero(MathLib.binomial(-Infinity, -1)), true, 'binomial(-∞, -1)');


	equal(MathLib.isNaN(MathLib.binomial(0, NaN)), true, 'binomial(0, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(0, Infinity)), true, 'binomial(0, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(0, -Infinity)), true, 'binomial(0, -∞)');
	equal(MathLib.binomial(0, 0), 1, 'binomial(0, 0)');
	equal(MathLib.binomial(0, -0), 1, 'binomial(0, -0)');
	equal(MathLib.binomial(0, 1), 0, 'binomial(0, 1)');
	equal(MathLib.binomial(0, -1), 0, 'binomial(0, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-0, NaN)), true, 'binomial(-0, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-0, Infinity)), true, 'binomial(-0, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-0, -Infinity)), true, 'binomial(-0, -∞)');
	equal(MathLib.binomial(-0, 0), 1, 'binomial(-0, 0)');
	equal(MathLib.binomial(-0, -0), 1, 'binomial(-0, -0)');
	equal(MathLib.binomial(-0, 1), 0, 'binomial(-0, 1)');
	equal(MathLib.binomial(-0, -1), 0, 'binomial(-0, -1)');


	equal(MathLib.isNaN(MathLib.binomial(1, NaN)), true, 'binomial(1, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(1, Infinity)), true, 'binomial(1, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(1, -Infinity)), true, 'binomial(1, -∞)');
	equal(MathLib.binomial(1, 0), 1, 'binomial(1, 0)');
	equal(MathLib.binomial(1, -0), 1, 'binomial(1, -0)');
	equal(MathLib.binomial(1, 1), 1, 'binomial(1, 1)');
	equal(MathLib.binomial(1, -1), 0, 'binomial(1, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-1, NaN)), true, 'binomial(-1, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-1, Infinity)), true, 'binomial(-1, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-1, -Infinity)), true, 'binomial(-1, -∞)');
	equal(MathLib.binomial(-1, 0), 1, 'binomial(-1, 0)');
	equal(MathLib.binomial(-1, -0), 1, 'binomial(-1, -0)');
	equal(MathLib.binomial(-1, 1), -1, 'binomial(-1, 1)');
	equal(MathLib.binomial(-1, -1), 1, 'binomial(-1, -1)');


	equal(MathLib.binomial(6, 3), 20);
	equal(MathLib.binomial(2, 4), 0);
	equal(MathLib.binomial(-4, 3), -20);
});