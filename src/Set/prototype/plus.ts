/**
 * Adds the argument to all elements in the set,  
 * or if no argument is provided adds up all the elements in the set.
 *
 * @param {number|MathLib object} n The object to add to the elements in the set.
 * @return {Set|any}
 */
plus(n : any) : any {
	var sum = [];
	if (!arguments.length) {
		return MathLib.plus.apply(null, this.toArray());
	}
	else if (n.type === 'set') {
		this.forEach(function (x) {
				n.forEach(function (y) {
					sum.push(MathLib.plus(x, y));
				});
			});

		return new MathLib.Set(sum);
	}
	else {
		return this.map(function (x) {
			return MathLib.plus(x, n);
		});
	}
}