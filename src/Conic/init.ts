/*es6
import {cbrt, isZero, sec, tan, warning} from 'Functn';
import {Line} from 'Line';
import {Matrix} from 'Matrix';
import {Point} from 'Point';
es6*/

/// import Functn, Matrix

/**
 * The conic implementation of MathLib makes calculations with conics possible.
 *
 * @class Conic
 * @this {Conic}
 */
export class Conic implements Drawable {
	type = 'conic';

	primal: Matrix;
	dual: Matrix;

	constructor (primal: Matrix, dual?: Matrix) {
		if (primal.type !== 'matrix') {
			primal = new MathLib.Matrix(primal);
		}
		this.primal = primal;

		// if (!dual) {
		//   dual = primal.adjugate();
		// }
		// else if (!primal.times(dual).isScalar()) {
		//   // Throw error
		// }

		if (primal.rank() > 1) {
			Object.defineProperties(this, {
				'dual': {
					get : function () {
						return this.primal.adjugate();
					},
					set : function () {},
					enumerable : true,
					configurable : true
				}
			});
		}
		else {
			this.dual = dual;
		}

	}
