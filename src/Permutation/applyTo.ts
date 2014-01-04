/**
 * Applies the permutation to a number or a array/matrix/point/vector
 *
 * @param {number|array|Matrix|Point|Vector} n The object to apply the permutation to
 * @return {number|array|Matrix|Point|Vector}
 */
applyTo(n : any) : any {
	var p, permutatedObj;
	if (typeof n === 'number') {
		if (n >= this.length) {
			return n;
		}
		return this[n];
	}
	else {
		p = this;
		permutatedObj = n.map(function (x, i) {
			return n[p.applyTo(i)];
		});

		return (n.type === undefined ? permutatedObj : new n.constructor(permutatedObj));
	}
}