// ### SVG.prototype.redraw
// This method is necessary because we want to generalize
// some methods and canvas needs the redraw method.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'redraw', function () {
  return this;
});