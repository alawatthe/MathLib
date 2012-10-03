// ### SVG.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'line', function (line, userOpt) {
  var svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line'),
      points  = this.lineEndPoints(line),
      defaultOpt = {
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
      svgLine.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgLine.setAttributeNS(null, 'x1', points[0][0]);
  svgLine.setAttributeNS(null, 'y1', points[0][1]);
  svgLine.setAttributeNS(null, 'x2', points[1][0]);
  svgLine.setAttributeNS(null, 'y2', points[1][1]);

  // Draw the line
  layer.element.appendChild(svgLine);

  return this;
});