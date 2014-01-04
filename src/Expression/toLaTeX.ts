/**
 * Convert the expression to a LaTeX string
 *
 * @return {string}
 */
toLaTeX() : string {
	var op;

	if (this.subtype === 'binaryOperator') {
		var str;

		if (this.value === '/') {
			str = '\\frac{' + this.content[0].toLaTeX() + '}';
		}
		else {
			str = this.content[0].toLaTeX() + this.value;
		}

		str += this.value !== '-' ? '{' : '';
		str += this.content[1].toLaTeX();
		str += this.value !== '-' ? '}' : '';

		return str;
	}
	if (this.subtype === 'brackets') {
		return '\\left(' + this.content.toLaTeX() + '\\right)';
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return this.value[0] + '+' + this.value[1] + 'i';
		}
		else if (this.mode === 'polar') {
			return this.value[0] + ' \\cdot e^{' + this.value[1] + 'i}';
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return '\\pi';
		}
	}
	if (this.subtype === 'matrix') {
		return '\\begin{pmatrix}' 
			+ this.value.map(row => row.map(col => col.toLaTeX()).join('&') ).join('\\\\') 
			+ '\\end{pmatrix}';
	}
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		op = this.value === '*' ? '\\cdot' : this.value;
		return this.content.reduce((old, cur, idx) => old + (idx ? op : '') + cur.toLaTeX(), '');
	}
	if (this.subtype === 'rationalNumber') {
		return '\\frac{' + this.value[0].toLaTeX() + '}{' + this.value[1].toLaTeX() + '}';
	}
	if (this.subtype === 'set') {
		return '\\left{' + this.value.map(x => x.toLaTeX()).join(', ') + '\\right}';
	}
	if (this.subtype === 'string') {
		return '\\texttt{"{}' + this.value + '"}';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toLaTeX()
		}
		return this.content.toLaTeX();
	}
	if (this.subtype === 'vector') {
		return '\\begin{pmatrix}' + this.value.map(x => x.toLaTeX()).join('\\\\') + '\\end{pmatrix}';
	}

	if (this.subtype === 'functionCall') {
		// These operators are predefined by amsmath.
		// (There are more predefined ones, but these are the useful ones.)
		if (['arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim', 
		'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'].indexOf(this.value) + 1) {
			return '\\' + this.value + '\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ',' : '') + cur.toLaTeX(), '')
				: 'x') +
				'\\right)';
		}
		else if (this.value === 'exp') {
			return 'e^{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
		}
		else if (this.value === 'sqrt') {
			return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
		}
		else {
			return '\\operatorname{' + this.value + '}\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ',' : '') + cur.toLaTeX(), '') 
				: 'x') +
				'\\right)';
		}

	}

	if (this.subtype === 'functionDefinition') {
		return (this.arguments.length === 1
			? this.arguments[0]
			: '\\left(' + this.arguments.join(', ') + '\\right)') +
			
			' \\longmapsto ' +

			(this.content.length === 1
			? this.content[0].toLaTeX()
			: '\\left(' + this.content.map(expr => expr.toLaTeX()).join(', ') + '\\right)') 
	}
}