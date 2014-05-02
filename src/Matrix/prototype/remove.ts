/**
 * This function removes the specified rows and/or columns for the matrix.
 *
 * @param {number|array} row The row(s) to be removed.  
 * @param {number|array} col The column(s) to be removed.  
 * @return {Matrix}
 */
remove(row, col) {
	var rest = this.toArray();

	if (row || row === 0) {
		if (typeof row === 'number') {
			row = [row];
		}
		rest = rest.filter(function (x, i) {
			return row.indexOf(i) === -1;
		});
	}

	if (col || col === 0) {
		if (typeof col === 'number') {
			col = [col];
		}
		col = col.sort().reverse();
		col.forEach(function (n) {
			rest = rest.map(function (x) {
				x.splice(n, 1);
				return x;
			});
		});
	}

	return new MathLib.Matrix(rest);
}