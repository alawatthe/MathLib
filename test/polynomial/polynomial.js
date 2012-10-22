module("Polynomial");
test("init", 3, function () {
  var p = new MathLib.Polynomial([1, 2, 3, 4]),
      q = new MathLib.Polynomial(3);
      p1 = new MathLib.Polynomial([1, -4, new MathLib.Complex(2, 3)]);
  equal(p[0], 1, "coefficients");
  deepEqual(q[2], 0, "coefficients");
  deepEqual(p1[2], new MathLib.Complex(2, 3), ".coef");
});



// Properties
test('.constructor', 1, function () {
  var p = new MathLib.Polynomial([1, 2, 3]);
  equal(p.constructor, MathLib.Polynomial, 'Testing .constructor');
});


test(".deg", 1, function () {
  var p = new MathLib.Polynomial(3);
  equal(p.deg, 3, "testing if .degree is right");
});


test('.type', 1, function () {
  var p = new MathLib.Polynomial([1, 2, 3]);
  equal(p.type, 'polynomial', 'Testing .type');
});



// Methods
test(".differentiate()", 3, function () {
  var p = new MathLib.Polynomial(3);
  deepEqual(p.differentiate(), new MathLib.Polynomial([0, 0, 3]), ".differentiate()");
  deepEqual(p.differentiate(2), new MathLib.Polynomial([0, 6]), ".differentiate(2)");
  deepEqual(p.differentiate(4), new MathLib.Polynomial([0]), ".differentiate(4)");
});


test(".integrate()", 2, function () {
  var p = new MathLib.Polynomial([0, 0, 0, 1]);
  deepEqual(p.integrate(), new MathLib.Polynomial([0, 0, 0, 0, 0.25]), ".integrate()");
  deepEqual(p.integrate(2), new MathLib.Polynomial([0, 0, 0, 0, 0,  0.05]), ".integrate(2)");
});


test(".isEqual()", 1, function () {
  var c = new MathLib.Complex(0, 0),
      p = new MathLib.Polynomial(3),
      q = new MathLib.Polynomial([c, 0, 0, 1]);
  equal(q.isEqual(p), true, ".times(polynomial)");
});


test(".map()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'polynomial', ".type should be polynomial");
});


test(".mod()", 1, function () {
  var cp = new MathLib.Complex(5, 6),
      cq = new MathLib.Complex(2, 0),
      p = new MathLib.Polynomial([3, cp, -2, 0, 4, 5]),
      q = new MathLib.Polynomial([0, cq, 1, 0, 1, 2]);
  equal(p.mod(3).isEqual(q), true, ".mod()");
});


test(".plus()", 4, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]);
  deepEqual(p1.plus(12), new MathLib.Polynomial([13, 2, 3]), ".plus(integer)");
  deepEqual(p1.plus(12, true), new MathLib.Polynomial([13, 14, 15]), ".plus(integer, true)");
  deepEqual(p.plus(p1), new MathLib.Polynomial([1, 2, 3, 1]), ".plus(polynomial)");
  deepEqual(p1.plus(p), new MathLib.Polynomial([1, 2, 3, 1]), ".plus(polynomial)");
});


test(".times()", 3, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]);
  deepEqual(p1.times(5), new MathLib.Polynomial([5, 10, 15]), ".times(integer)");
  deepEqual(p.times(p1), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), ".times(polynomial)");
  deepEqual(p1.times(p), new MathLib.Polynomial([0, 0, 0, 1, 2, 3]), ".times(polynomial)");
});

test(".toContentMathMLString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', ".toContentMathMLString()");
  deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', ".toContentMathMLString()");
});



test(".toFunctn()", 3, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      f = p.toFunctn(),
      sinf = MathLib.sin(f);

  equal(f.type, 'functn', '.type should be functn');
  equal(sinf.toString(), 'sin(3*x^2+2*x+1)', 'composition with other functions');
  equal(f(42), 5377, 'fuctn evaluation');
});


test(".toLaTeX()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toLaTeX(), '3*x^{2}+2x+1', ".toLaTeX()");
  deepEqual(q.toLaTeX(), '1*x^{2}-1', ".toLaTeX()");
});


test(".toMathMLString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toMathMLString(), '<mrow><mo>+</mo><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', ".toMathMLString()");
  deepEqual(q.toMathMLString(), '<mrow><mo>+</mo><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', ".toMathMLString()");
});


test(".toString()", 2, function () {
  var p = new MathLib.Polynomial([1, 2, 3]),
      q = new MathLib.Polynomial([-1, 0, 1]);
  deepEqual(p.toString(), '3*x^2+2*x+1', ".toString()");
  deepEqual(q.toString(), '1*x^2-1', ".toString()");
});


test(".valueAt()", 6, function () {
  var p = new MathLib.Polynomial(3),
      p1 = new MathLib.Polynomial([1, 2, 3]),
      p2 = new MathLib.Polynomial([1, -4, new MathLib.Complex(4, -1)]),
      m = new MathLib.Matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
      charPoly = new MathLib.Polynomial([4, -1, -4, 1]);
  equal(p.valueAt(4), 64, ".valueAt()");
  equal(p1.valueAt(2), 17, ".valueAt()");

  deepEqual(p1.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-10, 42), ".valueAt()");
  deepEqual(p2.valueAt(2), new MathLib.Complex(9, -4), ".valueAt()");
  deepEqual(p2.valueAt(new MathLib.Complex(2, 3)), new MathLib.Complex(-15, 41), ".valueAt()");

  equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});



// Static methods
test('one()', 1, function () {
  var p = MathLib.Polynomial.one;
  deepEqual(p, new MathLib.Polynomial([1]), 'Testing .one');
});


test('zero()', 1, function () {
  var p = MathLib.Polynomial.zero;
  deepEqual(p, new MathLib.Polynomial([0]), 'Testing .zero');
});
