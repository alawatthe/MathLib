test('.arcsin()', 9, function () {
	// Spec. 1: MathLib.arcsin(NaN) = NaN
	equal(MathLib.isNaN(MathLib.arcsin(NaN)), true, 'Spec. 1: MathLib.arcsin(NaN) = NaN');

	// Spec. 2: MathLib.arcsin(+0) = +0
	equal(MathLib.isPosZero(MathLib.arcsin(+0)), true, 'Spec. 2: MathLib.arcsin(+0) = +0');

	// Spec. 3: MathLib.arcsin(-0) = -0
	equal(MathLib.isNegZero(MathLib.arcsin(-0)), true, 'Spec. 3: MathLib.arcsin(-0) = -0');

	// Spec. 4: MathLib.arcsin(x) = NaN if x>1
	equal(MathLib.isNaN(MathLib.arcsin(+Infinity)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');
	equal(MathLib.isNaN(MathLib.arcsin(+2)), true, 'Spec. 4: MathLib.arcsin(x) = NaN if x>1');

	// Spec. 5: MathLib.arcsin(x) = NaN if x<-1
	equal(MathLib.isNaN(MathLib.arcsin(-Infinity)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');
	equal(MathLib.isNaN(MathLib.arcsin(-2)), true, 'Spec. 5: MathLib.arcsin(x) = NaN if x<-1');

	// Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x
	equal(MathLib.arcsin(1), Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
	equal(MathLib.arcsin(-1), -Math.PI / 2, 'Spec. 6: otherwise MathLib.arcsin(x) = inverse sine of x');
});