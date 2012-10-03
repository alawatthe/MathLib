// ### Set.prototype.isSubsetOf()
// Determines if the set is a subset of an other set.
//
// *@param {set}* The potential superset  
// *@returns {boolean}*
MathLib.extendPrototype('set', 'isSubsetOf', function (a) {
  return this.every(function (x) {
    return a.indexOf(x) !== -1;
  });
});