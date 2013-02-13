test('.toNumber()', 1, function () {
  var r = new MathLib.Rational(1, 2);

  equal(r.toNumber(), 1/2, '.toNumber()');
});