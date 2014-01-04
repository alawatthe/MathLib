/**
 * Determines if the set is equal to an other set.
 *
 * @param {Set} set The set to compare  
 * @return {boolean}
 */
isEqual(set : Set) : boolean {
	if (this.card !== set.card) {
		return false;
	}
	else {
		return this.every(function (y, i) {
			return MathLib.isEqual(y, set[i]);
		});
	}
}