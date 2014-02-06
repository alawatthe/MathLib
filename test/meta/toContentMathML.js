test('.toContentMathML()', 12, function () {
	equal(MathLib.toContentMathML(NaN), '<notanumber/>');
	equal(MathLib.toContentMathML(NaN, {strict: true}), '<csymbol cd="nums1">NaN</csymbol>');

	equal(MathLib.toContentMathML(Infinity), '<infinity/>');
	equal(MathLib.toContentMathML(Infinity, {strict: true}), '<csymbol cd="nums1">infinity</csymbol>');

	equal(MathLib.toContentMathML(-Infinity), '<apply><times/><cn>-1</cn><infinity/></apply>');
	equal(MathLib.toContentMathML(-Infinity, {strict: true}), '<apply><csymbol cd="arith1">times</csymbol><cn>-1</cn><csymbol cd="nums1">infinity</csymbol></apply>');

	equal(MathLib.toContentMathML(123), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 10}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 2}), '<cn type="real" base="2">1111011</cn>');

	equal(MathLib.toContentMathML(123, {strict: true}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 10, strict: true}), '<cn type="double">123</cn>');
	equal(MathLib.toContentMathML(123, {base: 2, strict: true}), '<apply><csymbol cd="nums1">based_float</csymbol><cn type="integer">2</cn><cs>1111011</cs></apply>');
});