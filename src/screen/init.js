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
        grid:               true,
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