/// import Functn

/**
 * MathLib.Rational is the MathLib implementation of rational numbers.
 *
 * #### Simple use case:
 * ```
 * // Create the rational number 2/3  
 * var r = new MathLib.Rational(2, 3);  
 * ```
 *
 * @class
 * @this {Rational}
 */
export class Rational implements FieldElement, Printable {

	type = 'rational';

	numerator: any;
	denominator: any;

	constructor (numerator, denominator = (<any>1)) {
		if (MathLib.isZero(denominator)) {
			MathLib.error({message: 'The denominator cannot be zero.', method: 'Rational.constructor'});
			throw 'The denominator cannot be zero.';
		}
			
		if ((typeof denominator === 'number' && denominator < 0) || (denominator.type === 'integer' && denominator.sign === '-')) {
			numerator = MathLib.negative(numerator);
			denominator = MathLib.negative(denominator);	
		}
		
		this.numerator = numerator;
		this.denominator = denominator;
	}