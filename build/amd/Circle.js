
    'use strict';

    /*es6
    import {isEqual, isZero, sign} from 'Functn';
    import {toLaTeX} from 'meta';
    import {Matrix} from 'Matrix';
    import {Point} from 'Point';
    es6*/
    define(['meta', 'Point'], function(MathLib) {
    /**
    * Creates a MathLib circle
    * MathLib.Circle expects two arguments.
    * First the center in the form of an Array or a MathLib.point.
    * The second argument should be the radius of the circle.
    * #### Simple use case:
    *
    * ```
    * // Create a circle with center (1, 2) and radius 3.
    * var c = new MathLib.Circle([1, 2], 3);
    * c.center                   // The center of the circle (point)
    * c.radius                   // returns the radius of the circle
    * ```
    *
    * @class
    * @this {Circle}
    */
    var Circle = (function () {
        function Circle(center, radius) {
            this.type = 'circle';
            if (center.type === undefined) {
                center = new MathLib.Point(center.concat(1));
            }

            this.center = center;
            this.radius = radius;
        }
        /**
        * Calculates the area of the circle.
        *
        * @return {number} The area of the circle
        */
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };

        /**
        * Calculates the circumference of the circle.
        *
        * @return {number} The circumference of the circle
        */
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };

        /**
        * Compares two circles
        *
        * @param {Circle} circle The circle to compare
        * @return {number}
        */
        Circle.prototype.compare = function (circle) {
            return MathLib.sign(this.center.compare(circle.center)) || MathLib.sign(this.radius - circle.radius);
        };

        /**
        * Draw the circle onto the screen.
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {drawingOptions} options Optional drawing options
        * @return {Circle} Returns the circle for chaining
        */
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

        /**
        * Checks if two circles are equal
        *
        * @param {Circle} circle The circle to compare
        * @return {boolean}
        */
        Circle.prototype.isEqual = function (circle) {
            return MathLib.isEqual(this.radius, circle.radius) && this.center.isEqual(circle.center);
        };

        /**
        * Determine if a point is in, on or outside a circle.
        *
        * @param {Point} point The Point to determine the position of
        * @return {string}
        */
        Circle.prototype.positionOf = function (point) {
            var diff;
            if (point.type === 'point' && point.dimension === 2) {
                diff = point.distanceTo(this.center) - this.radius;
                if (MathLib.isZero(diff)) {
                    return 'on';
                } else if (diff < 0) {
                    return 'in';
                } else {
                    return 'out';
                }
            }
        };

        /**
        * Reflect the circle at a point or line
        *
        * @return {Circle}
        */
        Circle.prototype.reflectAt = function (a) {
            return new MathLib.Circle(this.center.reflectAt(a), this.radius);
        };

        /**
        * Returns a LaTeX expression of the circle
        *
        * @return {string}
        */
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };

        /**
        * Converts the circle to the corresponding matrix.
        *
        * @return {Matrix}
        */
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2], y = this.center[1] / this.center[2], r = this.radius;
            return new MathLib.Matrix([[1, 0, -x], [0, 1, -y], [-x, -y, x * x + y * y - r * r]]);
        };
        return Circle;
    })();
    MathLib.Circle = Circle;
return MathLib;
});
