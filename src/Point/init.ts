/*es6
import {hypot, isEqual, isZero} from 'Functn';
import {toLaTeX, toMathML, toString, warning} from 'meta';
import {Complex} from 'Complex';
import {Line} from 'Line';
import {Vector} from 'Vector';
es6*/

/// import Complex, Vector

/**
 * The point implementation of MathLib makes calculations with point in
 * arbitrary dimensions possible.
 *
 * MathLib uses the homogeneous form of a point for calculations and storage.
 *
 * To create the point (4, 2) on the two dimensional plane use
 * `new MathLib.Point([4, 2, 1])`
 * Alternatively you can use
 * `new MathLib.Point(4, 2)`
 * The 1 will be added for you.
 *
 * @class
 * @augments Vector
 * @this {Point}
 */
export class Point extends Vector implements Drawable, Printable  {
	type = 'point';

	dimension: number;

	constructor (coords: any[]) {
		super(arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);

		this.dimension = 2;

	}
