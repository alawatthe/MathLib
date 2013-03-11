// ## <a id="Vector" href="http://mathlib.de/en/docs/vector">Vector</a>
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `new MathLib.Vector([1, 2, 3])`
// to create the following vector:  
//    ⎛ 1 ⎞  
//    ⎜ 2 ⎟  
//    ⎝ 3 ⎠

export class Vector {
	type = 'vector';

	length: number;

	constructor (coords: number[]) {
		coords.forEach((x,i)=>{this[i] = x;});
		this.length = coords.length;
	}