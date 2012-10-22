// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@returns {set}*
map(f) {
  return new MathLib.Set(Array.prototype.map.call(this, f));
}