test('.toMathML()', 1, function () {
	equal(MathLib.Rational.toMathML(), '<mrow><mtext>Rational Field</mtext><mi mathvariant="double-struck">Q</mi></mrow>');
});