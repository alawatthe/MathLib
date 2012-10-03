// ### Matrix.prototype.trace()
// Calculating the trace of the matrix
//
// *@returns {number|complex}*
MathLib.extendPrototype('matrix', 'trace', function () {
  var trace = MathLib.plus.apply(null, this.diag());

  this.trace = function () {
    return trace;
  };
  return trace;
});