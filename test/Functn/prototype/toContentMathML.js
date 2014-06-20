test('.toContentMathML()', 26, function () {
	equal(MathLib.abs.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">abs</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.arctan2.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="transc2">arctan</csymbol>' +
		'<ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.binomial.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar>' +
		'<bvar><ci>k</ci></bvar><apply><csymbol cd="combinat1">binomial</csymbol>' +
		'<ci>n</ci><ci>k</ci></apply></lambda>');
	equal(MathLib.cbrt.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">root</csymbol><ci>x</ci><cn>3</cn></apply></lambda>');
	equal(MathLib.conjugate.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="complex1">conjugate</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.degToRad.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">times</csymbol><apply><csymbol cd="arith1">' +
		'divide</csymbol><csymbol cd="nums1">pi</csymbol><cn>180</cn></apply><ci>x</ci></apply></lambda>');
	equal(MathLib.equivalent.toContentMathML(), '<lambda><bvar><ci>x</ci>' +
		'</bvar><bvar><ci>y</ci></bvar><apply><csymbol cd="logic1">equivalent' +
		'</csymbol><ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.exp.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="transc1">exp</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.factorial.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar>' +
		'<apply><csymbol cd="integer1">factorial</csymbol><ci>n</ci></apply></lambda>');
	equal(MathLib.implies.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="logic1">implies</csymbol>' +
		'<ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.inverse.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">divide</csymbol><cn>1</cn><ci>x</ci></apply></lambda>');
	equal(MathLib.lg.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply>' +
		'<csymbol cd="transc1">log</csymbol><cn>10</cn><ci>x</ci></apply></lambda>');
	equal(MathLib.log.toContentMathML(), '<lambda><bvar><ci>b</ci></bvar><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="transc1">log</csymbol><ci>b</ci><ci>x</ci></apply></lambda>');
	equal(MathLib.logGamma.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="transc1">ln</csymbol><apply><ci>Gamma</ci><ci>x</ci></apply></apply></lambda>');
	equal(MathLib.mod.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar><bvar>' +
		'<ci>m</ci></bvar><apply><ci>mod</ci><ci>n</ci><ci>m</ci></apply></lambda>');
	equal(MathLib.negative.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">unary_minus</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.pow.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><bvar>' +
		'<ci>y</ci></bvar><apply><csymbol cd="arith1">power</csymbol><ci>x</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.rem.toContentMathML(), '<lambda><bvar><ci>n</ci></bvar><bvar>' +
		'<ci>m</ci></bvar><apply><csymbol cd="integer1">remainder</csymbol><ci>n' +
		'</ci><ci>m</ci></apply></lambda>');
	equal(MathLib.root.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<bvar><ci>y</ci></bvar><apply><csymbol cd="arith1">root</csymbol><ci>x' +
		'</ci><ci>y</ci></apply></lambda>');
	equal(MathLib.sin.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar><apply>' +
		'<csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></lambda>');
	equal(MathLib.sqrt.toContentMathML(), '<lambda><bvar><ci>x</ci></bvar>' +
		'<apply><csymbol cd="arith1">root</csymbol><ci>x</ci><cn>2</cn></apply></lambda>');

	equal(MathLib.exp(MathLib.sin).toContentMathML(), '<lambda><bvar><ci>x</ci>' +
		'</bvar><apply><csymbol cd="transc1">exp</csymbol><apply><csymbol ' +
		'cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.exp(MathLib.sin).toContentMathML()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathML(), '<lambda><bvar>' +
// '<ci>x</ci></bvar><apply><power/><apply><csymbol cd=\"transc1\">sin' +
// '</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>',
// 'MathLib.pow(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, 2).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><apply>' +
		'<csymbol cd="transc1">sin</csymbol><ci>x</ci></apply><cn>2</cn></apply></lambda>',
		'MathLib.plus(MathLib.sin, 2).toContentMathML()');
	equal(MathLib.plus(2, MathLib.sin).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">plus</csymbol><cn>2</cn>' +
		'<apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.plus(2, MathLib.sin).toContentMathML()');
	equal(MathLib.times(2, MathLib.sin).toContentMathML(), '<lambda><bvar>' +
		'<ci>x</ci></bvar><apply><csymbol cd="arith1">times</csymbol><cn>2</cn>' +
		'<apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply></apply></lambda>',
		'MathLib.times(2, MathLib.sin).toContentMathML()');
	equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML(),
		'<lambda><bvar><ci>x</ci></bvar><apply><csymbol cd="arith1">plus' +
		'</csymbol><apply><csymbol cd="transc1">sin</csymbol><ci>x</ci></apply>' +
		'<apply><csymbol cd="transc1">cos</csymbol><ci>x</ci></apply></apply>' +
		'</lambda>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathML()');
});