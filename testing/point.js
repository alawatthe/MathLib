module('Point');
test('init', 1, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.dim, 2, 'Testing the dimension');
});



// Properties
test('.constructor', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equal(p.constructor, MathLib.point, 'Testing .constructor');
});


test('.type', 1, function () {
  var p = MathLib.point([3, 2, 1]);
  equal(p.type, 'point', 'Testing .type');
});



// Methods
test('.isEqual()', 3, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 2]),
      point3 = MathLib.point([1, 1, 1]),
      point4 = MathLib.point([1, 1, 1, 1]);
  equal(point1.isEqual(point2), true, '.isEqual()');
  equal(point1.isEqual(point3), false, '.isEqual()');
  equal(point3.isEqual(point4), false, ".isEqual()");
});


test('.isFinite()', 2, function () {
  var point1 = MathLib.point([3, 2, 1]),
      point2 = MathLib.point([6, 4, 0]);
  equal(point1.isFinite(), true, '.isFinite()');
  equal(point2.isFinite(), false, '.isFinite()');
});


test('.isInside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isInside(c), true, '.isInside()');
  equal(p2.isInside(c), false, '.isInside()');
  equal(p3.isInside(c), false, '.isInside()');
});


test('.isOn()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isOn(c), false, '.isOn()');
  equal(p2.isOn(c), true, '.isOn()');
  equal(p3.isOn(c), false, '.isOn()');
});


test('.isOutside()', 3, function () {
  var p1 = MathLib.point([1, 0, 1]),
      p2 = MathLib.point([2, 0, 1]),
      p3 = MathLib.point([3, 0, 1]),
      c = MathLib.circle(MathLib.point([0, 0, 1]), 2);
  equal(p1.isOutside(c), false, '.isOutside()');
  equal(p2.isOutside(c), false, '.isOutside()');
  equal(p3.isOutside(c), true, '.isOutside()');
});


test(".map()", 2, function () {
  var p = MathLib.point([1, 2, 3]),
      q = MathLib.point([2, 4, 6]),
      f = function (x) {
        return 2 * x;
      },
      res = p.map(f);

  deepEqual(res, q, ".map()");
  equal(res.type, 'point', ".type should be point");
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
//   equal(point.toContentMathML(), '', '.toContentMathML()');
//   equal(point.toContentMathML(true), '', '.toContentMathML()');
// });


test('.toLaTeX()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toLaTeX(), '\\begin{pmatrix}3\\\\2\\end{pmatrix}', '.toLaTeX()');
  equal(point.toLaTeX(true), '\\begin{pmatrix}3\\\\2\\\\1\\end{pmatrix}', '.toLaTeX()');
});


test('.toMathMLString()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toMathMLString(), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
  equal(point.toMathMLString(true), '<mrow><mo>(</mo><mtable><mtr><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>2</mn></mtd></mtr><mtr><mtd><mn>1</mn></mtd></mtr></mtable><mo>)</mo></mrow>', '.toMathMLString()');
});


test('.toString()', 2, function () {
  var point = MathLib.point([3, 2, 1]);
  equal(point.toString(), '(3, 2)', '.toString()');
  equal(point.toString(true), '(3, 2, 1)', '.toString()');
});
