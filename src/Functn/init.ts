/* jshint -W079 */
/*es6
import {coerce, epsilon, goldenRatio, isNative, type} from 'meta';
import {Expression} from 'Expression';
es6*/

/// import Expression

var functnPrototype : any = {};
declare var MathJax : any;

/*es6
var abs, arccos, arccot, arccsc, arcosh, arcoth, arcsch, arcsec, arcsin, arctan, arsech, arsinh, artanh, binomial, ceil, cbrt, conjugate, copy, cos, cosh, cot, coth, csc, csch, degToRad, exp, factorial, floor, identity, inverse, isFinite, isInt, isNaN, isNegZero, isOne, isPosZero, isPrime, isReal, isZero, lg, ln, logGamma, negative, not, radToDeg, rem, sec, sech, sign, sin, sinh, sqrt, tan, tanh, arctan2, divide, equivalent, implies, log, minus, mod, pow, root, divisors, factor, fallingFactorial, fibonacci, risingFactorial, round, trunc, and, arithMean, gcd, geoMean, harmonicMean, hypot, hypot2, isEqual, lcm, max, min, or, plus, times, xor;
es6*/


/**
 * MathLib.Functn is the MathLib implementation of mathematical functions
 *
 * Because 'Function' is a reserved word in JavaScript,
 * the class is called 'Functn'.
 *
 * @class
 * @this {Functn}
 */
export var Functn = function (f, options) {
	options = options || {};

	var functn = function (...args) {
		var firstArg,
				i : number,
				ii : number,
				x = args[0],
				arity = options.arity,
				isNumeric = arg => ['complex', 'integer', 'number', 'rational'].indexOf(MathLib.type(arg)) !== -1;


		if (args.length > 1 && args.every(isNumeric)) {
			args = MathLib.coerce.apply(null, args);
		}

		firstArg = args[0];


		if (args.length < arity ||
			(args.length === arity &&
				args.some(arg => arg === undefined || arg.type === 'functn' || arg.type === 'expression'))) {

			var bvar,
					partialAppliedExpression = options.expression.copy(),
					bvarIndex = 0;

			for (i = 0, ii = args.length; i < ii; i++) {

				if (args[i] === undefined) {
					bvarIndex++;
				}

				else if (args[i].type === 'functn') {
					// Get the variable name
					bvar = partialAppliedExpression.args[bvarIndex].value;

					// Replace the variable in the expression by the function expression
					partialAppliedExpression = partialAppliedExpression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {

							return args[i].expression.content[0];
						}
						return expr;
					});

					// Remove the variable from the list of arguments and add the new ones
					partialAppliedExpression.args.splice(bvarIndex, 1, args[i].expression.args);
					bvarIndex += args[i].expression.args.length;
				}
				else if (args[i].type === 'expression' && args[i].subtype === 'variable') {
					// Get the variable name
					bvar = partialAppliedExpression.args[bvarIndex].value;

					// Replace the variable in the expression by the function expression
					partialAppliedExpression = partialAppliedExpression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {

							return args[i];
						}
						return expr;
					});

					// Remove the variable from the list of arguments and add the new ones
					partialAppliedExpression.args.splice(bvarIndex, 1, [args[i]]);
					bvarIndex++;
				}
				else {
					// Get the variable name
					bvar = partialAppliedExpression.args[bvarIndex].value;

					// Replace the variable in the expression by the argument
					partialAppliedExpression = partialAppliedExpression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {
							return args[i];
						}
						return expr;
					});

					// Remove the variable from the list of arguments
					partialAppliedExpression.args.splice(bvarIndex, 1);
				}
			}


			return MathLib.Functn(function() {
				var j : number,
						jj : number,
						argus = [],
						argumentsIndex = 0;

				for (j = 0, jj = args.length; j < jj; j++) {
					if (args[j] === undefined || args[j].type === 'expression') {
						argus.push(arguments[argumentsIndex]);
						argumentsIndex++;
					}
					else if (args[j].type === 'functn') {
						argus.push(args[j](arguments[argumentsIndex]));
						argumentsIndex++;
					}
					else {
						argus.push(args[j]);
					}
				}

				argus = argus.concat(Array.prototype.slice.call(arguments, argumentsIndex));

				return f.apply(this, argus);
			}, {
				expression: partialAppliedExpression
			});
		}
		else if (firstArg.type === 'complex') {
			return firstArg[options.name].apply(firstArg, Array.prototype.slice.call(arguments, 1));
		}
		else if (args.every(arg => ['function', 'undefined', 'object'].indexOf(typeof arg) === -1)) {
			return f.apply(null, args);
		}
		else if (x.type === 'functn') {

			// x -> f(x)
			// y -> g(y)
			// y -> f(g(y))
			var bvar = options.expression.args[0].value,
					composition = options.expression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {
							expr = x.expression.content[0];
						}
						return expr;
					});

			return new MathLib.Functn(function (y) {
					return f(x(y));
				}, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						args: x.expression.args,
						content: composition.content
					})
				});
		}
		else if (typeof x === 'function') {
			return function (y) {
				return f(x(y));
			};
		}
		else if (firstArg.type === 'integer' || firstArg.type === 'rational') {
			if (firstArg[options.name]) {
				return firstArg[options.name].apply(firstArg, Array.prototype.slice.call(arguments, 1));
			}
			return f(firstArg.coerceTo('number'));
		}
		else if (x.type === 'set') {
			return x.map(f);
		}
		else if (MathLib.type(firstArg) === 'array') {
			var ff,
					res = [];

			for (i = 0, ii = firstArg.length; i < ii; i++) {
				ff = f(firstArg[i]);
				if (typeof ff === 'function') {
					res.push(
						ff.apply(null, args.slice(1))
					);
				}
				else {
					res.push(ff);
				}
			}
			return res;
		}
		else {
			return x[options.name]();
		}
	};

	for (var name in functnPrototype) {
		/* istanbul ignore else */
		if (functnPrototype.hasOwnProperty(name)) {
			functn[name] = functnPrototype[name];
		}
	}
	(<any>functn).type = 'functn';
	(<any>functn).constructor = MathLib.Functn;


	Object.defineProperties(functn, {
		args: {value: options.args},
		id: {value: options.name},
		expression: {value: options.expression}
	});

	return functn;
};

var exports = {};
var fns : any = {};
