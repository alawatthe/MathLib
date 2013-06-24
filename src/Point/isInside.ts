// ### Point.prototype.isInside()
// Determines wether a point is inside a circle
//
// *@param {Circle}*  
// *@return {boolean}*
isInside(a : Circle) : boolean {
	if (a.type === 'circle') {
		return this.distanceTo(a.center) < a.radius;
	}
}