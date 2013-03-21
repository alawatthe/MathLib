// ### Point.prototype.crossRatio()
// Calculates the distance crossratio (A,B,C,D) of four points
// as seen from the current point.
//
// *@param {point}* a The point A  
// *@param {point}* b The point B  
// *@param {point}* c The point C  
// *@param {point}* d The point D  
// *@returns {number}*
crossRatio(a : Point, b : Point, c : Point, d : Point) : number {
	var xa = this.vectorProduct(a),
			xb = this.vectorProduct(b);

	return xa.scalarProduct(c)*xb.scalarProduct(d) / (xa.scalarProduct(d)* xb.scalarProduct(c));
}