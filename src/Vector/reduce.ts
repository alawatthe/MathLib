/**
 * Works like Array.prototype.reduce.
 *
 * @return {any}
 */
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, args);
}