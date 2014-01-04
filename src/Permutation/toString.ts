/**
 * String representation of the permutation. 
 *
 * @return {string}
 */
toString() : string {
	var str = '';
	this.cycle.forEach(function (elem) {
		str += '(' + elem.toString() + ')';
	});
	return str;
}