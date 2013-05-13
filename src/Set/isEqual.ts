// ### Set.prototype.isEqual()
// Determines if the set is equal to an other set.
//
// *@param {Set}* The set to compare  
// *@return {boolean}*
isEqual(x : Set) : bool {
	if (this.card !== x.card) {
		return false;
	}
	else {
		return this.every(function (y, i) {
			return MathLib.isEqual(y, x[i]);
		});
	}
}