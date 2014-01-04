/**
 * Works like the Array.prototype.indexOf function
 *  
 * @return {number}
 */
indexOf(...args : any[]) : number {
	return Array.prototype.indexOf.apply(this, args);
}