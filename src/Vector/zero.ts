/**
 * Returns a zero vector of given size.
 *
 * @param {number} n The number of entries in the vector.  
 * @return {Vector}
 */
static zero = function (n : number) : Vector {
	var vector = [], i;
	for (i = 0; i < n; i++) {
		vector.push(0);
	}
	return new MathLib.Vector(vector);
};