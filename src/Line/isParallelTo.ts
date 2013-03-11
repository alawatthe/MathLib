// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {line}*  
// *@returns {boolean}*
isParallelTo(l : Line) : bool {
	return this.every(function (x, i) {
		return MathLib.isEqual(x, l[i]) || i === l.length - 1;
	});
}