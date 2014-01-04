/**
 * Converts the columns of the matrix to vectors
 *
 * @return {array}
 */
toColVectors() {
	return this.transpose().toRowVectors();
}