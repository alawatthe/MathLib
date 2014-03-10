test('.arccos()', 8, function () {
	// Spec. 1: MathLib.arccos(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arccos(NaN)), true, 'Spec. 1: MathLib.arccos(NaN) = NaN');

	// Spec. 2: MathLib.arccos(x) = NaN if x>1
	equal(MathLib.isNaN(MathLib.arccos(+Infinity)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');
	equal(MathLib.isNaN(MathLib.arccos(+2)), true, 'Spec. 2: MathLib.arccos(x) = NaN if x>1');

	// Spec. 3: MathLib.arccos(x) = NaN if x<-1
	equal(MathLib.isNaN(MathLib.arccos(-Infinity)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');
	equal(MathLib.isNaN(MathLib.arccos(-2)), true, 'Spec. 3: MathLib.arccos(x) = NaN if x<-1');

	// Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x
	equal(MathLib.arccos(1), 0, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
	equal(MathLib.arccos(+0), Math.PI / 2, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
	equal(MathLib.arccos(-1), Math.PI, 'Spec. 4: otherwise MathLib.arccos(x) = inverse cosine of x');
});