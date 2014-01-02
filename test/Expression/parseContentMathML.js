test('.parse() boolean', 8, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><true/></apply></math>').evaluate(), true, '</and> true true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><false/><true/></apply></math>').evaluate(), false, '</and> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><false/><false/></apply></math>').evaluate(), false, '</or> false false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><true/><false/><true/></apply></math>').evaluate(), true, '</or> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><false/><true/></apply></math>').evaluate(), true, '</xor> false false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><true/><false/><true/></apply></math>').evaluate(), false, '</xor> true false true');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><false/></apply></math>').evaluate(), true, '</not> false');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><true/></apply></math>').evaluate(), false, '</not> true');
});



test('.parse() ci', 1, function () {
	MathLib.Expression.variables.n = 42;
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><ci>n</ci></math>').evaluate(), 42, '.parse() ci');
});


test('.parse() cs', 1, function () {
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').evaluate(), 'MathLib.js - A mathematical JavaScript library', '.parse() cs');
});


test('.parse() cn', 5, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34</cn></math>').evaluate(), 34, '.parse() a normal number');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>34.2</cn></math>').evaluate(), 34.2, '.parse() a normal number');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>.123</cn></math>').evaluate(), 0.123, '.parse() a normal number');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34E-12</cn></math>').evaluate(), 34e-12, '.parse() a normal number');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34.345E-12</cn></math>').evaluate(), 34.345e-12, '.parse() a normal number');
});


test('.parse() complex', 3, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>').evaluate(), new MathLib.Complex(3, 4), '.parse() complex (cartesian)');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn></math>').evaluate().isEqual(new MathLib.Complex(-1, 0)), '.parse() complex (polar)');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/><pi/></cn></math>').evaluate().isEqual(new MathLib.Complex(-1, 0)), '.parse() complex (polar)');
});


test('.parse() rational', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').evaluate(), new MathLib.Rational(3, 4), '.parse() rational');
});


test('.parse() function constructing', 3, function () {
	var expsin = MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>').evaluate();

	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>').evaluate()(0), 0, '.evaluate() sin');
	deepEqual(expsin(0), 1, 'exp(sin(0)) = 1');
	//deepEqual(expsin.toString(), 'x ⟼ exp(sin(x))', '.toString');
	//deepEqual(expsin.type, 'functn', 'exp(sin(x)).type');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>').evaluate()(42), 42, 'The identity function');
	//deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').evaluate()(42), 44, 'The result of 42 + 2 should be 44');
	//deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').evaluate()(42), 44, 'The result of 42 + 2 should be 44');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><ci>x</ci><ci>y</ci></apply></lambda></math>').evaluate()(4, 2), 16, 'Function with two arguments');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').evaluate()(42), 1, 'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parse() function evaluation', 4, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><cn>42</cn></apply></math>').evaluate(), Math.sin(42), '.evaluate() apply');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').evaluate(), 6, 'plus');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><ln/><cn>42</cn></apply></math>').evaluate(), Math.log(42), '.evaluate() apply');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><factorial/><cn>6</cn></apply></math>').evaluate(), 720, 'factorial');
});


test('.parse() matrix', 2, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>').evaluate(), new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.evaluate() matrix');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply></math>').evaluate(), -360, '.evaluate() apply');
});


test('.parse() set', 3, function () {
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').evaluate().isEqual(MathLib.Set.fromTo(1, 10)), 'set containing numbers');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').evaluate().isEqual(new MathLib.Set([1, 2, 3])), 'set union');
	ok(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').evaluate().isEqual(new MathLib.Set(['A', 'B', ' '])), 'set containing variables');
});


test('.parse() vector', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').evaluate(), new MathLib.Vector([1, 2, 3]), 'vector');
});




test('whitespaces', 1, function () {
	var mathML = MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs> String with spaces </cs> </set>\t</math>');

	equal(mathML.toString(), '{123, " String with spaces "}');
});