// ## <a id="Screen"></a>Screen
// This module contains the common methods of all drawing modules.
prototypes.screen = {};
MathLib.screen = function (id, options) {
  if (arguments.length === 0) {
    return Object.create(prototypes.screen, {});
  }

  var element = document.getElementById(id),
      screen= Object.create(prototypes.screen),
      contextmenu,
      set = {
        axisType:           'in',
        axisColor:          'black',
        axisLineWidth:      0.05,
        background:         'white',
        down:               -5,
        drag:               false,
        fillColor:          'rgba(0,255,0,0.1)',
        fillLeft:           -5,
        fillRight:          5,
        fontSize:           10,
        gridAngle:          Math.PI/6,
        gridColor:          '#cccccc',
        gridLineWidth:      0.05,
        gridType:           'cartesian',
        height:             parseInt(element.getAttribute('height'), 10),
        label:              true,
        labelColor:         'black',
        labelFont:          'Helvetica',
        labelFontSize:      '16px',
        left:               -5,
        pan:                true,
        plotColor:          'blue',
        plotLineWidth:      0.05,
        right:              5,
        stepSizeX:          1,
        stepSizeY:          1,
        state:              '',
        up:                 5,
        width:              parseInt(element.getAttribute('width'), 10),
        zoom:               true,
        zoomSpeed:          0.2
      };

  // set the options
  for (var opt in options) {
    if(options.hasOwnProperty(opt)) {
      set[opt] = options[opt];
    }
  }

  set.id             = id;
  set.element        = element;
  set.type           = element.localName;


  for (var prop in set) {
    if (set.hasOwnProperty(prop)) {
      Object.defineProperty(screen, prop, {
        value: set[prop],
        enumerable: true,
        writable: true
      });
    }
  }

  var curTransformation = MathLib.matrix([[screen.width/((screen.right-screen.left)*screen.stepSizeX), 0, screen.width/2],[0, -screen.height/((screen.up-screen.down)*screen.stepSizeY), screen.height/2],[0, 0, 1]]);
  Object.defineProperty(screen, 'curTransformation', {
    get: function (){return curTransformation;},
    set: function (x){curTransformation = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origTransformation', {
    value: MathLib.matrix([[screen.width/((screen.right-screen.left)*screen.stepSizeX), 0, screen.width/2],[0, -screen.height/((screen.up-screen.down)*screen.stepSizeY), screen.height/2],[0, 0, 1]])
  });

  Object.defineProperty(screen, 'curTranslateX', {
    get: function (){return screen.curTransformation[0][2];},
    set: function (x){screen.curTransformation[0][2] = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'curTranslateY', {
    get: function (){return screen.curTransformation[1][2];},
    set: function (y){screen.curTransformation[1][2] = y; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origTranslateX', {
    get: function (){return screen.origTransformation[0][2];},
    set: function (x){screen.origTransformation[0][2] = x;}
  });
  Object.defineProperty(screen, 'origTranslateY', {
    get: function (){return screen.origTransformation[1][2];},
    set: function (y){screen.origTransformation[1][2] = y;}
  });

  Object.defineProperty(screen, 'curZoomX', {
    get: function (){return screen.curTransformation[0][0];},
    set: function (x){screen.curTransformation[0][0] = x; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'curZoomY', {
    get: function (){return screen.curTransformation[1][1];},
    set: function (y){screen.curTransformation[1][1] = y; screen.applyTransformation();}
  });
  Object.defineProperty(screen, 'origZoomX', {
    get: function (){return screen.origTransformation[0][0];},
    set: function (x){screen.origTransformation[0][0] = x;}
  });
  Object.defineProperty(screen, 'origZoomY', {
    get: function (){return screen.origTransformation[1][1];},
    set: function (y){set.origTransformation[1][1] = y;}
  });


  // Create a div which contains the svg/canvas element and the contextmenu
  screen.screenWrapper = document.createElement('div');
  screen.screenWrapper.className = 'MathLib screenWrapper';
  element.parentNode.insertBefore(screen.screenWrapper, element);
  screen.screenWrapper.appendChild(element);


  // The context menu
  screen.contextmenuWrapper = document.createElement('div');
  screen.contextmenuWrapper.className = 'MathLib contextmenuWrapper';
  screen.screenWrapper.appendChild(screen.contextmenuWrapper);


  contextmenu = document.createElement('ul');
  contextmenu.className = 'MathLib contextmenu';
  screen.contextmenuWrapper.appendChild(contextmenu);

  // The coordinates menu item
  var coordinates = document.createElement('li');
  coordinates.className = 'MathLib menuitem';
  coordinates.innerHTML = '<span>Position</span><span style="float: right; padding-right: 10px">❯</span>';
  coordinates.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(coordinates);

  var coordinatesSubmenu = document.createElement('ul');
  coordinatesSubmenu.className = 'MathLib contextmenu submenu';
  coordinates.appendChild(coordinatesSubmenu);

  var cartesian = document.createElement('li');
  cartesian.className = 'MathLib menuitem';
  cartesian.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  coordinatesSubmenu.appendChild(cartesian);

  var polar = document.createElement('li');
  polar.className = 'MathLib menuitem';
  polar.onclick = function () {
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  coordinatesSubmenu.appendChild(polar);
  



  // The reset view menu item
  var reset = document.createElement('li');
  reset.className = 'MathLib menuitem';
  reset.innerHTML = 'Reset View';
  reset.onclick = function () {
    screen.resetView();
    screen.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(reset);


  // Firefox support will be enabled when FF is supporting the fullscreenchange event
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=724816
  if (document.webkitCancelFullScreen /*|| document.mozCancelFullScreen*/) {
    // The fullscreen menuitem
    // (Only enabled if the browser supports fullscreen mode)
    var fullscreen = document.createElement('li');
    fullscreen.className = 'MathLib menuitem';
    fullscreen.innerHTML = 'View full screen';
    fullscreen.onclick = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        screen.enterFullscreen();
      }
      else {
        screen.exitFullscreen();
      }

      screen.contextmenuWrapper.style.setProperty('display', 'none');
    };
    contextmenu.appendChild(fullscreen);


    // Handle the fullscreenchange event
    var fullscreenchange = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        fullscreen.innerHTML = 'View Fullscreen';
        screen.resize(screen.width, screen.height);
        screen.curTranslateX = screen.origTranslateX;
        screen.curTranslateY = screen.origTranslateY;
        screen.redraw();
      }
      else {
        fullscreen.innerHTML = 'Exit Fullscreen';
        screen.resize(window.outerWidth, window.outerHeight);
        screen.curTranslateX = window.outerWidth/2;
        screen.curTranslateY = window.outerHeight/2;
        screen.redraw();
      }
    };

    if (document.webkitCancelFullScreen) {
      screen.screenWrapper.addEventListener('webkitfullscreenchange', fullscreenchange, false);
    }
    else if (document.mozCancelFullScreen) {
      screen.screenWrapper.addEventListener('mozfullscreenchange', fullscreenchange, false);
    }
  }



  return screen;
};



// ### Screen.prototype.axis()
// Draws axis on the screen
//
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'axis', function (options) {
  var type, i, axisOpt, labelOpt;

  // If no options are supplied, use the default options
  if (arguments.length === 0 || type === true) {
    axisOpt = {
      lineColor: this.axisColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: this.axisLineWidth
    };
    labelOpt = {
      color: this.labelColor,
      layer: 'back',
      font:     this.labelFont,
      fontSize: this.labelFontSize
    };
    type = this.axisType;
  }

  // If the argument is false, remove the axis
  else if (type === false) {
    // TODO: remove the axis
  }

  // Else use the supplied options
  else {
    axisOpt = {
      lineColor: options.color || this.axisColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: options.lineWidth ||this.axisLineWidth
    };
    labelOpt = {
      color: options.textColor || this.labelColor,
      layer: 'back',
      font:     options.font || this.labelFont,
      fontSize: options.font || this.labelFontSize
    };
    type = options.type || this.axisType;

    // Remember the options
    this.axisColor     = axisOpt.lineColor;
    this.axisLineWidth = axisOpt.lineWidth;
    this.axisType      = type;
    this.labelColor    = labelOpt.color;
    this.labelFont     = labelOpt.font;
    this.labelFontSize = labelOpt.fontSize;
  }


  if (type === 'in') {
    var lengthX = 10 / this.origZoomX,
        lengthY = 10 / this.origZoomY;

    this.line([[-50, 0], [50, 0]], axisOpt);
    this.line([[0, -50], [0, 50]], axisOpt);
    for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], axisOpt);
    }
    for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], axisOpt);
    }
    for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], axisOpt);
    }
    for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], axisOpt);
    }

    if (this.label) {
      for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, labelOpt);
      }
      for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, labelOpt);
      }
      for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, labelOpt);
      }
      for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, labelOpt);
      }
    }
    else if(type === 'out') {
      // TODO 
    }
  }

  return this;
});



// ### Screen.prototype.contextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'contextmenu', function (evt) {
  if (evt.preventDefault) {
   evt.preventDefault();
  }
  evt.returnValue = false;
  var x = this.getX(evt),
      y = this.getY(evt);

  var menu = this.contextmenuWrapper.childNodes[0];
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  var wrapper = this.contextmenuWrapper;
  wrapper.style.setProperty('display', 'block');
  wrapper.style.setProperty('width', '100%');
  wrapper.style.setProperty('height', '100%');
  
  menu.childNodes[0].childNodes[2].childNodes[0].innerHTML = 'cartesian: (' + MathLib.round(x, 2) + ', ' + MathLib.round(y, 2) + ')';
  menu.childNodes[0].childNodes[2].childNodes[1].innerHTML = 'polar: (' + MathLib.round(MathLib.hypot(x, y), 2) + ', ' + MathLib.round(Math.atan2(y, x), 2) + ')';

  var screen = this,
      listener = function () {
        screen.contextmenuWrapper.style.setProperty('display', 'none');
        wrapper.style.setProperty('width', '0px');
        wrapper.style.setProperty('height', '0px');
        screen.contextmenuWrapper.removeEventListener('click', listener);
      };
  this.contextmenuWrapper.addEventListener('click', listener);
});



// ### Screen.prototype.enterFullscreen()
// Displays the current plot in fullscreen mode.
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'enterFullscreen', function () {
  var elem = this.screenWrapper;  
  if (elem.requestFullScreen) {  
    elem.requestFullScreen();  
  }
  else if (elem.mozRequestFullScreen) {  
    elem.mozRequestFullScreen();  
  }
  else if (elem.webkitRequestFullScreen) {  
    elem.webkitRequestFullScreen();  
  }

  return this;
});



// ### Screen.prototype.exitFullscreen()
// Exits the fullscreen
//
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'exitFullscreen', function () {
  if (document.cancelFullScreen) {  
    document.cancelFullScreen();  
  }
  else if (document.mozCancelFullScreen) {  
    document.mozCancelFullScreen();  
  }
  else if (document.webkitCancelFullScreen) {  
    document.webkitCancelFullScreen();  
  } 

  return this;
});



// ### Screen.prototype.getEventPoint
// Creates a point based on the coordinates of an event.
//
// *@param {event}*  
// *@returns {point}*
MathLib.extendPrototype('screen', 'getEventPoint', function (evt) {
  var x, y;
  if (evt.offsetX) {
    x = evt.offsetX;
    y = evt.offsetY;
  }
  else {
    x = evt.layerX;
    y = evt.layerY;
  }
  return MathLib.point([x, y, 1]);
});



// ### Screen.prototype.getX()
// Returns the x coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
MathLib.extendPrototype('screen', 'getX', function (evt) {
  var osX;
  if (evt.offsetX) {
    osX = evt.offsetX;
  }
  else {
    osX = evt.layerX;
  }
  return (osX - this.curTranslateX) / this.curZoomX; 
});



// ### Screen.prototype.getY()
// Returns the y coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
MathLib.extendPrototype('screen', 'getY', function (evt) {
  var osY;
  if (evt.offsetY) {
    osY = evt.offsetY;
  }
  else {
    osY = evt.layerY;
  }
  return (osY - this.curTranslateY) / this.curZoomY;
});



// ### Screen.prototype.grid()
// Draws the grid on the screen
//
// *@param {object}* [options] Optional drawing options  
// *@returns {screen}* Returns the screen
MathLib.extendPrototype('screen', 'grid', function (options) {
  var angle, type, i, gridOpt;

  // If no options are supplied, use the default options
  if (arguments.length === 0 || type === true) {
    gridOpt= {
      lineColor: this.gridColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: this.gridLineWidth
    };
    type = this.gridType;
    angle = this.gridAngle;
  }
  // If the argument is false, remove the grid
  else if (type === false) {
    // TODO: remove the grid
  }
  // Else use the supplied options
  else {
    gridOpt= {
      lineColor: options.color || this.gridColor,
      fillColor: 'rgba(255, 255, 255, 0)',
      layer: 'back',
      lineWidth: options.lineWidth || this.gridLineWidth
    };
    type = options.type || this.gridType;
    angle = options.angle || this.gridAngle;

    // Remember the options
    this.girdColor     = gridOpt.lineColor;
    this.gridLineWidth = gridOpt.lineWidth;
    this.gridType      = type;
    this.gridAngle     = angle;
  }

  if (type === 'cartesian') {
    for (i = -50; i <= 50; i += this.stepSizeX) {
      this.line([[i, -50], [i, 50]], gridOpt);
    }
    for (i = -50; i <= 50; i += this.stepSizeY) {
      this.line([[-50, i], [50, i]], gridOpt);
    }
  }
  else if (type === 'polar') {
    for (i = 0; i < 2*Math.PI; i += angle) {
      this.line([[0, 0], [50*Math.cos(i), 50*Math.sin(i)]], gridOpt);
    }
    for (i = 1; i < 60; i += 1) {
      this.circle(MathLib.circle([0, 0, 1], i), gridOpt);
    }
  }

  return this;
});



// ### Screen.prototype.lineEndPoint()
// Calculates the both endpoints for the line
// for drawing purposes
//
// *@param {line|array}*  
// *@returns {array}* The array has the format [[x1, y1], [x2, y2]]
MathLib.extendPrototype('screen', 'lineEndPoints', function (l) {
  if (l.type === 'line') {
    var right = -(l[2] + l[0]* 50) / l[1],
        up    = -(l[2] + l[1]* 50) / l[0],
        left  = -(l[2] + l[0]*-50) / l[1],
        down  = -(l[2] + l[1]*-50) / l[0],
        res = [];

    if (right<50 && right>-50) {
      res.push([50, right]);
    }
    if (left<50 && left>-50) {
      res.push([-50, left]);
    }
    if (up<50 && up>-50) {
      res.push([up, 50]);
    }
    if (down<50 && down>-50) {
      res.push([down, -50]);
    }
    return res;
  }
  else {
    return l;
  }
});



// ### Screen.prototype.onmousedown()
// Handles the mousedown event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousedown', function (evt) {
  // Only start the action if the left mouse button was clicked
  if (evt.button !== 0) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Pan mode
  // Pan anyway when drag is disabled and the user clicked on an element 
  if(evt.target.tagName === 'canvas' || evt.target.tagName === 'svg' || !this.drag) {
    this.interaction = 'pan';
    this.startPoint = this.getEventPoint(evt);
    this.startTransformation = this.curTransformation.copy();
  }

  // Drag mode
  // else {
  //   this.interaction = 'drag';
  //   this.stateTarget = evt.target;
  //   this.stateTf = g.getCTM().inverse();
  //   this.stateOrigin = this.getEventPoint(evt).matrixTransform(this.stateTf);
  // }
});



// ### Screen.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousemove', function (evt) {
  var p;

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;
  

  // Pan mode
  if(this.interaction === 'pan' && this.pan) {
    p = this.getEventPoint(evt).minus(this.startPoint);
    this.curTranslateX = this.startTransformation[0][2] + p[0];
    this.curTranslateY = this.startTransformation[1][2] + p[1];
    this.redraw();
  }

  // Drag mode
  // else if(this.state === 'drag' && this.drag) {
  //   p = this.getEventPoint(evt).matrixTransform(g.getCTM().inverse());
  //   this.setCTM(this.stateTarget, this.element.createSVGMatrix().translate(p.x - this.stateOrigin.x, p.y - this.stateOrigin.y).multiply(g.getCTM().inverse()).multiply(this.stateTarget.getCTM()));
  //   this.stateOrigin = p;
  // }
});



// ### Screen.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmouseup', function (evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Go back to normal mode
  if(this.interaction === 'pan' || this.interaction === 'drag') {
    this.interaction = '';
  }

});



// ### Screen.prototype.onmousewheel()
// Handles the mousewheel event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'onmousewheel', function (evt) {
  var delta, k, p, z;

  if (!this.zoom) {
    return;
  }

  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Chrome/Safari
  if (evt.wheelDelta) {
    delta = evt.wheelDelta / 360;
  }
  // Firefox
  else {
    delta = evt.detail / -9;
  }

  z = Math.pow(1 + this.zoomSpeed, delta);
  p = this.curTransformation.inverse().times(this.getEventPoint(evt));

  // Compute new scale matrix in current mouse position
  k = MathLib.matrix([[z, 0, p[0] - p[0]*z], [0, z, p[1] - p[1]*z ], [0, 0, 1]]);

  this.curTransformation = this.curTransformation.times(k);
  this.redraw();

  if (typeof this.startTransformation === "undefined") {
    this.startTransformation = this.curTransformation.inverse();
  }

  this.startTransformation = this.startTransformation.times(k.inverse());
});
