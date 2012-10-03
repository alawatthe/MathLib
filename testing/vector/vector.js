module("Vector");
test("init", 2, function () {
  var vector = MathLib.vector([1, 2, 3]);
  equal(vector.length, 3, "Testing the dimension");
  deepEqual(vector, [1, 2, 3], 'checking the entries');
});



// Properties
test('.constructor', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.constructor, MathLib.vector, 'Testing .constructor');
});


test('.type', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.type, 'vector', 'Testing .type');
});



// Methods
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


test('.minus()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.minus(w).isEqual(MathLib.vector([2, -4, -5])), true, ".minus()");
});


test('.neagtive()', 1, function () {
  var v = MathLib.vector([3, 1, 4]);
  equal(v.negative().isEqual(MathLib.vector([-3, -1, -4])), true, ".negative()");
});


test('.normalize()', 1, function () {
  var v = MathLib.vector([2, 3, 6]);
  equal(v.normalize().isEqual(MathLib.vector([2/7, 3/7, 6/7])), true, ".normalize()");
});


test('.outerProduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.outerProduct(w).isEqual(MathLib.matrix([[3, 15, 27], [1, 5, 9], [4, 20, 36]])), true, ".outerProduct()");
});


test('.plus()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.plus(w).isEqual(MathLib.vector([4, 6, 13])), true, ".plus()");
});


test('.scalarProduct()', 1, function () {
  var v = MathLib.vector([3, 1, 4]),
      w = MathLib.vector([1, 5, 9]);
  equal(v.scalarProduct(w), 44, ".scalarProduct()");
});


test('.size()', 1, function () {
  var v = MathLib.vector([1, 2, 2]);
  equal(v.size(), 3, ".size()");
});


test('.times()', 2, function () {
  var v = MathLib.vector([1, 2, 3]),
      m = MathLib.matrix([[1,2,3],[4,5,6],[7,8,9]]);
  deepEqual(v.times(3), MathLib.vector([3, 6, 9]), ".times(number)");
  deepEqual(v.times(m), MathLib.vector([30, 36, 42]), ".times(matrix)");
});


test('.toArray()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(MathLib.type(v.toArray()), 'array', ".toArray()");
});


test('.toContentMathMLString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toContentMathMLString(), '<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>', ".toContentMathML()String");
});


test('.toLaTeX()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toLaTeX(), '\\begin{pmatrix}\n\t1\\\\\n\t2\\\\\n\t3\n\\end{pmatrix}');
});


test('.toMathMLString()', 1, function () {
  var v = MathLib.vector([1, 2, 3]);
  equal(v.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>1</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>3</mn></mtd></mtr></mtable><mo>)</mo></mrow>', ".toMathMLString()");
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



// Static methods
test('zero()', 1, function () {
  var v = MathLib.vector.zero(3);
  equal(v.isZero(), true, 'testing zero vector');
});
