// ## <a id="Line"></a>Line
// The vector implementation of MathLib makes calculations with lines in the 
// real plane possible. (Higher dimensions will be supported later)
prototypes.line = MathLib.vector([]);
MathLib.line = function (line) {

  line[proto] = prototypes.line;
  Object.defineProperties(line, {
    dim: {
      value: line.length - 1
    }
  });
  return line;
};

// Setting the .constructor property to MathLib.line
MathLib.extendPrototype('line', 'constructor', MathLib.line);

// Setting the .type property to 'line'
MathLib.extendPrototype('line', 'type', 'line');