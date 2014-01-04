/**
 * Converts a cycle representation to a list representation
 * 
 * @param {array} cycle The cycle to be converted  
 * @return {array}
 */
static cycleToList(cycle : any) : number[] {
	var index, list = [],
			cur, i, ii, j, jj, max;

	max = cycle.map(function (b) {
		return Math.max.apply(null, b);
	});
	max = Math.max.apply(null, max);

	for (i = 0, ii = max; i <= ii; i++) {
		cur = i;
		for (j = 0, jj = cycle.length; j < jj; j++) {
			index = cycle[j].indexOf(cur);
			if (++index) {
				cur = cycle[j][index % cycle[j].length];
			}
		}
		list.push(cur);
	}
	return list;
}