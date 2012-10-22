// ### Canvas.prototype.circle
// Draws a circle on the screen.
//
// *@param {canvas}* The canvas to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'circle', function (circle, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 255, 0.05)',
        lineColor:  'rgba(0, 0, 255, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0
      },
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
  ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Push the circle onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: circle,
      options: opt,
      type: 'circle'
    });
  }

  return this;
});