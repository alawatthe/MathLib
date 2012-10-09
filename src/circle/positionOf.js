// ### Circle.prototype.positionOf()
// Determine if a point is in, on or outside a circle.
//
// *@return {string}*
MathLib.extendPrototype('circle', 'positionOf', function (p) {
	var diff;
  if (p.type === 'point' && p.dim === 2) {
    diff = p.distanceTo(this.center) - this.radius;
		if (MathLib.isZero(diff)) {
			return 'on';
		}
    else if (diff < 0) {
			return 'in';
    }
    else {
			return 'out';
    }
  }
});