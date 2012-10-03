// ### SVG.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'point', function (point, userOpt) {
  var svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 0, 1)',
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: '0.05'
      },
      layer, prop, opt;
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

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgPoint.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgPoint.setAttributeNS(null, 'cx', point[0]/point[2]);
  svgPoint.setAttributeNS(null, 'cy', point[1]/point[2]);
  svgPoint.setAttributeNS(null, 'r',  0.1);

  // Draw the path
  layer.element.appendChild(svgPoint);

  return this;
});