// ## <a id="Permutation"></a>Permutation
prototypes.permutation = [];
MathLib.permutation = function (p) {
  var cycle, permutation, max;

  if (Array.isArray(p[0])) {
    cycle = p;
    permutation = MathLib.permutation.cycleToList(cycle);
  }
  else {
    permutation = p;
    cycle = MathLib.permutation.listToCycle(permutation);
  }

  permutation[proto] = prototypes.permutation;
  Object.defineProperties(permutation, {
    cycle: {
      value: cycle
    },
    max: {
      value: permutation.length-1
    }
  });
  return permutation;

};

//Setting the .constructor property to MathLib.matrix
MathLib.extendPrototype('permutation', 'constructor', MathLib.permutation);

//Setting the .type property to 'permutation'
MathLib.extendPrototype('permutation', 'type', 'permutation');