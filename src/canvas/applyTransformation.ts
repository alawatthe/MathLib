// ### Canvas.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'applyTransformation', function () {
  this.clearLayer('back', 'main', 'front');
  var m = this.curTransformation;
  this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

  return this;
});