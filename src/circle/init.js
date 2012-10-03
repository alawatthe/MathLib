// ## <a id="Circle"></a>Circle
// MathLib.circle expects two arguments.
// First the center in the form of an Array or a MathLib.point.
// The second argument should be the radius of the circle.
//
// #### Simple use case:  
// ```
// // Create a circle with center (1, 2) and radius 3.  
// var c = MathLib.circle([1, 2], 3);  
// c.center                   // The center of the circle (point)  
// c.radius                   // returns the radius of the circle
// ```

prototypes.circle = {};
MathLib.circle = function (c, r) {
  if (c.type === undefined) {
    c = MathLib.point(c.concat(1));
  }
  return Object.create(prototypes.circle, {
    radius: {
      value: r,
      writable: true
    },
    center: {
      value: c,
      writable: true
    }
  });
};


// Set the constructor property to MathLib.circle.
MathLib.extendPrototype('circle', 'constructor', MathLib.circle);


// Set the type property to 'circle'.
MathLib.extendPrototype('circle', 'type', 'circle');