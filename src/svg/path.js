// ### SVG.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'path', function (path, userOpt) {
  var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      pathString = 'M' + path.reduce(function(prev, cur) {
        return prev + ' L' + cur.join(' ');
      }),
      defaultOpt = {
        fillColor: 'rgba(255, 255, 255, 0)',
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

  // Determine the drawing options
  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgPath.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgPath.setAttributeNS(null, 'd', pathString);

  // Draw the path
  layer.element.appendChild(svgPath);

  return this;
});