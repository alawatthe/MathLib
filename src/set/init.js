// ## <a id="Set"></a>Set
//
// To generate the set {1, 2, 3, 4, 5} you simply need to type
// ```
// MathLib.set([1, 2, 3, 4, 5])
// ```
// Multisets are also possible:
// ```
// MathLib.set([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], true)
// ```
// Creates the multiset {1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9}

MathLib.set =	function (elements, multiset) {

  if (!elements) {
    elements = [];
  }
  elements = elements.sort(MathLib.compare);

  // eliminate the duplicates
  if (!multiset) {
    elements = elements.filter(function (x, i, a) {
      return x !== a[i + 1];
    });
  }


  elements[proto] = prototypes.set;
  Object.defineProperties(elements, {
    card: {
      get: function () {
        return this.length;
      }
    },
    multiset: {
      value: !!multiset
    }
  });
  return elements;

};


// Setting the .constructor property to MathLib.set
MathLib.extendPrototype('set', 'constructor', MathLib.set);


// Setting the .type property to 'set'
MathLib.extendPrototype('set', 'type', 'set');