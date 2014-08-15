/*!
 * MathLib JavaScript Library v0.7.3
 * http://mathlib.de/
 *
 * Copyright 2012 - 2014 Alexander Zeilmann
 * Released under the MIT license
 * http://mathlib.de/en/license
 *
 * build date: 2014-08-15
 */

require(['../build/amd/MathLib.js'], function(MathLib) {
module('MathLib');
test('general', 1, function () {
	equal(typeof MathLib, 'object', 'is MathLib defined');
});
test('.compare()', 3, function () {
	equal(MathLib.compare(12, 12), 0);
	equal(MathLib.compare(1, 2), -1);
	equal(MathLib.compare(23, new MathLib.Complex(3, 4)), 1);
});
test('.extendObject()', 1, function () {
	var dest = {
		a: 'a',
		b: 'b',
		c: {
			d: 'cd',
			e: 'ce'
		},
		f: {
			g: 'fg',
			h: 'fh'
		},
		m: {
			n: 'mn',
			o: {
				p: 'mop',
				q: 'moq'
			}
		}
	},
	src = {
		a: 'a_',
		c: {
			d: 'cd_'
		},
		f: 'f_',
		m: {
			n: 'mn_',
			o: {
				p: 'mop_'
			}
		}
	},
	res = {
		a: 'a_',
		b: 'b',
		c: {
			d: 'cd_',
			e: 'ce'
		},
		f: 'f_',
		m: {
			n: 'mn_',
			o: {
				p: 'mop_',
				q: 'moq'
			}
		}
	};

	deepEqual(MathLib.extendObject(dest, src), res);
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
test('.isNative()', 2, function () {
	Math.isNativeCheck = function () {
		return 42;
	};

	equal(MathLib.isNative(Math.sin), Math.sin, 'isNative of native method');
	equal(MathLib.isNative(Math.isNativeCheck), false, 'isNative of non native method');

	delete Math.isNativeCheck;
});
test('.off()', 1, function () {
	var i = 0,
			callback = function () {
				i++;
			};

	MathLib.on('error', callback);
	MathLib.on('warning', callback);

	MathLib.off('error', callback);
	MathLib.off('warning', callback);

	MathLib.error({});
	MathLib.warning({});

	equal(i, 0, 'check if callbacks are unbound');
});
test('.on()', 1, function () {
	var i = 0,
			callback = function () {
				i++;
			};

	MathLib.on('error', callback);
	MathLib.on('warning', callback);

	MathLib.error({});
	MathLib.warning({});

	equal(i, 2, 'check if callbacks are getting called');

	MathLib.off('error', callback);
	MathLib.off('warning', callback);
});
test('.toContentMathML()', 20, function () {
	equal(MathLib.toContentMathML([1, 2, [3, 4], new MathLib.Rational(1, 2)]),
		'<list><cn type="double">1</cn><cn type="double">2</cn><list><cn type="double">3</cn>' +
		'<cn type="double">4</cn></list><cn type="rational">1<sep/>2</cn></list>');
	equal(MathLib.toContentMathML([1, 2, [3, 4], new MathLib.Rational(1, 2)], {strict: true}),
		'<apply><csymbol cd="list1">list</csymbol><cn type="double">1</cn><cn type="double">2</cn>' +
		'<apply><csymbol cd="list1">list</csymbol><cn type="double">3</cn><cn type="double">4</cn>' +
		'</apply><apply><csymbol cd="nums1">rational</csymbol><cn type="double">1</cn><cn type="double">' +
		'2</cn></apply></apply>');

	equal(MathLib.toContentMathML(NaN), '<notanumber/>');
	equal(MathLib.toContentMathML(NaN, {strict: true}), '<csymbol cd="nums1">NaN</csymbol>');

	equal(MathLib.toContentMathML(Infinity), '<infinity/>');
	equal(MathLib.toContentMathML(Infinity, {strict: true}), '<csymbol cd="nums1">infinity</csymbol>');

	equal(MathLib.toContentMathML(-Infinity), '<apply><times/><cn>-1</cn><infinity/></apply>');
	equal(MathLib.toContentMathML(-Infinity, {strict: true}), '<apply><csymbol cd="arith1">times' +
		'</csymbol><cn>-1</cn><csymbol cd="nums1">infinity</csymbol></apply>');

	equal(MathLib.toContentMathML(123), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 10}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 2}), '<cn type="real" base="2">1111011</cn>');

	equal(MathLib.toContentMathML(123, {strict: true}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 10, strict: true}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 2, strict: true}), '<apply><csymbol cd="nums1">based_float' +
		'</csymbol><cn type="integer">2</cn><cs>1111011</cs></apply>');

	equal(MathLib.toContentMathML(true), '<true/>');
	equal(MathLib.toContentMathML(false), '<false/>');
	equal(MathLib.toContentMathML(true, {strict: true}), '<csymbol cd="logic1">true</csymbol>');
	equal(MathLib.toContentMathML(false, {strict: true}), '<csymbol cd="logic1">false</csymbol>');
	equal(MathLib.toContentMathML('MathLib'), '<cs>MathLib</cs>');

	equal(MathLib.toContentMathML(new MathLib.Rational(1, 2)), '<cn type="rational">1<sep/>2</cn>');
});
test('.toLaTeX()', 22, function () {
	equal(MathLib.toLaTeX([1, 2, [3, 4], new MathLib.Rational(1, 2)]), '[1,2,[3,4],\\frac{1}{2}]');

	equal(MathLib.toLaTeX(NaN), '\\text{ NaN }');
	equal(MathLib.toLaTeX(Infinity), '\\infty');
	equal(MathLib.toLaTeX(-Infinity), '-\\infty');

	equal(MathLib.toLaTeX(123), '123');
	equal(MathLib.toLaTeX(-123), '-123');

	equal(MathLib.toLaTeX(123, {sign: true}), '+123');
	equal(MathLib.toLaTeX(-123, {sign: true}), '-123');

	equal(MathLib.toLaTeX(123, {base: 2}), '1111011');
	equal(MathLib.toLaTeX(-123, {base: 2}), '-1111011');
	equal(MathLib.toLaTeX(123, {base: 2, sign: true}), '+1111011');
	equal(MathLib.toLaTeX(-123, {base: 2, sign: true}), '-1111011');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true}), '1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true}), '-1111011_{2}');

	equal(MathLib.toLaTeX(123, {base: 2, baseSubscript: true, sign: true}), '+1111011_{2}');
	equal(MathLib.toLaTeX(-123, {base: 2, baseSubscript: true, sign: true}), '-1111011_{2}');

	equal(MathLib.toLaTeX(true), '\\text{ true }');
	equal(MathLib.toLaTeX(false), '\\text{ false }');
	equal(MathLib.toLaTeX('MathLib'), '\\texttt{"MathLib"}');
	equal(MathLib.toLaTeX('MathLib', {quotes: ['\'', '\'']}), '{\\ttfamily\\char\'15}\\texttt{MathLib}{\\ttfamily\\char\'15}');
	equal(MathLib.toLaTeX('# $ % ^ & _ { } ~ \\'), '\\texttt{"\\# \\$ \\% \\^{} \\& \\_ \\{ \\} \\~{} \\textbackslash{}"}');

	equal(MathLib.toLaTeX(new MathLib.Rational(1, 2)), '\\frac{1}{2}');
});
test('.toMathML()', 21, function () {
	equal(MathLib.toMathML([1, 2, [3, 4], new MathLib.Rational(1, 2)]),
		'<mrow><mo>[</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>,</mo><mrow><mo>[</mo>' +
		'<mn>3</mn><mo>,</mo><mn>4</mn><mo>]</mo></mrow><mo>,</mo><mfrac><mn>1' +
		'</mn><mn>2</mn></mfrac><mo>]</mo></mrow>');

	equal(MathLib.toMathML(NaN), '<mi>NaN</mi>');
	equal(MathLib.toMathML(Infinity), '<mi>&#x221e;</mi>');
	equal(MathLib.toMathML(-Infinity), '<mrow><mo>-</mo><mi>&#x221e;</mi></mrow>');

	equal(MathLib.toMathML(123), '<mn>123</mn>');
	equal(MathLib.toMathML(-123), '<mn>-123</mn>');

	equal(MathLib.toMathML(123, {sign: true}), '<mo>+</mo><mn>123</mn>');
	equal(MathLib.toMathML(-123, {sign: true}), '<mo>-</mo><mn>123</mn>');

	equal(MathLib.toMathML(123, {base: 2}), '<mn>1111011</mn>');
	equal(MathLib.toMathML(-123, {base: 2}), '<mn>-1111011</mn>');

	equal(MathLib.toMathML(123, {base: 2, sign: true}), '<mo>+</mo><mn>1111011</mn>');
	equal(MathLib.toMathML(-123, {base: 2, sign: true}), '<mo>-</mo><mn>1111011</mn>');

	equal(MathLib.toMathML(123, {base: 2, baseSubscript: true}), '<msub><mn>1111011</mn><mn>2</mn></msub>');
	equal(MathLib.toMathML(-123, {base: 2, baseSubscript: true}), '<msub><mn>-1111011</mn><mn>2</mn></msub>');

	equal(MathLib.toMathML(123, {base: 2, baseSubscript: true, sign: true}),
		'<mo>+</mo><msub><mn>1111011</mn><mn>2</mn></msub>');
	equal(MathLib.toMathML(-123, {base: 2, baseSubscript: true, sign: true}),
		'<mo>-</mo><msub><mn>1111011</mn><mn>2</mn></msub>');

	equal(MathLib.toMathML(true), '<mi>true</mi>');
	equal(MathLib.toMathML(false), '<mi>false</mi>');
	equal(MathLib.toMathML('MathLib'), '<ms>MathLib</ms>');
	equal(MathLib.toMathML('MathLib', {quotes: ['\'', '\'']}), '<ms lquote="\'" rquote="\'">MathLib</ms>');

	equal(MathLib.toMathML(new MathLib.Rational(1, 2)), '<mfrac><mn>1</mn><mn>2</mn></mfrac>');
});
test('.toString()', 21, function () {
	equal(MathLib.toString([1, 2, [3, 4], new MathLib.Rational(1, 2)]), '[1,2,[3,4],1/2]');

	equal(MathLib.toString(NaN), 'NaN');
	equal(MathLib.toString(Infinity), 'Infinity');
	equal(MathLib.toString(-Infinity), '-Infinity');

	equal(MathLib.toString(123), '123');
	equal(MathLib.toString(-123), '-123');

	equal(MathLib.toString(123, {sign: true}), '+123');
	equal(MathLib.toString(-123, {sign: true}), '-123');

	equal(MathLib.toString(123, {base: 2}), '1111011');
	equal(MathLib.toString(-123, {base: 2}), '-1111011');
	equal(MathLib.toString(123, {base: 2, sign: true}), '+1111011');
	equal(MathLib.toString(-123, {base: 2, sign: true}), '-1111011');

	equal(MathLib.toString(123, {base: 2, baseSubscript: true}), '1111011&#x2082;');
	equal(MathLib.toString(-123, {base: 2, baseSubscript: true}), '-1111011&#x2082;');

	equal(MathLib.toString(123, {base: 2, baseSubscript: true, sign: true}), '+1111011&#x2082;');
	equal(MathLib.toString(-123, {base: 2, baseSubscript: true, sign: true}), '-1111011&#x2082;');

	equal(MathLib.toString(true), 'true');
	equal(MathLib.toString(false), 'false');
	equal(MathLib.toString('MathLib'), '"MathLib"');
	equal(MathLib.toString('MathLib', {quotes: ['\'', '\'']}), '\'MathLib\'');

	equal(MathLib.toString(new MathLib.Rational(1, 2)), '1/2');
});
test('.type()', 10, function () {
	equal(MathLib.type(new MathLib.Complex(2, 3)), 'complex', 'MathLib.type(MathLib.complex(2, 3)) = "complex"');
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
test('.version', 1, function () {
	ok(/\d+\.\d+\.\d+/.test(MathLib.version));
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
module('CoercionError');
test('init', 2, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.message, 'message', 'Testing .message');
	equal(e.method, 'method', 'Testing .method');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.constructor, MathLib.CoercionError, 'Testing .constructor');
});


test('.type', 1, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.type, 'coercionError', 'Testing .type');
});


test('intanceof', 2, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	ok(e instanceof MathLib.CoercionError, 'instanceof MathLib.CoercionError');
	ok(e instanceof Error, 'instanceof Error');
});

module('Complex');
test('init (1 Number)', 2, function () {
	var c = new MathLib.Complex(3);
	equal(c.re, 3, 'Testing the real part');
	equal(c.im, 0, 'Testing the imaginary part');
});

test('init (2 Numbers)', 10, function () {
	var c1 = new MathLib.Complex(Infinity, 2),
			c2 = new MathLib.Complex(-Infinity, 2),
			c3 = new MathLib.Complex(NaN, 2),
			c4 = new MathLib.Complex(2, NaN),
			c5 = new MathLib.Complex(1, 2);

	equal(c1.re, Infinity, 'Testing the real part');
	equal(c1.im, Infinity, 'Testing the imaginary part');
	equal(c2.re, Infinity, 'Testing the real part');
	equal(c2.im, Infinity, 'Testing the imaginary part');
	ok(MathLib.isNaN(c3.re), 'Testing the real part');
	ok(MathLib.isNaN(c3.im), 'Testing the imaginary part');
	ok(MathLib.isNaN(c4.re), 'Testing the real part');
	ok(MathLib.isNaN(c4.im), 'Testing the imaginary part');
	equal(c5.re, 1, 'Testing the real part');
	equal(c5.im, 2, 'Testing the imaginary part');
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
test('.characteristic()', 1, function () {
	ok(MathLib.Complex.characteristic().isEqual(new MathLib.Integer(0)));
});
test('.polar()', 8, function () {
	equal(MathLib.Complex.polar(Infinity).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, NaN).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, Infinity).re, Infinity);
	equal(MathLib.Complex.polar(Infinity, 0).re, Infinity);

	ok(MathLib.isPosZero(MathLib.Complex.polar(1, +0).im));
	ok(MathLib.isNegZero(MathLib.Complex.polar(1, -0).im));
	ok(MathLib.isEqual(MathLib.Complex.polar(2, 3), new MathLib.Complex(-1.9799849932008909145, 0.2822400161197344442)));

	// Chrome implemented sin, cos & tan in a new way:
	// https://codereview.chromium.org/70003004/
	// While the new implementation is faster, it is also not acurate.
	// I expect the bug to be fixed soon and it isn't causing major problems,
	// I will only modify the test now and not the code.
	// Affected tests:
	// Complex.polar, Complex#cosh, Complex#sinh
	//
	// More information:
	// https://code.google.com/p/v8/issues/detail?id=3006
	if (Math.cos(-5) === 0.2836621854632259) {
		ok(MathLib.isEqual(MathLib.Complex.polar(4, -5), new MathLib.Complex(1.1346487418529037, 3.835697098652549)));
	}
	else {
		ok(MathLib.isEqual(MathLib.Complex.polar(4, -5), new MathLib.Complex(1.1346487418529050579, 3.8356970986525538756)));
	}
});
test('.toContentMathML()', 2, function () {
	equal(MathLib.Complex.toContentMathML(), '<complexes/>');
	equal(MathLib.Complex.toContentMathML({strict: true}), '<csymbol cd="setname1">C</csymbol>');
});
test('.toLaTeX()', 1, function () {
	equal(MathLib.Complex.toLaTeX(), 'Complex Field $\\mathbb{C}$');
});
test('.toMathML()', 1, function () {
	equal(MathLib.Complex.toMathML(), '<mrow><mtext>Complex Field</mtext><mi mathvariant="double-struck">C</mi></mrow>');
});
test('.toString()', 1, function () {
	equal(MathLib.Complex.toString(), 'Complex Field ℂ');
});
test('.abs()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).abs()));
	equal((new MathLib.Complex(Infinity)).abs(), Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(0, 0)).abs(), 0), 'Absolut value of a complex number');
	ok(MathLib.isEqual((new MathLib.Complex(3, 4)).abs(), 5), 'Absolut value of a complex number');
});
test('.arccos()', 26, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arccos(),
			n2n0 = (new MathLib.Complex(-2, -0)).arccos(),
			n1p0 = (new MathLib.Complex(-1, +0)).arccos(),
			n1n0 = (new MathLib.Complex(-1, -0)).arccos(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccos(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccos(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccos(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccos(),
			p1p0 = (new MathLib.Complex(1, +0)).arccos(),
			p1n0 = (new MathLib.Complex(1, -0)).arccos(),
			p2p0 = (new MathLib.Complex(2, +0)).arccos(),
			p2n0 = (new MathLib.Complex(2, -0)).arccos();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccos().re));
	equal((new MathLib.Complex(Infinity)).arccos().re, Infinity);


	ok(MathLib.isEqual(n2p0, new MathLib.Complex(Math.PI, -1.3169578969248167086)));
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(Math.PI, +1.3169578969248167086)));

	ok(MathLib.isEqual(n1p0.re, Math.PI));
	ok(MathLib.isNegZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, Math.PI));
	ok(MathLib.isPosZero(n1n0.im));


	ok(MathLib.isEqual(p0p0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(p0p0.im));
	ok(MathLib.isEqual(p0n0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(p0n0.im));
	ok(MathLib.isEqual(n0p0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(n0p0.im));
	ok(MathLib.isEqual(n0n0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(n0n0.im));


	ok(MathLib.isPosZero(p1p0.re));
	ok(MathLib.isNegZero(p1p0.im));
	ok(MathLib.isPosZero(p1n0.re));
	ok(MathLib.isPosZero(p1n0.im));

	ok(MathLib.isPosZero(p2p0.re));
	ok(MathLib.isEqual(p2p0.im, -1.3169578969248167086));
	ok(MathLib.isPosZero(p2n0.re));
	ok(MathLib.isEqual(p2n0.im, 1.3169578969248167086));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccos(), new MathLib.Complex(1.1437177404024204938, -1.5285709194809981613)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccos(), new MathLib.Complex(2.2047801924340733356, -2.3055090312434769420)));
});
test('.arccot()', 25, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arccot(),
			n0n2 = (new MathLib.Complex(-0, -2)).arccot(),
			p0n1 = (new MathLib.Complex(+0, -1)).arccot(),
			n0n1 = (new MathLib.Complex(-0, -1)).arccot(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccot(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccot(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccot(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccot(),
			p0p1 = (new MathLib.Complex(+0, 1)).arccot(),
			n0p1 = (new MathLib.Complex(-0, 1)).arccot(),
			p0p2 = (new MathLib.Complex(+0, 2)).arccot(),
			n0p2 = (new MathLib.Complex(-0, 2)).arccot();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccot().re));
	equal((new MathLib.Complex(Infinity)).arccot().re, 0);
	equal((new MathLib.Complex(Infinity)).arccot().im, 0);

	ok(MathLib.isPosZero(p0n2.re), '(+0 -2i).arccot().re = +0');
	equal(p0n2.im, 0.54930614433405484570, '(+0 -2i).arccot().im = 0.54930614433405484570');
	ok(MathLib.isNegZero(n0n2.re), '(-0 -2i).arccot().re = -0');
	equal(n0n2.im, 0.54930614433405484570, '(-0 -2i).arccot().im = 0.54930614433405484570');

	equal(p0n1.re, Infinity, '(+0 -1i).arccot().re = ComplexInfinity');
	equal(n0n1.re, Infinity, '(-0 -1i).arccot().re = ComplexInfinity');

	equal(p0p0.re, Math.PI / 2, '(+0 +0i).arccot().re = +&pi;/2');
	ok(MathLib.isNegZero(p0p0.im), '(+0 +0i).arccot().im = -0');
	equal(p0n0.re, Math.PI / 2, '(+0 -0i).arccot().re = +&pi;/2');
	ok(MathLib.isPosZero(p0n0.im), '(+0 -0i).arccot().im = +0');
	equal(n0p0.re, -Math.PI / 2, '(-0 +0i).arccot().re = -&pi;/2');
	ok(MathLib.isNegZero(n0p0.im), '(-0 +0i).arccot().im = -0');
	equal(n0n0.re, -Math.PI / 2, '(-0 -0i).arccot().re = -&pi;/2');
	ok(MathLib.isPosZero(n0n0.im), '(-0 -0i).arccot().im = +0');

	equal(p0p1.re, Infinity, '(+0 +1i).arccot().re = ComplexInfinity');
	equal(n0p1.re, Infinity, '(-0 +1i).arccot().re = ComplexInfinity');


	ok(MathLib.isPosZero(p0p2.re), '(+0 +2i).arccot().re = +0');
	equal(p0p2.im, -0.54930614433405484570, '(+0 +2i).arccot().im = -0.54930614433405484570');
	ok(MathLib.isNegZero(n0p2.re), '(-0 +2i).arccot().re = -0');
	equal(n0p2.im, -0.54930614433405484570, '(-0 +2i).arccot().im = -0.54930614433405484570');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccot(), new MathLib.Complex(0.23182380450040305811, -0.40235947810852509365)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccot(), new MathLib.Complex(-0.12248933156343207709, -0.15899719167999917436)));
});
test('.arccsc()', 17, function () {
	var n1p0 = (new MathLib.Complex(-1, +0)).arccsc(),
			n1n0 = (new MathLib.Complex(-1, -0)).arccsc(),
			p0p0 = (new MathLib.Complex(+0, +0)).arccsc(),
			p0n0 = (new MathLib.Complex(+0, -0)).arccsc(),
			n0p0 = (new MathLib.Complex(-0, +0)).arccsc(),
			n0n0 = (new MathLib.Complex(-0, -0)).arccsc(),
			p1p0 = (new MathLib.Complex(1, +0)).arccsc(),
			p1n0 = (new MathLib.Complex(1, -0)).arccsc();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arccsc().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arccsc().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arccsc().im));


	ok(MathLib.isEqual(n1p0.re, -Math.PI / 2));
	ok(MathLib.isNegZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, -Math.PI / 2));
	ok(MathLib.isPosZero(n1n0.im));


	equal(p0p0.re, Infinity);
	equal(p0n0.re, Infinity);
	equal(n0p0.re, Infinity);
	equal(n0n0.re, Infinity);


	ok(MathLib.isEqual(p1p0.re, Math.PI / 2));
	ok(MathLib.isNegZero(p1p0.im));
	ok(MathLib.isEqual(p1n0.re, Math.PI / 2));
	ok(MathLib.isPosZero(p1n0.im));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arccsc(), new MathLib.Complex(0.18631805410781552582, -0.39656823011232897892)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arccsc(), new MathLib.Complex(-0.11875073130741175420, -0.16044553377450493240)));
});
test('.arcosh()', 34, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcosh(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcosh(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcosh(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcosh(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arcosh(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arcosh(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcosh(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcosh(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcosh(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcosh(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arcosh(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arcosh(),
			p1p0 = (new MathLib.Complex(+1, +0)).arcosh(),
			p1n0 = (new MathLib.Complex(+1, -0)).arcosh(),
			p2p0 = (new MathLib.Complex(2, +0)).arcosh(),
			p2n0 = (new MathLib.Complex(2, -0)).arcosh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcosh().re));
	equal((new MathLib.Complex(Infinity)).arcosh().re, Infinity);

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(1.3169578969248167086, +3.1415926535897932385)), '(-2 +0i).arcosh() = 1.31 + 3.14i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(1.3169578969248167086, -3.1415926535897932385)), '(-2 -0i).arcosh() = 1.31 - 3.14i');

	ok(MathLib.isPosZero(n1p0.re), '(-1 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n1p0.im, Math.PI), '(-1 +0i).arcosh().im = 3.1415');
	ok(MathLib.isPosZero(n1n0.re), '(-1 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n1n0.im, -Math.PI), '(-1 -0i).arcosh().im = 3.1415');

	ok(MathLib.isPosZero(n5p0.re), '(-0.5 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n5p0.im, 2.0943951023931954923), '(-0.5 +0i).arcosh().im = +2.094');
	ok(MathLib.isPosZero(n5n0.re), '(-0.5 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n5n0.im, -2.0943951023931954923), '(-0.5 -0i).arcosh().im = -2.094');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p0p0.im, 1.5707963267948966192), '(+0 +0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p0n0.im, 1.5707963267948966192), '(+0 -0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(n0p0.re), '(-0 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n0p0.im, 1.5707963267948966192), '(-0 +0i).arcosh().im = 1.570');
	ok(MathLib.isPosZero(n0n0.re), '(-0 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n0n0.im, 1.5707963267948966192), '(-0 -0i).arcosh().im = 1.570');

	ok(MathLib.isPosZero(p5p0.re), '(+0.5 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p5p0.im, 1.0471975511965977462), '(+0.5 +0i).arcosh().im = +1.047');
	ok(MathLib.isPosZero(p5n0.re), '(+0.5 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p5n0.im, -1.0471975511965977462), '(+0.5 -0i).arcosh().im = -1.047');

	ok(MathLib.isPosZero(p1p0.re), '(+1 +0i).arcosh().re = +0');
	ok(MathLib.isPosZero(p1p0.im), '(+1 +0i).arcosh().im = +0');
	ok(MathLib.isPosZero(p1n0.re), '(+1 -0i).arcosh().re = +0');
	ok(MathLib.isNegZero(p1n0.im), '(+1 -0i).arcosh().im = -0');

	ok(MathLib.isEqual(p2p0.re, 1.3169578969248167086), '(+2 +0i).arcosh().re = 3.1415');
	ok(MathLib.isPosZero(p2p0.im), '(+2 +0i).arcosh().im = +0');
	ok(MathLib.isEqual(p2n0.re, 1.3169578969248167086), '(+2 -0i).arcosh().re = 3.1415');
	ok(MathLib.isNegZero(p2n0.im), '(+2 -0i).arcosh().im = -0');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcosh(), new MathLib.Complex(1.5285709194809981613, 1.1437177404024204938)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcosh(), new MathLib.Complex(2.3055090312434769420, 2.2047801924340733356)));
});
test('.arcoth()', 29, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcoth(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcoth(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcoth(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcoth(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arcoth(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arcoth(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcoth(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcoth(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcoth(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcoth(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arcoth(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arcoth(),
			p1p0 = (new MathLib.Complex(1, +0)).arcoth(),
			p1n0 = (new MathLib.Complex(1, -0)).arcoth(),
			p2p0 = (new MathLib.Complex(2, +0)).arcoth(),
			p2n0 = (new MathLib.Complex(2, -0)).arcoth();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcoth().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcoth().re));
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcoth().im));

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-0.5493061443340548457, 0)), '(-2 +0i).arcoth() = -0.55 + 0i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-0.5493061443340548457, 0)), '(-2 -0i).arcoth() = -0.55 + 0i');

	equal(n1p0.re, Infinity, '(-1 +0i).arcoth().re = Infinity');
	equal(n1n0.re, Infinity, '(-1 -0i).arcoth().re = Infinity');

	ok(MathLib.isEqual(n5p0.re, -0.5493061443340548457), '(-0.5 +0i).arcoth().re = -1.107');
	ok(MathLib.isEqual(n5p0.im, -1.5707963267948966192), '(-0.5 +0i).arcoth().im = -1.570');
	ok(MathLib.isEqual(n5n0.re, -0.5493061443340548457), '(-0.5 -0i).arcoth().re = -1.107');
	ok(MathLib.isEqual(n5n0.im, +1.5707963267948966192), '(-0.5 -0i).arcoth().im = +1.570');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arcoth().re = +0');
	ok(MathLib.isEqual(p0p0.im, -1.5707963267948966192), '(+0 +0i).arcoth().im = -1.5707963267948966192');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arcoth().re = +0');
	ok(MathLib.isEqual(p0n0.im, +1.5707963267948966192), '(+0 -0i).arcoth().im = +1.5707963267948966192');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arcoth().re = -0');
	ok(MathLib.isEqual(n0p0.im, -1.5707963267948966192), '(-0 +0i).arcoth().im = -1.5707963267948966192');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arcoth().re = -0');
	ok(MathLib.isEqual(n0n0.im, +1.5707963267948966192), '(-0 -0i).arcoth().im = +1.5707963267948966192');

	ok(MathLib.isEqual(p5p0.re, +0.5493061443340548457), '(+0.5i +0).arcoth().re = +0.549');
	ok(MathLib.isEqual(p5p0.im, -1.5707963267948966192), '(+0.5i +0).arcoth().im = -1.570');
	ok(MathLib.isEqual(p5n0.re, +0.5493061443340548457), '(+0.5i -0).arcoth().re = +0.549');
	ok(MathLib.isEqual(p5n0.im, +1.5707963267948966192), '(+0.5i -0).arcoth().im = +1.570');

	equal(p1p0.re, Infinity, '(1 +0i).arcoth().re = Infinity');
	equal(p1n0.re, Infinity, '(1 -0i).arcoth().re = Infinity');

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(0.5493061443340548457, 0)), '(2 + 0i).arcoth() = 1.57 + 0i');
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(0.5493061443340548457, 0)), '(2 - 0i).arcoth() = -1.57 + 0i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcoth(), new MathLib.Complex(0.17328679513998632735, -0.39269908169872415481)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcoth(), new MathLib.Complex(-0.11750090731143388841, -0.16087527719832109670)));
});
test('.arcsch()', 29, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arcsch(),
			n0n2 = (new MathLib.Complex(-0, -2)).arcsch(),
			p0n1 = (new MathLib.Complex(+0, -1)).arcsch(),
			n0n1 = (new MathLib.Complex(-0, -1)).arcsch(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arcsch(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arcsch(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsch(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsch(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsch(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsch(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arcsch(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arcsch(),
			p0p1 = (new MathLib.Complex(+0, +1)).arcsch(),
			n0p1 = (new MathLib.Complex(-0, +1)).arcsch(),
			p0p2 = (new MathLib.Complex(+0, +2)).arcsch(),
			n0p2 = (new MathLib.Complex(-0, +2)).arcsch();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsch().re), '(NaN +NaN i).arcsch().re = +NaN +NaN i');
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcsch().re), '(+Infinity +Infinity i).arcsch().re = +0');
	ok(MathLib.isPosZero((new MathLib.Complex(Infinity)).arcsch().im), '(+Infinity +Infinity i).arcsch().im = +0');

	ok(MathLib.isPosZero(p0n2.re), '(+0 -2i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n2.im, +0.52359877559829887308), '(+0 -2i).arsinh().im = 0.523');
	ok(MathLib.isNegZero(n0n2.re), '(-0 -2i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n2.im, +0.52359877559829887308), '(-0 -2i).arsinh().im = 0.523');

	ok(MathLib.isPosZero(p0n1.re), '(+0 -i).arcsch().re = +0');
	ok(MathLib.isEqual(p0n1.im, 1.5707963267948966192), '(+0 -i).arcsch().im = 1.570');
	ok(MathLib.isNegZero(n0n1.re), '(-0 -i).arcsch().re = -0');
	ok(MathLib.isEqual(n0n1.im, 1.5707963267948966192), '(-0 -i).arcsch().im = 1.570');

	ok(MathLib.isEqual(p0n5, new MathLib.Complex(1.3169578969248167086, 1.5707963267948966192)), '(+0 -0.5i).arcsch() = +1.316 + 1.570i');
	ok(MathLib.isEqual(n0n5, new MathLib.Complex(-1.3169578969248167086, 1.5707963267948966192)), '(-0 -0.5i).arcsch() = -1.316 + 1.570i');

	ok(MathLib.isEqual(p0p0, new MathLib.Complex(Infinity)), '(+0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(p0n0, new MathLib.Complex(Infinity)), '(+0 -0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0p0, new MathLib.Complex(Infinity)), '(-0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0n0, new MathLib.Complex(Infinity)), '(-0 -0i).arsech() = ∞ + ∞i');

	ok(MathLib.isEqual(p0p5, new MathLib.Complex(1.3169578969248167086, -1.5707963267948966192)), '(+0 +0.5i).arcsch() = +1.316 - 1.570i');
	ok(MathLib.isEqual(n0p5, new MathLib.Complex(-1.3169578969248167086, -1.5707963267948966192)), '(-0 +0.5i).arcsch() = -1.316 - 1.570i');

	ok(MathLib.isPosZero(p0p1.re), '(+0 +i).arcsch().re = +0');
	ok(MathLib.isEqual(p0p1.im, -1.5707963267948966192), '(+0 +i).arcsch().im = -1.570');
	ok(MathLib.isNegZero(n0p1.re), '(-0 +i).arcsch().re = -0');
	ok(MathLib.isEqual(n0p1.im, -1.5707963267948966192), '(-0 +i).arcsch().im = -1.570');

	ok(MathLib.isPosZero(p0p2.re), '(+0 +2i).arsinh().re = +0');
	ok(MathLib.isEqual(p0p2.im, -0.52359877559829887308), '(+0 +2i).arsinh().im = 0.523');
	ok(MathLib.isNegZero(n0p2.re), '(-0 +2i).arsinh().re = -0');
	ok(MathLib.isEqual(n0p2.im, -0.52359877559829887308), '(-0 +2i).arsinh().im = 0.523');


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsch(), new MathLib.Complex(0.21561241855582964497, -0.40158639166780606828)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsch(), new MathLib.Complex(-0.12124561370968745427, -0.15950663187736356950)));
});
test('.arcsec()', 17, function () {
	var n1p0 = (new MathLib.Complex(-1, +0)).arcsec(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcsec(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsec(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsec(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsec(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsec(),
			p1p0 = (new MathLib.Complex(1, +0)).arcsec(),
			p1n0 = (new MathLib.Complex(1, -0)).arcsec();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsec().re));
	ok(MathLib.isEqual((new MathLib.Complex(Infinity)).arcsec().re, Math.PI / 2));
	ok(MathLib.isNegZero((new MathLib.Complex(Infinity)).arcsec().im));


	ok(MathLib.isEqual(n1p0.re, Math.PI));
	ok(MathLib.isPosZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, Math.PI));
	ok(MathLib.isNegZero(n1n0.im), 'arcsec(-1 -0i).im = -0');


	equal(p0p0.re, Infinity, 'arcsec(+0+0i) = ∞');
	equal(p0n0.re, Infinity, 'arcsec(+0-0i) = ∞');
	equal(n0p0.re, Infinity, 'arcsec(-0+0i) = ∞');
	equal(n0n0.re, Infinity, 'arcsec(-0-0i) = ∞');


	ok(MathLib.isPosZero(p1p0.re));
	ok(MathLib.isPosZero(p1p0.im));
	ok(MathLib.isPosZero(p1n0.re));
	ok(MathLib.isNegZero(p1n0.im));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsec(), new MathLib.Complex(1.3844782726870810934, 0.3965682301123289789)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsec(), new MathLib.Complex(1.6895470581023083734, 0.1604455337745049324)));
});
test('.arcsin()', 24, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arcsin(),
			n2n0 = (new MathLib.Complex(-2, -0)).arcsin(),
			n1p0 = (new MathLib.Complex(-1, +0)).arcsin(),
			n1n0 = (new MathLib.Complex(-1, -0)).arcsin(),
			p0p0 = (new MathLib.Complex(+0, +0)).arcsin(),
			p0n0 = (new MathLib.Complex(+0, -0)).arcsin(),
			n0p0 = (new MathLib.Complex(-0, +0)).arcsin(),
			n0n0 = (new MathLib.Complex(-0, -0)).arcsin(),
			p1p0 = (new MathLib.Complex(1, +0)).arcsin(),
			p1n0 = (new MathLib.Complex(1, -0)).arcsin(),
			p2p0 = (new MathLib.Complex(2, +0)).arcsin(),
			p2n0 = (new MathLib.Complex(2, -0)).arcsin();


	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arcsin().re));
	equal((new MathLib.Complex(Infinity)).arcsin().re, Infinity);


	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-1.5707963267948966192, +1.3169578969248167086)));
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-1.5707963267948966192, -1.3169578969248167086)));

	ok(MathLib.isEqual(n1p0.re, -1.5707963267948966192));
	ok(MathLib.isPosZero(n1p0.im));
	ok(MathLib.isEqual(n1n0.re, -1.5707963267948966192));
	ok(MathLib.isNegZero(n1n0.im));

	ok(MathLib.isPosZero(p0p0.re));
	ok(MathLib.isPosZero(p0p0.im));
	ok(MathLib.isPosZero(p0n0.re));
	ok(MathLib.isNegZero(p0n0.im));
	ok(MathLib.isNegZero(n0p0.re));
	ok(MathLib.isPosZero(n0p0.im));
	ok(MathLib.isNegZero(n0n0.re));
	ok(MathLib.isNegZero(n0n0.im));

	ok(MathLib.isEqual(p1p0.re, 1.5707963267948966192));
	ok(MathLib.isPosZero(p1p0.im));
	ok(MathLib.isEqual(p1n0.re, 1.5707963267948966192));
	ok(MathLib.isNegZero(p1n0.im));

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(1.5707963267948966192, +1.3169578969248167086)));
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(1.5707963267948966192, -1.3169578969248167086)));


	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arcsin(), new MathLib.Complex(0.4270785863924761255, 1.5285709194809981613)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arcsin(), new MathLib.Complex(-0.6339838656391767163, 2.3055090312434769420)));
});
test('.arctan()', 28, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arctan(),
			n0n2 = (new MathLib.Complex(-0, -2)).arctan(),
			p0n1 = (new MathLib.Complex(+0, -1)).arctan(),
			n0n1 = (new MathLib.Complex(-0, -1)).arctan(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arctan(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arctan(),
			p0p0 = (new MathLib.Complex(+0, +0)).arctan(),
			p0n0 = (new MathLib.Complex(+0, -0)).arctan(),
			n0p0 = (new MathLib.Complex(-0, +0)).arctan(),
			n0n0 = (new MathLib.Complex(-0, -0)).arctan(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arctan(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arctan(),
			p0p1 = (new MathLib.Complex(+0, 1)).arctan(),
			n0p1 = (new MathLib.Complex(-0, 1)).arctan(),
			p0p2 = (new MathLib.Complex(+0, 2)).arctan(),
			n0p2 = (new MathLib.Complex(-0, 2)).arctan();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arctan().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).arctan().re));

	ok(MathLib.isEqual(p0n2, new MathLib.Complex(1.5707963267948966192, -0.5493061443340548457)), '(+0 -2i).arctan() = 1.57 - 0.55i');
	ok(MathLib.isEqual(n0n2, new MathLib.Complex(-1.5707963267948966192, -0.5493061443340548457)), '(-0 -2i).arctan() = -1.57 - 0.55i');

	equal(p0n1.re, Infinity);
	equal(n0n1.re, Infinity);

	ok(MathLib.isPosZero(p0n5.re), '(+0 -0.5i).arctan().re = +0');
	equal(p0n5.im, -0.5493061443340548457, '(+0 -0.5i).arctan().im = +0.549');
	ok(MathLib.isNegZero(n0n5.re), '(-0 -0.5i).arctan().re = -0');
	equal(n0n5.im, -0.5493061443340548457, '(-0 -0.5i).arctan().im = -0.549');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arctan().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).arctan().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arctan().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).arctan().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arctan().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).arctan().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arctan().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).arctan().im = -0');

	ok(MathLib.isPosZero(p0p5.re), '(+0 +0.5i).arctan().re = +0');
	equal(p0p5.im, +0.5493061443340548457, '(+0 +0.5i).arctan().im = +0.549');
	ok(MathLib.isNegZero(n0p5.re), '(-0 +0.5i).arctan().re = -0');
	equal(n0p5.im, +0.5493061443340548457, '(-0 +0.5i).arctan().im = -0.549');

	equal(p0p1.re, Infinity);
	equal(n0p1.re, Infinity);

	ok(MathLib.isEqual(p0p2, new MathLib.Complex(1.5707963267948966192, 0.5493061443340548457)), '(+0 +2i).arctan() = 1.57 + 0.55i');
	ok(MathLib.isEqual(n0p2, new MathLib.Complex(-1.5707963267948966192, 0.5493061443340548457)), '(-0 +2i).arctan() = -1.57 + 0.55i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arctan(), new MathLib.Complex(1.33897252229449356112, 0.40235947810852509365)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arctan(), new MathLib.Complex(-1.4483069952314645421, 0.1589971916799991744)));
});
test('.arg()', 6, function () {
	var c1 = new MathLib.Complex(1, 1),
			c2 = new MathLib.Complex(1, -1),
			c3 = new MathLib.Complex(0, 0),
			c4 = new MathLib.Complex(-1, 0);

	ok(MathLib.isNaN((new MathLib.Complex(NaN, 1)).arg()));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity, 1)).arg()));
	equal(c1.arg(), 0.7853981633974483);
	equal(c2.arg(), -0.7853981633974483);
	equal(c3.arg(), 0);
	equal(c4.arg(), 3.141592653589793);
});
test('.arsech()', 30, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).arsech(),
			n2n0 = (new MathLib.Complex(-2, -0)).arsech(),
			n1p0 = (new MathLib.Complex(-1, +0)).arsech(),
			n1n0 = (new MathLib.Complex(-1, -0)).arsech(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).arsech(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).arsech(),
			p0p0 = (new MathLib.Complex(+0, +0)).arsech(),
			p0n0 = (new MathLib.Complex(+0, -0)).arsech(),
			n0p0 = (new MathLib.Complex(-0, +0)).arsech(),
			n0n0 = (new MathLib.Complex(-0, -0)).arsech(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).arsech(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).arsech(),
			p1p0 = (new MathLib.Complex(+1, +0)).arsech(),
			p1n0 = (new MathLib.Complex(+1, -0)).arsech(),
			p2p0 = (new MathLib.Complex(2, +0)).arsech(),
			p2n0 = (new MathLib.Complex(2, -0)).arsech();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arsech().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).arsech().re));

	ok(MathLib.isPosZero(n2p0.re), '(-2 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(n2p0.im, -2.0943951023931954923), '(-2 +0i).arcosh().im = -2.094');
	ok(MathLib.isPosZero(n2n0.re), '(-2 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(n2n0.im, 2.0943951023931954923), '(-2 -0i).arcosh().im = +2.094');

	ok(MathLib.isPosZero(n1p0.re), '(-1 +0i).arsech().re = +0');
	ok(MathLib.isEqual(n1p0.im, -Math.PI), '(-1 +0i).arsech().im = -3.1415');
	ok(MathLib.isPosZero(n1n0.re), '(-1 -0i).arsech().re = +0');
	ok(MathLib.isEqual(n1n0.im, Math.PI), '(-1 -0i).arsech().im = 3.1415');

	ok(MathLib.isEqual(n5p0, new MathLib.Complex(1.3169578969248167086, -3.1415926535897932385)), '(-0.5 +0i).arsech() = 1.31 - 3.14i');
	ok(MathLib.isEqual(n5n0, new MathLib.Complex(1.3169578969248167086, +3.1415926535897932385)), '(-0.5 -0i).arsech() = 1.31 + 3.14i');

	ok(MathLib.isEqual(p0p0, new MathLib.Complex(Infinity)), '(+0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(p0n0, new MathLib.Complex(Infinity)), '(+0 -0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0p0, new MathLib.Complex(Infinity)), '(-0 +0i).arsech() = ∞ + ∞i');
	ok(MathLib.isEqual(n0n0, new MathLib.Complex(Infinity)), '(-0 -0i).arsech() = ∞ + ∞i');

	ok(MathLib.isEqual(p5p0.re, 1.3169578969248167086), '(+0.5 +0i).arsech().re = 1.316');
	ok(MathLib.isNegZero(p5p0.im), '(+0.5 +0i).arsech().im = -0');
	ok(MathLib.isEqual(p5n0.re, 1.3169578969248167086), '(+0.5 -0i).arsech().re = 1.316');
	ok(MathLib.isPosZero(p5n0.im), '(+0.5 -0i).arsech().im = +0');

	ok(MathLib.isPosZero(p1p0.re), '(+1 +0i).arsech().re = +0');
	ok(MathLib.isNegZero(p1p0.im), '(+1 +0i).arsech().im = -0');
	ok(MathLib.isPosZero(p1n0.re), '(+1 -0i).arsech().re = +0');
	ok(MathLib.isPosZero(p1n0.im), '(+1 -0i).arsech().im = +0');

	ok(MathLib.isPosZero(p2p0.re), '(-2 +0i).arcosh().re = +0');
	ok(MathLib.isEqual(p2p0.im, -1.0471975511965977462), '(-2 +0i).arcosh().im = -1.047');
	ok(MathLib.isPosZero(p2n0.re), '(-2 -0i).arcosh().re = +0');
	ok(MathLib.isEqual(p2n0.im, 1.0471975511965977462), '(-2 -0i).arcosh().im = +1.047');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arsech(), new MathLib.Complex(0.3965682301123289789, -1.3844782726870810934)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arsech(), new MathLib.Complex(0.1604455337745049324, -1.6895470581023083734)));
});
test('.arsinh()', 32, function () {
	var p0n2 = (new MathLib.Complex(+0, -2)).arsinh(),
			n0n2 = (new MathLib.Complex(-0, -2)).arsinh(),
			p0n1 = (new MathLib.Complex(+0, -1)).arsinh(),
			n0n1 = (new MathLib.Complex(-0, -1)).arsinh(),
			p0n5 = (new MathLib.Complex(+0, -0.5)).arsinh(),
			n0n5 = (new MathLib.Complex(-0, -0.5)).arsinh(),
			p0p0 = (new MathLib.Complex(+0, +0)).arsinh(),
			p0n0 = (new MathLib.Complex(+0, -0)).arsinh(),
			n0p0 = (new MathLib.Complex(-0, +0)).arsinh(),
			n0n0 = (new MathLib.Complex(-0, -0)).arsinh(),
			p0p5 = (new MathLib.Complex(+0, +0.5)).arsinh(),
			n0p5 = (new MathLib.Complex(-0, +0.5)).arsinh(),
			p0p1 = (new MathLib.Complex(+0, +1)).arsinh(),
			n0p1 = (new MathLib.Complex(-0, +1)).arsinh(),
			p0p2 = (new MathLib.Complex(+0, +2)).arsinh(),
			n0p2 = (new MathLib.Complex(-0, +2)).arsinh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).arsinh().re));
	equal((new MathLib.Complex(Infinity)).arsinh().re, Infinity);

	ok(MathLib.isEqual(p0n2, new MathLib.Complex(+1.3169578969248167086, -1.5707963267948966192)), '(+0 -2i).arsinh() = +1.316 - 1.570i');
	ok(MathLib.isEqual(n0n2, new MathLib.Complex(-1.3169578969248167086, -1.5707963267948966192)), '(-0 -2i).arsinh() = -1.316 - 1.570i');

	ok(MathLib.isPosZero(p0n1.re), '(+0 -i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n1.im, -1.5707963267948966192), '(+0 -i).arsinh().im = -1.570');
	ok(MathLib.isNegZero(n0n1.re), '(-0 -i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n1.im, -1.5707963267948966192), '(-0 -i).arsinh().im = -1.570');

	ok(MathLib.isPosZero(p0n5.re), '(+0 -0.5i).arsinh().re = +0');
	ok(MathLib.isEqual(p0n5.im, -0.52359877559829887308), '(+0 -0.5i).arsinh().im = -0.523');
	ok(MathLib.isNegZero(n0n5.re), '(-0 -0.5i).arsinh().re = -0');
	ok(MathLib.isEqual(n0n5.im, -0.52359877559829887308), '(-0 -0.5i).arsinh().im = -0.523');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).arsinh().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).arsinh().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).arsinh().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).arsinh().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).arsinh().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).arsinh().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).arsinh().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).arsinh().im = -0');

	ok(MathLib.isEqual(p0p5.im, 0.52359877559829887308), '(+0 +0.5i).arsinh().im = +0.523');
	ok(MathLib.isPosZero(p0p5.re), '(+0 +0.5i).arsinh().re = +0');
	ok(MathLib.isEqual(n0p5.im, 0.52359877559829887308), '(-0 +0.5i).arsinh().im = +0.523');
	ok(MathLib.isNegZero(n0p5.re), '(-0 +0.5i).arsinh().re = -0');

	ok(MathLib.isPosZero(p0p1.re), '(+0 +i).arsinh().re = +0');
	ok(MathLib.isEqual(p0p1.im, 1.5707963267948966192), '(+0 +i).arsinh().im = 1.570');
	ok(MathLib.isNegZero(n0p1.re), '(-0 +i).arsinh().re = -0');
	ok(MathLib.isEqual(n0p1.im, 1.5707963267948966192), '(-0 +i).arsinh().im = 1.570');

	ok(MathLib.isEqual(p0p2, new MathLib.Complex(+1.3169578969248167086, 1.5707963267948966192)), '(+0 +2i).arsinh() = +1.316 + 1.570i');
	ok(MathLib.isEqual(n0p2, new MathLib.Complex(-1.3169578969248167086, 1.5707963267948966192)), '(-0 +2i).arsinh() = -1.316 + 1.570i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).arsinh(), new MathLib.Complex(1.4693517443681852733, 1.0634400235777520562)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).arsinh(), new MathLib.Complex(-2.2999140408792696500, 0.9176168533514786558)));
});
test('.artanh()', 28, function () {
	var n2p0 = (new MathLib.Complex(-2, +0)).artanh(),
			n2n0 = (new MathLib.Complex(-2, -0)).artanh(),
			n1p0 = (new MathLib.Complex(-1, +0)).artanh(),
			n1n0 = (new MathLib.Complex(-1, -0)).artanh(),
			n5p0 = (new MathLib.Complex(-0.5, +0)).artanh(),
			n5n0 = (new MathLib.Complex(-0.5, -0)).artanh(),
			p0p0 = (new MathLib.Complex(+0, +0)).artanh(),
			p0n0 = (new MathLib.Complex(+0, -0)).artanh(),
			n0p0 = (new MathLib.Complex(-0, +0)).artanh(),
			n0n0 = (new MathLib.Complex(-0, -0)).artanh(),
			p5p0 = (new MathLib.Complex(+0.5, +0)).artanh(),
			p5n0 = (new MathLib.Complex(+0.5, -0)).artanh(),
			p1p0 = (new MathLib.Complex(1, +0)).artanh(),
			p1n0 = (new MathLib.Complex(1, -0)).artanh(),
			p2p0 = (new MathLib.Complex(2, +0)).artanh(),
			p2n0 = (new MathLib.Complex(2, -0)).artanh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).artanh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).artanh().re));

	ok(MathLib.isEqual(n2p0, new MathLib.Complex(-0.5493061443340548457, 1.5707963267948966192)), '(-2 +0i).artanh() = -0.55 + 1.57i');
	ok(MathLib.isEqual(n2n0, new MathLib.Complex(-0.5493061443340548457, -1.5707963267948966192)), '(-2 -0i).artanh() = -0.55 - 1.57i');

	equal(n1p0.re, Infinity, '(-1 +0i).artanh().re = Infinity');
	equal(n1n0.re, Infinity, '(-1 -0i).artanh().re = Infinity');

	ok(MathLib.isEqual(n5p0.re, -0.5493061443340548457), '(-0.5 + 0i).artanh().re = -0.549');
	ok(MathLib.isPosZero(n5p0.im), '(-0.5 +0i).artanh().im = +0');
	ok(MathLib.isEqual(n5n0.re, -0.5493061443340548457), '(-0.5 -0i).artanh().re = -0.549');
	ok(MathLib.isNegZero(n5n0.im), '(-0.5 -0i).artanh().im = -0');

	ok(MathLib.isPosZero(p0p0.re), '(+0 +0i).artanh().re = +0');
	ok(MathLib.isPosZero(p0p0.im), '(+0 +0i).artanh().im = +0');
	ok(MathLib.isPosZero(p0n0.re), '(+0 -0i).artanh().re = +0');
	ok(MathLib.isNegZero(p0n0.im), '(+0 -0i).artanh().im = -0');
	ok(MathLib.isNegZero(n0p0.re), '(-0 +0i).artanh().re = -0');
	ok(MathLib.isPosZero(n0p0.im), '(-0 +0i).artanh().im = +0');
	ok(MathLib.isNegZero(n0n0.re), '(-0 -0i).artanh().re = -0');
	ok(MathLib.isNegZero(n0n0.im), '(-0 -0i).artanh().im = -0');

	ok(MathLib.isEqual(p5p0.re, +0.54930614433405484570), '(+0.5i +0).artanh().re = +0.549');
	ok(MathLib.isPosZero(p5p0.im), '(+0.5i +0).artanh().im = +0');
	ok(MathLib.isEqual(p5n0.re, +0.54930614433405484570), '(+0.5i -0).artanh().re = +0.549');
	ok(MathLib.isNegZero(p5n0.im), '(+0.5i -0).artanh().im = -0');

	equal(p1p0.re, Infinity, '(1 +0i).artanh().re = Infinity');
	equal(p1n0.re, Infinity, '(1 -0i).artanh().re = Infinity');

	ok(MathLib.isEqual(p2p0, new MathLib.Complex(0.5493061443340548457, 1.5707963267948966192)), '(2 + 0i).artanh() = 1.57 + 0.55i');
	ok(MathLib.isEqual(p2n0, new MathLib.Complex(0.5493061443340548457, -1.5707963267948966192)), '(2 - 0i).artanh() = -1.57 + 0.55i');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).artanh(), new MathLib.Complex(0.17328679513998632735, 1.17809724509617246442)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).artanh(), new MathLib.Complex(-0.1175009073114338884, 1.4099210495965755225)));
});
test('.prototype.coerceTo()', 8, function () {
	var c1 = new MathLib.Complex(3, 0),
			c2 = new MathLib.Complex(3, 2);

	ok(MathLib.isEqual(c1.coerceTo('integer'), new MathLib.Integer(3)), 'integer');
	ok(MathLib.isEqual(c1.coerceTo('rational'), new MathLib.Rational(3, 1)), 'rational');
	ok(MathLib.isEqual(c1.coerceTo('complex'), new MathLib.Complex(3, 0)), 'complex');
	ok(MathLib.isEqual(c1.coerceTo('number'), 3), 'number');

	throws(function () {
		c2.coerceTo('integer');
	}, /Cannot coerce the complex number to an integer, since the imaginary part is not zero./, 'integer');
	throws(function () {
		c2.coerceTo('rational');
	}, /Cannot coerce the complex number to a rational number, since the imaginary part is not zero./, 'rational');
	throws(function () {
		c2.coerceTo('number');
	}, /Cannot coerce the complex number to a number, since the imaginary part is not zero./, 'number');
	throws(function () {
		c2.coerceTo('notImplemented');
	}, /Cannot coerce the complex number to "notImplemented"./, 'notImplemented');
});

test('.compare()', 9, function () {
	var c = new MathLib.Complex(3, 2),
			d = new MathLib.Complex(1, 1),
			e = new MathLib.Complex(-1, 1),
			nan = new MathLib.Complex(NaN),
			inf = new MathLib.Complex(Infinity);

	equal(nan.compare(nan), 0);
	equal(nan.compare(c), -1);
	equal(nan.compare(inf), -1);

	equal(inf.compare(nan), 1);
	equal(inf.compare(c), 1);
	equal(inf.compare(inf), 0);

	equal(c.compare(c), 0, 'equal complex numbers');
	equal(c.compare(d), 1, 'normal compare');
	equal(d.compare(e), -1,  '');
});
test('.conjugate()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).conjugate(),
			pn = (new MathLib.Complex(+0, -0)).conjugate(),
			np = (new MathLib.Complex(-0, +0)).conjugate(),
			nn = (new MathLib.Complex(-0, -0)).conjugate();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).conjugate().re));
	equal((new MathLib.Complex(Infinity)).conjugate().re, Infinity);

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isNegZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isPosZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isNegZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isPosZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).conjugate(), new MathLib.Complex(1, -2)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).conjugate(), new MathLib.Complex(-3, -4)));
});
test('.copy()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).copy(),
			pn = (new MathLib.Complex(+0, -0)).copy(),
			np = (new MathLib.Complex(-0, +0)).copy(),
			nn = (new MathLib.Complex(-0, -0)).copy();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).copy().re));
	equal((new MathLib.Complex(Infinity)).copy().re, Infinity);

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).copy(), new MathLib.Complex(1, 2)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).copy(), new MathLib.Complex(-3, 4)));
});
test('.cos()', 3, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cos().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cos().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cos(), new MathLib.Complex(2.0327230070196655294, -3.0518977991518000575)));
});
test('.cosh()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cosh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cosh().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cosh(), new MathLib.Complex(-0.64214812471551996484, 1.06860742138277833960)));

	// Chrome implemented sin, cos & tan in a new way:
	// https://codereview.chromium.org/70003004/
	// While the new implementation is faster, it is also not acurate.
	// I expect the bug to be fixed soon and it isn't causing major problems,
	// I will only modify the test now and not the code.
	// Affected tests:
	// Complex.polar, Complex#cosh, Complex#sinh
	//
	// More information:
	// https://code.google.com/p/v8/issues/detail?id=3006
	if (Math.cos(-5) === 0.2836621854632259) {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cosh(), new MathLib.Complex(-6.580663040551149, 7.581552742746537)));
	}
	else {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cosh(), new MathLib.Complex(-6.5806630405511564326, 7.5815527427465443537)));
	}
});
test('.cot()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).cot().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).cot().re));

	equal((new MathLib.Complex(0)).cot().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).cot(), new MathLib.Complex(0.03279775553375259406, -0.98432922645819102947)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).cot(), new MathLib.Complex(0.00018758773798365922, -1.00064439247155908010)));
});
test('.coth()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).coth().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).coth().re));

	equal((new MathLib.Complex(0)).coth().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).coth(), new MathLib.Complex(0.82132979749385168671, 0.17138361290918501441)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).coth(), new MathLib.Complex(-0.99926692780590154452, -0.00490118239430447336)));
});
test('.csc()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).csc().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).csc().re));

	equal((new MathLib.Complex(0)).csc().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).csc(), new MathLib.Complex(0.22837506559968659341, -0.14136302161240780072)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).csc(), new MathLib.Complex(-0.005174473184019397654, 0.036275889628626011594)));
});
test('.csch()', 5, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).csch().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).csch().re));

	equal((new MathLib.Complex(0)).csch().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).csch(), new MathLib.Complex(-0.22150093085050939664, -0.63549379925389995364)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).csch(), new MathLib.Complex(0.064877471370635490483, 0.075489832915863699572)));
});
test('.divide()', 18, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 6),
			e = new MathLib.Complex(3, 7);

	ok(MathLib.isNaN(nan.divide(nan).re), 'ComplexNaN / ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(inf).re), 'ComplexNaN / ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(zero).re), 'ComplexNaN / 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.divide(c).re), 'ComplexNaN / (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.divide(nan).re), 'ComplexInfinity / ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(inf.divide(inf).re), 'ComplexInfinity / ComplexInfinity = ComplexNaN');
	deepEqual(inf.divide(zero), inf, 'ComplexInfinity / 0 = ComplexInfinity');
	deepEqual(inf.divide(c), inf, 'ComplexInfinity / (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.divide(nan).re), '0 / ComplexNaN = ComplexNaN');
	deepEqual(zero.divide(inf), zero, '0 / ComplexInfinity = 0');
	ok(MathLib.isNaN(zero.divide(zero).re), '0 / 0 = ComplexNaN');
	deepEqual(zero.divide(c), zero, '0 / (2+5i) = 0');

	ok(MathLib.isNaN(c.divide(nan).re), '(2+5i) / ComplexNaN = ComplexNaN');
	deepEqual(c.divide(inf), zero, '(2+5i) / ComplexInfinity = 0');
	deepEqual(c.divide(zero), inf, '(2+5i) / 0 = ComplexInfinity');
	deepEqual(c.divide(c), new MathLib.Complex(1), '(2+5i) / (2+5i) = 1');

	deepEqual(d.divide(3), new MathLib.Complex(1, 2), 'Dividing by a normal number.');
	ok(c.divide(e).isEqual(new MathLib.Complex(41 / 58, 1 / 58)), 'Dividing by a complex number.');
});
test('.exp()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).exp(),
			pn = (new MathLib.Complex(+0, -0)).exp(),
			np = (new MathLib.Complex(-0, +0)).exp(),
			nn = (new MathLib.Complex(-0, -0)).exp();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).exp().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).exp().re));

	equal(pp.re, 1, '(+0 +0i).exp().re = 1');
	ok(MathLib.isPosZero(pp.im), '(+0 +0i).exp().im = 0');

	equal(pn.re, 1, '(+0 -0i).exp().re = 1');
	ok(MathLib.isNegZero(pn.im), '(+0 -0i).exp().im = 0');

	equal(np.re, 1, '(-0 +0i).exp().re = 1');
	ok(MathLib.isPosZero(np.im), '(-0 +0i).exp().im = 0');

	equal(nn.re, 1, '(-0 -0i).exp().re = 1');
	ok(MathLib.isNegZero(nn.im), '(-0 -0i).exp().im = 0');

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).exp(), new MathLib.Complex(-1.1312043837568136384, 2.4717266720048189276)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).exp(), new MathLib.Complex(-0.032542999640154784794, -0.037678977574865854771)));
});
test('.inverse()', 9, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).inverse().re));
	ok(MathLib.isPosZero(new MathLib.Complex(Infinity).inverse().re));
	ok(MathLib.isPosZero(new MathLib.Complex(Infinity).inverse().im));

	equal((new MathLib.Complex(+0, +0)).inverse().re, Infinity);
	equal((new MathLib.Complex(+0, -0)).inverse().re, Infinity);
	equal((new MathLib.Complex(-0, +0)).inverse().re, Infinity);
	equal((new MathLib.Complex(-0, -0)).inverse().re, Infinity);

	deepEqual((new MathLib.Complex(3, 4)).inverse(), new MathLib.Complex(3 / 25, -4 / 25));
	deepEqual((new MathLib.Complex(0, 2)).inverse(), new MathLib.Complex(0, -1 / 2));
});
test('.isEqual()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(3, 4),
			e = new MathLib.Complex(5, 3);

	equal(c.isEqual(d), true, 'equal number');
	equal(d.isEqual(e), false, 'different number');
});
test('.isFinite()', 3, function () {
	equal((new MathLib.Complex(3, 4)).isFinite(), true, 'finite complex number');
	equal((new MathLib.Complex(Infinity)).isFinite(), false, 'ComplexInfinity');
	equal((new MathLib.Complex(NaN)).isFinite(), false, 'ComplexNaN');
});
test('.isZero()', 2, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 0);
	equal(c.isZero(), false, 'non zero complex');
	equal(d.isZero(), true, 'complex zero');
});
test('.ln()', 4, function () {
	var c = new MathLib.Complex(3, 4),
			res = new MathLib.Complex(1.6094379124341003, 0.9272952180016123);

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).ln().re));
	equal((new MathLib.Complex(Infinity)).ln().re, Infinity);

	equal((new MathLib.Complex(0)).ln().re, Infinity);

	equal(MathLib.isEqual(c.ln(), res), true, 'natural logarithm of the complex number');
});
test('.minus()', 17, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(7, -8);

	ok(MathLib.isNaN(nan.minus(nan).re), 'ComplexNaN - ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(inf).re), 'ComplexNaN - ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(zero).re), 'ComplexNaN - 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.minus(c).re), 'ComplexNaN - (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.minus(nan).re), 'ComplexInfinity - ComplexNaN = ComplexNaN');
	deepEqual(inf.minus(inf), inf, 'ComplexInfinity - ComplexInfinity = ComplexInfinity');
	deepEqual(inf.minus(zero), inf, 'ComplexInfinity - 0 = ComplexInfinity');
	deepEqual(inf.minus(c), inf, 'ComplexInfinity - (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.minus(nan).re), '0 - ComplexNaN = ComplexNaN');
	deepEqual(zero.minus(inf), inf, '0 - ComplexInfinity = ComplexInfinity');
	deepEqual(zero.minus(zero), zero, '0 - 0 = 0');
	deepEqual(zero.minus(c), c.negative(), '0 - (2+5i) = -2-5i');

	ok(MathLib.isNaN(c.minus(nan).re), '(2+5i) - ComplexNaN = ComplexNaN');
	deepEqual(c.minus(inf), inf, '(2+5i) - ComplexInfinity = ComplexInfinity');
	deepEqual(c.minus(zero), c, '(2+5i) - 0 = 2+5i');
	deepEqual(c.minus(c), zero, '(2+5i) - (2+5i) = 0');

	deepEqual(c.minus(d), new MathLib.Complex(-5, 13), '(2+5i)-(7-8i) = -5 + 13i');
});
test('.negative()', 11, function () {
	var pp = (new MathLib.Complex(+0, +0)).negative(),
			pn = (new MathLib.Complex(+0, -0)).negative(),
			np = (new MathLib.Complex(-0, +0)).negative(),
			nn = (new MathLib.Complex(-0, -0)).negative();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).negative().re));
	equal((new MathLib.Complex(Infinity)).negative().re, Infinity);

	ok(MathLib.isNegZero(pp.re));
	ok(MathLib.isNegZero(pp.im));

	ok(MathLib.isNegZero(pn.re));
	ok(MathLib.isPosZero(pn.im));

	ok(MathLib.isPosZero(np.re));
	ok(MathLib.isNegZero(np.im));

	ok(MathLib.isPosZero(nn.re));
	ok(MathLib.isPosZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).negative(), new MathLib.Complex(3, -4)));
});
test('.plus()', 18, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 4);

	ok(MathLib.isNaN(nan.plus(nan).re), 'ComplexNaN + ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(inf).re), 'ComplexNaN + ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(zero).re), 'ComplexNaN + 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.plus(c).re), 'ComplexNaN + (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.plus(nan).re), 'ComplexInfinity + ComplexNaN = ComplexNaN');
	deepEqual(inf.plus(inf), inf, 'ComplexInfinity + ComplexInfinity = ComplexInfinity');
	deepEqual(inf.plus(zero), inf, 'ComplexInfinity + 0 = ComplexInfinity');
	deepEqual(inf.plus(c), inf, 'ComplexInfinity + (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.plus(nan).re), '0 + ComplexNaN = ComplexNaN');
	deepEqual(zero.plus(inf), inf, '0 + ComplexInfinity = ComplexInfinity');
	deepEqual(zero.plus(zero), zero, '0 + 0 = 0');
	deepEqual(zero.plus(c), c, '0 + (2+5i) = c');

	ok(MathLib.isNaN(c.plus(nan).re), '(2+5i) + ComplexNaN = ComplexNaN');
	deepEqual(c.plus(inf), inf, '(2+5i) + ComplexInfinity = ComplexInfinity');
	deepEqual(c.plus(zero), c, '(2+5i) + 0 = 2+5i');
	deepEqual(c.plus(c), new MathLib.Complex(4, 10), '(2+5i) + (2+5i) = 4+10i');

	deepEqual(c.plus(d), new MathLib.Complex(5, 9), 'Adding two complex numbers.');
	deepEqual(d.plus(5), new MathLib.Complex(8, 4), 'Adding a number to a complex number.');
});
test('.pow()', 29, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7);

	// complex exponent
	ok(MathLib.isNaN(nan.pow(nan).re), 'ComplexNaN ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(inf).re), 'ComplexNaN ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(zero).re), 'ComplexNaN ^ 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.pow(c).re), 'ComplexNaN ^ (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.pow(nan).re), 'ComplexInfinity ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(inf.pow(inf).re), 'ComplexInfinity ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(inf.pow(zero).re), 'ComplexInfinity ^ 0 = ComplexNaN');
	deepEqual(inf.pow(c), inf, 'ComplexInfinity ^ (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.pow(nan).re), '0 ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(zero.pow(inf).re), '0 ^ ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(zero.pow(zero).re), '0 ^ 0 = ComplexNaN');
	deepEqual(zero.pow(c), zero, '0 ^ (2+5i) = 0');

	ok(MathLib.isNaN(c.pow(nan).re), '(2+5i) ^ ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(c.pow(inf).re), '(2+5i) ^ ComplexInfinity = ComplexNaN');
	ok(c.pow(zero).isEqual(new MathLib.Complex(1)), '(2+5i) ^ 0 = 1');
	ok(c.pow(c).isEqual(new MathLib.Complex(-0.014751488748626422189, -0.074003984757716712413)), '(2+5i) ^ (2+5i) = -0.01475 -0.07400i');
	ok(c.pow(d).isEqual(new MathLib.Complex(-0.035288471617042692023, 0.012943638960390488567)));


	// number exponent
	equal(c.pow(0).re, 1, '(2+5i) ^ 0 = 1 + 0i');
	ok(MathLib.isPosZero(c.pow(0).im), '(2+5i) ^ 0 = 1 + 0i');

	equal(c.pow(-0).re, 1, '(2+5i) ^ -0 = 1 - 0i');
	ok(MathLib.isNegZero(c.pow(-0).im), '(2+5i) ^ -0 = 1 - 0i');


	ok(MathLib.isNaN(nan.pow(3).re), 'ComplexNaN ^ 3 = ComplexNaN');
	deepEqual(inf.pow(3), inf, 'ComplexInfinity ^ 3 = ComplexInfinity');
	deepEqual(zero.pow(3), zero, '0 ^ 3 = 0');


	ok(c.pow(3).isEqual(new MathLib.Complex(-142, -65)), '(2+5i) ^ 3 = -142 -65i');
	ok(c.pow(-3).isEqual(new MathLib.Complex(-0.0058222969371437943335,
		0.0026651359219320185329)), '(2+5i) ^ -3 = -0.0058223 + 0.00266514 i');

	// TODO: Fix the pow method and rewrite this test with .isEqual
	ok(Math.abs(c.pow(3.24).re + 176.64664988162751823) < 1e-12, '(2+5i) ^ 3.24 = -176.647 -153.359i');
	ok(Math.abs(c.pow(3.24).im + 153.35877082892785196) < 1e-12, '(2+5i) ^ 3.24 = -176.647 -153.359i');

	ok(c.pow(-3.24).isEqual(new MathLib.Complex(-0.0032280175872257475063,
		0.0028024579561675012682)), '(2+5i) ^ -3.24 = -0.00322802 + 0.00280246i');
});
test('.sec()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sec().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sec().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sec(), new MathLib.Complex(0.15117629826557722714, 0.22697367539372159537)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sec(), new MathLib.Complex(-0.036253496915868871891, -0.005164344607753179367)));
});
test('.sech()', 4, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sech().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sech().re));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sech(), new MathLib.Complex(-0.41314934426694000946, -0.68752743865547898158)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sech(), new MathLib.Complex(-0.065294027857947046445, -0.075224960302773226866)));
});
test('.sign()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).sign(),
			pn = (new MathLib.Complex(+0, -0)).sign(),
			np = (new MathLib.Complex(-0, +0)).sign(),
			nn = (new MathLib.Complex(-0, -0)).sign();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sign().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sign().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok((new MathLib.Complex(2, -3)).sign().isEqual(MathLib.Complex.polar(1, Math.atan2(-3, 2))));
	ok((new MathLib.Complex(5, 6)).sign().isEqual(MathLib.Complex.polar(1, Math.atan2(6, 5))));
});
test('.sin()', 11, function () {
	var pp = (new MathLib.Complex(+0, +0)).sin(),
			pn = (new MathLib.Complex(+0, -0)).sin(),
			np = (new MathLib.Complex(-0, +0)).sin(),
			nn = (new MathLib.Complex(-0, -0)).sin();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sin().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sin().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sin(), new MathLib.Complex(3.1657785132161674, 1.959601041421606)));
});
test('.sinh()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).sinh(),
			pn = (new MathLib.Complex(+0, -0)).sinh(),
			np = (new MathLib.Complex(-0, +0)).sinh(),
			nn = (new MathLib.Complex(-0, -0)).sinh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sinh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).sinh().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).sinh(), new MathLib.Complex(-0.4890562590412936736, 1.4031192506220405880)));

	// Chrome implemented sin, cos & tan in a new way:
	// https://codereview.chromium.org/70003004/
	// While the new implementation is faster, it is also not acurate.
	// I expect the bug to be fixed soon and it isn't causing major problems,
	// I will only modify the test now and not the code.
	// Affected tests:
	// Complex.polar, Complex#cosh, Complex#sinh
	//
	// More information:
	// https://code.google.com/p/v8/issues/detail?id=3006
	if (Math.cos(-5) === 0.2836621854632259) {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sinh(), new MathLib.Complex(6.5481200409109945, -7.619231720321402)));
	}
	else {
		ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).sinh(), new MathLib.Complex(6.5481200409110016478, -7.6192317203214102085)));
	}
});
test('.sqrt()', 6, function () {
	ok(MathLib.isNaN((new MathLib.Complex(NaN)).sqrt().re));
	equal((new MathLib.Complex(Infinity)).sqrt().re, Infinity);

	ok(MathLib.isEqual((new MathLib.Complex(0, 0)).sqrt(), new MathLib.Complex(0, 0)));
	ok(MathLib.isEqual((new MathLib.Complex(0, 2)).sqrt(), new MathLib.Complex(1, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, 0)).sqrt(), new MathLib.Complex(0, 1)));
	ok(MathLib.isEqual((new MathLib.Complex(-1, -0)).sqrt(), new MathLib.Complex(0, -1)));
});
test('.tan()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).tan(),
			pn = (new MathLib.Complex(+0, -0)).tan(),
			np = (new MathLib.Complex(-0, +0)).tan(),
			nn = (new MathLib.Complex(-0, -0)).tan();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).tan().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).tan().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).tan(), new MathLib.Complex(0.033812826079896690284, 1.0147936161466335681)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).tan(), new MathLib.Complex(0.00018734620462947843, 0.99935598738147314139)));
});
test('.tanh()', 12, function () {
	var pp = (new MathLib.Complex(+0, +0)).tanh(),
			pn = (new MathLib.Complex(+0, -0)).tanh(),
			np = (new MathLib.Complex(-0, +0)).tanh(),
			nn = (new MathLib.Complex(-0, -0)).tanh();

	ok(MathLib.isNaN((new MathLib.Complex(NaN)).tanh().re));
	ok(MathLib.isNaN((new MathLib.Complex(Infinity)).tanh().re));

	ok(MathLib.isPosZero(pp.re));
	ok(MathLib.isPosZero(pp.im));

	ok(MathLib.isPosZero(pn.re));
	ok(MathLib.isNegZero(pn.im));

	ok(MathLib.isNegZero(np.re));
	ok(MathLib.isPosZero(np.im));

	ok(MathLib.isNegZero(nn.re));
	ok(MathLib.isNegZero(nn.im));

	ok(MathLib.isEqual((new MathLib.Complex(1, 2)).tanh(), new MathLib.Complex(1.16673625724091988181, -0.24345820118572525270)));
	ok(MathLib.isEqual((new MathLib.Complex(-3, 4)).tanh(), new MathLib.Complex(-1.00070953606723293933, 0.00490825806749606026)));
});
test('.times()', 19, function () {
	var inf = new MathLib.Complex(Infinity),
			nan = new MathLib.Complex(NaN),
			zero = new MathLib.Complex(0, 0),
			c = new MathLib.Complex(2, 5),
			d = new MathLib.Complex(3, 7),
			r = new MathLib.Rational(2, 3);

	ok(MathLib.isNaN(nan.times(nan).re), 'ComplexNaN * ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(nan.times(inf).re), 'ComplexNaN * ComplexInfinity = ComplexNaN');
	ok(MathLib.isNaN(nan.times(zero).re), 'ComplexNaN * 0 = ComplexNaN');
	ok(MathLib.isNaN(nan.times(c).re), 'ComplexNaN * (2+5i) = ComplexNaN');

	ok(MathLib.isNaN(inf.times(nan).re), 'ComplexInfinity * ComplexNaN = ComplexNaN');
	deepEqual(inf.times(inf), inf, 'ComplexInfinity * ComplexInfinity = ComplexInfinity');
	ok(MathLib.isNaN(inf.times(zero).re), 'ComplexInfinity * 0 = ComplexNaN');
	deepEqual(inf.times(c), inf, 'ComplexInfinity * (2+5i) = ComplexInfinity');

	ok(MathLib.isNaN(zero.times(nan).re), '0 * ComplexNaN = ComplexNaN');
	ok(MathLib.isNaN(zero.times(inf).re), '0 * ComplexInfinity = ComplexNaN');
	deepEqual(zero.times(zero), zero, '0 * 0 = 0');
	deepEqual(zero.times(c), zero, '0 * (2+5i) = 0');

	ok(MathLib.isNaN(c.times(nan).re), '(2+5i) * ComplexNaN = ComplexNaN');
	deepEqual(c.times(inf), inf, '(2+5i) * ComplexInfinity = ComplexInfinity');
	deepEqual(c.times(zero), zero, '(2+5i) * 0 = 0');
	deepEqual(c.times(c), new MathLib.Complex(-21, 20), '(2+5i) * (2+5i) = -21+20i');

	equal(c.times(3).isEqual(new MathLib.Complex(6, 15)), true, 'Multiplying by a normal number.');
	equal(c.times(d).isEqual(new MathLib.Complex(-29, 29)), true, 'Multiplying by a complex number.');
	equal(c.times(r).isEqual(new MathLib.Complex(4 / 3, 10 / 3)), true, 'Multiplying by a rational number.');
});
test('.toContentMathML()', 7, function () {
	var c = new MathLib.Complex(3, 4),
			d = new MathLib.Complex(0, 7),
			e = new MathLib.Complex(4, 0),
			f = new MathLib.Complex(4, -5),
			g = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toContentMathML(), '<csymbol cd="nums1">NaN</csymbol>');
	equal((new MathLib.Complex(Infinity)).toContentMathML(), '<csymbol cd="nums1">infinity</csymbol>');

	equal(c.toContentMathML(), '<apply><plus /><cn type="double">3</cn><apply>' +
		'<times /><cn type="double">4</cn><imaginaryi /></apply></apply>', 'Normal complex number.');
	equal(d.toContentMathML(), '<apply><plus /><cn type="double">0</cn><apply>' +
		'<times /><cn type="double">7</cn><imaginaryi /></apply></apply>', 'Real part is zero.');
	equal(e.toContentMathML(), '<apply><plus /><cn type="double">4</cn><apply>' +
		'<times /><cn type="double">0</cn><imaginaryi /></apply></apply>', 'Complex part is zero.');
	equal(f.toContentMathML(), '<apply><plus /><cn type="double">4</cn><apply>' +
		'<times /><cn type="double">-5</cn><imaginaryi /></apply></apply>', 'Complex part is negative.');
	equal(g.toContentMathML(), '<apply><plus /><cn type="double">0</cn><apply>' +
		'<times /><cn type="double">0</cn><imaginaryi /></apply></apply>', 'Number is zero.');
});
test('.toLaTeX()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toLaTeX(), '\\text{ComplexNaN}');
	equal((new MathLib.Complex(NaN)).toLaTeX({sign: true}), '+\\text{ComplexNaN}');
	equal((new MathLib.Complex(Infinity)).toLaTeX(), '\\text{ComplexInfinity}');
	equal((new MathLib.Complex(Infinity)).toLaTeX({sign: true}), '+\\text{ComplexInfinity}');

	equal(c1.toLaTeX(), '3+4i', 'Normal complex number.');
	equal(c1.toLaTeX({sign: true}), '+3+4i', 'Normal complex number.');

	equal(c2.toLaTeX(), '-3+4i', 'Normal complex number.');
	equal(c2.toLaTeX({sign: true}), '-3+4i', 'Normal complex number.');

	equal(c3.toLaTeX(), '3-4i', 'Normal complex number.');
	equal(c3.toLaTeX({sign: true}), '+3-4i', 'Normal complex number.');

	equal(c4.toLaTeX(), '-3-4i', 'Normal complex number.');
	equal(c4.toLaTeX({sign: true}), '-3-4i', 'Normal complex number.');

	equal(d1.toLaTeX(), '7i', 'Real part is zero.');
	equal(d1.toLaTeX({sign: true}), '+7i', 'Real part is zero.');

	equal(d2.toLaTeX(), '-7i', 'Real part is zero.');
	equal(d2.toLaTeX({sign: true}), '-7i', 'Real part is zero.');

	equal(e1.toLaTeX(), '4', 'Complex part is zero.');
	equal(e1.toLaTeX({sign: true}), '+4', 'Complex part is zero.');
	equal(e2.toLaTeX(), '-4', 'Complex part is zero.');
	equal(e2.toLaTeX({sign: true}), '-4', 'Complex part is zero.');

	equal(f.toLaTeX(), '0', 'Number is zero.');
	equal(f.toLaTeX({sign: true}), '+0', 'Number is zero.');
});
test('.toMathML()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toMathML(), '<mi>ComplexNaN</mi>');
	equal((new MathLib.Complex(NaN)).toMathML({sign: true}), '<mo>+</mo><mi>ComplexNaN</mi>');
	equal((new MathLib.Complex(Infinity)).toMathML(), '<mi>ComplexInfinity</mi>');
	equal((new MathLib.Complex(Infinity)).toMathML({sign: true}), '<mo>+</mo><mi>ComplexInfinity</mi>');

	equal(c1.toMathML(), '<mn>3</mn><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c1.toMathML({sign: true}), '<mo>+</mo><mn>3</mn><mo>+</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c2.toMathML(), '<mn>-3</mn><mo>+</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c2.toMathML({sign: true}), '<mo>-</mo><mn>3</mn><mo>+</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c3.toMathML(), '<mn>3</mn><mo>-</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c3.toMathML({sign: true}), '<mo>+</mo><mn>3</mn><mo>-</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(c4.toMathML(), '<mn>-3</mn><mo>-</mo><mrow><mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');
	equal(c4.toMathML({sign: true}), '<mo>-</mo><mn>3</mn><mo>-</mo><mrow>' +
		'<mn>4</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Normal complex number.');

	equal(d1.toMathML(), '<mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');
	equal(d1.toMathML({sign: true}), '<mo>+</mo><mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');

	equal(d2.toMathML(), '<mrow><mn>-7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');
	equal(d2.toMathML({sign: true}), '<mo>-</mo><mrow><mn>7</mn><mo>&#x2062;</mo><mi>i</mi></mrow>', 'Real part is zero.');

	equal(e1.toMathML(), '<mn>4</mn>', 'Complex part is zero.');
	equal(e1.toMathML({sign: true}), '<mo>+</mo><mn>4</mn>', 'Complex part is zero.');
	equal(e2.toMathML(), '<mn>-4</mn>', 'Complex part is zero.');
	equal(e2.toMathML({sign: true}), '<mo>-</mo><mn>4</mn>', 'Complex part is zero.');

	equal(f.toMathML(), '<mn>0</mn>', 'Number is zero.');
	equal(f.toMathML({sign: true}), '<mo>+</mo><mn>0</mn>', 'Number is zero.');
});
test('.toPoint()', 5, function () {
	var c = new MathLib.Complex(3, -4),
			p = c.toPoint();

	equal(p.type, 'point', 'Converting a complex number to a point: type check');
	equal(p.dimension, 2, 'Converting a complex number to a point: dimension check.');
	deepEqual(p, new MathLib.Point([3, -4, 1]), 'Converting a complex number to a point: position check.');

	ok((new MathLib.Complex(NaN)).toPoint().isEqual(new MathLib.Point([0, 0, 0])), 'ComplexNaN.toPoint() = (0,0,0)');
	ok((new MathLib.Complex(Infinity)).toPoint().isEqual(new MathLib.Point([0, 0, 0])), 'ComplexInfinity.toPoint() = (0,0,0)');
});
test('.toString()', 22, function () {
	var c1 = new MathLib.Complex(3, 4),
			c2 = new MathLib.Complex(-3, 4),
			c3 = new MathLib.Complex(3, -4),
			c4 = new MathLib.Complex(-3, -4),
			d1 = new MathLib.Complex(0, 7),
			d2 = new MathLib.Complex(0, -7),
			e1 = new MathLib.Complex(4, 0),
			e2 = new MathLib.Complex(-4, 0),
			f = new MathLib.Complex(0, 0);

	equal((new MathLib.Complex(NaN)).toString(), 'ComplexNaN');
	equal((new MathLib.Complex(NaN)).toString({sign: true}), '+ComplexNaN');
	equal((new MathLib.Complex(Infinity)).toString(), 'ComplexInfinity');
	equal((new MathLib.Complex(Infinity)).toString({sign: true}), '+ComplexInfinity');

	equal(c1.toString(), '3+4i', 'Normal complex number.');
	equal(c1.toString({sign: true}), '+3+4i', 'Normal complex number.');

	equal(c2.toString(), '-3+4i', 'Normal complex number.');
	equal(c2.toString({sign: true}), '-3+4i', 'Normal complex number.');

	equal(c3.toString(), '3-4i', 'Normal complex number.');
	equal(c3.toString({sign: true}), '+3-4i', 'Normal complex number.');

	equal(c4.toString(), '-3-4i', 'Normal complex number.');
	equal(c4.toString({sign: true}), '-3-4i', 'Normal complex number.');

	equal(d1.toString(), '7i', 'Real part is zero.');
	equal(d1.toString({sign: true}), '+7i', 'Real part is zero.');

	equal(d2.toString(), '-7i', 'Real part is zero.');
	equal(d2.toString({sign: true}), '-7i', 'Real part is zero.');

	equal(e1.toString(), '4', 'Complex part is zero.');
	equal(e1.toString({sign: true}), '+4', 'Complex part is zero.');
	equal(e2.toString(), '-4', 'Complex part is zero.');
	equal(e2.toString({sign: true}), '-4', 'Complex part is zero.');

	equal(f.toString(), '0', 'Number is zero.');
	equal(f.toString({sign: true}), '+0', 'Number is zero.');
});
module('Conic');
test('init', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(typeof p, 'object', 'Testing typeof');
});



// Properties
test('.constructor', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(p.constructor, MathLib.Conic, 'Testing .constructor');
});


test('.type', 1, function () {
	var p = new MathLib.Conic(new MathLib.Matrix([[0, 1], [2, 3]]));
	equal(p.type, 'conic', 'Testing .type');
});
test('.throughFivePoints()', 5, function () {
	var p1 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p2 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p3 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p4 = new MathLib.Point([Math.random(), Math.random(), 1]),
			p5 = new MathLib.Point([Math.random(), Math.random(), 1]),
			conic = MathLib.Conic.throughFivePoints(p1, p2, p3, p4, p5);

	ok(MathLib.isEqual(p1.times(conic.primal).scalarProduct(p1), 0), 'conic goes through first point');
	ok(MathLib.isEqual(p2.times(conic.primal).scalarProduct(p2), 0), 'conic goes through second point');
	ok(MathLib.isEqual(p3.times(conic.primal).scalarProduct(p3), 0), 'conic goes through third point');
	ok(MathLib.isEqual(p4.times(conic.primal).scalarProduct(p4), 0), 'conic goes through fourth point');
	ok(MathLib.isEqual(p5.times(conic.primal).scalarProduct(p5), 0), 'conic goes through fifth point');
});
test('.eccentricity()', 10, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			c2 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, -2]]),

			e1 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			e2 = new MathLib.Conic([[8, 0, 0], [0, 6, 0], [0, 0, -2]]),

			p1 = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			p2 = new MathLib.Conic([[2, 0, 0], [0, 0, -1], [0, -1, 0]]),

			h1 = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			h2 = new MathLib.Conic([[8, 0, 0], [0, -6, 0], [0, 0, -2]]),

			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]);

	equal(c1.eccentricity(), 0, 'circle.eccentricity() = 0');
	equal(c2.eccentricity(), 0, 'circle.eccentricity() = 0');
	equal(e1.eccentricity(), 0.5, 'ellipse.eccentricity()');
	equal(e2.eccentricity(), 0.5, 'ellipse.eccentricity()');
	equal(p1.eccentricity(), 1, 'parabola.eccentricity() = 1');
	equal(p2.eccentricity(), 1, 'parabola.eccentricity() = 1');
	equal(h1.eccentricity(), Math.sqrt(1 + 4 / 3), 'hyperbola.eccentricity()');
	equal(h2.eccentricity(), Math.sqrt(1 + 4 / 3), 'hyperbola.eccentricity()');
	equal(deg1.eccentricity(), undefined, 'degeneratedConic.eccentricity() = undefined');
	equal(deg2.eccentricity(), undefined, 'degeneratedConic.eccentricity() = undefined');
});
test('.isDegenerated()', 5, function () {
	var c = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			e = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			p = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			h = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),

			deg = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 1], [0, 1, 1]]);

	equal(c.isDegenerated(), false, '.isDegenerated(hyperbola) = false');
	equal(e.isDegenerated(), false, '.isDegenerated(ellipse) = false');
	equal(p.isDegenerated(), false, '.isDegenerated(parabola) = false');
	equal(h.isDegenerated(), false, '.isDegenerated(hyperbola) = false');
	equal(deg.isDegenerated(), true, '.isDegenerated(degenerated conic) = true');
});
test('.isEqual()', 5, function () {
	var m = new MathLib.Matrix([[2, 1, 0], [1, 3, 0], [0, 0, 1]]),
			cm1 = new MathLib.Conic(m),
			cm2 = new MathLib.Conic(m),
			c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c2 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c3 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, 2]]),
			c4 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 2]]);

	equal(cm1.isEqual(cm2), true, 'same matrix variable');
	equal(c1.isEqual(c1), true, 'same variable');
	equal(c1.isEqual(c2), true, 'identical conic');
	equal(c1.isEqual(c3), true, 'scaled parameters');
	equal(c1.isEqual(c4), false, 'different conic');
});
test('.latusRectum()', 10, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			c2 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, -2]]),

			e1 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			e2 = new MathLib.Conic([[8, 0, 0], [0, 6, 0], [0, 0, -2]]),

			p1 = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			p2 = new MathLib.Conic([[2, 0, 0], [0, 0, -1], [0, -1, 0]]),

			h1 = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			h2 = new MathLib.Conic([[8, 0, 0], [0, -6, 0], [0, 0, -2]]),

			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]);

	equal(c1.latusRectum(), 2, 'circle.latusRectum()');
	equal(c2.latusRectum(), 2, 'circle.latusRectum()');
	equal(e1.latusRectum(), 4 / 3, 'ellipse.latusRectum()');
	equal(e2.latusRectum(), 4 / 3, 'ellipse.latusRectum()');
	equal(p1.latusRectum(), 1, 'parabola.latusRectum()');
	equal(p2.latusRectum(), 1, 'parabola.latusRectum()');
	equal(h1.latusRectum(), 4 / 3, 'hyperbola.latusRectum()');
	equal(h2.latusRectum(), 4 / 3, 'hyperbola.latusRectum()');
	equal(deg1.latusRectum(), undefined, 'degeneratedConic.latusRectum() = undefined');
	equal(deg2.latusRectum(), undefined, 'degeneratedConic.latusRectum() = undefined');
});
test('.linearEccentricity()', 10, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			c2 = new MathLib.Conic([[2, 0, 0], [0, 2, 0], [0, 0, -2]]),

			e1 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			e2 = new MathLib.Conic([[8, 0, 0], [0, 6, 0], [0, 0, -2]]),

			p1 = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			p2 = new MathLib.Conic([[2, 0, 0], [0, 0, -1], [0, -1, 0]]),

			h1 = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			h2 = new MathLib.Conic([[8, 0, 0], [0, -6, 0], [0, 0, -2]]),

			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]);

	equal(c1.linearEccentricity(), 0, 'circle.linearEccentricity()');
	equal(c2.linearEccentricity(), 0, 'circle.linearEccentricity()');
	equal(e1.linearEccentricity(), 0.28867513459481287, 'ellipse.linearEccentricity()');
	equal(e2.linearEccentricity(), 0.28867513459481287, 'ellipse.linearEccentricity()');
	equal(p1.linearEccentricity(), 1 / 4, 'parabola.linearEccentricity()');
	equal(p2.linearEccentricity(), 1 / 4, 'parabola.linearEccentricity()');
	equal(h1.linearEccentricity(), Math.sqrt(1 / 3 + 1 / 4), 'hyperbola.linearEccentricity()');
	equal(h2.linearEccentricity(), Math.sqrt(1 / 3 + 1 / 4), 'hyperbola.linearEccentricity()');
	equal(deg1.linearEccentricity(), undefined, 'degeneratedConic.linearEccentricity() = undefined');
	equal(deg2.linearEccentricity(), undefined, 'degeneratedConic.linearEccentricity() = undefined');
});
test('.meet()', 28, function () {
	var i, ii, meetingPoints,
			line = new MathLib.Line([-1, 1, 0]),
			conics = [];

	conics.push(new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]));
	conics.push(new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]));
	conics.push(new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]));
	conics.push(new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]]));

	for (i = 0, ii = conics.length; i < ii; i++) {
		meetingPoints = conics[i].meet(line);

		ok(MathLib.isEqual(meetingPoints[0].scalarProduct(line), 0), 'line goes through first meeting point');
		ok(MathLib.isEqual(meetingPoints[1].scalarProduct(line), 0), 'line goes through second meeting point');

		ok(MathLib.isEqual(meetingPoints[0].times(conics[i].primal).scalarProduct(meetingPoints[0]), 0),
			'conic goes through first meeting point');
		ok(MathLib.isEqual(meetingPoints[1].times(conics[i].primal).scalarProduct(meetingPoints[1]), 0),
			'conic goes through second meeting point');
	}
});
test('.normalize()', 30, function () {
	var i, cp, np,
			C = [],
			N = [],
			c1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			n1 = c1.normalize(),
			c2 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			n2 = c2.normalize(),
			c3 = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			n3 = c3.normalize(),
			c4 = new MathLib.Conic([[-4, 0, 0], [0, 0, 2], [0, 2, 8]]),
			n4 = c4.normalize(),

			c1Deg = new MathLib.Conic([[0, 0, 0], [0, 0, 0], [0, 0, 1]], [[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			n1Deg = c1Deg.normalize(),

			a = Math.random() - 0.5,
			b = Math.random() - 0.5,
			c = Math.random() - 0.5,
			d = Math.random() - 0.5,
			e = Math.random() - 0.5,
			f = Math.random() - 0.5,
			Conic = new MathLib.Conic([[a, b, d], [b, c, e], [d, e, f]]);

	C.push(c1);
	N.push(n1);
	C.push(c2);
	N.push(n2);
	C.push(c3);
	N.push(n3);
	C.push(c4);
	N.push(n4);
	C.push(c1Deg);
	N.push(n1Deg);
	C.push(Conic);
	N.push(Conic.normalize());


	for (i = 0; i < C.length; i++) {
		cp = C[i].primal;
		np = N[i].primal;

		equal(cp.rank(), np.rank(), true, 'rank is invariant');

		equal(np[0][1], 0, 'b is 0');
		equal(np[2][2] === 0 || np[2][2] === -1, true, 'f is 0 or -1');
		equal(np[0][0] * np[0][2], 0, 'a or d is 0');
		equal(np[1][1] * np[1][2], 0, 'c or e is 0');
	}
});
test('.polarity()', 14, function () {
	var q = new MathLib.Point([2, 1, 1]),
			l = new MathLib.Line([1, 2, 1]),
			c = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, -1]]),
			e = new MathLib.Conic([[4, 0, 0], [0, 3, 0], [0, 0, -1]]),
			p = new MathLib.Conic([[1, 0, 0], [0, 0, -0.5], [0, -0.5, 0]]),
			h = new MathLib.Conic([[4, 0, 0], [0, -3, 0], [0, 0, -1]]),
			deg1 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, -1]]),
			deg2 = new MathLib.Conic([[1, 1, 0], [1, 2, 0], [0, 0, 0]]),
			deg3 = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]]);


	ok(MathLib.isEqual(c.polarity(q), new MathLib.Line([2, 1, -1])), 'circle.polarity()');
	ok(MathLib.isEqual(c.polarity(l), new MathLib.Point([1, 2, -1])), 'circle.polarity()');

	ok(MathLib.isEqual(e.polarity(q), new MathLib.Line([8, 3, -1])), 'ellipse.polarity()');
	ok(MathLib.isEqual(e.polarity(l), new MathLib.Point([1 / 4, 2 / 3, -1])), 'ellipse.polarity()');

	ok(MathLib.isEqual(p.polarity(q), new MathLib.Line([2, -0.5, -0.5])), 'parabola.polarity()');
	ok(MathLib.isEqual(p.polarity(l), new MathLib.Point([-0.25, 0.5, 1])), 'parabola.polarity()');

	ok(MathLib.isEqual(h.polarity(q), new MathLib.Line([8, -3, -1])), 'hyperbola.polarity()');
	ok(MathLib.isEqual(h.polarity(l), new MathLib.Point([0.25, -2 / 3, -1])), 'hyperbola.polarity()');

	ok(MathLib.isEqual(deg1.polarity(q), new MathLib.Line([3, 3, -1])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg1.polarity(l), new MathLib.Point([1, -1, 0])), 'degeneratedConic.polarity()');

	ok(MathLib.isEqual(deg2.polarity(q), new MathLib.Line([3, 4, 0])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg2.polarity(l), new MathLib.Point([0, 0, 1])), 'degeneratedConic.polarity()');

	ok(MathLib.isEqual(deg3.polarity(q), new MathLib.Line([2, 0, 0])), 'degeneratedConic.polarity()');
	ok(MathLib.isEqual(deg3.polarity(l), new MathLib.Point([0, 2, 1])), 'degeneratedConic.polarity()');
});
test('.splitDegenerated()', 4, function () {
	var c1 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			c2 = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 0]]),
			c3 = new MathLib.Conic([[1, 1, 0], [1, 1, 0], [0, 0, 0]]),
			c4 = new MathLib.Conic([[1, 0, 0], [0, 0, 0], [0, 0, 0]]);

	equal(c1.splitDegenerated(), undefined, 'rank 3 conic');
	deepEqual(c2.splitDegenerated(), [new MathLib.Line([1, 1, 0]), new MathLib.Line([1, -1, 0])], 'rank 2 conic');
	deepEqual(c3.splitDegenerated(), [new MathLib.Line([1, 1, 0]), new MathLib.Line([1, 1, 0])], 'rank 1 conic');
	deepEqual(c4.splitDegenerated(), [new MathLib.Line([1, 0, 0]), new MathLib.Line([1, 0, 0])], 'rank 1 conic');
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


test('.parse (assignment)', 9, function () {
	MathLib.Expression.variables = {};

	var one = MathLib.Expression.parse('a := 1');
	var two = MathLib.Expression.parse('b := c := 2');

	equal(one.subtype, 'assignment');
	equal(one.value.value, 1);
	deepEqual(one.content, [MathLib.Expression.variable('a')]);

	equal(two.subtype, 'assignment');
	equal(two.value.value, 2);
	deepEqual(two.content, [MathLib.Expression.variable('b'), MathLib.Expression.variable('c')]);


	equal(MathLib.Expression.variables.a, undefined);
	equal(one.evaluate().value, 1);
	equal(MathLib.Expression.variables.a.value, 1);
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
test('.compare()', 3, function () {
	var e1 = new MathLib.Expression('sin(42)'),
			e2 = new MathLib.Expression('sin(42)'),
			e3 = new MathLib.Expression('cos(42)'),
			e4 = new MathLib.Expression('tan(42)');
	equal(e1.compare(e2), 0, '.compare()');
	equal(e1.compare(e3), 1, '.compare()');
	equal(e1.compare(e4), -1,  '.compare()');
});
test('.evaluate()', 1, function () {
	MathLib.Expression.parse('a := 3').evaluate();
	equal((new MathLib.Expression('a+2')).evaluate(), 5);
});

test('.toContentMathML', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toContentMathML(), '<cn>123.456E-7</cn>', '("123.456E-7").toContentMathML()');
	equal(MathLib.Expression.parse('1+2').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">plus</csymbol><cn>1</cn><cn>2</cn></apply>', '("1+2").toContentMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">times</csymbol><apply><csymbol cd="arith1">plus</csymbol>' +
		'<cn>1</cn><cn>2</cn></apply><cn>3</cn></apply>', '("(1+2)*3").toContentMathML()');
	equal(MathLib.Expression.parse('2-3-4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">minus</csymbol><apply><csymbol cd="arith1">minus</csymbol>' +
		'<cn>2</cn><cn>3</cn></apply><cn>4</cn></apply>', '("2-3-4").toContentMathML()');

	equal(MathLib.Expression.parse('2/3/4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">divide</csymbol><apply><csymbol cd="arith1">divide</csymbol>' +
		'<cn>2</cn><cn>3</cn></apply><cn>4</cn></apply>', '("2/3/4").toContentMathML()');

	equal(MathLib.Expression.parse('2^3^4').toContentMathML(), '<apply><csymbol ' +
		'cd="arith1">power</csymbol><cn>2</cn><apply><csymbol cd="arith1">power' +
		'</csymbol><cn>3</cn><cn>4</cn></apply></apply>', '("2^3^4").toContentMathML()');

	equal(MathLib.Expression.parse('sin(1)').toContentMathML(), '<apply><csymbol ' +
		'cd="transc1">sin</csymbol><cn>1</cn></apply>', '("sin(1)").toContentMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toContentMathML(),
		'<apply><csymbol cd="arith1">plus</csymbol><apply><csymbol cd="transc1">' +
		'sin</csymbol><cn>1</cn></apply><apply><csymbol cd="transc1">cos' +
		'</csymbol><apply><csymbol cd="arith1">times</csymbol><apply><csymbol ' +
		'cd="transc1">exp</csymbol><cn>2</cn></apply><cn>3</cn></apply></apply>' +
		'</apply>', '("sin(1)+cos(exp(2)*3)").toContentMathML()');

	equal(MathLib.Expression.parse('a := 1').toContentMathML(),
		'<apply><csymbol cd="prog1">assignment</csymbol><ci>a</ci><cn>1</cn></apply>');
	equal(MathLib.Expression.parse('b := c := 2').toContentMathML(),
		'<apply><csymbol cd="prog1">assignment</csymbol><ci>b</ci><apply>' +
		'<csymbol cd="prog1">assignment</csymbol><ci>c</ci><cn>2</cn></apply></apply>');
});
test('.toLaTeX', 15, function () {
	equal(MathLib.Expression.parse('123.456E-7').toLaTeX(), '123.456E-7', '("123.456E-7").toLaTeX()');
	equal(MathLib.Expression.parse('1+2').toLaTeX(), '1+2', '("1+2").toLaTeX()');
	equal(MathLib.Expression.parse('(1+2)*3').toLaTeX(), '\\left(1+2\\right)\\cdot3', '("(1+2)*3").toLaTeX()');
	equal(MathLib.Expression.parse('2-3-4').toLaTeX(), '2-3-4', '("2-3-4").toLaTeX()');
	equal(MathLib.Expression.parse('2/3/4').toLaTeX(), '\\frac{\\frac{2}{3}}{4}', '("2/3/4").toLaTeX()');
	equal(MathLib.Expression.parse('2^3^4').toLaTeX(), '2^{3^{4}}', '("2^3^4").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)').toLaTeX(), '\\sin\\left(1\\right)', '("sin(1)").toLaTeX()');
	equal(MathLib.Expression.parse('exp(1)').toLaTeX(), 'e^{1}', '("exp(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sqrt(1)').toLaTeX(), '\\sqrt{1}', '("sqrt(1)").toLaTeX()');
	equal(MathLib.Expression.parse('arsinh(1)').toLaTeX(), '\\operatorname{arsinh}\\left(1\\right)', '("arsinh(1)").toLaTeX()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toLaTeX(),
		'\\sin\\left(1\\right)+\\cos\\left(e^{2}\\cdot3\\right)', '("sin(1)+cos(exp(2)*3)").toLaTeX()');
	equal(MathLib.Expression.parse('a := 1').toLaTeX(), 'a := 1');
	equal(MathLib.Expression.parse('b := c := 2').toLaTeX(), 'b := c := 2');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn type="complex-cartesian">2<sep/>3</cn></math>').toLaTeX(), '2+3i', '.toLaTeX() complex');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toLaTeX(), '\\left{1, 2, 3\\right}', '.toLaTeX() set');
});
test('.toMathML', 10, function () {
	equal(MathLib.Expression.parse('123.456E-7').toMathML(),
		'<mn>123.456E-7</mn>', '("123.456E-7").toMathML()');
	equal(MathLib.Expression.parse('1+2').toMathML(), '<mrow><mn>1</mn>' +
		'<mo>+</mo><mn>2</mn></mrow>', '("1+2").toMathML()');
	equal(MathLib.Expression.parse('(1+2)*3').toMathML(), '<mrow><mrow>' +
		'<mo>(</mo><mrow><mn>1</mn><mo>+</mo><mn>2</mn></mrow><mo>)</mo></mrow>' +
		'<mo>&middot;</mo><mn>3</mn></mrow>', '("(1+2)*3").toMathML()');
	equal(MathLib.Expression.parse('2-3-4').toMathML(), '<mn>2</mn><mo>-</mo>' +
		'<mn>3</mn><mo>-</mo><mn>4</mn>', '("2-3-4").toMathML()');
	equal(MathLib.Expression.parse('2/3/4').toMathML(), '<mfrac><mfrac>' +
		'<mn>2</mn><mn>3</mn></mfrac><mn>4</mn></mfrac>', '("2/3/4").toMathML()');
	equal(MathLib.Expression.parse('2^3^4').toMathML(), '<msup><mn>2</mn><msup>' +
		'<mn>3</mn><mn>4</mn></msup></msup>', '("2^3^4").toMathML()');
	equal(MathLib.Expression.parse('sin(1)').toMathML(), '<mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)</mo></mrow></mrow>', '("sin(1)").toMathML()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toMathML(),
		'<mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo><mn>1</mn><mo>)' +
		'</mo></mrow></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mrow><mo>(' +
		'</mo><mrow><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mn>2</mn>' +
		'<mo>)</mo></mrow></mrow><mo>&middot;</mo><mn>3</mn></mrow><mo>)</mo>' +
		'</mrow></mrow></mrow>', '("sin(1)+cos(exp(2)*3)").toMathML()');
	equal(MathLib.Expression.parse('a := 1').toMathML(), '<mi>a</mi><mo>:=</mo><mn>1</mn>');
	equal(MathLib.Expression.parse('b := c := 2').toMathML(), '<mi>b</mi><mo>:=</mo><mi>c</mi><mo>:=</mo><mn>2</mn>');
});
test('.toString', 14, function () {
	equal(MathLib.Expression.parse('123.456E-7').toString(), '123.456E-7', '("123.456E-7").toString()');
	equal(MathLib.Expression.parse('1+2').toString(), '1+2', '("1+2").toString()');
	equal(MathLib.Expression.parse('(1+2)*3').toString(), '(1+2)*3', '("(1+2)*3").toString()');
	equal(MathLib.Expression.parse('2-3-4').toString(), '2-3-4', '("2-3-4").toString()');
	equal(MathLib.Expression.parse('2/3/4').toString(), '2/3/4', '("2/3/4").toString()');
	equal(MathLib.Expression.parse('2^3^4').toString(), '2^3^4', '("2^3^4").toString()');
	equal(MathLib.Expression.parse('sin(1)').toString(), 'sin(1)', '("sin(1)").toString()');
	equal(MathLib.Expression.parse('sin(1)+cos(exp(2)*3)').toString(),
		'sin(1)+cos(exp(2)*3)', '("sin(1)+cos(exp(2)*3)").toString()');
	equal(MathLib.Expression.parse('a := 1').toString(), 'a := 1');
	equal(MathLib.Expression.parse('b := c := 2').toString(), 'b := c := 2');

	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn type="complex-cartesian">2<sep/>3</cn></math>').toString(), '2+3i', '.toString() complex');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<cn type="rational">3<sep/>4</cn></math>').toString(), '3/4', '.parse() rational');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<set><cn>1</cn><cn>2</cn><cn>3</cn></set></math>').toString(), '{1, 2, 3}', '.toString() set');
	equal(MathLib.Expression.parseContentMathML('<math xmlns="http://www.w3.org/1998/Math/MathML">' +
		'<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').toString(), '(1, 2, 3)', 'toString() vector');
});
module('EvaluationError');
test('init', 2, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.message, 'message', 'Testing .message');
	equal(e.method, 'method', 'Testing .method');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.constructor, MathLib.EvaluationError, 'Testing .constructor');
});


test('.type', 1, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.type, 'evaluationError', 'Testing .type');
});


test('intanceof', 2, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	ok(e instanceof MathLib.EvaluationError, 'instanceof MathLib.EvaluationError');
	ok(e instanceof Error, 'instanceof Error');
});

module('Functn');
test('execution', 4, function () {
	equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
	equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
	equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
	ok(MathLib.isEqual(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin),
		MathLib.times(MathLib.cos, MathLib.cos))(42), 1), 'sin(42)^2 + cos(42)^2 = 1');
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


test('.call', 14, function () {
	var f;
	equal(MathLib.minus(4, 3), 1, 'MathLib.minus with two arguments evaluates the functn');

	f = MathLib.minus(4);

	equal(f.toString(), 'y ⟼ 4 - y', 'MathLib.minus with one undefined arguments does partial application');
	equal(f(3), 1);

	f = MathLib.minus(undefined, 3);
	equal(f.toString(), 'x ⟼ x - 3', 'MathLib.minus with one undefined arguments does partial application');
	equal(f(4), 1);

	f = MathLib.minus(MathLib.cos);
	equal(f.toString(), '(x, y) ⟼ cos(x) - y');
	equal(f(0, 2), -1);

	f = MathLib.minus(MathLib.cos, 3);
	equal(f.toString(), 'x ⟼ cos(x) - 3');
	equal(f(0), -2);

	f = MathLib.minus(4, MathLib.cos);
	equal(f.toString(), 'x ⟼ 4 - cos(x)');
	equal(f(0), 3);

	f = MathLib.sin(MathLib.Expression.variable('u'));
	equal(f.toString(), 'u ⟼ sin(u)');

	deepEqual(MathLib.sqrt([0, 1, 4, 9, 16]), [0, 1, 2, 3, 4]);
	deepEqual(MathLib.minus([1, 2, 3], [1, 2, 3]), [[0, -1, -2], [1, 0, -1], [2, 1, 0]]);
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
	equal(MathLib.isEqual(MathLib.arsinh(1), 0.8813735870195429), true,
		'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
	equal(MathLib.isEqual(MathLib.arsinh(10), 2.99822295029797), true,
		'Spec. 6: otherwise MathLib.arsinh(x) = inverse hyperbolic sine of x');
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
	equal(MathLib.isEqual(MathLib.cosh(1), 1.5430806348152437), true,
		'Spec. 4: otherwise MathLib.cosh(x) = hyperbolic cosine of x');
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
	ok(MathLib.isEqual(MathLib.csch(1), 0.8509181282393216),
		'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
	ok(MathLib.isEqual(MathLib.csch(10), 0.00009079985971212217),
		'Spec. 6: otherwise MathLib.csch(x) = hyperbolic cosecant of x');
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
test('.equivalent()', 4, function () {
	equal(MathLib.equivalent(true, true), true, 'true <=> true = true');
	equal(MathLib.equivalent(true, false), false, 'true <=> false = false');
	equal(MathLib.equivalent(false, true), false, 'false <=> true = false');
	equal(MathLib.equivalent(false, false), true, 'false <=> false = true');
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
/*
test('.factor()', 2, function () {
	deepEqual(MathLib.factor(12), new MathLib.Set([2, 2, 3]));
	deepEqual(MathLib.factor(-15), new MathLib.Set([3, 5]));
});
*/
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
	equal(MathLib.isNaN(MathLib.hypot(NaN, 2)), true,
		'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');
	equal(MathLib.isNaN(MathLib.hypot(2, NaN)), true,
		'Spec. 2: MathLib.hypot(x, y, ...) = NaN if any argument is NaN, and none infinite');

	// Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0
	equal(MathLib.isPosZero(MathLib.hypot(0, 0)), true, 'Spec. 3: MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');
	equal(MathLib.isPosZero(MathLib.hypot(-0, -0)), true, 'Spec. 3:MathLib.hypot(x, y, ...) = +0 if all arguments are ±0');


	// Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments
	equal(MathLib.isEqual(MathLib.hypot(3), 3), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(-3), 3), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4), 5), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
	equal(MathLib.isEqual(MathLib.hypot(3, 4, 12), 13), true,
		'Spec. 4: Otherwise MathLib.hypot(x, y, ...) = the square root of the sum of the squared arguments');
});
test('.hypot2()', 6, function () {
	equal(MathLib.isEqual(MathLib.hypot2(3, 4), 25), true);
	equal(MathLib.isEqual(MathLib.hypot2(3, 4, 12), 169), true);
	ok(MathLib.isNaN(MathLib.hypot2(NaN, 4)));
	deepEqual(MathLib.hypot2(NaN, Infinity), Infinity);
	equal(MathLib.hypot2(-Infinity, NaN), Infinity);
	equal(MathLib.hypot2(Infinity, 4), Infinity);
});
test('.implies()', 4, function () {
	equal(MathLib.implies(true, true), true, 'true => true = true');
	equal(MathLib.implies(true, false), false, 'true => false = false');
	equal(MathLib.implies(false, true), true, 'false => true = true');
	equal(MathLib.implies(false, false), true, 'false => false = true');
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
test('.lg()', 8, function () {
	equal(MathLib.lg(1), 0, 'MathLib.lg(1) should be 0');
	equal(MathLib.lg(10), 1, 'MathLib.lg(10) should be 1');
	equal(MathLib.lg(+Infinity), +Infinity, 'MathLib.lg(+Infinity) should be +Infinity');
	equal(MathLib.lg(+0), -Infinity, 'MathLib.lg(+0) should be -Infinity');
	equal(MathLib.lg(-0), -Infinity, 'MathLib.lg(-0) should be -Infinity');
	equal(MathLib.isNaN(MathLib.lg(-4)), true, 'MathLib.lg(-4) should be NaN');
	equal(MathLib.isNaN(MathLib.lg(-Infinity)), true, 'MathLib.lg(-Infinity) should be NaN');
	equal(MathLib.isNaN(MathLib.lg(NaN)), true, 'MathLib.lg(NaN) should be NaN');
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
test('.logGamma()', 8, function () {
	// Spec. 1: MathLib.logGamma(NaN) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(NaN)), true, 'Spec. 1: MathLib.logGamma(NaN) = NaN');

	// Spec. 2: MathLib.logGamma(+0) = +∞
	equal(MathLib.logGamma(+0), Infinity, 'Spec. 2: MathLib.logGamma(+0) = +∞');

	// Spec. 3: MathLib.logGamma(-0) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(-0)), true, 'Spec. 3: MathLib.logGamma(-0) = NaN');

	// Spec. 4: MathLib.logGamma(+∞) = +∞
	equal(MathLib.logGamma(+Infinity), +Infinity, 'Spec. 4: MathLib.logGamma(+∞) = +∞');

	// Spec. 5: MathLib.logGamma(-∞) = NaN
	equal(MathLib.isNaN(MathLib.logGamma(-Infinity)), true, 'Spec. 5: MathLib.logGamma(-∞) = NaN');

	// Spec. 6: MathLib.logGamma(x) = NaN (if x < 0)
	equal(MathLib.isNaN(MathLib.logGamma(-8)), true, 'Spec. 6: MathLib.logGamma(x) = NaN (if x < 0)');

	// Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x
	equal(MathLib.logGamma(8), 8.5251613610654143002, 'Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x');
	equal(MathLib.logGamma(10000), 82099.717496442377273, 'Spec. 7: otherwise MathLib.logGamma(x) = logarithm of the gamma function of x');
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
test('.mod()', 25, function () {
	ok(MathLib.isNaN(MathLib.mod(NaN, NaN)), 'NaN mod NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(NaN, Infinity)), 'NaN mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(NaN, -Infinity)), 'NaN mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, NaN)), '-∞ mod NaN = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, NaN)), '-∞ mod -NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(NaN, 3)), 'NaN mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(NaN, -3)), 'NaN mod -3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(4, NaN)), '-4 mod NaN = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, NaN)), '-4 mod -NaN = NaN');

	ok(MathLib.isNaN(MathLib.mod(Infinity, Infinity)), '∞ mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, -Infinity)), '∞ mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, Infinity)), '-∞ mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, -Infinity)), '-∞ mod -∞ = NaN');

	ok(MathLib.isNaN(MathLib.mod(Infinity, 3)), '∞ mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(Infinity, -3)), '∞ mod -3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, 3)), '-∞ mod 3 = NaN');
	ok(MathLib.isNaN(MathLib.mod(-Infinity, -3)), '-∞ mod -3 = NaN');

	ok(MathLib.isNaN(MathLib.mod(4, Infinity)), '4 mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(4, -Infinity)), '4 mod -∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, Infinity)), '-4 mod ∞ = NaN');
	ok(MathLib.isNaN(MathLib.mod(-4, -Infinity)), '-4 mod -∞ = NaN');

	equal(MathLib.mod(4, 3), 1, '4 mod 3 = 1');
	equal(MathLib.mod(4, -3), -2, '4 mod -3 = -2');
	equal(MathLib.mod(-4, 3), 2, '-4 mod 3 = 2');
	equal(MathLib.mod(-4, -3), -1, '-4 mod -3 = -1');
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

	// Spec. 2: MathLib.pow (±0, y) = ±∞ (for y a finite, odd integer < 0)
	equal(MathLib.pow(+0, -5), +Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (or y a finite, odd integer < 0)');
	equal(MathLib.pow(-0, -5), -Infinity, 'Spec. 2: MathLib.pow (±0, y) = ±∞ (or y a finite, odd integer < 0)');

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

	// Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)
	equal(MathLib.isPosZero(MathLib.pow(+0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)');
	equal(MathLib.isNegZero(MathLib.pow(-0, 5)), true, 'Spec. 6: MathLib.pow (±0, y) = ±0 (for y a finite, odd integer > 0)');

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
test('.rem()', 37, function () {
	ok(MathLib.isNaN(MathLib.rem(NaN, NaN)), 'NaN rem NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(NaN, Infinity)), 'NaN rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(NaN, -Infinity)), 'NaN rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, NaN)), '-∞ rem NaN = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, NaN)), '-∞ rem -NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(NaN, 3)), 'NaN rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(NaN, -3)), 'NaN rem -3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(4, NaN)), '-4 rem NaN = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, NaN)), '-4 rem -NaN = NaN');

	ok(MathLib.isNaN(MathLib.rem(Infinity, Infinity)), '∞ rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, -Infinity)), '∞ rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, Infinity)), '-∞ rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, -Infinity)), '-∞ rem -∞ = NaN');

	ok(MathLib.isNaN(MathLib.rem(Infinity, 3)), '∞ rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(Infinity, -3)), '∞ rem -3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, 3)), '-∞ rem 3 = NaN');
	ok(MathLib.isNaN(MathLib.rem(-Infinity, -3)), '-∞ rem -3 = NaN');

	ok(MathLib.isNaN(MathLib.rem(4, Infinity)), '4 rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(4, -Infinity)), '4 rem -∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, Infinity)), '-4 rem ∞ = NaN');
	ok(MathLib.isNaN(MathLib.rem(-4, -Infinity)), '-4 rem -∞ = NaN');

	equal(MathLib.rem(4, 3), 1, '4 rem 3 = 1');
	equal(MathLib.rem(4, -3), 1, '4 rem -3 = 1');
	equal(MathLib.rem(-4, 3), -1, '-4 rem 3 = -1');
	equal(MathLib.rem(-4, -3), -1, '-4 rem -3 = -1');

	// Tests for the Safari 5 bug.
	// For more information see the src/Functn/functions/rem.ts file.
	equal(MathLib.rem(4, -1), 0, '4 rem -1 = 0');
	equal(MathLib.rem(4, -2), 0, '4 rem -2 = 0');
	equal(MathLib.rem(4, -4), 0, '4 rem -4 = 0');
	equal(MathLib.rem(4, -5), 4, '4 rem -5 = 4');
	equal(MathLib.rem(7, -1), 0, '7 rem -1 = 0');
	equal(MathLib.rem(7, -2), 1, '7 rem -2 = 1');
	equal(MathLib.rem(7, -4), 3, '7 rem -4 = 3');
	equal(MathLib.rem(7, -5), 2, '7 rem -5 = 2');
	equal(MathLib.rem(123456789, -10), 9, '123456789 rem -10 = 9');
	equal(MathLib.rem(123456789, -100), 89, '123456789 rem -100 = 89');
	equal(MathLib.rem(123456789, -1000), 789, '123456789 rem -1000 = 789');
	equal(MathLib.rem(987654321, -123456789), 9, '987654321 rem -123456789 = 9');
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
	equal(MathLib.isEqual(MathLib.sech(1), 0.6480542736638855), true,
		'Spec. 4: otherwise MathLib.sech(x) = hyperbolic secant of x');
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
	equal(MathLib.isEqual(MathLib.tanh(1), 0.761594155955765), true,
		'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
	equal(MathLib.isEqual(MathLib.tanh(10), 0.9999999958776927), true,
		'Spec. 6: otherwise MathLib.tanh(x) = hyperbolic tangent of x');
});
test('.times()', 5, function () {
	equal(MathLib.times(), 1, 'The empty product is one.');
	equal(MathLib.times([]), 1, 'The empty product is one.');
	equal(MathLib.times(1, 2), 2);
	equal(MathLib.times([1, 2]), 2);
	deepEqual(MathLib.times(MathLib.Matrix.identity(3), MathLib.Matrix.identity(3)),
		new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
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
test('.toContentMathML()', 26, function () {
	equal(MathLib.abs.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">abs</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.arctan2.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="transc2">arctan</csymbol>' +
		'<ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.binomial.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar>' +
		'<bvar><ci>k</ci></bvar><apply><csymbol cd="combinat1">binomial</csymbol>' +
		'<ci>n</ci><ci>k</ci></apply></lambda>');
	equal(MathLib.cbrt.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">root</csymbol><ci>x</ci><cn>3</cn></apply></lambda>');
	equal(MathLib.conjugate.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="complex1">conjugate</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.degToRad.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="arith1">' +
		'divide</csymbol><csymbol cd="nums1">pi</csymbol><cn>180</cn></apply><ci>x</ci></apply></lambda>');
	equal(MathLib.equivalent.toContentMathML(), '<lambda><bvar><ci>x</ci>' +
		'</bvar><bvar><ci>y</ci></bvar><apply><csymbol cd="logic1">equivalent' +
		'</csymbol><ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.exp.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="transc1">exp</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.factorial.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar>' +
		'<apply><csymbol cd="integer1">factorial</csymbol><ci>n</ci></apply></lambda>');
	equal(MathLib.implies.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="logic1">implies</csymbol>' +
		'<ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.inverse.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">divide</csymbol><cn>1</cn><ci>x</ci></apply></lambda>');
	equal(MathLib.lg.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply>' +
		'<csymbol cd="transc1">log</csymbol><cn>10</cn><ci>x</ci></apply></lambda>');
	equal(MathLib.log.toContentMathML(), '<lambda><bvar><ci>b</ci></bvar><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="transc1">log</csymbol><ci>b</ci><ci>x</ci></apply></lambda>');
	equal(MathLib.logGamma.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="transc1">ln</csymbol><apply><ci>Gamma</ci><ci>x</ci></apply></apply></lambda>');
	equal(MathLib.mod.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar><bvar>' +
		'<ci>m</ci></bvar><apply><ci>mod</ci><ci>n</ci><ci>m</ci></apply></lambda>');
	equal(MathLib.negative.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">unary_minus</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.pow.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><bvar>' +
		'<ci>y</ci></bvar><apply><csymbol cd="arith1">power</csymbol><ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.rem.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar><bvar>' +
		'<ci>m</ci></bvar><apply><csymbol cd="integer1">remainder</csymbol><ci>n' +
		'</ci><ci>m</ci></apply></lambda>');
	equal(MathLib.root.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="arith1">root</csymbol><ci>x' +
		'</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.sin.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply>' +
		'<csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.sqrt.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">root</csymbol><ci>x</ci><cn>2</cn></apply></lambda>');

	equal(MathLib.exp(MathLib.sin).toContentMathML(), '<lambda><bvar><ci>x</ci>' +
		'</bvar><apply><csymbol cd="transc1">exp</csymbol><apply><csymbol ' +
		'cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.exp(MathLib.sin).toContentMathML()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathML(), '<lambda><bvar>' +
// '<ci>x</ci></bvar><apply><power/><apply><csymbol cd=\"transc1\">sin' +
// '</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>',
// 'MathLib.pow(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><apply>' +
		'<csymbol cd="transc1">sin</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>',
		'MathLib.plus(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(2, MathLib.sin).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><cn>2</cn>' +
		'<apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.plus(2, MathLib.sin).toContentMathML()');
	equal(MathLib.times(2, MathLib.sin).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">times</csymbol><cn>2</cn>' +
		'<apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.times(2, MathLib.sin).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML(),
		'<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">plus' +
		'</csymbol><apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply>' +
		'<apply><csymbol cd="transc1">cos</csymbol><ci>x</ci></apply></apply>' +
		'</lambda>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML()');
});
test('.toLaTeX()', 26, function () {
	equal(MathLib.abs.toLaTeX(), 'x \\longmapsto \\left|x\\right|');
	equal(MathLib.arctan2.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\operatorname{arctan2}\\left(x, y\\right)');
	equal(MathLib.binomial.toLaTeX(), '\\left(n, k\\right) \\longmapsto {n \\choose k}');
	equal(MathLib.cbrt.toLaTeX(), 'x \\longmapsto \\sqrt[3]{x}');
	equal(MathLib.conjugate.toLaTeX(), 'x \\longmapsto \\overline{x}');
	equal(MathLib.degToRad.toLaTeX(), 'x \\longmapsto \\frac{\\pi}{180}x');
	equal(MathLib.equivalent.toLaTeX(), '\\left(x, y\\right) \\longmapsto x \\Leftrightarrow y');
	equal(MathLib.exp.toLaTeX(), 'x \\longmapsto e^{x}');
	equal(MathLib.factorial.toLaTeX(), 'n \\longmapsto n!');
	equal(MathLib.implies.toLaTeX(), '\\left(x, y\\right) \\longmapsto x \\Rightarrow y');
	equal(MathLib.inverse.toLaTeX(), 'x \\longmapsto \\frac{1}{x}');
	equal(MathLib.lg.toLaTeX(), 'x \\longmapsto \\lg\\left(x\\right)');
	equal(MathLib.log.toLaTeX(), '\\left(b, x\\right) \\longmapsto \\log_{b}\\left(x\\right)');
	equal(MathLib.logGamma.toLaTeX(), 'x \\longmapsto \\log\\left(\\Gamma\\left(x\\right)\\right)');
	equal(MathLib.mod.toLaTeX(), '\\left(n, m\\right) \\longmapsto n \\mod m');
	equal(MathLib.negative.toLaTeX(), 'x \\longmapsto -x');
	equal(MathLib.pow.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\left(x\\right)^{y}');
	equal(MathLib.rem.toLaTeX(), '\\left(n, m\\right) \\longmapsto n \\operatorname{rem} m');
	equal(MathLib.root.toLaTeX(), '\\left(x, y\\right) \\longmapsto \\left(x\\right)^{\\frac{1}{y}}');
	equal(MathLib.sin.toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)');
	equal(MathLib.sqrt.toLaTeX(), 'x \\longmapsto \\sqrt{x}');

	equal(MathLib.exp(MathLib.sin).toLaTeX(), 'x \\longmapsto e^{\\sin\\left(x\\right)}',
		'MathLib.exp(MathLib.sin).toLaTeX() should be x \\longmapsto e^{\\sin\\left(x\\right)}');
	// equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto sin(x)^2',
	// 'MathLib.pow(MathLib.sin, 2).toLaTeX() = x \\longmapsto sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)+2',
		'MathLib.plus(MathLib.sin, 2).toLaTeX() = x \\longmapsto \\sin\\left(x\\right)+2');
	equal(MathLib.plus(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2+\\sin\\left(x\\right)',
		'MathLib.plus(2, MathLib.sin).toLaTeX() = x \\longmapsto 2+\\sin\\left(x\\right)');
	equal(MathLib.times(2, MathLib.sin).toLaTeX(), 'x \\longmapsto 2\\cdot\\sin\\left(x\\right)',
		'MathLib.times(2, MathLib.sin).toLaTeX() = x \\longmapsto 2\\cdot\\sin\\left(x\\right)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), 'x \\longmapsto \\sin\\left(x\\right)' +
		'+\\cos\\left(x\\right)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = x \\longmapsto' +
		' \\sin\\left(x\\right)+\\cos\\left(x\\right)');
});
test('.toMathML()', 26, function () {
	equal(MathLib.abs.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mo>|' +
		'</mo><mi>x</mi><mo>|</mo></mrow></mrow>');
	equal(MathLib.arctan2.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</m' +
		'o><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>arctan2</mi><mo>' +
		'&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>,</mo><mi>y</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.binomial.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</' +
		'mo><mi>k</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mfenced><mfrac ' +
	'linethickness="0"><mi>n</mi><mi>k</mi></mfrac></mfenced></mrow></mrow>');
	equal(MathLib.cbrt.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mro' +
		'ot><mi>x</mi><mn>3</mn></mroot></mrow></mrow>');
	equal(MathLib.conjugate.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow' +
		'><mover><mi>x</mi><mo>‾</mo></mover></mrow></mrow>');
	equal(MathLib.degToRad.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mfrac><mi>&pi;</mi><mn>180</mn></mfrac><mo>&#x2062;</mo><mi>x</mi>' +
		'</mrow></mrow>');
	equal(MathLib.equivalent.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi>' +
		'<mo>,</mo><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>x</mi>' +
		'<mo>&#x21D4;</mo><mi>y</mi></mrow></mrow>');
	equal(MathLib.exp.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>e' +
		'xp</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.factorial.toMathML(), '<mrow><mi>n</mi><mo>&#x27FC;</mo><mrow' +
		'><mi>n</mi><mo>!</mo></mrow></mrow>');
	equal(MathLib.implies.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</m' +
		'o><mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>x</mi><mo>&#x21D2;</mo><mi>y</mi></mrow></mrow>');
	equal(MathLib.inverse.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><' +
		'mfrac><mn>1</mn><mi>x</mi></mfrac></mrow></mrow>');
	equal(MathLib.lg.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>lg' +
		'</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>');
	equal(MathLib.log.toMathML(), '<mrow><mrow><mo>(</mo><mi>b</mi><mo>,</mo><m' +
		'i>x</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><msub><mi>log</mi>' +
		'<mi>b</mi></msub><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>');
	equal(MathLib.logGamma.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mi>log</mi><mo>&#x2061;</mo><mo>(</mo><mi mathvariant="normal">' +
		'&#x0393;</mi><mo>&#x2061;</mo><mo>(</mo><mi>x</mi><mo>)</mo><mo>)</mo></mrow></mrow>');
	equal(MathLib.mod.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</mo><m' +
		'i>m</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>n</mi><mi>mod</mi><mi>m</mi></mrow></mrow>');
	equal(MathLib.negative.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow>' +
		'<mo>&#x2212;</mo><mi>x</mi></mrow></mrow>');
	equal(MathLib.pow.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</mo><m' +
		'i>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><msup><mi>x</mi><mi>y</mi></msup></mrow></mrow>');
	equal(MathLib.rem.toMathML(), '<mrow><mrow><mo>(</mo><mi>n</mi><mo>,</mo><m' +
		'i>m</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mi>n</mi><mi>rem</mi><mi>m</mi></mrow></mrow>');
	equal(MathLib.root.toMathML(), '<mrow><mrow><mo>(</mo><mi>x</mi><mo>,</mo><' +
		'mi>y</mi><mo>)</mo></mrow><mo>&#x27FC;</mo><mrow><mroot><mi>x</mi><mi>y</mi></mroot></mrow></mrow>');
	equal(MathLib.sin.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mi>s' +
		'in</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow>');
	equal(MathLib.sqrt.toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><msq' +
		'rt><mi>x</mi></msqrt></mrow></mrow>');

	equal(MathLib.exp(MathLib.sin).toMathML(), '<mrow><mi>x</mi><mo>&#x27FC;' +
		'</mo><mrow><mi>exp</mi><mo>&af;</mo><mrow><mo>(</mo><mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>)' +
		'</mo></mrow></mrow></mrow>', 'MathLib.exp(MathLib.sin).toMathML()');
	// equal(MathLib.pow(MathLib.sin, 2).toMathML(), '<mrow><msup><mrow>' +
	// '<mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2' +
	// '</mn></msup></mrow>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo><mrow><mo>(</mo>' +
		'<mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mn>2</mn></mrow></mrow>',
		'MathLib.plus(MathLib.sin, 2).toMathML()');
	equal(MathLib.plus(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;' +
		'</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>',
		'MathLib.plus(2, MathLib.sin).toMathML()');
	equal(MathLib.times(2, MathLib.sin).toMathML(), '<mrow><mi>x</mi>' +
		'<mo>&#x27FC;</mo><mrow><mn>2</mn><mo>&middot;</mo><mrow><mi>sin</mi>' +
		'<mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow></mrow></mrow>',
		'MathLib.times(2, MathLib.sin).toMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathML(),
		'<mrow><mi>x</mi><mo>&#x27FC;</mo><mrow><mrow><mi>sin</mi><mo>&af;</mo>' +
		'<mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow><mo>+</mo><mrow><mi>' +
		'cos</mi><mo>&af;</mo><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow></mrow>' +
		'</mrow></mrow>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});
test('.toString()', 26, function () {
	equal(MathLib.abs.toString(), 'x ⟼ |x|');
	equal(MathLib.arctan2.toString(), '(x, y) ⟼ arctan2(x, y)');
	equal(MathLib.binomial.toString(), '(n, k) ⟼ binomial(n, k)');
	equal(MathLib.cbrt.toString(), 'x ⟼ cbrt(x)');
	equal(MathLib.conjugate.toString(), 'x ⟼ conjugate(x)');
	equal(MathLib.degToRad.toString(), 'x ⟼ π/180*x');
	equal(MathLib.equivalent.toString(), '(x, y) ⟼ x ⇔ y');
	equal(MathLib.exp.toString(), 'x ⟼ exp(x)');
	equal(MathLib.factorial.toString(), 'n ⟼ n!');
	equal(MathLib.implies.toString(), '(x, y) ⟼ x ⇒ y');
	equal(MathLib.inverse.toString(), 'x ⟼ 1/x');
	equal(MathLib.lg.toString(), 'x ⟼ lg(x)');
	equal(MathLib.log.toString(), '(b, x) ⟼ log_b(x)');
	equal(MathLib.logGamma.toString(), 'x ⟼ log(Γ(x))');
	equal(MathLib.mod.toString(), '(n, m) ⟼ n mod m');
	equal(MathLib.negative.toString(), 'x ⟼ -x');
	equal(MathLib.pow.toString(), '(x, y) ⟼ (x)^(y)');
	equal(MathLib.rem.toString(), '(n, m) ⟼ n rem m');
	equal(MathLib.root.toString(), '(x, y) ⟼ (x)^(1/y)');
	equal(MathLib.sin.toString(), 'x ⟼ sin(x)');
	equal(MathLib.sqrt.toString(), 'x ⟼ sqrt(x)');

	equal(MathLib.exp(MathLib.sin).toString(), 'x ⟼ exp(sin(x))',
		'MathLib.exp(MathLib.sin).toString() should be x ⟼ exp(sin(x))');
	// equal(MathLib.pow(MathLib.sin, 2).toString(), 'x ⟼ sin(x)^2',
	// 'MathLib.pow(MathLib.sin, 2).toString() = x ⟼ sin(x)^2');
	equal(MathLib.plus(MathLib.sin, 2).toString(), 'x ⟼ sin(x)+2',
		'MathLib.plus(MathLib.sin, 2).toString() = x ⟼ sin(x)+2');
	equal(MathLib.plus(2, MathLib.sin).toString(), 'x ⟼ 2+sin(x)',
		'MathLib.plus(2, MathLib.sin).toString() = x ⟼ 2+sin(x)');
	equal(MathLib.times(2, MathLib.sin).toString(), 'x ⟼ 2*sin(x)',
		'MathLib.times(2, MathLib.sin).toString() = x ⟼ 2*sin(x)');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'x ⟼ sin(x)+cos(x)',
		'MathLib.plus(MathLib.sin, MathLib.cos).toString() = x ⟼ sin(x)+cos(x)');
});
module('Integer');
test('init', 18, function () {
	// string
	equal((new MathLib.Integer('0')).sign, '+');
	equal((new MathLib.Integer('+0')).sign, '+');
	equal((new MathLib.Integer('-0')).sign, '-');
	equal((new MathLib.Integer('1')).sign, '+');
	equal((new MathLib.Integer('+1')).sign, '+');
	equal((new MathLib.Integer('-1')).sign, '-');

	deepEqual((new MathLib.Integer('67108863')).data, [67108863]);
	deepEqual((new MathLib.Integer('67108864')).data, [0, 1]);
	deepEqual((new MathLib.Integer('67108865')).data, [1, 1]);

	deepEqual((new MathLib.Integer('111', {base: 2})).data, [7]);
	deepEqual((new MathLib.Integer('zzzzzzz', {base: 36})).data, [48119807, 1167]);



	// number
	equal((new MathLib.Integer(+0)).sign, '+');
	equal((new MathLib.Integer(-0)).sign, '-');
	equal((new MathLib.Integer(+1)).sign, '+');
	equal((new MathLib.Integer(-1)).sign, '-');

	deepEqual((new MathLib.Integer(67108863)).data, [67108863]);
	deepEqual((new MathLib.Integer(67108864)).data, [0, 1]);
	deepEqual((new MathLib.Integer(67108865)).data, [1, 1]);
});



// Properties
test('.constructor', 1, function () {
	var i = new MathLib.Integer('1234');
	equal(i.constructor, MathLib.Integer, 'Testing .constructor');
});

test('.type', 1, function () {
	var i = new MathLib.Integer('1234');
	equal(i.type, 'integer', 'Testing .type');
});
test('.characteristic()', 1, function () {
	ok(MathLib.Integer.characteristic().isEqual(new MathLib.Integer(0)));
});
test('.randomElement()', 68, function () {
	var sample, mean, variance, i, start, end,
			arr = [],
			n = 1000;

	// random numbers from -4 to +4
	start = new MathLib.Integer(-4);
	end = new MathLib.Integer(4);
	for (i = 0; i < n; i++) {
		sample = MathLib.Integer.randomElement(start, end);

		arr.push((sample.data[0] || 0) * (sample.sign === '+' ? 1 : -1));
	}

	for (i = 0; i < 10; i++) {
		ok(arr[i] <= 4);
		ok(arr[i] >= -4);
		ok(arr[i] % 1 === 0);
	}

	// 2*Math.sqrt((9*9-1)/12)/Math.sqrt(9) = 1.7213259316477407
	mean = arr.reduce(function (x, y) {
		return x + y;
	}) / n;
	ok(mean < +1.7213259316477407);
	ok(mean > -1.7213259316477407);

	variance = arr.reduce(function (x, y) {
		return x + y * y;
	}, 0) / n;
	ok(variance < 8.88888888888889);
	ok(variance > 4.444444444444445);



	// random numbers from 0 to 8
	arr = [];
	start = new MathLib.Integer(8);
	for (i = 0; i < n; i++) {
		sample = MathLib.Integer.randomElement(start);

		arr.push(sample.data[0] || 0);
	}

	for (i = 0; i < 10; i++) {
		ok(arr[i] <= 8);
		ok(arr[i] >= 0);
		ok(arr[i] % 1 === 0);
	}

	// 2*Math.sqrt((9*9-1)/12)/Math.sqrt(9) = 1.7213259316477407
	mean = arr.reduce(function (x, y) {
		return x + y;
	}) / n;
	ok(mean < 4 + 1.7213259316477407);
	ok(mean > 4 - 1.7213259316477407);

	variance = arr.reduce(function (x, y) {
		return x + Math.pow(y - 4, 2);
	}, 0) / n;
	ok(variance < 8.88888888888889);
	ok(variance > 4.444444444444445);
});

test('.toContentMathML()', 2, function () {
	equal(MathLib.Integer.toContentMathML(), '<integers/>');
	equal(MathLib.Integer.toContentMathML({strict: true}), '<csymbol cd="setname1">Z</csymbol>');
});
test('.toLaTeX()', 1, function () {
	equal(MathLib.Integer.toLaTeX(), 'Integer Ring $\\mathbb{Z}$');
});
test('.toMathML()', 1, function () {
	equal(MathLib.Integer.toMathML(), '<mrow><mtext>Integer Ring</mtext><mi mathvariant="double-struck">Z</mi></mrow>');
});
test('.toString()', 1, function () {
	equal(MathLib.Integer.toString(), 'Integer Ring ℤ');
});
test('prototype.abs()', 5, function () {
	ok(MathLib.isPosZero((new MathLib.Integer('+0')).abs().coerceTo('number')));
	ok(MathLib.isPosZero((new MathLib.Integer('-0')).abs().coerceTo('number')));
	equal((new MathLib.Integer('1234')).abs().toString(), '1234');
	equal((new MathLib.Integer('+1234')).abs().toString(), '1234');
	equal((new MathLib.Integer('-1234')).abs().toString(), '1234');
});
test('.prototype.ceil()', 1, function () {
	ok((new MathLib.Integer('1234')).ceil().isEqual(new MathLib.Integer('1234')));
});
test('.prototype.coerceTo()', 12, function () {
	// Integer
	ok(MathLib.isEqual((new MathLib.Integer('1234')).coerceTo('integer'), new MathLib.Integer('1234')));

	// Rational
	ok(MathLib.isEqual((new MathLib.Integer('0')).coerceTo('rational'), new MathLib.Rational(0)));
	ok(MathLib.isEqual((new MathLib.Integer('+1234')).coerceTo('rational'), new MathLib.Rational(1234)));
	ok(MathLib.isEqual((new MathLib.Integer('-1234')).coerceTo('rational'), new MathLib.Rational(-1234)));

	// number
	ok(MathLib.isPosZero((new MathLib.Integer('+0')).coerceTo('number')));
	ok(MathLib.isNegZero((new MathLib.Integer('-0')).coerceTo('number')));
	equal((new MathLib.Integer('+1234')).coerceTo('number'), 1234);
	equal((new MathLib.Integer('-1234')).coerceTo('number'), -1234);

	// Complex
	ok(MathLib.isEqual((new MathLib.Integer('0')).coerceTo('complex'), new MathLib.Complex(0)));
	ok(MathLib.isEqual((new MathLib.Integer('+1234')).coerceTo('complex'), new MathLib.Complex(1234)));
	ok(MathLib.isEqual((new MathLib.Integer('-1234')).coerceTo('complex'), new MathLib.Complex(-1234)));

	throws(function () {
		(new MathLib.Integer(1)).coerceTo('notImplemented');
	}, /Cannot coerce the integer to "notImplemented"./, 'notImplemented');
});

test('.prototype.compare()', 15, function () {
	equal((new MathLib.Integer('0')).compare(new MathLib.Integer('-0')), 0);

	equal((new MathLib.Integer('10')).compare(new MathLib.Integer('100')), -1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('10')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('100')), 0);

	equal((new MathLib.Integer('10')).compare(new MathLib.Integer('-100')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('-10')), 1);
	equal((new MathLib.Integer('100')).compare(new MathLib.Integer('-100')), 1);

	equal((new MathLib.Integer('-10')).compare(new MathLib.Integer('-100')), 1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('-10')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('-100')), 0);

	equal((new MathLib.Integer('-10')).compare(new MathLib.Integer('100')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('10')), -1);
	equal((new MathLib.Integer('-100')).compare(new MathLib.Integer('100')), -1);

	equal((new MathLib.Integer('1')).compare(new MathLib.Integer('123456789123456789')), -1);
	equal((new MathLib.Integer('-1')).compare(new MathLib.Integer('-123456789123456789')), 1);
});
test('.prototype.conjugate()', 1, function () {
	var i = new MathLib.Integer('1234'),
			j = i.conjugate();

	ok(j.isEqual(i));
});
test('.prototype.copy()', 3, function () {
	var i = new MathLib.Integer('1234'),
			j = i.copy();

	ok(j.isEqual(i));

	j.sign = '-';
	j.data[0] = 4321;

	equal(i.sign, '+');
	equal(i.data[0], 1234);
});
test('.prototype.digitSum()', 8, function () {
	ok((new MathLib.Integer('0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('+0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('-0')).digitSum().isEqual(new MathLib.Integer('0')));
	ok((new MathLib.Integer('+1234')).digitSum().isEqual(new MathLib.Integer('10')));
	ok((new MathLib.Integer('-1234')).digitSum().isEqual(new MathLib.Integer('10')));
	ok((new MathLib.Integer('123456789')).digitSum().isEqual(new MathLib.Integer('45')));
	ok((new MathLib.Integer('123456789')).digitSum(2).isEqual(new MathLib.Integer('16')));
	ok((new MathLib.Integer('123456789')).digitSum(16).isEqual(new MathLib.Integer('54')));
});
test('.prototype.digits()', 8, function () {
	deepEqual((new MathLib.Integer('0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+0')).digits(), [0]);
	deepEqual((new MathLib.Integer('-0')).digits(), [0]);
	deepEqual((new MathLib.Integer('+1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('-1234')).digits(), [1, 2, 3, 4]);
	deepEqual((new MathLib.Integer('123456789')).digits(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
	deepEqual((new MathLib.Integer('123456789')).digits(2), [
		1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1
	]);
	deepEqual((new MathLib.Integer('123456789')).digits(16), [7, 5, 11, 12, 13, 1, 5]);
});
test('.prototype.divide()', 12, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).divide(new MathLib.Integer('+10')).toString(),  '1000000');
	equal((new MathLib.Integer('+10000000')).divide(new MathLib.Integer('-10')).toString(), '-1000000');
	equal((new MathLib.Integer('-10000000')).divide(new MathLib.Integer('+10')).toString(), '-1000000');
	equal((new MathLib.Integer('-10000000')).divide(new MathLib.Integer('-10')).toString(),  '1000000');

	equal((new MathLib.Integer('+10000001')).divide(new MathLib.Integer('+10')).toString(),  '10000001/10');
	equal((new MathLib.Integer('+10000001')).divide(new MathLib.Integer('-10')).toString(), '-10000001/10');
	equal((new MathLib.Integer('-10000001')).divide(new MathLib.Integer('+10')).toString(), '-10000001/10');
	equal((new MathLib.Integer('-10000001')).divide(new MathLib.Integer('-10')).toString(),  '10000001/10');

	// number
	equal((new MathLib.Integer('+100')).divide(10), 10);
	equal((new MathLib.Integer('+100')).divide(-10), -10);
	equal((new MathLib.Integer('-100')).divide(10), -10);
	equal((new MathLib.Integer('-100')).divide(-10), 10);
});
test('prototype.divrem()', 15, function () {
	deepEqual((new MathLib.Integer(+0)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(+0)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(-0)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);
	deepEqual((new MathLib.Integer(-0)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(0), new MathLib.Integer(0)]);

	deepEqual((new MathLib.Integer(+10)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(+3), new MathLib.Integer(1)]);
	deepEqual((new MathLib.Integer(+10)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(-3), new MathLib.Integer(1)]);
	deepEqual((new MathLib.Integer(-10)).divrem(new MathLib.Integer(+3)),
		[new MathLib.Integer(-4), new MathLib.Integer(2)]);
	deepEqual((new MathLib.Integer(-10)).divrem(new MathLib.Integer(-3)),
		[new MathLib.Integer(+4), new MathLib.Integer(2)]);

	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('+3')),
		[new MathLib.Integer('3333333'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('-3')),
		[new MathLib.Integer('-3333333'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('-10000000')).divrem(new MathLib.Integer('+3')),
		[new MathLib.Integer('-3333334'), new MathLib.Integer('2')]);
	deepEqual((new MathLib.Integer('-10000000')).divrem(new MathLib.Integer('-3')),
		[new MathLib.Integer('3333334'), new MathLib.Integer('2')]);

	deepEqual((new MathLib.Integer('+10000000')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('0')]);
	deepEqual((new MathLib.Integer('+10000001')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('1')]);
	deepEqual((new MathLib.Integer('+10000002')).divrem(new MathLib.Integer('+10')),
		[new MathLib.Integer('+1000000'), new MathLib.Integer('2')]);
});
test('.prototype.factorial()', 8, function () {
	deepEqual((new MathLib.Integer('0')).factorial(), new MathLib.Integer('1'));
	deepEqual((new MathLib.Integer('+0')).factorial(), new MathLib.Integer('1'));
	deepEqual((new MathLib.Integer('-0')).factorial(), new MathLib.Integer('1'));
	deepEqual((new MathLib.Integer('-10')).factorial(), new MathLib.Complex(Infinity));
	deepEqual((new MathLib.Integer('10')).factorial(), new MathLib.Integer('3628800'));
	deepEqual((new MathLib.Integer('25')).factorial(), new MathLib.Integer('15511210043330985984000000'));
	deepEqual((new MathLib.Integer('50')).factorial(),
		new MathLib.Integer('30414093201713378043612608166064768844377641568960512000000000000'));

	deepEqual((new MathLib.Integer('500')).factorial(), new MathLib.Integer(
		'1220136825991110068701238785423046926253574342803192842192413588385845' +
		'3731538819976054964475022032818630136164771482035841633787220781772004' +
		'8078520515932928547790757193933060377296085908627042917454788242491272' +
		'6344305670173270769461062802310452644218878789465754777149863494367781' +
		'0376442740338273653974713864778784954384895955375379904232410612713269' +
		'8432774571554630997720278101456108118837370953101635632443298702956389' +
		'6628911658974769572087926928871281780070265174507768410719624390394322' +
		'5364226052349458501299185715012487069615681416253590566934238130088562' +
		'4924689156412677565448188650659384795177536089400574523894033579847636' +
		'3944905313062323749066445048824665075946735862074637925184200459369692' +
		'9810222639719525971909452178233317569345815085523328207628200234026269' +
		'0789834245171200620771464097945611612762914595123722991334016955236385' +
		'0942885592018727433795173014586357570828355780158735432768888680120399' +
		'8823847021514676054454076635359841744304801289383138968816394874696588' +
		'1750450692636533817505547812864000000000000000000000000000000000000000' +
		'0000000000000000000000000000000000000000000000000000000000000000000000' +
		'000000000000000'
	));
});
test('.prototype.floor()', 1, function () {
	ok((new MathLib.Integer('1234')).floor().isEqual(new MathLib.Integer('1234')));
});
test('.prototype.isEqual()', 5, function () {
	equal((new MathLib.Integer('+0')).isEqual(new MathLib.Integer('-0')), true);
	equal((new MathLib.Integer('1234')).isEqual(new MathLib.Integer('1234')), true);
	equal((new MathLib.Integer('1234')).isEqual(1234), true);
	equal((new MathLib.Integer('1234')).isEqual(new MathLib.Integer('12')), false);
	equal((new MathLib.Integer('1234')).isEqual(12), false);
});
test('.prototype.isUnit()', 5, function () {
	equal((new MathLib.Integer('1')).isUnit(), true);
	equal((new MathLib.Integer('-1')).isUnit(), true);
	equal((new MathLib.Integer('+1234')).isUnit(), false);
	equal((new MathLib.Integer('-1234')).isUnit(), false);
	equal((new MathLib.Integer(['1', '123'])).isUnit(), false);
});
test('.prototype.isZero()', 5, function () {
	equal((new MathLib.Integer('0')).isZero(), true);
	equal((new MathLib.Integer('+0')).isZero(), true);
	equal((new MathLib.Integer('-0')).isZero(), true);
	equal((new MathLib.Integer('+1234')).isZero(), false);
	equal((new MathLib.Integer('-1234')).isZero(), false);
});
test('.prototype.isqrt()', 4, function () {
	ok((new MathLib.Integer('1')).isqrt().isEqual(new MathLib.Integer('1')));
	ok((new MathLib.Integer('16')).isqrt().isEqual(new MathLib.Integer('4')));
	ok((new MathLib.Integer('123456789')).isqrt().isEqual(new MathLib.Integer('11111')));
	ok((new MathLib.Integer('123456789123456789')).isqrt().isEqual(new MathLib.Integer('351364183')));
});
test('.prototype.minus()', 21, function () {
	// integer
	equal((new MathLib.Integer('+10')).minus(new MathLib.Integer('+100')).toString(), '-90');
	equal((new MathLib.Integer('+10')).minus(new MathLib.Integer('-100')).toString(), '110');
	equal((new MathLib.Integer('-10')).minus(new MathLib.Integer('+100')).toString(), '-110');
	equal((new MathLib.Integer('-10')).minus(new MathLib.Integer('-100')).toString(), '90');

	equal((new MathLib.Integer('+100')).minus(new MathLib.Integer('+10')).toString(), '90');
	equal((new MathLib.Integer('+100')).minus(new MathLib.Integer('-10')).toString(), '110');
	equal((new MathLib.Integer('-100')).minus(new MathLib.Integer('+10')).toString(), '-110');
	equal((new MathLib.Integer('-100')).minus(new MathLib.Integer('-10')).toString(), '-90');

	equal((new MathLib.Integer('+10000000')).minus(new MathLib.Integer('+10')).toString(), '9999990');
	equal((new MathLib.Integer('+10000000')).minus(new MathLib.Integer('-10')).toString(), '10000010');
	equal((new MathLib.Integer('-10000000')).minus(new MathLib.Integer('+10')).toString(), '-10000010');
	equal((new MathLib.Integer('-10000000')).minus(new MathLib.Integer('-10')).toString(), '-9999990');

	equal((new MathLib.Integer('1')).minus(new MathLib.Integer('100000000000000')).toString(), '-99999999999999');


	// number
	equal((new MathLib.Integer('+100')).minus(10), 90);
	equal((new MathLib.Integer('+100')).minus(-10), 110);
	equal((new MathLib.Integer('-100')).minus(10), -110);
	equal((new MathLib.Integer('-100')).minus(-10), -90);

	equal((new MathLib.Integer('+10000000')).minus(10), 9999990);
	equal((new MathLib.Integer('+10000000')).minus(-10), 10000010);
	equal((new MathLib.Integer('-10000000')).minus(10), -10000010);
	equal((new MathLib.Integer('-10000000')).minus(-10), -9999990);
});
test('prototype.mod()', 14, function () {
	deepEqual((new MathLib.Integer(-3)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));
	deepEqual((new MathLib.Integer(-2)).mod(new MathLib.Integer(+3)), new MathLib.Integer(1));
	deepEqual((new MathLib.Integer(-1)).mod(new MathLib.Integer(+3)), new MathLib.Integer(2));
	deepEqual((new MathLib.Integer(+0)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));
	deepEqual((new MathLib.Integer(+1)).mod(new MathLib.Integer(+3)), new MathLib.Integer(1));
	deepEqual((new MathLib.Integer(+2)).mod(new MathLib.Integer(+3)), new MathLib.Integer(2));
	deepEqual((new MathLib.Integer(+3)).mod(new MathLib.Integer(+3)), new MathLib.Integer(0));

	deepEqual((new MathLib.Integer(-3)).mod(+3), 0);
	deepEqual((new MathLib.Integer(-2)).mod(+3), 1);
	deepEqual((new MathLib.Integer(-1)).mod(+3), 2);
	deepEqual((new MathLib.Integer(+0)).mod(+3), 0);
	deepEqual((new MathLib.Integer(+1)).mod(+3), 1);
	deepEqual((new MathLib.Integer(+2)).mod(+3), 2);
	deepEqual((new MathLib.Integer(+3)).mod(+3), 0);
});
test('prototype.negative()', 3, function () {
	equal((new MathLib.Integer('1234')).negative().toString(), '-1234');
	equal((new MathLib.Integer('+1234')).negative().toString(), '-1234');
	equal((new MathLib.Integer('-1234')).negative().toString(), '1234');
});
test('.prototype.plus()', 13, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).plus(new MathLib.Integer('+10')).toString(), '10000010');
	equal((new MathLib.Integer('+10000000')).plus(new MathLib.Integer('-10')).toString(), '9999990');
	equal((new MathLib.Integer('-10000000')).plus(new MathLib.Integer('+10')).toString(), '-9999990');
	equal((new MathLib.Integer('-10000000')).plus(new MathLib.Integer('-10')).toString(), '-10000010');

	// number
	// ok(MathLib.isPosZero((new MathLib.Integer('+0')).plus()));
	// ok(MathLib.isNegZero((new MathLib.Integer('-0')).plus()));
	equal((new MathLib.Integer('+100')).plus(10), 110);
	equal((new MathLib.Integer('+100')).plus(-10), 90);
	equal((new MathLib.Integer('-100')).plus(10), -90);
	equal((new MathLib.Integer('-100')).plus(-10), -110);

	equal((new MathLib.Integer('+10000000')).plus(10), 10000010);
	equal((new MathLib.Integer('+10000000')).plus(-10), 9999990);
	equal((new MathLib.Integer('-10000000')).plus(10), -9999990);
	equal((new MathLib.Integer('-10000000')).plus(-10), -10000010);

	equal((new MathLib.Integer(5000000)).plus(new MathLib.Integer(5000000)).toString(), '10000000');
});
test('.prototype.pow()', 14, function () {
	// integer
	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('+30')).toString(),   '1073741824');
	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('-30')).toString(), '1/1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('+30')).toString(),   '1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('-30')).toString(), '1/1073741824');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('+31')).toString(),   '-2147483648');
	equal((new MathLib.Integer('-2')).pow(new MathLib.Integer('-31')).toString(), '-1/2147483648');

	equal((new MathLib.Integer('+2')).pow(new MathLib.Integer('0')).toString(), '1');
	equal((new MathLib.Integer('0')).pow(new MathLib.Integer('0')).toString(), '1');

	// number
	equal((new MathLib.Integer('+2')).pow(3), 8);
	equal((new MathLib.Integer('+2')).pow(-3), 1 / 8);
	equal((new MathLib.Integer('-2')).pow(3), -8);
	equal((new MathLib.Integer('-2')).pow(-3), -1 / 8);
	equal((new MathLib.Integer('-2')).pow(4), 16);
	equal((new MathLib.Integer('-2')).pow(-4), 1 / 16);
});

test('.prototype.times()', 8, function () {
	// integer
	equal((new MathLib.Integer('+10000000')).times(new MathLib.Integer('+10')).toString(),  '100000000');
	equal((new MathLib.Integer('+10000000')).times(new MathLib.Integer('-10')).toString(), '-100000000');
	equal((new MathLib.Integer('-10000000')).times(new MathLib.Integer('+10')).toString(), '-100000000');
	equal((new MathLib.Integer('-10000000')).times(new MathLib.Integer('-10')).toString(),  '100000000');

	// number
	equal((new MathLib.Integer('+100')).times(10), 1000);
	equal((new MathLib.Integer('+100')).times(-10), -1000);
	equal((new MathLib.Integer('-100')).times(10), -1000);
	equal((new MathLib.Integer('-100')).times(-10), 1000);
});
test('.prototype.toContentMathML()', 6, function () {
	equal((new MathLib.Integer(+1234)).toContentMathML(), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(-1234)).toContentMathML(), '<cn type="integer">-1234</cn>');

	equal((new MathLib.Integer(+1234)).toContentMathML({base: 10}), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(7)).toContentMathML({base: 2}), '<cn type="integer" base="2">111</cn>');

	equal((new MathLib.Integer(+1234)).toContentMathML({base: 10, strict: true}), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(7)).toContentMathML({base: 2, strict: true}),
		'<apply><csymbol cd="nums1">based_integer</csymbol><cn>2</cn><cs>111</cs></apply>');
});
test('.prototype.toLaTeX()', 9, function () {
	equal((new MathLib.Integer('1234')).toLaTeX(), '1234');
	equal((new MathLib.Integer('+1234')).toLaTeX(), '1234');
	equal((new MathLib.Integer('-1234')).toLaTeX(), '-1234');

	equal((new MathLib.Integer(7)).toLaTeX({base: 2}), '111');
	equal((new MathLib.Integer(7)).toLaTeX({baseSubscript: true}), '7_{10}');
	equal((new MathLib.Integer(7)).toLaTeX({base: 2, baseSubscript: true}), '111_{2}');

	equal((new MathLib.Integer(0)).toLaTeX({sign: true}), '+0');
	equal((new MathLib.Integer(-0)).toLaTeX({sign: true}), '+0');
	equal((new MathLib.Integer(1)).toLaTeX({sign: true}), '+1');
});
test('.prototype.toMathML()', 9, function () {
	equal((new MathLib.Integer('1234')).toMathML(), '<mn>1234</mn>');
	equal((new MathLib.Integer('+1234')).toMathML(), '<mn>1234</mn>');
	equal((new MathLib.Integer('-1234')).toMathML(), '<mn>-1234</mn>');

	equal((new MathLib.Integer(7)).toMathML({base: 2}), '<mn>111</mn>');
	equal((new MathLib.Integer(7)).toMathML({baseSubscript: true}), '<msub><mn>7</mn><mn>10</mn></msub>');
	equal((new MathLib.Integer(7)).toMathML({base: 2, baseSubscript: true}), '<msub><mn>111</mn><mn>2</mn></msub>');

	equal((new MathLib.Integer(0)).toMathML({sign: true}), '<mn>+0</mn>');
	equal((new MathLib.Integer(-0)).toMathML({sign: true}), '<mn>+0</mn>');
	equal((new MathLib.Integer(1)).toMathML({sign: true}), '<mn>+1</mn>');
});
test('.prototype.toString()', 13, function () {
	equal((new MathLib.Integer('0')).toString(), '0');
	equal((new MathLib.Integer('-0')).toString(), '0');

	equal((new MathLib.Integer('1234')).toString(), '1234');
	equal((new MathLib.Integer('+1234')).toString(), '1234');
	equal((new MathLib.Integer('-1234')).toString(), '-1234');

	equal((new MathLib.Integer('123456789101112131415')).toString(), '123456789101112131415');

	equal((new MathLib.Integer(7)).toString({base: 2}), '111');
	equal((new MathLib.Integer(7)).toString({baseSubscript: true}), '7&#x2081;&#x2080;');
	equal((new MathLib.Integer(7)).toString({base: 2, baseSubscript: true}), '111&#x2082;');
	equal((new MathLib.Integer('10000000001', {base: 36})).toString({base: 36}), '10000000001');

	equal((new MathLib.Integer(0)).toString({sign: true}), '+0');
	equal((new MathLib.Integer(-0)).toString({sign: true}), '+0');
	equal((new MathLib.Integer(1)).toString({sign: true}), '+1');
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
test('.isEqual()', 4, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([6, 4, 2]),
			line3 = new MathLib.Line([1, 1, 1]),
			line4 = new MathLib.Line([1, 1, 1, 1]),
			line5 = new MathLib.Line([0, 0, 1]),
			line6 = new MathLib.Line([0, 0, 2]);

	equal(line1.isEqual(line2), true, '.isEqual()');
	equal(line1.isEqual(line3), false, '.isEqual()');
	equal(line3.isEqual(line4), false, '.isEqual()');
	equal(line5.isEqual(line6), true, '.isEqual() two representations of the infinite line');
});
test('.isFinite()', 2, function () {
	var line1 = new MathLib.Line([3, 2, 1]),
			line2 = new MathLib.Line([0, 0, 1]);

	equal(line1.isFinite(), true, '.isFinite()');
	equal(line2.isFinite(), false, '.isFinite()');
});
test('.isParallelTo()', 3, function () {
	var l1 = new MathLib.Line([3, 2, 1]),
			l2 = new MathLib.Line([3, 2, 2]),
			l3 = new MathLib.Line([6, 4, 1]),
			l4 = new MathLib.Line([1, 4, 1]);

	equal(l1.isParallelTo(l2), true, '.isParallelTo()');
	equal(l1.isParallelTo(l3), true, '.isParallelTo()');
	equal(l1.isParallelTo(l4), false, '.isParallelTo()');
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
test('.meet()', 5, function () {
	var l1 = new MathLib.Line([1, 0, 1]),
			l2 = new MathLib.Line([0, 1, 1]),
			l3 = new MathLib.Line([1, 1, 0]),
			p1 = l1.meet(l2),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(p1, new MathLib.Point([-1, -1, 1]), '.meet()');
	deepEqual(l1.meet(l3), new MathLib.Point([-1, 1, 1]), '.meet()');

	l1[0] = 2;
	deepEqual(p1, new MathLib.Point([-1, -2, 2]), 'The coordinates of the point should change if those of the line change.');

	MathLib.on('warning', f);
	p1[0] = 42;
	deepEqual(p1, new MathLib.Point([-1, -2, 2]), 'You should not be able to change the coordinates of the point.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
});
test('.normalize()', 3, function () {
	var l1 = new MathLib.Line([3, 4, 5]),
			l2 = new MathLib.Line([0, 0, 1]),
			l3 = new MathLib.Line([0, 0, 8]);

	deepEqual(l1.normalize(), new MathLib.Line([0.6, 0.8, 1]), '.normalize() of an finite line');
	deepEqual(l2.normalize(), new MathLib.Line([0, 0, 1]), '.normalize() of the infinite line');
	deepEqual(l3.normalize(), new MathLib.Line([0, 0, 1]), '.normalize() of the infinite line');
});
test('.parallelThrough()', 5, function () {
	var l = new MathLib.Line([1, 0, 1]),
			p = new MathLib.Point([1, 1, 1]),
			parallel = l.parallelThrough(p),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(parallel, new MathLib.Line([-1, 0, 1]), '.parallelThrough()');

	l[0] = 2;
	deepEqual(parallel, new MathLib.Line([-2, 0, 2]), 'The coordinates of the parallel should change if those of the line change.');
	p[0] = 2;
	deepEqual(parallel, new MathLib.Line([-2, 0, 4]), 'The coordinates of the parallel should change if those of the point change.');

	MathLib.on('warning', f);
	parallel[0] = 42;
	deepEqual(parallel, new MathLib.Line([-2, 0, 4]), 'You should not be able to change the coordinates of the parallel.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
});
test('.toLaTeX()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);

	equal(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});
test('.toMathML()', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);

	equal(line.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd>' +
		'</mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr>' +
		'</mtable><mo>)</mo></mrow>', '.toMathML()');
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

test('.one()', 3, function () {
	var m = MathLib.Matrix.one(),
			n = MathLib.Matrix.one(2),
			o = MathLib.Matrix.one(2, 3);

	ok(m.isEqual(new MathLib.Matrix([[1]])));
	ok(n.isEqual(new MathLib.Matrix([[1, 1], [1, 1]])));
	ok(o.isEqual(new MathLib.Matrix([[1, 1, 1], [1, 1, 1]])));
});
test('.zero()', 3, function () {
	var m = MathLib.Matrix.zero(),
			n = MathLib.Matrix.zero(2),
			o = MathLib.Matrix.zero(2, 3);

	ok(m.isEqual(new MathLib.Matrix([[0]])));
	ok(n.isEqual(new MathLib.Matrix([[0, 0], [0, 0]])));
	ok(o.isEqual(new MathLib.Matrix([[0, 0, 0], [0, 0, 0]])));
});
test('.LU()', 2, function () {
	var m = new MathLib.Matrix([[4, 3], [8, 3]]),
			n = new MathLib.Matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
			res1 = new MathLib.Matrix([[8, 3], [0.5, 1.5]]),
			res2 = new MathLib.Matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

	deepEqual(m.LU(), res1, 'LU decomposition');
	deepEqual(n.LU(), res2, 'LU decomposition');
});
test('.adjoint()', 1, function () {
	var C = MathLib.Complex,
			m = new MathLib.Matrix([[new C(3, 1), 5, new C(0, -2)], [new C(2, -2), new C(0, 1), new C(-7, -13)]]),
			res = new MathLib.Matrix([[new C(3, -1), new C(2, 2)], [5, new C(0, -1)], [new C(0, 2), new C(-7, 13)]]);

	deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});

test('.adjugate()', 1, function () {
	var m = new MathLib.Matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
			res = new MathLib.Matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

	deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
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
test('.determinant()', 4, function () {
	var m = new MathLib.Matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
			n = new MathLib.Matrix([[42]]),
			p = new MathLib.Matrix([[0, 1, 2], [3, 2, 1]]);

	equal(m.determinant(), 3, 'Determinant of a 3x3 matrix');
	equal(m.determinant(), 3, 'Determinant should be cached now');
	equal(n.determinant(), 42, 'Determinant of 1x1 matrix');
	throws(function () {
		p.determinant();
	}, /Determinant of non square matrix/, 'Calculating the determinant of a non square matrix should throw an error.');
});

test('.every()', 2, function () {
	var m = new MathLib.Matrix([[1, 5, 3], [9, 5, 11], [-1, 9, 3]]),
			n = new MathLib.Matrix([[1, 3, 5], [7, 8, 1], [11, 6, 3]]),
			f = function (x) {
				return x % 2;
			};

	equal(m.every(f), true, '.every()');
	equal(n.every(f), false, '.every()');
});
test('.gershgorin()', 2, function () {
	var C = MathLib.Complex,
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[new C(1, 4), 2, 3], [new C(2, 3), new C(4, 2), 6], [7, new C(0, 5), 9]]),
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
			Q1 = new MathLib.Matrix([
				[3 / 5, 4 / (5 * Math.sqrt(5)), 0, -8 / (5 * Math.sqrt(5))],
				[0, 2 / Math.sqrt(5), 0, 1 / Math.sqrt(5)],
				[0, 0, 1, 0],
				[4 / 5, -3 / (5 * Math.sqrt(5)), 0, 6 / (5 * Math.sqrt(5))]
			]),
			R1 = new MathLib.Matrix([[5, 7], [0, 2.23606797749979], [0, 0], [0, 0]]),

			QRn = n.givens(),
			Qn = QRn[0],
			Rn = QRn[1],
			Q2 = new MathLib.Matrix([
				[0.768221279597376, -0.332654179360071, -0.546970988744419],
				[0.640184399664480, 0.399185015232086, 0.656365186493303],
				[0, -0.854395997514289, 0.519622439307198]
			]),
			R2 = new MathLib.Matrix([
				[7.810249675906652, 4.481290797651358, 2.560737598657919],
				[0, -4.681669871625427, -0.966447931614524],
				[0, 0, 4.184328063894809]
			]),

			QRo = o.givens(),
			Qo = QRo[0],
			Ro = QRo[1],
			Q3 = new MathLib.Matrix([
				[0, -0.581238193719096, -0.813733471206735],
				[0.6, 0.650986776965388, -0.464990554975277],
				[0.8, -0.488240082724041, 0.348742916231458]
			]),
			R3 = new MathLib.Matrix([
				[5, 10.2, 5.8],
				[0, -1.720465053408526, 0.09299811099505462],
				[0, 0, -7.439848879604435]
			]);

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
test('.inverse()', 3, function () {
	var C = MathLib.Complex,
			m1 = new MathLib.Matrix([[1, 2, 0], [2, 3, 0], [3, 4, 1]]),
			m2 = new MathLib.Matrix([[1, 2], [2, 4]]),
			m3 = new MathLib.Matrix([[new C(1, 2), new C(3, 4)], [new C(5, 6), new C(7, 8)]]);

	equal(m1.inverse().isEqual(new MathLib.Matrix([[-3, 2, 0], [2, -1, 0], [1, -2, 1]])), true, 'inverting a regular matrix');
	equal(m2.inverse(), undefined, 'inverting a singular matrix');
	equal(m3.inverse().isEqual(new MathLib.Matrix([
		[new C(-1 / 2, 7 / 16), new C(1 / 4, -3 / 16)],
		[new C(6 / 16, -5 / 16), new C(-2 / 16, 1 / 16)]
	])), true, 'inverting a regular complex matrix');
});
test('.isBandMatrix()', 3, function () {
	var m = new MathLib.Matrix([[2, 1, 3, 0], [1, 2, 1, 3], [0, 1, 2, 1], [0, 0, 1, 2]]);

	equal(m.isBandMatrix(1, 2), true, 'band matrix');
	equal(m.isBandMatrix(2), true, 'band matrix');
	equal(m.isBandMatrix(1, 1), false, 'upper bandwidth to small');
});
test('.isDiag()', 2, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[1, 0, 0], [0, 5, c], [0, 0, 9]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
	equal(m.isDiag(), true, 'square matrix');
	equal(n.isDiag(), false, 'non square matrix');
});
test('.isEqual()', 4, function () {
	var c = new MathLib.Complex(6, 7),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, c], [8, 9, 10]]),
			n = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]),
			o = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]),
			p = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]);

	equal(m.isEqual(m), true);
	equal(n.isEqual(o), true);
	equal(o.isEqual(p), false);
	equal(m.isEqual(n), false);
});
test('.isIdentity()', 4, function () {
	var m = new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
			n = new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]),
			o = new MathLib.Matrix([[1, 0, 0], [0, 1, 0]]);

	equal(m.isIdentity(), true, '.isIdentity() on identity matrix');
	equal(m.isIdentity(), true, '.isIdentity() should be cached');
	equal(n.isIdentity(), false, '.isIdentity() on non identity matrix');
	equal(o.isIdentity(), false, '.isIdentity() on non square matrix');
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
test('.isSymmetric()', 4, function () {
	var c = new MathLib.Complex(4, 0),
			m = new MathLib.Matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]),
			o = new MathLib.Matrix([[1, 0, 0], [0, 1, 0]]);

	equal(m.isSymmetric(), true, 'symmetric matrix');
	equal(m.isSymmetric(), true, 'isSymmetric should be cached');
	equal(n.isSymmetric(), false, 'non symmetric matrix');
	equal(o.isSymmetric(), false, 'non square matrix');
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
test('.isZero()', 3, function () {
	var c = new MathLib.Complex(0, 0),
			m = new MathLib.Matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
			n = new MathLib.Matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);

	equal(m.isZero(), true, 'zero matrix');
	equal(m.isZero(), true, '.isZero() should be cached now');
	equal(n.isZero(), false, 'non zero matrix');
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
test('.solve()', 7, function () {
	var C  = MathLib.Complex,
			A1 = new MathLib.Matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
			b1 = new MathLib.Vector([2, 2, 0]),
			x1 = new MathLib.Vector([5, -6, 3]),

			A2 = new MathLib.Matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
			b2 = new MathLib.Vector([10, 3, 3]),
			x2 = new MathLib.Vector([1, 1, 3]),

			A3 = new MathLib.Matrix([[new C(2, 3), 0, 3], [2, new C(-1, 5), 0], [new C(3, -4), new C(0, 1), 1]]),
			b3 = new MathLib.Vector([new C(5, 37), new C(5, 19), new C(21, 0)]),
			x3 = new MathLib.Vector([new C(4, 2), new C(3, 0), new C(1, 7)]),

			A4 = new MathLib.Matrix([[2, 4], [1, 2]]),
			A5 = new MathLib.Matrix([[1, 0, 1], [0, 1, 1], [0, 0, 0]]);

	ok(A1.solve(b1).isEqual(x1), 'Solving a system of linear equations');
	deepEqual(A1.times(x1), b1, 'Showing the solution is right');

	deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

	ok(A3.solve(b3).isEqual(x3), 'Solving a complex system of linear equations');

	equal(A4.solve([1, 0]), undefined, '2x2 linear system with no solution');
	deepEqual(A4.solve([2, 1]), [1, 0], '2x2 linear system with more than one solution');

	deepEqual(A5.solve([2, 1, 0]), [2, 1, 0], '3x3 linear system with more than one solution');
});
test('.some()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
			n = new MathLib.Matrix([[2, 4, 6], [0, 6, 4], [0, 8, 2]]),
			f = function (x) {
				return x % 2;
			};

	equal(m.some(f), true, '.some()');
	equal(n.some(f), false, '.some()');
});
test('.times()', 5, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]),
			n = new MathLib.Matrix([[0, 1], [0, 0]]),
			res = new MathLib.Matrix([[0, 1], [0, 3]]),

			C  = MathLib.Complex,
			mc = new MathLib.Matrix([[new C(2, 3), 0, 3], [2, new C(-1, 5), 0], [new C(3, -4), new C(0, 1), 1]]),
			bc = new MathLib.Vector([new C(4, 2), 3, new C(1, 7)]),
			resc = new MathLib.Vector([new C(5, 37), new C(5, 19), new C(21, 0)]),
			r = new MathLib.Rational(2, 3);

	deepEqual(m.times(3), new MathLib.Matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
	deepEqual(m.times(new C(0, 1)), new MathLib.Matrix([
		[new C(0, 1), new C(0, 2)],
		[new C(0, 3), new C(0, 4)]
	]), 'matrix scalar multiplication');
	deepEqual(m.times(n), res, 'multiplying two simple matrices');
	deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
	equal(m.times(r).isEqual(new MathLib.Matrix([[2 / 3, 4 / 3], [6 / 3, 8 / 3]])),
		true, 'complex matrix times rational number');
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
	deepEqual(m.toColVectors(), [
		new MathLib.Vector([1, 4, 7]), new MathLib.Vector([2, 5, 8]), new MathLib.Vector([3, 6, 9])
	], '.toColVectors()');
});
test('.toContentMathML()', 2, function () {
	var m = new MathLib.Matrix([[1, 2], [3, 4]]);

	equal(m.toContentMathML(), '<matrix><matrixrow><cn type="double">1</cn>' +
		'<cn type="double">2</cn></matrixrow><matrixrow><cn type="double">3</cn>' +
		'<cn type="double">4</cn></matrixrow></matrix>', '.toContentMathML()');
	equal(m.toContentMathML({strict: true}), '<apply><csymbol cd="linalg2">' +
		'matrix</csymbol><apply><csymbol cd="linalg2">matrixrow</csymbol><cn ' +
		'type="double">1</cn><cn type="double">2</cn></apply><apply><csymbol ' +
		'cd="linalg2">matrixrow</csymbol><cn type="double">3</cn><cn ' +
		'type="double">4</cn></apply></apply>', '.toContentMathML()');
});
test('.toLaTeX()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});
test('.toMathML()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

	deepEqual(m.toMathML(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd>' +
		'<mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd>' +
		'<mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd>' +
		'<mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathML()');
});
test('.toRowVectors()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

	deepEqual(m.toRowVectors(), [new MathLib.Vector([1, 2, 3]),
		new MathLib.Vector([4, 5, 6]),
		new MathLib.Vector([7, 8, 9])
	], '.toRowVectors()');
});
test('.toString()', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

	deepEqual(m.toString(), '1\t2\t3\n4\t5\t6\n7\t8\t9', '.toString()');
});
test('.trace()', 3, function () {
	var c = new MathLib.Complex(3, 4),
			m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2], [3, c]]);

	equal(m.trace(), 15, 'trace of a simple matrix');
	equal(m.trace(), 15, 'trace should be cached now');
	deepEqual(n.trace(), new MathLib.Complex(4, 4), 'trace of a complex matrix');
});
test('.transpose()', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
			n = new MathLib.Matrix([[1, 2, 3], [4, 5, 6]]);

	deepEqual(m.transpose(), new MathLib.Matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]), 'transpose a square matrix');
	deepEqual(n.transpose(), new MathLib.Matrix([[1, 4], [2, 5], [3, 6]]), 'transpose of a rectangular matrix');
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
test('cycleToList()', 2, function () {
	var p = [[0, 1, 2], [3, 4]],
			q = [[0, 1], [2, 3]];

	deepEqual(new MathLib.Permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
	deepEqual(new MathLib.Permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});
test('listToCycle()', 1, function () {
	deepEqual(new MathLib.Permutation.listToCycle([1, 2, 0, 4, 3]), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
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
test('.join()', 5, function () {
	var p1 = new MathLib.Point([1, 0, 1]),
			p2 = new MathLib.Point([0, 1, 1]),
			p3 = new MathLib.Point([1, 1, 0]),
			l1 = p1.join(p2),
			i = 0,
			f = function () {
				i++;
			};

	deepEqual(l1, new MathLib.Line([-1, -1, 1]), '.join()');
	deepEqual(p1.join(p3), new MathLib.Line([-1, 1, 1]), '.join()');

	p1[0] = 2;
	deepEqual(l1, new MathLib.Line([-1, -2, 2]), 'The coordinates of the line should change if those of the point change.');

	MathLib.on('warning', f);
	l1[0] = 42;
	deepEqual(l1, new MathLib.Line([-1, -2, 2]), 'You should not be able to change the coordinates of the line.');
	equal(i, 1, 'The attempt to change the coordinates should raise a warning.');
	MathLib.off('warning', f);
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
	equal(p2.toComplex().re, Infinity, '.toComplex() of an infinite point');
});
test('.toLaTeX()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);

	equal(point.toLaTeX(), '\\begin{pmatrix}3\\\\2\\end{pmatrix}', '.toLaTeX()');
	equal(point.toLaTeX(true), '\\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}', '.toLaTeX()');
});
test('.toMathML()', 2, function () {
	var point = new MathLib.Point([3, 2, 1]);

	equal(point.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd>' +
		'</mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
	equal(point.toMathML(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn>' +
		'</mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd>' +
		'</mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
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
test('one()', 1, function () {
	var p = MathLib.Polynomial.one;
	deepEqual(p, new MathLib.Polynomial([1]), 'Testing .one');
});
test('zero()', 1, function () {
	var p = MathLib.Polynomial.zero;
	deepEqual(p, new MathLib.Polynomial([0]), 'Testing .zero');
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
test('.differentiate()', 4, function () {
	var p = new MathLib.Polynomial(3);

	deepEqual(p.differentiate(), new MathLib.Polynomial([0, 0, 3]), '.differentiate()');
	deepEqual(p.differentiate(0), new MathLib.Polynomial([0, 0, 0, 1]), '.differentiate()');
	deepEqual(p.differentiate(2), new MathLib.Polynomial([0, 6]), '.differentiate(2)');
	deepEqual(p.differentiate(4), new MathLib.Polynomial([0]), '.differentiate(4)');
});
test('.integrate()', 3, function () {
	var p = new MathLib.Polynomial([0, 0, 0, 1]);

	deepEqual(p.integrate(), new MathLib.Polynomial([0, 0, 0, 0, 0.25]), '.integrate()');
	deepEqual(p.integrate(0), new MathLib.Polynomial([0, 0, 0, 1]), '.integrate()');
	deepEqual(p.integrate(2), new MathLib.Polynomial([0, 0, 0, 0, 0,  0.05]), '.integrate(2)');
});
test('.isEqual()', 3, function () {
	var c = new MathLib.Complex(0, 0),
			p1 = new MathLib.Polynomial(3),
			p2 = new MathLib.Polynomial([c, 0, 0, 1]),
			p3 = new MathLib.Polynomial([1, 2, 3]),
			p4 = new MathLib.Polynomial([0, 0, 0, 2]);

	equal(p1.isEqual(p2), true);
	equal(p1.isEqual(p3), false);
	equal(p1.isEqual(p4), false);
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
test('.negative()', 1, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, -2, -3]);

	ok(p.negative().isEqual(q));
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
	deepEqual(p.toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol>' +
		'<apply><csymbol cd="arith1">times</csymbol><cn type="double">3</cn>' +
		'<apply><csymbol cd="arith1">power</csymbol><ci>x</ci><cn type="double">2' +
		'</cn></apply></apply><apply><csymbol cd="arith1">times</csymbol><cn ' +
		'type="double">2</cn><ci>x</ci></apply><cn type="double">1</cn></apply>',
		'.toContentMathML()');
	deepEqual(q.toContentMathML(), '<apply><csymbol cd="arith1">plus</csymbol>' +
		'<apply><csymbol cd="arith1">times</csymbol><cn type="double">1</cn>' +
		'<apply><csymbol cd="arith1">power</csymbol><ci>x</ci><cn type="double">2' +
		'</cn></apply></apply><cn type="double">-1</cn></apply>',
		'.toContentMathML()');
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
	deepEqual(p.toMathML(), '<mrow><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi>' +
		'<mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+' +
		'</mo><mn>1</mn></mrow>', '.toMathML()');
	deepEqual(q.toMathML(), '<mrow><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi>' +
		'<mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', '.toMathML()');
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
module('Rational');
test('init', 7, function () {
	var r = new MathLib.Rational(2, 3),
			p = new	MathLib.Rational(4);

	equal(r.numerator, 2, 'Testing the numerator');
	equal(r.denominator, 3, 'Testing the denominator');
	equal(p.numerator, 4, 'Testing the numerator');
	equal(p.denominator, 1, 'Testing the denominator');
	throws(function () {
		new MathLib.Rational(2, 0);
	}, /The denominator of a rational number cannot be zero./, 'Setting the denominator to zero should throw an error.');
	throws(function () {
		new MathLib.Rational(NaN, 2);
	}, /The numerator of a rational number cannot be NaN./, 'Setting the numerator to NaN should throw an error.');
	throws(function () {
		new MathLib.Rational(2, NaN);
	}, /The denominator of a rational number cannot be NaN./, 'Setting the denominator to NaN should throw an error.');
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

test('.characteristic()', 1, function () {
	ok(MathLib.Rational.characteristic().isEqual(new MathLib.Integer(0)));
});
test('.toContentMathML()', 2, function () {
	equal(MathLib.Rational.toContentMathML(), '<rationals/>');
	equal(MathLib.Rational.toContentMathML({strict: true}), '<csymbol cd="setname1">Q</csymbol>');
});
test('.toLaTeX()', 1, function () {
	equal(MathLib.Rational.toLaTeX(), 'Rational Field $\\mathbb{Q}$');
});
test('.toMathML()', 1, function () {
	equal(MathLib.Rational.toMathML(), '<mrow><mtext>Rational Field</mtext><mi mathvariant="double-struck">Q</mi></mrow>');
});
test('.toString()', 1, function () {
	equal(MathLib.Rational.toString(), 'Rational Field ℚ');
});
test('.prototype.coerceTo()', 5, function () {
	var r1 = new MathLib.Rational(3, 1),
			r2 = new MathLib.Rational(3, 2);

	ok(MathLib.isEqual(r1.coerceTo('integer'), new MathLib.Integer(3)), 'integer');
	ok(MathLib.isEqual(r1.coerceTo('rational'), new MathLib.Rational(3, 1)), 'rational');
	// ok(MathLib.isEqual(r1.coerceTo('complex'), new MathLib.Complex(new MathLib.Rational(3, 1), 0)), 'complex');
	ok(MathLib.isEqual(r1.coerceTo('number'), 3), 'number');

	throws(function () {
		r2.coerceTo('integer');
	}, /Cannot coerce the rational number to an integer, since the denominator is not 1/, 'integer');
	throws(function () {
		r2.coerceTo('notImplemented');
	}, /Cannot coerce the rational number to "notImplemented"./, 'notImplemented');
});

test('.prototype.compare()', 3, function () {
	var r1 = new MathLib.Rational(3, 2),
			r2 = new MathLib.Rational(6, 4),
			r3 = new MathLib.Rational(1, 1),
			r4 = new MathLib.Rational(7, 2);
	equal(r1.compare(r2), 0, '.compare()');
	equal(r1.compare(r3), 1, '.compare()');
	equal(r1.compare(r4), -1,  '.compare()');
});
test('.prototype.copy()', 10, function () {
	var r1 = new MathLib.Rational(3, 1),
			r2 = r1.copy();

	equal(r2.numerator, r1.numerator);
	equal(r2.denominator, r1.denominator);

	r2.numerator = 2;
	r2.denominator = 4;

	equal(r1.numerator, 3);
	equal(r1.denominator, 1);
	equal(r2.numerator, 2);
	equal(r2.denominator, 4);

	r1.numerator = 5;
	r1.denominator = 6;

	equal(r1.numerator, 5);
	equal(r1.denominator, 6);
	equal(r2.numerator, 2);
	equal(r2.denominator, 4);
});
test('.prototype.divide()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.divide(p).isEqual(new MathLib.Rational(3, 4)), true, '.divide()');
	equal(r.divide(2).isEqual(new MathLib.Rational(1, 4)), true, '.divide()');
});
test('.prototype.inverse()', 2, function () {
	var r = (new MathLib.Rational(1, 2)).inverse(),
			p = (new MathLib.Rational(0, 2)).inverse();
	equal(r.isEqual(new MathLib.Rational(2, 1)), true, '.inverse()');
	equal(p, undefined, '.inverse()');
});
test('.prototype.isEqual()', 4, function () {
	var r1 = new MathLib.Rational(1, 2),
			r2 = new MathLib.Rational(4, 8),
			r3 = new MathLib.Rational(3, 1),
			r4 = new MathLib.Rational(6, 2);

	equal(r1.isEqual(r2), true, '.isEqual()');
	equal(r3.isEqual(3), true, '.isEqual()');
	equal(r4.isEqual(3), true, '.isEqual()');
	equal(r1.isEqual(r3), false, '.isEqual()');
});
test('.prototype.isZero()', 2, function () {
	var r = new MathLib.Rational(0, 2),
			p = new MathLib.Rational(1, 3);

	equal(r.isZero(), true, '.isZero()');
	equal(p.isZero(), false, '.isZero()');
});
test('.prototype.minus()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.minus(p).isEqual(new MathLib.Rational(-1, 6)), true, '.minus()');
	equal(r.minus(2), -1.5, '.minus()');
});
test('.prototype.negative()', 1, function () {
	var r = (new MathLib.Rational(1, 2)).negative();
	equal(r.isEqual(new MathLib.Rational(-1, 2)), true, '.isEqual()');
});
test('.prototype.plus()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.plus(p).isEqual(new MathLib.Rational(7, 6)), true, '.plus()');
	equal(r.plus(2), 2.5, '.plus()');
});
test('.prototype.reduce()', 4, function () {
	var r = (new MathLib.Rational(-4, -6)).reduce(),
			p = (new MathLib.Rational(3, -6)).reduce();
	equal(r.numerator, 2, '.reduce()');
	equal(r.denominator, 3, '.reduce()');
	equal(p.numerator, -1, '.reduce()');
	equal(p.denominator, 2, '.reduce()');
});
test('.prototype.times()', 2, function () {
	var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(2, 3);

	equal(r.times(p).isEqual(new MathLib.Rational(2, 6)), true, '.times()');
	equal(r.times(2).isEqual(new MathLib.Rational(1, 1)), true, '.times()');
});
test('.prototype.toContentMathML()', 2, function () {
	var r = new MathLib.Rational(2, 3);
	equal(r.toContentMathML(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathML()');
	equal(r.toContentMathML({strict: true}), '<apply><csymbol cd="nums1">rational' +
		'</csymbol><cn type="double">2</cn><cn type="double">3</cn></apply>',
		'.toContentMathML()');
});
test('.prototype.toLaTeX()', 8, function () {
	var r = new MathLib.Rational(2, 3),
			p = new MathLib.Rational(-2, 3);

	equal(r.toLaTeX(), '\\frac{2}{3}', '.toLaTeX()');
	equal(r.toLaTeX({sign: true}), '+\\frac{2}{3}', '.toLaTeX()');
	equal(r.toLaTeX({base: 2}), '\\frac{10}{11}', '.toLaTeX()');
	equal(r.toLaTeX({base: 2, baseSubscript: true}), '\\frac{10_{2}}{11_{2}}', '.toLaTeX()');

	equal(p.toLaTeX(), '\\frac{-2}{3}', '.toLaTeX()');
	equal(p.toLaTeX({sign: true}), '-\\frac{2}{3}', '.toLaTeX()');
	equal(p.toLaTeX({base: 2}), '\\frac{-10}{11}', '.toLaTeX()');
	equal(p.toLaTeX({base: 2, baseSubscript: true}), '\\frac{-10_{2}}{11_{2}}', '.toLaTeX()');
});
test('.prototype.toMathML()', 8, function () {
	var r = new MathLib.Rational(2, 3),
			p = new MathLib.Rational(-2, 3);

	equal(r.toMathML(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({sign: true}), '<mo>+</mo><mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({base: 2}), '<mfrac><mn>10</mn><mn>11</mn></mfrac>', '.toMathML()');
	equal(r.toMathML({base: 2, baseSubscript: true}), '<mfrac><msub><mn>10</mn>' +
		'<mn>2</mn></msub><msub><mn>11</mn><mn>2</mn></msub></mfrac>', '.toMathML()');

	equal(p.toMathML(), '<mfrac><mn>-2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({sign: true}), '<mo>-</mo><mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({base: 2}), '<mfrac><mn>-10</mn><mn>11</mn></mfrac>', '.toMathML()');
	equal(p.toMathML({base: 2, baseSubscript: true}), '<mfrac><msub><mn>-10</mn>' +
		'<mn>2</mn></msub><msub><mn>11</mn><mn>2</mn></msub></mfrac>', '.toMathML()');
});
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
module('Screen', {
	setup: function () {
		var div = document.createElement('div');
		div.id = 'screen';

		document.body.appendChild(div);
	},
	teardown: function () {
		var div = document.getElementById('screen');

		div.parentElement.removeChild(div);
	}
});

test('init', 2, function () {
	var screen = new MathLib.Screen('screen', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');
});



// Properties
test('.constructor', 1, function () {
	var screen = new MathLib.Screen('screen', {});

	equal(screen.constructor, MathLib.Screen, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen = new MathLib.Screen('screen', {});

	equal(screen.type, 'screen', 'Testing .type');
});



test('figcaption', 2, function () {
	var screen = new MathLib.Screen('screen', {
		figcaption: 'A caption for the figure'
	});

	equal(screen.figure.children[1].localName, 'figcaption');
	equal(screen.figure.children[1].innerHTML, 'A caption for the figure');
});

module('Screen2D', {
	setup: function () {
		var div = document.createElement('div');
		div.id = 'screen';

		document.body.appendChild(div);
	},
	teardown: function () {
		var div = document.getElementById('screen');

		div.parentElement.removeChild(div);
	}
});

test('init', 2, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');
});



// Properties
test('.constructor', 1, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.constructor, MathLib.Screen2D, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.type, 'screen2D', 'Testing .type');
});



test('focus', 3, function () {
	var screen = new MathLib.Screen2D('screen', {});

	var click = document.createEvent('MouseEvents');
	click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	screen.wrapper.dispatchEvent(click);

	equal(screen.wrapper, document.activeElement);

	screen.wrapper.blur();
	notEqual(screen.wrapper, document.activeElement);

	screen.wrapper.focus();
	equal(screen.wrapper, document.activeElement);
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
test('fromTo()', 1, function () {
	ok((new MathLib.Set.fromTo(1, 5, 2)).isEqual(new MathLib.Set([1, 3, 5])), 'Testing new MathLib.Set.fromTo()');
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

	ok(s1.filter(function (x) {
		return x % 2;
	}).isEqual(s2), '.filter()');
});
test('.forEach()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			arr = [];
	s.forEach(function (x) {
		arr.push(x);
	});

	deepEqual(arr, [1, 2, 3, 4], '.forEach()');
});
test('.indexOf()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	deepEqual(s.indexOf(3), 2, '.indexOf()');
	deepEqual(s.indexOf(5), -1, '.indexOf()');
});
test('.insert()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);
	ok(s.insert(1).isEqual(new MathLib.Set([1, 2, 3, 4, 8, 9])), 'Testing .insert() (set, front)');
	ok(s.insert(3).isEqual(new MathLib.Set([1, 2, 3, 4, 8, 9])), 'Testing .insert() (set, existing)');
	ok(s.insert(5).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 8, 9])), 'Testing .insert() (set, not existing)');
	ok(s.insert(10).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 8, 9, 10])), 'Testing .insert() (set, back)');
});
test('.intersect()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	ok(s.intersect(m).isEqual(new MathLib.Set([1, 3])), '.intersect()');
	ok(c1.intersect(c2).isEqual(new MathLib.Set([1, new MathLib.Complex(1, 1)])), '.intersect()');
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
			n = new MathLib.Set([1, 2, new MathLib.Complex(3, 0), 4]);
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

	ok(res.isEqual(q), '.map()');
	equal(res.type, 'set', '.type should be set');
});
test('.plus()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 2, 3, 4, 5, 6]);

	ok(s.plus(2).isEqual(new MathLib.Set([3, 4, 5, 6])), 'Testing .plus(int) (set)');
	ok(s.plus(m).isEqual(new MathLib.Set([2, 3, 4, 5, 6, 7, 8, 9, 10])), 'Testing .plus(set) (set)');
});

test('.powerset()', 5, function () {
	equal((new MathLib.Set([])).powerset().card, 1);
	equal((new MathLib.Set([1])).powerset().card, 2);
	equal((new MathLib.Set([1, 2])).powerset().card, 4);
	equal((new MathLib.Set([1, 2, 3])).powerset().card, 8);
	equal((new MathLib.Set([1, 2, 3, 4])).powerset().card, 16);
});
test('.reduce()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.reduce(function (old, cur) {
		return old * cur;
	}), 24, '.reduce()');
});
test('.remove()', 1, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]);

	ok(s.remove(3).isEqual(new MathLib.Set([2, 4, 8, 9])));
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

test('.times()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	ok(s.times(2).isEqual(new MathLib.Set([2, 4, 6, 8])), 'Testing .times(int) (set)');
});

test('.toArray()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			n = new MathLib.Set();

	deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
	deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});
test('.toContentMathML()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toContentMathML(), '<set><cn type="double">2</cn><cn type="double">' +
		'3</cn><cn type="double">4</cn><cn type="double">8</cn><cn type="double">' +
		'9</cn></set>', 'Testing .toContentMathML() (set)');
	equal(s.toContentMathML({strict: true}), '<apply><csymbol cd="set1">set' +
		'</csymbol><cn type="double">2</cn><cn type="double">3</cn><cn type=' +
		'"double">4</cn><cn type="double">8</cn><cn type="double">9</cn></apply>',
		'Testing .toContentMathML() (set)');

	equal(e.toContentMathML(), '<emptyset/>', 'Testing .toContentMathML() (empty set)');
	equal(e.toContentMathML({strict: true}), '<csymbol cd="set1">emptyset</csymbol>',
		'Testing .toContentMathML() (empty set)');
});
test('.toLaTeX()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toLaTeX(), '\\left{2, 3, 4, 8, 9\\right}', 'Testing .toLaTeX() (set)');
	equal(s.toLaTeX({base: 2}), '\\left{10, 11, 100, 1000, 1001\\right}', 'Testing .toLaTeX() (set)');
	equal(e.toLaTeX(), '\\emptyset', 'Testing .toLaTeX() (empty set)');
});

test('.toMathML()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toMathML(), '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,' +
		'</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>',
		'Testing .toMathML() (set)');
	equal(s.toMathML({base: 2}), '<mrow><mo>{</mo><mn>10</mn><mo>,</mo><mn>11</mn><mo>,' +
		'</mo><mn>100</mn><mo>,</mo><mn>1000</mn><mo>,</mo><mn>1001</mn><mo>}</mo></mrow>',
		'Testing .toMathML() (set)');
	equal(e.toMathML(), '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});

test('.toString()', 3, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toString(), '{2, 3, 4, 8, 9}', 'Testing .toString() (set)');
	equal(s.toString({base: 2}), '{10, 11, 100, 1000, 1001}', 'Testing .toString() (set)');
	equal(e.toString(), '∅', 'Testing .toString() (empty set)');
});

test('.total()', 1, function () {
	var s = new MathLib.Set([1, 2, 3, 4]);

	equal(s.total(), 10);
});

test('.union()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 3]);

	ok(s.union(m).isEqual(new MathLib.Set([1, 2, 3, 4, 5, 7])), '.union()');
	ok(s.union(c).isEqual(new MathLib.Set([1, 2, 3, 4, new MathLib.Complex(0, 1), new MathLib.Complex(1, 1)])), '.union()');
});
test('.without()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	ok(s.without(m).isEqual(new MathLib.Set([2, 4])), '.without()');
	ok(c1.without(c2).isEqual(new MathLib.Set([2, new MathLib.Complex(0, 1)])), '.without()');
});
test('.xor()', 2, function () {
	var s = new MathLib.Set([1, 2, 3, 4]),
			m = new MathLib.Set([1, 3, 5, 7]),
			c1 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 1), 2]),
			c2 = new MathLib.Set([1, new MathLib.Complex(1, 1), new MathLib.Complex(0, 2), 3]);

	ok(s.xor(m).isEqual(new MathLib.Set([2, 4, 5, 7])), '.xor()');
	ok(c1.xor(c2).isEqual(new MathLib.Set([2, 3, new MathLib.Complex(0, 1), new MathLib.Complex(0, 2)])), '.xor()');
});
module('Vector');
test('init', 4, function () {
	var vector = new MathLib.Vector([1, 2, 3]);

	equal(vector.length, 3, 'Testing the dimension');
	equal(vector[0], 1, 'checking the entries');
	equal(vector[1], 2, 'checking the entries');
	equal(vector[2], 3, 'checking the entries');
});


if (typeof Float32Array !== 'undefined') {
	test('init with Float32Array', 4, function () {
		var vector,
				f = new Float32Array(3);

		f[0] = 1;
		f[1] = 2;
		f[2] = 3;

		vector = new MathLib.Vector(f);

		equal(vector.length, 3, 'Testing the dimension');
		equal(vector[0], 1, 'checking the entries');
		equal(vector[1], 2, 'checking the entries');
		equal(vector[2], 3, 'checking the entries');
	});
}

// Properties
test('.constructor', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.constructor, MathLib.Vector, 'Testing .constructor');
});


test('.type', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.type, 'vector', 'Testing .type');
});
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
test('zero()', 1, function () {
	var v = new MathLib.Vector.zero(3);

	equal(v.isZero(), true, 'testing zero vector');
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
			};

	p.forEach(f);

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
	throws(function () {
		v.minus(u);
	}, /Vector sizes not matching/, '.minus()');
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
	throws(function () {
		v.plus(u);
	}, /Vector sizes not matching/, '.plus()');
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
	throws(function () {
		u.scalarProduct(w);
	}, /Vector sizes not matching/, '.scalarProduct()');
	throws(function () {
		v.scalarProduct(u);
	}, /Vector sizes not matching/, '.scalarProduct()');
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
test('.toContentMathML()', 2, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toContentMathML(), '<vector><cn type="double">1</cn><cn type="double">2</cn>' +
		'<cn type="double">3</cn></vector>', '.toContentMathML()');
	equal(v.toContentMathML({strict: true}), '<apply><csymbol cd="linalg2">vector</csymbol>' +
		'<cn type="double">1</cn><cn type="double">2</cn><cn type="double">3</cn></apply>', '.toContentMathML()');
});
test('.toLaTeX()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});
test('.toMathML()', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2' +
		'</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
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
	throws(function () {
		u.vectorProduct(w);
	}, /Vectors are not three-dimensional/, '.vectorProduct()');
	throws(function () {
		v.vectorProduct(u);
	}, /Vectors are not three-dimensional/, '.vectorProduct()');
});

});