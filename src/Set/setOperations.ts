static createSetOperation = function (left, both, right) {
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