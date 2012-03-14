// ## Screen
// This module contains the common methods of all drawing modules.
prototypes.screen = {};
MathLib.screen = function (id, options) {
  if (arguments.length === 0) {
    return Object.create(prototypes.screen, {});
  }

  var element = document.getElementById(id),
      screen= Object.create(prototypes.screen),
      set = {
        axisType:       'in',
        axisColor:      'black',
        axisLineWidth:  0.05,
        background:     'white',
        down:           -5,
        drag:           false,
        fillColor:      'rgba(0,255,0,0.1)',
        fillLeft:       -5,
        fillRight:      5,
        fontSize:       10,
        gridAngle:      30,
        gridColor:      '#cccccc',
        gridLineWidth:  0.05,
        gridType:       'cartesian',
        height:         element.height.baseVal ? element.height.baseVal.value : element.height,
        label:          true,
        left:           -5,
        pan:            true,
        plotColor:      'blue',
        plotLineWidth:  0.05,
        right:          5,
        stepSizeX:      1,
        stepSizeY:      1,
        state:          '',
        up:             5,
        width:          element.width.baseVal ? element.width.baseVal.value : element.width,
        zoom:           true,
        zoomScale:      0.2
      };

  set.center = [set.width/2, set.height/2];
  set.translateX = 0;
  set.translateY = 0;

  //option settings
  for (var opt in options) {
    if(options.hasOwnProperty(opt)) {
      set[opt] = options[opt];
    }
  }

  set.id      = id;
  set.element = element;
  set.type    = element.localName;
  set.zoomX   = (set.width) / ((-set.left + set.right) * set.stepSizeX); 
  set.zoomY   = (set.height) / ((set.up - set.down)  * set.stepSizeY);


  set.contextmenuWrapper = document.createElement('div');
  set.contextmenuWrapper.className = 'MathLib contextmenuWrapper';
  set.contextmenu = document.createElement('ul');
  set.contextmenu.className = 'MathLib contextmenu';

  var reset = document.createElement('li');
  reset.className = 'MathLib menuitem';
  reset.innerHTML = 'Reset View';
  reset.onclick = function () {
    screen.resetView();
    set.contextmenu.style.setProperty('display', 'none');
  };

  set.contextmenu.appendChild(reset);
  set.contextmenuWrapper.appendChild(set.contextmenu);
  document.documentElement.appendChild(set.contextmenuWrapper);

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
// *@param {string}* The type of axis to be drawn
// *@param {object}*
// *@returns {screen}*
MathLib.extendPrototype('screen', 'axis', function (axis, options) {
  var axisOptions = {
        stroke: this.axisColor,
        stroke_width: this.axisLineWidth,
        layer: 'back'
      },
      i;

  options = options || {}; 

  if (axis === 'in') {
    var lengthX = 10 / this.zoomX,
        lengthY = 10 / this.zoomY,
        labelOpt = {
          stroke: 'black',
          stroke_width: 0.03,
          layer: 'back'
        },
        textOpt = {
          stroke: 'black',
          layer: 'back',
          scale: 0.3,
          translateX: -1
        };

    this.line([[-50, 0], [50, 0]], axisOptions);
    this.line([[0, -50], [0, 50]], axisOptions);
    for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], labelOpt);
    }
    for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
      this.line([[i, -lengthY], [i, lengthY]], labelOpt);
    }
    for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], labelOpt);
    }
    for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
      this.line([[-lengthX, i], [lengthX, i]], labelOpt);
    }

    if (this.label) {
      for (i = this.stepSizeX; i <= 50 * this.stepSizeX; i += this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, textOpt);
      }
      for (i = -this.stepSizeX; i >= -50 * this.stepSizeX; i -= this.stepSizeX) {
        this.text(i + '', i - lengthX/2, -2.5*lengthY, textOpt);
      }
      for (i = this.stepSizeY; i <= 50 * this.stepSizeY; i += this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, textOpt);
      }
      for (i = -this.stepSizeY; i >= -50 * this.stepSizeY; i -= this.stepSizeY) {
        this.text(i + '', -2.5*lengthX, i - lengthY/2, textOpt);
      }
    }
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
    osX = evt.layerX-this.element.offsetTop;
  }
  return this.left + osX/this.zoomX;
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
  return this.up - osY/this.zoomY;
});


// ### Screen.prototype.grid()
// Draws the grid on the screen
//
// *@param {string}* The type of the grid to be drawn currently 'cartesian' or 
// 'polar'
// *@param {object}* [options] Optional drawing options
MathLib.extendPrototype('screen', 'grid', function (type, options) {
  options = options || {};
  if (type === true) {
    type = this.gridType;
  }
  // else if (type === false) {
    // TODO: remove the grid
  // }
  else {
    this.gridType = type;
  }

  var gc = this.gridColor = options.color || '#cccccc',
      ga = this.gridAngle = options.angle || Math.PI/6,
      gw = this.gridLineWidth = options.stroke_width || 0.05,
      i, gridOptions;

  gridOptions = {
    stroke: gc,
    stroke_width: gw,
    layer: 'back',
    fill: 'transparent'
  };

  if (type) {
    if (type === 'cartesian') {
      for (i = -50; i <= 50; i += this.stepSizeX) {
        this.line([[i, -50], [i, 50]], gridOptions);
      }
      for (i = -50; i <= 50; i += this.stepSizeY) {
        this.line([[-50, i], [50, i]], gridOptions);
      }
    }
    if (type === 'polar') {
      for (i = 0; i < 2*Math.PI; i += ga) {
        this.line([[0, 0], [50*Math.cos(i), 50*Math.sin(i)]], gridOptions);
      }
      for (i = 1; i < 60; i += 1) {
        this.circle(MathLib.circle([0, 0, 1], i), gridOptions);
      }

    }
  }
  return this;
});



// ### Screen.prototype.lineEndPoint()
// Calculates the both endpoints for the line
//
// *@param {line}*
MathLib.extendPrototype('screen', 'lineEndPoints', function (l) {
  if (l.type === 'line') {
    var right = -(l[2] + l[0]*50) / l[1],
        up    = -(l[2] + l[1]*50)    / l[0],
        left  = -(l[2] + l[0]*-50)  / l[1],
        down  = -(l[2] + l[1]*-50)  / l[0],
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
