// ## <a id="Line"></a>Line
// The vector implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)

export class Line extends Vector {
  type = 'line';

  dim: number;

  constructor(coords: number[]) {
		super(coords);
		this.dim = 2;
  }