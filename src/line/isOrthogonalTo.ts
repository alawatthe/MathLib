// ### Line.prototype.isOrthogonalTo()
// Determines if two lines are orthogonal.
//
// *@param {line}*  
// *@returns {boolean}*
isOrthogonalTo(l) {
  return MathLib.isEqual(
    new MathLib.Point([0,0,1]).crossRatio(
      this.meet(new MathLib.Line([0,0,1])),
      l.meet(new MathLib.Line([0,0,1])), 
      MathLib.Point.I,
      MathLib.Point.J
    ), -1);
}