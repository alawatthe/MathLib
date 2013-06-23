// Static methods
// TODO: test if the result is right
test('.isMathMLSupported()', 1, function () {
	var supp = MathLib.isMathMLSupported();
	equal(typeof supp, 'boolean', '.isMathMLSupported()');
});