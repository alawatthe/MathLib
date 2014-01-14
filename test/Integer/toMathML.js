test('.toMathML()', 1, function () {
	equal(MathLib.Integer.toMathML(), '<mrow><mtext>Integer Ring</mtext><mi mathvariant="double-struck">Z</mi></mrow>');
});