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
    this.grid = false;
  }
  // Else use the supplied options
  else {
    gridOpt = {
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