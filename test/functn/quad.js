test('.quad()', 2, function () {
	ok(Math.abs(MathLib.sin.quad(0, 2 * Math.PI)) < 1e-15, 'integrate sin from 0 to 2*pi');
	ok(Math.abs(MathLib.exp.quad(0, 1) - Math.E + 1) < 1e-7, 'integrate exp from 0 to 1');
});