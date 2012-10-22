// ### Vector.prototype.toString()
// Returns a string representation of the vector
//
// *@returns {string}*
toString() {
  return '(' + this.reduce(function (old, cur) {
    return old + ', ' + MathLib.toString(cur);
  }) + ')';
}