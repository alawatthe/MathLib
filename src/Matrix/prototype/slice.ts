/**
 * This function works like the Array.prototype.slice function.
 *
 * @return {array}
 */
slice(...args : any[]) {
	return Array.prototype.slice.apply(this, args);
}