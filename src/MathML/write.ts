// ### MathML.write()
// Writes MathML to an element.
//
// *@param{string}* The id of the element in which the MathML should be inserted.  
// *@param{string}* The MathML to be inserted.
write(id : string, math : string) : void {
  var formula;
  document.getElementById(id).innerHTML = '<math>' + math + '</math>';
  if (typeof MathJax !== 'undefined') {
    formula = MathJax.Hub.getAllJax(id)[0];
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
}