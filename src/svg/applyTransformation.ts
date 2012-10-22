// ### SVG.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'applyTransformation', function () {
  var m = this.curTransformation;
  this.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
  return this;
});