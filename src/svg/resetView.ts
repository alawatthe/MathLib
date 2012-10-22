// ### SVG.prototype.resetView
// Resets the view to the default values.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resetView', function () {
  this.ctx.setAttribute('transform', 'matrix(' + this.origZoomX + ', 0, 0, ' + this.origZoomY + ', ' + this.origTranslateX + ', ' + this.origTranslateY + ')');
  return this;
});