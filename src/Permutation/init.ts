/*es6
import {sign} from 'Functn';
import {Matrix} from 'Matrix';
es6*/

/// import Functn, Matrix

/**
 * The permutation class for MathLib
 *
 * @class
 * @this {Permutation}
 */
export class Permutation {

	type = 'permutation';

	length: number;
	cycle: any[];


	constructor (p) {
		var cycle, permutation;

		if (Array.isArray(p[0])) {
			cycle = p;
			permutation = Permutation.cycleToList(cycle);
		}
		else {
			permutation = p;
			cycle = Permutation.listToCycle(permutation);
		}

		permutation.forEach((x, i) => {
			this[i] = x;
		});
		this.length = permutation.length;
		this.cycle = cycle;

	}
