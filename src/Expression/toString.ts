// ### <a href="http://mathlib.de/en/docs/Expression/toString">Expression.prototype.toString</a>
// A custom toString function
//
// *@return {string}*
toString() : string {
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
	if (this.subtype === 'matrix') {
		var length = this.value.length;
		return this.value.map(row => row.map(col => col.toString()).join('\t') )
			.map(function (row, index) {
				if (index === 0) {
					return '⎛' + row + '⎞';
				}
				else if (index === length - 1) {
					return '⎝' + row + '⎠';
				}
				else {
					return  '⎜' + row + '⎟';
				}
			}).join('\n');
	}
	if (this.subtype === 'number' || this.subtype === 'variable') {
		return this.value;
	}
	if (this.subtype === 'naryOperator') {
		return this.content.reduce((old, cur) => old + this.value + cur);
	}
	if (this.subtype === 'rationalNumber') {
		return this.value[0].toString() + '/' + this.value[1].toString();
	}
	if (this.subtype === 'set') {
		return '{' + this.value.map(x => x.toString()).join(', ') + '}';
	}
	if (this.subtype === 'string') {
		return '"' + this.value + '"';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '-' + this.content.toString()
		}
		return this.content.toString();
	}
	if (this.subtype === 'vector') {
		return '(' + this.value.map(x => x.toString()).join(', ') + ')';
	}
	if (this.subtype === 'functionCall') {
		return this.value + '(' +
			(this.content.length 
			? this.content.map((expr) => expr.toString()).join(', ')
			: 'x') +
			')';
	}
	if (this.subtype === 'functionDefinition') {
		return (this.arguments.length === 1
			? this.arguments[0]
			: '(' + this.arguments.join(', ') + ')') +
			
			' ⟼ ' +

			(this.content.length === 1
			? this.content[0].toString()
			: '(' + this.content.map(expr => expr.toString()).join(', ') + ')') 
	}
}