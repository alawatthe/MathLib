/*es6
import {evaluate, hypot, isEqual, isZero, minus, negative, plus, root, sign, times, toContentMathML, toLaTeX, toMathML, toString} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {EvaluationError} from 'EvaluationError';
import {Matrix} from 'Matrix';
es6*/

/// import Functn

/**
 * The vector implementation of MathLib makes calculations with vectors of
 * arbitrary size possible. The entries of the vector can be numbers and complex
 * numbers.
 *
 * It is as easy as
 * `new MathLib.Vector([1, 2, 3])`
 * to create the following vector:
 *    ⎛ 1 ⎞
 *    ⎜ 2 ⎟
 *    ⎝ 3 ⎠
 *
 * @class
 * @this {Vector}
 */
export class Vector implements Printable  {
	type = 'vector';

	length: number;

	constructor (coords: number[]) {
		Array.prototype.forEach.call(coords, (x, i) => {
			this[i] = x;
		});
		this.length = coords.length;
	}
