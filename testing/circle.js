module("Circle");
test("init", 2, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(circle.radius, 2, "Testing the radius");
  deepEqual(circle.center, p, "Testing the center");
});


test('area', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(MathLib.isEqual(circle.area(), 4 * MathLib.pi), true, ".area()");
});


test('circumference', 1, function () {
  var p = MathLib.point(1, 2),
      circle = MathLib.circle(p, 2);
  equals(MathLib.isEqual(circle.circumference(), 4 * MathLib.pi), true, ".circumference()");
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

  equals(c1.isEqual(c2), false, ".isEqual()");
  equals(c1.isEqual(c3), true, ".isEqual()");
});


test(".reflectAt()", 2, function () {
  var p = MathLib.point(1, 2),
      q = MathLib.point(3, 7),
      circle = MathLib.circle(p, 2),
      newcircle = circle.reflectAt(q);

  equals(newcircle.radius, 2, "Checking the radius.");
  deepEqual(newcircle.center, MathLib.point(5, 12), "Checking the center.");
});



test('constructor', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equals(c.constructor, MathLib.circle, 'Testing .constructor');
});


test('type', 1, function () {
  var c = MathLib.circle(MathLib.point([2, 4, 2]), 2);
  equals(c.type, 'circle', 'Testing .type');
});
