test('.prototype.toContentMathML()', 6, function () {
	equal((new MathLib.Integer(+1234)).toContentMathML(), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(-1234)).toContentMathML(), '<cn type="integer">-1234</cn>');

	equal((new MathLib.Integer(+1234)).toContentMathML({base: 10}), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(7)).toContentMathML({base: 2}), '<cn type="integer" base="2">111</cn>');

	equal((new MathLib.Integer(+1234)).toContentMathML({base: 10, strict: true}), '<cn type="integer">1234</cn>');
	equal((new MathLib.Integer(7)).toContentMathML({base: 2, strict: true}),
		'<apply><csymbol cd="nums1">based_integer</csymbol><cn>2</cn><cs>111</cs></apply>');
});