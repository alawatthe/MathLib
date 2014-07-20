/*es6
import {evaluate, negative, sign} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {Complex} from 'Complex';
import {Functn} from 'Functn';
import {Integer} from 'Integer';
import {Matrix} from 'Matrix';
import {Rational} from 'Rational';
import {Vector} from 'Vector';
es6*/

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
			expr = MathLib.Expression.parse(<string>expr);
		}
		for (prop in expr) {
			if (expr.hasOwnProperty(prop)) {
				this[prop] = expr[prop];
			}
		}
	}
