// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {point}* a The point A  
// *@param {point}* b The point B  
// *@param {point}* c The point C  
// *@param {point}* d The point D  
// *@returns {number}*
MathLib.extendPrototype('point', 'crossRatio', function (a, b, c, d) {
  var x  = this.toArray(),
      m1 = MathLib.matrix([x,a,c]),
      m2 = MathLib.matrix([x,b,d]),
      m3 = MathLib.matrix([x,a,d]),
      m4 = MathLib.matrix([x,b,c]);

  return (m1.det() * m2.det()) / (m3.det() * m4.det());
});