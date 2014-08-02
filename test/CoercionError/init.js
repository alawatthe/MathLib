module('CoercionError');
test('init', 2, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.message, 'message', 'Testing .message');
	equal(e.method, 'method', 'Testing .method');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.constructor, MathLib.CoercionError, 'Testing .constructor');
});


test('.type', 1, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	equal(e.type, 'coercionError', 'Testing .type');
});


test('intanceof', 2, function () {
	var e = new MathLib.CoercionError('message', {method: 'method'});

	ok(e instanceof MathLib.CoercionError, 'instanceof MathLib.CoercionError');
	ok(e instanceof Error, 'instanceof Error');
});
