
/* jshint esnext:true */


/**
* EvaluationError is thrown if it is not possible to perform the Evaluation.
*
*/
var EvaluationError = function (message, options) {
    var tmp = Error.apply(this, arguments);
    this.name = 'EvaluationError';

    this.constructor = EvaluationError;
    this.message = message;
    this.method = options.method;
    this.stack = tmp.stack;
    this.type = 'evaluationError';
};

EvaluationError.prototype = new Error();

