// ### Canvas.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'clearLayer', function () {
  var canvas = this,
      p1 = this.curTransformation.inverse().times(MathLib.point(this.element.width, 0)),
      p2 = this.curTransformation.inverse().times(MathLib.point(0, this.element.height));
  Array.prototype.forEach.call(arguments, function (layer) {
    canvas[layer + 'Layer'].ctx.clearRect(p1[0], p1[1], p2[0]-p1[0], p2[1]-p1[1]);
  });
  return this;
});