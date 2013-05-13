// ### [Vector.prototype.toArray()](http://mathlib.de/en/docs/Vector/toArray)
// Converts the vector to an array.
//
// *@return {array}*
toArray() : any[] {
	return Array.prototype.slice.call(this);
}