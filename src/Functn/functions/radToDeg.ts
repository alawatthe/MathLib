/**
 * A function converting from radian to degree
 * 
 */
fns.radToDeg = {
	functn(x) {
		// 180 / Math.PI = 57.29577951308232
		return x * 57.29577951308232;
	},
	toContentMathML: ['<csymbol cd="arith1">times</csymbol><apply>' +
		'<csymbol cd="arith1">divide</csymbol><cn>180</cn><csymbol cd="nums1">pi</csymbol></apply>', ''],
	toLaTeX: ['\\frac{180}{\\pi}', ''],
	toMathML: ['<mfrac><mn>180</mn><mi>&pi;</mi></mfrac><mo>&#x2062;</mo>', ''],
	toString: ['180/π*', '']
};