/**
 * Checks if the integer is zero or not
 *
 * @return {boolean}
 */
isZero() : boolean {
	return this.data.every(x => x === 0);
}