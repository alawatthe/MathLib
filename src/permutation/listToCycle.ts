// ### Permutation.listToCycle()
// Converts a list representation to a cycle representation
// 
// *@param{array}* list The list to be converted  
// *@returns {array}*
static listToCycle(list : number[]) : any {
	var finished = [],
			cur, i, ii, temp, res = [];

	for (i=0, ii=list.length; i<ii; i++) {
		cur = i;
		temp = [];
		while(!finished[cur]) {
			finished[cur] = true;
			temp.push(cur);
			cur = list[cur];
		}
		if (temp.length) {
			res.push(temp);
		}
	}
	return res;
}