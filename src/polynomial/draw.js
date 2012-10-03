// ### Polynomial.prototype.draw()
// Draws the polynomial on the screen
//
// *@param {screen}* The screen to draw the polynomial onto.  
// *@param {object}* [options] Optional drawing options.  
// *@returns {polynomial}*
MathLib.extendPrototype('polynomial', 'draw', function (screen, options) {
  var path = [], i,
      line = this;

  if (this.deg < 2) {
    if (Array.isArray(screen)) {
      screen.forEach(function (x) {
        x.line([[-50, line.valueAt(-50)], [50, line.valueAt(50)]], options);
      });
    }
    else {
      screen.line([[-50, this.valueAt(-50)], [50, this.valueAt(50)]], options);
    }
  }

  else {
    for (i = -50; i <= 50; i = Math.round((i + 0.01) * 100) / 100) {
      path.push([i, this.valueAt(i)]);
    }
    if (Array.isArray(screen)) {
      screen.forEach(function (x) {
        x.path(path, options);
      });
    }
    else {
      screen.path(path, options);
    }
  }

  return this;
});