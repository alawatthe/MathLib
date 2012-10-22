// ### Set.prototype.splice()
// Works like the Array.prototype.splice function
//
// *@returns {set}*
splice() {
  return Array.prototype.splice.apply(this, arguments);
}