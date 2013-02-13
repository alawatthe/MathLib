test('.toContentMathMLString()', 1, function () {
  var r = new MathLib.Rational(2, 3);
  equal(r.toContentMathMLString(), '<cn type="rational">2<sep/>3</cn>', '.toContentMathMLString()');
});