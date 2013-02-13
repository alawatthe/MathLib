test('.isEqual()', 2, function () {
  var r = new MathLib.Rational(1, 2),
			p = new MathLib.Rational(4, 8),
			q = new MathLib.Rational(2, 3);

  equal(r.isEqual(p), true, '.isEqual()');
  equal(r.isEqual(q), false, '.isEqual()');
});