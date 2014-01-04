/**
 * Works like Array.prototype.map.
 *
 * @return {Permutation}
 */
map(...args: any[]) : Permutation {
	return new MathLib.Permutation(Array.prototype.map.apply(this, args));
}