/// no import

/**
 * MathLib.CoercionError is thrown if it is not possible to perform the coercion.
 *
 */
export var CoercionError = function (message : string, options) {
	var tmp = Error.apply(this, arguments);
	tmp.name = this.name = 'CoercionError';

	this.stack = tmp.stack;
	this.message = tmp.message;
	this.method = options.method;
};

var CustomError = function () {};
CustomError.prototype = Error.prototype;
CoercionError.prototype = new CustomError();
