module('MathML');
test('init', 2, function () {
  var mathML = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix></math>'),
      nodeList = [],
      cur = mathML;

  while (cur.nextNode) {
    cur = cur.nextNode;
    nodeList.push(cur.nodeName);
  }
  equal(typeof mathML, 'object', 'Testing typeof the MathML');
  deepEqual(nodeList, ['matrix', 'matrixrow', 'cn', '#text', 'cn', '#text', 'matrixrow', 'cn', '#text', 'cn', '#text'], 'Checking if the MathML was tokenized right.');
});


test('whitespaces', 2, function () {
  var mathML = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML">\n<set>\t<cn>  123  </cn><cs>String with spaces</cs> </set>\t</math>'),
      nodeList = [],
      cur = mathML;

  while (cur.nextNode) {
    cur = cur.nextNode;
    nodeList.push(cur.nodeName);
  }
  deepEqual(nodeList, ['set', 'cn', '#text', 'cs', '#text', '#text'], 'Checking if the MathML was tokenized right.');
  equal(mathML.childNodes[0].childNodes[1].innerMathML, 'String with spaces');
});



// Properties
test('.constructor', 1, function () {
  var m = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor');
});


test('.type', 1, function () {
  var m = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>');
  equal(m.type, 'MathML', 'Testing .type');
});



// Methods
test('.parse() boolean', 8, function () {
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><true/></apply></math>').parse(), true, '</and> true true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><and/><true/><false/><true/></apply></math>').parse(), false, '</and> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><false/><false/></apply></math>').parse(), false, '</or> false false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><or/><true/><false/><true/></apply></math>').parse(), true, '</or> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><false/><true/></apply></math>').parse(), true, '</xor> false false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><xor/><true/><false/><true/></apply></math>').parse(), false, '</xor> true false true');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><false/></apply></math>').parse(), true, '</not> false');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><not/><true/></apply></math>').parse(), false, '</not> true');
});


test('.parse() ci', 1, function () {
  MathLib.MathML.variables.n = 42;
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><ci>n</ci></math>').parse(), 42, '.parse() a normal number');
});


test('.parse() cn', 5, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34</cn></math>').parse(), 34, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>34.2</cn></math>').parse(), 34.2, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>.123</cn></math>').parse(), 0.123, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34E-12</cn></math>').parse(), 34e-12, '.parse() a normal number');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn>+34.345E-12</cn></math>').parse(), 34.345e-12, '.parse() a normal number');
});


test('.parse() complex', 2, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-cartesian">3<sep/>4</cn></math>').parse(), MathLib.complex([3, 4]), '.parse() complex (cartesian)');
  ok(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><cn type="complex-polar">1<sep/>3.141592653589793</cn></math>').parse().isEqual(MathLib.complex([-1, 0])), '.parse() complex (polar)');
});


test('.parse() function constructing', 6, function () {
 var expsin = MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><exp/><apply><sin/><ci>x</ci></apply></apply></lambda></math>').parse();

  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><sin/><ci>x</ci></apply></lambda></math>').parse()(0), 0, '.parse() sin');
  deepEqual(expsin(0), 1, 'exp(sin(0)) = 1');
  deepEqual(expsin.type, 'functn', 'exp(sin(x)).type');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><ident/><ci>x</ci></apply></lambda></math>').parse()(42), 42, 'The identity function');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><cn>2</cn><ci>x</ci></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><ci>x</ci><cn>2</cn></apply></lambda></math>').parse()(42), 44, 'The result of 42 + 2 should be 44');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><bvar><ci>y</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><power/><ci>x</ci><ci>y</ci></apply></lambda></math>').parse()(4, 2), 16, 'Function with two arguments');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar><ci>x</ci></bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').parse()(42), 1, 'The result of sin^2(42) + cos^2(42) should be 1');
});


test('.parse() function evaluation', 5, function () {
  MathLib.MathML.variables.n = 42;

  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><cn>42</cn></apply></math>').parse(), Math.sin(42), '.parse() apply');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><sin/><ci>n</ci></apply></math>').parse(), Math.sin(42), '.parse() sin');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><plus/><cn>1</cn><cn>2</cn><cn>3</cn></apply></math>').parse(), 6, 'plus');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><ln/><cn>42</cn></apply></math>').parse(), Math.log(42), '.parse() apply');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><factorial/><cn>6</cn></apply></math>').parse(), 720, 'factorial');
});


test('.parse() matrix', 2, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix></math>').parse(), MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply></math>').parse(), -360, '.parse() apply');
});


test('.parse() set', 4, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set></math>').parse(), MathLib.set.fromTo(1, 10), '.parse() set');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set></math>').parse(), MathLib.set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><union/><set><cn>1</cn><cn>2</cn></set><set><cn>2</cn><cn>3</cn></set></apply></math>').parse(), MathLib.set([1, 2, 3]), 'set union');
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><set><cs>A</cs><cs>B</cs><cs> </cs></set></math>').parse(), MathLib.set(['A', 'B', ' ']), '.parse() set');
});


test('.parse() vector', 1, function () {
  deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector></math>').parse(), MathLib.vector([1, 2, 3]), '.parse() vector');
});

  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn><cn>16</cn></apply></math>').parse(), 18, 'binary minus');
  // deepEqual(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><apply><minus/><cn>34</cn></apply></math>').parse(), -34, 'unary minus');

test('.toString()', 2, function (){
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><ci>x</ci><cn>2</cn></apply><apply><power/><ci>x</ci><cn>3</cn></apply></apply></lambda></math>').toString(), 'x^2+x^3');
  equal(MathLib.MathML('<math xmlns="http://www.w3.org/1998/Math/MathML"><lambda><bvar>x</bvar><domainofapplication><complexes/></domainofapplication><apply><plus/><apply><power/><apply><sin/><ci>x</ci></apply><cn>2</cn></apply><apply><power/><apply><cos/><ci>x</ci></apply><cn>2</cn></apply></apply></lambda></math>').toString(), 'sin(x)^2+cos(x)^2');
});



// Static methods
// TODO: test if the result is right
test('.isSupported()', 1, function () {
  var supp = MathLib.MathML.isSupported();
  ok(supp === true || supp === false, '.isEqual()');
});
