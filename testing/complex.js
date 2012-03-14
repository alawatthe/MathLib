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


