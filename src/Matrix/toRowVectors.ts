// ### Matrix.prototype.toRowVectors()
// Converts the rows of the matrix to vectors
//
// *@returns {array}*
toRowVectors() : string {
	return this.toArray().map(function (v) {return new MathLib.Vector(v);});
}