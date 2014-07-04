/**
 * Custom toString function
 *
 * @param {any} x - The value to which the String should be generated
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
export var toString = function (x, options : toPresentationOptions = {}) : string {
	var str,
			base = options.base || 10;

	if (Array.isArray(x)) {
		return '[' + x.map(entry => MathLib.toString(entry, options)).join() + ']';
	}

	if (typeof x === 'object') {
		return x.toString(options);
	}

	if (typeof x === 'number') {
		if (!MathLib.isFinite(x)) {
			return x.toString();
		}

		str = Math.abs(x).toString(base);

		if (x < 0) {
			str = '-' + str;
		}
		else if (options.sign) {
			str = '+' + str;
		}

		if (options.baseSubscript) {
			if (base > 9) {
				str += '&#x208' + Math.floor(base / 10) + ';';
			}
			str += '&#x208' + (base % 10) + ';';
		}

		return str;
	}

	if (typeof x === 'boolean') {
		return x.toString();
	}

	/* istanbul ignore else */
	if (typeof x === 'string') {
		if (options.quotes) {
			return options.quotes[0] + x + options.quotes[1];
		}
		return '"' + x + '"';
	}
};