module("Polynomial");
test("init", 2, function () {
  var p = MathLib.polynomial([1, 2, 3, 4]),
      p1 = MathLib.polynomial([1, -4, MathLib.complex([2, 3])]);
  deepEqual(p, [1, 2, 3, 4], ".coef");
  deepEqual(p1[2], MathLib.complex([2, 3]), ".coef");
});



// Properties
test(".coef", 1, function () {
  var p = MathLib.polynomial(3);
  deepEqual(p, [0, 0, 0, 1], ".coef");
});


test('.constructor', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equal(p.constructor, MathLib.polynomial, 'Testing .constructor');
});


test(".deg", 1, function () {
  var p = MathLib.polynomial(3);
  equal(p.deg, 3, "testing if .degree is right");
});


test('.type', 1, function () {
  var p = MathLib.polynomial([1, 2, 3]);
  equal(p.type, 'polynomial', 'Testing .type');
});



// Methods
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
  equal(q.isEqual(p), true, ".times(polynomial)");
});


test(".map()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'polynomial', ".type should be polynomial");
});


test(".mod()", 1, function () {
  var cp = MathLib.complex([5, 6]),
      cq = MathLib.complex([2, 0]),
      p = MathLib.polynomial([3, cp, -2, 0, 4, 5]),
      q = MathLib.polynomial([0, cq, 1, 0, 1, 2]);
  equal(p.mod(3).isEqual(q), true, ".mod()");
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

test(".toContentMathMLString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', ".toContentMathMLString()");
  deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', ".toContentMathMLString()");
});



test(".toFunctn()", 3, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      f = p.toFunctn(),
      sinf = MathLib.sin(f);

  equal(f.type, 'functn', '.type should be functn');
  equal(sinf.toString(), 'sin(3*x^2+2*x+1)', 'composition with other functions');
  equal(f(42), 5377, 'fuctn evaluation');
});


test(".toLaTeX()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toLaTeX(), '3*x^{2}+2x+1', ".toLaTeX()");
  deepEqual(q.toLaTeX(), '1*x^{2}-1', ".toLaTeX()");
});


test(".toMathMLString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toMathMLString(), '<mrow><mo>+</mo><mn>3</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mo>&#x2062;</mo><mi>x</mi><mo>+</mo><mn>1</mn></mrow>', ".toMathMLString()");
  deepEqual(q.toMathMLString(), '<mrow><mo>+</mo><mn>1</mn><mo>&#x2062;</mo><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>1</mn></mrow>', ".toMathMLString()");
});


test(".toString()", 2, function () {
  var p = MathLib.polynomial([1, 2, 3]),
      q = MathLib.polynomial([-1, 0, 1]);
  deepEqual(p.toString(), '3*x^2+2*x+1', ".toString()");
  deepEqual(q.toString(), '1*x^2-1', ".toString()");
});


test(".valueAt()", 6, function () {
  var p = MathLib.polynomial(3),
      p1 = MathLib.polynomial([1, 2, 3]),
      p2 = MathLib.polynomial([1, -4, MathLib.complex([4, -1])]),
      m = MathLib.matrix([[1, 0, 1], [2, 2, 1], [4, 2, 1]]),
      charPoly = MathLib.polynomial([4, -1, -4, 1]);
  equal(p.valueAt(4), 64, ".valueAt()");
  equal(p1.valueAt(2), 17, ".valueAt()");

  deepEqual(p1.valueAt(MathLib.complex([2, 3])).z, [-10, 42], ".valueAt()");
  deepEqual(p2.valueAt(2).z, [9, -4], ".valueAt()");
  deepEqual(p2.valueAt(MathLib.complex([2, 3])).z, [-15, 41], ".valueAt()");

  equal(charPoly.valueAt(m).isZero(), true, 'Cayley–Hamilton theorem');
});



// Static methods
test('one()', 1, function () {
  var p = MathLib.polynomial.one;
  deepEqual(p, MathLib.polynomial([1]), 'Testing .one');
});


test('zero()', 1, function () {
  var p = MathLib.polynomial.zero;
  deepEqual(p, MathLib.polynomial([0]), 'Testing .zero');
});
