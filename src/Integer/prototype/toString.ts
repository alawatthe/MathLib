/**
 * Custom toString function
 *
 * @return {string}
 */
toString() : string {
	var i, ii,
			str = '';
	
	for (i = 0, ii = this.data.length-1; i < ii; i++) {
		str	= ('000000' + this.data[i]).slice(-7) + str;
	}
	
	str = this.data[i] + str;
	
	if (this.sign === '-') {
		str = '-' + str;
	}
	
	return str;
}