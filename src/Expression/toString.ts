// ### <a href="http://mathlib.de/en/docs/Expression/toString">Expression.prototype.toString</a>
// A custom toString function
//
// *@returns {string}*
toString() : string {
	if (this.subtype === 'brackets') {
		return '(' + this.content.toString() + ')';
	}
	if (this.subtype === 'number') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		return this.content.reduce((old, cur) => old + this.value + cur);
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toString()
		}
		return this.content.toString();
	}
	if (this.subtype === 'functionCall') {
		return this.value + '(' + this.content.reduce((old, cur) => old + ',' + cur) + ')';
	}
}