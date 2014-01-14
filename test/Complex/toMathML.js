test('.toMathML()', 1, function () {
	equal(MathLib.Complex.toMathML(), '<mrow><mtext>Complex Field</mtext><mi mathvariant="double-struck">C</mi></mrow>');
});