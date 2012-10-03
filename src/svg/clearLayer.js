// ### SVG.prototype.clearLayer
// Clears the specified layer completely
//
// *@param {string}* The layer to be cleared ('back', 'main', 'front')  
// *@returns {svg}* Returns the svg element
MathLib.extendPrototype('svg', 'clearLayer', function () {
  var svg = this;
  Array.prototype.forEach.call(arguments, function (layer) {
    layer = svg[layer + 'Layer'].element;
    while (layer.hasChildNodes()) {
      layer.removeChild(layer.firstChild);
    }
  });
  return this;
});