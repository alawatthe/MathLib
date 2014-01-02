// ## <a id="Line"></a>Line
// The line implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)

/// import Functn, Vector
export class Line extends Vector {
	type = 'line';

	dimension: number;

	constructor (coords: number[]) {
		super(coords);
		this.dimension = 2;
	}