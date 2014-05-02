/**
 * Converts the set to an array
 *
 * @return {array}
 */
toArray() : any[] {
	return Array.prototype.slice.call(this);
}