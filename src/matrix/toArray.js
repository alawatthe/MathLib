// ### Matrix.prototype.toArray()
// Converts the matrix to a two-dimensional array
//
// *@returns {array}*
MathLib.extendPrototype('matrix', 'toArray', function () {
    return Array.prototype.map.call(this, function (x) {
      return Array.prototype.map.call(x, function (y) {
        return MathLib.copy(y);
      });
    });
});