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