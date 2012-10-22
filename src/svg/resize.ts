// ### SVG.prototype.resize()
// Resizes the SVG element
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resize', function (x, y) {
  this.element.setAttribute('width', x + 'px');
  this.element.setAttribute('height', y + 'px');
  return this;
});