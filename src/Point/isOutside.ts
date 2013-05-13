// ### Point.prototype.isOutside()
// Determines wether a point is outside a circle
//
// *@param {Circle}*  
// *@return {boolean}*
isOutside(a : Circle) : bool {
	if (a.type === 'circle') {
		return this.distanceTo(a.center) > a.radius;
	}
}