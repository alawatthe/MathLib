// ### Vector.prototype.toString()
// Returns a string representation of the vector
//
// *@returns {string}*
MathLib.extendPrototype('vector', 'toString', function () {
  return '(' + this.reduce(function (old, cur) {
    return old + ', ' + MathLib.toString(cur);
  }) + ')';
});