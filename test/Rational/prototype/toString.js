test('.prototype.toString()', 8, function () {
	var r = new MathLib.Rational(2, 3),
			p = new MathLib.Rational(-2, 3);

	equal(r.toString(), '2/3', '.toString()');
	equal(r.toString({sign: true}), '+2/3', '.toString()');
	equal(r.toString({base: 2}), '10/11', '.toString()');
	equal(r.toString({base: 2, baseSubscript: true}), '10&#x2082;/11&#x2082;', '.toString()');

	equal(p.toString(), '-2/3', '.toString()');
	equal(p.toString({sign: true}), '-2/3', '.toString()');
	equal(p.toString({base: 2}), '-10/11', '.toString()');
	equal(p.toString({base: 2, baseSubscript: true}), '-10&#x2082;/11&#x2082;', '.toString()');
});