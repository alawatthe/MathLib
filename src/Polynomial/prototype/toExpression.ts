/**
 * Custom toExpression function
 *
 * @return {Expression}
 */
toExpression() : Expression {
	var content = [],
			sum, i;

	for (i = this.deg; i >= 0; i--) {
		if (!MathLib.isZero(this[i])) {


			if (i > 1) {
				content.push(new MathLib.Expression({
						subtype: 'naryOperator',
						value: '^',
						name: 'pow',
						content: [new MathLib.Expression({
								subtype: 'naryOperator',
								content: [
									new MathLib.Expression({
										subtype: 'number',
										value: this[i].toString()
									}),
									new MathLib.Expression({
										subtype: 'variable',
										value: 'x'
									})
								],
								value: '*',
								name: 'times'
							}),
							new MathLib.Expression({
								subtype: 'number',
								value: i.toString()
							}),
						]
					})
				);
			}
			else if (i === 1) {
				content.push(new MathLib.Expression({
						subtype: 'naryOperator',
						content: [
							new MathLib.Expression({
								subtype: 'number',
								value: this[i].toString()
							}),
							new MathLib.Expression({
								subtype: 'variable',
								value: 'x'
							})
						],
						value: '*',
						name: 'times'
					})
				);
			}
			else if (i === 0) {
				content.push(new MathLib.Expression({
						subtype: 'number',
						value: this[i].toString()
					})
				);
			}
		}
	}

	sum = new MathLib.Expression({
		content: content,
		subtype: 'naryOperator',
		value: '+',
		name: 'plus'
	});


	return new MathLib.Expression({
		subtype: 'functionDefinition',
		args: ['x'],
		content: [sum]
	});
}