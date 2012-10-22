// ### Set.prototype.filter()
// Works like the Array.prototype.filter function
//
// *@returns {set}*
filter() {
  return new MathLib.Set(Array.prototype.filter.apply(this, arguments));
}