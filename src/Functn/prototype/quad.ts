// Recursive function for the quad method
var quadstep = function  (f, a, b, fa, fc, fb, options) {

	var h = b - a,
			c = (a + b) / 2,
			fd = f((a + c) / 2),
			fe = f((c + b) / 2),

			// Three point Simpson's rule
			Q1 = (h / 6) * (fa + 4 * fc + fb),

			// Five point double Simpson's rule
			Q2 = (h / 12) * (fa + 4 * fd + 2 * fc + 4 * fe + fb),

			// Romberg extrapolation
			Q = Q2 + (Q2 - Q1) / 15;

			options.calls = options.calls + 2;


	// Infinite or Not-a-Number function value encountered
	if (!MathLib.isFinite(Q)) {
		options.warn = Math.max(options.warn, 3);
		return Q;
	}

	// Maximum function count exceeded; singularity likely
	if (options.calls > options.maxCalls) {
		options.warn = Math.max(options.warn, 2);
		return Q;
	}

	// Accuracy over this subinterval is acceptable
	if (Math.abs(Q2 - Q) <= options.tolerance) {
		return Q;
	}

	// Minimum step size reached; singularity possible
	if (Math.abs(h) < options.minStep || c === a || c === b) {
		options.warn = Math.max(options.warn, 1);
		return Q;
	}

	// Otherwise, divide the interval into two subintervals
	return quadstep(f, a, c, fa, fd, fc, options) +
					quadstep(f, c, b, fc, fe, fb, options);
};


/**
 * Numeric evaluation of an integral using an adative simpson approach.
 *
 * Inspired by "adaptsim.m" by Walter Gander
 * and MatLab's "quad.m"
 *
 * @param {number} a The starting point
 * @param {number} b The end point
 * @param {number} options Optional options
 * @return {number}
 */
functnPrototype.quad = function (a, b, options : any = {}) : number {

	var f = this,
			warnMessage = [
				'Calculation succeded',
				'Minimum step size reached',
				'Maximum function count exceeded',
				'Infinite or NaN function value encountered'
			],
			Q;

	options.calls = 3;
	options.warn = 0;


	if (a === -Infinity) {
		a = -Number.MAX_VALUE;
	}

	if (b === 	Infinity) {
		b = Number.MAX_VALUE;
	}

	if (!('minStep' in options)) {
		options.minStep = 1e-15;
	}

	if (!('maxCalls' in options)) {
		options.maxCalls = 10000;
	}

	if (!('tolerance' in options)) {
		options.tolerance = 1e-5;
	}

	Q = quadstep(f, a, b, f(a), f((a + b) / 2), f(b), options);

	options.warnMessage = warnMessage[options.warn];

	return Q;
};
