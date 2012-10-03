// ### Point.prototype.toString()
// Returns string representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
MathLib.extendPrototype('point', 'toString', function (opt) {
  var p = opt ? this : this.normalize().slice(0, -1);

  return '(' + p.reduce(function (old, cur) {
    return old + ', ' + MathLib.toString(cur);
  }) + ')';
});