// ### Point.prototype.toString()
// Returns string representation of the point
//
// *@returns {boolean}* Optional parameter to indicate if the output should be projective.
// *@returns {string}*
toString(opt = false) : string {
	var p = opt ? this.toArray() : this.normalize().slice(0, -1);

	return '(' + p.reduce(function (old, cur) {
		return old + ', ' + MathLib.toString(cur);
	}) + ')';
}