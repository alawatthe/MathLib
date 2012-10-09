test('.isEqual()', 3, function () {
  var c1 = MathLib.circle(MathLib.point(1, 2), 2),
      c2 = MathLib.circle(MathLib.point(1, 2), 3),
      c3 = MathLib.circle(MathLib.point([2, 4, 2]), 2),
      c4 = MathLib.circle(MathLib.point(2,3), 2);

  equal(c1.isEqual(c3), true, ".isEqual()");
  equal(c1.isEqual(c2), false, ".isEqual() different radius");
  equal(c1.isEqual(c4), false, ".isEqual() different center");
});