/**
 * Works like the Array.prototype.every function
 *  
 * @return {boolean}
 */
every(...args : any[]) : boolean {
	return Array.prototype.every.apply(this, args);
}