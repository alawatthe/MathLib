test(".reflectAt()", 2, function () {
  var p = MathLib.point(1, 2),
      q = MathLib.point(3, 7),
      circle = MathLib.circle(p, 2),
      newcircle = circle.reflectAt(q);

  equal(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, MathLib.point(5, 12), "Checking the center.");
});