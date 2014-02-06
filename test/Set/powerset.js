test('.powerset()', 5, function () {
	equal((new MathLib.Set([])).powerset().card, 1);
	equal((new MathLib.Set([1])).powerset().card, 2);
	equal((new MathLib.Set([1, 2])).powerset().card, 4);
	equal((new MathLib.Set([1, 2, 3])).powerset().card, 8);
	equal((new MathLib.Set([1, 2, 3, 4])).powerset().card, 16);
});