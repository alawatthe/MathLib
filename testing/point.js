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
