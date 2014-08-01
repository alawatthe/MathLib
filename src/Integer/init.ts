/*es6
import {coerce, divide, isEqual, isPosZero, minus, mod, plus, pow, sign, times} from 'Functn';
import {CoercionError} from 'CoercionError';
import {Complex} from 'Complex';
import {Rational} from 'Rational';
es6*/

/// import Functn, CoercionError

/**
 * MathLib.Integer is the MathLib implementation of (arbitrary precision) integers.
 *
 *
 * #### Simple example:
 * ```
 * // Create the integer
 * var int = new MathLib.Integer('123456789');
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

		var i, res, factor, blocksize,
				inputBase = (<any>options).base || 10,
				base = Math.pow(2, 26),
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
			if (integer === 0) {
				sign = MathLib.isPosZero(integer) ? '+' : '-';
				data.push(0);
			}
			else {
				if (integer < 0) {
					sign = '-';
					integer = -integer;
				}
				while (integer) {
					data.push(integer % base);
					integer = Math.floor(integer / base);
				}
			}

		}
		else if (typeof integer === 'string') {
			if (integer[0] === '+' || integer[0] === '-') {
				sign = integer[0];
				integer = integer.slice(1);
			}

			data = [];
			blocksize = Math.floor(Math.log(Math.pow(2, 53)) / Math.log(inputBase));

			while (integer.length > blocksize) {
				data.push(new MathLib.Integer(parseInt(integer.slice(-blocksize), inputBase)));
				integer = integer.slice(0, -blocksize);
			}
			data.push(new MathLib.Integer(parseInt(integer, inputBase)));

			res = data[data.length - 1];
			factor = new MathLib.Integer(Math.pow(inputBase, blocksize));
			for (i = data.length - 2; i >= 0; i--) {
				res = res.times(factor).plus(data[i]);
			}

			data = res.data;

			/*
			data.push(
				Number(
					Array.prototype.reduceRight.call(integer, function (old, cur) {
			  		if (old.length === blocksize) {
			    		data.push(Number(cur + old));
							return '';
						}
						return cur + old;
					})
				)
			)
			*/
		}

		if ('sign' in options) {
			sign = (<any>options).sign;
		}

		this.data = data;
		this.sign = sign;
	}
