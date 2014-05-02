/**
 * This function works like the Array.prototype.reduce function.
 *
 * @return {any}
 */
reduce(...args : any[]) {
	return Array.prototype.reduce.apply(this, args);
}