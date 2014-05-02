/**
 * Works like the Array.prototype.some function
 *  
 * @return {boolean}
 */
some(...args : any[]) : boolean {
	return Array.prototype.some.apply(this, args);
}