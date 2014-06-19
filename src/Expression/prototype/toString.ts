/**
 * A custom toString function
 *
 * @return {string}
 */
toString() : string {

	if (this.subtype === 'assignment') {
		return this.content.map(MathLib.toString).join(' := ') + ' := ' + MathLib.toString(this.value);
	}
	if (this.subtype === 'binaryOperator') {
		return this.content[0].toString() + this.value + this.content[1].toString();
	}
	if (this.subtype === 'brackets') {
		return '(' + this.content.toString() + ')';
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return this.value[0] + '+' + this.value[1] + 'i';
		}
		else if (this.mode === 'polar') {
			return this.value[0] + '*e^' + this.value[1] + 'i';
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return 'π';
		}
	}
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		return this.content.reduce((old, cur) => old + this.value + cur);
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toString();
		}
		return this.content.toString();
	}
	if (this.subtype === 'functionCall') {
		return this.value + '(' +
			(this.content.length
			? this.content.map((expr) => expr.toString()).join(', ')
			: 'x') +
			')';
	}
	if (this.subtype === 'functionDefinition') {
		return (this.args.length === 1
			? this.args[0]
			: '(' + this.args.join(', ') + ')') +

			' ⟼ ' +

			(this.content.length === 1
			? this.content[0].toString()
			: '(' + this.content.map(expr => expr.toString()).join(', ') + ')');
	}
}