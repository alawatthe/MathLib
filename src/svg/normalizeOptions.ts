// ### SVG.prototype.normalizeOptions
// Converts the options to the internal format
//
// *@param {object}* default options  
// *@param {object}* user options  
// *@returns {object}* the normalized options
MathLib.extendPrototype('svg', 'normalizeOptions', function (defaultOpt, userOpt) {
  return {
    fill:                userOpt.fillColor  || userOpt.color          || defaultOpt.fillColor || defaultOpt.color,
    'font-family':       userOpt.font       || defaultOpt.font,
    'font-size':         userOpt.fontSize   || defaultOpt.fontSize,
    size:                userOpt.size       || defaultOpt.size,
    stroke:              userOpt.lineColor  || userOpt.color          || defaultOpt.lineColor || defaultOpt.color,
    'stroke-dasharray':  userOpt.dash       || defaultOpt.dash,
    'stroke-dashoffset': userOpt.dashOffset || defaultOpt.dashOffset,
    'stroke-width':      userOpt.lineWidth  || defaultOpt.lineWidth
  };
});