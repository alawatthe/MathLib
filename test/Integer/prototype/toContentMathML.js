test('.prototype.toContentMathML()', 3, function () {
	equal((new  MathLib.Integer('1234')).toContentMathML(), '<cn type="integer" base="10">1234</cn>');
	equal((new  MathLib.Integer('+1234')).toContentMathML(), '<cn type="integer" base="10">1234</cn>');
	equal((new  MathLib.Integer('-1234')).toContentMathML(), '<cn type="integer" base="10">-1234</cn>');
});