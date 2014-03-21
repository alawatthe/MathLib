test('.type()', 10, function () {
	equal(MathLib.type(new MathLib.Complex(2, 3)), 'complex', 'MathLib.type(MathLib.complex(2, 3)) = "complex"');
	equal(MathLib.type(42), 'number', 'MathLib.type(42) = "number"');
	equal(MathLib.type(['ar', 'ray']), 'array', 'MathLib.type([1,2]) = "array"');
	equal(MathLib.type({ob: 'ject'}), 'object', 'MathLib.type({obj: 42}) = "object"');
	equal(MathLib.type(true), 'boolean', 'MathLib.type(true) = "boolean"');
	equal(MathLib.type('string'), 'string', 'MathLib.type("str") = "string"');
	equal(MathLib.type(function () {}), 'function', 'MathLib.type(function(){}) = "function"');
	equal(MathLib.type(/regexp/), 'regexp', 'MathLib.type(/regexp/) = "regexp"');
	equal(MathLib.type(undefined), 'undefined', 'MathLib.type(undefined) = "undefined"');
	equal(MathLib.type(null), 'null', 'MathLib.type(null) = "null"');
});