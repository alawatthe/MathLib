// ## <a id="Polynomial"></a>Polynomial
// The polynomial implementation of MathLib makes calculations with polynomials.
// Both the coefficients and the arguments of a polynomial can be numbers,
// complex numbers and matrices.
//
// It is as easy as
// ```
// new MathLib.Polynomial([1, 2, 3])
// ```
// to create the polynomial 1 + 2x + 3x²  
// The polynomial x¹⁰⁰ can be created with the following statement:
// ```
// new MathLib.Polynomial(100)
// ```



export class Polynomial {

  type = 'polynomial';

  constructor(polynomial) {
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

    polynomial.forEach((x,i)=>{this[i] = x});
    this.length = polynomial.length;
    this.deg = polynomial.length - 1;
    this.subdeg = (function (a) {
        var i = 0;
        if (a.length > 1 || a[0]) {
          while(i < a.length && MathLib.isZero(a[i])) {
            i++;
          }
          return i;
        }
        return Infinity;
      }(polynomial));

  }