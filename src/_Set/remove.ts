// ### Set.prototype.remove()
// Removes a element from a set
//
// *@returns {set}*
remove(a : any) : Set {
	var i = this.indexOf(a);
	if (i !== -1) {
		this.splice(i, 1);
		this.card--;
	}
	return this;
}