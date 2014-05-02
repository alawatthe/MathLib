/**
 * Determines if the set is a subset of an other set.
 *
 * @param {Set} set The potential superset  
 * @return {boolean}
 */
isSubsetOf(set : Set) : boolean {
	return this.every(function (x) {
		return set.indexOf(x) !== -1;
	});
}