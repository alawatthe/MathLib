/**
 * Returns the negative vector.
 *
 * @return {Vector}
 */
negative() : Vector {
	return this.map(entry => MathLib.negative(entry));
}