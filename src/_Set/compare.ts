// ### Set.prototype.compare()
// Compare function for sets
//
// *@returns {number}*
compare(x : any) : number {
	if (this.card !== x.card) {
		return MathLib.sign(this.card - x.card);
	}
	else {
		var res = 0, stop = false;
		this.forEach(function (y, i) {
			if(!stop) {
				var a = MathLib.compare(y, x[i]);
				if(a !== 0) {
					res = a;
					stop = true;
				}
			}
		});
		return res;
	}
}