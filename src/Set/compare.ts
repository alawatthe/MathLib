// ### Set.prototype.compare()
// Compare function for sets
//
// *@return {number}*
compare(x : any) : number {
	var a, i, ii;

	if (this.card !== x.card) {
		return MathLib.sign(this.card - x.card);
	}
	else {
		for (i = 0, ii = this.card; i < ii; i++) {
			a = MathLib.compare(this[i], x[i])
			if (a !== 0) {
				return a;
			}
		}
		return 0;
	}
}