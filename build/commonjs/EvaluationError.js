
    'use strict';

    var MathLib = require('./meta.js');
    /**
    * MathLib.EvaluationError is thrown if it is not possible to perform the Evaluation.
    .*
    */
    module.exports = MathLib.EvaluationError = function (message, options) {
        var tmp = Error.apply(this, arguments);
        tmp.name = this.name = 'EvaluationError';

        this.constructor = MathLib.EvaluationError;
        this.message = tmp.message;
        this.method = options.method;
        this.stack = tmp.stack;
        this.type = 'evaluationError';
    };

    MathLib.EvaluationError.prototype = new Error();

