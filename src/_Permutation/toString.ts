// ### Permutation.prototype.toString()
// String representation of the permutation. 
//
// *@returns {string}*
toString() : string {
	var str = '';
	this.cycle.forEach(function (elem) {
		str += '(' + elem.toString() + ')';
	});
	return str;
}