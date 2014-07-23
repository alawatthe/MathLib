/**
 * Evaluates the symbolic expression
 *
 * @return {any}
 */
evaluate() : any {
	if (this.subtype === 'assignment') {
		var value = this.value;
		this.content.forEach(function (variable) {
			MathLib.Expression.variables[variable.value] = value;
		});
		return this.value;
	}
	if (this.subtype === 'binaryOperator') {
		return MathLib[this.name].apply(null, this.content.map(x => MathLib.evaluate(x)));
	}
	if (this.subtype === 'brackets') {
		return MathLib.evaluate(this.content);
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return new MathLib.Complex(this.value[0].evaluate(), this.value[1].evaluate());
		}
		else if (this.mode === 'polar') {
			return MathLib.Complex.polar(this.value[0].evaluate(), this.value[1].evaluate());
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return Math.PI;
		}
	}
	if (this.subtype === 'functionCall') {
		if (this.isMethod) {
			var args = this.content.map(x => MathLib.evaluate(x)),
					_this = args.shift();

			return _this[this.value].apply(_this, args);
		}
		else {
			return MathLib[this.value].apply(null, this.content.map(x => MathLib.evaluate(x)));
		}
	}
	if (this.subtype === 'functionDefinition') {
		return MathLib.Functn(this.content[0].evaluate(), {
			name: 'f',
			expression: this
		});
	}
	if (this.subtype === 'number') {
		return parseFloat(this.value);
	}
	if (this.subtype === 'naryOperator') {
		return MathLib[this.name].apply(null, this.content.map(x => MathLib.evaluate(x)));
	}
	if (this.subtype === 'variable') {
		if (this.value in MathLib.Expression.variables) {
			return MathLib.evaluate(MathLib.Expression.variables[this.value]);
		}
		return this;
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return MathLib.negative(this.content.evaluate());
		}
		return this.content.evaluate();
	}

}
