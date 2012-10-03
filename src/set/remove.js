// ### Set.prototype.remove()
// Removes a element from a set
//
// *@returns {set}*
MathLib.extendPrototype('set', 'remove', function (a) {
  var i = this.indexOf(a);
  if (i !== -1) {
    this.splice(i, 1);
  }
  return this;
});