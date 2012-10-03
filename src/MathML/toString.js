// ### MathML.prototype.toString()
// Custom toString method
// 
// *@return{string}*
MathLib.extendPrototype('MathML', 'toString', function () {
  return this.outerMathML;
});