// ### Set.prototype.slice()
// Works like the Array.prototype.slice function
//
// *@returns {array}*
slice() {
  return Array.prototype.slice.apply(this, arguments);
}