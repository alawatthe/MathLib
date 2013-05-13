// ### [Vector.prototype.reduce()](http://mathlib.de/en/docs/Vector/reduce)
// Works like Array.prototype.reduce.
//
// *@return {any}*
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, args);
}