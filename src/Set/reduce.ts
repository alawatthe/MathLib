/**
 * Works like the Array.prototype.reduce function
 *  
 * @return {any}
 */
reduce(...args : any[]) : any {
	return Array.prototype.reduce.apply(this, arguments);
}