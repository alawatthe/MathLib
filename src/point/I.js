// ### Point.I
// The Point I = (-i, 0, 1).
// This is NOT the complex number i.
//
// *@returns {point}*
MathLib.extend('point', 'I', (function () {
  var i = MathLib.complex(0, -1);
  return MathLib.point([i, 0, 1]);
}()));