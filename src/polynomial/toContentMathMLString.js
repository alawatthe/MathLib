// ### Polynomial.prototype.toContentMathMLString()
// Returns a content MathML representation of the polynomial
//
// *@returns {string}*
MathLib.extendPrototype('polynomial', 'toContentMathMLString', function (math) {
  var str = '<apply><plus/>', i;
  for (i=this.deg; i>=0; i--) {
    if (!MathLib.isZero(this[i])) {
      if(i === 0) {
        str += MathLib.toContentMathMLString(this[i]);
      }
      else {
        str += '<apply><times/>' + MathLib.toContentMathMLString(this[i], true);
      }

      if (i > 1) {
        str += '<apply><power/><ci>x</ci>' + MathLib.toContentMathMLString(i) + '</apply></apply>';
      }
      else if (i === 1) {
        str += '<ci>x</ci></apply>';
      }
    }
  }

  str += '</apply>';

  if (math) {
    str = '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication>' + str + '</lambda></math>';
  }

  return str;
});