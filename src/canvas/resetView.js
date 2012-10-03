// ### Canvas.prototype.resetView
// Resets the view to the default values.
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resetView', function () {
  this.curTransformation = this.origTransformation;
  this.redraw();
  return this;
});