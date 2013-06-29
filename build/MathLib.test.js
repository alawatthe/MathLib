/*! MathLib v0.5.1 MathLib.de | MathLib.de/en/license */
module('MathLib');
test('general', 1, function () {
	equal(typeof MathLib, 'object', 'is MathLib defined');
});
test('.compare()', 3, function () {
	equal(MathLib.compare(12, 12), 0);
	equal(MathLib.compare(1, 2), -1);
	equal(MathLib.compare(23, new MathLib.Complex([3, 4])), 1);
});
test('.is()', 12, function () {
	var p = new MathLib.Point([1, 2, 3]),
			v = new MathLib.Vector([1, 2, 3]);
	equal(MathLib.is(2, 'number'), true);
	equal(MathLib.is(p, 'point'), true);
	equal(MathLib.is(p, 'vector'), true);
	equal(MathLib.is(p, 'object'), true);
	equal(MathLib.is(p, 'line'), false);
	equal(MathLib.is(v, 'vector'), true);
	equal(MathLib.is(v, 'point'), false);
	equal(MathLib.is([], 'array'), true);
	equal(MathLib.is(function () {}, 'function'), true);
	equal(MathLib.is(MathLib.sin, 'functn'), true);
	equal(MathLib.is(null, 'null'), true);
	equal(MathLib.is(undefined, 'undefined'), true);
});
test('.type()', 10, function () {
	equal(MathLib.type(new MathLib.Complex([2, 3])), 'complex', 'MathLib.type(MathLib.complex([2, 3])) = "complex"');
	equal(MathLib.type(42), 'number', 'MathLib.type(42) = "number"');
	equal(MathLib.type(['ar', 'ray']), 'array', 'MathLib.type([1,2]) = "array"');
	equal(MathLib.type({ob: 'ject'}), 'object', 'MathLib.type({obj: 42}) = "object"');
	equal(MathLib.type(true), 'boolean', 'MathLib.type(true) = "boolean"');
	equal(MathLib.type('string'), 'string', 'MathLib.type("str") = "string"');
	equal(MathLib.type(function () {}), 'function', 'MathLib.type(function(){}) = "function"');
	equal(MathLib.type(/regexp/), 'regexp', 'MathLib.type(/regexp/) = "regexp"');
	equal(MathLib.type(undefined), 'undefined', 'MathLib.type(undefined) = "undefined"');
	equal(MathLib.type(null), 'null', 'MathLib.type(null) = "null"');
});
module('Circle');
test('init', 2, function () {
	var p = new MathLib.Point(1, 2),
			circle = new MathLib.Circle(p, 2);
	equal(circle.radius, 2, 'Testing the radius');
	deepEqual(circle.center, p, 'Testing the center');
});



// Properties
test('.constructor', 1, function () {
	var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
	equal(c.constructor, MathLib.Circle, 'Testing .constructor');
});

test('.type', 1, function () {
	var c = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2);
	equal(c.type, 'circle', 'Testing .type');
});
test('.area()', 5, function () {
	var p = new MathLib.Point(1, 2),
			c1 = new MathLib.Circle(p, NaN),
			c2 = new MathLib.Circle(p, +0),
			c3 = new MathLib.Circle(p, -0),
			c4 = new MathLib.Circle(p, Infinity),
			c5 = new MathLib.Circle(p, 2);

	// Spec. 1: c.area() = NaN if r = NaN
	equal(MathLib.isNaN(c1.area()), true, 'Spec. 1: c.area() = NaN if r = NaN');

	// Spec. 2: c.area() = +0 if r = +0
	equal(MathLib.isPosZero(c2.area()), true, 'Spec. 2: c.area() = +0 if r = +0');

	// Spec. 3: c.area() = -0 if r = +0
	equal(MathLib.isPosZero(c3.area()), true, 'Spec. 3: c.area() = -0 if r = +0');

	// Spec. 4: c.area() = ∞ if r = ∞
	equal(c4.area(), Infinity, 'Spec. 4: c.area() = ∞ if r = ∞');

	// Spec. 5: otherwise c.area() = π r * r
	equal(c5.area(), 4 * MathLib.pi, 'Spec. 5: otherwise c.area() = π * r * r');
});
test('.circumference()', 5, function () {
	var p = new MathLib.Point(1, 2),
			c1 = new MathLib.Circle(p, NaN),
			c2 = new MathLib.Circle(p, +0),
			c3 = new MathLib.Circle(p, -0),
			c4 = new MathLib.Circle(p, Infinity),
			c5 = new MathLib.Circle(p, 2);

	// Spec. 1: c.circumference() = NaN if r = NaN
	equal(MathLib.isNaN(c1.circumference()), true, 'Spec. 1: c.circumference() = NaN if r = NaN');

	// Spec. 2: c.circumference() = +0 if r = +0
	equal(MathLib.isPosZero(c2.circumference()), true, 'Spec. 2: c.circumference() = +0 if r = +0');

	// Spec. 3: c.circumference() = -0 if r = -0
	equal(MathLib.isNegZero(c3.circumference()), true, 'Spec. 3: c.circumference() = -0 if r = -0');

	// Spec. 4: c.circumference() = ∞ if r = ∞
	equal(c4.circumference(), Infinity, 'Spec. 4: c.circumference() = ∞ if r = ∞');

	// Spec. 5: otherwise c.circumference() = 2 π r
	equal(c5.circumference(), 4 * MathLib.pi, 'Spec. 5: otherwise c.circumference() = 2 π r');
});
test('.compare()', 3, function () {
	var c1 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c2 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c3 = new MathLib.Circle(new MathLib.Point(1, 2), 2),
			c4 = new MathLib.Circle(new MathLib.Point(2, 2), 3);

	equal(c1.compare(c2), 0, '.compare()');
	equal(c1.compare(c3), 1, '.compare()');
	equal(c1.compare(c4), -1, '.compare()');
});
test('.isEqual()', 3, function () {
	var c1 = new MathLib.Circle(new MathLib.Point(1, 2), 2),
			c2 = new MathLib.Circle(new MathLib.Point(1, 2), 3),
			c3 = new MathLib.Circle(new MathLib.Point([2, 4, 2]), 2),
			c4 = new MathLib.Circle(new MathLib.Point(2, 3), 2);

	equal(c1.isEqual(c3), true, '.isEqual()');
	equal(c1.isEqual(c2), false, '.isEqual() different radius');
	equal(c1.isEqual(c4), false, '.isEqual() different center');
});
test('.positionOf()', 3, function () {
	var center = new MathLib.Point(1, 2),
			circle = new MathLib.Circle(center, 2),
			on = new MathLib.Point(1, 4),
			out = new MathLib.Point(2, 4),
			inside = new MathLib.Point(2, 3);

	equal(circle.positionOf(on), 'on', 'Point on the circle');
	equal(circle.positionOf(out), 'out', 'Point outside the circle');
	equal(circle.positionOf(inside), 'in', 'Point inside the circle');
});
test('.reflectAt()', 2, function () {
	var p = new MathLib.Point(1, 2),
			q = new MathLib.Point(3, 7),
			circle = new MathLib.Circle(p, 2),
			newcircle = circle.reflectAt(q);

	equal(newcircle.radius, 2, 'Checking the radius.');
	deepEqual(newcircle.center, new MathLib.Point(5, 12), 'Checking the center.');
});
test('.toLaTeX()', 1, function () {
	var p = new MathLib.Point(1, 2),
			c = new MathLib.Circle(p, 2);

	equal(c.toLaTeX(), 'B_{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)', 'Spec. 1: ');
});
test('.toMatrix()', 1, function () {
	var p = new MathLib.Point(1, 2),
			c = new MathLib.Circle(p, 2);

	deepEqual(c.toMatrix(), new MathLib.Matrix([[1, 0, -1], [0, 1, -2], [-1, -2, 1]]), '');
});
module('Complex');
test('init (1 Number)', 2, function () {
	var c = new MathLib.Complex(3);
	equal(c.re, 3, 'Testing the real part');
	equal(c.im, 0, 'Testing the imaginary part');
});

test('init (2 Numbers)', 2, function () {
	var c = new MathLib.Complex(1, 2);
	equal(c.re, 1, 'Testing the real part');
	equal(c.im, 2, 'Testing the imaginary part');
});


// Properties
test('.constructor', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.constructor, MathLib.Complex, 'Testing .constructor');
});

test('.type', 1, function () {
	var c = new MathLib.Complex(3, 4);
	equal(c.type, 'complex', 'Testing .type');
});
test('.abs()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 0);

	equal(MathLib.isEqual(c1.abs(), 5), true, 'Absolut value of a complex number');
	equal(MathLib.isEqual(c2.abs(), 0), true, 'Absolut value of a complex number');
});
test('.arg()', 4, function () {
	var c1 = new MathLib.Complex(1, 1),
			c2 = new MathLib.Complex(1, -1),
			c3 = new MathLib.Complex(0, 0),
			c4 = new MathLib.Complex(-1, 0);

	equal(c1.arg(), 0.7853981633974483, '');
	equal(c2.arg(), -0.7853981633974483, '');
	equal(c3.arg(), 0,  '');
	equal(c4.arg(), 3.141592653589793,  '');
});
test('.compare()', 3, function () {
	var c = new MathLib.Complex(3, 2),
			d = new MathLib.Complex(1, 1),
			e = new MathLib.Complex(-1, 1);
	equal(c.compare(c), 0, 'equal complex numbers');
	equal(c.compare(d), 1, 'normal compare');
	equal(d.compare(e), -1,  '');
});
test('.conjugate()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	c = c.conjugate();
	equal(c.re, 3, 'Checking the conjugate of a complex number');
	equal(c.im, -4, 'Checking the conjugate of a complex number');
});
test('.divide()', 2, function () {
	var c = new MathLib.Complex(3, 6),
			d = new MathLib.Complex(2, 5),
			e = new MathLib.Complex(3, 7);
	deepEqual(c.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(d.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});
test('.inverse()', 2, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(0, 2);
	deepEqual(c1.inverse(), new MathLib.Complex(3 / 25, -4 / 25), 'Checking the inverse of a complex number');
	deepEqual(c2.inverse(), new MathLib.Complex(0, -1 / 2), 'Checking the inverse of a complex number');
});
test('.isEqual()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 4),
			e = new MathLib.Complex(5, 3);
	equal(c.isEqual(d), true, 'equal number');
	equal(d.isEqual(e), false, 'different number');
});
test('.isFinite()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(Infinity, 0);
	equal(c.isFinite(), true, 'finite complex number');
	equal(d.isFinite(), false, 'infinte complex number');
});
test('.isOne()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(1, 0);
	equal(c.isOne(), false, '3+4i');
	equal(d.isOne(), true, 'complex one');
});
test('.isReal()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 0);
	equal(c.isReal(), false, '3+4i');
	equal(d.isReal(), true, '3+0i');
});
test('.isZero()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 0);
	equal(c.isZero(), false, 'non zero complex');
	equal(d.isZero(), true, 'complex zero');
});
test('.ln()', 1, function () {
	var c = new MathLib.Complex(3, 4),
			res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);
	equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});
test('.minus()', 1, function () {
	var c = new MathLib.Complex(3, -4),
			d = new MathLib.Complex(7, -8);
	deepEqual(c.minus(d), new MathLib.Complex(-4, 4), 'Checking the negative of a complex number');
});
test('.negative()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	c = c.negative(); 
	equal(c.re, -3, 'Checking the negative of a complex number');
	equal(c.im, 4, 'Checking the negative of a complex number');
});
test('one', 1, function () {
	var c = MathLib.Complex.one;
	deepEqual(c, new MathLib.Complex(1, 0), '.one');
});
test('.plus()', 2, function () {
	var c = new MathLib.Complex(3, 4);
	var d = new MathLib.Complex(2, -5);
	deepEqual(c.plus(d), new MathLib.Complex(5, -1), 'Adding two complex numbers.');
	deepEqual(c.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex numbers.');
});
test('.sign()', 1, function () {
	var c = new MathLib.Complex(5, 6),
			d = MathLib.Complex.polar(1, Math.atan2(6, 5));
	equal(c.sign().isEqual(d), true, '.sign()');
});
test('.sin()', 1, function () {
	ok(MathLib.isEqual(MathLib.sin(new MathLib.Complex(1, 2)), new MathLib.Complex(3.1657785132161674, 1.959601041421606)));
});
test('.sqrt()', 3, function () {
	ok(MathLib.isEqual((new MathLib.Complex(0, 2)).sqrt(), new MathLib.Complex(1, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, 0)).sqrt(), new MathLib.Complex(0, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, -0)).sqrt(), new MathLib.Complex(0, -1)));
});
test('.times()', 3, function () {
	var c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);
	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4 / 3, 10 / 3)), true, 'Multiplying by a rational number.');
});
test('.toContentMathML()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toContentMathML(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
	equal(d.toContentMathML(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
	equal(e.toContentMathML(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
	equal(f.toContentMathML(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
	equal(g.toContentMathML(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});
test('.toLaTeX()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toLaTeX(), '3+4i', 'Normal complex number.');
	equal(d.toLaTeX(), '7i', 'Real part is zero.');
	equal(e.toLaTeX(), '4', 'Complex part is zero.');
	equal(f.toLaTeX(), '4-5i', 'Complex part is negative.');
	equal(g.toLaTeX(), '0', 'Number is zero.');
});
test('.toMathML()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toMathML(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
	equal(d.toMathML(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
	equal(e.toMathML(), '<mn>4</mn>', 'Complex part is zero.');
	equal(f.toMathML(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
	equal(g.toMathML(), '<mn>0</mn>', 'Number is zero.');
});
test('.toMatrix()', 2, function () {
	var c = new MathLib.Complex(3, -4);
	equal(c.toMatrix().type, 'matrix', 'type check');
	deepEqual(c.toMatrix(), new MathLib.Matrix([[3, 4], [-4, 3]]), 'entries');
});
test('.toPoint()', 3, function () {
	var c = new MathLib.Complex(3, -4),
			p = c.toPoint();
	equal(p.type, 'point', 'Converting a complex number to a point: type check');
	equal(p.dimension, 2, 'Converting a complex number to a point: dimension check.');
	deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});
test('.toString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toString(), '3+4i', 'Normal complex number.');
	equal(d.toString(), '7i', 'Real part is zero.');
	equal(e.toString(), '4', 'Complex part is zero.');
	equal(f.toString(), '4-5i', 'Complex part is negative.');
	equal(g.toString(), '0', 'Number is zero.');
});
test('zero', 1, function () {
	var c = MathLib.Complex.zero;
	deepEqual(c, new MathLib.Complex(0, 0), '.zero');
});

module('Expression');
test('init', 2, function () {
	var e1 = new MathLib.Expression('sin(1)'),
			e2 = new MathLib.Expression({value: 1, subtype: 'number'});
	equal(e1.subtype, 'functionCall', 'init (string)');
	equal(e2.subtype, 'number', 'init (object)');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.Expression();
	equal(e.constructor, MathLib.Expression, 'Testing .constructor');
});

test('.type', 1, function () {
	var e = new MathLib.Expression();
	equal(e.type, 'expression', 'Testing .type');
});
test('.compare()', 3, function () {
	var e1 = new MathLib.Expression('sin(42)'),
			e2 = new MathLib.Expression('sin(42)'),
			e3 = new MathLib.Expression('cos(42)'),
			e4 = new MathLib.Expression('tan(42)');
	equal(e1.compare(e2), 0, '.compare()');
	equal(e1.compare(e3), 1, '.compare()');
	equal(e1.compare(e4), -1,  '.compare()');
});
test('.parse (Number)', 11, function () {
	equal(MathLib.Expression.parse('123').value, 123, '.parse("123")');
	equal(MathLib.Expression.parse('123.').value, 123, '.parse("123.")');
	equal(MathLib.Expression.parse('.456').value, 0.456, '.parse(".456")');
	equal(MathLib.Expression.parse('123.456e7').value, 123.456e7, '.parse("123.456e7")');
	equal(MathLib.Expression.parse('123.456E7').value, 123.456E7, '.parse("123.456eE7")');
	equal(MathLib.Expression.parse('123.456e+7').value, 123.456e+7, '.parse("123.456e+7")');
	equal(MathLib.Expression.parse('123.456E+7').value, 123.456E+7, '.parse("123.456E+7")');
	equal(MathLib.Expression.parse('123.456e-7').value, 123.456e-7, '.parse("123.456e-7")');
	equal(MathLib.Expression.parse('123.456E-7').value, 123.456E-7, '.parse("123.456E-7")');

	var num = MathLib.Expression.parse('123');
	equal(num.type, 'expression');
	equal(num.subtype, 'number');
});


test('.parse (unaryOperator)', 4, function () {
	var unary = MathLib.Expression.parse('-12');
	equal(unary.subtype, 'unaryOperator');
	equal(unary.value, '-');

	equal(MathLib.Expression.parse('+12').evaluate(), +12, '.parse("12+34")');
	equal(MathLib.Expression.parse('-12').evaluate(), -12, '.parse("12*34")');
});



test('.parse (binaryOperator)', 10, function () {
	equal(MathLib.Expression.parse('12+34').evaluate(), 12 + 34, '.parse("12+34")');
	equal(MathLib.Expression.parse('12*34').evaluate(), 12 * 34, '.parse("12*34")');

	equal(MathLib.Expression.parse('65-43-21').evaluate(), 65 - 43 - 21, '.parse("65-43-21")');


	equal(MathLib.Expression.parse('12*34+56').evaluate(), 12 * 34 + 56, '.parse("12*34+56")');
	equal(MathLib.Expression.parse('12+34*56').evaluate(), 12 + 34 * 56, '.parse("12+34*56")');
	equal(MathLib.Expression.parse('12*34/6').evaluate(), 12 * 34 / 6, '.parse("12*34/6")');
	equal(MathLib.Expression.parse('12/3*4').evaluate(), 12 / 3 * 4, '.parse("12/3*4")');
	equal(MathLib.Expression.parse('12/3/4').evaluate(), 12 / 3 / 4, '.parse("12/3/4")');
	equal(MathLib.Expression.parse('36/2/3/6').evaluate(), 36 / 2 / 3 / 6, '.parse("36/2/3/6")');
	equal(MathLib.Expression.parse('36/2/3/2/3').evaluate(), 36 / 2 / 3 / 2 / 3, '.parse("36/2/3/2/3")');
});



test('.parse (brackets)', 3, function () {
	var br = MathLib.Expression.parse('(1)');
	equal(br.subtype, 'brackets');
	equal(br.value, 'brackets');
	deepEqual(br.content.value, '1');
});


test('.parse (functionCall)', 3, function () {
	var fn = MathLib.Expression.parse('cos(1)');
	equal(fn.subtype, 'functionCall');
	equal(fn.value, 'cos');
	deepEqual(fn.content[0].value, '1');
});

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
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').evaluate(), MathLib.Set.fromTo(1, 10), 'set containing numbers');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').evaluate(), new MathLib.Set([1, 2, 3]), 'set union');
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').evaluate(), new MathLib.Set(['A', 'B', ' ']), 'set containing variables');
});


test('.parse() vector', 1, function () {
	deepEqual(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').evaluate(), new MathLib.Vector([1, 2, 3]), 'vector');
});




test('whitespaces', 1, function () {
	var mathML = MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs> String with spaces </cs> </set>\t</math>');

	equal(mathML.toString(), '{123, " String with spaces "}');
});
test('.toContentMathML', 5, function () {
	equal(MathLib.Expression.parse('123.456E-7').toContentMathML(), '<cn>123.456E-7</cn>', '("123.456E-7").toContentMathML()');
	equal(MathLib.Expression.parse('1+2').toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply>', '("1+2").toContentMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toContentMathML(), '<apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply><cn>3</cn></apply>', '("(1+2)*3").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)').toContentMathML(), '<apply><csymbol cd="transc1">sin</csymbol><cn>1</cn></apply>', '("sin(1)").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="transc1">sin</csymbol><cn>1</cn></apply><apply><csymbol cd="transc1">cos</csymbol><apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="transc1">exp</csymbol><cn>2</cn></apply><cn>3</cn></apply></apply></apply>', '("sin(1)+cos(exp(2)*3)").toContentMathML()');
});
test('.toLaTeX', 13, function () {
	equal(MathLib.Expression.parse('123.456E-7').toLaTeX(), '123.456E-7', '("123.456E-7").toLaTeX()');
	equal(MathLib.Expression.parse('1+2').toLaTeX(), '1+2', '("1+2").toLaTeX()');
	equal(MathLib.Expression.parse('(1+2)*3').toLaTeX(), '\\left(1+2\\right)\\cdot3', '("(1+2)*3").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)').toLaTeX(), '\\sin\\left(1\\right)', '("sin(1)").toLaTeX()');
	equal(MathLib.Expression.parse('exp(1)').toLaTeX(), 'e^{1}', '("exp(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sqrt(1)').toLaTeX(), '\\sqrt{1}', '("sqrt(1)").toLaTeX()');
	equal(MathLib.Expression.parse('arsinh(1)').toLaTeX(), '\\operatorname{arsinh}\\left(1\\right)', '("arsinh(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toLaTeX(), '\\sin\\left(1\\right)+\\cos\\left(e^{2}\\cdot3\\right)', '("sin(1)+cos(exp(2)*3)").toLaTeX()');


	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toLaTeX(), '\\texttt{"{}MathLib.js - A mathematical JavaScript library"}', '.toLaTeX() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toLaTeX(), '\\frac{3}{4}', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toLaTeX(), '\\begin{pmatrix}1&2\\\\3&4\\\\5&6\\end{pmatrix}', '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toLaTeX(), '\\left{1, 2, 3\\right}', '.toLaTeX() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toLaTeX(), '\\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}', 'toLaTeX() vector');
});
test('.toMathML', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toMathML(), '<mn>123.456E-7</mn>', '("123.456E-7").toMathML()');
	equal(MathLib.Expression.parse('1+2').toMathML(), '<mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow>', '("1+2").toMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toMathML(), '<mrow><mrow><mo>(</mo><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow><mo>&middot;</mo><mn>3</mn></mrow>', '("(1+2)*3").toMathML()');
	equal(MathLib.Expression.parse('sin(1)').toMathML(), '<mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow>', '("sin(1)").toMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toMathML(), '<mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mrow><mo>(</mo><mrow><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow><mo>&middot;</mo><mn>3</mn></mrow><mo>)</mo></mrow></mrow></mrow>', '("sin(1)+cos(exp(2)*3)").toMathML()');


	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toMathML(), '<ms>MathLib.js - A mathematical JavaScript library</ms>', '.toMathML() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toMathML(), '<mfrac><mn>3</mn><mn>4</mn></mfrac>', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toMathML(), '<mrow><mo>{</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>}</mo></mrow>', '.toMathML() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', 'toMathML() vector');
});





test('.toString', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toString(), '123.456E-7', '("123.456E-7").toString()');
	equal(MathLib.Expression.parse('1+2').toString(), '1+2', '("1+2").toString()');
	equal(MathLib.Expression.parse('(1+2)*3').toString(), '(1+2)*3', '("(1+2)*3").toString()');
	equal(MathLib.Expression.parse('sin(1)').toString(), 'sin(1)', '("sin(1)").toString()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toString(), 'sin(1)+cos(exp(2)*3)', '("sin(1)+cos(exp(2)*3)").toString()');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cs>MathLib.js - A mathematical JavaScript library</cs></math>').toString(), '"MathLib.js - A mathematical JavaScript library"', '.toString() cs');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="rational">3<sep/>4</cn></math>').toString(), '3/4', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow><matrixrow><cn>5</cn><cn>6</cn></matrixrow></matrix></math>').toString(), '⎛1\t2⎞\n⎜3\t4⎟\n⎝5\t6⎠', '.evaluate() matrix');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toString(), '{1, 2, 3}', '.toString() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toString(), '(1, 2, 3)', 'toString() vector');

});
module('Functn');
test('execution', 4, function () {
	equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
	equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
	equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
	equal(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin), MathLib.times(MathLib.cos, MathLib.cos))(42), 1, 'sin(42)^2 + cos(42)^2 = 1');
});



// Properties
test('.constructor', 1, function () {
	equal(MathLib.sin.constructor, MathLib.Functn, 'Testing .constructor');
});


test('.type', 4, function () {
	equal(MathLib.sin.type, 'functn', 'MathLib.sin.type should be functn');
	equal(MathLib.exp(MathLib.sin).type, 'functn', 'MathLib.exp(MathLib.sin).type should be functn');
	equal(MathLib.plus(1, MathLib.cos).type, 'functn', 'MathLib.plus(1, MathLib.cos).type should be functn');
	equal(MathLib.plus(MathLib.cos, 1).type, 'functn', 'MathLib.plus(MathLib.cos, 1).type should be functn');
});
test('.abs()', 7, function () {
	// Spec. 1: MathLib.abs(NaN) = NaN
	equal(MathLib.isNaN(MathLib.abs(NaN)), true, 'Spec. 1: MathLib.abs(NaN) = NaN');

	// Spec. 2: MathLib.abs(+0) = +0
	equal(MathLib.isPosZero(MathLib.abs(+0)), true, 'Spec. 2: MathLib.abs(+0) = +0');

	// Spec. 3: MathLib.abs(-0) = +0
	equal(MathLib.isPosZero(MathLib.abs(-0)), true, 'Spec. 3: MathLib.abs(-0) = +0');

	// Spec. 4: MathLib.abs(+∞) = ∞
	equal(MathLib.abs(+Infinity), +Infinity, 'Spec. 4: MathLib.abs(+∞) = ∞');

	// Spec. 5: MathLib.abs(-∞) = ∞
	equal(MathLib.abs(-Infinity), +Infinity, 'Spec. 5: MathLib.abs(-∞) = ∞');

	// Spec. 6: otherwise MathLib.abs(x) = absolute value of x
	equal(MathLib.abs(1), 1, 'Spec. 6: otherwise MathLib.abs(x) = absolute value of x');
	equal(MathLib.abs(-1), 1, 'Spec. 6: otherwise MathLib.abs(x) =  absolute value of x');
});
test('.and()', 14, function () {
	equal(MathLib.and(), true);
	equal(MathLib.and([]), true);
	equal(MathLib.and(true), true);
	equal(MathLib.and([true]), true);
	equal(MathLib.and(false), false);
	equal(MathLib.and([false]), false);
	equal(MathLib.and(true, true), true, 'true and true = true');
	equal(MathLib.and([true, true]), true, 'true and true = true');
	equal(MathLib.and(true, false), false, 'true and false = false');
	equal(MathLib.and([true, false]), false, 'true and false = false');
	equal(MathLib.and(false, true), false, 'false and true = false');
	equal(MathLib.and([false, true]), false, 'false and true = false');
	equal(MathLib.and(false, false), false, 'false and false = false');
	equal(MathLib.and([false, false]), false, 'false and false = false');
});
test('.arccos()', 8, function () {
	// Spec. 1: MathLib.arccos(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccos(NaN)), true, 'Spec. 1: MathLib.arccos(NaN) = NaN');

	// Spec. 2: MathLib.arccos(x) = NaN if x>1
	equal(MathLib.isNaN(MathLib.arccos(+Infinity)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');
	equal(MathLib.isNaN(MathLib.arccos(+2)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');

	// Spec. 3: MathLib.arccos(x) = NaN if x<-1
	equal(MathLib.isNaN(MathLib.arccos(-Infinity)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');
	equal(MathLib.isNaN(MathLib.arccos(-2)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');

	// Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x
	equal(MathLib.arccos(1), 0, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
	equal(MathLib.arccos(+0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
	equal(MathLib.arccos(-1), Math.PI, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
});
test('.arccot()', 6, function () {
	// Spec. 1: MathLib.arccot(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccot(NaN)), true, 'Spec. 1: MathLib.arccot(NaN) = NaN');

	// Spec. 2: MathLib.arccot(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arccot(+Infinity)), true, 'Spec. 2: MathLib.arccot(+∞) = +0');

	// Spec. 3: MathLib.arccot(-∞) = π
	equal(MathLib.arccot(-Infinity), Math.PI, 'Spec. 3: MathLib.arccot(-∞) = π');

	// Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x
	equal(MathLib.arccot(1), Math.PI / 4, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
	equal(MathLib.arccot(-0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
	equal(MathLib.arccot(+0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccot(x) = inverse cotangent of x');
});
test('.arccsc()', 9, function () {
	// Spec. 1: MathLib.arccsc(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccsc(NaN)), true, 'Spec. 1: MathLib.arccsc(NaN) = NaN');

	// Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)
	equal(MathLib.isNaN(MathLib.arccsc(+0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arccsc(-0)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arccsc(0.5)), true, 'Spec. 2: MathLib.arccsc(x) = NaN (if -1<x<1)');

	// Spec. 3: MathLib.arccsc(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arccsc(+Infinity)), true, 'Spec. 3: MathLib.arccsc(+∞) = +0');

	// Spec. 4: MathLib.arccsc(-∞) = -0
	equal(MathLib.isNegZero(MathLib.arccsc(-Infinity)), true, 'Spec. 4: MathLib.arccsc(-∞) = -0');

	// Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x
	equal(MathLib.arccsc(1), Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
	equal(MathLib.arccsc(-1), -Math.PI / 2, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
	equal(MathLib.arccsc(10), 0.1001674211615598, 'Spec. 5: otherwise MathLib.arccsc(x) = inverse cosecant of x');
});
test('.arcosh()', 9, function () {
	// Spec. 1: MathLib.arcosh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcosh(NaN)), true, 'Spec. 1: MathLib.arcosh(NaN) = NaN');

	// Spec. 2: MathLib.arcosh(+∞) = +∞
	equal(MathLib.arcosh(+Infinity), Infinity, 'Spec. 2: MathLib.arcosh(+∞) = +∞');

	// Spec. 3: MathLib.arcosh(-∞) = NaN
	equal(MathLib.isNaN(MathLib.arcosh(-Infinity)), true, 'Spec. 3: MathLib.arcosh(-∞) = NaN');

	// Spec. 4: MathLib.arcosh(x) = NaN if x < 1
	equal(MathLib.isNaN(MathLib.arcosh(-1)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');
	equal(MathLib.isNaN(MathLib.arcosh(-0)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');
	equal(MathLib.isNaN(MathLib.arcosh(+0)), true, 'Spec. 4: otherwise MathLib.arcosh(x) = NaN if x < 1');

	// Spec. 5: MathLib.arcosh(1) = +0
	equal(MathLib.isPosZero(MathLib.arcosh(1)), true, 'Spec. 5: otherwise MathLib.arcosh(1) = +0');

	// Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x
	equal(MathLib.arcosh(2), 1.3169578969248166, 'Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x');
	equal(MathLib.arcosh(10), 2.993222846126381, 'Spec. 6: otherwise MathLib.arcosh(x) = inverse hyperbolic cosine of x');
});
test('.arcoth()', 11, function () {
	// Spec. 1: MathLib.arcoth(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcoth(NaN)), true, 'Spec. 1: MathLib.arcoth(NaN) = NaN');

	// Spec. 2: MathLib.arcoth(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arcoth(Infinity)), true, 'Spec. 2: MathLib.arcoth(+∞) = +0');

	// Spec. 3: MathLib.arcoth(-∞) = -0
	equal(MathLib.isNegZero(MathLib.arcoth(-Infinity)), true, 'Spec. 3: MathLib.arcoth(-∞) = -0');

	// Spec. 4: MathLib.arcoth(1) = +∞
	equal(MathLib.arcoth(1), Infinity, 'Spec. 4: MathLib.arcoth(1) = +∞');

	// Spec. 5: MathLib.arcoth(-1) = -∞
	equal(MathLib.arcoth(-1), -Infinity, 'Spec. 5: MathLib.arcoth(-1) = -∞');

	// Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1
	equal(MathLib.isNaN(MathLib.arcoth(+0)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(-0)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(+0.5)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');
	equal(MathLib.isNaN(MathLib.arcoth(-0.5)), true, 'Spec. 6: MathLib.arcoth(x) = NaN if x > -1 and x < 1');

	// Spec. 7: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x
	equal(MathLib.arcoth(2), 0.5493061443340549, 'Spec. 9: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x');
	equal(MathLib.arcoth(10), 0.10033534773107562, 'Spec. 9: otherwise MathLib.arcoth(x) = inverse hyperbolic cotangent of x');
});
test('.arcsch()', 7, function () {
	// Spec. 1: MathLib.arcsch(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsch(NaN)), true, 'Spec. 1: MathLib.arcsch(NaN) = NaN');

	// Spec. 2: MathLib.arcsch(+0) = +∞
	equal(MathLib.arcsch(+0), +Infinity, 'Spec. 2: MathLib.arcsch(+0) = +∞');

	// Spec. 3: MathLib.arcsch(-0) = -∞
	equal(MathLib.arcsch(-0), -Infinity, 'Spec. 3: MathLib.arcsch(-0) = -∞');

	// Spec. 4: MathLib.arcsch(+∞) = +0
	equal(MathLib.isPosZero(MathLib.arcsch(+Infinity)), true, 'Spec. 4: MathLib.arcsch(+∞) = +0');

	// Spec. 5: MathLib.arcsch(-∞) = -0
	equal(MathLib.isNegZero(MathLib.arcsch(-Infinity)), true, 'Spec. 5: MathLib.arcsch(-∞) = -0');

	// Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x
	equal(MathLib.arcsch(1), 0.8813735870195429, 'Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x');
	equal(MathLib.arcsch(10), 0.09983407889920758, 'Spec. 6: otherwise MathLib.arcsch(x) = inverse hyperbolic cosecant of x');
});
test('.arcsec()', 9, function () {
	// Spec. 1: MathLib.arcsec(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsec(NaN)), true, 'Spec. 1: MathLib.arcsec(NaN) = NaN');

	// Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)
	equal(MathLib.isNaN(MathLib.arcsec(+0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arcsec(-0)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');
	equal(MathLib.isNaN(MathLib.arcsec(0.5)), true, 'Spec. 2: MathLib.arcsec(x) = NaN (if -1<x<1)');

	// Spec. 3: MathLib.arcsec(+∞) = π/2
	equal(MathLib.arcsec(+Infinity), Math.PI / 2, 'Spec. 3: MathLib.arcsec(+∞) = π/2');

	// Spec. 4: MathLib.arcsec(-∞) = π/2
	equal(MathLib.arcsec(-Infinity), Math.PI / 2, 'Spec. 4: MathLib.arcsec(-∞) = π/2');

	// Spec. 5: MathLib.arcsec(1) = +0
	equal(MathLib.isPosZero(MathLib.arcsec(1)), true, 'Spec. 5: otherwise MathLib.arcsec(1) = +0');

	// Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x
	equal(MathLib.arcsec(-1), Math.PI, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
	equal(MathLib.arcsec(10), 1.4706289056333368, 'Spec. 6: otherwise MathLib.arcsec(x) = inverse secant of x');
});
test('.arcsin()', 9, function () {
	// Spec. 1: MathLib.arcsin(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsin(NaN)), true, 'Spec. 1: MathLib.arcsin(NaN) = NaN');

	// Spec. 2: MathLib.arcsin(+0) = +0
	equal(MathLib.isPosZero(MathLib.arcsin(+0)), true, 'Spec. 2: MathLib.arcsin(+0) = +0');

	// Spec. 3: MathLib.arcsin(-0) = -0
	equal(MathLib.isNegZero(MathLib.arcsin(-0)), true, 'Spec. 3: MathLib.arcsin(-0) = -0');

	// Spec. 4: MathLib.arcsin(x) = NaN if x>1
	equal(MathLib.isNaN(MathLib.arcsin(+Infinity)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');
	equal(MathLib.isNaN(MathLib.arcsin(+2)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');

	// Spec. 5: MathLib.arcsin(x) = NaN if x<-1
	equal(MathLib.isNaN(MathLib.arcsin(-Infinity)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');
	equal(MathLib.isNaN(MathLib.arcsin(-2)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');

	// Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x
	equal(MathLib.arcsin(1), Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
	equal(MathLib.arcsin(-1), -Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
});
test('.arctan()', 7, function () {
	// Spec. 1: MathLib.arctan(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arctan(NaN)), true, 'Spec. 1: MathLib.arctan(NaN) = NaN');

	// Spec. 2: MathLib.arctan(+0) = +0
	equal(MathLib.isPosZero(MathLib.arctan(+0)), true, 'Spec. 2: MathLib.arctan(+0) = +0');

	// Spec. 3: MathLib.arctan(-0) = -0
	equal(MathLib.isNegZero(MathLib.arctan(-0)), true, 'Spec. 3: MathLib.arctan(-0) = -0');

	// Spec. 4: MathLib.arctan(+∞) = +π/2
	equal(MathLib.arctan(+Infinity), +Math.PI / 2, 'Spec. 4: MathLib.arctan(+∞) = +π/2');

	// Spec. 5: MathLib.arctan(-∞) = -π/2
	equal(MathLib.arctan(-Infinity), -Math.PI / 2, 'Spec. 5: MathLib.arctan(-∞) = -π/2');

	// Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x
	equal(MathLib.arctan(1), Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
	equal(MathLib.arctan(-1), -Math.PI / 4, 'Spec. 6: otherwise MathLib.arctan(x) = inverse tangent of x');
});
test('.arctan2()', 24, function () {
	// Spec. 1: arctan2(±0, -0) is ±π
	equal(MathLib.arctan2(+0, -0), Math.PI, 'Spec. 1: arctan2(±0, -0) is ±π');
	equal(MathLib.arctan2(-0, -0), -Math.PI, 'Spec. 1: arctan2(±0, -0) is ±π');

	// Spec. 2: arctan2(±0, +0) is ±0
	equal(MathLib.isPosZero(MathLib.arctan2(+0, 0)), true, 'Spec. 2: arctan2(±0, +0) is ±0');
	equal(MathLib.isNegZero(MathLib.arctan2(-0, 0)), true, 'Spec. 2: arctan2(±0, +0) is ±0');

	// Spec. 3: arctan2(±0, x) is ±π for x<0
	equal(MathLib.arctan2(+0, -4), Math.PI, 'Spec. 3: arctan2(±0, x) is ±π for x<0');
	equal(MathLib.arctan2(-0, -4), -Math.PI, 'Spec. 3: arctan2(±0, x) is ±π for x<0');

	// Spec. 4: arctan2(±0, x) is ±0 for x>0
	equal(MathLib.isPosZero(MathLib.arctan2(+0, 4)), true, 'Spec. 4: arctan2(±0, x) is ±0 for x>0');
	equal(MathLib.isNegZero(MathLib.arctan2(-0, 4)), true, 'Spec. 4: arctan2(±0, x) is ±0 for x>0');

	// Spec. 5: arctan2(y, ±0) is -π/2 for y < 0
	equal(MathLib.arctan2(-4, 0), -Math.PI / 2, 'Spec. 5: arctan2(y, ±0) is -π/2 for y < 0');
	equal(MathLib.arctan2(-4, -0), -Math.PI / 2, 'Spec. 5: arctan2(y, ±0) is -π/2 for y < 0');

	// Spec. 6: arctan2(y, ±0) is +π/2 for y > 0
	equal(MathLib.arctan2(4, 0), Math.PI / 2, 'Spec. 6: arctan2(y, ±0) is +π/2 for y > 0');
	equal(MathLib.arctan2(4, -0), Math.PI / 2, 'Spec. 6: arctan2(y, ±0) is +π/2 for y > 0');

	// Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0
	equal(MathLib.arctan2(4, -Infinity), Math.PI, 'Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0');
	equal(MathLib.arctan2(-4, -Infinity), -Math.PI, 'Spec. 7: arctan2(±y, -∞) is ±π for finite y > 0');

	// Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0
	equal(MathLib.isPosZero(MathLib.arctan2(4, Infinity)), true, 'Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0');
	equal(MathLib.isNegZero(MathLib.arctan2(-4, Infinity)), true, 'Spec. 8: arctan2(±y, +∞) is ±0 for finite y > 0');

	// Spec. 9: arctan2(±∞, x) is ±π/2 for finite x
	equal(MathLib.arctan2(Infinity, 4), Math.PI / 2, 'Spec. 9: arctan2(±∞, x) is ±π/2 for finite x');
	equal(MathLib.arctan2(-Infinity, 4), -Math.PI / 2, 'Spec. 9: arctan2(±∞, x) is ±π/2 for finite x');

	// Spec. 10: arctan2(±∞, -∞) is ±3π/4
	equal(MathLib.arctan2(Infinity, -Infinity), 3 / 4 * Math.PI, 'Spec. 10: arctan2(±∞, -∞) is ±3π/4');
	equal(MathLib.arctan2(-Infinity, -Infinity), -3 / 4 * Math.PI, 'Spec. 10: arctan2(±∞, -∞) is ±3π/4');

	// Spec. 11: arctan2(±∞, +∞) is ±π/4
	equal(MathLib.arctan2(Infinity, Infinity), Math.PI / 4, 'Spec. 11: arctan2(±∞, +∞) is ±π/4');
	equal(MathLib.arctan2(-Infinity, Infinity), -Math.PI / 4, 'Spec. 11: arctan2(±∞, +∞) is ±π/4');

	// Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)
	equal(MathLib.arctan2(1, 1), Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
	equal(MathLib.arctan2(-1, 1), -Math.PI / 4, 'Spec. 12: otherwise MathLib.arctan2(y, x) = -i ln((x+iy)/sqrt(x^2+y^2)');
});
test('.arithMean()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.arithMean(s), 26 / 5, 'Testing .arithMean() (set)');
});
test('.arsech()', 10, function () {
	// Spec. 1: MathLib.arsech(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arsech(NaN)), true, 'Spec. 1: MathLib.arsech(NaN) = NaN');

	// Spec. 2: MathLib.arsech(+0) = +Infinity
	equal(MathLib.arsech(+0), Infinity, 'Spec. 2: MathLib.arsech(+0) = +∞');

	// Spec. 3: MathLib.arsech(-0) = NaN
	equal(MathLib.isNaN(MathLib.arsech(-0)), true, 'Spec. 3: MathLib.arsech(-0) = NaN');

	// Spec. 4: MathLib.arsech(+∞) = NaN
	equal(MathLib.isNaN(MathLib.arsech(Infinity)), true, 'Spec. 4: MathLib.arsech(+∞) = NaN');

	// Spec. 5: MathLib.arsech(-∞) = NaN
	equal(MathLib.isNaN(MathLib.arsech(-Infinity)), true, 'Spec. 5: MathLib.arsech(-∞) = NaN');

	// Spec. 6: MathLib.arsech(1) = +0;
	equal(MathLib.isPosZero(MathLib.arsech(1)), true, 'Spec. 6: MathLib.arsech(1) = +0');

	// Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1
	equal(MathLib.isNaN(MathLib.arsech(+2)), true, 'Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1');
	equal(MathLib.isNaN(MathLib.arsech(-2)), true, 'Spec. 7: MathLib.arsech(x) = NaN if x < 0 or x > 1');

	// Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x
	equal(MathLib.arsech(0.5), 1.3169578969248166, 'Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x');
	equal(MathLib.arsech(0.75), 0.7953654612239056, 'Spec. 8: otherwise MathLib.arsech(x) = inverse hyperbolic secant of x');
});
test('.arsinh()', 7, function () {
	// Spec. 1: MathLib.arsinh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arsinh(NaN)), true, 'Spec. 1: MathLib.arsinh(NaN) = NaN');

	// Spec. 2: MathLib.arsinh(+0) = +0
	equal(MathLib.isPosZero(MathLib.arsinh(+0)), true, 'Spec. 2: MathLib.arsinh(+0) = +0');

	// Spec. 3: MathLib.arsinh(-0) = -0
	equal(MathLib.isNegZero(MathLib.arsinh(-0)), true, 'Spec. 3: MathLib.arsinh(-0) = -0');

	// Spec. 4: MathLib.arsinh(+∞) = +∞
	equal(MathLib.arsinh(+Infinity), +Infinity, 'Spec. 4: MathLib.arsinh(+∞) = +∞');

	// Spec. 5: MathLib.arsinh(-∞) = -∞
	equal(MathLib.arsinh(-Infinity), -Infinity, 'Spec. 5: MathLib.arsinh(-∞) = -∞');

	// Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x
	equal(MathLib.arsinh(1), 0.8813735870195429, 'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
	equal(MathLib.arsinh(10), 2.99822295029797, 'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
});
test('.artanh()', 11, function () {
	// Spec. 1: MathLib.artanh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.artanh(NaN)), true, 'Spec. 1: MathLib.artanh(NaN) = NaN');

	// Spec. 2: MathLib.artanh(+0) = +0
	equal(MathLib.isPosZero(MathLib.artanh(+0)), true, 'Spec. 2: MathLib.artanh(+0) = +0');

	// Spec. 3: MathLib.artanh(-0) = -0
	equal(MathLib.isNegZero(MathLib.artanh(-0)), true, 'Spec. 3: MathLib.artanh(-0) = -0');

	// Spec. 4: MathLib.artanh(+∞) = NaN
	equal(MathLib.isNaN(MathLib.artanh(Infinity)), true, 'Spec. 4: MathLib.artanh(+∞) = NaN');

	// Spec. 5: MathLib.artanh(-∞) = NaN
	equal(MathLib.isNaN(MathLib.artanh(-Infinity)), true, 'Spec. 5: MathLib.artanh(-∞) = NaN');

	// Spec. 6: MathLib.artanh(1) = +∞
	equal(MathLib.artanh(1), Infinity, 'Spec. 6: MathLib.artanh(1) = +∞');

	// Spec. 7: MathLib.artanh(-1) = -∞
	equal(MathLib.artanh(-1), -Infinity, 'Spec. 7: MathLib.artanh(-1) = -∞');

	// Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1
	equal(MathLib.isNaN(MathLib.artanh(+2)), true, 'Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1');
	equal(MathLib.isNaN(MathLib.artanh(-2)), true, 'Spec. 8: MathLib.artanh(x) = NaN if x < -1 or x > 1');

	// Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x
	equal(MathLib.artanh(0.5), 0.5493061443340549, 'Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x');
	equal(MathLib.artanh(0.75), 0.9729550745276566, 'Spec. 9: otherwise MathLib.artanh(x) = inverse hyperbolic tangent of x');
});
test('.binomial()', 52, function () {
	equal(MathLib.isNaN(MathLib.binomial(NaN, NaN)), true, 'binomial(NaN, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, Infinity)), true, 'binomial(NaN, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -Infinity)), true, 'binomial(NaN, -∞)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, 0)), true, 'binomial(NaN, 0)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -0)), true, 'binomial(NaN, -0)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, 1)), true, 'binomial(NaN, 1)');
	equal(MathLib.isNaN(MathLib.binomial(NaN, -1)), true, 'binomial(NaN, -1)');


	equal(MathLib.isNaN(MathLib.binomial(Infinity, NaN)), true, 'binomial(∞, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(Infinity, Infinity)), true, 'binomial(∞, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(Infinity, -Infinity)), true, 'binomial(∞, -∞)');
	equal(MathLib.binomial(Infinity, 0), 1, 'binomial(∞, 0)');
	equal(MathLib.binomial(Infinity, -0), 1, 'binomial(∞, -0)');
	equal(MathLib.binomial(Infinity, 1), Infinity, 'binomial(∞, 1)');
	equal(MathLib.isPosZero(MathLib.binomial(Infinity, -1)), true, 'binomial(∞, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-Infinity, NaN)), true, 'binomial(-∞, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-Infinity, Infinity)), true, 'binomial(-∞, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-Infinity, -Infinity)), true, 'binomial(-∞, -∞)');
	equal(MathLib.binomial(-Infinity, 0), 1, 'binomial(-∞, 0)');
	equal(MathLib.binomial(-Infinity, -0), 1, 'binomial(-∞, -0)');
	equal(MathLib.binomial(-Infinity, 1), -Infinity, 'binomial(-∞, 1)');
	equal(MathLib.isPosZero(MathLib.binomial(-Infinity, -1)), true, 'binomial(-∞, -1)');


	equal(MathLib.isNaN(MathLib.binomial(0, NaN)), true, 'binomial(0, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(0, Infinity)), true, 'binomial(0, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(0, -Infinity)), true, 'binomial(0, -∞)');
	equal(MathLib.binomial(0, 0), 1, 'binomial(0, 0)');
	equal(MathLib.binomial(0, -0), 1, 'binomial(0, -0)');
	equal(MathLib.binomial(0, 1), 0, 'binomial(0, 1)');
	equal(MathLib.binomial(0, -1), 0, 'binomial(0, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-0, NaN)), true, 'binomial(-0, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-0, Infinity)), true, 'binomial(-0, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-0, -Infinity)), true, 'binomial(-0, -∞)');
	equal(MathLib.binomial(-0, 0), 1, 'binomial(-0, 0)');
	equal(MathLib.binomial(-0, -0), 1, 'binomial(-0, -0)');
	equal(MathLib.binomial(-0, 1), 0, 'binomial(-0, 1)');
	equal(MathLib.binomial(-0, -1), 0, 'binomial(-0, -1)');


	equal(MathLib.isNaN(MathLib.binomial(1, NaN)), true, 'binomial(1, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(1, Infinity)), true, 'binomial(1, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(1, -Infinity)), true, 'binomial(1, -∞)');
	equal(MathLib.binomial(1, 0), 1, 'binomial(1, 0)');
	equal(MathLib.binomial(1, -0), 1, 'binomial(1, -0)');
	equal(MathLib.binomial(1, 1), 1, 'binomial(1, 1)');
	equal(MathLib.binomial(1, -1), 0, 'binomial(1, -1)');


	equal(MathLib.isNaN(MathLib.binomial(-1, NaN)), true, 'binomial(-1, NaN)');
	equal(MathLib.isNaN(MathLib.binomial(-1, Infinity)), true, 'binomial(-1, ∞)');
	equal(MathLib.isNaN(MathLib.binomial(-1, -Infinity)), true, 'binomial(-1, -∞)');
	equal(MathLib.binomial(-1, 0), 1, 'binomial(-1, 0)');
	equal(MathLib.binomial(-1, -0), 1, 'binomial(-1, -0)');
	equal(MathLib.binomial(-1, 1), -1, 'binomial(-1, 1)');
	equal(MathLib.binomial(-1, -1), 1, 'binomial(-1, -1)');


	equal(MathLib.binomial(6, 3), 20);
	equal(MathLib.binomial(2, 4), 0);
	equal(MathLib.binomial(-4, 3), -20);
});
test('.cbrt()', 7, function () {
	// Spec. 1: MathLib.cbrt(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cbrt(NaN)), true, 'Spec. 1: MathLib.cbrt(NaN) = NaN');

	// Spec. 2: MathLib.cbrt(+0) = +0
	equal(MathLib.isPosZero(MathLib.cbrt(+0)), true, 'Spec. 2: MathLib.cbrt(+0) = +0');

	// Spec. 3: MathLib.cbrt(-0) = -0
	equal(MathLib.isNegZero(MathLib.cbrt(-0)), true, 'Spec. 3: MathLib.cbrt(-0) = -0');

	// Spec. 4: MathLib.cbrt(+∞) = +∞
	equal(MathLib.cbrt(+Infinity), +Infinity, 'Spec. 4: MathLib.cbrt(+∞) = +∞');

	// Spec. 5: MathLib.cbrt(-∞) = -∞
	equal(MathLib.cbrt(-Infinity), -Infinity, 'Spec. 5: MathLib.cbrt(-∞) = -∞');

	// Spec. 6: otherwise MathLib.cbrt(x) = cube root of x
	equal(MathLib.cbrt(8), 2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
	equal(MathLib.cbrt(-8), -2, 'Spec. 6: otherwise MathLib.cbrt(x) = cube root of x');
});
test('.ceil()', 7, function () {
	// Spec. 1: MathLib.ceil(NaN) = NaN
	equal(MathLib.isNaN(MathLib.ceil(NaN)), true, 'Spec. 1: MathLib.ceil(NaN) = NaN');

	// Spec. 2: MathLib.ceil(+0) = +0
	equal(MathLib.isPosZero(MathLib.ceil(+0)), true, 'Spec. 2: MathLib.ceil(+0) = +0');

	// Spec. 3: MathLib.ceil(-0) = -0
	equal(MathLib.isNegZero(MathLib.ceil(-0)), true, 'Spec. 3: MathLib.ceil(-0) = -0');

	// Spec. 4: MathLib.ceil(+∞) = +∞
	equal(MathLib.ceil(+Infinity), +Infinity, 'Spec. 4: MathLib.ceil(+∞) = +∞');

	// Spec. 5: MathLib.ceil(-∞) = -∞
	equal(MathLib.ceil(-Infinity), -Infinity, 'Spec. 5: MathLib.ceil(-∞) = -∞');

	// Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤
	equal(MathLib.ceil(2.2), 3, 'Spec. 6: otherwise MathLib.ceil(x) =  ⎡x⎤');
	equal(MathLib.ceil(-2.2), -2, 'Spec. 6: otherwise MathLib.ceil(x) = ⎡x⎤');
});
test('.cos()', 6, function () {
	// Spec. 1: MathLib.cos(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cos(NaN)), true, 'Spec. 1: MathLib.cos(NaN) = NaN');

	// Spec. 2: MathLib.cos(+∞) = NaN
	equal(MathLib.isNaN(MathLib.cos(+Infinity)), true, 'Spec. 2: MathLib.cos(+∞) = NaN');

	// Spec. 3: MathLib.cos(-∞) = NaN
	equal(MathLib.isNaN(MathLib.cos(-Infinity)), true, 'Spec. 3: MathLib.cos(-∞) = NaN');

	// Spec. 4: otherwise MathLib.cos(x) = cosine of x
	equal(MathLib.cos(+0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
	equal(MathLib.cos(-0), 1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
	equal(MathLib.cos(Math.PI), -1, 'Spec. 4: otherwise MathLib.cos(x) = cosine of x');
});
test('.cosh()', 6, function () {
	// Spec. 1: MathLib.cosh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cosh(NaN)), true, 'Spec. 1: MathLib.cosh(NaN) = NaN');

	// Spec. 2: MathLib.cosh(+∞) = +∞
	equal(MathLib.cosh(+Infinity), +Infinity, 'Spec. 2: MathLib.cosh(+∞) = +∞');

	// Spec. 3: MathLib.cosh(-∞) = +∞
	equal(MathLib.cosh(-Infinity), +Infinity, 'Spec. 3: MathLib.cosh(-∞) = +∞');

	// Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x
	equal(MathLib.cosh(+0), 1, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
	equal(MathLib.cosh(-0), 1, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
	equal(MathLib.isEqual(MathLib.cosh(1), 1.5430806348152437), true, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
});
test('.cot()', 7, function () {
	// Spec. 1: MathLib.cot(NaN) = NaN
	equal(MathLib.isNaN(MathLib.cot(NaN)), true, 'Spec. 1: MathLib.cot(NaN) = NaN');

	// Spec. 2: MathLib.cot(+0) = +∞
	equal(MathLib.cot(+0), Infinity, 'Spec. 2: MathLib.cot(+0) = +∞');

	// Spec. 3: MathLib.cot(-0) = -∞
	equal(MathLib.cot(-0), -Infinity, 'Spec. 3: MathLib.cot(-0) = -∞');

	// Spec. 4: MathLib.cot(+∞) = NaN
	equal(MathLib.isNaN(MathLib.cot(+Infinity)), true, 'Spec. 4: MathLib.cot(+∞) = NaN');

	// Spec. 5: MathLib.cot(-∞) = NaN
	equal(MathLib.isNaN(MathLib.cot(-Infinity)), true, 'Spec. 5: MathLib.cot(-∞) = NaN');

	// Spec. 6: otherwise MathLib.cot(x) = cotangent of x
	equal(MathLib.cot(Math.PI / 3), 1 / Math.sqrt(3), 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
	equal(MathLib.cot(Math.PI / 2), 0, 'Spec. 6: otherwise MathLib.cot(x) = cotangent of x');
});
test('.coth()', 7, function () {
	// Spec. 1: MathLib.coth(NaN) = NaN
	equal(MathLib.isNaN(MathLib.coth(NaN)), true, 'Spec. 1: MathLib.coth(NaN) = NaN');

	// Spec. 2: MathLib.coth(+0) = +∞
	equal(MathLib.coth(+0), Infinity, 'Spec. 2: MathLib.coth(+0) = +∞');

	// Spec. 3: MathLib.coth(-0) = -∞
	equal(MathLib.coth(-0), -Infinity, 'Spec. 3: MathLib.coth(-0) = -∞');

	// Spec. 4: MathLib.coth(+∞) = 1
	equal(MathLib.coth(+Infinity), 1, 'Spec. 4: MathLib.coth(+∞) = 1');

	// Spec. 5: MathLib.coth(-∞) = -1
	equal(MathLib.coth(-Infinity), -1, 'Spec. 5: MathLib.coth(-∞) = -1');

	// Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x
	equal(MathLib.coth(1), 1.3130352854993313, 'Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x');
	equal(MathLib.coth(10), 1.0000000041223073, 'Spec. 6: otherwise MathLib.coth(x) = hyperbolic cotangent of x');
});
test('.csc()', 7, function () {
	// Spec. 1: MathLib.csc(NaN) = NaN
	equal(MathLib.isNaN(MathLib.csc(NaN)), true, 'Spec. 1: MathLib.csc(NaN) = NaN');

	// Spec. 2: MathLib.csc(+0) = +∞
	equal(MathLib.csc(+0), +Infinity, 'Spec. 2: MathLib.csc(+0) = +∞');

	// Spec. 3: MathLib.csc(-0) = -∞
	equal(MathLib.csc(-0), -Infinity, 'Spec. 3: MathLib.csc(-0) = -∞');

	// Spec. 4: MathLib.csc(+∞) = NaN
	equal(MathLib.isNaN(MathLib.csc(+Infinity)), true, 'Spec. 4: MathLib.csc(+∞) = NaN');

	// Spec. 5: MathLib.csc(-∞) = NaN
	equal(MathLib.isNaN(MathLib.csc(-Infinity)), true, 'Spec. 5: MathLib.csc(-∞) = NaN');

	// Spec. 6: otherwise MathLib.csc(x) = cosecant of x
	equal(MathLib.csc(Math.PI / 2), 1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
	equal(MathLib.csc(-Math.PI / 2), -1, 'Spec. 6: otherwise MathLib.csc(x) = cosecant of x');
});
test('.csch()', 7, function () {
	// Spec. 1: MathLib.csch(NaN) = NaN
	equal(MathLib.isNaN(MathLib.csch(NaN)), true, 'Spec. 1: MathLib.csch(NaN) = NaN');

	// Spec. 2: MathLib.csch(+0) = +∞
	equal(MathLib.csch(+0), +Infinity, 'Spec. 2: MathLib.csch(+0) = +∞');

	// Spec. 3: MathLib.csch(-0) = -∞
	equal(MathLib.csch(-0), -Infinity, 'Spec. 3: MathLib.csch(-0) = -∞');

	// Spec. 4: MathLib.csch(+∞) = +0
	equal(MathLib.isPosZero(MathLib.csch(+Infinity)), true, 'Spec. 4: MathLib.csch(+∞) = +0');

	// Spec. 5: MathLib.csch(-∞) = -0
	equal(MathLib.isNegZero(MathLib.csch(-Infinity)), true, 'Spec. 5: MathLib.csch(-∞) = -0');

	// Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x
	ok(MathLib.isEqual(MathLib.csch(1), 0.8509181282393216), 'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
	ok(MathLib.isEqual(MathLib.csch(10), 0.00009079985971212217), 'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
});
test('.degToRad()', 7, function () {
	// Spec. 1: MathLib.degToRad(NaN) = NaN
	equal(MathLib.isNaN(MathLib.degToRad(NaN)), true, 'Spec. 1: MathLib.degToRad(NaN) = NaN');

	// Spec. 2: MathLib.degToRad(+0) = +0
	equal(MathLib.isPosZero(MathLib.degToRad(+0)), true, 'Spec. 2: MathLib.degToRad(+0) = +0');

	// Spec. 3: MathLib.degToRad(-0) = -0
	equal(MathLib.isNegZero(MathLib.degToRad(-0)), true, 'Spec. 3: MathLib.degToRad(-0) = -0');

	// Spec. 4: MathLib.degToRad(+∞) = +∞
	equal(MathLib.degToRad(+Infinity), Infinity, 'Spec. 4: MathLib.degToRad(+∞) = +∞');

	// Spec. 5: MathLib.degToRad(-∞) = -∞
	equal(MathLib.degToRad(-Infinity), -Infinity, 'Spec. 5: MathLib.degToRad(-∞) = -∞');

	// Spec. 6: otherwise MathLib.degToRad(x) = x * π/180
	equal(MathLib.degToRad(90), Math.PI / 2, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
	equal(MathLib.degToRad(180), Math.PI, 'Spec. 6: otherwise MathLib.degToRad(x) = x * π/180');
});
test('.diff()', 4, function () {
	ok(Math.abs(MathLib.cos.diff(0) - 0) < 1e-10, 'cos’(0) = 0');
	ok(Math.abs(MathLib.sin.diff(0) - 1) < 1e-10, 'sin’(0) = 1');
	ok(Math.abs(MathLib.exp.diff(0) - 1) < 1e-10, 'exp’(0) = 1');
	ok(Math.abs(MathLib.exp.diff(1) - Math.E) < 1e-10, 'exp’(1) = e');
});
test('.exp()', 6, function () {
	// Spec. 1: MathLib.exp(NaN) = NaN
	equal(MathLib.isNaN(MathLib.exp(NaN)), true, 'Spec. 1: MathLib.exp(NaN) = NaN');

	// Spec. 2: MathLib.exp(+∞) = +∞
	equal(MathLib.exp(+Infinity), +Infinity, 'Spec. 2: MathLib.exp(+∞) = +∞');

	// Spec. 3: MathLib.exp(-∞) = +0
	equal(MathLib.isPosZero(MathLib.exp(-Infinity)), true, 'Spec. 3: MathLib.exp(-∞) = 0');

	// Spec. 4: otherwise MathLib.exp(x) = e^x
	equal(MathLib.exp(+0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
	equal(MathLib.exp(-0), 1, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
	equal(MathLib.isEqual(MathLib.exp(1), Math.E), true, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
});
test('.factor()', 2, function () {
	deepEqual(MathLib.factor(12), new MathLib.Set([2, 2, 3], true));
	deepEqual(MathLib.factor(-15), new MathLib.Set([3, 5], true));
});
test('.factorial()', 10, function () {
	// Spec. 1: MathLib.factorial(NaN) = NaN
	equal(MathLib.isNaN(MathLib.factorial(NaN)), true, 'Spec. 1: MathLib.factorial(NaN) = NaN');

	// Spec. 2: MathLib.factorial(+∞) = +∞
	equal(MathLib.factorial(+Infinity), Infinity, 'Spec. 2: MathLib.factorial(+∞) = +∞');

	// Spec. 3: MathLib.factorial(-∞) = NaN
	equal(MathLib.isNaN(MathLib.factorial(-Infinity)), true, 'Spec. 3: MathLib.factorial(-∞) = NaN');

	// Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer
	equal(MathLib.isNaN(MathLib.factorial(-1)), true, 'Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer');
	equal(MathLib.isNaN(MathLib.factorial(1.5)), true, 'Spec. 4: MathLib.factorial(n) = NaN if n<0 or n not an integer');

	// Spec. 5: MathLib.factorial(n) = ∞ if n is an integer greater 170
	equal(MathLib.factorial(171), Infinity, 'Spec. 5: MathLib.factorial(n) = ∞ if n is an integer greater 170');

	// Spec. 6: MathLib.factorial(n) = n!
	equal(MathLib.factorial(+0), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(-0), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(1), 1, 'Spec. 6: MathLib.factorial(n) = n!');
	equal(MathLib.factorial(6), 720, 'Spec. 6: MathLib.factorial(n) = n!');
});
test('.fallingFactorial()', 4, function () {
	equal(MathLib.fallingFactorial(2, 0), 1);
	equal(MathLib.fallingFactorial(6, 3), 120);
	equal(MathLib.fallingFactorial(2, 4), 0);
	equal(MathLib.fallingFactorial(4, 3, 0.5), 4 * 3.5 * 3);
});
test('.fibonacci()', 1, function () {
	equal(MathLib.fibonacci(4), 3, 'Is the fourth fibonacci number 3?');
});
test('.floor()', 7, function () {
	// Spec. 1: MathLib.floor(NaN) = NaN
	equal(MathLib.isNaN(MathLib.floor(NaN)), true, 'Spec. 1: MathLib.floor(NaN) = NaN');

	// Spec. 2: MathLib.floor(+0) = +0
	equal(MathLib.isPosZero(MathLib.floor(+0)), true, 'Spec. 2: MathLib.floor(+0) = +0');

	// Spec. 3: MathLib.floor(-0) = -0
	equal(MathLib.isNegZero(MathLib.floor(-0)), true, 'Spec. 3: MathLib.floor(-0) = -0');

	// Spec. 4: MathLib.floor(+∞) = +∞
	equal(MathLib.floor(+Infinity), +Infinity, 'Spec. 4: MathLib.floor(+∞) = +∞');

	// Spec. 5: MathLib.floor(-∞) = -∞
	equal(MathLib.floor(-Infinity), -Infinity, 'Spec. 5: MathLib.floor(-∞) = -∞');

	// Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦
	equal(MathLib.floor(2.2), 2, 'Spec. 6: otherwise MathLib.floor(x) =  ⎣x⎦');
	equal(MathLib.floor(-2.2), -3, 'Spec. 6: otherwise MathLib.floor(x) = ⎣x⎦');
});
test('.gcd()', 8, function () {
	equal(MathLib.gcd(), 0, 'The empty gcd is zero.');
	equal(MathLib.gcd([]), 0, 'The empty gcd is zero.');
	equal(MathLib.gcd(7), 7);
	equal(MathLib.gcd([7]), 7);
	equal(MathLib.gcd(8, 12), 4);
	equal(MathLib.gcd([8, 12]), 4);
	equal(MathLib.gcd(1, 2, 3), 1);
	equal(MathLib.gcd([1, 2, 3]), 1);
});
test('.geoMean()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.geoMean(s), Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
});
test('.harmonicMean()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.harmonicMean(s), 3.7894736842105265, 'Testing .harmonicMean() (set)');
});
test('.hypot()', 16, function () {
	// Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite
	equal(MathLib.hypot(+Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(NaN, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(-Infinity, NaN), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(NaN, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(+Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(2, +Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(-Infinity, 2), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');
	equal(MathLib.hypot(2, -Infinity), Infinity, 'Spec. 1: MathLib.hypot(x, y, ...) = +∞ if any argument is infinite');

	// Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite
	equal(MathLib.isNaN(MathLib.hypot(NaN, 2)), true, 'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');
	equal(MathLib.isNaN(MathLib.hypot(2, NaN)), true, 'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');

	// Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0
	equal(MathLib.isPosZero(MathLib.hypot(0, 0)), true, 'Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');
	equal(MathLib.isPosZero(MathLib.hypot(-0, -0)), true, 'Spec. 3:MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');


	// Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments
	equal(MathLib.isEqual(MathLib.hypot(3), 3), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(-3), 3), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true, 'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
});
test('.hypot2()', 6, function () {
	equal(MathLib.isEqual(MathLib.hypot2(3, 4), 25), true);
	equal(MathLib.isEqual(MathLib.hypot2(3, 4, 12), 169), true);
	deepEqual(MathLib.hypot2(NaN, 4), NaN);
	equal(MathLib.hypot2(NaN, Infinity), Infinity);
	equal(MathLib.hypot2(-Infinity, NaN), Infinity);
	equal(MathLib.hypot2(Infinity, 4), Infinity);
});
test('.inverse()', 2, function () {
	equal(MathLib.inverse(2), 0.5, 'MathLib.inverse(2) should be 0.5');
	equal(MathLib.isNaN(MathLib.inverse(NaN)), true, 'MathLib.inverse(NaN) should be NaN');
});
test('.isEqual()', 10, function () {
	equal(MathLib.isEqual(), true);
	equal(MathLib.isEqual([]), true);
	equal(MathLib.isEqual(1), true);
	equal(MathLib.isEqual([1]), true);
	equal(MathLib.isEqual(1, 1), true);
	equal(MathLib.isEqual([1, 1]), true);
	equal(MathLib.isEqual(1, 2), false);
	equal(MathLib.isEqual([1, 2]), false);
	equal(MathLib.isEqual(new MathLib.Complex(1, 2), new MathLib.Complex(1, 2)), true);
	equal(MathLib.isEqual(new MathLib.Complex(1, 2), new MathLib.Complex(1, 3)), false);
});
test('.isFinite()', 4, function () {
	equal(MathLib.isFinite(2), true);
	equal(MathLib.isFinite(NaN), false);
	equal(MathLib.isFinite(+Infinity), false);
	equal(MathLib.isFinite(-Infinity), false);
});
test('.isInt()', 2, function () {
	equal(MathLib.isInt(2), true);
	equal(MathLib.isInt(2.5), false);
});
// Static methods
// TODO: test if the result is right
test('.isMathMLSupported()', 1, function () {
	var supp = MathLib.isMathMLSupported();
	equal(typeof supp, 'boolean', '.isMathMLSupported()');
});
test('.isNaN()', 2, function () {
	equal(MathLib.isNaN(NaN), true);
	equal(MathLib.isNaN(2), false);
});
test('.isNegZero()', 2, function () {
	equal(MathLib.isNegZero(-0), true);
	equal(MathLib.isNegZero(+0), false);
});
test('.isOne()', 2, function () {
	equal(MathLib.isOne(1), true);
	equal(MathLib.isOne(2), false);
});
test('.isPosZero()', 2, function () {
	equal(MathLib.isPosZero(+0), true);
	equal(MathLib.isPosZero(-0), false);
});
test('.isPrime()', 2, function () {
	equal(MathLib.isPrime(4567), true);
	equal(MathLib.isPrime(112), false);
});
test('.isZero()', 2, function () {
	equal(MathLib.isZero(0), true);
	equal(MathLib.isZero(1), false);
});
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
test('.ln()', 8, function () {
	equal(MathLib.ln(1), 0, 'MathLib.ln(1) should be 0');
	equal(MathLib.ln(Math.E), 1, 'MathLib.ln(Math.E) should be 1');
	equal(MathLib.ln(+Infinity), +Infinity, 'MathLib.ln(+Infinity) should be +Infinity');
	equal(MathLib.ln(+0), -Infinity, 'MathLib.ln(+0) should be -Infinity');
	equal(MathLib.ln(-0), -Infinity, 'MathLib.ln(-0) should be -Infinity');
	equal(MathLib.isNaN(MathLib.ln(-4)), true, 'MathLib.ln(-4) should be NaN');
	equal(MathLib.isNaN(MathLib.ln(-Infinity)), true, 'MathLib.ln(-Infinity) should be NaN');
	equal(MathLib.isNaN(MathLib.ln(NaN)), true, 'MathLib.ln(NaN) should be NaN');
});
test('.max()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.max([1, 42, 17, 4]), 42);
	equal(MathLib.max(1, 42, 17, 4), 42);
	equal(MathLib.max(s), 9, 'Testing .max() (set)');
});
test('.min()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(MathLib.min([1, 42, 17, 4]), 1);
	equal(MathLib.min(1, 42, 17, 4), 1);
	equal(MathLib.min(s), 2, 'Testing .min() (set)');
});
test('.not()', 2, function () {
	equal(MathLib.not(true), false, 'not true = false');
	equal(MathLib.not(false), true, 'not false = true');
});
test('.or()', 14, function () {
	equal(MathLib.or(), false);
	equal(MathLib.or([]), false);
	equal(MathLib.or(true), true);
	equal(MathLib.or([true]), true);
	equal(MathLib.or(false), false);
	equal(MathLib.or([false]), false);
	equal(MathLib.or(true, true), true, 'true or true = true');
	equal(MathLib.or([true, true]), true, 'true or true = true');
	equal(MathLib.or(true, false), true, 'true or false = true');
	equal(MathLib.or([true, false]), true, 'true or false = true');
	equal(MathLib.or(false, true), true, 'false or true = true');
	equal(MathLib.or([false, true]), true, 'false or true = true');
	equal(MathLib.or(false, false), false, 'false or false = false');
	equal(MathLib.or([false, false]), false, 'false or false = false');
});
test('.plus()', 5, function () {
	equal(MathLib.plus(), 0, 'The empty sum is zero.');
	equal(MathLib.plus([]), 0, 'The empty sum is zero.');
	equal(MathLib.plus(1, 2), 3);
	equal(MathLib.plus([1, 2]), 3);
	deepEqual(MathLib.plus(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)),
		new MathLib.Matrix([[2, 0, 0], [0, 2, 0], [0, 0, 2]]));
});
test('pow()', 65, function () {
	// Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)
	equal(MathLib.pow(1, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(0, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-0, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(NaN, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(1, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(0, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-0, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(NaN, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');
	equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 1: MathLib.pow (x, ±0) = 1 (for any x, even a zero, NaN, or ±∞)');

	// Spec. 2: MathLib.pow (±0, y) = ±∞ (for y an odd integer < 0)
	equal(MathLib.pow(+0, -5), +Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (for y an odd integer < 0)');
	equal(MathLib.pow(-0, -5), -Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (for y an odd integer < 0)');

	// Spec. 3: MathLib.pow(±0, -∞) = +∞
	equal(MathLib.pow(+0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(±0, -∞) = +∞');
	equal(MathLib.pow(-0, -Infinity), Infinity, 'Spec. 3: MathLib.pow(±0, -∞) = +∞');

	// Spec. 4: MathLib.pow(±0, +∞) = +0
	equal(MathLib.isPosZero(MathLib.pow(+0, Infinity)), true, 'Spec. 4: MathLib.pow(±0, +∞) = +0');
	equal(MathLib.isPosZero(MathLib.pow(-0, Infinity)), true, 'Spec. 4: MathLib.pow(±0, +∞) = +0');

	// Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)
	equal(MathLib.pow(+0, -4), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(-0, -4), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(+0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');
	equal(MathLib.pow(-0, -5.5), +Infinity, 'Spec. 5: MathLib.pow (±0, y) = +∞ (for finite y < 0 and not an odd integer)');

	// Spec. 6: MathLib.pow (±0, y) = ±0 (for finite y > 0 an odd integer)
	equal(MathLib.isPosZero(MathLib.pow(+0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for finite y > 0 an odd integer)');
	equal(MathLib.isNegZero(MathLib.pow(-0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for finite y > 0 an odd integer)');

	// Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)
	equal(MathLib.isPosZero(MathLib.pow(+0, 4)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(-0, 4)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(+0, 5.5)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');
	equal(MathLib.isPosZero(MathLib.pow(-0, 5.5)), true, 'Spec. 7: MathLib.pow (±0, y) = +0 (for finite y > 0 and not an odd integer)');

	// Spec. 8: MathLib.pow(-1, ±∞) = 1
	equal(MathLib.pow(-1, +Infinity), 1, 'Spec. 8: MathLib.pow(-1, ±∞) = 1');
	equal(MathLib.pow(-1, -Infinity), 1, 'Spec. 8: MathLib.pow(-1, ±∞) = 1');

	// Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)
	equal(MathLib.pow(1, 2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, -2), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, +Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, -Infinity), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');
	equal(MathLib.pow(1, NaN), 1, 'Spec. 9: MathLib.pow(+1, y) = 1 (for any y, even ±∞ and NaN)');

	// Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)
	equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');
	equal(MathLib.isNaN(MathLib.pow(-2, 2.5)), true, 'Spec. 10: MathLib.pow (x, y) = NaN (for finite x < 0 and finite non-integer y.)');

	// Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)
	equal(MathLib.pow(3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)');
	equal(MathLib.pow(-3, Infinity), Infinity, 'Spec. 11: MathLib.pow(x, +∞) = +∞ (for |x| > 1)');

	// Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)
	equal(MathLib.isPosZero(MathLib.pow(3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)');
	equal(MathLib.isPosZero(MathLib.pow(-3, -Infinity)), true, 'Spec. 12: MathLib.pow(x, -∞) = +0 (for |x| > 1)');

	// Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)
	equal(MathLib.isPosZero(MathLib.pow(0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)');
	equal(MathLib.isPosZero(MathLib.pow(-0.5, +Infinity)), true, 'Spec. 13: MathLib.pow(x, +∞) = +0 (for |x| < 1)');

	// Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)
	equal(MathLib.pow(0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)');
	equal(MathLib.pow(-0.5, -Infinity), Infinity, 'Spec. 14: MathLib.pow(x, -∞) = +∞ (for |x| < 1)');

	// Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)
	equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)');
	equal(MathLib.pow(+Infinity, 2), Infinity, 'Spec. 15: MathLib.pow(+∞, y) = +∞ (for y > 0)');
 
	// Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)
	equal(MathLib.isPosZero(MathLib.pow(+Infinity, -2)), true, 'Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)');
	equal(MathLib.isPosZero(MathLib.pow(+Infinity, -Infinity)), true, 'Spec. 16: MathLib.pow(+∞, y) = +0 (for y < 0)');
	
	// Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)
	equal(MathLib.pow(-Infinity, 2), Infinity, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, +0), 1, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, -0), 1, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, Infinity), Infinity, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');
	equal(MathLib.pow(-Infinity, -Infinity), 0, 'Spec. 17: MathLib.pow(-∞, y) = MathLib.pow(-0, -y)');

	// Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)
	equal(MathLib.isNaN(MathLib.pow(NaN, 1)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, -Infinity)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');
	equal(MathLib.isNaN(MathLib.pow(NaN, NaN)), true, 'Spec. 18: MathLib.pow(NaN, y) = NaN (for all y except ±0)');

	// Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)
	equal(MathLib.isNaN(MathLib.pow(2, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(-Infinity, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');
	equal(MathLib.isNaN(MathLib.pow(-0, NaN)), true, 'Spec. 19: MathLib.pow(x, NaN) = NaN (for all x except +1)');

	// Spec. 20: otherwise MathLib.pow(x, n) = x^n
	equal(MathLib.pow(2, 3), 8, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
	equal(MathLib.pow(2, -3), 0.125, 'Spec. 20: otherwise MathLib.pow(x, n) = x^n');
});
test('.quad()', 2, function () {
	ok(Math.abs(MathLib.sin.quad(0, 2 * Math.PI)) < 1e-15, 'integrate sin from 0 to 2*pi');
	ok(Math.abs(MathLib.exp.quad(0, 1) - Math.E + 1) < 1e-7, 'integrate exp from 0 to 1');
});
test('.radToDeg()', 7, function () {
	// Spec. 1: MathLib.radToDeg(NaN) = NaN
	equal(MathLib.isNaN(MathLib.radToDeg(NaN)), true, 'Spec. 1: MathLib.radToDeg(NaN) = NaN');

	// Spec. 2: MathLib.radToDeg(+0) = +0
	equal(MathLib.isPosZero(MathLib.radToDeg(+0)), true, 'Spec. 2: MathLib.radToDeg(+0) = +0');

	// Spec. 3: MathLib.radToDeg(-0) = -0
	equal(MathLib.isNegZero(MathLib.radToDeg(-0)), true, 'Spec. 3: MathLib.radToDeg(-0) = -0');

	// Spec. 4: MathLib.radToDeg(+∞) = +∞
	equal(MathLib.radToDeg(+Infinity), Infinity, 'Spec. 4: MathLib.radToDeg(+∞) = +∞');

	// Spec. 5: MathLib.radToDeg(-∞) = -∞
	equal(MathLib.radToDeg(-Infinity), -Infinity, 'Spec. 5: MathLib.radToDeg(-∞) = -∞');

	// Spec. 6: otherwise MathLib.radToDeg(x) = x * 180/π
	equal(MathLib.radToDeg(Math.PI / 2), 90, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
	equal(MathLib.radToDeg(Math.PI), 180, 'Spec. 6: otherwise MathLib.radToDeg(x) = x * π/180');
});
test('.risingFactorial()', 3, function () {
	equal(MathLib.risingFactorial(2, 0), 1);
	equal(MathLib.risingFactorial(2, 3), 24);
	equal(MathLib.risingFactorial(3, 4, 0.5), 189);
});
test('.round()', 10, function () {
	// Spec. 1: MathLib.round(NaN) = NaN
	equal(MathLib.isNaN(MathLib.round(NaN)), true, 'Spec. 1: MathLib.round(NaN) = NaN');

	// Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5
	equal(MathLib.isPosZero(MathLib.round(+0)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');
	equal(MathLib.isPosZero(MathLib.round(+0.2)), true, 'Spec. 2: MathLib.round(x) = +0 if +0 ≤ x < 0.5');


	// Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0
	equal(MathLib.isNegZero(MathLib.round(-0)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');
	equal(MathLib.isNegZero(MathLib.round(-0.5)), true, 'Spec. 3: MathLib.round(x) = -0 if -0.5 ≤ x ≤ -0');

	// Spec. 4: MathLib.round(+∞) = +∞
	equal(MathLib.round(+Infinity), +Infinity, 'Spec. 4: MathLib.round(+∞) = +∞');

	// Spec. 5: MathLib.round(-∞) = -∞
	equal(MathLib.round(-Infinity), -Infinity, 'Spec. 5: MathLib.round(-∞) = -∞');

	// Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦
	equal(MathLib.round(2.2), 2, 'Spec. 6: otherwise MathLib.round(x) =  ⎣ x+0.5 ⎦');
	equal(MathLib.round(2.5), 3, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
	equal(MathLib.round(-2.2), -2, 'Spec. 6: otherwise MathLib.round(x) = ⎣ x+0.5 ⎦');
});
test('.sec()', 7, function () {
	// Spec. 1: MathLib.sec(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sec(NaN)), true, 'Spec. 1: MathLib.sec(NaN) = NaN');

	// Spec. 2: MathLib.sec(+0) = 1
	equal(MathLib.sec(+0), 1, 'Spec. 2: MathLib.sec(+0) = 1');

	// Spec. 3: MathLib.sec(-0) = 1
	equal(MathLib.sec(-0), 1, 'Spec. 3: MathLib.sec(-0) = 1');

	// Spec. 4: MathLib.sec(+∞) = NaN
	equal(MathLib.isNaN(MathLib.sec(+Infinity)), true, 'Spec. 4: MathLib.sec(+∞) = NaN');

	// Spec. 5: MathLib.sec(-∞) = NaN
	equal(MathLib.isNaN(MathLib.sec(-Infinity)), true, 'Spec. 5: MathLib.sec(-∞) = NaN');

	// Spec. 6: otherwise MathLib.sec(x) = secant of x
	equal(MathLib.sec(Math.PI), -1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
	equal(MathLib.sec(2 * Math.PI), 1, 'Spec. 6: otherwise MathLib.sec(x) = secant of x');
});
test('.sech()', 6, function () {
	// Spec. 1: MathLib.sech(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sech(NaN)), true, 'Spec. 1: MathLib.sech(NaN) = NaN');

	// Spec. 2: MathLib.sech(+∞) = +0
	equal(MathLib.isPosZero(MathLib.sech(+Infinity)), true, 'Spec. 2: MathLib.sech(+∞) = +0');

	// Spec. 3: MathLib.sech(-∞) = +0
	equal(MathLib.isPosZero(MathLib.sech(-Infinity)), true, 'Spec. 3: MathLib.sech(-∞) = +0');

	// Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x
	equal(MathLib.sech(+0), 1, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
	equal(MathLib.sech(-0), 1, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
	equal(MathLib.isEqual(MathLib.sech(1), 0.6480542736638855), true, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
});
test('.sign()', 7, function () {
	// Spec. 1: MathLib.sign(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sign(NaN)), true, 'Spec. 1: MathLib.sign(NaN) = NaN');

	// Spec. 2: MathLib.sign(0) = 0
	equal(MathLib.isPosZero(MathLib.sign(0)), true, 'Spec. 2: MathLib.sign(0) = 0');

	// Spec. 3: MathLib.sign(-0) = -0
	equal(MathLib.isNegZero(MathLib.sign(-0)), true, 'Spec. 3: MathLib.sign(-0) = -0');

	// Spec. 4: MathLib.sign(x) = 1 for x > 0
	equal(MathLib.sign(4), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');
	equal(MathLib.sign(Infinity), 1, 'Spec. 4: MathLib.sign(x) = 1 for x > 0');

	// Spec. 5: MathLib.sign(x) = -1 for x < 0
	equal(MathLib.sign(-4), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
	equal(MathLib.sign(-Infinity), -1, 'Spec. 5: MathLib.sign(x) = -1 for x < 0');
});
test('.sin()', 7, function () {
	// Spec. 1: MathLib.sin(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sin(NaN)), true, 'Spec. 1: MathLib.sin(NaN) = NaN');

	// Spec. 2: MathLib.sin(+0) = +0
	equal(MathLib.isPosZero(MathLib.sin(+0)), true, 'Spec. 2: MathLib.sin(+0) = +0');

	// Spec. 3: MathLib.sin(-0) = -0
	equal(MathLib.isNegZero(MathLib.sin(-0)), true, 'Spec. 3: MathLib.sin(-0) = -0');

	// Spec. 4: MathLib.sin(+∞) = NaN
	equal(MathLib.isNaN(MathLib.sin(+Infinity)), true, 'Spec. 4: MathLib.sin(+∞) = NaN');

	// Spec. 5: MathLib.sin(-∞) = NaN
	equal(MathLib.isNaN(MathLib.sin(-Infinity)), true, 'Spec. 5: MathLib.sin(-∞) = NaN');

	// Spec. 6: otherwise MathLib.sin(x) = sine of x
	equal(MathLib.sin(Math.PI / 2), 1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
	equal(MathLib.sin(-Math.PI / 2), -1, 'Spec. 6: otherwise MathLib.sin(x) = sine of x');
});
test('.sinh()', 7, function () {
	// Spec. 1: MathLib.sinh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sinh(NaN)), true, 'Spec. 1: MathLib.sinh(NaN) = NaN');

	// Spec. 2: MathLib.sinh(+0) = +0
	equal(MathLib.isPosZero(MathLib.sinh(+0)), true, 'Spec. 2: MathLib.sinh(+0) = +0');

	// Spec. 3: MathLib.sinh(-0) = -0
	equal(MathLib.isNegZero(MathLib.sinh(-0)), true, 'Spec. 3: MathLib.sinh(-0) = -0');

	// Spec. 4: MathLib.sinh(+∞) = +∞
	equal(MathLib.sinh(+Infinity), +Infinity, 'Spec. 4: MathLib.sinh(+∞) = +∞');

	// Spec. 5: MathLib.sinh(-∞) = -∞
	equal(MathLib.sinh(-Infinity), -Infinity, 'Spec. 5: MathLib.sinh(-∞) = -∞');

	// Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x
	ok(MathLib.isEqual(MathLib.sinh(1), 1.1752011936438014), 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
	ok(MathLib.isEqual(MathLib.sinh(2), 3.6268604078470188), 'Spec. 6: otherwise MathLib.sinh(x) = hyperbolic sine of x');
});
test('.sqrt()', 8, function () {
	// Spec. 1: MathLib.sqrt(NaN) = NaN
	equal(MathLib.isNaN(MathLib.sqrt(NaN)), true, 'Spec. 1: MathLib.sqrt(NaN) = NaN');

	// Spec. 2: MathLib.sqrt(+0) = +0
	equal(MathLib.isPosZero(MathLib.sqrt(+0)), true, 'Spec. 2: MathLib.sqrt(+0) = +0');

	// Spec. 3: MathLib.sqrt(-0) = -0
	equal(MathLib.isNegZero(MathLib.sqrt(-0)), true, 'Spec. 3: MathLib.sqrt(-0) = -0');

	// Spec. 4: MathLib.sqrt(+∞) = +∞
	equal(MathLib.sqrt(+Infinity), +Infinity, 'Spec. 4: MathLib.sqrt(+∞) = +∞');

	// Spec. 5: MathLib.sqrt(x) = NaN if x < 0
	equal(MathLib.isNaN(MathLib.sqrt(-Infinity)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');
	equal(MathLib.isNaN(MathLib.sqrt(-2)), true, 'Spec. 5: MathLib.sqrt(x) = NaN if x < 0');

	// Spec. 6: otherwise MathLib.sqrt(x) = square root of x
	equal(MathLib.sqrt(9), 3, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
	equal(MathLib.sqrt(2), 1.41421356237309504, 'Spec. 6: otherwise MathLib.sqrt(x) = square root of x');
});
test('.tan()', 7, function () {
	// Spec. 1: MathLib.tan(NaN) = NaN
	equal(MathLib.isNaN(MathLib.tan(NaN)), true, 'Spec. 1: MathLib.tan(NaN) = NaN');

	// Spec. 2: MathLib.tan(+0) = +0
	equal(MathLib.isPosZero(MathLib.tan(+0)), true, 'Spec. 2: MathLib.tan(+0) = +0');

	// Spec. 3: MathLib.tan(-0) = -0
	equal(MathLib.isNegZero(MathLib.tan(-0)), true, 'Spec. 3: MathLib.tan(-0) = -0');

	// Spec. 4: MathLib.tan(+∞) = NaN
	equal(MathLib.isNaN(MathLib.tan(+Infinity)), true, 'Spec. 4: MathLib.tan(+∞) = NaN');

	// Spec. 5: MathLib.tan(-∞) = NaN
	equal(MathLib.isNaN(MathLib.tan(-Infinity)), true, 'Spec. 5: MathLib.tan(-∞) = NaN');

	// Spec. 6: otherwise MathLib.tan(x) = tangent of x
	equal(MathLib.isZero(MathLib.tan(Math.PI)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
	equal(MathLib.isOne(MathLib.tan(Math.PI / 4)), true, 'Spec. 6: otherwise MathLib.tan(x) = tangent of x');
});
test('.tanh()', 7, function () {
	// Spec. 1: MathLib.tanh(NaN) = NaN
	equal(MathLib.isNaN(MathLib.tanh(NaN)), true, 'Spec. 1: MathLib.tanh(NaN) = NaN');

	// Spec. 2: MathLib.tanh(+0) = +0
	equal(MathLib.isPosZero(MathLib.tanh(+0)), true, 'Spec. 2: MathLib.tanh(+0) = +0');

	// Spec. 3: MathLib.tanh(-0) = -0
	equal(MathLib.isNegZero(MathLib.tanh(-0)), true, 'Spec. 3: MathLib.tanh(-0) = -0');

	// Spec. 4: MathLib.tanh(+∞) = 1
	equal(MathLib.tanh(+Infinity), 1, 'Spec. 4: MathLib.tanh(+∞) = +1');

	// Spec. 5: MathLib.tanh(-∞) = -1
	equal(MathLib.tanh(-Infinity), -1, 'Spec. 5: MathLib.tanh(-∞) = -1');

	// Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x
	equal(MathLib.tanh(1), 0.761594155955765, 'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
	equal(MathLib.tanh(10), 0.9999999958776927, 'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
});
test('.times()', 5, function () {
	equal(MathLib.times(), 1, 'The empty product is one.');
	equal(MathLib.times([]), 1, 'The empty product is one.');
	equal(MathLib.times(1, 2), 2);
	equal(MathLib.times([1, 2]), 2);
	deepEqual(MathLib.times(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)),
		new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
});
test('.toContentMathML()', 6, function () {
	equal(MathLib.sin.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply></lambda>', 'MathLib.sin.toContentMathML()');
	equal(MathLib.exp(MathLib.sin).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd=\"transc1\">exp</csymbol><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply></apply></lambda>', 'MathLib.exp(MathLib.sin).toContentMathML()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><power/><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>', 'MathLib.pow(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>', 'MathLib.plus(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(2, MathLib.sin).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><cn>2</cn><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply></apply></lambda>', 'MathLib.plus(2, MathLib.sin).toContentMathML()');
	equal(MathLib.times(2, MathLib.sin).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">times</csymbol><cn>2</cn><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply></apply></lambda>', 'MathLib.times(2, MathLib.sin).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd=\"transc1\">sin</csymbol><ci>x</ci></apply><apply><csymbol cd=\"transc1\">cos</csymbol><ci>x</ci></apply></apply></lambda>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML()');
});
test('.toLaTeX()', 6, function () {
	equal(MathLib.sin.toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)', 'MathLib.sin.toLaTeX() should be x \\longmapsto \\sin\\left(x)');
	equal(MathLib.exp(MathLib.sin).toLaTeX(), 'x \\longmapsto e^{\\sin\\left(x\\right)}', 'MathLib.exp(MathLib.sin).toLaTeX() should be x \\longmapsto e^{\\sin\\left(x\\right)}');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = x \\longmapsto sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2+\\sin\\left(x\\right)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = x \\longmapsto 2+\\sin\\left(x\\right)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2\\cdot\\sin\\left(x\\right)', 'MathLib.times(2, MathLib.sin).toLaTeX() = x \\longmapsto 2\\cdot\\sin\\left(x\\right)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+\\cos\\left(x\\right)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+\\cos\\left(x\\right)');
});
test('.toMathML()', 6, function () {
	equal(MathLib.sin.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow>', 'MathLib.sin.toMathML()');
	equal(MathLib.exp(MathLib.sin).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></mrow>', 'MathLib.exp(MathLib.sin).toMathML()');
	// equal(MathLib.pow(MathLib.sin, 2).toMathML(), '<mrow><msup><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2</mn></msup></mrow>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mn>2</mn></mrow></mrow>', 'MathLib.plus(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>', 'MathLib.plus(2, MathLib.sin).toMathML()');
	equal(MathLib.times(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mn>2</mn><mo>&middot;</mo><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>', 'MathLib.times(2, MathLib.sin).toMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});
test('.toString()', 6, function () {
	equal(MathLib.sin.toString(), 'x ⟼ sin(x)', 'MathLib.sin.toString() should be x ⟼ sin(x)');
	equal(MathLib.exp(MathLib.sin).toString(), 'x ⟼ exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be x ⟼ exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'x ⟼ sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = x ⟼ sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'x ⟼ sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = x ⟼ sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), 'x ⟼ 2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = x ⟼ 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), 'x ⟼ 2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = x ⟼ 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'x ⟼ sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = x ⟼ sin(x)+cos(x)');
});
test('.xor()', 14, function () {
	equal(MathLib.xor(), false);
	equal(MathLib.xor([]), false);
	equal(MathLib.xor(true), true);
	equal(MathLib.xor([true]), true);
	equal(MathLib.xor(false), false);
	equal(MathLib.xor([false]), false);
	equal(MathLib.xor(true, true), false, 'true xor true = false');
	equal(MathLib.xor([true, true]), false, 'true xor true = false');
	equal(MathLib.xor(true, false), true, 'true xor false = true');
	equal(MathLib.xor([true, false]), true, 'true xor false = true');
	equal(MathLib.xor(false, true), true, 'false xor true = true');
	equal(MathLib.xor([false, true]), true, 'false xor true = true');
	equal(MathLib.xor(false, false), false, 'false xor false = false');
	equal(MathLib.xor([false, false]), false, 'false xor false = false');
});
module('Line');
test('init', 4, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.dimension, 2, 'Testing the dimension');
	equal(line[0], 3, 'Testing the entries');
	equal(line[1], 2, 'Testing the entries');
	equal(line[2], 1, 'Testing the entries');
});



// Properties
test('.constructor', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.constructor, MathLib.Line, 'Testing .constructor');
});


test('.type', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.type, 'line', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([6, 4, 2]),
			line3 = new MathLib.Line([1, 1, 1]),
			line4 = new MathLib.Line([1, 1, 1, 1]);
	equal(line1.isEqual(line2), true, '.isEqual()');
	equal(line1.isEqual(line3), false, '.isEqual()');
	equal(line3.isEqual(line4), false, '.isEqual()');
});


test('.isFinite()', 2, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([6, 4, 0]);
	equal(line1.isFinite(), true, '.isFinite()');
	equal(line2.isFinite(), false, '.isFinite()');
});


test('.map()', 2, function () {
	var p = new MathLib.Line([1, 2, 3]),
			q = new MathLib.Line([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'line', '.type should be line');
});


// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = MathLib.point([3, 2, 1]);
//   equal(point.toContentMathML(), '', '.toContentMathML()');
//   equal(point.toContentMathML(true), '', '.toContentMathML()');
// });


test('.toLaTeX()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathML()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});


test('.toString()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.toString(), '(3, 2, 1)', '.toString()');
});

module('Matrix');
test('init', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.rows, 3, 'Testing the number of rows');
	equal(m.cols, 3, 'Testing the number of cols');
});



// Properties
test('.constructor', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.constructor, MathLib.Matrix, 'Testing .constructor');
});


test('.type', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.type, 'matrix', 'Testing .type');
});



// Methods
test('.adjugate()', 1, function () {
	var m = new MathLib.Matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
			res = new MathLib.Matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

	deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.adjoint()', 1, function () {
	var c = MathLib.Complex,
			m = new MathLib.Matrix([[new c(3, 1), 5, new c(0, -2)], [new c(2, -2), new c(0, 1), new c(-7, -13)]]),
			res = new MathLib.Matrix([[new c(3, -1), new c(2, 2)], [5, new c(0, -1)], [new c(0, 2), new c(-7, 13)]]);

	deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.cholesky()', 1, function () {
	var m = new MathLib.Matrix([[25, 15, -5], [15, 18, 0], [-5, 0, 11]]),
			res = new MathLib.Matrix([[5, 0, 0], [3, 3, 0], [-1, 1, 3]]);

	deepEqual(m.cholesky(), res, 'Cholesky decomposition of a 3x3 matrix');
});


test('.compare()', 3, function () {
	var m1 = new MathLib.Matrix([[1, 2], [3, 4]]),
			m2 = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]),
			m3 = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]),
			m4 = new MathLib.Matrix([[1, 1, 2], [3, 5, 8]]);

	equal(m1.compare(m2), -1);
	equal(m2.compare(m3), 0);
	equal(m3.compare(m4), 1);
});


test('.determinant()', 3, function () {
	var m = new MathLib.Matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
			n = new MathLib.Matrix([[42]]),
			p = new MathLib.Matrix([[0, 1, 2], [3, 2, 1]]);

	equal(m.determinant(), 3, 'Determinant of a 3x3 matrix');
	equal(n.determinant(), 42, 'Determinant of 1x1 matrix');
	equal(p.determinant(), undefined, 'Determinant of 2x3 matrix should be undefined');
});


test('.gershgorin()', 2, function () {
	var c = MathLib.Complex,
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[new c(1, 4), 2, 3], [new c(2, 3), new c(4, 2), 6], [7, new c(0, 5), 9]]),
			resm = [new MathLib.Circle([1, 0], 5), new MathLib.Circle([5, 0], 10), new MathLib.Circle([9, 0], 9)],
			resn = [new MathLib.Circle([1, 4], 5), new MathLib.Circle([4, 2], 7), new MathLib.Circle([9, 0], 9)];

	deepEqual(m.gershgorin(), resm, 'Gershgorin circles of a 3x3 matrix');
	deepEqual(n.gershgorin(), resn, 'Gershgorin circles of a complex 3x3 matrix');
});


test('.givens()', 9, function () {
	var m = new MathLib.Matrix([[3, 5], [0, 2], [0, 0], [4, 5]]),
			n = new MathLib.Matrix([[6, 5, 0], [5, 1, 4], [0, 4, 3]]),
			o = new MathLib.Matrix([[0, 1, 6], [3, 5, 7], [4, 9, 2]]),
			QRm = m.givens(),
			Qm = QRm[0],
			Rm = QRm[1],
			Q1 = new MathLib.Matrix([[3 / 5, 4 / (5 * Math.sqrt(5)), 0, -8 / (5 * Math.sqrt(5))], [0, 2 / Math.sqrt(5), 0, 1 / Math.sqrt(5)], [0, 0, 1, 0], [4 / 5, -3 / (5 * Math.sqrt(5)), 0, 6 / (5 * Math.sqrt(5))]]),
			R1 = new MathLib.Matrix([[5, 7], [0, 2.23606797749979], [0, 0], [0, 0]]),

			QRn = n.givens(),
			Qn = QRn[0],
			Rn = QRn[1],
			Q2 = new MathLib.Matrix([[0.768221279597376, -0.332654179360071, -0.546970988744419], [0.640184399664480, 0.399185015232086, 0.656365186493303], [0, -0.854395997514289, 0.519622439307198]]),
			R2 = new MathLib.Matrix([[7.810249675906652, 4.481290797651358, 2.560737598657919], [0, -4.681669871625427, -0.966447931614524], [0, 0, 4.184328063894809]]),

			QRo = o.givens(),
			Qo = QRo[0],
			Ro = QRo[1],
			Q3 = new MathLib.Matrix([[0, -0.581238193719096, -0.813733471206735], [0.6, 0.650986776965388, -0.464990554975277], [0.8, -0.488240082724041, 0.348742916231458]]),
			R3 = new MathLib.Matrix([[5, 10.2, 5.8], [0, -1.720465053408526, 0.09299811099505462], [0, 0, -7.439848879604435]]);
	
	ok(Qm.isEqual(Q1), 'Q is original matrix');
	ok(Rm.isEqual(R1), 'R is original matrix');
	ok(Qm.times(Rm).isEqual(m), 'Q*R is original matrix');
	ok(Qn.isEqual(Q2), 'Q is original matrix');
	ok(Rn.isEqual(R2), 'R is original matrix');
	ok(Qn.times(Rn).isEqual(n), 'Q*R is original matrix');
	ok(Qo.isEqual(Q3), 'Q is original matrix');
	ok(Ro.isEqual(R3), 'R is original matrix');
	ok(Qo.times(Ro).isEqual(o), 'Q*R is original matrix');
});


test('.isBandMatrix()', 2, function () {
	var m = new MathLib.Matrix([[2, 1, 3, 0], [1, 2, 1, 3], [0, 1, 2, 1], [0, 0, 1, 2]]);

	equal(m.isBandMatrix(1, 2), true, 'band matrix');
	equal(m.isBandMatrix(1, 1), false, 'upper bandwidth to small');
});

test('.isDiag()', 2, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[1, 0, 0], [0, 5, 0], [0, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isDiag(), true, 'square matrix');
	equal(n.isDiag(), false, 'non square matrix');
});


test('.isIdentity()', 2, function () {
	var m = new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isIdentity(), true, '.isIdentity() on identity matrix');
	equal(n.isIdentity(), false, '.isIdentity() on non identity matrix');
});


test('.isInvertible()', 2, function () {
	var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 2]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 9, 15]]);
	equal(m.isInvertible(), true, '.isInvertible(), invertible matrix');
	equal(n.isInvertible(), false, '.isInvertible(), singular matrix');
});


test('.isLower()', 4, function () {
	var m = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [3, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
			o = new MathLib.Matrix([[1, 0, 0], [4, 5, 0]]),
			p = new MathLib.Matrix([[1, 0, 0], [4, 5, 0], [4, 0, 6], [4, 3, 2]]);
	equal(m.isLower(), true, 'upper matrix');
	equal(n.isLower(), false, 'non upper matrix');
	equal(o.isLower(), true, 'upper matrix');
	equal(p.isLower(), true, 'upper matrix');
});


test('.isOrthogonal()', 2, function () {
	var m = new MathLib.Matrix([[0.8, -0.6], [0.6, 0.8]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isOrthogonal(), true, '.isOrthogonal() on orthogal matrix');
	equal(n.isOrthogonal(), false, '.isOrthogonal() on non orthogonal matrix');
});


test('.isPermutation()', 3, function () {
	var m = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 1]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 3, 4]]),
			o = new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]);
	equal(m.isPermutation(), true, 'permutation matrix');
	equal(n.isPermutation(), false, 'non permutation matrix');
	equal(o.isPermutation(), false, 'zero line');
});


test('.isPosDefinite()', 2, function () {
	var m = new MathLib.Matrix([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]),
			n = new MathLib.Matrix([[1, 2], [2, 1]]);
	equal(m.isPosDefinite(), true, 'positiv definite matrix');
	equal(n.isPosDefinite(), false, 'non positiv definite matrix');
});


test('.isSquare()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8]]);
	equal(m.isSquare(), true, 'square matrix');
	equal(n.isSquare(), false, 'non square matrix');
});


test('.isSymmetric()', 2, function () {
	var c = new MathLib.Complex(4, 0),
			m = new MathLib.Matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
	equal(m.isSymmetric(), true, 'symmetric matrix');
	equal(n.isSymmetric(), false, 'non symmetric matrix');
});


test('.isUpper()', 4, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 6], [0, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
			o = new MathLib.Matrix([[1, 4, 7], [0, 5, 8]]),
			p = new MathLib.Matrix([[1, 4, 7], [0, 5, 8], [0, 0, 6], [0, 0, 0]]);
	equal(m.isUpper(), true, 'upper matrix');
	equal(n.isUpper(), false, 'non upper matrix');
	equal(o.isUpper(), true, 'upper matrix');
	equal(p.isUpper(), true, 'upper matrix');
});


test('.isVector()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2, 3]]);
	equal(m.isVector(), false, 'normal matrix');
	equal(n.isVector(), true, 'one row matrix');
});


test('.isZero()', 2, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
	equal(m.isZero(), true, 'zero matrix');
	equal(n.isZero(), false, 'non zero matrix');
});


test('.LU()', 2, function () {
	var m = new MathLib.Matrix([[4, 3], [8, 3]]),
			n = new MathLib.Matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
			res1 = new MathLib.Matrix([[8, 3], [0.5, 1.5]]),
			res2 = new MathLib.Matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

	deepEqual(m.LU(), res1, 'LU decomposition');
	deepEqual(n.LU(), res2, 'LU decomposition');
});


test('.map()', 2, function () {
	var p = new MathLib.Matrix([[1, 2], [3, 4]]),
			q = new MathLib.Matrix([[2, 4], [6, 8]]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'matrix', '.type should be matrix');
});


test('.minus()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[0, -2, -4], [2, 0, -2], [4, 2, 0]]),
			res1 = new MathLib.Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
	deepEqual(m.minus(n), res, 'subtracting two simple matrices');
	deepEqual(n.minus(n), res1, 'subtracting two simple matrices');
});


test('.negative()', 1, function () {
	var m = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[-1, -4, -7], [-2, -5, -8], [-3, -6, -9]]);
	deepEqual(m.negative(), res, 'negative of a simple matrix');
});


test('.plus()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
			res = new MathLib.Matrix([[2, 6, 10], [6, 10, 14], [10, 14, 18]]);
	deepEqual(m.plus(n), res, 'adding two simple matrices');
});


test('.rank()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
			n = new MathLib.Matrix([[1, 2, 3], [0, 6, 4], [0, 3, 2]]);
	equal(m.rank(), 3, '.rank()');
	equal(n.rank(), 2, '.rank()');
});


test('.remove()', 3, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			res1 = new MathLib.Matrix([[1, 2, 3], [7, 8, 9]]),
			res2 = new MathLib.Matrix([[1, 3], [4, 6], [7, 9]]),
			res3 = new MathLib.Matrix([[4], [7]]);

	deepEqual(m.remove(1), res1, 'removing the second row');
	deepEqual(m.remove(false, 1), res2, 'removing the second column');
	deepEqual(m.remove([0], [1, 2]), res3, 'removing the first row and the second and third col');
});


test('.rref()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, -1, -4], [2, 3, -1, -11], [-2, 0, -3, 22]]),
			n = new MathLib.Matrix([[1, 2, 3], [1, 2, 4], [2, 4, 7]]);

	deepEqual(m.rref(), new MathLib.Matrix([[1, 0, 0, -8], [0, 1, 0, 1], [0, 0, 1, -2]]), 'reduced row echelon form');
	deepEqual(n.rref(), new MathLib.Matrix([[1, 2, 0], [0, 0, 1], [0, 0, 0]]), 'singular matrix');
});


test('.solve()', 4, function () {
	var A1 = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
			b1 = new MathLib.Vector([2, 2, 0]),
			x1 = new MathLib.Vector([5, -6, 3]),
			A2 = new MathLib.Matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
			b2 = new MathLib.Vector([10, 3, 3]),
			x2 = new MathLib.Vector([1, 1, 3]),
			c  = MathLib.Complex,
			A3 = new MathLib.Matrix([[new c(2, 3), 0, 3], [2, new c(-1, 5), 0], [new c(3, -4), new c(0, 1), 1]]),
			b3 = new MathLib.Vector([new c(5, 37), new c(5, 19), new c(21, 0)]),
			x3 = new MathLib.Vector([new c(4, 2), new c(3, 0), new c(1, 7)]);

	ok(A1.solve(b1).isEqual(x1), 'Solving a system of linear equations');
	deepEqual(A1.times(x1), b1, 'Showing the solution is right');

	deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

	ok(A3.solve(b3).isEqual(x3), 'Solving a complex system of linear equations');
});


test('.times()', 5, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]),
			n = new MathLib.Matrix([[0, 1], [0, 0]]),
			res = new MathLib.Matrix([[0, 1], [0, 3]]),

			c  = MathLib.Complex,
			mc = new MathLib.Matrix([[new c(2, 3), 0, 3], [2, new c(-1, 5), 0], [new c(3, -4), new c(0, 1), 1]]),
			bc = new MathLib.Vector([new c(4, 2), 3, new c(1, 7)]),
			resc = new MathLib.Vector([new c(5, 37), new c(5, 19), new c(21, 0)]),
			r = new MathLib.Rational(2, 3);

	deepEqual(m.times(3), new MathLib.Matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
	deepEqual(m.times(new c(0, 1)), new MathLib.Matrix([[new c(0, 1), new c(0, 2)], [new c(0, 3), new c(0, 4)]]), 'matrix scalar multiplication');
	deepEqual(m.times(n), res, 'multiplying two simple matrices');
	deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
	equal(m.times(r).isEqual(new MathLib.Matrix([[2 / 3, 4 / 3], [6 / 3, 8 / 3]])), true, 'complex matrix times rational number');
});


test('.trace()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2], [3, c]]);
	equal(m.trace(), 15, 'trace of a simple matrix');
	deepEqual(n.trace(), new MathLib.Complex(4, 4), 'trace of a complex matrix');
});


test('.transpose()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]);

	deepEqual(m.transpose(), new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]), 'transpose a square matrix');
	deepEqual(n.transpose(), new MathLib.Matrix([[1, 4], [2, 5], [3, 6]]), 'transpose of a rectangular matrix');
});


test('.toArray()', 4, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			a = m.toArray();

	deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], '.toArray()');
	equal(Object.prototype.toString.call(a), '[object Array]', '.toArray()');
	equal(a.type, undefined, 'get sure that it is not a Mathlib object');
	a[0][0] = 42;
	deepEqual(m, new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'make sure the matrix hasn\'t changed');
});


test('.toColVectors()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toColVectors(), [new MathLib.Vector([1, 4, 7]), new MathLib.Vector([2, 5, 8]), new MathLib.Vector([3, 6, 9])], '.toColVectors()');
});


test('.toComplex()', 1, function () {
	var m = new MathLib.Matrix([[1, -2], [2, 1]]);
	deepEqual(m.toComplex(), new MathLib.Complex(1, 2), 'convert a 2x2 matrix to a complex number');
});


test('.toContentMathML()', 1, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]);
	deepEqual(m.toContentMathML(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathML()');
});


test('.toLaTeX()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathML()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toMathML(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathML()');
});


test('.toRowVectors()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toRowVectors(), [new MathLib.Vector([1, 2, 3]), new MathLib.Vector([4, 5, 6]), new MathLib.Vector([7, 8, 9])], '.toRowVectors()');
});


test('.toString()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toString(), '1\t2\t3\n4\t5\t6\n7\t8\t9', '.toString()');
});



// Static methods
test('identity()', 1, function () {
	equal(new MathLib.Matrix.identity(4).isIdentity(), true, 'creating a identity matrix');
});


test('numbers()', 3, function () {
	var m = new MathLib.Matrix.numbers(3, 2, 2),
			n = new MathLib.Matrix.numbers(4, 2),
			o = new MathLib.Matrix.numbers(5);
	deepEqual(m, new MathLib.Matrix([[3, 3], [3, 3]]), 'static number method');
	deepEqual(n, new MathLib.Matrix([[4, 4], [4, 4]]), 'static number method');
	deepEqual(o, new MathLib.Matrix([[5]]), 'static number method');
});

module('Permutation');
test('init', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(typeof p, 'object', 'Testing typeof');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(p.constructor, MathLib.Permutation, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]);
	equal(p.type, 'permutation', 'Testing .type');
});
test('.applyTo()', 6, function () {
	var p = new MathLib.Permutation([[0, 1, 2], [0, 1, 2]]),
			r = new MathLib.Permutation([0, 2, 1]),
			q = new MathLib.Permutation([]),
			v = new MathLib.Vector([1, 2, 3]);

	equal(p.applyTo(0), 2, 'Testing .applyTo()');
	equal(p.applyTo(3), 3, 'Testing .applyTo()');
	deepEqual(r.applyTo(v), new MathLib.Vector([1, 3, 2]), 'Testing .applyTo()');
	equal(r.applyTo(v).type, 'vector', 'Testing .applyTo()');
	deepEqual(r.applyTo([1, 2, 3]), [1, 3, 2], 'Testing .applyTo()');
	equal(q.applyTo(1), 1, 'Testing .applyTo() with id');
});
test('.compare()', 3, function () {
	var p1 = new MathLib.Permutation([1, 2]),
			p2 = new MathLib.Permutation([1, 2, 3]),
			p3 = new MathLib.Permutation([1, 2, 3]),
			p4 = new MathLib.Permutation([1, 2, 1]);

	equal(p1.compare(p2), -1);
	equal(p2.compare(p3), 0);
	equal(p3.compare(p4), 1);
});
test('cycleToList()', 2, function () {
	var p = [[0, 1, 2], [3, 4]],
			q = [[0, 1], [2, 3]];
	deepEqual(new MathLib.Permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
	deepEqual(new MathLib.Permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});
test('listToCycle()', 1, function () {
	var p = [1, 2, 0, 4, 3];
	deepEqual(new MathLib.Permutation.listToCycle(p), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});
test('.map()', 2, function () {
	var p = new MathLib.Permutation([1, 2, 3]),
			q = new MathLib.Permutation([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'permutation', '.type should be permutation');
});
test('.sgn()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [1, 2]]),
			q = new MathLib.Permutation([[0, 1], [1, 2, 3]]);
	equal(p.sgn(), 1, 'Testing .sgn()');
	equal(q.sgn(), -1, 'Testing .sgn()');
});
test('.times()', 1, function () {
	var p = new MathLib.Permutation([2, 0, 1]),
			q = new MathLib.Permutation([0, 2, 1]);
	deepEqual(p.times(q), new MathLib.Permutation([2, 1, 0]), 'Testing .times()');
});
test('.toMatrix()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]),
			q = new MathLib.Permutation([]),
			pm = new MathLib.Matrix([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]),
			qm = new MathLib.Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
	deepEqual(p.toMatrix(), pm, 'Testing .toMatrix()');
	deepEqual(q.toMatrix(4), qm, 'Testing .toMatrix() with id permutation');
});
test('.toString()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [2, 3]]),
			q = new MathLib.Permutation([]);
	equal(p.toString(), '(0,1)(2,3)', 'Testing .toString()');
	equal(q.toString(), '', 'Testing .toString() with id permutation');
});
module('Point');
test('init', 1, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.dimension, 2, 'Testing the dimension');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Point([3, 2, 1]);
	equal(p.constructor, MathLib.Point, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Point([3, 2, 1]);
	equal(p.type, 'point', 'Testing .type');
});
test('.I', 1, function () {
	equal(MathLib.Point.I.type, 'point', '.I');
});
test('.J', 1, function () {
	equal(MathLib.Point.J.type, 'point', '.J');
});
test('.distanceTo()', 2, function () {
	var p1 = new MathLib.Point([6, 8, 2]),
			p2 = new MathLib.Point([-3, 4, 1]);
	
	deepEqual(p1.distanceTo(), 5, '.distanceTo()');
	deepEqual(p1.distanceTo(p2), 6, '.distanceTo()');
});
test('.isEqual()', 3, function () {
	var point1 = new MathLib.Point([3, 2, 1]),
			point2 = new MathLib.Point([6, 4, 2]),
			point3 = new MathLib.Point([1, 1, 1]),
			point4 = new MathLib.Point([1, 1, 1, 1]);
	equal(point1.isEqual(point2), true, '.isEqual()');
	equal(point1.isEqual(point3), false, '.isEqual()');
	equal(point3.isEqual(point4), false, '.isEqual()');
});
test('.isFinite()', 2, function () {
	var point1 = new MathLib.Point([3, 2, 1]),
			point2 = new MathLib.Point([6, 4, 0]);
	equal(point1.isFinite(), true, '.isFinite()');
	equal(point2.isFinite(), false, '.isFinite()');
});
test('.isInside()', 3, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([2, 0, 1]),
			p3 = new MathLib.Point([3, 0, 1]),
			c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
	equal(p1.isInside(c), true, '.isInside()');
	equal(p2.isInside(c), false, '.isInside()');
	equal(p3.isInside(c), false, '.isInside()');
});
test('.isOn()', 3, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([2, 0, 1]),
			p3 = new MathLib.Point([3, 0, 1]),
			c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
	equal(p1.isOn(c), false, '.isOn()');
	equal(p2.isOn(c), true, '.isOn()');
	equal(p3.isOn(c), false, '.isOn()');
});
test('.isOutside()', 3, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([2, 0, 1]),
			p3 = new MathLib.Point([3, 0, 1]),
			c = new MathLib.Circle(new MathLib.Point([0, 0, 1]), 2);
	equal(p1.isOutside(c), false, '.isOutside()');
	equal(p2.isOutside(c), false, '.isOutside()');
	equal(p3.isOutside(c), true, '.isOutside()');
});
test('.lineTo()', 2, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([0, 1, 1]),
			p3 = new MathLib.Point([1, 1, 0]);

	deepEqual(p1.lineTo(p2), new MathLib.Line([-1, -1, 1]), '.lineTo()');
	deepEqual(p1.lineTo(p3), new MathLib.Line([-1, 1, 1]), '.lineTo()');
});
test('.map()', 2, function () {
	var p = new MathLib.Point([1, 2, 3]),
			q = new MathLib.Point([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'point', '.type should be point');
});
test('.normalize()', 2, function () {
	var p1 = new MathLib.Point([3, 2, 2]),
			p2 = new MathLib.Point([3, 2, 0]);
	
	deepEqual(p1.normalize(), new MathLib.Point([1.5, 1, 1]), '.normalize() of an finite point');
	deepEqual(p2.normalize(), new MathLib.Point([3, 2, 0]), '.normalize() of an infinite point');
});
test('.reflectAt()', 1, function () {
	var point1 = new MathLib.Point([0, 0, 1]),
			point2 = new MathLib.Point([1, 2, 1]),
			point3 = new MathLib.Point([2, 4, 1]);
	deepEqual(point1.reflectAt(point2), point3, '.reflectAt()');
});
test('.toComplex()', 2, function () {
	var p1 = new MathLib.Point([3, 2, 1]),
			p2 = new MathLib.Point([3, 2, 0]);
	
	deepEqual(p1.toComplex(), new MathLib.Complex(3, 2), '.toComplex() of an finite point');
	deepEqual(p2.toComplex(), MathLib.Complex.infinity, '.toComplex() of an infinite point');
});
test('.toLaTeX()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.toLaTeX(), '\\begin{pmatrix}3\\\\2\\end{pmatrix}', '.toLaTeX()');
	equal(point.toLaTeX(true), '\\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}', '.toLaTeX()');
});
test('.toMathML()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
	equal(point.toMathML(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});
test('.toString()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.toString(), '(3, 2)', '.toString()');
	equal(point.toString(true), '(3, 2, 1)', '.toString()');
});
module('Polynomial');
test('init', 3, function () {
	var p = new MathLib.Polynomial([1, 2, 3, 4]),
			q = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, -4, new MathLib.Complex(2, 3)]);
	equal(p[0], 1, 'coefficients');
	deepEqual(q[2], 0, 'coefficients');
	deepEqual(p1[2], new MathLib.Complex(2, 3), '.coef');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]);
	equal(p.constructor, MathLib.Polynomial, 'Testing .constructor');
});


test('.deg', 1, function () {
	var p = new MathLib.Polynomial(3);
	equal(p.deg, 3, 'testing if .degree is right');
});


test('.type', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]);
	equal(p.type, 'polynomial', 'Testing .type');
});
test('.compare()', 3, function () {
	var p1 = new MathLib.Polynomial([1, 2]),
			p2 = new MathLib.Polynomial([1, 2, 3]),
			p3 = new MathLib.Polynomial([1, 2, 3]),
			p4 = new MathLib.Polynomial([1, 2, 1]);

	equal(p1.compare(p2), -1);
	equal(p2.compare(p3), 0);
	equal(p3.compare(p4), 1);
});
test('.differentiate()', 3, function () {
	var p = new MathLib.Polynomial(3);
	deepEqual(p.differentiate(), new MathLib.Polynomial([0, 0, 3]), '.differentiate()');
	deepEqual(p.differentiate(2), new MathLib.Polynomial([0, 6]), '.differentiate(2)');
	deepEqual(p.differentiate(4), new MathLib.Polynomial([0]), '.differentiate(4)');
});
test('.integrate()', 2, function () {
	var p = new MathLib.Polynomial([0, 0, 0, 1]);
	deepEqual(p.integrate(), new MathLib.Polynomial([0, 0, 0, 0, 0.25]), '.integrate()');
	deepEqual(p.integrate(2), new MathLib.Polynomial([0, 0, 0, 0, 0,  0.05]), '.integrate(2)');
});
test('.isEqual()', 1, function () {
	var c = new MathLib.Complex(0, 0),
			p = new MathLib.Polynomial(3),
			q = new MathLib.Polynomial([c, 0, 0, 1]);
	equal(q.isEqual(p), true, '.times(polynomial)');
});
test('.map()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'polynomial', '.type should be polynomial');
});
test('one()', 1, function () {
	var p = MathLib.Polynomial.one;
	deepEqual(p, new MathLib.Polynomial([1]), 'Testing .one');
});
test('.plus()', 3, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]);
	deepEqual(p1.plus(12), new MathLib.Polynomial([13, 2, 3]), '.plus(integer)');
	deepEqual(p.plus(p1), new MathLib.Polynomial([1, 2, 3, 1]), '.plus(polynomial)');
	deepEqual(p1.plus(p), new MathLib.Polynomial([1, 2, 3, 1]), '.plus(polynomial)');
});
test('.times()', 4, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]),
			r = new MathLib.Rational(2, 3);
	deepEqual(p1.times(5), new MathLib.Polynomial([5, 10, 15]), '.times(integer)');
	deepEqual(p.times(p1), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), '.times(polynomial)');
	deepEqual(p1.times(p), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), '.times(polynomial)');
	deepEqual(p1.times(r), new MathLib.Polynomial([2 / 3, 4 / 3, 6 / 3]), '.times(rational)');
});
test('.toContentMathML()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="arith1">times</csymbol><cn>3</cn><apply><csymbol cd="arith1">power</csymbol><ci>x</ci><cn>2</cn></apply></apply><apply><csymbol cd="arith1">times</csymbol><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', '.toContentMathML()');
	deepEqual(q.toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="arith1">times</csymbol><cn>1</cn><apply><csymbol cd="arith1">power</csymbol><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', '.toContentMathML()');
});
test('.toFunctn()', 3, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			f = p.toFunctn(),
			sinf = MathLib.sin(f);

	equal(f.type, 'functn', '.type should be functn');
	equal(sinf.toString(), 'x ⟼ sin(3*x^2+2*x+1)', 'composition with other functions');
	equal(f(42), 5377, 'fuctn evaluation');
});
test('.toLaTeX()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toLaTeX(), '3x^{2}+2x+1', '.toLaTeX()');
	deepEqual(q.toLaTeX(), '1x^{2}-1', '.toLaTeX()');
});
test('.toMathML()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toMathML(), '<mrow><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', '.toMathML()');
	deepEqual(q.toMathML(), '<mrow><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', '.toMathML()');
});
test('.toString()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toString(), '3*x^2+2*x+1', '.toString()');
	deepEqual(q.toString(), '1*x^2-1', '.toString()');
});
test('.valueAt()', 6, function () {
	var p = new MathLib.Polynomial(3),
			p1 = new MathLib.Polynomial([1, 2, 3]),
			p2 = new MathLib.Polynomial([1, -4, new MathLib.Complex(4, -1)]),
			m = new MathLib.Matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
			charPoly = new MathLib.Polynomial([4, -1, -4, 1]);
	equal(p.valueAt(4), 64, '.valueAt()');
	equal(p1.valueAt(2), 17, '.valueAt()');

	deepEqual(p1.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-10, 42), '.valueAt()');
	deepEqual(p2.valueAt(2), new MathLib.Complex(9, -4), '.valueAt()');
	deepEqual(p2.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-15, 41), '.valueAt()');

	equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});
test('zero()', 1, function () {
	var p = MathLib.Polynomial.zero;
	deepEqual(p, new MathLib.Polynomial([0]), 'Testing .zero');
});
module('Rational');
test('init', 5, function () {
	var r = new MathLib.Rational(2, 3),
			p = new	MathLib.Rational(4);
	equal(r.numerator, 2, 'Testing the numerator');
	equal(r.denominator, 3, 'Testing the denominator');
	equal(p.numerator, 4, 'Testing the numerator');
	equal(p.denominator, 1, 'Testing the denominator');
	throws(function () {var r = new MathLib.Rational(2, 0); }, 'Setting the denominator to zero should throw an error.');
});



// Properties
test('.constructor', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.constructor, MathLib.Rational, 'Testing .constructor');
});

test('.type', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.type, 'rational', 'Testing .type');
});
test('.compare()', 3, function () {
	var r1 = new MathLib.Rational(3, 2),
			r2 = new MathLib.Rational(6, 4),
			r3 = new MathLib.Rational(1, 1),
			r4 = new MathLib.Rational(7, 2);
	equal(r1.compare(r2), 0, '.compare()');
	equal(r1.compare(r3), 1, '.compare()');
	equal(r1.compare(r4), -1,  '.compare()');
});
test('.divide()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.divide(p).isEqual(new MathLib.Rational(3, 4)), true, '.divide()');
	equal(r.divide(2).isEqual(new MathLib.Rational(1, 4)), true, '.divide()');
});
test('.inverse()', 2, function () {
	var r = (new MathLib.Rational(1, 2)).inverse(),
			p = (new MathLib.Rational(0, 2)).inverse();
	equal(r.isEqual(new MathLib.Rational(2, 1)), true, '.inverse()');
	equal(p, undefined, '.inverse()');
});
test('.isEqual()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(4, 8),
			q = new MathLib.Rational(2, 3);

	equal(r.isEqual(p), true, '.isEqual()');
	equal(r.isEqual(q), false, '.isEqual()');
});
test('.isZero()', 2, function () {
	var r = new MathLib.Rational(0, 2),
			p = new MathLib.Rational(1, 3);

	equal(r.isZero(), true, '.isZero()');
	equal(p.isZero(), false, '.isZero()');
});
test('.minus()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.minus(p).isEqual(new MathLib.Rational(-1, 6)), true, '.minus()');
	equal(r.minus(2).isEqual(new MathLib.Rational(-3, 2)), true, '.minus()');
});
test('.negative()', 1, function () {
	var r = (new MathLib.Rational(1, 2)).negative();
	equal(r.isEqual(new MathLib.Rational(-1, 2)), true, '.isEqual()');
});
test('.plus()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.plus(p).isEqual(new MathLib.Rational(7, 6)), true, '.plus()');
	equal(r.plus(2).isEqual(new MathLib.Rational(5, 2)), true, '.plus()');
});
test('.reduce()', 4, function () {
	var r = (new MathLib.Rational(-4, -6)).reduce(),
			p = (new MathLib.Rational(3, -6)).reduce();
	equal(r.numerator, 2, '.reduce()');
	equal(r.denominator, 3, '.reduce()');
	equal(p.numerator, -1, '.reduce()');
	equal(p.denominator, 2, '.reduce()');
});
test('.times()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.times(p).isEqual(new MathLib.Rational(2, 6)), true, '.times()');
	equal(r.times(2).isEqual(new MathLib.Rational(1, 1)), true, '.times()');
});
test('.toContentMathML()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toContentMathML(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathML()');
});
test('.toLaTeX()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toLaTeX(), '\\frac{2}{3}', '.toLaTeX()');
});
test('.toMathML()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toMathML(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
});
test('.toNumber()', 1, function () {
	var r = new MathLib.Rational(1, 2);
	equal(r.toNumber(), 1 / 2, '.toNumber()');
});
test('.toString()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toString(), '2/3', '.toString()');
});
module('Screen');
test('init', 2, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenConstructor';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenConstructor', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');

});



// Properties
test('.constructor', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenConstructor';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenConstructor', {});
	equal(screen.constructor, MathLib.Screen, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenType';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenType', {});
	equal(screen.type, 'screen', 'Testing .type');
});
module('Set');
test('init', 2, function () {
	var s1 = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			s2 = new MathLib.Set([3, new MathLib.Complex(1, 1), 3, new MathLib.Complex(1, 1)]);
	equal(s1.card, 5, 'Testing the cardinality');
	equal(s2.card, 2, 'Testing the cardinality');
});



// Properties
test('.constructor', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);
	equal(s.constructor, MathLib.Set, 'Testing .constructor');
});


test('.type', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);
	equal(s.type, 'set', 'Testing .type');
});
test('.compare()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			n = new MathLib.Set([1, 2, 3, 4, 5]);
	deepEqual(s.compare(s), 0, '.compare()');
	deepEqual(s.compare(m), -1, '.compare()');
	deepEqual(m.compare(n), -1, '.compare()');
});
test('.every()', 2, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([1, 3, 5, 7]);
	equal(s1.every(function (x) {
		return x % 2;
	}), false, '.every()');
	equal(s2.every(function (x) {
		return x % 2;
	}), true, '.every()');
});
test('.filter()', 1, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([1, 3]);

	deepEqual(s1.filter(function (x) {
		return x % 2;
	}), s2, '.filter()');
});
test('.forEach()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			arr = [];
	s.forEach(function (x) {
		arr.push(x);
	});
	
	deepEqual(arr, [1, 2, 3, 4], '.forEach()');
});
test('fromTo()', 1, function () {
	deepEqual(new MathLib.Set.fromTo(1, 5, 2), new MathLib.Set([1, 3, 5]), 'Testing new MathLib.Set.fromTo()');
});
test('.indexOf()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	deepEqual(s.indexOf(3), 2, '.indexOf()');
	deepEqual(s.indexOf(5), -1, '.indexOf()');
});
test('.insert()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.insert(1), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, front)');
	deepEqual(s.insert(3), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, existing)');
	deepEqual(s.insert(5), new MathLib.Set([1, 2, 3, 4, 5, 8, 9]), 'Testing .locate() (set, not existing)');
	deepEqual(s.insert(10), new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10]), 'Testing .locate() (set, back)');
});
test('.intersect()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	deepEqual(s.intersect(m), new MathLib.Set([1, 3]), '.intersect()');
	deepEqual(c1.intersect(c2), new MathLib.Set([1, new MathLib.Complex(1, 1)]), '.intersect()');
});
test('.isEmpty()', 3, function () {
	var m = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			n = new MathLib.Set(),
			o = new MathLib.Set([]);
	equal(m.isEmpty(), false, 'Testing .min()');
	equal(n.isEmpty(), true, 'Testing .min(3)');
	equal(o.isEmpty(), true, 'Testing .min(3)');
});
test('.isEqual()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			n = new MathLib.Set([1, 2, new MathLib.Complex([3, 0]), 4]);
	deepEqual(s.isEqual(s), true, '.isEqual()');
	deepEqual(s.isEqual(m), false, '.isEqual()');
	deepEqual(s.isEqual(n), false, '.isEqual()');
});
test('.isSubsetOf()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			m = new MathLib.Set([3, 8, 2]),
			n = new MathLib.Set([5, 8, 2]);

	equal(m.isSubsetOf(s), true, 'Testing .isSubsetOf()');
	equal(n.isSubsetOf(s), false, 'Testing .isSubsetOf()');
});
test('.locate()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(s.locate(1), 0, 'Testing .locate()');
	equal(s.locate(3), 1, 'Testing .locate()');
	equal(s.locate(5), 3, 'Testing .locate()');
	equal(s.locate(10), 5, 'Testing .locate()');
});
test('.map()', 2, function () {
	var p = new MathLib.Set([1, 2, 3]),
			q = new MathLib.Set([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'set', '.type should be set');
});
test('.plus()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 2, 3, 4, 5, 6]);
	equal(s.plus(), 10, 'Testing .plus() (set)');
	deepEqual(s.plus(2), new MathLib.Set([3, 4, 5, 6]), 'Testing .plus(int) (set)');
	deepEqual(s.plus(m), new MathLib.Set([2, 3, 4, 5, 6, 7, 8, 9, 10]), 'Testing .plus(set) (set)');
});
test('.powerset()', 1, function () {
	var s = MathLib.Set,
			m = new MathLib.Set([1, 2, 3]),
			n = new MathLib.Set([new s([]), new s([1]), new s([2]), new s([3]), new s([1, 2]), new s([1, 3]), new s([2, 3]), new s([1, 2, 3])]);
	deepEqual(m.powerset(), n, '.powerset()');
});
test('.reduce()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.reduce(function (old, cur) {
		return old * cur;
	}), 24, '.reduce()');
});
test('.remove()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.remove(3), new MathLib.Set([2, 4, 8, 9]), 'Testing .toArray()');
});

test('.some()', 2, function () {
	var s1 = new MathLib.Set([1, 2, 3, 4]),
			s2 = new MathLib.Set([2, 4, 6, 8]);
	equal(s1.some(function (x) {
		return x % 2;
	}), true, '.some()');
	equal(s2.some(function (x) {
		return x % 2;
	}), false, '.some()');
});

test('.times()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);
	equal(s.times(), 24, 'Testing .times() (set)');
	deepEqual(s.times(2), new MathLib.Set([2, 4, 6, 8]), 'Testing .times(int) (set)');
});
test('.toArray()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			n = new MathLib.Set();
	deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
	deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});
test('.toContentMathML()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toContentMathML(), '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (set)');
	equal(e.toContentMathML(), '<emptyset/>', 'Testing .toContentMathML() (empty set)');
});
test('.toLaTeX()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toLaTeX(), '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
	equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});
test('.toMathML()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toMathML(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (set)');
	equal(e.toMathML(), '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});
test('.toString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toString(), '{2, 3, 4, 8, 9}', 'Testing .toString() (set)');
	equal(e.toString(), '∅', 'Testing .toString() (empty set)');
});
test('.union()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 3]);

	deepEqual(s.union(m), new MathLib.Set([1, 2, 3, 4, 5, 7]), '.union()');
	deepEqual(s.union(c), new MathLib.Set([1, 2, 3, 4, new MathLib.Complex(0, 1), new MathLib.Complex(1, 1)]), '.union()');
});
test('.without()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	deepEqual(s.without(m), new MathLib.Set([2, 4]), '.without()');
	deepEqual(c1.without(c2), new MathLib.Set([2, new MathLib.Complex(0, 1)]), '.without()');
});
test('.xor()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	deepEqual(s.xor(m), new MathLib.Set([2, 4, 5, 7]), '.xor()');
	deepEqual(c1.xor(c2), new MathLib.Set([2, 3, new MathLib.Complex(0, 1), new MathLib.Complex(0, 2)]), '.xor()');
});
module('Vector');
test('init', 4, function () {
	var vector = new MathLib.Vector([1, 2, 3]);
	equal(vector.length, 3, 'Testing the dimension');
	equal(vector[0], 1, 'checking the entries');
	equal(vector[1], 2, 'checking the entries');
	equal(vector[2], 3, 'checking the entries');
});



// Properties
test('.constructor', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.constructor, MathLib.Vector, 'Testing .constructor');
});


test('.type', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.type, 'vector', 'Testing .type');
});
test('.areLinearIndependent()', 4, function () {
	var v1 = new MathLib.Vector([0, 0, 0]),
			v2 = new MathLib.Vector([1, 0, 0]),
			v3 = new MathLib.Vector([2, 0, 0]),
			v4 = new MathLib.Vector([0, 1, 0]),
			v5 = new MathLib.Vector([0, 0, 1]),
			v6 = new MathLib.Vector([0, 1]);
	equal(MathLib.Vector.areLinearIndependent([v1, v2]), false, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v2, v3]), false, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v2, v4, v5]), true, '.areLinearIndependent()');
	equal(MathLib.Vector.areLinearIndependent([v5, v6]), undefined, '.areLinearIndependent()');
});
test('.compare()', 3, function () {
	var v1 = new MathLib.Vector([1, 2]),
			v2 = new MathLib.Vector([1, 2, 3]),
			v3 = new MathLib.Vector([1, 2, 3]),
			v4 = new MathLib.Vector([1, 2, 1]);

	equal(v1.compare(v2), -1);
	equal(v2.compare(v3), 0);
	equal(v3.compare(v4), 1);
});
test('.every()', 2, function () {
	var p = new MathLib.Vector([1, 2, 3]);

	equal(p.every(function (x) {return x > 0; }), true, '.every()');
	equal(p.every(function (x) {return x < 0; }), false, '.every()');
});
test('.forEach()', 1, function () {
	var p = new MathLib.Vector([1, 2, 3]),
			str = '',
			f = function (x) {
				str += x;
			},
			res = p.forEach(f);

	deepEqual(str, '123', '.forEach()');
});
test('.isEqual()', 3, function () {
	var v = new MathLib.Vector([0, 1, 2]),
			w = new MathLib.Vector([0, 1, 2]),
			u = new MathLib.Vector([0, 0, 0]),
			x = new MathLib.Vector([0, 0, 0, 0]);
	equal(v.isEqual(w), true, '.isEqual()');
	equal(v.isEqual(u), false, '.isEqual()');
	equal(u.isEqual(x), false, '.isEqual()');
});
test('.isZero()', 2, function () {
	var v = new MathLib.Vector([0, 0, 0]),
			w = new MathLib.Vector([0, 0, 1]);
	equal(v.isZero(), true, '.isZero()');
	equal(w.isZero(), false, '.isZero()');
});
test('.map()', 2, function () {
	var p = new MathLib.Vector([1, 2, 3]),
			q = new MathLib.Vector([2, 4, 6]),
			f = function (x) {
				return 2 * x;
			},
			res = p.map(f);

	deepEqual(res, q, '.map()');
	equal(res.type, 'vector', '.type should be vector');
});
test('.minus()', 2, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);
	equal(v.minus(w).isEqual(new MathLib.Vector([2, -4, -5])), true, '.minus()');
	equal(v.minus(u), undefined, '.minus()');
});
test('.neagtive()', 1, function () {
	var v = new MathLib.Vector([3, 1, 4]);
	equal(v.negative().isEqual(new MathLib.Vector([-3, -1, -4])), true, '.negative()');
});
test('.norm()', 5, function () {
	var v = new MathLib.Vector([1, 2, -2]);
	equal(v.norm(), 3, '.norm()');
	equal(v.norm(2), 3, '.norm(2)');
	equal(v.norm(1), 5, '.norm(1)');
	equal(v.norm(3), 2.571281590658235, '.norm(3)');
	equal(v.norm(Infinity), 2, '.norm(Infinity)');
});
test('.outerProduct()', 1, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]);
	equal(v.outerProduct(w).isEqual(new MathLib.Matrix([[3, 15, 27], [1, 5, 9], [4, 20, 36]])), true, '.outerProduct()');
});
test('.plus()', 2, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);
	equal(v.plus(w).isEqual(new MathLib.Vector([4, 6, 13])), true, '.plus()');
	equal(v.plus(u), undefined, '.plus()');
});
test('.reduce()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			f = function (prev, cur) {
						return prev + cur;
					},
			res = v.reduce(f, 0);

	deepEqual(res, 6, '.reduce()');
});
test('.scalarProduct()', 3, function () {
	var v = new MathLib.Vector([3, 1, 4]),
			w = new MathLib.Vector([1, 5, 9]),
			u = new MathLib.Vector([1, 2]);

	equal(v.scalarProduct(w), 44, '.scalarProduct()');
	equal(u.scalarProduct(w), undefined, '.scalarProduct()');
	equal(v.scalarProduct(u), undefined, '.scalarProduct()');
});
test('.slice()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3, 4, 5]);
	deepEqual(v.slice(1, 3), [2, 3], '.slice()');
	equal(MathLib.type(v.slice(1, 3)), 'array', '.slice()');
});
test('.times()', 3, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			r = new MathLib.Rational(2, 3);

	deepEqual(v.times(3), new MathLib.Vector([3, 6, 9]), '.times(number)');
	deepEqual(v.times(m), new MathLib.Vector([30, 36, 42]), '.times(matrix)');
	deepEqual(v.times(r), new MathLib.Vector([2 / 3, 4 / 3, 6 / 3]), '.times(rational)');
});
test('.toArray()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	deepEqual(v.toArray(), [1, 2, 3], '.toArray()');
	equal(MathLib.type(v.toArray()), 'array', '.toArray()');
});
test('.toContentMathML()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toContentMathML(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', '.toContentMathML()');
});
test('.toLaTeX()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});
test('.toMathML()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});
test('.toString()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toString(), '(1, 2, 3)', '.toString()');
});
test('.vectorProduct()', 3, function () {
	var v = new MathLib.Vector([1, 2, 3]),
			w = new MathLib.Vector([-7, 8, 9]),
			u = new MathLib.Vector([1, 2]),
			res = new MathLib.Vector([-6, -30, 22]);
	equal(v.vectorProduct(w).isEqual(res), true, '.vectorProduct()');
	equal(u.vectorProduct(w), undefined, '.vectorProduct()');
	equal(v.vectorProduct(u), undefined, '.vectorProduct()');
});
test('zero()', 1, function () {
	var v = new MathLib.Vector.zero(3);
	equal(v.isZero(), true, 'testing zero vector');
});