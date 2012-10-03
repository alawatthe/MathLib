// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@param {function}* The filtering function  
// *@returns {set}*
MathLib.extendPrototype('set', 'filter', function (f) {
  return MathLib.set(Array.prototype.filter.call(this, f));
});