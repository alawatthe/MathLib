/**
 * Determines if two lines are equal.
 *
 * @param {Line} l The line to compare with
 * @return {boolean}
 */
isEqual(l : Line) : boolean {
	var p = this.normalize();
			l = l.normalize();

	if (this.length !== l.length) {
		return false;
	}

	return p.every(function (x, i) {
		return MathLib.isEqual(x, l[i]);
	});
}