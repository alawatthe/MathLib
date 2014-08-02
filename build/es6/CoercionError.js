
/* jshint esnext:true */


/**
* CoercionError is thrown if it is not possible to perform the coercion.
*
*/
var CoercionError = function (message, options) {
    var tmp = Error.apply(this, arguments);
    tmp.name = this.name = 'CoercionError';

    this.constructor = CoercionError;
    this.message = tmp.message;
    this.method = options.method;
    this.stack = tmp.stack;
    this.type = 'coercionError';
};

CoercionError.prototype = new Error();

