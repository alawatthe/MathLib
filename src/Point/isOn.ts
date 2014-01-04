/**
 * Determines wether a point is on a line or circle
 *
 * @param {Line|Circle}  
 * @return {boolean}
 */
isOn(a : Circle) : boolean {
	if (a.type === 'line') {
		return this.distanceTo(a.center) === a.radius;
	}
	else if (a.type === 'circle') {
		return this.distanceTo(a.center) === a.radius;
	}
}