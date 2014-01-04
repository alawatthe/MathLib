/**
 * Works like the Array.prototype.forEach function
 */
forEach(...args : any[]) : void {
	Array.prototype.forEach.apply(this, args);
}