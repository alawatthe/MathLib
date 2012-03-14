// ## SVG
// The module for drawing plots on SVG elements.
// A new MathLib svg element can be initialised by the following code:
// ```
// MathLib.svg('svgId')
// ```
//
// Panning, dragging and zooming are based on Andrea Leofreddi's SVGPan.js (v 1.2.2)
// <http://code.google.com/p/svgpan/>

prototypes.svg = MathLib.screen();
MathLib.svg = function (svgId) {
  var svgElement = document.getElementById(svgId),
      svg = MathLib.screen(svgId);

  svg[proto] = prototypes.svg;
  Object.defineProperties(svg, {
    sadf: {
      value: 'foo'
    }
  });

  var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  ctx.setAttributeNS(null, 'transform', 'matrix(' + svg.zoomX + ',0, 0,'+-svg.zoomY+', ' + svg.width/2 + ', ' + svg.height/2 + ')');
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


// ### SVG.prototype.circle
// Draws a circle on the screen.
//
// *@param {circle}* The circle to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('svg', 'circle', function (circle, options) {
  var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
      set = {
        center: 'rgba(255, 0, 0, 1)',
        fill:   'rgba(0, 0, 255, 0.05)',
        stroke: 'rgba(0, 0, 255, 1)',
        stroke_width: '0.05',
        moveable: true
      },
      layer;

  options = options || {};

  if('layer' in options) {
    layer = this[options.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  for (var opt in options) {
    if (options.hasOwnProperty(opt)) {
      set[opt] = options[opt];
    }
  }

  svgCircle.setAttributeNS(null, 'cx', circle.center[0] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'cy', circle.center[1] / circle.center[2]);
  svgCircle.setAttributeNS(null, 'r',  circle.radius);
  svgCircle.setAttributeNS(null, 'contextmenu',  'fullscreenmenu');
  svgCircle.circle = circle;

  var prop;
  for (prop in set) {
    if (set.hasOwnProperty(prop)) {
      svgCircle.setAttributeNS(null, prop.replace('_', '-'), set[prop]);
    }
  }
  layer.element.appendChild(svgCircle);
});


// ### SVG.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')
MathLib.extendPrototype('svg', 'clearLayer', function (layer) {
  layer = this[layer + 'Layer'].element;
  while (layer.hasChildNodes()) {
    layer.removeChild(layer.firstChild);
  }
});


// ### SVG.prototype.line
// Draws a line on the screen.
//
// *@param {line}* The line to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('svg', 'line', function (line, options) {
  var svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line'),
      points  = this.lineEndPoints(line),
      layer;

  options = options || {};
  if('layer' in options) {
    layer = this[options.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  svgLine.setAttributeNS(null, 'x1', points[0][0]);
  svgLine.setAttributeNS(null, 'y1', points[0][1]);
  svgLine.setAttributeNS(null, 'x2', points[1][0]);
  svgLine.setAttributeNS(null, 'y2', points[1][1]);
  svgLine.setAttributeNS(null, 'stroke-width', 0.05);
  svgLine.setAttributeNS(null, 'stroke', 'black');

  svgLine.line = line;
  line.svg = svgLine;
  layer.element.appendChild(svgLine);

  if (options.hasOwnProperty('color')) {
    svgLine.setAttributeNS(null, 'fill', options.color);
    svgLine.setAttributeNS(null, 'stroke', options.color);
  }
  for (var prop in options) {
    if (options.hasOwnProperty(prop) && prop !== 'layer') {
      svgLine.setAttributeNS(null, prop.replace('_', '-'), options[prop]);
    }
  }

});


// ### SVG.prototype.getEventPoint
// Creates a SVG Point based on the coordinates of an event.
//
// *@param {event}*
MathLib.extendPrototype('svg', 'getEventPoint', function (evt) {
  var p = this.element.createSVGPoint();
  p.x = evt.clientX;
  p.y = evt.clientY;
  return p;
});


// ### SVG.prototype.oncontextmenu()
// Handles the contextmenu event
//
// *@param {event}* 
MathLib.extendPrototype('svg', 'oncontextmenu', function (evt) {
  if (evt.preventDefault) {
   evt.preventDefault();
  }
  evt.returnValue = false;

  var menu = this.contextmenu;
  menu.style.setProperty('display', 'block');
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  var wrapper = this.contextmenuWrapper;
  wrapper.style.setProperty('width', '100%');
  wrapper.style.setProperty('height', '100%'); 

  var screen = this,
      listener = function () {
        screen.contextmenu.style.setProperty('display', 'none');
        wrapper.style.setProperty('width', '0px');
        wrapper.style.setProperty('height', '0px'); 
        screen.contextmenuWrapper.removeEventListener('click', listener); 
      };
  this.contextmenuWrapper.addEventListener('click', listener);
});


// ### SVG.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}* 
MathLib.extendPrototype('svg', 'onmousedown', function (evt) {
  // Only start the action if the left mouse button was clicked
  if (evt.button !== 0) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  var svgDoc = evt.target.ownerDocument;

  var g = this.ctx;

  // Pan mode
  // Pan anyway when drag is disabled and the user clicked on an element 
  if(evt.target.tagName === "svg" || !this.drag) {
    this.state = 'pan';
    this.stateTf = g.getCTM().inverse();
    this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
  }
  
  // Drag mode
  else {
    this.state = 'drag';
    this.stateTarget = evt.target;
    this.stateTf = g.getCTM().inverse();
    this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
  }
});


// ### SVG.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}* 
MathLib.extendPrototype('svg', 'onmousemove', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  var svgDoc = evt.target.ownerDocument,
      g = this.ctx,
      p;

  // Pan mode
  if(this.state === 'pan' && this.pan) {
    p = this.getEventPoint(evt).matrixTransform(this.stateTf);
    this.setCTM(g, this.stateTf.inverse().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y));
  }
  
  // Drag mode
  else if(this.state === 'drag' && this.drag) {
    p = this.getEventPoint(evt).matrixTransform(g.getCTM().inverse());

    this.setCTM(this.stateTarget, root.createSVGMatrix().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y).multiply(g.getCTM().inverse()).multiply(this.stateTarget.getCTM()));

    this.stateOrigin = p;
  }
});


// ### SVG.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}* 
MathLib.extendPrototype('svg', 'onmouseup', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  var svgDoc = evt.target.ownerDocument;

  // Go back to normal mode
  if(this.state === 'pan' || this.state === 'drag') {
    this.state = '';
  }
});


// ### SVG.prototype.onmousewheel()
// Handles the mousewheel event
//
// *@param {event}* 
MathLib.extendPrototype('svg', 'onmousewheel', function (evt) {
  if (!this.zoom) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  var svgDoc = evt.target.ownerDocument,
      delta, g, k, p, z;

  // Chrome/Safari
  if (evt.wheelDelta) {
    delta = evt.wheelDelta / 360;
  }
  // Firefox
  else {
    delta = evt.detail / -9;
  }

  z = Math.pow(1 + this.zoomScale, delta);
  g = this.ctx;
  p = this.getEventPoint(evt);
  p = p.matrixTransform(g.getCTM().inverse());

  // Compute new scale matrix in current mouse position
  k = this.element.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);

 this.setCTM(g, g.getCTM().multiply(k));

  if (typeof this.stateTf === "undefined") {
    this.stateTf = g.getCTM().inverse();
  }

  this.stateTf = this.stateTf.multiply(k.inverse());
});


// ### SVG.prototype.resetView
// Resets the view to the default values.
MathLib.extendPrototype('svg', 'resetView', function () {
  this.ctx.setAttribute('transform', 'matrix(50, 0, 0, -50, 250, 250)');
});


// ### SVG.prototype.path
// Draws a path on the screen.
//
// *@param {path}* The path to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('svg', 'path', function (path, options) {
  var svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      pathString = 'M' + path.reduce(function(prev, cur) {
        return prev + ' L' + cur.join(' ');
      }).slice(1, -1);

  options = options || {};

  svgPath.setAttributeNS(null, 'd', pathString);
  svgPath.setAttributeNS(null, 'fill',  'transparent');
  svgPath.setAttributeNS(null, 'stroke-width',  0.05);

  if (options.hasOwnProperty('color')) {
    svgPath.setAttributeNS(null, 'fill', options.color);
    svgPath.setAttributeNS(null, 'stroke', options.color);
  }
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      svgPath.setAttributeNS(null, prop.replace('_', '-'), options[prop]);
    }
  }
  this.mainLayer.element.appendChild(svgPath);
});


// ### SVG.prototype.point
// Draws a point on the screen.
//
// *@param {point}* The point to be drawn  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('svg', 'point', function (point, options) {
  var svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

  options = options || {};

  svgPoint.setAttributeNS(null, 'cx', point[0]/point[2]);
  svgPoint.setAttributeNS(null, 'cy', point[1]/point[2]);
  svgPoint.setAttributeNS(null, 'r',  0.1);
  svgPoint.setAttributeNS(null, 'stroke-width',  0.05);

  svgPoint.point = point;

  if (options.hasOwnProperty('color')) {
    svgPoint.setAttributeNS(null, 'fill', options.color);
    svgPoint.setAttributeNS(null, 'stroke', options.color);
  }
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      svgPoint.setAttributeNS(null, prop.replace('_', '-'), options[prop]);
    }
  }
  this.mainLayer.element.appendChild(svgPoint);
  point.svg = svgPoint;

});


// ### SVG.prototype.setCTM
// Sets the transformation matrix for an elemen.
//
// *@param {SVG-element}* The SVG-element which CTM should be set
// *@param {SVG-matrix}* The SVG-matrix
MathLib.extendPrototype('svg', 'setCTM', function (element, matrix) {
  var s = 'matrix(' + matrix.a + ',' + matrix.b + ',' + matrix.c + ',' + matrix.d + ',' + matrix.e + ',' + matrix.f + ')';
  element.setAttribute('transform', s);
});


// ### SVG.prototype.text
// Writes text on the screen.
//
// *@param {str}* The string to be drawn  
// *@param {x}* The x coordinate  
// *@param {y}* The y coordinate  
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('svg', 'text', function (str, x, y, options) {
  options = options || {};
  var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      scale = options.scale || 0.4,
      layer;


  if('layer' in options) {
    layer = this[options.layer + 'Layer'];
  }
  else {
    layer = this.mainLayer;
  }

  svgText.textContent = str;
  svgText.setAttributeNS(null, 'x', 1/scale*x);
  svgText.setAttributeNS(null, 'y', -1/scale*y);
  svgText.setAttributeNS(null, 'font-size',  '1');
  svgText.setAttributeNS(null, 'stroke-width',  0.05);
  svgText.setAttributeNS(null, 'transform',  'scale(' + scale + ', -' + scale + ')');

  if (options.hasOwnProperty('color')) {
    svgText.setAttributeNS(null, 'fill', options.color);
    svgText.setAttributeNS(null, 'stroke', options.color);
  }
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      svgText.setAttributeNS(null, prop.replace('_', '-'), options[prop]);
    }
  }
  layer.element.appendChild(svgText);
});
