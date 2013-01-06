// ### Set.prototype.toString()
// Returns a string representation of the set
//
// *@returns {string}*
toString() : string {
  if (this.isEmpty()) {
    return '∅';
  }
  return '(' + Array.prototype.join.call(this, ', ') +  ')';
}