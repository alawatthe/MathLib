/**
 * Determines if the vector is the zero vector.
 *
 * @return {boolean}
 */
isZero() : boolean {
	return this.every(MathLib.isZero);
}