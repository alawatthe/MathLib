// ## <a id="Complex"></a>Complex
// MathLib.Complex is the MathLib implementation of complex numbers.
//
// There are two ways of defining complex numbers:
//
// * Two numbers representing the real and the complex part.
// * MathLib.Complex.polar(abs, arg)
//
// #### Simple example:
// ```
// // Create the complex number 1 + 2i  
// var c = new MathLib.Complex(1, 2);  
// ```

export class Complex {

	type = 'complex';

	re: number;
	im: number;

	constructor (re: number, im = 0) {
		this.re = re;
		this.im = im;
	}