/**
 * Returns the powerset
 *
 * @return {Set}
 */
powerset() : Set {
	var flag, subset, i, ii, j, jj,
			powerset = [];

	for (i = 0, ii = Math.pow(2, this.card); i < ii; i++) {
		flag = i.toString(2).split('').reverse();
		subset = [];
		for (j = 0, jj = this.card; j < jj; j++) {
			if (flag[j] === '1') {
				subset.push(this[j]);
			}
		}
		powerset.push(new MathLib.Set(subset));
	}

	return new MathLib.Set(powerset);
}
