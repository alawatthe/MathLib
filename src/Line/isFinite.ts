// ### Line.prototype.isFinite()
// Determines if the line is finite
//
// *@return {boolean}*
isFinite() : bool {
	return !MathLib.isZero(this[this.length - 1]);
}