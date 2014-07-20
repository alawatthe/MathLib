var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

    'use strict';

    /*es6
    import {hypot, isEqual, isZero} from 'Functn';
    import {toLaTeX, toMathML, toString, warning} from 'meta';
    import {Complex} from 'Complex';
    import {Line} from 'Line';
    import {Vector} from 'Vector';
    es6*/
    define(['meta', 'Complex', 'Vector'], function(MathLib) {
    /**
    * The point implementation of MathLib makes calculations with point in
    * arbitrary dimensions possible.
    *
    * MathLib uses the homogeneous form of a point for calculations and storage.
    *
    * To create the point (4, 2) on the two dimensional plane use
    * `new MathLib.Point([4, 2, 1])`
    * Alternatively you can use
    * `new MathLib.Point(4, 2)`
    * The 1 will be added for you.
    *
    * @class
    * @augments Vector
    * @this {Point}
    */
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point(coords) {
            _super.call(this, arguments.length > 1 ? Array.prototype.slice.call(arguments).concat(1) : coords);
            this.type = 'point';

            this.dimension = 2;
        }
        /**
        * Calculates the distance crossratio (A,B,C,D) of four points
        * as seen from the current point.
        *
        * @param {Point} a The point A
        * @param {Point} b The point B
        * @param {Point} c The point C
        * @param {Point} d The point D
        * @return {number}
        */
        Point.prototype.crossRatio = function (a, b, c, d) {
            var xa = this.vectorProduct(a), xb = this.vectorProduct(b);

            return xa.scalarProduct(c) * xb.scalarProduct(d) / (xa.scalarProduct(d) * xb.scalarProduct(c));
        };

        /**
        * Calculates the distance to an other point.
        * If no other point is provided, it calculates the distance to the origin.
        *
        * @param {Point} p The point to calculate the distance to
        * @return {number}
        */
        Point.prototype.distanceTo = function (p) {
            if (arguments.length === 0) {
                return MathLib.hypot.apply(null, this.slice(0, -1)) / Math.abs(this[this.dimension]);
            }

            if (p.type === 'point' && this.dimension === p.dimension) {
                return MathLib.hypot.apply(null, this.normalize().minus(p.normalize()).slice(0, -1));
            }
        };

        /**
        * Draws the point on a canvas or svg element.
        *
        * @param {Screen} screen The screen to draw onto
        * @param {object} options Drawing options
        * @return {Point} Returns the point for chaining
        */
        Point.prototype.draw = function (screen, options) {
            if (typeof options === "undefined") { options = {}; }
            if (Array.isArray(screen)) {
                var point = this;
                screen.forEach(function (x) {
                    x.point(point, options);
                });
            } else {
                screen.point(this, options);
            }

            return this;
        };

        /**
        * Determines if the point has the same coordinates as an other point
        *
        * @param {Point} q The point to compare
        * @return {boolean}
        */
        Point.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();

            if (this.length !== q.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };

        /**
        * Determines if the point is finite
        *
        * @return {boolean}
        */
        Point.prototype.isFinite = function () {
            return !MathLib.isZero(this[this.length - 1]);
        };

        /**
        * Calculates a line connecting two points
        *
        * @param {Point} q The point to calculate the line to
        * @return {Line}
        */
        Point.prototype.join = function (q) {
            var line, p = this;

            if (this.dimension === 2 && q.dimension === 2) {
                line = new MathLib.Line(this.vectorProduct(q).toArray());

                Object.defineProperties(line, {
                    '0': {
                        get: function () {
                            return p[1] * q[2] - p[2] * q[1];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return p[2] * q[0] - p[0] * q[2];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return p[0] * q[1] - p[1] * q[0];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent line.',
                                method: 'Point#join'
                            });
                        },
                        enumerable: true
                    }
                });

                return line;
            }
        };

        /**
        * Normalizes the point.
        *
        * @return {Point}
        */
        Point.prototype.normalize = function () {
            var last = this[this.dimension] || 1;
            return this.map(function (x) {
                return x / last;
            });
        };

        /**
        * Reflects the point at an other point
        *
        * @param {Point} q The point to reflect the current point at.
        * @return {Point}
        */
        Point.prototype.reflectAt = function (q) {
            var i, ii, reflectedPoint = [], p = this.normalize();

            if (q.type === 'point') {
                if (this.dimension === q.dimension) {
                    q = q.normalize();
                    for (i = 0, ii = this.dimension; i < ii; i++) {
                        reflectedPoint.push(2 * q[i] - p[i]);
                    }
                    reflectedPoint.push(1);
                    return new MathLib.Point(reflectedPoint);
                }
            }
        };

        /**
        * Restricts the point to a line.
        *
        * @param {Line} l The line to restrict the point to.
        */
        Point.prototype.restrictTo = function (l) {
            var p = this.slice();

            Object.defineProperties(this, {
                '0': {
                    get: function () {
                        return l[1] * l[1] * p[0] - l[0] * (l[1] * p[1] + l[2] * p[2]);
                    },
                    set: function (point) {
                        p[0] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * l[2] * p[2] + l[0] * (l[0] * p[1] - l[1] * p[0]);
                    },
                    set: function (point) {
                        p[1] = point;
                    },
                    enumerable: true,
                    configurable: true
                },
                '2': {
                    get: function () {
                        return l[1] * l[1] * p[2] + l[0] * l[0] * p[2];
                    },
                    set: function (point) {
                        p[2] = point;
                    },
                    enumerable: true,
                    configurable: true
                }
            });
        };

        /**
        * Converts a two dimensional point to the corresponding complex number.
        *
        * @return {Complex}
        */
        Point.prototype.toComplex = function () {
            if (this.dimension === 2) {
                if (MathLib.isZero(this[2])) {
                    return new MathLib.Complex(Infinity);
                }
                return new MathLib.Complex(this[0] / this[2], this[1] / this[2]);
            }
        };

        /**
        * TODO: implement
        * Returns content MathML representation of the point
        *
        * @return {string}
        */
        // toContentMathML(opt) {
        // }
        /**
        * Returns LaTeX representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toLaTeX = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '\\begin{pmatrix}' + p.reduce(function (old, cur) {
                return old + '\\\\' + MathLib.toLaTeX(cur);
            }) + '\\end{pmatrix}';
        };

        /**
        * Returns (presentation) MathML representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toMathML = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return p.reduce(function (old, cur) {
                return old + '<mtr><mtd>' + MathLib.toMathML(cur) + '</mtd></mtr>';
            }, '<mrow><mo>(</mo><mtable>') + '</mtable><mo>)</mo></mrow>';
        };

        /**
        * Returns string representation of the point
        *
        * @param {boolean} opt Optional parameter to indicate if the output should be projective.
        * @return {string}
        */
        Point.prototype.toString = function (opt) {
            if (typeof opt === "undefined") { opt = false; }
            var p = opt ? this.toArray() : this.normalize().slice(0, -1);

            return '(' + p.reduce(function (old, cur) {
                return old + ', ' + MathLib.toString(cur);
            }) + ')';
        };
        Point.I = new Point([new MathLib.Complex(0, -1), 0, 1]);

        Point.J = new Point([new MathLib.Complex(0, 1), 0, 1]);
        return Point;
    })(MathLib.Vector);
    MathLib.Point = Point;
return MathLib;
});
