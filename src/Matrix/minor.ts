// ### Matrix.prototype.minor()
// Calculates a minor
//
// *@param {number}* The row to be removed.  
// *@param {number}* The column to be removed.  
// *@return {Matrix}*
minor(r, c) {
	return this.remove(r, c).determinant();
}