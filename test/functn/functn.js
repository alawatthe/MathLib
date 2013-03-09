module('Functn');
test('execution', 4, function () {
	equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
	equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
	equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
	equal(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin), MathLib.times(MathLib.cos, MathLib.cos))(42), 1, 'sin(42)^2 + cos(42)^2 = 1');
});



// Properties
test('.type', 4, function () {
	equal(MathLib.sin.type, 'functn', 'MathLib.sin.type should be functn');
	equal(MathLib.exp(MathLib.sin).type, 'functn', 'MathLib.exp(MathLib.sin).type should be functn');
	equal(MathLib.plus(1, MathLib.cos).type, 'functn', 'MathLib.plus(1, MathLib.cos).type should be functn');
	equal(MathLib.plus(MathLib.cos, 1).type, 'functn', 'MathLib.plus(MathLib.cos, 1).type should be functn');
});