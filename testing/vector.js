module("Vector");
test("init", 2, function () {
  var vector = MathLib.vector([1, 2, 3]);
  equal(vector.dim, 3, "Testing the dimension");
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
  equal(v.isEqual(w), true, ".isEqual()");
  equal(v.isEqual(u), false, ".isEqual()");
  equal(u.isEqual(x), false, ".isEqual()");
});


test('.isZero()', 2, function () {
  var v = MathLib.vector([0, 0, 0]),
      w = MathLib.vector([0, 0, 1]);
  equal(v.isZero(), true, ".isZero()");
  equal(w.isZero(), false, ".isZero()");
});


test(".map()", 2, function () {
  var p = MathLib.vector([1, 2, 3]),
      q = MathLib.vector([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'vector', ".type should be vector");
});


test('.scalarproduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.scalarproduct(w), 44, ".scalarproduct()");
});


test('.size()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.size(), Math.sqrt(14), ".size()");
});

test('.times()', 2, function () {
  var v = MathLib.vector([1, 2, 3]),
      m = MathLib.matrix([[1,2,3],[4,5,6],[7,8,9]]);
  deepEqual(v.times(3), MathLib.vector([3, 6, 9]), ".times(number)");
  deepEqual(v.times(m), MathLib.vector([30, 36, 42]), ".times(matrix)");
});

test('.toContentMathML()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toContentMathML(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', ".toContentMathML()");
});


test('.toLaTeX()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});


test('.toMathML()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toMathML(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', ".toMathML()");
});


test('.toString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toString(), '(1, 2, 3)', ".toString()");
});


test('.vectorproduct()', 1, function () {
  var v = MathLib.vector([1, 2, 3]),
      w = MathLib.vector([-7, 8, 9]);
  deepEqual(v.vectorproduct(w), [-6, -30, 22], ".vectorProduct()");
});




test('constructor', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.constructor, MathLib.vector, 'Testing .constructor');
});

test('type', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.type, 'vector', 'Testing .type');
});


test('zero', 1, function () {
  var v = MathLib.vector.zero(3);
  equal(v.isZero(), true, 'testing zero vector');
});
