/*! MathLib v0.3.5 MathLib.de | MathLib.de/en/license */
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
	equal(MathLib.is({}, 'null'), false);
	equal(MathLib.is(null, 'null'), true);
	equal(MathLib.is(undefined, 'undefined'), true);
});
test('.type()', 11, function () {
	equal(MathLib.type(new MathLib.Complex([2, 3])), 'complex', 'MathLib.type(MathLib.complex([2, 3])) = "complex"');
	equal(MathLib.type(42), 'number', 'MathLib.type(42) = "number"');
	equal(MathLib.type(['ar', 'ray']), 'array', 'MathLib.type([1,2]) = "array"');
	equal(MathLib.type({ob: 'ject'}), 'object', 'MathLib.type({obj: 42}) = "object"');
	equal(MathLib.type(true), 'boolean', 'MathLib.type(true) = "boolean"');
	equal(MathLib.type('string'), 'string', 'MathLib.type("str") = "string"');
	equal(MathLib.type(function () {}), 'function', 'MathLib.type(function(){}) = "function"');
	equal(MathLib.type(/regexp/), 'regexp', 'MathLib.type(/regexp/) = "regexp"');
	equal(MathLib.type(document.getElementsByTagName('div')[0]), 'htmldivelement', 'MathLib.type(document.getElementsByTagName("div")[0]) = "htmldivelement"');
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
test('.draw()', 2, function () {
	var screenSVG, screenCanvas,
			divSVG = document.createElement('div'),
			divCanvas = document.createElement('div'),
			circle = new MathLib.Circle([0, 0], 1);

	divSVG.id = 'circleDrawSVG';
	divCanvas.id = 'circleDrawCanvas';
	document.getElementById('testPlots').appendChild(divSVG);
	document.getElementById('testPlots').appendChild(divCanvas);

	screenSVG = new MathLib.Screen2D('circleDrawSVG', {renderer: 'SVG', grid: false, axis: false, contextMenu: false});
	screenCanvas = new MathLib.Screen2D('circleDrawCanvas', {renderer: 'Canvas'});

	equal(circle.draw(screenSVG), circle, 'The draw method should return the circle.');
	equal(circle.draw(screenCanvas), circle, 'The draw method should return the circle.');

});


/*
test('.draw() (SVG)', 1, function () {
	// The atttributes have different ordering in Firefox and Chrome.
	equal(divSVG.innerHTML, '<figure class="MathLib_figure"><div class="MathLib_wrapper" style="width: 500px; height: 500px"><svg class="MathLib_screen" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="500px" width="500px" version="1.1" stroke="#000000" stroke-opacity="1" fill="#ffffff" fill-opacity="0"><g transform="matrix(250,0,0,-250,250,250)"></g><g transform="matrix(250,0,0,-250,250,250)" stroke="#cccccc" stroke-width="0.008"></g><g transform="matrix(250,0,0,-250,250,250)" stroke="#000000" stroke-width="0.008"></g><g transform="matrix(250,0,0,-250,250,250)"><circle cx="0" cy="0" r="1" stroke-width="0.008"></circle></g></svg></div></figure><div class="MathLib_contextMenuOverlay"><menu class="MathLib_menu MathLib_mainmenu"></menu></div>', 'Testing the generated SVG code');
});
*/


asyncTest('.draw() (Canvas)', 1, function (assert) {
	var screenCanvas,
			divCanvas = document.createElement('div'),
			c1 = new MathLib.Circle([0, 0], 1),
			c2 = new MathLib.Circle([0, 0], 0.75),
			c3 = new MathLib.Circle([0, 0], 0.5),
			c4 = new MathLib.Circle([-0.1, 0], 0.2),
			c5 = new MathLib.Circle([0.1, 0], 0.2);


	divCanvas.id = 'circleDraw2Canvas';
	document.getElementById('testPlots').appendChild(divCanvas);

	screenCanvas = new MathLib.Screen2D('circleDraw2Canvas', {renderer: 'Canvas', width: 300, height: 300});

	c1.draw(screenCanvas);
	c2.draw(screenCanvas, {lineColor: 0xff0000, dash: [0.35, 0.1], dashOffset: 0.1});
	c3.draw(screenCanvas, {lineWidth: 10, lineColor: 'orange', dash: [0.045]});
	c4.draw(screenCanvas, {color: '#0000bb'});
	c5.draw(screenCanvas, {color: 'rgba(0, 255, 0, 0.5)'});

	assert.imageEqual(screenCanvas.layer.main.element, 'data:image/png;base64,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');
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
test('.toContentMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toContentMathMLString(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
	equal(d.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
	equal(e.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
	equal(f.toContentMathMLString(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
	equal(g.toContentMathMLString(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
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
test('.toMathMLString()', 5, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);
	equal(c.toMathMLString(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
	equal(d.toMathMLString(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
	equal(e.toMathMLString(), '<mn>4</mn>', 'Complex part is zero.');
	equal(f.toMathMLString(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
	equal(g.toMathMLString(), '<mn>0</mn>', 'Number is zero.');
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
test('.binomial()', 4, function () {
	equal(MathLib.binomial(0, 0), 1);
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
	equal(MathLib.cosh(1), 1.5430806348152437, 'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
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
test('.draw()', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'functnDraw';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen2D('functnDraw', {});

	equal(MathLib.sin.draw(screen), MathLib.sin, 'The draw method should return the functn.');
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
	equal(MathLib.exp(1), Math.E, 'Spec. 4: otherwise MathLib.exp(x) = e^x');
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
	equal(MathLib.sech(1), 0.6480542736638855, 'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
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
test('.toContentMathML()', 1, function () {
	equal(MathLib.sin.toContentMathML().type, 'MathML', 'type of MathLib.sin.toContentMathML() should be MathML');
});
test('.toContentMathMLString()', 6, function () {
	equal(MathLib.sin.toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>', 'MathLib.sin.toContentMathMLString()');
	equal(MathLib.exp(MathLib.sin).toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.exp(MathLib.sin).toContentMathMLString()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.pow(MathLib.sin, 2).toContentMathMLString()');
	equal(MathLib.plus(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.plus(MathLib.sin, 2).toContentMathMLString()');
	equal(MathLib.plus(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><plus/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(2, MathLib.sin).toContentMathMLString()');
	equal(MathLib.times(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><times/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.times(2, MathLib.sin).toContentMathMLString()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><reals/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><apply><cos/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString()');
});
test('.toLaTeX()', 7, function () {
	equal(MathLib.sin.toLaTeX(), '\\sin(x)', 'MathLib.sin.toLaTeX() should be sin(x)');
	equal(MathLib.sin.toLaTeX('z'), '\\sin(z)', 'custom bound variable');
	equal(MathLib.exp(MathLib.sin).toLaTeX(), '\\exp(\\sin(x))', 'MathLib.exp(MathLib.sin).toLaTeX() should be exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), '\\sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), '2+\\sin(x)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), '2*\\sin(x)', 'MathLib.times(2, MathLib.sin).toLaTeX() = 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), '\\sin(x)+\\cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = sin(x)+cos(x)');
});
test('.toMathMLString()', 6, function () {
	equal(MathLib.sin.toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></math>', 'MathLib.sin.toMathML()');
	equal(MathLib.exp(MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>exp</mi><mo>&af;</mo><mfenced><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mfenced></mrow></math>', 'MathLib.exp(MathLib.sin).toMathML()');
	// equal(MathLib.pow(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2</mn></msup></mrow></math>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mn>2</mn></mrow></math>', 'MathLib.plus(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(2, MathLib.sin).toMathML()');
	equal(MathLib.times(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>*</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.times(2, MathLib.sin).toMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});
test('.toString()', 7, function () {
	equal(MathLib.sin.toString(), 'sin(x)', 'MathLib.sin.toString() should be sin(x)');
	equal(MathLib.sin.toString('z'), 'sin(z)', 'custom bound variable');
	equal(MathLib.exp(MathLib.sin).toString(), 'exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), '2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), '2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = sin(x)+cos(x)');
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


test('.toMathMLString()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.toString(), '(3, 2, 1)', '.toString()');
});

module('MathML');
test('init', 2, function () {
	var mathML = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix></math>'),
			nodeList = [],
			cur = mathML;

	while (cur.nextNode) {
		cur = cur.nextNode;
		nodeList.push(cur.nodeName);
	}
	equal(typeof mathML, 'object', 'Testing typeof the MathML');
	deepEqual(nodeList, ['matrix', 'matrixrow', 'cn', '#text', 'cn', '#text', 'matrixrow', 'cn', '#text', 'cn', '#text'], 'Checking if the MathML was tokenized right.');
});


test('whitespaces', 2, function () {
	var mathML = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs>String with spaces</cs> </set>\t</math>'),
			nodeList = [],
			cur = mathML;

	while (cur.nextNode) {
		cur = cur.nextNode;
		nodeList.push(cur.nodeName);
	}
	deepEqual(nodeList, ['set', 'cn', '#text', 'cs', '#text', '#text'], 'Checking if the MathML was tokenized right.');
	equal(mathML.childNodes[0].childNodes[1].innerMathML, 'String with spaces');
});



// Properties
test('.constructor', 1, function () {
	var m = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
	deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor');
});


test('.type', 1, function () {
	var m = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
	equal(m.type, 'MathML', 'Testing .type');
});



// Methods
test('.parse() boolean', 8, function () {
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><true/></apply></math>').parse(), true, '</and> true true');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><false/><true/></apply></math>').parse(), false, '</and> true false true');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><false/><false/></apply></math>').parse(), false, '</or> false false');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><true/><false/><true/></apply></math>').parse(), true, '</or> true false true');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><false/><true/></apply></math>').parse(), true, '</xor> false false');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><true/><false/><true/></apply></math>').parse(), false, '</xor> true false true');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><false/></apply></math>').parse(), true, '</not> false');
	equal(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><true/></apply></math>').parse(), false, '</not> true');
});


test('.parse() ci', 1, function () {
	MathLib.MathML.variables.n = 42;
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><ci>n</ci></math>').parse(), 42, '.parse() a normal number');
});


test('.parse() cn', 5, function () {
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34</cn></math>').parse(), 34, '.parse() a normal number');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>34.2</cn></math>').parse(), 34.2, '.parse() a normal number');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>.123</cn></math>').parse(), 0.123, '.parse() a normal number');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34E-12</cn></math>').parse(), 34e-12, '.parse() a normal number');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34.345E-12</cn></math>').parse(), 34.345e-12, '.parse() a normal number');
});


test('.parse() complex', 2, function () {
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>').parse(), new MathLib.Complex(3, 4), '.parse() complex (cartesian)');
	ok(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn></math>').parse().isEqual(new MathLib.Complex(-1, 0)), '.parse() complex (polar)');
});


test('.parse() function constructing', 6, function () {
	var expsin = new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>').parse();

	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>').parse()(0), 0, '.parse() sin');
	deepEqual(expsin(0), 1, 'exp(sin(0)) = 1');
	deepEqual(expsin.type, 'functn', 'exp(sin(x)).type');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>').parse()(42), 42, 'The identity function');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><ci>x</ci><ci>y</ci></apply></lambda></math>').parse()(4, 2), 16, 'Function with two arguments');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').parse()(42), 1, 'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parse() function evaluation', 5, function () {
	MathLib.MathML.variables.n = 42;

	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><cn>42</cn></apply></math>').parse(), Math.sin(42), '.parse() apply');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><ci>n</ci></apply></math>').parse(), Math.sin(42), '.parse() sin');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').parse(), 6, 'plus');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><ln/><cn>42</cn></apply></math>').parse(), Math.log(42), '.parse() apply');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><factorial/><cn>6</cn></apply></math>').parse(), 720, 'factorial');
});


test('.parse() matrix', 2, function () {
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>').parse(), new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply></math>').parse(), -360, '.parse() apply');
});


test('.parse() set', 4, function () {
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').parse(), MathLib.Set.fromTo(1, 10), '.parse() set');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set></math>').parse(), new MathLib.Set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').parse(), new MathLib.Set([1, 2, 3]), 'set union');
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').parse(), new MathLib.Set(['A', 'B', ' ']), '.parse() set');
});


test('.parse() vector', 1, function () {
	deepEqual(new MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').parse(), new MathLib.Vector([1, 2, 3]), '.parse() vector');
});

	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn><cn>16</cn></apply></math>').parse(), 18, 'binary minus');
	// deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn></apply></math>').parse(), -34, 'unary minus');

test('.toString()', 2, function () {
	var s1 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><ci>x</ci><cn>2</cn></apply><apply><power/><ci>x</ci><cn>3</cn></apply></apply></lambda></math>',
			s2 = '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>a</mi><mo>&InvisibleTimes;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi><mo>+</mo><mi>c</mi></mrow></math>';
	equal(new MathLib.MathML(s1).toString(), s1);
	equal(new MathLib.MathML(s2).toString(), s2);
});



// Static methods
// TODO: test if the result is right
test('.isSupported()', 1, function () {
	var supp = MathLib.MathML.isSupported();
	ok(supp === true || supp === false, '.isEqual()');
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
	var m = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
			n = new MathLib.Matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
			res1 = new MathLib.Matrix([[1, 2, 3], [1, -1, -2], [3, 3, -2]]),
			res2 = new MathLib.Matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

	deepEqual(m.LU(true), res1, 'LU decomposition');
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


test('.toContentMathMLString()', 1, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]);
	deepEqual(m.toContentMathMLString(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathMLString()');
});


test('.toLaTeX()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toMathMLString(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathMLString()');
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



// Methods
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


test('.times()', 1, function () {
	var p = new MathLib.Permutation([2, 0, 1]),
			q = new MathLib.Permutation([0, 2, 1]);
	deepEqual(p.times(q), new MathLib.Permutation([2, 1, 0]), 'Testing .times()');
});


test('.sgn()', 2, function () {
	var p = new MathLib.Permutation([[0, 1], [1, 2]]),
			q = new MathLib.Permutation([[0, 1], [1, 2, 3]]);
	equal(p.sgn(), 1, 'Testing .sgn()');
	equal(q.sgn(), -1, 'Testing .sgn()');
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



// Static Methods
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
test('.draw()', 1, function () {
	var screen,
			div = document.createElement('div'),
			point = new MathLib.Point([0, 0, 1]);

	div.id = 'pointDraw';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen2D('pointDraw', {});

	equal(point.draw(screen), point, 'The draw method should return the point.');
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
test('.toMathMLString()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);
	equal(point.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
	equal(point.toMathMLString(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
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
test('.toContentMathMLString()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', '.toContentMathMLString()');
	deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', '.toContentMathMLString()');
});
test('.toFunctn()', 3, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			f = p.toFunctn(),
			sinf = MathLib.sin(f);

	equal(f.type, 'functn', '.type should be functn');
	equal(sinf.toString(), 'sin(3*x^2+2*x+1)', 'composition with other functions');
	equal(f(42), 5377, 'fuctn evaluation');
});
test('.toLaTeX()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toLaTeX(), '3x^{2}+2x+1', '.toLaTeX()');
	deepEqual(q.toLaTeX(), '1x^{2}-1', '.toLaTeX()');
});
test('.toMathMLString()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toMathMLString(), '<mrow><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', '.toMathMLString()');
	deepEqual(q.toMathMLString(), '<mrow><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', '.toMathMLString()');
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
test('.toContentMathMLString()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toContentMathMLString(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathMLString()');
});
test('.toLaTeX()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toLaTeX(), '\\frac{2}{3}', '.toLaTeX()');
});
test('.toMathMLString()', 1, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toMathMLString(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathMLString()');
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
test('init', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	equal(s.card, 5, 'Testing the cardinality');
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



// Methods
test('.compare()', 3, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			n = new MathLib.Set([1, 2, 3, 4, 5]);
	deepEqual(s.compare(s), 0, '.compare()');
	deepEqual(s.compare(m), -1, '.compare()');
	deepEqual(m.compare(n), -1, '.compare()');
});


test('.insert()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.insert(1), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, front)');
	deepEqual(s.insert(3), new MathLib.Set([1, 2, 3, 4, 8, 9]), 'Testing .locate() (set, existing)');
	deepEqual(s.insert(5), new MathLib.Set([1, 2, 3, 4, 5, 8, 9]), 'Testing .locate() (set, not existing)');
	deepEqual(s.insert(10), new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10]), 'Testing .locate() (set, back)');
});


test('.intersect()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]);
	deepEqual(s.intersect(m), new MathLib.Set([1, 3]), 'Testing .intersect() (set)');
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
			n = new MathLib.Set([new s(), new s([1]), new s([2]), new s([3]), new s([1, 2]), new s([1, 3]), new s([2, 3]), new s([1, 2, 3])]);
	deepEqual(m.powerset(), n, '.powerset()');
});


test('.remove()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	deepEqual(s.remove(3), new MathLib.Set([2, 4, 8, 9]), 'Testing .toArray()');
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


test('.toContentMathMLString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toContentMathMLString(), '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (set)');
	equal(e.toContentMathMLString(), '<emptyset/>', 'Testing .toContentMathMLString() (empty set)');
});


test('.toLaTeX()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toLaTeX(), '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
	equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathMLString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toMathMLString(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathMLString() (set)');
	equal(e.toMathMLString(), '<mi>&#x2205;</mi>', 'Testing .toMathMLString() (empty set)');
});


test('.toString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toString(), '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
	equal(e.toString(), '∅', 'Testing .toString() (empty set)');
});


test('.union()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]);
	deepEqual(s.union(m), new MathLib.Set([1, 2, 3, 4, 5, 7]), 'Testing .union() (set)');
});


test('.without()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]);
	deepEqual(s.without(m), new MathLib.Set([2, 4]), 'Testing .without() (set)');
});


test('.xor()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]);
	deepEqual(s.xor(m), new MathLib.Set([2, 4, 5, 7]), 'Testing .xor() (set)');
});



// Static methods
test('fromTo()', 1, function () {
	deepEqual(new MathLib.Set.fromTo(1, 5, 2), new MathLib.Set([1, 3, 5]), 'Testing new MathLib.Set.fromTo()');
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
test('.toContentMathMLString()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toContentMathMLString(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', '.toContentMathML()String');
});
test('.toLaTeX()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});
test('.toMathMLString()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);
	equal(v.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
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