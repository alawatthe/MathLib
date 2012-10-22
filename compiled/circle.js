var MathLib;
(function (MathLib) {
    var Circle = (function () {
        function Circle(r, p) {
            this.type = 'circle';
            this.radius = r;
            this.center = p;
        }
        Circle.prototype.area = function () {
            return this.radius * this.radius * Math.PI;
        };
        Circle.prototype.circumference = function () {
            return 2 * this.radius * Math.PI;
        };
        Circle.prototype.draw = function (screen, options) {
            if(Array.isArray(screen)) {
                var circle = this;
                screen.forEach(function (x) {
                    x.circle(circle, options);
                });
            } else {
                screen.circle(this, options);
            }
            return this;
        };
        Circle.prototype.isEqual = function (c) {
            return MathLib.isEqual(this.radius, c.radius) && this.center.isEqual(c.center);
        };
        Circle.prototype.positionOf = function (p) {
            var diff;
            if(p.type === 'point' && p.dim === 2) {
                diff = p.distanceTo(this.center) - this.radius;
                if(MathLib.isZero(diff)) {
                    return 'on';
                } else {
                    if(diff < 0) {
                        return 'in';
                    } else {
                        return 'out';
                    }
                }
            }
        };
        Circle.prototype.reflectAt = function (a) {
            return MathLib.circle(this.center.reflectAt(a), this.radius);
        };
        Circle.prototype.toLaTeX = function () {
            return 'B_{' + MathLib.toLaTeX(this.radius) + '}\\left(' + this.center.toLaTeX() + '\\right)';
        };
        Circle.prototype.toMatrix = function () {
            var x = this.center[0] / this.center[2];
            var y = this.center[1] / this.center[2];
            var r = this.radius;

            return MathLib.matrix([
                [
                    1, 
                    0, 
                    -x
                ], 
                [
                    0, 
                    1, 
                    -y
                ], 
                [
                    -x, 
                    -y, 
                    x * x + y * y - r * r
                ]
            ]);
        };
        return Circle;
    })();
    MathLib.Circle = Circle;    
})(MathLib || (MathLib = {}));

