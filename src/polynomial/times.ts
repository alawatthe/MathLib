// ### Polynomial.prototype.times()
// Multiplies the polynomial by a number or an other polynomial  
//
// *@param{number|Polynomial}* The multiplicator  
// *@returns {Polynomial}*
times(a) {
  var temparr = [],
      i, j;
      
  if(a.type === 'rational') {
    a = a.toNumber(); 
  }
  if (a.type === 'polynomial') {
    for (i = 0; i <= this.deg; i++) {
      for (j = 0; j <= a.deg; j++) {
        temparr[i + j] = MathLib.plus((temparr[i + j] ? temparr[i + j] : 0), MathLib.times(this[i], a[j]));
      }
    }
  }
  else {  // we we multiply it to every coefficient
    temparr = this.map(function (b) {
                              return MathLib.times(a, b);
                            });
  }
  return new MathLib.Polynomial(temparr);
}