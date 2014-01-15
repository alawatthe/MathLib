/// import Functn

/**
 * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
 *
 *
 * #### Simple example:
 * ```
 * // Create the integer   
 * var c = new MathLib.Complex(1, 2);  
 * ```
 *
 * @class
 * @this {Integer}
 */

export class Integer implements Printable, RingElement {

	type = 'integer';

	data : number[];
	sign : string;
	
	constructor (integer, options = {}) {
		
		var i,
				blocksize = 7,
				base = 10,
				data = [],
				sign = '+';

		if (Array.isArray(integer)) {
			i = integer.length - 1;
			while (integer[i] === 0) {
				i--;
			}
			data = integer.slice(0, i + 1);
		}
		
		if (typeof integer === 'number') {
			if (integer < 0) {
				sign = '-';
				integer = -integer;
			}
			while (integer) {
				data.push(integer % Math.pow(base, blocksize));
				integer = Math.floor(integer / Math.pow(base, blocksize));
			}
		}
		else if (typeof integer === 'string') {
			if (integer[0] === '+' || integer[0] === '-') {
				sign = integer[0];
				integer = integer.slice(1);
			}

			data.push(
				Number(
					Array.prototype.reduceRight.call(integer, function (old, cur) {
			  		if (old.length === blocksize - 1) {
			    		data.push(Number(cur + old));
							return '';
						}
						return cur + old;
					})
				)
			)
		}
		
		if ('sign' in options) {
			sign = (<any>options).sign;
		}
		
		this.data = data;
		this.sign = sign;	
	}