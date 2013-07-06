module('Matrix');
test('init', 2, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.rows, 3, 'Testing the number of rows');
	equal(m.cols, 3, 'Testing the number of cols');
});



// Properties
test('.constructor', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.constructor, MathLib.Matrix, 'Testing .constructor');
});


test('.type', 1, function () {
	var m = new MathLib.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
	equal(m.type, 'matrix', 'Testing .type');
});