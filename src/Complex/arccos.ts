// ### [Complex.prototype.arccos()](http://mathlib.de/en/docs/Complex/arccos)
// Returns the inverse cosine of the number.
//
// *@return {Complex}*
arccos() : Complex {
	return MathLib.minus(Math.PI / 2, this.arcsin());
}