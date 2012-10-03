// ### SVG.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'text', function (str, x, y, userOpt) {
  var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      defaultOpt = {
        font:      'Helvetica',
        fontSize:  '16px',
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: 0.05
      },
      layer, prop, opt, size;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    layer = this[userOpt.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  size = 1 / (3*parseFloat(opt['font-size']));

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop) && prop !== 'size') {
      svgText.setAttributeNS(null, prop, opt[prop]);
    }
  }
  svgText.setAttributeNS(null, 'transform',  'scale(' + size + ', -' + size + ')');

  // Set the geometry
  svgText.textContent = str;
  svgText.setAttributeNS(null, 'x', 1 / size * x);
  svgText.setAttributeNS(null, 'y', 1 / size * y);

  // Draw the line
  layer.element.appendChild(svgText);

  return this;
});
