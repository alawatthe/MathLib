// ## <a id="Point"></a>Point
// The point implementation of MathLib makes calculations with point in
// arbitrary dimensions possible.
//
// MathLib uses the homogeneous form of a point for calculations and storage.
//
// To create the point (4, 2) on the two dimensional plane use
// `new MathLib.Point([4, 2, 1])`
// Alternatively you can use
// `new MathLib.Point(4, 2)`
// The 1 will be added for you.


export class Point extends Vector {

	dim: number;

	constructor(coords: number[]) {
		super(arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);

		this.dim = 2;
		this.type = 'point';

	}