// ### Circle.prototype.toLaTeX()
// Returns a LaTeX expression of the circle
//
// *@return {string}* 
toLaTeX() {
  return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
}