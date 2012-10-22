// ## <a id="Circle"></a>Circle
// MathLib.circle expects two arguments.
// First the center in the form of an Array or a MathLib.point.
// The second argument should be the radius of the circle.
//
// #### Simple use case:  
// ```
// // Create a circle with center (1, 2) and radius 3.  
// var c = new MathLib.Circle([1, 2], 3);  
// c.center                   // The center of the circle (point)  
// c.radius                   // returns the radius of the circle
// ```

export class Circle {
    
  type = 'circle';

  constructor(center: Point, radius: number) {

  	if (center.type === undefined) {
    	center = new MathLib.Point(center.concat(1));
  	}

  	this.center = center;
  	this.radius = radius;
  }
