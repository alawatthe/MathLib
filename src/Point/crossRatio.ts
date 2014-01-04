/**
 * Calculates the distance crossratio (A,B,C,D) of four points
 * as seen from the current point.
 *
 * @param {Point} a The point A  
 * @param {Point} b The point B  
 * @param {Point} c The point C  
 * @param {Point} d The point D  
 * @return {number}
 */
crossRatio(a : Point, b : Point, c : Point, d : Point) : number {
	var xa = this.vectorProduct(a),
			xb = this.vectorProduct(b);

	return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
}