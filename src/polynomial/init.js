// ## <a id="Polynomial"></a>Polynomial
// The polynomial implementation of MathLib makes calculations with polynomials.
// Both the coefficients and the arguments of a polynomial can be numbers,
// complex numbers and matrices.
//
// It is as easy as
// ```
// MathLib.polynomial([1, 2, 3])
// ```
// to create the polynomial 1 + 2x + 3x²  
// The polynomial x¹⁰⁰ can be created with the following statement:
// ```
// MathLib.polynomial(100)
// ```

prototypes.polynomial = [];
MathLib.polynomial = function (polynomial) {
  var temp = [];

  if (polynomial === undefined || polynomial.length === 0) {
    polynomial = [0];
  }

  else if (typeof polynomial === 'number') {
    while (polynomial--) {
      temp.push(0);
    }
    temp.push(1);
    polynomial = temp;
  }

  polynomial[proto] = prototypes.polynomial;
  Object.defineProperties(polynomial, {
    deg: {
      value: polynomial.length - 1
    },
    subdeg: {
      value: (function (a) {
        var i = 0;
        if (a.length > 1 || a[0]) {
          while(i < a.length && MathLib.isZero(a[i])) {
            i++;
          }
          return i;
        }
        return Infinity;
      }(polynomial))
    }
  });
  return polynomial;
};

// Setting the .constructor property to MathLib.polynomial
MathLib.extendPrototype('polynomial', 'constructor', MathLib.polynomial);

// Setting the .type property to 'polynomial'
MathLib.extendPrototype('polynomial', 'type', 'polynomial');