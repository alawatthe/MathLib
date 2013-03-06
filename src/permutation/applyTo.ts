// ### Permutation.prototype.applyTo()
// Applies the permutation to a number or a array/matrix/point/vector
//
// *@param {number|array|matrix|point|vector}*  
// *@returns {number|array|matrix|point|vector}*
applyTo(n : any) : any {
	var p, res;
	if (typeof n === 'number') {
		if (n >= this.length) {
			return n;
		}
		return this[n];
	}
	else {
		p = this;
		res = n.map(function (x, i) {
			return n[p.applyTo(i)];
		});

		return (n.type === undefined ? res : new n.constructor(res));
	}
}