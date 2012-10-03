// ### Canvas.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'line', function (line, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 0)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
      points  = this.lineEndPoints(line),
      ctx, prop, opt;
      userOpt = userOpt || {};

  // Determine the layer to draw onto
  if('layer' in userOpt) {
    ctx = this[userOpt.layer + 'Layer'].ctx;
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  // Determine the drawing options
  if (userOpt.redraw) {
    opt = userOpt;
  }
  else {
    opt = this.normalizeOptions(defaultOpt, userOpt);
  }

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      ctx[prop] = opt[prop];
    }
  }

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.lineTo(points[1][0], points[1][1]);
  ctx.stroke();
  ctx.closePath();

  // Push the line onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: line,
      options: opt,
      type: 'line'
    });
  }

  return this;
});