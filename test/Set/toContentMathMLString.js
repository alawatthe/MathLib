test('.toContentMathMLString()', 2, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();
	equal(s.toContentMathMLString(), '<set><cn>2</cn><cn>3</cn><cn>4</cn><cn>8</cn><cn>9</cn></set>', 'Testing .toContentMathMLString() (set)');
	equal(e.toContentMathMLString(), '<emptyset/>', 'Testing .toContentMathMLString() (empty set)');
});