// ### <a href="http://mathlib.de/en/docs/Expression/toLaTeX">Expression.prototype.toLaTeX</a>
// Convert the expression to a LaTeX string
//
// *@return {string}*
toLaTeX() : string {
	var op;

	if (this.subtype === 'brackets') {
		return '\\left(' + this.content.toLaTeX() + '\\right)';
	}
	if (this.subtype === 'number') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		op = this.value === '*' ? '\\cdot' : this.value;
		return this.content.reduce((old, cur, idx) => old + (idx ? op : '') + cur.toLaTeX(), '');
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toLaTeX()
		}
		return this.content.toLaTeX();
	}
	if (this.subtype === 'functionCall') {
		// These operators are predefined by amsmath.
		// (There are more predefined ones, but these are the useful ones.)
		if (['arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim', 
		'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'].indexOf(this.value) + 1) {
			return '\\' + this.value + '\\left(' + this.content.reduce((old, cur, idx) =>
				old + (idx ? ',' : '') + cur.toLaTeX(), '') + '\\right)';
		}
		else if (this.value === 'exp') {
			return 'e^{' + this.content.reduce((old, cur, idx) =>
				old + (idx ? ',' : '') + cur.toLaTeX(), '') + '}';
		}
		else if (this.value === 'sqrt') {
			return '\\' + this.value + '{' + this.content.reduce((old, cur, idx) =>
				old + (idx ? ',' : '') + cur.toLaTeX(), '') + '}';
		}
		else {
			return '\\operatorname{' + this.value + '}\\left(' + this.content.reduce((old, cur, idx) =>
				old + (idx ? ',' : '') + cur.toLaTeX(), '') + '\\right)';
		}

	}
}