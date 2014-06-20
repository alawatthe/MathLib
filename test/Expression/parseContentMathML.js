test('.parseContentMathML() based_integer', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<apply><csymbol cd="nums1">based_integer' +
		'</csymbol><cn>8</cn><cs> 10 </cs></apply>'), new MathLib.Integer(8));
});

test('.parseContentMathML() boolean', 8, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><and/><true/><true/></apply></math>').evaluate(), true, '</and> true true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><and/><true/><false/><true/></apply></math>').evaluate(), false, '</and> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><or/><false/><false/></apply></math>').evaluate(), false, '</or> false false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><or/><true/><false/><true/></apply></math>').evaluate(), true, '</or> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><xor/><false/><true/></apply></math>').evaluate(), true, '</xor> false false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><xor/><true/><false/><true/></apply></math>').evaluate(), false, '</xor> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><not/><false/></apply></math>').evaluate(), true, '</not> false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><not/><true/></apply></math>').evaluate(), false, '</not> true');
});


test('.parseContentMathML() ci', 1, function () {
	MathLib.Expression.variables.n = 42;
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.' +
		'org/1998/Math/MathML"><ci>n</ci></math>').evaluate(), 42, '.parse() ci');
});


test('.parseContentMathML() complex', 2, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.' +
		'org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>'),
	new MathLib.Complex(3, 4), '.parse() complex (cartesian)');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/' +
		'1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn>' +
		'</math>').isEqual(new MathLib.Complex(-1, 0)), '.parse() complex (polar)');
});


test('.parseContentMathML() cn', 3, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn>+34</cn></math>'), 34, '.parse() a normal number');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn>34.2</cn></math>'), 34.2, '.parse() a normal number');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn>.123</cn></math>'), 0.123, '.parse() a normal number');
	// deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/' +
	// 'MathML"><cn>+34E-12</cn></math>').evaluate(), 34e-12, '.parse() a normal number');
	// deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/' +
	// 'MathML"><cn>+34.345E-12</cn></math>').evaluate(), 34.345e-12, '.parse() a normal number');
});


test('.parseContentMathML() cs', 1, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cs>MathLib.js - A mathematical JavaScript library</cs></math>'),
		'MathLib.js - A mathematical JavaScript library', '.parse() cs');
});


test('.parseContentMathML() logic1', 2, function () {
	equal(MathLib.Expression.parseContentMathML('<csymbol cd="logic1">true</csymbol>'), true);
	equal(MathLib.Expression.parseContentMathML('<csymbol cd="logic1">false</csymbol>'), false);
});


test('.parseContentMathML() rational', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www' +
		'.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>'),
	new MathLib.Rational(new MathLib.Integer(3), new MathLib.Integer(4)), '.parse() rational');
});


test('.parseContentMathML() function constructing', 6, function () {
	var expsin = MathLib.Expression.parseContentMathML('<math xmlns="http://' +
		'www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar>' +
		'<domainofapplication><complexes/></domainofapplication><apply><exp/>' +
		'<apply><sin/><ci>x</ci></apply></apply></lambda></math>').evaluate();

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.' +
		'org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar>' +
		'<domainofapplication><complexes/></domainofapplication><apply><sin/>' +
		'<ci>x</ci></apply></lambda></math>').evaluate()(0), 0, '.evaluate() sin');
	equal(expsin(0), 1, 'exp(sin(0)) = 1');
	equal(expsin.toString(), 'x ⟼ exp(sin(x))', '.toString');
	equal(expsin.type, 'functn', 'exp(sin(x)).type');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org' +
		'/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/>' +
		'</domainofapplication><apply><ident/><ci>x</ci></apply></lambda>' +
		'</math>').evaluate()(42), 42, 'The identity function');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org' +
		'/1998/Math/MathML"><lambda><bvar>x</bvar><apply><csymbol cd="transc2">' +
		'arctan</csymbol><ci>x</ci></apply></lambda></math>').evaluate()(1, 2), Math.atan2(1, 2));
	// deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
	//   '<lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply>' +
	//   '<plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').evaluate()(42), 44, 'The result of 42 + 2 should be 44');
	// deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
	//   '<lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply>' +
	//   '<plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').evaluate()(42), 44, 'The result of 42 + 2 should be 44');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci>' +
	//   '</bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply>' +
	//   '<power/><ci>x</ci><ci>y</ci></apply></lambda></math>').evaluate()(4, 2), 16, 'Function with two arguments');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>' +
	//   '<ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/>' +
	//   '<apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply>' +
	//   '<cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').evaluate()(42), 1,
	//   'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parseContentMathML() function evaluation', 7, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><sin/><cn>42</cn></apply></math>').evaluate(), Math.sin(42), '.evaluate() apply');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').evaluate(), 6, 'plus');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><ln/><cn>42</cn></apply></math>').evaluate(), Math.log(42), '.evaluate() apply');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><factorial/><cn>6</cn></apply></math>').evaluate(), 720, 'factorial');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><csymbol cd="logic1">and</csymbol><true/><true/></apply></math>').evaluate(), true, 'and');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><minus/><cn>42</cn><cn>17</cn></apply></math>').evaluate(), 25, '.evaluate() apply');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><minus/><cn>42</cn></apply></math>').evaluate(), -42, '.evaluate() apply');
});


test('.parseContentMathML() list', 2, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<list><cn type="double">1</cn><cn type="double">2</cn>' +
		'<list><cn type="double">3</cn><cn type="double">4</cn></list><cn type="rational">1<sep/>2</cn></list>'),
		[1, 2, [3, 4], new MathLib.Rational(new MathLib.Integer(1), new MathLib.Integer(2))]);
	deepEqual(MathLib.Expression.parseContentMathML('<apply><csymbol cd="list1">list</csymbol>' +
		'<cn type="double">1</cn><cn type="double">2</cn><apply><csymbol cd="list1">list</csymbol>' +
		'<cn type="double">3</cn><cn type="double">4</cn></apply><apply><csymbol cd="nums1">rational' +
		'</csymbol><cn type="double">1</cn><cn type="double">2</cn></apply></apply>'),
		[1, 2, [3, 4], new MathLib.Rational(1, 2)]);
});


test('.parseContentMathML() matrix', 2, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn>' +
		'<cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>'),
		new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow>' +
		'<cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow>' +
		'</matrix></apply></math>').evaluate(), -360, '.evaluate() apply');
});


test('.parseContentMathML() set', 3, function () {
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>' +
		'9</cn><cn>10</cn></set></math>').isEqual(MathLib.Set.fromTo(1, 10)), 'set containing numbers');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply>' +
		'</math>').evaluate().isEqual(new MathLib.Set([1, 2, 3])), 'set union');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').isEqual(
		new MathLib.Set(['A', 'B', ' '])), 'set containing variables');
});


test('.parseContentMathML() vector', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3' +
		'.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>'),
		new MathLib.Vector([1, 2, 3]), 'vector');
});


test('.parseContentMathML() whitespaces', 1, function () {
	var mathML = MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/' +
		'Math/MathML">\n<set>\t<cn>  123  </cn><cs> String with spaces </cs> </set>\t</math>');

	equal(mathML.toString(), '{123, " String with spaces "}');
});