/**
 * Returns the entries on the diagonal in an array
 *
 * @return {array}
 */
diag() : any[] {
	var diagonal = [],
			i, ii;
	for (i = 0, ii = Math.min(this.rows, this.cols); i < ii; i++) {
		diagonal.push(this[i][i]);
	}
	return diagonal;
}