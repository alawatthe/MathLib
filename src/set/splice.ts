// ### Set.prototype.splice()
// Works like the Array.prototype.splice function
//
// *@returns {set}*
splice(...args : any[]) : any {
  return Array.prototype.splice.apply(this, args);
}