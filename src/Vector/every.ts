// ### [Vector.prototype.every()](http://mathlib.de/en/docs/Vector/every)
// Works like Array.prototype.every.
//
// *@return {boolean}*
every(f : (value : any, index : number, vector : Vector ) => boolean) : boolean {
	return Array.prototype.every.call(this, f);
}