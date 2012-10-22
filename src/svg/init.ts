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