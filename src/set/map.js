// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@returns {set}*
MathLib.extendPrototype('set', 'map', function (f) {
  return MathLib.set(Array.prototype.map.call(this, f));
});