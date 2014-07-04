/**
 * A LaTeX string representation
 *
 * @param {any} x - The value to which the LaTeX should be generated
 * @param {object} [options] - Optional options to style the output
 * @return {string}
 */
export var toLaTeX = function (x, options : toPresentationOptions = {}) : string {
	var base = options.base || 10,
			str = MathLib.toString(x, {base: base, sign: options.sign}),
			stringToLaTeX = function (str) {
				return str.replace(/\\/g, '\\textbackslash')
									.replace(/#/g, '\\#')
									.replace(/\$/g, '\\$')
									.replace(/%/g, '\\%')
									.replace(/&/g, '\\&')
									.replace(/_/g, '\\_')
									.replace(/\{/g, '\\{')
									.replace(/\}/g, '\\}')
									.replace(/\^/g, '\\^{}')
									.replace(/\\textbackslash/g, '\\textbackslash{}')
									.replace(/~/g, '\\~{}')
									.replace(/\"/g, '\\texttt{"}')
									.replace(/'/g, '{\\ttfamily\\char\'15}');
			};

	if (Array.isArray(x)) {
		return '[' + x.map(entry => MathLib.toLaTeX(entry, options)).join() + ']';
	}

	if (typeof x === 'object' && 'toLaTeX' in x) {
		return x.toLaTeX(options);
	}

	if (typeof x === 'number') {
		if (MathLib.isNaN(x)) {
			return '\\text{ NaN }';
		}
		else if (x === Infinity) {
			return '\\infty';
		}
		else if (x === -Infinity) {
			return '-\\infty';
		}

		if (options.baseSubscript) {
			str += '_{' + base + '}';
		}

		return str;
	}

	if (typeof x === 'boolean') {
		return '\\text{ ' + x + ' }';
	}

	/* istanbul ignore else */
	if (typeof x === 'string') {
		x = stringToLaTeX(x);

		if (options.quotes) {
			return stringToLaTeX(options.quotes[0]) + '\\texttt{' + x + '}' + stringToLaTeX(options.quotes[1]);
		}
		return '\\texttt{"' + x + '"}';
	}
};