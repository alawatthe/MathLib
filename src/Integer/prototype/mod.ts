/**
 * Reduces the integer modulo an other number.
 *
 * @param {Integer|number} n - The number with which the current integer should be reduced
 * @return {Integer|number}
 */
mod(n : Integer) {
	if (n.type !== 'integer') {
		return MathLib.mod.apply(null, MathLib.coerce(this, n));
	}
	else {
		return this.divrem(n)[1];
	}
}