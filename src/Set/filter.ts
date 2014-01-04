/**
 * Works like the Array.prototype.filter function
 *
 * @return {Set}
 */
filter(...args : any[]) : Set {
	return new MathLib.Set(Array.prototype.filter.apply(this, args));
}