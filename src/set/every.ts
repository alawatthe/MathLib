// ### Set.prototype.every()
// Works like the Array.prototype.every function
//  
// *@returns {boolean}*
every() {
  return Array.prototype.every.apply(this, arguments);
}