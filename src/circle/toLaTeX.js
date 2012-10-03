// ### Circle.prototype.toLaTeX()
// Returns a LaTeX expression of the circle
//
// *@return {string}* 
MathLib.extendPrototype('circle', 'toLaTeX', function () {
  return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
});