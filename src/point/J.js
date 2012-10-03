// ### Point.J
// The Point J = (i, 0, 1).
//
// *@returns {point}*
MathLib.extend('point', 'J', (function () {
  var i = MathLib.complex(0, 1);
  return MathLib.point([i, 0, 1]);
}()));