// ### Matrix.prototype.slice()
// This function works like the Array.prototype.slice function.
//
// *@returns {array}*
slice(f) {
	return Array.prototype.slice.apply(this, arguments);
//  var m = this;
//  return new MathLib.Matrix(
//    Array.prototype.map.call(this, function (x, i) {
//      return Array.prototype.map.call(x, function (y, j) {
//        return f(y, i, j, m);
//      });
//    })
//  );
}