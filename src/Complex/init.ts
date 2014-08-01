/*es6
import {abs, arccos, arcosh, coerce, coerceTo, copy, cos, cosh, divide, exp, floor, hypot, inverse, isEqual, isNegZero, isPosZero, isZero, ln, minus, negative, plus, pow, sign, sin, sinh, times, type} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {CoercionError} from 'CoercionError';
import {Integer} from 'Integer';
import {Point} from 'Point';
es6*/

/// import Functn, Point

/**
 * MathLib.Complex is the MathLib implementation of complex numbers.
 *
 * There are two ways of defining complex numbers:
 *
 * * Two numbers representing the real and the complex part.
 * * MathLib.Complex.polar(abs, arg)
 *
 * #### Simple example:
 * ```
 * // Create the complex number 1 + 2i
 * var c = new MathLib.Complex(1, 2);
 * ```
 *
 * @class
 * @this {Complex}
 */
export class Complex implements FieldElement, Printable {

	type = 'complex';

	re: any;
	im: any;

	constructor (re, im = 0) {
		if (MathLib.isNaN(re) || MathLib.isNaN(im)) {
			this.re = NaN;
			this.im = NaN;
		}
		else if (!MathLib.isFinite(re) || !MathLib.isFinite(im)) {
			this.re = Infinity;
			this.im = Infinity;
		}
		else {
			this.re = re;
			this.im = im;
		}
	}
