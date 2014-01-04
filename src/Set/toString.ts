/**
 * Returns a string representation of the set
 *
 * @return {string}
 */
toString() : string {
	if (this.isEmpty()) {
		return '∅';
	}
	return '{' + Array.prototype.join.call(this, ', ') + '}';
}