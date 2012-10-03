// ### Line.prototype.isEqual()
// Determines if two lines are equal.
//
// *@param {line}*  
// *@returns {boolean}*
MathLib.extendPrototype('line', 'isEqual', function (q) {
  var p = this.normalize();
      q = q.normalize();

  if(this.dim !== q.dim) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
});