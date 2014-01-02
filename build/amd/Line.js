var __extends = this.__extends || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
    function __() {
      this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};

    // ## <a id="Line"></a>Line
    // The line implementation of MathLib makes calculations with lines in the
    // real plane possible. (Higher dimensions will be supported later)
    define(['meta', 'Functn', 'Vector'], function(MathLib) {
    var Line = (function (_super) {
        __extends(Line, _super);
        function Line(coords) {
            _super.call(this, coords);
            this.type = 'line';
            this.dimension = 2;
        }
        // ### Line.prototype.draw()
        // Draws the line on one or more screens
        //
        // *@param {Screen}* The screen to draw onto.
        // *@param {object}* [options] Drawing options
        // *@return {boolean}*
        Line.prototype.draw = function (screen, options) {
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

        // ### Line.prototype.isEqual()
        // Determines if two lines are equal.
        //
        // *@param {Line}*
        // *@return {boolean}*
        Line.prototype.isEqual = function (q) {
            var p = this.normalize();
            q = q.normalize();

            if (this.length !== q.length) {
                return false;
            }

            return p.every(function (x, i) {
                return MathLib.isEqual(x, q[i]);
            });
        };

        // ### Line.prototype.isFinite()
        // Determines if the line is finite
        //
        // *@return {boolean}*
        Line.prototype.isFinite = function () {
            return !MathLib.isZero(this[0]) || !MathLib.isZero(this[1]);
        };

        // ### Line.prototype.isParallelTo()
        // Determines if two lines are parallel.
        //
        // *@param {Line}*
        // *@return {boolean}*
        Line.prototype.isParallelTo = function (l) {
            return MathLib.isZero(this[0] * l[1] - this[1] * l[0]);
        };

        // ### Line.prototype.meet()
        // Calculates the meeting point of two lines
        //
        // *@param {Line}*
        // *@return {Point}*
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
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            return k[2] * l[0] - k[0] * l[2];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            return k[0] * l[1] - k[1] * l[0];
                        },
                        set: function () {
                            MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent point.', method: 'Line#meet' });
                        },
                        enumerable: true
                    }
                });

                return point;
            }
        };

        // ### Line.prototype.normalize()
        // Normalizes the line.
        //
        // *@return {Line}*
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

        // ### Line.prototype.parallelThrough()
        // Determines an parallel line through a given point.
        //
        // *@param {Point}*
        // *@return {Line}*
        Line.prototype.parallelThrough = function (p) {
            var l = this, parallel = new MathLib.Line([0, 0, 0]);

            Object.defineProperties(parallel, {
                '0': {
                    get: function () {
                        return -l[0] * p[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return -l[1] * p[2];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return l[1] * p[1] + l[0] * p[0];
                    },
                    set: function () {
                        MathLib.warning({ message: 'Trying to change the coordinates of a completely dependent line.', method: 'Line#parallelThrough' });
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
