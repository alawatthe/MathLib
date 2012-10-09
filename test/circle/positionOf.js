test(".positionOf()", 3, function () {
  var center = MathLib.point(1, 2),
      circle = MathLib.circle(center, 2),
      on = MathLib.point(1, 4),
      out = MathLib.point(2, 4),
      inside = MathLib.point(2, 3);

  equal(circle.positionOf(on), 'on', 'Point on the circle');
  equal(circle.positionOf(out), 'out', 'Point outside the circle');
  equal(circle.positionOf(inside), 'in', 'Point inside the circle');
});