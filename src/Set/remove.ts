/**
 * Removes a element from a set
 *
 * @param {any} element The element to remove from the set.
 * @return {Set}
 */
remove(element : any) : Set {
	var i = this.indexOf(element);
	if (i !== -1) {
		this.splice(i, 1);
		this.card--;
	}
	return this;
}