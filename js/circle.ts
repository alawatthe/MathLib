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

module MathLib {

  export class Circle {
      
      type = 'circle';

      constructor(r: number, p: number) {
          this.radius = r;
          this.center = p;
      }



    // ### Circle.prototype.area()
    // Calculates the area of the circle.
    //
    // *@param {number}* The area of the circle
    	area() {
      	return this.radius * this.radius * Math.PI;
    	}


    // ### Circle.prototype.circumference()
    // Calculates the circumference of the circle.
    //
    // *@param {number}* The circumference of the circle
    circumference() {
      return 2 * this.radius * Math.PI;
    }


    // ### Circle.prototype.draw()
    // Draw the circle onto the screen.
    //
    // *@param {screen}* The screen to draw onto.  
    // *@param {options}* Optional drawing options  
    // *@return {circle}* Returns the circle for chaining
    draw(screen, options) {
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
    }


    // ### Circle.prototype.isEqual()
    // Checks if two circles are equal
    //
    // *@return {boolean}*
    isEqual(c: Circle) {
      return MathLib.isEqual(this.radius, c.radius)  && this.center.isEqual(c.center);
    }


    // ### Circle.prototype.positionOf()
    // Determine if a point is in, on or outside a circle.
    //
    // *@return {string}*
    positionOf(p) {
    	var diff;
      if (p.type === 'point' && p.dim === 2) {
        diff = p.distanceTo(this.center) - this.radius;
    		if (MathLib.isZero(diff)) {
    			return 'on';
    		}
        else if (diff < 0) {
    			return 'in';
        }
        else {
    			return 'out';
        }
      }
    };


    // ### Circle.prototype.reflectAt()
    // Reflect the circle at a point or line
    //
    // *@return {circle}*
    reflectAt(a) {
      return MathLib.circle(this.center.reflectAt(a), this.radius);
    }


    // ### Circle.prototype.toLaTeX()
    // Returns a LaTeX expression of the circle
    //
    // *@return {string}* 
    toLaTeX() {
      return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
    }


    // ### Circle.prototype.toMatrix()
    // Converts the circle to the corresponding matrix.
    //
    // *@return {matrix}* 
    toMatrix() {
      var x = this.center[0] / this.center[2],
          y = this.center[1] / this.center[2],
          r = this.radius;
      return MathLib.matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x*x + y*y - r*r]]);
    }

  }
}