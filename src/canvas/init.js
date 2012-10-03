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