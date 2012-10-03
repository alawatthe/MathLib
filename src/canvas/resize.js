// ### Canvas.prototype.resize()
// Resizes the canvas
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resize', function (x, y) {
  [this.backLayer, this.mainLayer, this.frontLayer].forEach(function (l) {
    l.element.setAttribute('width',   x + 'px');
    l.element.setAttribute('height',  y + 'px');
  });
  return this;
});