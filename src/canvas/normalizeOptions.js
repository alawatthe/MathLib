// ### Canvas.prototype.normalizeOptions
// Converts the options to the internal format
//
// *@param {object}* default options  
// *@param {object}* user options  
// *@returns {object}* the normalized options
MathLib.extendPrototype('canvas', 'normalizeOptions', function (defaultOpt, userOpt) {
  return {
    fillStyle:            userOpt.fillColor  || userOpt.color          || defaultOpt.fillColor || defaultOpt.color,
    lineWidth:            userOpt.lineWidth  || defaultOpt.lineWidth, 
    font:                 userOpt.font       || defaultOpt.font,
    fontSize:             userOpt.fontSize   || defaultOpt.fontSize,
    size:                 userOpt.size       || defaultOpt.size,
    mozDash:              userOpt.dash       || defaultOpt.dash,   
    mozDashOffset:        userOpt.dashOffset || defaultOpt.dashOffset, 
    strokeStyle:          userOpt.lineColor  || userOpt.color          || defaultOpt.lineColor || defaultOpt.color,
    webkitLineDash:       userOpt.dash       || defaultOpt.dash,   
    webkitLineDashOffset: userOpt.dashOffset || defaultOpt.dashOffset
  };
});