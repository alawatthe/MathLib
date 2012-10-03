// ### Line.prototype.meet()
// Calculates the meet off two points
//
// *@param {line}*  
// *@returns {point}*
MathLib.extendPrototype('line', 'meet', function (l) {
  return MathLib.point([this[1]*l[2]-this[2]*l[1], l[0]*this[2]-this[0]*l[2], this[0]*l[1]-this[1]*l[0]]);
});