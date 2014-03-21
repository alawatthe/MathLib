/// no import

// There is no DOMParser in Node, so we have to require one (done via a regexp replace)
/// DOMParser

/**
 * MathLib.Expression is the MathLib implementation of symbolic expressions
 *
 * @class
 * @this {Expression}
 */
export class Expression {

	type = 'expression';

	args: any;
	cdgroup: string;
	content: any;
	isMethod: boolean;
	contentMathMLName: string;
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