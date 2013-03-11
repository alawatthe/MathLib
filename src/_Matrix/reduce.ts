// ### Matrix.prototype.reduce()
// This function works like the Array.prototype.reduce function.
//
// *@returns {any}*
reduce(...args : any[]) {
	return Array.prototype.reduce.apply(this, args);
}