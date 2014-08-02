module('EvaluationError');
test('init', 2, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.message, 'message', 'Testing .message');
	equal(e.method, 'method', 'Testing .method');
});


// Properties
test('.constructor', 1, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.constructor, MathLib.EvaluationError, 'Testing .constructor');
});


test('.type', 1, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	equal(e.type, 'evaluationError', 'Testing .type');
});


test('intanceof', 2, function () {
	var e = new MathLib.EvaluationError('message', {method: 'method'});

	ok(e instanceof MathLib.EvaluationError, 'instanceof MathLib.EvaluationError');
	ok(e instanceof Error, 'instanceof Error');
});
