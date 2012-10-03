// ### Set.prototype.toString()
// Returns a string representation of the set
//
// *@returns {string}*
MathLib.extendPrototype('set', 'toString', function () {
  if (this.isEmpty()) {
    return '∅';
  }
  return '(' + this.join(', ') +  ')';
});