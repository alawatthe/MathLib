// ### Canvas.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'text', function (str, x, y, userOpt) {
  var defaultOpt = {
        font:       'Helvetica',
        fontSize:   '16px',
        fillColor:  'rgba(0, 0, 0, 1)',
        lineColor:  'rgba(0, 0, 0, 1)',
        lineWidth:  0.05,
        dash:       [],
        dashOffset: 0,
        size:       0.4
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

  ctx.font = opt.fontSize + ' ' + opt.font;

  // Draw the text
  ctx.save();
  ctx.transform(1 / this.origZoomX,  0, 0, 1 / this.origZoomY, 0, 0);
  ctx.fillText(str, x * this.origZoomX, -y * this.origZoomY);
  ctx.restore();

  // Push the text onto the drawing Stack
  if (ctx === this.mainLayer.ctx && !opt.redraw) {
    opt.redraw = true;
    this.drawingStack.push({
      object: str,
      options: opt,
      type: 'text'
    });
  }

  return this;
});