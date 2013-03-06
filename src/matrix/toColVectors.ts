// ### Matrix.prototype.toColVectors()
// Converts the columns of the matrix to vectors
//
// *@returns {array}*
toColVectors() {
	return this.transpose().toRowVectors();
}