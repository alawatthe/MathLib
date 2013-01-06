// ### Set.prototype.every()
// Works like the Array.prototype.every function
//  
// *@returns {boolean}*
every(...args : any[]) : bool {
  return Array.prototype.every.apply(this, args);
}