// ### Line.prototype.isOrthogonalTo()
// Determines if two lines are orthogonal.
//
// *@param {Line}*  
// *@return {boolean}*
isOrthogonalTo(l : Line) : boolean {
	return MathLib.isEqual(
		new MathLib.Point([0, 0, 1]).crossRatio(
			this.meet(new MathLib.Line([0, 0, 1])),
			l.meet(new MathLib.Line([0, 0, 1])), 
			MathLib.Point.I,
			MathLib.Point.J
		), -1);
}