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
        height:             element.height.baseVal ? element.height.baseVal.value : element.height,
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
        width:              element.width.baseVal ? element.width.baseVal.value : element.width,
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
  set.origTranslateX = set.width  / 2;
  set.origTranslateY = set.height / 2;
  set.curTranslateX  = set.width  / 2;
  set.curTranslateY  = set.height / 2;
  set.origZoomX      = set.width  / ((-set.left + set.right) * set.stepSizeX); 
  set.origZoomY      = set.height / ((set.up - set.down)  * set.stepSizeY);
  set.curZoomX       = set.width  / ((-set.left + set.right) * set.stepSizeX); 
  set.curZoomY       = set.height / ((set.up - set.down)  * set.stepSizeY);


  // Create a div which contains the svg/canvas element and the contextmenu
  set.screenWrapper = document.createElement('div');
  set.screenWrapper.className = 'MathLib screenWrapper';
  element.parentNode.insertBefore(set.screenWrapper, element);
  set.screenWrapper.appendChild(element);


  // The context menu
  set.contextmenuWrapper = document.createElement('div');
  set.contextmenuWrapper.className = 'MathLib contextmenuWrapper';
  set.screenWrapper.appendChild(set.contextmenuWrapper);


  // The coordinates menu item
  contextmenu = document.createElement('ul');
  contextmenu.className = 'MathLib contextmenu';
  set.contextmenuWrapper.appendChild(contextmenu);

  var coordinates = document.createElement('li');
  coordinates.className = 'MathLib menuitem';
  coordinates.onclick = function () {
    set.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(coordinates);


  // The reset view menu item
  var reset = document.createElement('li');
  reset.className = 'MathLib menuitem';
  reset.innerHTML = 'Reset View';
  reset.onclick = function () {
    screen.resetView();
    set.contextmenuWrapper.style.setProperty('display', 'none');
  };
  contextmenu.appendChild(reset);


  // Firefox support will be enabled when FF is supporting the fullscreenchange event
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=724816
  if (document.webkitCancelFullScreen /*|| document.mozCancelFullScreen*/) {
    // The fullscreen menuitem
    // (Only enabled if the browser supports fullscreen mode)
    var fullscreen = document.createElement('li');
    fullscreen.className = 'MathLib menuitem';
    fullscreen.innerHTML = 'View Fullscreen';
    fullscreen.onclick = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        screen.enterFullscreen();
      }
      else {
        screen.exitFullscreen();
      }

      set.contextmenuWrapper.style.setProperty('display', 'none');
    };
    contextmenu.appendChild(fullscreen);


    // Handle the fullscreenchange event
    var fullscreenchange = function (evt) {
      if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        fullscreen.innerHTML = 'View Fullscreen';
        screen.resize(set.width, set.height);
        screen.translateTo(set.origTranslateX, set.origTranslateY);
      }
      else {
        fullscreen.innerHTML = 'Exit Fullscreen';
        screen.resize(window.outerWidth, window.outerHeight);
        screen.translateTo(window.outerWidth/2, window.outerHeight/2);
      }
    };

    if (document.webkitCancelFullScreen) {
      set.screenWrapper.addEventListener('webkitfullscreenchange', fullscreenchange, false);
    }
    else if (document.mozCancelFullScreen) {
      set.screenWrapper.addEventListener('mozfullscreenchange', fullscreenchange, false);
    }
  }


  for (var prop in set) {
    if (set.hasOwnProperty(prop)) {
      Object.defineProperty(screen, prop, {
        value: set[prop],
        enumerable: true,
        writable: true
      });
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
    var lengthX = 10 / this.curZoomX,
        lengthY = 10 / this.curZoomY;

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

  var menu = this.contextmenuWrapper.childNodes[0];
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  var wrapper = this.contextmenuWrapper;
  wrapper.style.setProperty('display', 'block');
  wrapper.style.setProperty('width', '100%');
  wrapper.style.setProperty('height', '100%');
  
  menu.childNodes[0].innerHTML = 'Position: (' + MathLib.round(this.getX(evt), 2) + ', ' + MathLib.round(this.getY(evt), 2) + ')';

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
    osX = evt.layerX + this.element.offsetTop;
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
    osY = evt.layerY-this.element.offsetLeft;
  }
  return (this.curTranslateY - osY) / this.curZoomY;
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
