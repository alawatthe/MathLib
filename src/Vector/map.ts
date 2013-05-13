// ### [Vector.prototype.map()](http://mathlib.de/en/docs/Vector/map)
// Works like Array.prototype.map.
//
// *@param {function}*  
// *@return {Vector}*
map(f : (value : any, index : number, vector : Vector ) => any) : any {
	return new this['constructor'](Array.prototype.map.call(this, f));
}