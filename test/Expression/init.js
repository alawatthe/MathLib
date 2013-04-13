module('Expression');
test('init', 2, function () {
	var e1 = new MathLib.Expression('sin(1)'),
			e2 = new MathLib.Expression({value: 1, subtype: 'number'});
	equal(e1.subtype, 'functionCall', 'init (string)');
	equal(e2.subtype, 'number', 'init (object)');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.Expression();
	equal(e.constructor, MathLib.Expression, 'Testing .constructor');
});

test('.type', 1, function () {
	var e = new MathLib.Expression();
	equal(e.type, 'expression', 'Testing .type');
});