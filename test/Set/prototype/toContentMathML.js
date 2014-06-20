test('.toContentMathML()', 4, function () {
	var s = new MathLib.Set([3, 3, 4, 9, 2, 8, 2]),
			e = new MathLib.Set();

	equal(s.toContentMathML(), '<set><cn type="double">2</cn><cn type="double">' +
		'3</cn><cn type="double">4</cn><cn type="double">8</cn><cn type="double">' +
		'9</cn></set>', 'Testing .toContentMathML() (set)');
	equal(s.toContentMathML({strict: true}), '<apply><csymbol cd="set1">set' +
		'</csymbol><cn type="double">2</cn><cn type="double">3</cn><cn type=' +
		'"double">4</cn><cn type="double">8</cn><cn type="double">9</cn></apply>',
		'Testing .toContentMathML() (set)');

	equal(e.toContentMathML(), '<emptyset/>', 'Testing .toContentMathML() (empty set)');
	equal(e.toContentMathML({strict: true}), '<csymbol cd="set1">emptyset</csymbol>',
		'Testing .toContentMathML() (empty set)');
});