test('.toFunctn()', 3, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			f = p.toFunctn(),
			sinf = MathLib.sin(f);

	equal(f.type, 'functn', '.type should be functn');
	equal(sinf.toString(), 'x ⟼ sin(3*x^2+2*x+1)', 'composition with other functions');
	equal(f(42), 5377, 'fuctn evaluation');
});