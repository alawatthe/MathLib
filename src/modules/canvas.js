// ## <a id="Canvas"></a>Canvas
// The module for drawing plots on a canvas.
// A new canvas can be initialised by the following code:
// ```
// MathLib.canvas('canvasId')
// ```
prototypes.canvas = MathLib.screen();
MathLib.canvas = function (canvasId) {
  var canvas = MathLib.screen(canvasId);
  canvas[proto] = prototypes.canvas;
  Object.defineProperty(canvas, 'drawingStack', {value: []});

  // Wrapper
  var wrapperDiv = document.createElement('div');
  wrapperDiv.style.setProperty('width', '100%');
  wrapperDiv.style.setProperty('height', '100%');
  wrapperDiv.style.setProperty('position', 'relative');
  canvas.element.parentNode.insertBefore(wrapperDiv, canvas.element.wrapperDiv);
  
  // The back layer
  var backLayer = document.createElement('canvas');
  backLayer.setAttribute('width', canvas.width + 'px');
  backLayer.setAttribute('height', canvas.height + 'px');
  backLayer.classList.add('MathLib-backLayer');
  backLayer.classList.add('MathLib-canvas');
  canvas.backLayer = {
    ctx: backLayer.getContext('2d'),
    element: backLayer
  };
  wrapperDiv.appendChild(backLayer);

  // The main layer
  canvas.mainLayer = {
    ctx: document.getElementById(canvasId).getContext('2d'),
    element: document.getElementById(canvasId)
  };
  wrapperDiv.appendChild(canvas.mainLayer.element);

  // The front layer
  var frontLayer = document.createElement('canvas');
  frontLayer.setAttribute('width', canvas.width + 'px');
  frontLayer.setAttribute('height', canvas.height + 'px');
  frontLayer.classList.add('MathLib-frontLayer');
  frontLayer.classList.add('MathLib-canvas');
  canvas.frontLayer = {
    ctx: frontLayer.getContext('2d'),
    element: frontLayer
  };
  wrapperDiv.appendChild(frontLayer);


  var layers = [canvas.mainLayer, canvas.backLayer, canvas.frontLayer];
  

  layers.forEach(function (l) {
    // Transform the canvases
    l.ctx.save();
    l.ctx.transform(canvas.curZoomX, 0, 0, canvas.curZoomY, canvas.curTranslateX, canvas.curTranslateY);

    // Placing the layers on top of each other
    l.element.style.setProperty('position', 'absolute');
    l.element.style.setProperty('left', '0px');
    l.element.style.setProperty('top', '0px');
  });



  // Chrome tries desperately to select some text
  canvas.frontLayer.element.onselectstart = function(){ return false; };
  canvas.frontLayer.element.onmousedown = function (evt) {
    canvas.onmousedown(evt);
  };
  canvas.frontLayer.element.oncontextmenu = function (evt) {
    canvas.oncontextmenu(evt);
  };
  canvas.frontLayer.element.onmousemove = function (evt) {
    canvas.onmousemove(evt);
  };
  canvas.frontLayer.element.onmouseup = function (evt) {
    canvas.onmouseup(evt);
  };
  if('onmousewheel' in canvas.frontLayer.element) {
    canvas.frontLayer.element.onmousewheel = function (evt) {
       canvas.onmousewheel(evt);
    };
  }
  else {  // Firefox names it a bit different
    canvas.frontLayer.element.DOMMouseScroll = function (evt) {
       canvas.onmousewheel(evt);
    };
  }


  return canvas;
};



// ### Canvas.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'applyTransformation', function () {
  this.clearLayer('back', 'main', 'front');
  var m = this.curTransformation;
  this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

  return this;
});



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



// ### Canvas.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'clearLayer', function () {
  var canvas = this,
      p1 = this.curTransformation.inverse().times(MathLib.point(this.width, 0)),
      p2 = this.curTransformation.inverse().times(MathLib.point(0, this.height));
  Array.prototype.forEach.call(arguments, function (layer) {
    canvas[layer + 'Layer'].ctx.clearRect(p1[0], p1[1], p2[0]-p1[0], p2[1]-p1[1]);
  });
  return this;
});



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



// ### Canvas.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('canvas', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});



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



// ### Canvas.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'path', function (path, userOpt) {
  var defaultOpt = {
        fillColor:  'rgba(0, 0, 0, 0)',
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



// ### Canvas.prototype.redraw()
// Redraws the canvas
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'redraw', function () {
  var canvas = this;

  this.clearLayer('back', 'main', 'front');

  // redraw the background
  this.grid();
  this.axis();

  // redraw the main layer
  this.drawingStack.forEach(function(x, i) {
    canvas[x.type](x.object, x.options); 
  });

  return this;
});



// ### Canvas.prototype.resetView
// Resets the view to the default values.
//
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resetView', function () {
  this.clearLayer('back', 'main', 'front');
  var m = this.origTransformation;
  this.backLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.mainLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.frontLayer.ctx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);
  this.redraw();
  return this;
});



// ### Canvas.prototype.resize()
// Resizes the canvas
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {canvas}* Returns the canvas
MathLib.extendPrototype('canvas', 'resize', function (x, y) {
  [this.backLayer, this.mainLayer, this.frontLayer].forEach(function (l) {
    l.element.setAttribute('width',   x + 'px');
    l.element.setAttribute('height',  y + 'px');
  });
  return this;
});



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

  // Draw the path
  ctx.save();
  ctx.transform(
    1 / this.curZoomX,  0,  // The first coordinate must only be zoomed.
    0, 1 / this.curZoomY,  // The second coordinate must point in the opposite direction. 
    -this.left * this.stepSizeX / this.curZoomX,
     this.up   * this.stepSizeY / this.curZoomY
  );
  ctx.fillText(str, x * this.curZoomX, -y * this.curZoomY);
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
