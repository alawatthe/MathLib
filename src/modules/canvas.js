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

  // Wrapper
  var wrapperDiv = document.createElement('div');
  wrapperDiv.style.setProperty('width', canvas.width + 'px');
  wrapperDiv.style.setProperty('height', canvas.height + 'px');
  wrapperDiv.style.setProperty('position', 'relative');
  canvas.element.parentNode.insertBefore(wrapperDiv, canvas.element.wrapperDiv);

  
  // The back layer
  var backLayer = document.createElement('canvas');
  backLayer.setAttribute('width', canvas.width);
  backLayer.setAttribute('height', canvas.height);
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
  frontLayer.setAttribute('width', canvas.width);
  frontLayer.setAttribute('height', canvas.height);
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
    l.ctx.transform(canvas.zoomX,  // The first coordinate must
      0,                           // only be zoomed.
      0,                           // The second coordinate must
      -canvas.zoomY,               // point in the opposite direction.
      -canvas.left * canvas.stepSizeX * canvas.zoomX,
      canvas.up   * canvas.stepSizeY * canvas.zoomY
    );

    // Placing the layers on top of each other
    l.element.style.setProperty('position', 'absolute');
    l.element.style.setProperty('left', '0px');
    l.element.style.setProperty('top', '0px');
  });

  canvas.frontLayer.element.onselectstart = function(){ return false; }; 
  return canvas;
};


// ### Canvas.prototype.circle
// Draws a circle on the screen.
//
// *@param {canvas}* The canvas to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('canvas', 'circle', function (circle, options) {
  var ctx;
  options = options || {};

  if(options.layer) {
    ctx = this[options.layer + 'Layer'].ctx; 
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  ctx.beginPath();
  ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2*Math.PI);

  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'rgba(0, 0, 255, 0.05)';
  ctx.lineWidth = '0.05';

  if ('color' in options) {
    ctx.strokeStyle = options.color;
  }
  if ('stroke' in options) {
    ctx.strokeStyle = options.stroke;
  }
  if ('stroke_width' in options) {
    ctx.lineWidth = options.stroke_width;
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
});


// ### Canvas.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')
MathLib.extendPrototype('canvas', 'clearLayer', function (layer) {
  this[layer + 'Layer'].ctx.clearRect(-5, -5, 10, 10);
});


// ### Canvas.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('canvas', 'line', function (line, options) {
  options = options || {};
  var ctx,
      points  = this.lineEndPoints(line);

  if(options.layer) {
    ctx = this[options.layer + 'Layer'].ctx; 
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = '0.05';


  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.lineTo(points[1][0], points[1][1]);

  if ('color' in options) {
    ctx.strokeStyle = options.color;
  }
  if ('stroke' in options) {
    ctx.strokeStyle = options.stroke;
  }
  if ('stroke_width' in options) {
    ctx.lineWidth = options.stroke_width;
  }

  if (('stroke_dasharray' in options) && ('mozDash' in ctx)) {
    ctx.mozDash = options.stroke_dasharray.split(',').map(parseFloat);
    ctx.mozDashOffset = parseFloat(options.stroke_dashoffset);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.mozDash = null;
});


// ### Canvas.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('canvas', 'path', function (path, options) {
  options = options || {};
  var ctx;
  if(options.layer) {
    ctx = this[options.layer + 'Layer'].ctx; 
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  ctx.beginPath();
  ctx.moveTo(path[0][0], path[0][1]);
  path.forEach(function (x) {
    ctx.lineTo(x[0], x[1]);
  });

  if ('color' in options) {
    ctx.strokeStyle = options.color;
  }
  if ('stroke' in options) {
    ctx.strokeStyle = options.stroke;
  }
  if ('stroke_width' in options) {
    ctx.lineWidth = options.stroke_width;
  }

  if (('stroke_dasharray' in options) && ('mozDash' in ctx)) {
    ctx.mozDash = options.stroke_dasharray.split(',').map(parseFloat);
    ctx.mozDashOffset = parseFloat(options.stroke_dashoffset);
  }

  ctx.stroke();
  ctx.closePath();
  ctx.mozDash = null;
});


// ### Canvas.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('canvas', 'point', function (point, options) {
  options = options || {};
  var ctx;
  if(options.layer) {
    ctx = this[options.layer + 'Layer'].ctx; 
  }
  else {
    ctx = this.mainLayer.ctx;
  }

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  ctx.lineWidth = '0.05';

  if (options.stroke) {
    ctx.strokeStyle = options.stroke;
  }
  if (options.stroke_width) {
    ctx.lineWidth = options.stroke_width;
  }
  if (options.color) {
    ctx.fillStyle = options.color;
    ctx.strokeStyle = options.color;
  }
  if (options.fill) {
    ctx.fillStyle = options.fill;
  }

  ctx.arc(point[0]/point[2], point[1]/point[2], 0.05, 0, 2*Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
});


// ### Canvas.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('canvas', 'text', function (str, x, y, options) {
  options = options || {};
  var scale = options.scale || 0.4,
      layer;


  if('layer' in options) {
    layer = this[options.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }


  layer.ctx.save();
  layer.ctx.transform(1/this.zoomX,  // The first coordinate must
      0,                             // only be zoomed.
      0,                             // The second coordinate must
      -1/this.zoomY,                 // point in the opposite direction.
      -this.left * this.stepSizeX / this.zoomX,
      this.up   * this.stepSizeY / this.zoomY
    );
  layer.ctx.font = "20px Arial";
  layer.ctx.fillText(str, x * this.zoomX, -y * this.zoomY);
  layer.ctx.restore();
});
