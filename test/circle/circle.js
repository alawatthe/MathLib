module("Circle");
test("init", 2, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equal(circle.radius, 2, "Testing the radius");
  deepEqual(circle.center, p, "Testing the center");
});



// Properties
test('.constructor', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equal(c.constructor, MathLib.circle, 'Testing .constructor');
});


test('.type', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equal(c.type, 'circle', 'Testing .type');
});



// Methods
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


test('.circumference()', 5, function () {
  var p = MathLib.point(1, 2),
      c1 = MathLib.circle(p, NaN),
      c2 = MathLib.circle(p, +0),
      c3 = MathLib.circle(p, -0),
      c4 = MathLib.circle(p, Infinity),
      c5 = MathLib.circle(p, 2);

  // Spec. 1: c.circumference() = NaN if r = NaN
  equal(MathLib.isNaN(c1.circumference()), true, 'Spec. 1: c.circumference() = NaN if r = NaN');

  // Spec. 2: c.circumference() = +0 if r = +0
  equal(MathLib.isPosZero(c2.circumference()), true, 'Spec. 2: c.circumference() = +0 if r = +0');

  // Spec. 3: c.circumference() = -0 if r = -0
  equal(MathLib.isNegZero(c3.circumference()), true, 'Spec. 3: c.circumference() = -0 if r = -0');

  // Spec. 4: c.circumference() = &infin; if r = &infin;
  equal(c4.circumference(), Infinity, 'Spec. 4: c.circumference() = &infin; if r = &infin;');

  // Spec. 5: otherwise c.circumference() = 2 &pi; r
  equal(c5.circumference(), 4 * MathLib.pi, 'Spec. 5: otherwise c.circumference() = 2 &pi; r');
});


test(".isContaining()", 3, function () {
  var p = MathLib.point(1, 2),
      inside = MathLib.point(2, 3),
      on = MathLib.point(1, 4),
      outside = MathLib.point(2, 4),
      circle = MathLib.circle(p, 2);

  ok(circle.isContaining(inside), "Point inside the circle");
  ok(!circle.isContaining(on), "Point on the circle");
  ok(!circle.isContaining(outside), "Point outside the circle");
});


test('.isEqual()', 2, function () {
  var c1 = MathLib.circle(MathLib.point(1, 2), 2),
      c2 = MathLib.circle(MathLib.point(1, 2), 3),
      c3 = MathLib.circle(MathLib.point([2, 4, 2]), 2);

  equal(c1.isEqual(c2), false, ".isEqual()");
  equal(c1.isEqual(c3), true, ".isEqual()");
});


test(".reflectAt()", 2, function () {
  var p = MathLib.point(1, 2),
      q = MathLib.point(3, 7),
      circle = MathLib.circle(p, 2),
      newcircle = circle.reflectAt(q);

  equal(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, MathLib.point(5, 12), "Checking the center.");
});

test('.toLaTeX()', 1, function () {
  var p = MathLib.point(1, 2),
      c = MathLib.circle(p, 2);

  equal(c.toLaTeX(), 'B_{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)', 'Spec. 1: ');
});