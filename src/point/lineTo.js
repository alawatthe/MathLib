// ### Point.prototype.lineTo()
// Calculates a line connecting two points
//
// *@param {point}* The point to calculate the line to
// *@returns {line}*
MathLib.extendPrototype('point', 'lineTo', function (q) {
  if (this.dim === 2 && q.dim === 2) {
    return MathLib.line(this, q);
  }
});