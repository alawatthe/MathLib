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


// ### Circle.prototype.area()
// Calculates the area of the circle.
//
// *@param {number}* The area of the circle
MathLib.extendPrototype('circle', 'area', function () {
  return this.radius * this.radius * MathLib.pi;
});


// ### Circle.prototype.circumference()
// Calculates the circumference of the circle.
//
// *@param {number}* The circumference of the circle
MathLib.extendPrototype('circle', 'circumference', function () {
  return 2 * this.radius * MathLib.pi;
});


// ### Circle.prototype.draw()
// Draw the circle onto the screen.
//
// *@param {screen}* The screen to draw onto.  
// *@param {options}* Optional drawing options  
// *@return {circle}* Returns the circle for chaining
MathLib.extendPrototype('circle', 'draw', function (screen, options) {
  if (Array.isArray(screen)) {
    var circle = this;
    screen.forEach(function (x) {
      x.circle(circle, options);
    });
  }
  else {
    screen.circle(this, options);
  }
  return this;
});


// ### Circle.prototype.isContaining()
// Determine if a circle is containing an other point.
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isContaining', function (a) {
  if (a.type === "point" && a.dim === 2) {
    return a.distanceTo(this.center) < this.radius;
  }
});


// ### Circle.prototype.isEqual()
// Checks if two circles are equal
//
// *@return {boolean}*
MathLib.extendPrototype('circle', 'isEqual', function (c) {
  return MathLib.isEqual(this.radius, c.radius)  && this.center.isEqual(c.center);
});


// ### Circle.prototype.reflectAt()
// Reflect the circle at a point or line
//
// *@return {circle}*
MathLib.extendPrototype('circle', 'reflectAt', function (a) {
  return MathLib.circle(this.center.reflectAt(a), this.radius);
});


// ### Circle.prototype.toLaTeX()
// Returns a LaTeX expression of the circle
//
// *@return {string}* 
MathLib.extendPrototype('circle', 'toLaTeX', function () {
  return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
});


// ### Circle.prototype.toMatrix()
// Converts the circle to the corresponding matrix.
//
// *@return {matrix}* 
MathLib.extendPrototype('circle', 'toMatrix', function () {
  var x = this.center.get(0),
      y = this.center.get(1),
      r = this.radius;
  return MathLib.matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x*x + y*y - r*r]]);
});