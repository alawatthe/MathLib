/**
 * Numeric derivative at a given point
 *
 * @param {number} x The value to calculate the derivative at
 * @param {number} h Optional step size
 * @return {number}
 */
functnPrototype.diff = function (x: number, h = 1e-5) : number {
	return (this(x + h) - this(x - h)) / (2 * h);
};