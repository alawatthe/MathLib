// ### Permutation.prototype.times()
// Multiplies two permutations
//
// *@returns {permutation}*
times(p : Permutation) : Permutation {
	var a = this;
	return p.map(function (x) {
		return a[x];
	});
}