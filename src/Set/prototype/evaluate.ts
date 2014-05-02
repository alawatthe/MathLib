/**
 * Evaluates the elements of the set
 *
 * @return {Set}
 */
evaluate() : Set {
	return this.map(MathLib.evaluate);
}