// ### <a href="http://mathlib.de/en/docs/Expression/numericallyEvaluate">Expression.prototype.numericallyEvaluate</a>
// Evaluates the symbolic expression numerically
//
// *@return {any}*
numericallyEvaluate() : any {
	if (this.subtype === 'brackets') {
		return this.content.numericallyEvaluate();
	}
	if (this.subtype === 'number') {
		return parseFloat(this.value);
	}
	if (this.subtype === 'naryOperator') {
		return MathLib[this.name].apply(null, this.content.map(x => x.numericallyEvaluate()));
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return MathLib.negative(this.content.numericallyEvaluate())
		}
		return this.content.numericallyEvaluate();
	}
	if (this.subtype === 'functionCall') {
		return MathLib[this.value].apply(null, this.content.map(x => x.numericallyEvaluate()));
	}
}