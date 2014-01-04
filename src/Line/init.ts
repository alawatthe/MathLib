/// import Functn, Vector

/**
 * The line implementation of MathLib makes calculations with lines in the 
 * real plane possible. (Higher dimensions will be supported later)
 *
 * @class
 * @augments Vector
 * @this {Line}
 */
export class Line extends Vector {
	type = 'line';

	dimension: number;

	constructor (coords: number[]) {
		super(coords);
		this.dimension = 2;
	}