test('.toLaTeX()', 1, function () {
  var r = new MathLib.Rational(2, 3);
  equal(r.toLaTeX(), '\\frac{2}{3}', '.toLaTeX()');
});