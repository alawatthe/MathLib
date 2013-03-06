// ### Set.prototype.toArray()
// Converts the set to an array
//
// *@returns {array}*
toArray() : any[] {
	return Array.prototype.slice.call(this);
}