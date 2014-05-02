/**
 * This function works like the Array.prototype.forEach function.
 * The matrix is processed row by row.
 * The function is called with the following arguments:
 * the entry at the current position, the number of the row,
 * the number of the column and the complete matrix
 *
 * @param {function} f The function which is called on every argument
 */
forEach(f) {
	Array.prototype.forEach.call(this, function (x, i) {
		return Array.prototype.forEach.call(x, function (y, j) {
			return f(y, i, j, this);
		});
	});
}