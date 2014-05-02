/**
 * Returns the negative polynomial
 *
 * @return {Polynomial}
 */
negative() : Polynomial {
	return new MathLib.Polynomial(this.map(entry => MathLib.negative(entry)));
}