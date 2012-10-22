// ### Vector.prototype.toArray()
// Converts the vector to an Array
//
// *@returns {array}*
toArray() {
  return Array.prototype.slice.call(this);
}