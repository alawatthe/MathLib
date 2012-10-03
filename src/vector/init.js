// ## <a id="Vector"></a>Vector
// The vector implementation of MathLib makes calculations with vectors of
// arbitrary size possible. The entries of the vector can be numbers and complex
// numbers.
//
// It is as easy as
// `MathLib.vector([1, 2, 3])`
// to create the following vector:  
//    ⎛ 1 ⎞  
//    ⎜ 2 ⎟  
//    ⎝ 3 ⎠

prototypes.vector = [];
MathLib.vector = function (vector) {
  var arr, res, i;

  if (typeof vector === "string") {
    arr = vector.split(":").map(parseFloat);
    if (arr.length === 2) {
      arr = arr.splice(1, 0, 1);
    }
    vector = [];
    for (i = arr[0]; i <= arr[2]; i += arr[1]) {
      vector.push(i);
    }
  }

  vector[proto] = prototypes.vector;
  /*Object.defineProperties(vector, {});*/
  return vector;
};


// Setting the .constructor property to MathLib.vector
MathLib.extendPrototype('vector', 'constructor', MathLib.vector);

// Setting the .type property to 'vector'
MathLib.extendPrototype('vector', 'type', 'vector');