/**
 * Calculates a minor
 *
 * @param {number} r The row to be removed.  
 * @param {number} c The column to be removed.  
 * @return {Matrix}
 */
minor(r : number, c : number) {
	return this.remove(r, c).determinant();
}