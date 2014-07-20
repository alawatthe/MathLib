/*es6
import {hypot, isEqual, isZero} from 'Functn';
import {warning} from 'meta';
import {Point} from 'Point';
import {Vector} from 'Vector';
es6*/

/// import Functn, Vector

/**
 * The line implementation of MathLib makes calculations with lines in the
 * real plane possible. (Higher dimensions will be supported later)
 *
 * @class
 * @augments Vector
 * @this {Line}
 */
export class Line extends Vector implements Drawable {
	type = 'line';

	dimension: number;

	constructor (coords: number[]) {
		super(coords);
		this.dimension = 2;
	}
