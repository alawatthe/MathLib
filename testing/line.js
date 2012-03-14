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
