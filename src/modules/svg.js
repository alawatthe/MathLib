// ## <a id="SVG"></a>SVG
// The module for drawing plots on SVG elements.
// A new MathLib svg element can be initialised by the following code:
// ```
// MathLib.svg('svgId')
// ```

prototypes.svg = MathLib.screen();
MathLib.svg = function (svgId) {
  var svgElement = document.getElementById(svgId),
      svg = MathLib.screen(svgId);

  svg[proto] = prototypes.svg;

  var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  ctx.setAttributeNS(null, 'transform', 'matrix(' + svg.curZoomX + ',0, 0,' + svg.curZoomY + ', ' + svg.width/2 + ', ' + svg.height/2 + ')');
  svgElement.appendChild(ctx);
  svg.ctx = ctx;

  var backLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  backLayer.className.baseVal += ' MathLib-backLayer ';
  ctx.appendChild(backLayer);
  svg.backLayer = {
    element: backLayer
  };

  var mainLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  mainLayer.className.baseVal += ' MathLib-mainLayer ';
  ctx.appendChild(mainLayer);
  svg.mainLayer = {
    element: mainLayer
  };

  var frontLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  frontLayer.className.baseVal += ' MathLib-frontLayer ';
  ctx.appendChild(frontLayer);
  svg.frontLayer = {
    element: frontLayer
  };


  // Chrome tries desperately to select some text
  svgElement.onselectstart = function(){ return false; };
  svgElement.onmousedown = function (evt) {
    svg.onmousedown(evt);
  };
  svgElement.oncontextmenu = function (evt) {
    svg.oncontextmenu(evt);
  };
  svgElement.onmousemove = function (evt) {
    svg.onmousemove(evt);
  };
  svgElement.onmouseup = function (evt) {
    svg.onmouseup(evt);
  };
  if('onmousewheel' in svgElement) {
    svgElement.onmousewheel = function (evt) {
       svg.onmousewheel(evt);
    };
  }
  else {  // Firefox names it a bit different
    svgElement.DOMMouseScroll = function (evt) {
       svg.onmousewheel(evt);
    };
  }

  return svg;
};



// ### SVG.prototype.applyTransformation
// Applies the current transformation
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'applyTransformation', function () {
  var m = this.curTransformation;
  this.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2] + ')');
  return this;
});


// ### SVG.prototype.circle
// Draws a circle on the screen.
//
// *@param {circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'circle', function (circle, userOpt) {
  var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 255, 0.05)',
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

  opt = this.normalizeOptions(defaultOpt, userOpt);

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop)) {
      svgCircle.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgCircle.setAttributeNS(null, 'cx', circle.center[0] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'cy', circle.center[1] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'r',  circle.radius);

  // Draw the circle
  layer.element.appendChild(svgCircle);

  return this;
});



// ### SVG.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'clearLayer', function () {
  var svg = this;
  Array.prototype.forEach.call(arguments, function (layer) {
    layer = svg[layer + 'Layer'].element;
    while (layer.hasChildNodes()) {
      layer.removeChild(layer.firstChild);
    }
  });
  return this;
});



// ### SVG.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'line', function (line, userOpt) {
  var svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line'),
      points  = this.lineEndPoints(line),
      defaultOpt = {
        lineColor: 'rgba(0, 0, 0, 1)',
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
      svgLine.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgLine.setAttributeNS(null, 'x1', points[0][0]);
  svgLine.setAttributeNS(null, 'y1', points[0][1]);
  svgLine.setAttributeNS(null, 'x2', points[1][0]);
  svgLine.setAttributeNS(null, 'y2', points[1][1]);

  // Draw the line
  layer.element.appendChild(svgLine);

  return this;
});



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



// ### SVG.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('svg', 'oncontextmenu', function (evt) {
  this.contextmenu(evt);
});



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
      }).slice(1, -1),
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



// ### SVG.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'point', function (point, userOpt) {
  var svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      defaultOpt = {
        fillColor: 'rgba(0, 0, 0, 1)',
        lineColor: 'rgba(0, 0, 0, 1)',
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
      svgPoint.setAttributeNS(null, prop, opt[prop]);
    }
  }

  // Set the geometry
  svgPoint.setAttributeNS(null, 'cx', point[0]/point[2]);
  svgPoint.setAttributeNS(null, 'cy', point[1]/point[2]);
  svgPoint.setAttributeNS(null, 'r',  0.1);

  // Draw the path
  layer.element.appendChild(svgPoint);

  return this;
});



// ### SVG.prototype.redraw
// This method is necessary because we want to generalize
// some methods and canvas needs the redraw method.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'redraw', function () {
  return this;
});



// ### SVG.prototype.resetView
// Resets the view to the default values.
//
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resetView', function () {
  this.ctx.setAttribute('transform', 'matrix(' + this.origZoomX + ', 0, 0, ' + this.origZoomY + ', ' + this.origTranslateX + ', ' + this.origTranslateY + ')');
  return this;
});



// ### SVG.prototype.resize()
// Resizes the SVG element
//
// *@param {number}* The new width in px.  
// *@param {number}* The new height in px.  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'resize', function (x, y) {
  this.element.setAttribute('width', x + 'px');
  this.element.setAttribute('height', y + 'px');
  return this;
});



// ### SVG.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'text', function (str, x, y, userOpt) {
  var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      defaultOpt = {
        font:      'Helvetica',
        fontSize:  '16px',
        lineColor: 'rgba(0, 0, 0, 1)',
        lineWidth: 0.05
      },
      layer, prop, opt, size;
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

  size = 1 / (3*parseFloat(opt['font-size']));

  // Set the drawing options
  for (prop in opt) {
    if (opt.hasOwnProperty(prop) && prop !== 'size') {
      svgText.setAttributeNS(null, prop, opt[prop]);
    }
  }
  svgText.setAttributeNS(null, 'transform',  'scale(' + size + ', -' + size + ')');

  // Set the geometry
  svgText.textContent = str;
  svgText.setAttributeNS(null, 'x', 1 / size * x);
  svgText.setAttributeNS(null, 'y', 1 / size * y);

  // Draw the line
  layer.element.appendChild(svgText);

  return this;
});
