// ### MathML.write()
// Writes MathML to an element.
//
// *@param{id}* The id of the element in which the MathML should be inserted.  
// *@param{math}* The MathML to be inserted.
MathLib.extend('MathML', 'write', function (id, math) {
  var formula;
  document.getElementById(id).innerHTML = '<math>' + math + '</math>';
  if (typeof MathJax !== 'undefined') {
    formula = MathJax.Hub.getAllJax(id)[0];
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
});