// ### Matrix.prototype.slice()
// This function works like the Array.prototype.slice function.
//
// *@returns {array}*
slice(...args : any[]) {
	return Array.prototype.slice.apply(this, args);
}