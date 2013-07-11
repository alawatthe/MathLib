// ## <a id="Rational" href="http://mathlib.de/en/docs/Rational">Rational</a>
// MathLib.Rational is the MathLib implementation of rational numbers.
//
//
// #### Simple use case:
// ```
// // Create the rational number 2/3  
// var r = new MathLib.Rational(2, 3);  
// ```

export class Rational {

	type = 'rational';

	numerator: number;
	denominator: number;

	constructor (numerator: number, denominator = 1) {
		if (MathLib.isZero(denominator)) {
			MathLib.error({message: 'The denominator cannot be zero.', method: 'Rational.constructor'});
			throw 'The denominator cannot be zero.';
		}
		this.numerator = numerator;
		this.denominator = denominator;
	}