// ### Set.prototype.indexOf()
// Works like the Array.prototype.indexOf function
//  
// *@returns {number}*
indexOf(...args : any[]) : number {
  return Array.prototype.indexOf.apply(this, args);
}