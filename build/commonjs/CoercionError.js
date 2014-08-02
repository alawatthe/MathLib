
    'use strict';

    var MathLib = require('./meta.js');
    /**
    * MathLib.CoercionError is thrown if it is not possible to perform the coercion.
    *
    */
    module.exports = MathLib.CoercionError = function (message, options) {
        var tmp = Error.apply(this, arguments);
        tmp.name = this.name = 'CoercionError';

        this.constructor = MathLib.CoercionError;
        this.message = tmp.message;
        this.method = options.method;
        this.stack = tmp.stack;
        this.type = 'coercionError';
    };

    MathLib.CoercionError.prototype = new Error();

