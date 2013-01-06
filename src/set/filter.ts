// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@returns {set}*
filter(...args : any[]) : Set {
  return new MathLib.Set(Array.prototype.filter.apply(this, args));
}