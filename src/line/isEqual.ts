// ### Line.prototype.isEqual()
// Determines if two lines are equal.
//
// *@param {line}*  
// *@returns {boolean}*
isEqual(q : Line) : bool {
  var p = this.normalize();
      q = q.normalize();

  if(this.length !== q.length) {
    return false;
  }

  return p.every(function (x, i) {
    return MathLib.isEqual(x, q[i]);
  });
}