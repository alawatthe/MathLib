/**
 * Works like Array.prototype.forEach.
 *
 * @param {function} f The function to be applied to all the values
 */
forEach(f : (value : any, index : number, vector : Vector ) => void) : void {
	Array.prototype.forEach.call(this, f);
}