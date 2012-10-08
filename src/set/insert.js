// ### Set.prototype.insert()
// Inserts an element into the set.
//
// *@returns {set}* Returns the current set
MathLib.extendPrototype('set', 'insert', function (x) {
  var i = this.locate(x);
  if (this[i] !== x) {
    this.splice(i, 0, x);
  }
  return this;
});