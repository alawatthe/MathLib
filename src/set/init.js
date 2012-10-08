// ## <a id="Set"></a>Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// MathLib.set([1, 2, 3, 4, 5])
// ```

MathLib.set =	function (elements) {

  if (!elements) {
    elements = [];
  }
  elements = elements.sort(MathLib.compare);

  elements = elements.filter(function (x, i, a) {
    return x !== a[i + 1];
  });


  elements[proto] = prototypes.set;
  Object.defineProperties(elements, {
    card: {
      get: function () {
        return this.length;
      }
    }
  });
  return elements;

};


// Setting the .constructor property to MathLib.set
MathLib.extendPrototype('set', 'constructor', MathLib.set);


// Setting the .type property to 'set'
MathLib.extendPrototype('set', 'type', 'set');