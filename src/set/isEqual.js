// ### Set.prototype.isEqual()
// Determines if the set is equal to an other set.
//
// *@param {set}* The set to compare  
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isEqual', function (x) {
  if (this.card !== x.card) {
    return false;
  }
  else {
    return this.every(function (y, i) {
      return MathLib.isEqual(y, x[i]);
    });
  }
});