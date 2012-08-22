module("Functn");
test('execution', 4, function () {
  equal(MathLib.sin(0), 0, 'MathLib.sin(0) should be 0');
  equal(MathLib.exp(MathLib.sin)(0), 1, 'MathLib.exp(MathLib.sin)(0) should be 1');
  equal(MathLib.plus(MathLib.sin, 2)(0), 2, 'sin(0) + 2');
  equal(MathLib.plus(MathLib.times(MathLib.sin, MathLib.sin), MathLib.times(MathLib.cos, MathLib.cos))(42), 1, 'sin(42)^2 + cos(42)^2 = 1');
});



// Properties
test('.type', 4, function () {
  equal(MathLib.sin.type, 'functn', 'MathLib.sin.type should be functn');
  equal(MathLib.exp(MathLib.sin).type, 'functn', 'MathLib.exp(MathLib.sin).type should be functn');
  equal(MathLib.plus(1, MathLib.cos).type, 'functn', 'MathLib.plus(1, MathLib.cos).type should be functn');
  equal(MathLib.plus(MathLib.cos, 1).type, 'functn', 'MathLib.plus(MathLib.cos, 1).type should be functn');
});



// Methods
test('.toContentMathMLString()', 6, function () {
  equal(MathLib.sin.toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>', 'MathLib.sin.toContentMathMLString()');
  equal(MathLib.exp(MathLib.sin).toContentMathMLString().toString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.exp(MathLib.sin).toContentMathMLString()');
// equal(MathLib.pow(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.pow(MathLib.sin, 2).toContentMathMLString()');
  equal(MathLib.plus(MathLib.sin, 2).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply></lambda></math>', 'MathLib.plus(MathLib.sin, 2).toContentMathMLString()');
  equal(MathLib.plus(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(2, MathLib.sin).toContentMathMLString()');
  equal(MathLib.times(2, MathLib.sin).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><times/><cn>2</cn><apply><sin/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.times(2, MathLib.sin).toContentMathMLString()');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><sin/><ci>x</ci></apply><apply><cos/><ci>x</ci></apply></apply></lambda></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toContentMathMLString()');
});



test('.toLaTeX()', 7, function () {
  equal(MathLib.sin.toLaTeX(), '\\sin(x)', 'MathLib.sin.toLaTeX() should be sin(x)');
  equal(MathLib.sin.toLaTeX('z'), '\\sin(z)', 'custom bound variable');
  equal(MathLib.exp(MathLib.sin).toLaTeX(), '\\exp(\\sin(x))', 'MathLib.exp(MathLib.sin).toLaTeX() should be exp(sin(x))');
  // equal(MathLib.pow(MathLib.sin, 2).toLaTeX(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toLaTeX() = sin(x)^2');
  equal(MathLib.plus(MathLib.sin, 2).toLaTeX(), '\\sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toLaTeX() = sin(x)+2');
  equal(MathLib.plus(2, MathLib.sin).toLaTeX(), '2+\\sin(x)', 'MathLib.plus(2, MathLib.sin).toLaTeX() = 2+sin(x)');
  equal(MathLib.times(2, MathLib.sin).toLaTeX(), '2*\\sin(x)', 'MathLib.times(2, MathLib.sin).toLaTeX() = 2*sin(x)');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX(), '\\sin(x)+\\cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toLaTeX() = sin(x)+cos(x)');
});



test('.toMathMLString()', 6, function () {
  equal(MathLib.sin.toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></math>', 'MathLib.sin.toMathML()');
  equal(MathLib.exp(MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>exp</mi><mo>&af;</mo><mfenced><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mfenced></mrow></math>', 'MathLib.exp(MathLib.sin).toMathML()');
  // equal(MathLib.pow(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msup><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mn>2</mn></msup></mrow></math>', 'MathLib.pow(MathLib.sin, 2).toMathML()');
  equal(MathLib.plus(MathLib.sin, 2).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mn>2</mn></mrow></math>', 'MathLib.plus(MathLib.sin, 2).toMathML()');
  equal(MathLib.plus(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>+</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(2, MathLib.sin).toMathML()');
  equal(MathLib.times(2, MathLib.sin).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mn>2</mn><mo>*</mo><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.times(2, MathLib.sin).toMathML()');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toMathMLString(), '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow><mi>sin</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow><mo>+</mo><mrow><mi>cos</mi><mo>&af;</mo><mfenced><mi>x</mi></mfenced></mrow></mrow></math>', 'MathLib.plus(MathLib.sin, MathLib.cos).toMathML()');
});


test('.toString()', 7, function () {
  equal(MathLib.sin.toString(), 'sin(x)', 'MathLib.sin.toString() should be sin(x)');
  equal(MathLib.sin.toString('z'), 'sin(z)', 'custom bound variable');
  equal(MathLib.exp(MathLib.sin).toString(), 'exp(sin(x))', 'MathLib.exp(MathLib.sin).toString() should be exp(sin(x))');
  // equal(MathLib.pow(MathLib.sin, 2).toString(), 'sin(x)^2', 'MathLib.pow(MathLib.sin, 2).toString() = sin(x)^2');
  equal(MathLib.plus(MathLib.sin, 2).toString(), 'sin(x)+2', 'MathLib.plus(MathLib.sin, 2).toString() = sin(x)+2');
  equal(MathLib.plus(2, MathLib.sin).toString(), '2+sin(x)', 'MathLib.plus(2, MathLib.sin).toString() = 2+sin(x)');
  equal(MathLib.times(2, MathLib.sin).toString(), '2*sin(x)', 'MathLib.times(2, MathLib.sin).toString() = 2*sin(x)');
  equal(MathLib.plus(MathLib.sin, MathLib.cos).toString(), 'sin(x)+cos(x)', 'MathLib.plus(MathLib.sin, MathLib.cos).toString() = sin(x)+cos(x)');
});
