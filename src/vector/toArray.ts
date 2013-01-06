// ### Vector.prototype.toArray()
// Converts the vector to an Array
//
// *@returns {array}*
toArray() : any[] {
  return Array.prototype.slice.call(this);
}