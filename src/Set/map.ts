/**
 * Works like the Array.prototype.map function
 *
 * @param {function} The mapping function  
 * @return {Set}
 */
map(...args : any[]) : any {
	return new MathLib.Set(Array.prototype.map.apply(this, args));
}