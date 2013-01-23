// ### [Vector.prototype.norm()](http://mathlib.de/en/docs/vector/norm)
// Calcultes the norm of the vector.
//
// *@param {number}* [default=2] The p for the p-norm
// *@returns {number}*
norm(p = 2) : number {
	if (p === 2) {
	  return MathLib.hypot.apply(null, this.toArray());
	}
	else if (p === Infinity) {
		return Math.max.apply(null, this.map(Math.abs));
	}
	else {
		return MathLib.root(this.reduce(function(prev, curr){
  		return prev + Math.pow(Math.abs(curr),p);
		}, 0), p);
	}
}