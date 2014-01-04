/**
 * Returns the negative polynomial
 *
 * @return {Polynomial}
 */
negative() : Polynomial {
	return new MathLib.Polynomial(this.map(MathLib.negative));
}