// ### Set.prototype.reduce()
// Works like the Array.prototype.reduce function
//  
// *@returns {any}*
reduce() {
  return Array.prototype.reduce.apply(this, arguments);
}