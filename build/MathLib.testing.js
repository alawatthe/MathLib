module("MathLib");
test("general", 1, function () {
  equals(typeof MathLib, 'object', "is MathLib defined");
});


test('abs', 3, function () {
  equals(MathLib.abs(42), 42);
  equals(MathLib.abs(-6), 6);
  equals(MathLib.abs(MathLib.complex([3, 4])), 5);
});


test('arccos', 3, function () {
  equals(MathLib.arccos(0), Math.PI / 2);
  equals(MathLib.arccos(1), 0);
  deepEqual(MathLib.arccos(MathLib.complex([3, 4])), MathLib.complex([0.9368124611557207, -2.305509031243476942041]));
});


// test('arccot', 3, function () {
//   equals(MathLib.arccot(0), Math.PI / 2);
//   equals(MathLib.arccot(1), Math.PI / 4);
//   deepEqual(MathLib.arccot(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arccsc', 3, function () {
//   equals(MathLib.arccsc(0), Infinity);
//   equals(MathLib.arccsc(1), Math.PI / 2);
//   deepEqual(MathLib.arccsc(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcosh', 3, function () {
//   equals(MathLib.arcosh(0), '', 'pi/2 * i');
//   equals(MathLib.arcosh(1), 0);
//   deepEqual(MathLib.arcosh(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcoth', 3, function () {
//   equals(MathLib.arcoth(0), '', 'pi/2 * i');
//   equals(MathLib.arcoth(1), Infinity);
//   deepEqual(MathLib.arcoth(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcsch', 3, function () {
//   equals(MathLib.arcsch(0), '', 'i * Infinity');
//   equals(MathLib.arcsch(1), 0.8813735870195429);
//   deepEqual(MathLib.arcsch(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arcsec', 3, function () {
//   equals(MathLib.arcsec(0), '', 'i * Inifinity');
//   equals(MathLib.arcsec(1), 0);
//   deepEqual(MathLib.arcsec(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


test('arcsin', 3, function () {
  equals(MathLib.arcsin(0), 0);
  equals(MathLib.arcsin(1), Math.PI / 2);
  deepEqual(MathLib.arcsin(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
});


// test('arctan', 3, function () {
//   equals(MathLib.arctan(0), 0);
//   equals(MathLib.arctan(1), Math.PI / 4);
//   deepEqual(MathLib.arctan(MathLib.complex([3, 4])), MathLib.complex([1.4483069952314644, 0.15899719167999918]));
// });


// test('arsech', 3, function () {
//   equals(MathLib.arsech(0), Infinity);
//   equals(MathLib.arsech(1), 0);
//   deepEqual(MathLib.arsech(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('arsinh', 3, function () {
//   equals(MathLib.arsinh(0), 0);
//   equals(MathLib.arsinh(1), 0.8813735870195429);
//   deepEqual(MathLib.arsinh(MathLib.complex([3, 4])), MathLib.complex([0.6339838656391759, 2.305509031243476942041]));
// });


// test('artanh', 3, function () {
//   equals(MathLib.artanh(0), 0);
//   equals(MathLib.artanh(1), Infinity);
//   deepEqual(MathLib.artanh(MathLib.complex([3, 4])), MathLib.complex([0.11750090731143381, 1.4099210495965755]), 'the function is currently returning π to less, it\'s not wrong but 1.4... would be better');
// });


test('.binomial', 4, function () {
  equals(MathLib.binomial(0, 0), 1);
  equals(MathLib.binomial(6, 3), 20);
  equals(MathLib.binomial(2, 4), 0);
  equals(MathLib.binomial(-4, 3), -20);
});


test('.compare', 3, function () {
  equals(MathLib.compare(12, 12), 0);
  equals(MathLib.compare(1, 2), -1);
  equals(MathLib.compare(23, MathLib.complex([3, 4])), 1);
});


test('.exp', 2, function () {
  equals(MathLib.exp(0), 1);
  equals(MathLib.exp(1), MathLib.e);
});


test('.hypot', 2, function () {
  equals(MathLib.hypot(3, 4), 5);
  equals(MathLib.hypot(3, 4, 12), 13);
});


test('.factor', 2, function () {
  deepEqual(MathLib.factor(12), MathLib.set([2, 2, 3], true));
  deepEqual(MathLib.factor(-15), MathLib.set([3, 5], true));
});


test('.factorial', 1, function () {
  equal(MathLib.factorial(6), 720);
});


test('.fallingFactorial', 4, function () {
  equals(MathLib.fallingFactorial(2, 0), 1);
  equals(MathLib.fallingFactorial(6, 3), 120);
  equals(MathLib.fallingFactorial(2, 4), 0);
  equals(MathLib.fallingFactorial(4, 3, 0.5), 4 * 3.5 * 3);
});


test('.fibonacci', 1, function () {
  equals(MathLib.fibonacci(4), 3, 'Is the fourth fibonacci number 3?');
});


test('.floor', 2, function () {
  equals(MathLib.floor(2.5), 2);
  equals(MathLib.floor(-2.5), -3);
});


test('.inverse', 1, function () {
  equals(MathLib.inverse(2), 1 / 2);
  // What makes most sense to return Infinity, NaN, undefined, ...?
  // equals(MathLib.inverse(0), );
});


test('.is', 7, function () {
  var p = MathLib.point([1, 2, 3]);
  equals(MathLib.is(2, 'number'), true);
  equals(MathLib.is(p, 'point'), true);
  equals(MathLib.is(p, 'vector'), true);
  equals(MathLib.is(p, 'array'), true);
  equals(MathLib.is(p, 'object'), true);
  equals(MathLib.is(p, 'line'), false);
  equals(MathLib.is([], 'array'), true);
});


test('.isFinite', 3, function () {
  equals(MathLib.isFinite(2), true);
  equals(MathLib.isFinite(Infinity), false);
  equals(MathLib.isFinite(-Infinity), false);
});


test('.isInt', 2, function () {
  equals(MathLib.isInt(2), true);
  equals(MathLib.isInt(2.5), false);
});


test('.isOne', 2, function () {
  equals(MathLib.isOne(1), true);
  equals(MathLib.isOne(2), false);
});


test('.isPrime', 2, function () {
  equals(MathLib.isPrime(4567), true);
  equals(MathLib.isPrime(112), false);
});


test('.isZero', 2, function () {
  equals(MathLib.isZero(0), true);
  equals(MathLib.isZero(1), false);
});


test('.max()', 2, function () {
  equals(MathLib.max([1, 42, 17, 4]), 42);
  equals(MathLib.max([1, 42, 17, 4], 2), 17);
});


test('risingFactorial', 3, function () {
  equals(MathLib.risingFactorial(2, 0), 1);
  equals(MathLib.risingFactorial(2, 3), 24);
  equals(MathLib.risingFactorial(3, 4, 0.5), 189);
});


test('sin', 3, function () {
  equals(MathLib.sin(0), 0);
  equals(MathLib.sin(Math.PI / 2), 1);
  ok(MathLib.isEqual(MathLib.sin(MathLib.complex([3, 4])), MathLib.complex([3.853738037919377, -27.016813258003932])));
});


test('type', 3, function () {
  equals(MathLib.type(42), 'number');
  equals(MathLib.type([6, 3]), 'array');
  equals(MathLib.type(MathLib.complex([2, 3])), 'complex');
});
module("Vector");
test("init", 2, function () {
  var vector = MathLib.vector([1, 2, 3]);
  equals(vector.dim, 3, "Testing the dimension");
  deepEqual(vector, [1, 2, 3], 'checking the entries');
});


test('.dyadicProduct()', 1, function () {
  var v = MathLib.vector([1, 2, 3]),
      w = MathLib.vector([2, 4, 6]);
  deepEqual(v.dyadicProduct(w), [[2, 4, 6], [4, 8, 12], [6, 12, 18]], ".dyadicProduct()");
});


test('.isEqual()', 3, function () {
  var v = MathLib.vector([0, 1, 2]),
      w = MathLib.vector([0, 1, 2]),
      u = MathLib.vector([0, 0, 0]),
      x = MathLib.vector([0, 0, 0, 0]);
  equals(v.isEqual(w), true, ".isEqual()");
  equals(v.isEqual(u), false, ".isEqual()");
  equals(u.isEqual(x), false, ".isEqual()");
});


test('.isZero()', 2, function () {
  var v = MathLib.vector([0, 0, 0]),
      w = MathLib.vector([0, 0, 1]);
  equals(v.isZero(), true, ".isZero()");
  equals(w.isZero(), false, ".isZero()");
});


test(".map()", 2, function () {
  var p = MathLib.vector([1, 2, 3]),
      q = MathLib.vector([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'vector', ".type should be vector");
});


test('.scalarproduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equals(v.scalarproduct(w), 44, ".scalarproduct()");
});


test('.size()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.size(), Math.sqrt(14), ".size()");
});

test('.times()', 2, function () {
  var v = MathLib.vector([1, 2, 3]),
      m = MathLib.matrix([[1,2,3],[4,5,6],[7,8,9]]);
  deepEqual(v.times(3), MathLib.vector([3, 6, 9]), ".times(number)");
  deepEqual(v.times(m), MathLib.vector([30, 36, 42]), ".times(matrix)");
});

test('.toContentMathML()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.toContentMathML(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', ".toContentMathML()");
});


test('.toLaTeX()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});


test('.toMathML()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', ".toMathML()");
});


test('.toString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.toString(), '(1, 2, 3)', ".toString()");
});


test('.vectorproduct()', 1, function () {
  var v = MathLib.vector([1, 2, 3]),
      w = MathLib.vector([-7, 8, 9]);
  deepEqual(v.vectorproduct(w), [-6, -30, 22], ".vectorProduct()");
});




test('constructor', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.constructor, MathLib.vector, 'Testing .constructor');
});

test('type', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equals(v.type, 'vector', 'Testing .type');
});


test('zero', 1, function () {
  var v = MathLib.vector.zero(3);
  equals(v.isZero(), true, 'testing zero vector');
});
module("Circle");
test("init", 2, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(circle.radius, 2, "Testing the radius");
  deepEqual(circle.center, p, "Testing the center");
});


test('area', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(MathLib.isEqual(circle.area(), 4 * MathLib.pi), true, ".area()");
});


test('circumference', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(MathLib.isEqual(circle.circumference(), 4 * MathLib.pi), true, ".circumference()");
});


test(".isContaining()", 3, function () {
  var p = MathLib.point(1, 2),
      inside = MathLib.point(2, 3),
      on = MathLib.point(1, 4),
      outside = MathLib.point(2, 4),
      circle = MathLib.circle(p, 2);

  ok(circle.isContaining(inside), "Point inside the circle");
  ok(!circle.isContaining(on), "Point on the circle");
  ok(!circle.isContaining(outside), "Point outside the circle");
});


test('.isEqual()', 2, function () {
  var c1 = MathLib.circle(MathLib.point(1, 2), 2),
      c2 = MathLib.circle(MathLib.point(1, 2), 3),
      c3 = MathLib.circle(MathLib.point([2, 4, 2]), 2);

  equals(c1.isEqual(c2), false, ".isEqual()");
  equals(c1.isEqual(c3), true, ".isEqual()");
});


test(".reflectAt()", 2, function () {
  var p = MathLib.point(1, 2),
      q = MathLib.point(3, 7),
      circle = MathLib.circle(p, 2),
      newcircle = circle.reflectAt(q);

  equals(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, MathLib.point(5, 12), "Checking the center.");
});



test('constructor', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equals(c.constructor, MathLib.circle, 'Testing .constructor');
});


test('type', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equals(c.type, 'circle', 'Testing .type');
});
module('Complex');
test('init (1 Array)', 3, function () {
  var c = MathLib.complex([1, 2]);
  equals(c.re, 1, 'Testing the real part');
  equals(c.im, 2, 'Testing the complex part');
  deepEqual(c.z, [1, 2], 'Testing the complete complex number');
});


test('init (2 Numbers)', 3, function () {
  var c = MathLib.complex(3, 2);
  equals(c.re, 3 * Math.cos(2), 'Testing the real part');
  equals(c.im, 3 * Math.sin(2), 'Testing the complex part');
  deepEqual(c.z, [3 * Math.cos(2), 3 * Math.sin(2)], 'Testing the complete complex number');
});


test('.abs()', 1, function () {
  var c = MathLib.complex([3, 4]);
  equals(5, c.abs(), 'Absolut value of the complex number');
});


test('.argument()', 3, function () {
  var c = MathLib.complex([1, 1]),
      d = MathLib.complex([1, -1]),
      e = MathLib.complex([0, 0]);
  equals(c.argument(), 0.7853981633974483, '');
  equals(d.argument(), 5.497787143782138, '');
  equals(e.argument(), 0,  '');
});


test('.compare()', 3, function () {
  var c = MathLib.complex([3, 2]),
      d = MathLib.complex([1, 1]),
      e = MathLib.complex([-1, 1]);
  equals(c.compare(c), 0, 'equal complex numbers');
  equals(c.compare(d), 1, 'normal compare');
  equals(d.compare(e), -1,  '');
});


test('.conjugate()', 1, function () {
  var c = MathLib.complex([3, 4]);
  deepEqual([3, -4], c.conjugate().z, 'Checking the conjugate of a complex number');
});


test('.divide()', 2, function () {
  var c = MathLib.complex([3, 6]),
      d = MathLib.complex([2, 5]),
      e = MathLib.complex([3, 7]);
  deepEqual(c.divide(3), MathLib.complex([1, 2]), 'Dividing by a normal number.');
  ok(d.divide(e).isEqual(MathLib.complex([41 / 58, 1 / 58])), 'Dividing by a complex number.');
});


test('.inverse()', 2, function () {
  var c1 = MathLib.complex([3, 4]),
      c2 = MathLib.complex([0, 2]);
  deepEqual(c1.inverse(), MathLib.complex([3 / 25, -4 / 25]), 'Checking the inverse of a complex number');
  deepEqual(c2.inverse(), MathLib.complex([0, -1 / 2]), 'Checking the inverse of a complex number');
});


test('.isEqual()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([6 / 2, 4]),
      e = MathLib.complex([5, 3]);
  equals(c.isEqual(d), true, 'equal number');
  equals(d.isEqual(e), false, 'different number');
});


test('.isFinite()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([Infinity, 0]);
  equals(c.isFinite(), true, 'finite complex number');
  equals(d.isFinite(), false, 'infinte complex number');
});


test('.isOne()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([1, 0]);
  equals(c.isOne(), false, '3+4i');
  equals(d.isOne(), true, 'complex one');
});


test('.isReal()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([3, 0]);
  equals(c.isReal(), false, '3+4i');
  equals(d.isReal(), true, '3+0i');
});


test('.isZero()', 2, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 0]);
  equals(c.isZero(), false, 'non zero complex');
  equals(d.isZero(), true, 'complex zero');
});


test('.ln()', 1, function () {
  var c = MathLib.complex([3, 4]),
      res = MathLib.complex([1.6094379124341003, 0.9272952180016123]);
  deepEqual(c.ln(), res, 'natural logarithm of the complex number');
});


test(".mod()", 1, function () {
  var c = MathLib.complex([5, 6]),
      d = MathLib.complex([2, 0]);
  equals(c.mod(3).isEqual(d), true, ".mod()");
});


test('.minus()', 1, function () {
  var c = MathLib.complex([3, -4]),
      d = MathLib.complex([7, -8]);
  deepEqual(c.minus(d), MathLib.complex([-4, 4]), 'Checking the negative of a complex number');
});


test('.negative()', 1, function () {
  var c = MathLib.complex([3, -4]);
  deepEqual([-3, 4], c.negative().z, 'Checking the negative of a complex number');
});


test('.plus()', 2, function () {
  var c = MathLib.complex([3, 4]);
  var d = MathLib.complex([2, -5]);
  deepEqual([5, -1], c.plus(d).z, 'Adding two complex numbers.');
  deepEqual([8, 4], c.plus(5).z, 'Adding a number to a complex numbers.');
});


test(".sgn()", 1, function () {
  var c = MathLib.complex([5, 6]),
      d = MathLib.complex(1, Math.atan2(6, 5));
  equals(c.sgn().isEqual(d), true, ".sgn()");
});


test('.times()', 2, function () {
  var c = MathLib.complex([2, 5]);
  var d = MathLib.complex([3, 7]);
  deepEqual([6, 15], c.times(3).z, 'Multiplying by a normal number.');
  deepEqual([-29, 29], c.times(d).z, 'Multiplying by a complex number.');
});


test('.toContentMathML()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equals(c.toContentMathML(), '<cn type="complex-cartesian">3<sep/>4</cn>', 'Normal complex number.');
  equals(d.toContentMathML(), '<cn type="complex-cartesian">0<sep/>7</cn>', 'Real part is zero.');
  equals(e.toContentMathML(), '<cn type="complex-cartesian">4<sep/>0</cn>', 'Complex part is zero.');
  equals(f.toContentMathML(), '<cn type="complex-cartesian">4<sep/>-5</cn>', 'Complex part is negative.');
  equals(g.toContentMathML(), '<cn type="complex-cartesian">0<sep/>0</cn>', 'Number is zero.');
});


test('.toLaTeX()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equals(c.toLaTeX(), '3+4i', 'Normal complex number.');
  equals(d.toLaTeX(), '7i', 'Real part is zero.');
  equals(e.toLaTeX(), '4', 'Complex part is zero.');
  equals(f.toLaTeX(), '4-5i', 'Complex part is negative.');
  equals(g.toLaTeX(), '0', 'Number is zero.');
});


test('.toMathML()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equals(c.toMathML(), '<mn>3</mn><mo>+</mo><mn>4</mn><mo>&#x2062;</mo><mi>i</mi>', 'Normal complex number.');
  equals(d.toMathML(), '<mn>7</mn><mo>&#x2062;</mo><mi>i</mi>', 'Real part is zero.');
  equals(e.toMathML(), '<mn>4</mn>', 'Complex part is zero.');
  equals(f.toMathML(), '<mn>4</mn><mo>-</mo><mn>5</mn><mo>&#x2062;</mo><mi>i</mi>', 'Complex part is negative.');
  equals(g.toMathML(), '<mn>0</mn>', 'Number is zero.');
});

test('.toMatrix()', 2, function () {
  var c = MathLib.complex([3, -4]);
  equals(c.toMatrix().type, 'matrix', 'type check');
  deepEqual(c.toMatrix().toComplex().z, [3, -4], 'back transformation');
});


test('.toPoint()', 3, function () {
  var c = MathLib.complex([3, -4]),
      p = c.toPoint();
  equals(p.type, 'point', 'Converting a complex number to a point: type check');
  equals(p.dim, 2, 'Converting a complex number to a point: dimension check.');
  deepEqual(p, MathLib.point([3, -4, 1]), 'Converting a complex number to a point: position check.');
});


test('.toString()', 5, function () {
  var c = MathLib.complex([3, 4]),
      d = MathLib.complex([0, 7]),
      e = MathLib.complex([4, 0]),
      f = MathLib.complex([4, -5]),
      g = MathLib.complex([0, 0]);
  equals(c.toString(), '3+4i', 'Normal complex number.');
  equals(d.toString(), '7i', 'Real part is zero.');
  equals(e.toString(), '4', 'Complex part is zero.');
  equals(f.toString(), '4-5i', 'Complex part is negative.');
  equals(g.toString(), '0', 'Number is zero.');
});


test('constructor', 1, function () {
  var c = MathLib.complex([3, 4]);
  equals(c.constructor, MathLib.complex, 'Testing .constructor');
});

test('one', 1, function () {
  var c = MathLib.complex.one;
  deepEqual(c, MathLib.complex([1, 0]), '.one');
});

test('type', 1, function () {
  var c = MathLib.complex([3, 4]);
  equals(c.type, 'complex', 'Testing .type');
});

test('zero', 1, function () {
  var c = MathLib.complex.zero;
  deepEqual(c, MathLib.complex([0, 0]), '.zero');
});


module('Line');
test('init', 2, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.dim, 2, 'Testing the dimension');
  deepEqual(line, [3,2,1], 'Testing the entries');
});

test('.isEqual', 3, function () {
  var line1 = MathLib.line([3, 2, 1]),
      line2 = MathLib.line([6, 4, 2]),
      line3 = MathLib.line([1, 1, 1]),
      line4 = MathLib.line([1, 1, 1, 1]);
  equals(line1.isEqual(line2), true, '.isEqual()');
  equals(line1.isEqual(line3), false, '.isEqual()');
  equals(line3.isEqual(line4), false, ".isEqual()");
});


test('.isFinite', 2, function () {
  var line1 = MathLib.line([3, 2, 1]),
      line2 = MathLib.line([6, 4, 0]);
  equals(line1.isFinite(), true, '.isFinite()');
  equals(line2.isFinite(), false, '.isFinite()');
});


test(".map()", 2, function () {
  var p = MathLib.line([1, 2, 3]),
      q = MathLib.line([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'line', ".type should be line");
});

// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = MathLib.point([3, 2, 1]);
//   equals(point.toContentMathML(), '', '.toContentMathML()');
//   equals(point.toContentMathML(true), '', '.toContentMathML()');
// });

test('.toLaTeX', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});

test('.toMathML', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});


test('.toString', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.toString(), '(3, 2, 1)', '.toString()');
});



test('constructor', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.constructor, MathLib.line, 'Testing .constructor');
});

test('type', 1, function () {
  var line = MathLib.line([3, 2, 1]);
  equals(line.type, 'line', 'Testing .type');
});
module('MathML');
test('init', 2, function () {
  var mathML = MathLib.MathML('<matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix>'),
    test = function (node) {
      var treeWalker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT,
          { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
          false
      );
      var nodeList = [];
      while (treeWalker.nextNode()) {
        nodeList.push(treeWalker.currentNode.nodeName); 
      }

      return nodeList;
    };

  equals(typeof mathML, 'object', 'Testing typeof the MathML');
  deepEqual(test(mathML), ['matrix', 'matrixrow', 'cn', 'cn', 'matrixrow', 'cn', 'cn'], 'Checking if the MathML was tokenized right.');
});


// I need a better test...
test('.isSupported()', 1, function () {
  var supp = MathLib.MathML.isSupported();
  ok(supp === true || supp === false, '.isEqual()');
});


test('.parse()', 11, function () {
  var matrix = MathLib.MathML('<matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix>'),
      complex1 = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>'),
      complex2 = MathLib.MathML('<cn type="complex-polar">1<sep/>3.141592653589793</cn>'),
      set1 = MathLib.MathML('<set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set>'),
      set2 = MathLib.MathML('<set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set>'),
      vector = MathLib.MathML('<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>'),
      cs = MathLib.MathML('<set><cs>A</cs><cs>B</cs><cs> </cs></set>'),
      apply1 = MathLib.MathML('<apply><ln/><cn>42</cn></apply>'),
      apply2 = MathLib.MathML('<apply><scalarproduct/><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector><vector><cn>4</cn><cn>5</cn><cn>6</cn></vector></apply>'),
      apply3 = MathLib.MathML('<apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply>'),
      apply4 = MathLib.MathML('<apply><union/><set><cn>1</cn><cn>2</cn><cn>3</cn></set><set><cn>3</cn><cn>4</cn><cn>5</cn></set></apply>');

  deepEqual(complex1.parse(), MathLib.complex([3, 4]), '.parse() complex (cartesian)');
  deepEqual(complex2.parse(), MathLib.complex(1, 3.141592653589793), '.parse() complex (polar)');
  deepEqual(matrix.parse(), MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
  deepEqual(set1.parse(), MathLib.set.fromTo(1, 10), '.parse() set');
  deepEqual(set2.parse(), MathLib.set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
  deepEqual(vector.parse(), MathLib.vector([1, 2, 3]), '.parse() vector');
  deepEqual(cs.parse(), MathLib.set(['A', 'B', ' ']), '.parse() cs');
  deepEqual(apply1.parse(), Math.log(42), '.parse() apply');
  deepEqual(apply2.parse(), 32, '.parse() apply');
  deepEqual(apply3.parse(), -360, '.parse() apply');
  deepEqual(apply4.parse(), MathLib.set([1, 2, 3, 4, 5]), '.parse() apply');
});



test('constructor', 1, function () {
  var m = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>');
  deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor; This test fails in Safari. This constructor is not used by MathLib.js');
});


test('type', 1, function () {
  var m = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>');
  equals(m.type, 'MathML', 'Testing .type');
});
//=======================================
// Matrix
//=======================================
module('Matrix');
test('init', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equals(m.rows, 3, 'Testing the number of rows');
  equals(m.cols, 3, 'Testing the number of cols');
});


test('.adjugate()', 1, function () {
  var c = MathLib.complex,
      m = MathLib.matrix([[-3, 2, -5], [-1, 0, -3], [3, -4, 1]]),
      res = MathLib.matrix([[-12, 18, -6], [-8, 12, -4], [4, -6, 2]]);

  deepEqual(m.adjugate(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.adjoint()', 1, function () {
  var c = MathLib.complex,
      m = MathLib.matrix([[c([3, 1]), 5, c([0, -2])], [c([2, -2]), c([0, 1]), c([-7, -13])]]),
      res = MathLib.matrix([[c([3, -1]), c([2, 2])], [5, c([0, -1])], [c([0, 2]), c([-7, 13])]]);

  deepEqual(m.adjoint(), res, 'Adjoint matrix of a complex 2x3 matrix');
});


test('.cholesky()', 1, function () {
  var m = MathLib.matrix([[25, 15, -5], [15, 18, 0], [-5, 0, 11]]),
      res = MathLib.matrix([[5, 0, 0], [3, 3, 0], [-1, 1, 3]]);

  deepEqual(m.cholesky(), res, 'Cholesky decomposition of  3x3 matrix');
});


test('.determinant()', 3, function () {
  var m = MathLib.matrix([[0, 1, 2], [3, 2, 1], [1, 1, 0]]),
      n = MathLib.matrix([[42]]),
      p = MathLib.matrix([[0, 1, 2], [3, 2, 1]]);

  equals(m.determinant(), 3, 'Determinant of a 3x3 matrix');
  equals(n.determinant(), 42, 'Determinant of 1x1 matrix');
  equals(p.determinant(), undefined, 'Determinant of 2x3 matrix should be undefined');
});


test('.isDiag()', 2, function () {
  var c = MathLib.complex(0, 0),
      m = MathLib.matrix([[1, 0, 0], [0, 5, 0], [0, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equals(m.isDiag(), true, 'square matrix');
  equals(n.isDiag(), false, 'non square matrix');
});


test('.isIdentity()', 2, function () {
  var m = MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equals(m.isIdentity(), true, '.isIdentity() on identity matrix');
  equals(n.isIdentity(), false, '.isIdentity() on non identity matrix');
});


test('.isInvertible()', 2, function () {
  var m = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 2]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 9, 15]]);
  equals(m.isInvertible(), true, '.isInvertible(), invertible matrix');
  equals(n.isInvertible(), false, '.isInvertible(), singular matrix');
});


test('.isLower()', 4, function () {
  var m = MathLib.matrix([[1, 0, 0], [4, 5, 0], [3, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = MathLib.matrix([[1, 0, 0], [4, 5, 0]]),
      p = MathLib.matrix([[1, 0, 0], [4, 5, 0], [4, 0, 6], [4, 3, 2]]);
  equals(m.isLower(), true, 'upper matrix');
  equals(n.isLower(), false, 'non upper matrix');
  equals(o.isLower(), true, 'upper matrix');
  equals(p.isLower(), true, 'upper matrix');
});


test('.isOrthogonal()', 2, function () {
  var m = MathLib.matrix([[0.8, -0.6], [0.6, 0.8]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 5, 8]]);
  equals(m.isOrthogonal(), true, '.isOrthogonal() on orthogal matrix');
  equals(n.isOrthogonal(), false, '.isOrthogonal() on non orthogonal matrix');
});


test('.isPermutation()', 3, function () {
  var m = MathLib.matrix([[0, 1, 0], [1, 0, 0], [0, 0, 1]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [2, 3, 4]]),
      o = MathLib.matrix([[0, 1, 0], [1, 0, 0], [0, 0, 0]]);
  equals(m.isPermutation(), true, 'permutation matrix');
  equals(n.isPermutation(), false, 'non permutation matrix');
  equals(o.isPermutation(), false, 'zero line');
});


test('.isPosDefinite()', 2, function () {
  var m = MathLib.matrix([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]),
      n = MathLib.matrix([[1, 2], [2, 1]]);
  equals(m.isPosDefinite(), true, 'positiv definite matrix');
  equals(n.isPosDefinite(), false, 'non positiv definite matrix');
});


test('.isSquare()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8]]);
  equals(m.isSquare(), true, 'square matrix');
  equals(n.isSquare(), false, 'non square matrix');
});


test('.isSymmetric()', 2, function () {
  var c = MathLib.complex(4, 0),
      m = MathLib.matrix([[1, 7, c], [7, 0, 3], [4, 3, 1]]),
      n = MathLib.matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equals(m.isSymmetric(), true, 'symmetric matrix');
  equals(n.isSymmetric(), false, 'non symmetric matrix');
});


test('.isUpper()', 4, function () {
  var m = MathLib.matrix([[1, 2, 3], [0, 5, 6], [0, 0, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 5, 6]]),
      o = MathLib.matrix([[1, 4, 7], [0, 5, 8]]),
      p = MathLib.matrix([[1, 4, 7], [0, 5, 8], [0, 0, 6], [0, 0, 0]]);
  equals(m.isUpper(), true, 'upper matrix');
  equals(n.isUpper(), false, 'non upper matrix');
  equals(o.isUpper(), true, 'upper matrix');
  equals(p.isUpper(), true, 'upper matrix');
});


test('.isVector()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2, 3]]);
  equals(m.isVector(), false, 'normal matrix');
  equals(n.isVector(), true, 'one row matrix');
});


test('.isZero()', 2, function () {
  var c = MathLib.complex(0, 0),
      m = MathLib.matrix([[0, 0, 0], [0, 0, c], [0, 0, 0]]),
      n = MathLib.matrix([[0, 0, 0], [0, 1, c], [0, 0, 0]]);
  equals(m.isZero(), true, 'zero matrix');
  equals(n.isZero(), false, 'non zero matrix');
});


test('.LU()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      n = MathLib.matrix([[1, 3, 5], [2, 4, 7], [1, 1, 0]]),
      res1 = MathLib.matrix([[1, 2, 3], [1, -1, -2], [3, 3, -2]]),
      res2 = MathLib.matrix([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]);

  deepEqual(m.LU(true), res1, 'LU decomposition');
  deepEqual(n.LU(), res2, 'LU decomposition');
});


test(".map()", 2, function () {
  var p = MathLib.matrix([[1, 2],[3, 4]]),
      q = MathLib.matrix([[2, 4], [6, 8]]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'matrix', ".type should be matrix");
});


test('.minus()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[0, -2, -4], [2, 0, -2], [4, 2, 0]]),
      res1 = MathLib.matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  deepEqual(m.minus(n), res, 'subtracting two simple matrices');
  deepEqual(n.minus(n), res1, 'subtracting two simple matrices');
});


test('.negative()', 1, function () {
  var m = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[-1, -4, -7], [-2, -5, -8], [-3, -6, -9]]);
  deepEqual(m.negative(), res, 'negative of a simple matrix');
});


test('.plus()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]),
      res = MathLib.matrix([[2, 6, 10], [6, 10, 14], [10, 14, 18]]);
  deepEqual(m.plus(n), res, 'adding two simple matrices');
});


test('.rank()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [0, 5, 4], [0, 10, 2]]),
      n = MathLib.matrix([[1, 2, 3], [0, 6, 4], [0, 3, 2]]);
  equals(m.rank(), 3, '.rank()');
  equals(n.rank(), 2, '.rank()');
});


test('.remove()', 3, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      res1 = MathLib.matrix([[1, 2, 3], [7, 8, 9]]),
      res2 = MathLib.matrix([[1, 3], [4, 6], [7, 9]]),
      res3 = MathLib.matrix([[4], [7]]);

  deepEqual(m.remove(1), res1, 'removing the second row');
  deepEqual(m.remove(false, 1), res2, 'removing the second column');
  deepEqual(m.remove([0], [1, 2]), res3, 'removing the first row and the second and third col');
});


test('.rref()', 2, function () {
  var m = MathLib.matrix([[1, 2, -1, -4], [2, 3, -1, -11], [-2, 0, -3, 22]]),
      n = MathLib.matrix([[1, 2, 3], [1, 2, 4], [2, 4, 7]]);

  deepEqual(m.rref(), [[1, 0, 0, -8], [0, 1, 0, 1], [0, 0, 1, -2]], 'reduced row echelon form');
  deepEqual(n.rref(), [[1, 2, 0], [0, 0, 1], [0, 0, 0]], 'singular matrix');
});


test('.solve()', 4, function () {
  var A1 = MathLib.matrix([[1, 2, 3], [1, 1, 1], [3, 3, 1]]),
      b1 = MathLib.vector([2, 2, 0]),
      x1 = MathLib.vector([5, -6, 3]),
      A2 = MathLib.matrix([[1, 0, 3], [2, 1, 0], [0, 0, 1]]),
      b2 = MathLib.vector([10, 3, 3]),
      x2 = MathLib.vector([1, 1, 3]),
      c  = MathLib.complex,
      A3 = MathLib.matrix([[c([2, 3]), 0, 3], [2, c([-1, 5]), 0], [c([3, -4]), c([0, 1]), 1]]),
      b3 = MathLib.vector([c([5, 37]), c([5, 19]), c([21, 0])]),
      x3 = MathLib.vector([c([4, 2]), c([3, 0]), c([1, 7])]);

  ok(MathLib.isEqual(A1.solve(b1), x1), 'Solving a system of linear equations');
  deepEqual(A1.times(x1), b1, 'Showing the solution is right');

  deepEqual(A2.solve(b2), x2, 'Solving a system of linear equations');

  ok(MathLib.isEqual(A3.solve(b3), x3), 'Solving a complex system of linear equations');
});


test('.times()', 4, function () {
  var m = MathLib.matrix([[1, 2], [3, 4]]),
      n = MathLib.matrix([[0, 1], [0, 0]]),
      res = MathLib.matrix([[0, 1], [0, 3]]),

      c  = MathLib.complex,
      mc = MathLib.matrix([[c([2, 3]), 0, 3], [2, c([-1, 5]), 0], [c([3, -4]), c([0, 1]), 1]]),
      bc = MathLib.vector([c([4, 2]), 3, c([1, 7])]),
      resc = MathLib.vector([c([5, 37]), c([5, 19]), c([21, 0])]);

  deepEqual(m.times(3), MathLib.matrix([[3, 6], [9, 12]]), 'matrix scalar multiplication');
  deepEqual(m.times(c([0, 1])), MathLib.matrix([[c([0, 1]), c([0, 2])], [c([0, 3]), c([0, 4])]]), 'matrix scalar multiplication');
  deepEqual(m.times(n), res, 'multiplying two simple matrices');
  deepEqual(mc.times(bc), resc, 'complex matrix times complex vector');
});


test('.trace()', 2, function () {
  var c = MathLib.complex([3, 4]),
      m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2], [3, c]]);
  equals(m.trace(), 15, 'trace of a simple matrix');
  deepEqual(n.trace().z, [4, 4], 'trace of a complex matrix');
});


test('.transpose()', 2, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      n = MathLib.matrix([[1, 2, 3], [4, 5, 6]]);

  deepEqual(m.transpose(), MathLib.matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]]), 'transpose a square matrix');
  deepEqual(n.transpose(), MathLib.matrix([[1, 4], [2, 5], [3, 6]]), 'transpose of a rectangular matrix');
});


test('.toArray()', 4, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      a = m.toArray();

  deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], '.toArray()');
  equals(Object.prototype.toString.call(a), '[object Array]', '.toArray()');
  equals(a.type, undefined, 'get sure that it is not a Mathlib object');
  a[0][0] = 42;
  deepEqual(m, MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), 'make sure the matrix hasn\'t changed');
});


test('.toColVectors()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toColVectors(), [MathLib.vector([1, 4, 7]), MathLib.vector([2, 5, 8]), MathLib.vector([3, 6, 9])], '.toColVectors()');
});


test('.toComplex()', 1, function () {
  var m = MathLib.matrix([[1, -2], [2, 1]]);
  deepEqual(m.toComplex().z, [1, 2], 'convert a 2x2 matrix to a complex number');
});


test('.toContentMathML()', 1, function () {
  var m = MathLib.matrix([[1, 2], [3, 4]]);
  deepEqual(m.toContentMathML(), '<matrix><matrixrow><cn>1</cn><cn>2</cn></matrixrow><matrixrow><cn>3</cn><cn>4</cn></matrixrow></matrix>', '.toContentMathML()');
});


test('.toLaTeX()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toLaTeX(), '\\begin{pmatrix}\n1 & 2 & 3\\\n4 & 5 & 6\\\n7 & 8 & 9\n\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathML()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toMathML(), '<mrow><mo> ( </mo><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>2</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>4</mn></mtd><mtd><mn>5</mn></mtd><mtd><mn>6</mn></mtd></mtr><mtr><mtd><mn>7</mn></mtd><mtd><mn>8</mn></mtd><mtd><mn>9</mn></mtd></mtr></mtable><mo> ) </mo></mrow>', '.toMathML()');
});


test('.toRowVectors()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toRowVectors(), [MathLib.vector([1, 2, 3]), MathLib.vector([4, 5, 6]), MathLib.vector([7, 8, 9])], '.toRowVectors()');
});


test('.toString()', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  deepEqual(m.toString(), '1\t2\t3\n4\t5\t6\n7\t8\t9', '.toString()');
});


// Static methods
test('constructor', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equals(m.constructor, MathLib.matrix, 'Testing .constructor');
});


test('identity()', 1, function () {
  equals(MathLib.matrix.identity(4).isIdentity(), true, 'creating a identity matrix');
});


test('numbers()', 3, function () {
  var m = MathLib.matrix.numbers(3, 2, 2),
      n = MathLib.matrix.numbers(4, 2),
      o = MathLib.matrix.numbers(5);
  deepEqual(m, [[3, 3], [3, 3]], 'static number method');
  deepEqual(n, [[4, 4], [4, 4]], 'static number method');
  deepEqual(o, [[5]], 'static number method');
});


test('type', 1, function () {
  var m = MathLib.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  equals(m.type, 'matrix', 'Testing .type');
});
module('Permutation');
test('init', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([[0, 1], [2, 3]]);
  equals(p.type, 'permutation', 'Testing .type');
});

test('.applyTo()', 6, function () {
  var p = MathLib.permutation([[0, 1, 2], [0, 1, 2]]),
      r = MathLib.permutation([0, 2, 1]),
      q = MathLib.permutation([]),
      v = MathLib.vector([1, 2, 3]);

  equals(p.applyTo(0), 2, 'Testing .applyTo()');
  equals(p.applyTo(3), 3, 'Testing .applyTo()');
  deepEqual(r.applyTo(v), MathLib.vector([1, 3, 2]), 'Testing .applyTo()');
  equals(r.applyTo(v).type, 'vector', 'Testing .applyTo()');
  deepEqual(r.applyTo([1, 2, 3]), [1, 3, 2], 'Testing .applyTo()');
  equals(q.applyTo(1), 1, 'Testing .applyTo() with id');
});


test(".map()", 2, function () {
  var p = MathLib.permutation([1, 2, 3]),
      q = MathLib.permutation([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'permutation', ".type should be permutation");
});


test('.times()', 1, function () {
  var p = MathLib.permutation([2, 0, 1]),
      q = MathLib.permutation([0, 2, 1]);
  deepEqual(p.times(q), [2, 1, 0], 'Testing .times()');
});


test('.sgn()', 2, function () {
  var p = MathLib.permutation([[0, 1], [1, 2]]),
      q = MathLib.permutation([[0, 1], [1, 2, 3]]);
  equals(p.sgn(), 1, 'Testing .sgn()');
  equals(q.sgn(), -1, 'Testing .sgn()');
});


test('.toMatrix()', 2, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([]),
      pm = MathLib.matrix([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]]),
      qm = MathLib.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  deepEqual(p.toMatrix(), pm, 'Testing .toMatrix()');
  deepEqual(q.toMatrix(4), qm, 'Testing .toMatrix() with id permutation');
});


test('.toString()', 2, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]),
      q = MathLib.permutation([]);
  equals(p.toString(), '(0,1)(2,3)', 'Testing .toString()');
  equals(q.toString(), '', 'Testing .toString() with id permutation');
});





test('.cycleToList()', 2, function () {
  var p = [[0, 1, 2], [3, 4]],
      q = [[0, 1], [2, 3]];
  deepEqual(MathLib.permutation.cycleToList(p), [1, 2, 0, 4, 3], 'Testing .cycleToList()');
  deepEqual(MathLib.permutation.cycleToList(q), [1, 0, 3, 2], 'Testing .cycleToList()');
});


test('.listToCycle()', 1, function () {
  var p = [1, 2, 0, 4, 3];
  deepEqual(MathLib.permutation.listToCycle(p), [[0, 1, 2], [3, 4]], 'Testing .listToCycle()');
});


test('constructor', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]);
  equals(p.constructor, MathLib.permutation, 'Testing .constructor');
});


test('type', 1, function () {
  var p = MathLib.permutation([[0, 1], [2, 3]]);
  equals(p.type, 'permutation', 'Testing .type');
});
module('Point');
test('init', 1, function () {
  var point = MathLib.point([3, 2, 1]);
  equals(point.dim, 2, 'Testing the dimension');
});

test('.isEqual', 3, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 2]),
      point3 = MathLib.point([1, 1, 1]),
      point4 = MathLib.point([1, 1, 1, 1]);
  equals(point1.isEqual(point2), true, '.isEqual()');
  equals(point1.isEqual(point3), false, '.isEqual()');
  equals(point3.isEqual(point4), false, ".isEqual()");
});

test('.isFinite', 2, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 0]);
  equals(point1.isFinite(), true, '.isFinite()');
  equals(point2.isFinite(), false, '.isFinite()');
});

test('.isInside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equals(p1.isInside(c), true, '.isInside()');
  equals(p2.isInside(c), false, '.isInside()');
  equals(p3.isInside(c), false, '.isInside()');
});

test('.isOn()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equals(p1.isOn(c), false, '.isOn()');
  equals(p2.isOn(c), true, '.isOn()');
  equals(p3.isOn(c), false, '.isOn()');
});

test('.isOutside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equals(p1.isOutside(c), false, '.isOutside()');
  equals(p2.isOutside(c), false, '.isOutside()');
  equals(p3.isOutside(c), true, '.isOutside()');
});

test(".map()", 2, function () {
  var p = MathLib.point([1, 2, 3]),
      q = MathLib.point([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'point', ".type should be point");
});


test('.reflectAt()', 1, function () {
  var point1 = MathLib.point([0, 0, 1]),
      point2 = MathLib.point([1, 2, 1]),
      point3 = MathLib.point([2, 4, 1]);
  deepEqual(point1.reflectAt(point2), point3, '.reflectAt()');
});

// TODO: implement
// test('.toContentMathML', 2, function () {
//   var point = MathLib.point([3, 2, 1]);
//   equals(point.toContentMathML(), '', '.toContentMathML()');
//   equals(point.toContentMathML(true), '', '.toContentMathML()');
// });

test('.toLaTeX', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equals(point.toLaTeX(), '\\begin{pmatrix}\n\t3\\\\\n\t2\n\\end{pmatrix}', '.toLaTeX()');
  equals(point.toLaTeX(true), '\\begin{pmatrix}\n\t3\\\\\n\t2\\\\\n\t1\n\\end{pmatrix}', '.toLaTeX()');
});

test('.toMathML', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equals(point.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
  equals(point.toMathML(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathML()');
});

test('.toString', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equals(point.toString(), '(3, 2)', '.toString()');
  equals(point.toString(true), '(3, 2, 1)', '.toString()');
});



test('constructor', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equals(p.constructor, MathLib.point, 'Testing .constructor');
});

test('type', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equals(p.type, 'point', 'Testing .type');
});
module("Polynomial");
test("init", 2, function () {
  var p = MathLib.polynomial([1, 2, 3, 4]),
      p1 = MathLib.polynomial([1, -4, MathLib.complex([2, 3])]);
  deepEqual(p, [1, 2, 3, 4], ".coef");
  deepEqual(p1[2], MathLib.complex([2, 3]), ".coef");
});


test("properties", 2, function () {
  var p = MathLib.polynomial(3);
  equals(p.deg, 3, "testing if .degree is right");
  deepEqual(p, [0, 0, 0, 1], ".coef");
});


test(".differentiate()", 3, function () {
  var p = MathLib.polynomial(3);
  deepEqual(p.differentiate(), [0, 0, 3], ".differentiate()");
  deepEqual(p.differentiate(2), [0, 6], ".differentiate(2)");
  deepEqual(p.differentiate(4), [0], ".differentiate(4)");
});


test(".integrate()", 2, function () {
  var p = MathLib.polynomial([0, 0, 0, 1]);
  deepEqual(p.integrate(), [0, 0, 0, 0, 0.25], ".integrate()");
  deepEqual(p.integrate(2), [0, 0, 0, 0, 0,  0.05], ".integrate(2)");
});

test(".isEqual()", 1, function () {
  var c = MathLib.complex([0, 0]),
      p = MathLib.polynomial(3),
      q = MathLib.polynomial([c, 0, 0, 1]);
  equals(q.isEqual(p), true, ".times(polynomial)");
});


test(".map()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'polynomial', ".type should be polynomial");
});


test(".mod()", 1, function () {
  var cp = MathLib.complex([5, 6]),
      cq = MathLib.complex([2, 0]),
      p = MathLib.polynomial([3, cp, -2, 0, 4, 5]),
      q = MathLib.polynomial([0, cq, 1, 0, 1, 2]);
  equals(p.mod(3).isEqual(q), true, ".mod()");
});


test(".plus()", 4, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]);
  deepEqual(p1.plus(12), [13, 2, 3], ".plus(integer)");
  deepEqual(p1.plus(12, true), [13, 14, 15], ".plus(integer, true)");
  deepEqual(p.plus(p1), [1, 2, 3, 1], ".plus(polynomial)");
  deepEqual(p1.plus(p), [1, 2, 3, 1], ".plus(polynomial)");
});


test(".times()", 3, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]);
  deepEqual(p1.times(5), [5, 10, 15], ".times(integer)");
  deepEqual(p.times(p1), [0, 0, 0, 1, 2, 3], ".times(polynomial)");
  deepEqual(p1.times(p), [0, 0, 0, 1, 2, 3], ".times(polynomial)");
});

test(".toContentMathML()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toContentMathML(), '<apply><plus/><cn>1</cn><apply><times/><cn>2</cn><ci>x</ci></apply><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply></apply>', ".toContentMathML()");
  deepEqual(q.toContentMathML(), '<apply><plus/><cn>-1</cn><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply></apply>', ".toContentMathML()");
});


test(".toLaTeX()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toLaTeX(), '1+2x+3x^{2}', ".toLaTeX()");
  deepEqual(q.toLaTeX(), '-1+1x^{2}', ".toLaTeX()");
});


test(".toMathML()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toMathML(), '<mrow><mn>1</mn><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup></mrow>', ".toMathML()");
  deepEqual(q.toMathML(), '<mrow><mo>-</mo><mn>1</mn><mo>+</mo><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup></mrow>', ".toMathML()");
});


test(".toString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toString(), '1+2*x+3*x^2', ".toString()");
  deepEqual(q.toString(), '-1+1*x^2', ".toString()");
});


test(".valueAt()", 6, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]),
      p2 = MathLib.polynomial([1, -4, MathLib.complex([4, -1])]),
      m = MathLib.matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
      charPoly = MathLib.polynomial([4, -1, -4, 1]);
  equals(p.valueAt(4), 64, ".valueAt()");
  equals(p1.valueAt(2), 17, ".valueAt()");

  deepEqual(p1.valueAt(MathLib.complex([2, 3])).z, [-10, 42], ".valueAt()");
  deepEqual(p2.valueAt(2).z, [9, -4], ".valueAt()");
  deepEqual(p2.valueAt(MathLib.complex([2, 3])).z, [-15, 41], ".valueAt()");

  equals(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});



test('constructor', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equals(p.constructor, MathLib.polynomial, 'Testing .constructor');
});

test('one', 1, function () {
  var p = MathLib.polynomial.one;
  deepEqual(p, MathLib.polynomial([1]), 'Testing .one');
});

test('type', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equals(p.type, 'polynomial', 'Testing .type');
});

test('zero', 1, function () {
  var p = MathLib.polynomial.zero;
  deepEqual(p, MathLib.polynomial([0]), 'Testing .zero');
});
module('Set');
test('init', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.card,     5,     'Testing the cardinality');
  equals(s.multiset, false, 'Testing .multiset');
  equals(m.card,     7,     'Testing the cardinality');
  equals(m.multiset, true,  'Testing .multiset');
});


test('.and()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.and(m),  [1, 3], 'Testing .and() (set)');
});


test('.arithMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.arithMean(),  26 / 5, 'Testing .arithMean() (set)');
  equals(m.arithMean(),  31 / 7, 'Testing .arithMean() (multiset)');
});

test('.compare()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]),
      n = MathLib.set([1, 2, 3, 4, 5]);
  deepEqual(s.compare(s),  0, '.compare()');
  deepEqual(s.compare(m),  -1, '.compare()');
  deepEqual(m.compare(n),  -1, '.compare()');
});

test('.geoMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.geoMean(),  Math.pow(1728, 1 / 5), 'Testing .geoMean() (set)');
  equals(m.geoMean(),  Math.pow(10368, 1 / 7), 'Testing .geoMean() (multiset)');
});


test('.harmonicMean()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.harmonicMean(),  3.7894736842105265, 'Testing .geoMean() (set)');
  equals(m.harmonicMean(),  3.2516129032258068, 'Testing .geoMean() (multiset)');
});


test('.insert()', 8, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);

  deepEqual(s.insert(1), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, front)');
  deepEqual(s.insert(3), [1, 2, 3, 4, 8, 9], 'Testing .locate() (set, existing)');
  deepEqual(s.insert(5), [1, 2, 3, 4, 5, 8, 9], 'Testing .locate() (set, not existing)');
  deepEqual(s.insert(10), [1, 2, 3, 4, 5, 8, 9, 10], 'Testing .locate() (set, back)');

  deepEqual(m.insert(1), [1, 2, 2, 3, 3, 4, 8, 9], 'Testing .locate() (multiset, front)');
  deepEqual(m.insert(3), [1, 2, 2, 3, 3, 3, 4, 8, 9], 'Testing .locate() (multiset, existing)');
  deepEqual(m.insert(5), [1, 2, 2, 3, 3, 3, 4, 5, 8, 9], 'Testing .locate() (multiset, not existing)');
  deepEqual(m.insert(10), [1, 2, 2, 3, 3, 3, 4, 5, 8, 9, 10], 'Testing .locate() (multiset, back)');
});


test('.isEmpty()', 3, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      n = MathLib.set(),
      o = MathLib.set([]);
  equals(m.isEmpty(), false, 'Testing .min()');
  equals(n.isEmpty(), true, 'Testing .min(3)');
  equals(o.isEmpty(), true, 'Testing .min(3)');
});


test('.isEqual()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]),
      n = MathLib.set([1, 2, MathLib.complex([3, 0]), 4]);
  deepEqual(s.isEqual(s),  true, '.isEqual()');
  deepEqual(s.isEqual(m),  false, '.isEqual()');
  deepEqual(s.isEqual(n),  false, '.isEqual()');
});


test('.isSubsetOf()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 8, 2]),
      n = MathLib.set([5, 8, 2]);

  equals(m.isSubsetOf(s),  true, 'Testing .isSubsetOf()');
  equals(n.isSubsetOf(s),  false, 'Testing .isSubsetOf()');
});


test('.locate()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  equals(s.locate(1), 0, 'Testing .locate()');
  equals(s.locate(3), 1, 'Testing .locate()');
  equals(s.locate(5), 3, 'Testing .locate()');
  equals(s.locate(10), 5, 'Testing .locate()');
});


test(".map()", 2, function () {
  var p = MathLib.set([1, 2, 3]),
      q = MathLib.set([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equals(res.type, 'set', ".type should be set");
});


test('.max()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.max(),  9, 'Testing .max() (set)');
  equals(s.max(3), 4, 'Testing .max(3) (set)');
  equals(m.max(),  9, 'Testing .max() (multiset)');
  equals(m.max(3), 4, 'Testing .max(3) (multiset)');
});


test('.min()', 4, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.min(),  2, 'Testing .min() (set)');
  equals(s.min(3), 4, 'Testing .min(3) (set)');
  equals(m.min(),  2, 'Testing .min() (multiset)');
  equals(m.min(3), 3, 'Testing .min(3) (multiset)');
});


test('.or()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.or(m),  [1, 2, 3, 4, 5, 7], 'Testing .or() (set)');
});


test('.plus()', 3, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 2, 3, 4, 5, 6]);
  equals(s.plus(), 10, 'Testing .plus() (set)');
  deepEqual(s.plus(2),  [3, 4, 5, 6], 'Testing .plus(int) (set)');
  deepEqual(s.plus(m),  [2, 3, 4, 5, 6, 7, 8, 9, 10], 'Testing .plus(set) (set)');
});

test('.powerset()', 1, function () {
  var s = MathLib.set,
      m = MathLib.set([1, 2, 3]),
      n = MathLib.set([s(), s([1]), s([2]), s([3]), s([1, 2]), s([1, 3]), s([2, 3]), s([1, 2, 3])]);
  deepEqual(m.powerset(),  n, '.powerset()');
});


test('.remove()', 1, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]);
  deepEqual(s.remove(3), [2, 4, 8, 9], 'Testing .toArray()');
});


test('.times()', 2, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equals(s.times(), 24, 'Testing .times() (set)');
  deepEqual(s.times(2),  [2, 4, 6, 8], 'Testing .times(int) (set)');
});


test('.toArray()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      n = MathLib.set();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray() (set)');
  deepEqual(m.toArray(), [2, 2, 3, 3, 4, 8, 9], 'Testing .toArray() (multiset)');
  deepEqual(n.toArray(), [], 'Testing .toArray() (empty set)');
});


test('.toContentMathML()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equals(s.toContentMathML(),  '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (set)');
  equals(m.toContentMathML(),  '<set><cn>2</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathML() (multiset)');
  equals(e.toContentMathML(),  '<emptyset/>', 'Testing .toContentMathML() (empty set)');
});


test('.toLaTeX()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equals(s.toLaTeX(),  '\\{2, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (set)');
  equals(m.toLaTeX(),  '\\{2, 2, 3, 3, 4, 8, 9\\}', 'Testing .toLaTeX() (multiset)');
  equals(e.toLaTeX(),  '\\emptyset', 'Testing .toLaTeX() (empty set)');
});


test('.toMathML()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      e = MathLib.set();
  equals(s.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (set)');
  equals(m.toMathML(),  '<mrow><mo>{</mo><mn>2</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>8</mn><mo>,</mo><mn>9</mn><mo>}</mo></mrow>', 'Testing .toMathML() (multiset)');
  equals(e.toMathML(),  '<mi>&#x2205;</mi>', 'Testing .toMathML() (empty set)');
});


test('.toMultiset()', 2, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      m = s.toMultiset();
  deepEqual(m.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equals(m.multiset, true, 'Testing .multiset');
});


test('.toSet()', 2, function () {
  var m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true),
      s = m.toSet();
  deepEqual(s.toArray(), [2, 3, 4, 8, 9], 'Testing .toArray()');
  equals(s.multiset, false, 'Testing .multiset');
});


test('.toString()', 3, function () {
  var s = MathLib.set([3, 3, 4, 9, 2, 8, 2]),
      e = MathLib.set(),
      m = MathLib.set([3, 3, 4, 9, 2, 8, 2], true);
  equals(s.toString(),  '(2, 3, 4, 8, 9)', 'Testing .toString() (set)');
  equals(e.toString(),  '∅', 'Testing .toString() (empty set)');
  equals(m.toString(),  '(2, 2, 3, 3, 4, 8, 9)', 'Testing .toString() (multiset)');
});


test('.without()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.without(m),  [2, 4], 'Testing .without() (set)');
});


test('.xor()', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]),
      m = MathLib.set([1, 3, 5, 7]);
  deepEqual(s.xor(m),  [2, 4, 5, 7], 'Testing .xor() (set)');
});

test('fromTo()', 1, function () {
  deepEqual(MathLib.set.fromTo(1, 5, 2),  [1, 3, 5], 'Testing MathLib.set.fromTo()');
});

test('constructor', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equals(s.constructor, MathLib.set, 'Testing .constructor');
});

test('type', 1, function () {
  var s = MathLib.set([1, 2, 3, 4]);
  equals(s.type, 'set', 'Testing .type');
});

