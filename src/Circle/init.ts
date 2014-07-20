/*es6
import {isEqual, isZero, sign} from 'Functn';
import {toLaTeX} from 'meta';
import {Matrix} from 'Matrix';
import {Point} from 'Point';
es6*/

/// import Point

/**
 * Creates a MathLib circle
 * MathLib.Circle expects two arguments.
 * First the center in the form of an Array or a MathLib.point.
 * The second argument should be the radius of the circle.
 * #### Simple use case:
 *
 * ```
 * // Create a circle with center (1, 2) and radius 3.
 * var c = new MathLib.Circle([1, 2], 3);
 * c.center                   // The center of the circle (point)
 * c.radius                   // returns the radius of the circle
 * ```
 *
 * @class
 * @this {Circle}
 */
export class Circle implements Drawable {

	type = 'circle';

	center: Point;
	radius: number;

	constructor (center: any, radius: number) {

		if (center.type === undefined) {
			center = new MathLib.Point(center.concat(1));
		}

		this.center = center;
		this.radius = radius;
	}
