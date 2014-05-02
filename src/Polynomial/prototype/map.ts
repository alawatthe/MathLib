/**
 * Works like the Array.prototype.map function
 *
 * @param {function} f The function to be applied to all the values
 * @return {Polynomial}
 */
map(f) : Polynomial {
	return new MathLib.Polynomial(Array.prototype.map.call(this, f));
}