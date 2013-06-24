// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {Line}*  
// *@return {boolean}*
isParallelTo(l : Line) : boolean {
	return this.every(function (x, i) {
		return MathLib.isEqual(x, l[i]) || i === l.length - 1;
	});
}