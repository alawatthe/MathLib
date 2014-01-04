/**
 * Converts the vector to an array.
 *
 * @return {array}
 */
toArray() : any[] {
	return Array.prototype.slice.call(this);
}