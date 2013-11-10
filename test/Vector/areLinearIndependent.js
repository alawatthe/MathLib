test('.areLinearIndependent()', 5, function () {
	var v1 = new MathLib.Vector([0, 0, 0]),
			v2 = new MathLib.Vector([1, 0, 0]),
			v3 = new MathLib.Vector([2, 0, 0]),
			v4 = new MathLib.Vector([0, 1, 0]),
			v5 = new MathLib.Vector([0, 0, 1]),
			v6 = new MathLib.Vector([0, 1]);

	equal(MathLib.Vector.areLinearIndependent([v1, v2]), false, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v2, v3]), false, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v2, v4, v5]), true, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v2, v4, v5, v3]), false, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v5, v6]), undefined, '.areLinearIndependent()');
});