// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {point}* a The point A  
// *@param {point}* b The point B  
// *@param {point}* c The point C  
// *@param {point}* d The point D  
// *@returns {number}*
crossRatio(m : Point, n : Point, o : Point, p : Point) : number {
  var x  = this.toArray(),
		  a = m.toArray(),
		  b = n.toArray(),
		  c = o.toArray(),
		  d = p.toArray(),
		  m1 = new MathLib.Matrix([x, a, c]),
		  m2 = new MathLib.Matrix([x, b, d]),
		  m3 = new MathLib.Matrix([x, a, d]),
		  m4 = new MathLib.Matrix([x, b, c]);

  return (m1.det() * m2.det()) / (m3.det() * m4.det());
}