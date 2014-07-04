module('Vector');
test('init', 4, function () {
	var vector = new MathLib.Vector([1, 2, 3]);

	equal(vector.length, 3, 'Testing the dimension');
	equal(vector[0], 1, 'checking the entries');
	equal(vector[1], 2, 'checking the entries');
	equal(vector[2], 3, 'checking the entries');
});


if (typeof Float32Array !== 'undefined') {
	test('init with Float32Array', 4, function () {
		var vector,
				f = new Float32Array(3);

		f[0] = 1;
		f[1] = 2;
		f[2] = 3;

		vector = new MathLib.Vector(f);

		equal(vector.length, 3, 'Testing the dimension');
		equal(vector[0], 1, 'checking the entries');
		equal(vector[1], 2, 'checking the entries');
		equal(vector[2], 3, 'checking the entries');
	});
}

// Properties
test('.constructor', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.constructor, MathLib.Vector, 'Testing .constructor');
});


test('.type', 1, function () {
	var v = new MathLib.Vector([1, 2, 3]);

	equal(v.type, 'vector', 'Testing .type');
});