test('.toMathMLString()', 1, function () {
  var r = new MathLib.Rational(2, 3);
  equal(r.toMathMLString(), '<mfrac><mn>2</mn><mn>3</mn></mfrac>', '.toMathMLString()');
});