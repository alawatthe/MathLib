// ### Canvas.prototype.redraw()
// Redraws the canvas
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'redraw', function () {
  var canvas = this;

  this.clearLayer('back', 'main', 'front');

  // redraw the background
  this.grid();
  this.axis();

  // redraw the main layer
  this.drawingStack.forEach(function(x, i) {
    canvas[x.type](x.object, x.options); 
  });

  return this;
});