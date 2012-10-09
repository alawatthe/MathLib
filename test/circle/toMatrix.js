test('.toMatrix()', 1, function () {
  var p = MathLib.point(1, 2),
      c = MathLib.circle(p, 2);

   deepEqual(c.toMatrix(), MathLib.matrix([[1,0,-1],[0,1,-2],[-1,-2,1]]), '');
});