/**
 * Function to create the intersect, union, without, xor methods
 *
 * @param {boolean} left Should the elements which are only in the left set be included in the result.
 * @param {boolean} both Should the elements which are in both sets be included in the result.
 * @param {boolean} right Should the elements which are only in the right set be included in the result.
 * @return {function}
 */
static createSetOperation = function (left : boolean, both : boolean, right : boolean) {
	return function (a) {
		var set = [],
				i = 0,
				j = 0,
				tl = this.card,
				al = a.card;

		while (i < tl && j < al) {
			if (MathLib.compare(this[i], a[j]) < 0) {
				if (left) {
					set.push(this[i]);
				}
				i++;
				continue;
			}
			if (MathLib.compare(this[i], a[j]) > 0) {
				if (right) {
					set.push(a[j]);
				}
				j++;
				continue;
			}
			if (MathLib.isEqual(this[i], a[j])) {
				if (both) {
					set.push(this[i]);
				}
				i++;
				j++;
				continue;
			}
		}
		if (left && j === al) {
			set = set.concat(this.slice(i));
		}
		else if (right && i === tl) {
			set = set.concat(a.slice(j));
		}
		return new MathLib.Set(set);
	};
};