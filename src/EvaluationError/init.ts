/// no import

/**
 * MathLib.EvaluationError is thrown if it is not possible to perform the Evaluation.
.*
 */
export var EvaluationError = function (message : string, options) {
	var tmp = Error.apply(this, arguments);
	tmp.name = this.name = 'EvaluationError';

	this.stack = tmp.stack;
	this.message = tmp.message;
	this.method = options.method;
};

var CustomError = function () {};
CustomError.prototype = Error.prototype;
EvaluationError.prototype = new CustomError();
