
/* jshint esnext:true */

/**
* EvaluationError is thrown if it is not possible to perform the Evaluation.
*
*/
var error = function (message, options) {
    var tmp = Error.apply(this, arguments);
    tmp.name = this.name = 'EvaluationError';

    this.stack = tmp.stack;
    this.message = tmp.message;
    this.method = options.method;

    return this;
};

var CustomError = function () {
};
CustomError.prototype = Error.prototype;
error.prototype = new CustomError();

export var EvaluationError = error;
