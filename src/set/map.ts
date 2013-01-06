// ### Set.prototype.map()
// Works like the Array.prototype.map function
//
// *@param {function}* The mapping function  
// *@returns {set}*
map(...args : any[]) : any {
  return new MathLib.Set(Array.prototype.map.apply(this, args));
}