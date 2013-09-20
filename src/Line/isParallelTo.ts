// ### Line.prototype.isParallelTo()
// Determines if two lines are parallel.
//
// *@param {Line}*  
// *@return {boolean}*
isParallelTo(l : Line) : boolean {
	return MathLib.isZero(this[0]*l[1] - this[1]*l[0]);
}