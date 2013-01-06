// ### Point.prototype.lineTo()
// Calculates a line connecting two points
//
// *@param {point}* The point to calculate the line to
// *@returns {line}*
lineTo(q : Point) : Line {
  if (this.dim === 2 && q.dim === 2) {
    return new MathLib.Line(this, q);
  }
}