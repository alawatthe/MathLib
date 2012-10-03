// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isParallelTo', function (l) {
  return this.every(function (x, i) {
    return MathLib.isEqual(x, l[i]) || i === l.length - 1;
  });
});