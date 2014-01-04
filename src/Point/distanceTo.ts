/**
 * Calculates the distance to an other point.
 * If no other point is provided, it calculates the distance to the origin.
 *
 * @param {Point} p The point to calculate the distance to  
 * @return {number}
 */
distanceTo(p : Point /*, geom = MathLib.Geometry.active*/) : number {
	if (arguments.length === 0) {
		return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
	}

	if (p.type === 'point' && this.dimension === p.dimension) {
		return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
	}

//	if (p.type === 'point' && this.dimension === p.dimension) {
//		var Otp = this.times(geom.fundamentalConic.primal).times(p),
//				Ott = this.times(geom.fundamentalConic.primal).times(this),
//				Opp = p.times(geom.fundamentalConic.primal).times(p),
//				Dtp = Math.sqrt(Otp * Otp - Ott * Opp);
//
//		return MathLib.Geometry.active.cDist * Math.log((Otp + Dtp) / (Otp - Dtp));
//	}
}