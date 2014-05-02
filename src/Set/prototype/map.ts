/**
 * Works like the Array.prototype.map function
 *
 * @param {function} callback - The mapping function
 * @param {object} [thisArg] - The value to use as this when executing the callback.
 * @return {Set}
 */
map(callback, thisArg?) : any {
	return new MathLib.Set(Array.prototype.map.call(this, callback, thisArg));
}