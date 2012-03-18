module('MathML');
test('init', 2, function () {
  var mathML = MathLib.MathML('<matrix><matrixrow><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn></matrixrow></matrix>'),
    test = function (node) {
      var treeWalker = document.createTreeWalker(
          node,
          NodeFilter.SHOW_ELEMENT,
          { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
          false
      );
      var nodeList = [];
      while (treeWalker.nextNode()) {
        nodeList.push(treeWalker.currentNode.nodeName); 
      }

      return nodeList;
    };

  equal(typeof mathML, 'object', 'Testing typeof the MathML');
  deepEqual(test(mathML), ['matrix', 'matrixrow', 'cn', 'cn', 'matrixrow', 'cn', 'cn'], 'Checking if the MathML was tokenized right.');
});


// I need a better test...
test('.isSupported()', 1, function () {
  var supp = MathLib.MathML.isSupported();
  ok(supp === true || supp === false, '.isEqual()');
});


test('.parse()', 11, function () {
  var matrix = MathLib.MathML('<matrix><matrixrow><cn>1</cn><cn>0</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>1</cn><cn>0</cn></matrixrow><matrixrow><cn>0</cn><cn>0</cn><cn>1</cn></matrixrow></matrix>'),
      complex1 = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>'),
      complex2 = MathLib.MathML('<cn type="complex-polar">1<sep/>3.141592653589793</cn>'),
      set1 = MathLib.MathML('<set><cn>1</cn><cn>2</cn><cn>3</cn><cn>4</cn><cn>5</cn><cn>6</cn><cn>7</cn><cn>8</cn><cn>9</cn><cn>10</cn></set>'),
      set2 = MathLib.MathML('<set type="multiset"><cn>1</cn><cn>2</cn><cn>3</cn><cn>3</cn><cn>3</cn><cn>2</cn><cn>4</cn></set>'),
      vector = MathLib.MathML('<vector><cn>1</cn><cn>2</cn><cn>3</cn></vector>'),
      cs = MathLib.MathML('<set><cs>A</cs><cs>B</cs><cs> </cs></set>'),
      apply1 = MathLib.MathML('<apply><ln/><cn>42</cn></apply>'),
      apply2 = MathLib.MathML('<apply><scalarproduct/><vector><cn>1</cn><cn>2</cn><cn>3</cn></vector><vector><cn>4</cn><cn>5</cn><cn>6</cn></vector></apply>'),
      apply3 = MathLib.MathML('<apply><determinant/><matrix><matrixrow><cn>8</cn><cn>1</cn><cn>6</cn></matrixrow><matrixrow><cn>3</cn><cn>5</cn><cn>7</cn></matrixrow><matrixrow><cn>4</cn><cn>9</cn><cn>2</cn></matrixrow></matrix></apply>'),
      apply4 = MathLib.MathML('<apply><union/><set><cn>1</cn><cn>2</cn><cn>3</cn></set><set><cn>3</cn><cn>4</cn><cn>5</cn></set></apply>');

  deepEqual(complex1.parse(), MathLib.complex([3, 4]), '.parse() complex (cartesian)');
  deepEqual(complex2.parse(), MathLib.complex(1, 3.141592653589793), '.parse() complex (polar)');
  deepEqual(matrix.parse(), MathLib.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), '.parse() matrix');
  deepEqual(set1.parse(), MathLib.set.fromTo(1, 10), '.parse() set');
  deepEqual(set2.parse(), MathLib.set([1, 2, 2, 3, 3, 3, 4], true), '.parse() set');
  deepEqual(vector.parse(), MathLib.vector([1, 2, 3]), '.parse() vector');
  deepEqual(cs.parse(), MathLib.set(['A', 'B', ' ']), '.parse() cs');
  deepEqual(apply1.parse(), Math.log(42), '.parse() apply');
  deepEqual(apply2.parse(), 32, '.parse() apply');
  deepEqual(apply3.parse(), -360, '.parse() apply');
  deepEqual(apply4.parse(), MathLib.set([1, 2, 3, 4, 5]), '.parse() apply');
});



test('constructor', 1, function () {
  var m = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>');
  deepEqual(m.constructor, MathLib.MathML, 'Testing .constructor; This test fails in Safari. This constructor is not used by MathLib.js');
});


test('type', 1, function () {
  var m = MathLib.MathML('<cn type="complex-cartesian">3<sep/>4</cn>');
  equal(m.type, 'MathML', 'Testing .type');
});
