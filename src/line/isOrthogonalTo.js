// ### Line.prototype.isOrthogonalTo()
// Determines if two lines are orthogonal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isOrthogonalTo', function (l) {
  return MathLib.isEqual(
    MathLib.point([0,0,1]).crossRatio(
      this.meet(MathLib.line([0,0,1])),
      l.meet(MathLib.line([0,0,1])), 
      MathLib.point.I,
      MathLib.point.J
    ), -1);
});