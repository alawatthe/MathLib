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
  //else if (type === false) {
    // TODO: remove the axis
  //}

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
    //else if(type === 'out') {
      // TODO 
    //}
  }

  return this;
});