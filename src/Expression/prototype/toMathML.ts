/**
 * Convert the Expression to MathML.
 *
 * @return {string}
 */
toMathML() : string {

	if (this.subtype === 'assignment') {
		return this.content.map(MathLib.toMathML).join('<mo>:=</mo>') + '<mo>:=</mo>' + MathLib.toMathML(this.value);
	}
	if (this.subtype === 'binaryOperator') {
		if (this.value === '-') {
			return this.content[0].toMathML() + '<mo>-</mo>' + this.content[1].toMathML();
		}
		if (this.value === '/') {
			return '<mfrac>' + this.content[0].toMathML() + this.content[1].toMathML() + '</mfrac>';
		}
		if (this.value === '^') {
			return '<msup>' + this.content[0].toMathML() + this.content[1].toMathML() + '</msup>';
		}
	}
	if (this.subtype === 'brackets') {
		return '<mrow><mo>(</mo>' + this.content.toMathML() + '<mo>)</mo></mrow>';
	}
	if (this.subtype === 'complexNumber') {
		if (this.mode === 'cartesian') {
			return  '<mrow>' + this.value[0].toMathML() + '<mo>+</mo>' + this.value[1].toMathML() + '<mi>i</mi></mrow>';
		}
		else if (this.mode === 'polar') {
			return this.value[0].toMathML() + '<msup><mi>e</mi><mrow>'
				+ this.value[1].toMathML() + '<mi>i</mi></mrow></msup>';
		}
	}
	if (this.subtype === 'constant') {
		if (this.value === 'pi') {
			return '<mi>&pi;</mi>';
		}
	}
	if (this.subtype === 'number') {
		return '<mn>' + this.value + '</mn>';
	}
	if (this.subtype === 'variable') {
		return '<mi>' + this.value + '</mi>';
	}
	if (this.subtype === 'naryOperator') {
		return '<mrow>' + this.content.map(expr => expr.toMathML()).join('<mo>' +
			(this.value === '*'
			? '&middot;'
			: this.value) +
			'</mo>') + '</mrow>';
	}
	if (this.subtype === 'unaryOperator') {
		if (this.value === '-') {
			return '<mo>-</mo>' + this.content.toMathML();
		}
		return this.content.toMathML();
	}
	if (this.subtype === 'functionCall') {
		return '<mrow><mi>' + this.value + '</mi><mo>&af;</mo><mrow><mo>(</mo>' +
		( this.content.length
		? this.content.map(expr => expr.toMathML()).join('<mo>,</mo>')
		: '<mi>x</mi>') +
		'<mo>)</mo></mrow></mrow>';
	}

	if (this.subtype === 'functionDefinition') {
		return '<mrow>' +
			(this.args.length === 1
			? '<mi>' + this.args[0] + '</mi>'
			: '<mrow><mo>(</mo><mi>' + this.args.join('</mi><mo>,</mo><mi>') + '</mi><mo>)</mo></mrow>') +
			'<mo>&#x27FC;</mo>' +
			(this.content.length === 1
			? this.content[0].toMathML()
			: '<mrow><mo>(</mo>' + this.content.map(expr => expr.toMathML()) + '<mo>)</mo></mrow>') +
			'</mrow>';
	}
}