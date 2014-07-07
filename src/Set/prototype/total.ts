/**
 * Adds up all the elements in the set.
 *
 * @param {number|MathLib object} n The object to add to the elements in the set.
 * @return {Set|any}
 */
total() : any {
	return MathLib.plus.apply(null, this.toArray());
}
