// ### Canvas.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'point', function (point, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 1)',
        lineColor:  'rgba(0, 0, 0, 1)',
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

  // Draw the path
  ctx.beginPath();
  ctx.arc(point[0]/point[2], point[1]/point[2], 0.05, 0, 2*Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Push the point onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: point,
      options: opt,
      type: 'point'
    });
  }

  return this;
});