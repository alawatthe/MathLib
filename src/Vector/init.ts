/// import Functn

/**
 * The vector implementation of MathLib makes calculations with vectors of
 * arbitrary size possible. The entries of the vector can be numbers and complex
 * numbers.
 *
 * It is as easy as
 * `new MathLib.Vector([1, 2, 3])`
 * to create the following vector:  
 *    ⎛ 1 ⎞  
 *    ⎜ 2 ⎟  
 *    ⎝ 3 ⎠
 *
 * @class
 * @this {Vector}
 */
export class Vector implements Printable  {
	type = 'vector';

	length: number;
	constructor: any;

	constructor (coords: number[]) {
		coords.forEach((x, i) => {this[i] = x;});
		this.length = coords.length;
	}