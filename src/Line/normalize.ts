// ### Line.prototype.normalize()
// Normalizes the line.
//
// *@returns {line}*
normalize() : Line {
	var h = MathLib.hypot(this[0], this[1]);
	return this.map(function (x) {
		return x / h;
	});
}