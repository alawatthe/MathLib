// ### Set.prototype.slice()
// Works like the Array.prototype.slice function
//
// *@returns {array}*
slice(...args : any[]) : any {
  return Array.prototype.slice.apply(this, args);
}