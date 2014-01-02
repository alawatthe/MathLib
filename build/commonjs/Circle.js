
    // ## <a id="Circle" href="http://mathlib.de/en/docs/Circle">Circle</a>
    // MathLib.Circle expects two arguments.
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
    var MathLib = require('./meta.js'),
		Point = require('./Point');

    var Circle = (function () {
        function Circle(center, radius) {
            this.type = 'circle';
            if (center.type === undefined) {
                center = new MathLib.Point(center.concat(1));
            }

            this.center = center;
            this.radius = radius;
        }
        // ### [Circle.prototype.area()](http://mathlib.de/en/docs/Circle/area)
        // Calculates the area of the circle.
        //
        // *@return {number}* The area of the circle
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };

        // ### [Circle.prototype.circumference()](http://mathlib.de/en/docs/Circle/circumference)
        // Calculates the circumference of the circle.
        //
        // *@return {number}* The circumference of the circle
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };

        // ### [Circle.prototype.compare()](http://mathlib.de/en/docs/Circle/compare)
        // Compares two circles
        //
        // *@param {Circle}* The circle to compare
        // *@return {number}*
        Circle.prototype.compare = function (c) {
            return MathLib.sign(this.center.compare(c.center)) || MathLib.sign(this.radius - c.radius);
        };

        // ### [Circle.prototype.draw()](http://mathlib.de/en/docs/Circle/draw)
        // Draw the circle onto the screen.
        //
        // *@param {Screen}* The screen to draw onto.
        // *@param {object}* Optional drawing options
        // *@return {Circle}* Returns the circle for chaining
        Circle.prototype.draw = function (screen, options) {
            if (Array.isArray(screen)) {
                var circle = this;
                screen.forEach(function (x) {
                    x.circle(circle, options);
                });
            } else {
                screen.circle(this, options);
            }
            return this;
        };

        // ### [Circle.prototype.isEqual()](http://mathlib.de/en/docs/Circle/isEqual)
        // Checks if two circles are equal
        //
        // *@return {boolean}*
        Circle.prototype.isEqual = function (c) {
            return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
        };

        // ### [Circle.prototype.positionOf()](http://mathlib.de/en/docs/Circle/positionOf)
        // Determine if a point is in, on or outside a circle.
        //
        // *@return {string}*
        Circle.prototype.positionOf = function (p) {
            var diff;
            if (p.type === 'point' && p.dimension === 2) {
                diff = p.distanceTo(this.center) - this.radius;
                if (MathLib.isZero(diff)) {
                    return 'on';
                } else if (diff < 0) {
                    return 'in';
                } else {
                    return 'out';
                }
            }
        };

        // ### [Circle.prototype.reflectAt()](http://mathlib.de/en/docs/Circle/reflectAt)
        // Reflect the circle at a point or line
        //
        // *@return {Circle}*
        Circle.prototype.reflectAt = function (a) {
            return new MathLib.Circle(this.center.reflectAt(a), this.radius);
        };

        // ### [Circle.prototype.toLaTeX()](http://mathlib.de/en/docs/Circle/toLaTeX)
        // Returns a LaTeX expression of the circle
        //
        // *@return {string}*
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };

        // ### [Circle.prototype.toMatrix()](http://mathlib.de/en/docs/Circle/toMatrix)
        // Converts the circle to the corresponding matrix.
        //
        // *@return {Matrix}*
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2], y = this.center[1] / this.center[2], r = this.radius;
            return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
        };
        return Circle;
    })();
    module.exports = MathLib.Circle = Circle;

