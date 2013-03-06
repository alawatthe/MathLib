// ### [Vector.prototype.forEach()](http://mathlib.de/en/docs/vector/forEach)
// Works like Array.prototype.forEach.
//
forEach(f : (value : any, index : number, vector : Vector ) => void) : void {
	Array.prototype.forEach.call(this, f);
}