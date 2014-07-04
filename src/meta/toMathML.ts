/**
 * A presentation MathML string representation
 *
 * @param {any} x - The value to which the MathML should be generated
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
export var toMathML = function (x, options : toPresentationOptions = {}) : string {
	var str,
			base = options.base || 10;

	if (Array.isArray(x)) {
		return '<mrow><mo>[</mo>' + x.map(entry => MathLib.toMathML(entry, options)).join('<mo>,</mo>') + '<mo>]</mo></mrow>';
	}

	if (typeof x === 'object' && 'toMathML' in x) {
		return x.toMathML(options);
	}

	if (typeof x === 'number') {

		if (options.sign) {
			str = MathLib.toString(Math.abs(x), {base: base});
		}
		else {
			str = MathLib.toString(x, {base: base});
		}

		str = '<mn>' + str + '</mn>';

		if (MathLib.isNaN(x)) {
			return '<mi>NaN</mi>';
		}
		else if (x === Infinity) {
			return '<mi>&#x221e;</mi>';
		}
		else if (x === -Infinity) {
			return '<mrow><mo>-</mo><mi>&#x221e;</mi></mrow>';
		}

		if (options.baseSubscript) {
			str = '<msub>' + str + '<mn>' + base + '</mn></msub>';
		}

		if (options.sign) {
			if (x < 0) {
				str = '<mo>-</mo>' + str;
			}
			else {
				str = '<mo>+</mo>' + str;
			}
		}

		return str;
	}

	if (typeof x === 'boolean') {
		return '<mi>' + x + '</mi>';
	}

	/* istanbul ignore else */
	if (typeof x === 'string') {
		if (options.quotes) {
			return '<ms lquote="' + options.quotes[0] + '" rquote="' +
				options.quotes[1] + '">' + x + '</ms>';
		}
		return '<ms>' + x + '</ms>';
	}

};