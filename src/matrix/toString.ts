// ### Matrix.prototype.toString()
// Creating a custom .toString() function
//
// *@returns {string}*
toString() {
  return this.reduce(function (str, x) {
    return str + x.reduce(function(prev, cur) {
      return prev + '\t' + MathLib.toString(cur);
    }) + '\n';
  }, '').slice(0, -1);
}