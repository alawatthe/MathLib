// ## <a id="Point"></a>Point
// The point implementation of MathLib makes calculations with point in
// arbitrary dimensions possible.
//
// MathLib uses the homogeneous form of a point for calculations and storage.
//
// To create the point (4, 2) on the two dimensional plane use
// `MathLib.point([4, 2, 1])`
// Alternatively you can use
// `MathLib.point(4, 2)`
// The 1 will be added for you.



prototypes.point = MathLib.vector([]);
MathLib.point = function (point) {

  if (arguments.length > 1) {
    point = Array.prototype.slice.call(arguments).concat(1);
  }

  point[proto] = prototypes.point;
  Object.defineProperties(point, {
    dim: {
      value: point.length - 1
    }
  });
  return point;

};


// Setting the .constructor property to MathLib.point
MathLib.extendPrototype('point', 'constructor', MathLib.point);


// Setting the .type property to 'point'
MathLib.extendPrototype('point', 'type', 'point');