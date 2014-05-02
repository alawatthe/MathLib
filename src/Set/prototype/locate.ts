/**
 * Array.prototype.indexOf() returns only the position of an element in the
 * array and not the position where one should be inserted.
 *
 * @param {Set} x The element to locate  
 * @return {number}
 */
locate(x : any) : number {
	var left = 0,
			right = this.card - 1,
			middle,
			i = this.indexOf(x);

	if (i !== -1) {
		return i;
	}

	while (left <= right) {
		middle = left + Math.floor((right - left) / 2);
		if (this[middle] < x) {
				left = middle + 1;
		} else if (this[middle] > x) {
				right = middle - 1;
		} else {
				return middle;
		}
	}
	return left;
}