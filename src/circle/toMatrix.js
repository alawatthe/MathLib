// ### Circle.prototype.toMatrix()
// Converts the circle to the corresponding matrix.
//
// *@return {matrix}* 
MathLib.extendPrototype('circle', 'toMatrix', function () {
  var x = this.center[0] / this.center[2],
      y = this.center[1] / this.center[2],
      r = this.radius;
  return MathLib.matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x*x + y*y - r*r]]);
});