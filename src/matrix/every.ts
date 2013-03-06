// ### Matrix.prototype.every()
// This function works like the Array.prototype.every function.
// The matrix is processed row by row.
// The function is called with the following arguments:
// the entry at the current position, the number of the row,
// the number of the column and the complete matrix
//
// *@param {function}* The function which is called on every argument  
// *@returns {boolean}*
every(f) {
	return Array.prototype.every.call(this, function (x, i) {
		return Array.prototype.every.call(x, function (y, j) {
			return f(y, i, j, this);
		});
	});
}