/*es6
import {fallingFactorial, is, isEqual, isZero, negative, plus, sign, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {Expression} from 'Expression';
import {Functn} from 'Functn';
import {Matrix} from 'Matrix';
es6*/

/// import Functn

/**
 * The polynomial implementation of MathLib makes calculations with polynomials.
 * Both the coefficients and the arguments of a polynomial can be numbers,
 * complex numbers and matrices.
 *
 * It is as easy as
 * ```
 * new MathLib.Polynomial([1, 2, 3])
 * ```
 * to create the polynomial 1 + 2x + 3x²
 * The polynomial x¹⁰⁰ can be created with the following statement:
 * ```
 * new MathLib.Polynomial(100)
 * ```
 *
 * @class
 * @this {Polynomial}
 */
export class Polynomial implements Drawable, Printable {

	type = 'polynomial';

	deg: number;
	length: number;
	subdeg: number;

	constructor (polynomial) {
		var coefficients = [];

		if (polynomial === undefined || polynomial.length === 0) {
			polynomial = [0];
		}
		else if (typeof polynomial === 'number') {
			while (polynomial--) {
				coefficients.push(0);
			}
			coefficients.push(1);
			polynomial = coefficients;
		}

		polynomial.forEach((x, i) => {
			this[i] = x;
		});
		this.length = polynomial.length;
		this.deg = polynomial.length - 1;
		this.subdeg = (function (a) {
				var i = 0;
				if (a.length > 1 || a[0]) {
					while (i < a.length && MathLib.isZero(a[i])) {
						i++;
					}
					return i;
				}
				return Infinity;
			}(polynomial));

	}
