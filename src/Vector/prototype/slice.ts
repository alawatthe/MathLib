/**
 * Works like the Array.prototype.slice function
 *
 * @return {array}
 */
slice(...args : any[]) : any[] {
	return Array.prototype.slice.apply(this, args);
}