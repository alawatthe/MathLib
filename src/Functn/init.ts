/// import Expression

var functnPrototype : any = {};
declare var MathJax : any;


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

	var functn = function (x) {
		if (typeof x === 'number' || typeof x === 'boolean') {
			return f.apply('', arguments);
		}
		else if (x.type === 'functn') {
			
			// x -> f(x)
			// y -> g(y)
			// y -> f(g(y))
			var bvar = options.expression.arguments[0].value,
					composition = options.expression.map(function (expr) {
						if (expr.subtype === 'variable' && expr.value === bvar) {
							expr = x.expression.content[0];
						}
						return expr;
					});

			return new MathLib.Functn(function (y) {return f(x(y));}, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: x.expression.arguments,
						content: composition.content
					})
				});
		}
		else if (x.type === 'expression' && x.subtype === 'variable') {
			return new MathLib.Functn(f, {
					expression: new MathLib.Expression({
						subtype: 'functionDefinition',
						arguments: x,
						content: x
					})
				});
		}
		else if (typeof x === 'function') {
			return function (y) {return f(x(y));};
		}
		else if (x.type === 'complex') {
			return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1));
		}
		else if (x.type === 'integer' || x.type === 'rational') {
			if (x[options.name]) {
				return x[options.name].apply(x, Array.prototype.slice.call(arguments, 1))
			}
			return f(x.coerceTo('number'));
		}
		else if (x.type === 'set') {
			return x.map(f);
		}
		else if (MathLib.type(x) === 'array') {
			return x.map(f);
		}
		else {
			return x[options.name]();
		}
	};

	for (var name in functnPrototype) {
		if (functnPrototype.hasOwnProperty(name)) {
			functn[name] = functnPrototype[name];
		}
	}
	(<any>functn).type = 'functn';
	(<any>functn).constructor = MathLib.Functn;


	Object.defineProperties(functn, {
		id: { value: options.name},
		expression: {value: options.expression}
	});

	return functn;
};

var exports = {};