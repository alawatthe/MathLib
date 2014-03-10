test('.lcm()', 8, function () {
	equal(MathLib.lcm(), 0, 'The empty lcm is zero.');
	equal(MathLib.lcm([]), 0, 'The empty lcm is zero.');
	equal(MathLib.lcm(7), 7);
	equal(MathLib.lcm([7]), 7);
	equal(MathLib.lcm(8, 12), 24);
	equal(MathLib.lcm([8, 12]), 24);
	equal(MathLib.lcm(1, 2, 3), 6);
	equal(MathLib.lcm([1, 2, 3]), 6);
});