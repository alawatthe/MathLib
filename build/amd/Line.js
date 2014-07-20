var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

    'use strict';

    /*es6
    import {hypot, isEqual, isZero} from 'Functn';
    import {warning} from 'meta';
    import {Point} from 'Point';
    import {Vector} from 'Vector';
    es6*/
    define(['meta', 'Functn', 'Vector'], function(MathLib) {
    /**
    * The line implementation of MathLib makes calculations with lines in the
    * real plane possible. (Higher dimensions will be supported later)
    *
    * @class
    * @augments Vector
    * @this {Line}
    */
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(coords) {
            _super.call(this, coords);
            this.type = 'line';
            this.dimension = 2;
        }
        /**
        * Draws the line on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @return {Line} Returns the line for chaining
        */
        Line.prototype.draw = function (screen, options) {
            if (typeof options === "undefined") { options = {}; }
            if (Array.isArray(screen)) {
                var line = this;
                screen.forEach(function (x) {
                    x.line(line, options);
                });
            } else {
                screen.line(this, options);
            }
            return this;
        };

        /**
        * Determines if two lines are equal.
        *
        * @param {Line} l The line to compare with
        * @return {boolean}
        */
        Line.prototype.isEqual = function (l) {
            var p = this.normalize();
            l = l.normalize();

            if (this.length !== l.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, l[i]);
            });
        };

        /**
        * Determines if the line is finite
        *
        * @return {boolean}
        */
        Line.prototype.isFinite = function () {
            return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
        };

        /**
        * Determines if two lines are parallel.
        *
        * @param {Line} l The other line
        * @return {boolean}
        */
        Line.prototype.isParallelTo = function (l) {
            return MathLib.isZero(this[0] * l[1] - this[1] * l[0]);
        };

        /**
        * Calculates the meeting point of two lines
        *
        * @param {Line} l The line to intersect the current line with
        * @return {Point}
        */
        Line.prototype.meet = function (l) {
            var point, k = this;

            if (this.dimension === 2 && l.dimension === 2) {
                point = new MathLib.Point(this.vectorProduct(l).toArray());

                Object.defineProperties(point, {
                    '0': {
                        get: function () {
                            return k[1] * l[2] - k[2] * l[1];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return k[2] * l[0] - k[0] * l[2];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet'
                            });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return k[0] * l[1] - k[1] * l[0];
                        },
                        set: function () {
                            MathLib.warning({
                                message: 'Trying to change the coordinates of a completely dependent point.',
                                method: 'Line#meet'
                            });
                        },
                        enumerable: true
                    }
                });

                return point;
            }
        };

        /**
        * Normalizes the line.
        *
        * @return {Line}
        */
        Line.prototype.normalize = function () {
            var h = MathLib.hypot(this[0], this[1]);

            if (h !== 0) {
                return this.map(function (x) {
                    return x / h;
                });
            } else {
                return new MathLib.Line([0, 0, 1]);
            }
        };

        /**
        * Determines an parallel line through a given point.
        *
        * @param {Point} p The Point through which the line should go through
        * @return {Line}
        */
        Line.prototype.parallelThrough = function (p) {
            var l = this, parallel = new MathLib.Line([0, 0, 0]);

            Object.defineProperties(parallel, {
                '0': {
                    get: function () {
                        return -l[0] * p[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * p[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return l[1] * p[1] + l[0] * p[0];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent line.',
                            method: 'Line#parallelThrough'
                        });
                    },
                    enumerable: true
                }
            });

            return parallel;
        };
        return Line;
    })(MathLib.Vector);
    MathLib.Line = Line;
return MathLib;
});
