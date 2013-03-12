test('.toContentMathMLString()', 2, function () {
	var p = new MathLib.Polynomial([1, 2, 3]),
			q = new MathLib.Polynomial([-1, 0, 1]);
	deepEqual(p.toContentMathMLString(), '<apply><plus/><apply><times/><cn>3</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><apply><times/><cn>2</cn><ci>x</ci></apply><cn>1</cn></apply>', '.toContentMathMLString()');
	deepEqual(q.toContentMathMLString(), '<apply><plus/><apply><times/><cn>1</cn><apply><power/><ci>x</ci><cn>2</cn></apply></apply><cn>-1</cn></apply>', '.toContentMathMLString()');
});