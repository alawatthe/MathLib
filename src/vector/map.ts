// ### [Vector.prototype.map()](http://mathlib.de/en/docs/vector/map)
// Works like Array.prototype.map.
//
// *@param {function}*  
// *@returns {Vector}*
map(f : (value : any, index : number, vector : Vector ) => any) : any {
	return new this['constructor'](Array.prototype.map.call(this, f));
}