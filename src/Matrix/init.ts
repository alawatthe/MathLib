/*es6
import {abs, conjugate, copy, divide, evaluate, hypot, inverse, is, isEqual, isOne, isReal, isZero, minus, plus, sign, times, times, toContentMathML, toLaTeX, toMathML, toString, type} from 'Functn';
import {toContentMathML, toLaTeX, toMathML, toString} from 'meta';
import {Circle} from 'Circle';
import {EvaluationError} from 'EvaluationError';
import {Expression} from 'Expression';
import {Permutation} from 'Permutation';
import {Point} from 'Point';
import {Vector} from 'Vector';
es6*/

/// import Functn, Permutation

/**
 * The matrix implementation of MathLib makes calculations with matrices of
 * arbitrary size possible. The entries of a matrix can be numbers and complex
 * numbers.
 *
 * It is as easy as
 * ```
 * new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 * ```
 * to create the following matrix:
 *    ⎛ 1 2 3 ⎞
 *    ⎜ 4 5 6 ⎟
 *    ⎝ 7 8 9 ⎠
 *
 * @class
 * @this {Matrix}
 */
export class Matrix implements Printable  {
	type = 'matrix';

	length: number;
	cols: number;
	rows: number;
	LUpermutation: Permutation;

	constructor (matrix) {
		if (typeof matrix === 'string') {
			// If there is a < in the string we assume it's MathML
			if (matrix.indexOf('<') > -1) {
				return MathLib.Expression.parseContentMathML(matrix).evaluate();
			}
			// else we assume it's MatLab notation
			else {
				matrix = matrix.trim().replace(/;?\n/g, '],[');
				matrix = JSON.parse('[[' + matrix + ']]');
			}
		}
		matrix.forEach((x, i) => {
			this[i] = x;
		});
		this.length = matrix.length;
		this.cols = matrix[0].length;
		this.rows = matrix.length;

	}
