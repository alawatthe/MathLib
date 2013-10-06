// ## <a id="Expression" href="http://mathlib.de/en/docs/Expression">Expression</a>
// MathLib.Expression is the MathLib implementation of symbolic expressions

export class Expression {

	type = 'expression';

	arguments: string[];
	content: any;
	isMethod: boolean;
	mode: string;
	name: string;
	subtype: string;
	value: any;


	constructor(expr = {}) {
		var prop;

		if (typeof expr === 'string') {
			expr = MathLib.Expression.parse(expr);
		}
		for (prop in expr) {
			if (expr.hasOwnProperty(prop)) {
				this[prop] = expr[prop];
			}
		}
	}