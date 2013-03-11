// ### Polynomial.prototype.times()
// Multiplies the polynomial by a number or an other polynomial  
//
// *@param{number|Polynomial}* The multiplicator  
// *@returns {Polynomial}*
times(a) : Polynomial {
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
		return new MathLib.Polynomial(temparr);
	}
	else {  // we we multiply it to every coefficient
		return this.map(function (b) {
												return MathLib.times(a, b);
											});
	}
}