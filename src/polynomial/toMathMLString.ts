// ### Polynomial.prototype.toMathMLString()
// Returns a MathML representation of the polynomial
//
// *@returns {string}*
toMathMLString(math) {
  var str = '<mrow>' + MathLib.toMathMLString(this[this.deg], true) + '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathMLString(this.deg) + '</msup>',
      i;
  for (i=this.deg-1; i>=0; i--) {
    if (!MathLib.isZero(this[i])) {
      // if(i === 0) {
      //   str += MathLib.toMathML(this[i]);
      // }
      // else {
        str += MathLib.toMathMLString(this[i], true);
      // }

      if (i > 1) {
        str += '<mo>&#x2062;</mo><msup><mi>x</mi>' + MathLib.toMathMLString(i) + '</msup>';
      }
      else if (i === 1) {
        str += '<mo>&#x2062;</mo><mi>x</mi>';
      }
    }
  }

  str += '</mrow>';

  if (math) {
    str = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + str + '</math>';
  }

  return str;
}