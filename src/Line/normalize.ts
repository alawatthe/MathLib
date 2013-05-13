// ### Line.prototype.normalize()
// Normalizes the line.
//
// *@return {Line}*
normalize() : Line {
	var h = MathLib.hypot(this[0], this[1]);
	return this.map(function (x) {
		return x / h;
	});
}