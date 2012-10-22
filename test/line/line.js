module('Line');
test('init', 4, function () {
  var line = new MathLib.Line([3, 2, 1]);
  equal(line.dim, 2, 'Testing the dimension');
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


test(".map()", 2, function () {
  var p = new MathLib.Line([1, 2, 3]),
      q = new MathLib.Line([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'line', ".type should be line");
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
