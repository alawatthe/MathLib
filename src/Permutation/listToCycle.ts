/**
 * Converts a list representation to a cycle representation
 * 
 * @param {array} list The list to be converted  
 * @return {array}
 */
static listToCycle(list : number[]) : any {
	var finished = [],
			cur, i, ii, cycle, cycles = [];

	for (i = 0, ii = list.length; i < ii; i++) {
		cur = i;
		cycle = [];
		while (!finished[cur]) {
			finished[cur] = true;
			cycle.push(cur);
			cur = list[cur];
		}
		if (cycle.length) {
			cycles.push(cycle);
		}
	}
	return cycles;
}