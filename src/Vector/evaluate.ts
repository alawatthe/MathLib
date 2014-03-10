/**
 * Evaluates the entries of the vector
 *
 * @return {Vector}
 */
evaluate() : Vector {
	return this.map(MathLib.evaluate);
}