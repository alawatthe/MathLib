/**
 * Works like Array.prototype.map.
 *
 * @param {function} f The function to be applied to all the values
 * @return {Vector}
 */
map(f : (value : any, index : number, vector : Vector ) => any) : any {
	return new MathLib[this.type.slice(0, 1).toUpperCase() + this.type.slice(1)](Array.prototype.map.call(this, f));
}