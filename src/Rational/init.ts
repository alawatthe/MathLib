/*es6
import {abs, coerce, copy, isEqual, isZero, minus, negative, plus, sign, times} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {Complex} from 'Complex';
import {CoercionError} from 'CoercionError';
import {EvaluationError} from 'EvaluationError';
import {Integer} from 'Integer';
es6*/

/// import Functn

/**
 * MathLib.Rational is the MathLib implementation of rational numbers.
 *
 * #### Simple use case:
 * ```
 * // Create the rational number 2/3
 * var r = new MathLib.Rational(2, 3);
 * ```
 *
 * @class
 * @this {Rational}
 */
export class Rational implements FieldElement, Printable {

	type = 'rational';

	numerator: any;
	denominator: any;

	constructor (numerator, denominator = (<any>1)) {
		if (MathLib.isZero(denominator)) {
			throw new MathLib.EvaluationError('The denominator of a rational number cannot be zero.', {
				method: 'Rational.constructor'
			});
		}
		if (MathLib.isNaN(numerator)) {
			throw new MathLib.EvaluationError('The numerator of a rational number cannot be NaN.', {
				method: 'Rational.constructor'
			});
		}
		if (MathLib.isNaN(denominator)) {
			throw new MathLib.EvaluationError('The denominator of a rational number cannot be NaN.', {
				method: 'Rational.constructor'
			});
		}

		if ((typeof denominator === 'number' && denominator < 0) ||
			(denominator.type === 'integer' && denominator.sign === '-')) {
			numerator = MathLib.negative(numerator);
			denominator = MathLib.negative(denominator);
		}

		this.numerator = numerator;
		this.denominator = denominator;
	}
