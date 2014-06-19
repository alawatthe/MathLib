/**
 * Convert the expression to a LaTeX string
 *
 * @return {string}
 */
toLaTeX() : string {
	var op, amsmath;

	if (this.subtype === 'assignment') {
		return this.content.map(MathLib.toLaTeX).join(' := ') + ' := ' + MathLib.toLaTeX(this.value);
	}
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
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		op = this.value === '*' ? '\\cdot' : this.value;
		return this.content.reduce((old, cur, idx) => old + (idx ? op : '') + cur.toLaTeX(), '');
	}
	if (this.subtype === 'string') {
		return '\\texttt{"{}' + this.value + '"}';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toLaTeX();
		}
		return this.content.toLaTeX();
	}
	if (this.subtype === 'functionCall') {
		// These operators are predefined by amsmath.
		// (There are more predefined ones, but these are the useful ones.)
		amsmath = [
			'arccos', 'arcsin', 'arctan', 'arg', 'cos', 'cosh', 'cot', 'coth', 'csc', 'deg', 'det', 'dim',
			'gcd', 'lg', 'ln', 'log', 'max', 'min', 'sec', 'sin', 'sinh', 'tan', 'tanh'
		];
		if (amsmath.indexOf(this.value) + 1) {
			return '\\' + this.value + '\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ', ' : '') + MathLib.toLaTeX(cur), '')
				: 'x') +
				'\\right)';
		}
		// else if (this.value === 'exp') {
		// 	return 'e^{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
		// }
		// else if (this.value === 'sqrt') {
		// 	return '\\' + this.value + '{' + (this.content.length ? this.content[0].toLaTeX() : 'x') + '}';
		// }
		else {
			return '\\operatorname{' + this.value + '}\\left(' +
				(this.content.length
				? this.content.reduce((old, cur, idx) => old + (idx ? ', ' : '') + cur.toLaTeX(), '')
				: 'x') +
				'\\right)';
		}

	}

	if (this.subtype === 'functionDefinition') {
		return (this.args.length === 1
			? this.args[0]
			: '\\left(' + this.args.join(', ') + '\\right)') +

			' \\longmapsto ' +

			(this.content.length === 1
			? this.content[0].toLaTeX()
			: '\\left(' + this.content.map(expr => expr.toLaTeX()).join(', ') + '\\right)');
	}
}