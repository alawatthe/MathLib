/**
 * Works like Array.prototype.every.
 *
 * @param {function} f The function to be applied to all the values
 * @return {boolean}
 */
every(f : (value : any, index : number, vector : Vector ) => boolean) : boolean {
	return Array.prototype.every.call(this, f);
}