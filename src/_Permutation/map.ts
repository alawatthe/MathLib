// ### Permutation.prototype.map()
// Works like Array.prototype.map.
//
// *@returns {permutation}*
map(...args: any[]) : Permutation {
	return new MathLib.Permutation(Array.prototype.map.apply(this, args));
}