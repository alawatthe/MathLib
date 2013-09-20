module('Line');
test('init', 4, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.dimension, 2, 'Testing the dimension');
	equal(line[0], 3, 'Testing the entries');
	equal(line[1], 2, 'Testing the entries');
	equal(line[2], 1, 'Testing the entries');
});



// Properties
test('.constructor', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.constructor, MathLib.Line, 'Testing .constructor');
});


test('.type', 1, function () {
	var line = new MathLib.Line([3, 2, 1]);
	equal(line.type, 'line', 'Testing .type');
});