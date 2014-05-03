/**
 * A function converting from degree to radian
 * 
 */
fns.degToRad = {
	functn(x) {
		// Math.PI / 180 = 0.017453292519943295
		return x * 0.017453292519943295;
	},
	toContentMathML: ['<csymbol cd="arith1">times</csymbol><apply>' +
		'<csymbol cd="arith1">divide</csymbol><csymbol cd="nums1">pi</csymbol><cn>180</cn></apply>', ''],
	toLaTeX: ['\\frac{\\pi}{180}', ''],
	toMathML: ['<mfrac><mi>&pi;</mi><mn>180</mn></mfrac><mo>&#x2062;</mo>', ''],
	toString: ['π/180*', '']
};