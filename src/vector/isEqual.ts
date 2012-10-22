// ### Vector.prototype.isEqual()
// Determines if two vectors are equal
//
// *@param {vector}* v The vector to compare  
// *@returns {boolean}*
isEqual(v) {
  if(this.length !== v.length) {
    return false;
  }

  return this.every(function (x, i) {
    return MathLib.isEqual(x, v[i]);
  });
}