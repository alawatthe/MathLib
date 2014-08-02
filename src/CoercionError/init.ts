/// no import

/**
 * MathLib.CoercionError is thrown if it is not possible to perform the coercion.
 *
 */
export var CoercionError = function (message : string, options) {
	var tmp = Error.apply(this, arguments);
	tmp.name = this.name = 'CoercionError';

	this.constructor = CoercionError;
	this.message = tmp.message;
	this.method = options.method;
	this.stack = tmp.stack;
	this.type = 'coercionError';
};

CoercionError.prototype = new Error();
