// ### Canvas.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'path', function (path, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 0)',
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

  // Draw the path
  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  path.forEach(function (x) {
    ctx.lineTo(x[0], x[1]);
  });
  ctx.stroke();
  ctx.closePath();

  // Push the path onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: path,
      options: opt,
      type: 'path'
    });
  }

  return this;
});