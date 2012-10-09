test('.area()', 5, function () {
  var p = MathLib.point(1, 2),
      c1 = MathLib.circle(p, NaN),
      c2 = MathLib.circle(p, +0),
      c3 = MathLib.circle(p, -0),
      c4 = MathLib.circle(p, Infinity),
      c5 = MathLib.circle(p, 2);

  // Spec. 1: c.area() = NaN if r = NaN
  equal(MathLib.isNaN(c1.area()), true, 'Spec. 1: c.area() = NaN if r = NaN');

  // Spec. 2: c.area() = +0 if r = +0
  equal(MathLib.isPosZero(c2.area()), true, 'Spec. 2: c.area() = +0 if r = +0');

  // Spec. 3: c.area() = -0 if r = +0
  equal(MathLib.isPosZero(c3.area()), true, 'Spec. 3: c.area() = -0 if r = +0');

  // Spec. 4: c.area() = &infin; if r = &infin;
  equal(c4.area(), Infinity, 'Spec. 4: c.area() = &infin; if r = &infin;');

  // Spec. 5: otherwise c.area() = &pi; r * r
  equal(c5.area(), 4 * MathLib.pi, 'Spec. 5: otherwise c.area() = &pi; * r * r');
});