// ### Vector.prototype.size()
// Determines the length of the vector.
// Named size, as length is already used by JavaScript.
//
// *@returns {number}*
size() : number {
  return MathLib.hypot.apply(null, this.toArray());
}