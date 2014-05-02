/**
 * Works like the Array.prototype.splice function
 *
 * @return {Set}
 */
splice(...args : any[]) : any {
	return Array.prototype.splice.apply(this, args);
}