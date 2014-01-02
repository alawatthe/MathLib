test('.powerset()', 5, function () {
	var S = MathLib.Set,
			m = new MathLib.Set([1, 2, 3]),
			n = new MathLib.Set([new S([]), new S([1]), new S([2]), new S([3]), new S([1, 2]), new S([1, 3]), new S([2, 3]), new S([1, 2, 3])]);
//	ok(m.powerset().isEqual(n), '.powerset()');
	
	equal((new MathLib.Set([])).powerset().card, 1);
	equal((new MathLib.Set([1])).powerset().card, 2);
	equal((new MathLib.Set([1, 2])).powerset().card, 4);
	equal((new MathLib.Set([1, 2, 3])).powerset().card, 8);
	equal((new MathLib.Set([1, 2, 3, 4])).powerset().card, 16);
});