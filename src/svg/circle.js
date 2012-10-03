// ### SVG.prototype.circle
// Draws a circle on the screen.
//
// *@param {circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'circle', function (circle, userOpt) {
  var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 255, 0.05)',
        lineColor: 'rgba(0, 0, 255, 1)',
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

  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgCircle.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgCircle.setAttributeNS(null, 'cx', circle.center[0] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'cy', circle.center[1] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'r',  circle.radius);

  // Draw the circle
  layer.element.appendChild(svgCircle);

  return this;
});