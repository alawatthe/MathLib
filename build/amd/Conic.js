
    'use strict';

    /*es6
    import {cbrt, isZero, sec, tan, warning} from 'Functn';
    import {Line} from 'Line';
    import {Matrix} from 'Matrix';
    import {Point} from 'Point';
    es6*/
    define(['meta', 'Functn', 'Matrix'], function(MathLib) {
    /**
    * The conic implementation of MathLib makes calculations with conics possible.
    *
    * @class Conic
    * @this {Conic}
    */
    var Conic = (function () {
        function Conic(primal, dual) {
            this.type = 'conic';
            if (primal.type !== 'matrix') {
                primal = new MathLib.Matrix(primal);
            }
            this.primal = primal;

            // if (!dual) {
            //   dual = primal.adjugate();
            // }
            // else if (!primal.times(dual).isScalar()) {
            //   // Throw error
            // }
            if (primal.rank() > 1) {
                Object.defineProperties(this, {
                    'dual': {
                        get: function () {
                            return this.primal.adjugate();
                        },
                        set: function () {
                        },
                        enumerable: true,
                        configurable: true
                    }
                });
            } else {
                this.dual = dual;
            }
        }
        /**
        * Calculates the conic through five points.
        *
        * @param {Point} p The first point
        * @param {Point} q The second point
        * @param {Point} r The third point
        * @param {Point} s The fourth point
        * @param {Point} t The fifth point
        * @return {Conic}
        */
        Conic.throughFivePoints = function (p, q, r, s, t) {
            var conic = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));

            Object.defineProperties(conic, {
                'primal': {
                    get: function () {
                        var G = p.vectorProduct(r).outerProduct(q.vectorProduct(s)), H = p.vectorProduct(s).outerProduct(q.vectorProduct(r)), M = G.times(t.times(H).scalarProduct(t)).minus(H.times(t.times(G).scalarProduct(t)));
                        return M.transpose().plus(M);
                    },
                    set: function () {
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return conic;
        };

        /**
        * Draws the conic on one or more screens
        *
        * @param {Screen} screen The screen to draw onto.
        * @param {object} options Drawing options
        * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
        * @return {Conic} Returns the conic for chaining
        */
        Conic.prototype.draw = function (screen, options, redraw) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof redraw === "undefined") { redraw = false; }
            if (Array.isArray(screen)) {
                var conic = this;
                screen.forEach(function (x) {
                    conic.draw(x, options);
                });
            } else {
                options.from = 0;
                options.to = 2 * Math.PI;
                options.conic = this;

                var lines, alpha, cos, sin, sgn, a = this.primal[0][0], b = this.primal[0][1] * 2, c = this.primal[1][1], d = this.primal[0][2] * 2, e = this.primal[1][2] * 2, disc = 4 * a * c - b * b, rank = this.primal.rank(), cx = (b * e - 2 * c * d) / (4 * a * c - b * b), cy = (b * d - 2 * a * e) / (4 * a * c - b * b), normalForm = this.normalize(), A = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[0][0])), C = Math.sqrt(Math.abs(normalForm.primal[2][2] / normalForm.primal[1][1]));

                if (rank === 3) {
                    alpha = Math.atan2(b, a - c) / 2;
                    cos = Math.cos(alpha);
                    sin = Math.sin(alpha);

                    // Parabola
                    if (disc === 0) {
                        options.from = -10;
                        options.to = 10;

                        var param = -this.primal[1][2] / (2 * this.primal[0][0]);
                        cx = 0;
                        cy = this.primal[2][2] / this.primal[0][0];

                        screen.path([
                            function (t) {
                                return cx + cos * param * t * t - sin * 2 * param * t;
                            },
                            function (t) {
                                return cy + sin * param * t * t + cos * 2 * param * t;
                            }
                        ], options, redraw);
                    } else if (disc > 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        screen.path([
                            function (t) {
                                return cx + cos * Math.cos(t) * A - sin * Math.sin(t) * C;
                            },
                            function (t) {
                                return cy + sin * Math.cos(t) * A + cos * Math.sin(t) * C;
                            }
                        ], options, redraw);
                    } else if (disc < 0) {
                        options.from = 0;
                        options.to = 2 * Math.PI;

                        // This function changes the direction of the path for the second branch.
                        // Otherwise we get some lines which shouldn't be there.
                        sgn = function (t) {
                            return +((t + Math.PI / 2) % (2 * Math.PI) < Math.PI) * 2 - 1;
                        };

                        if (normalForm.primal[2][2] * normalForm.primal[0][0] > 0) {
                            var swap = A;
                            A = C;
                            C = swap;

                            cos = Math.cos(alpha + Math.PI / 2);
                            sin = Math.sin(alpha + Math.PI / 2);
                        } else {
                            cos = Math.cos(alpha);
                            sin = Math.sin(alpha);
                        }

                        screen.path([
                            function (t) {
                                return cx + cos * MathLib.sec(t) * A - sin * MathLib.tan(t) * C * sgn(t);
                            },
                            function (t) {
                                return cy + sin * MathLib.sec(t) * A + cos * MathLib.tan(t) * C * sgn(t);
                            }
                        ], options, redraw);
                    }
                } else if (rank === 2) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                    screen.line(lines[1], options);
                } else if (rank === 1) {
                    lines = this.splitDegenerated();

                    screen.line(lines[0], options);
                }
            }
            return this;
        };

        /**
        * Calculates the eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.eccentricity = function () {
            var normalform = this.normalize(), a = normalform.primal[0][0], c = normalform.primal[1][1];

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return 1;
                }
                if (c > 0) {
                    return Math.sqrt(1 - c / a);
                }
                return Math.sqrt(1 - a / c);
            }
        };

        /**
        * Determines if a conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.isDegenerated = function () {
            return this.primal.rank() !== 3;
        };

        /**
        * Determines if two conics are equal.
        *
        * @param {Conic} conic The conic to be compared
        * @return {boolean}
        */
        Conic.prototype.isEqual = function (conic) {
            if (this === conic) {
                return true;
            }

            var compare = function (M, N) {
                var i, j, m, n;

                if (M === N) {
                    return true;
                }

                nonZeroSearch:
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (M[i][j] !== 0) {
                            break nonZeroSearch;
                        }
                    }
                }

                if (N[i][j] === 0) {
                    return false;
                }

                m = M[i][j];
                n = N[i][j];

                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (n / m * M[i][j] !== N[i][j]) {
                            return false;
                        }
                    }
                }

                return true;
            };

            return compare(this.primal, conic.primal) && compare(this.dual, conic.dual);
        };

        /**
        * Calculates the latusRectum of a conic.
        *
        * @return {number}
        */
        Conic.prototype.latusRectum = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], min = Math.min(Math.abs(a), Math.abs(c)), max = Math.max(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // Parabola
                if (c === 0) {
                    return -2 * normalForm.primal[1][2] / a;
                }

                return 2 * Math.sqrt(max) / min;
            }
        };

        /**
        * Calculates the linear eccentricity of a conic.
        *
        * @return {number}
        */
        Conic.prototype.linearEccentricity = function () {
            var normalForm = this.normalize(), a = normalForm.primal[0][0], c = normalForm.primal[1][1], max = Math.max(Math.abs(a), Math.abs(c)), min = Math.min(Math.abs(a), Math.abs(c));

            if (!this.isDegenerated()) {
                // parabola
                if (c === 0) {
                    return normalForm.primal[1][2] / (-2 * a);
                }

                if (c > 0) {
                    return Math.sqrt(1 / min - 1 / max);
                }
                return Math.sqrt(1 / max + 1 / min);
            }
        };

        /**
        * Calculates the meet of the conic with a line or a conic.
        *
        * @param {Line|Conic} x The line or conic to intersect with
        * @return {Point[]}
        */
        Conic.prototype.meet = function (x) {
            var B, C, alpha, i, j, p1, p2, Ml, a, b, c, d, Delta0, Delta1, lambda, degenerated, lines, A = this.primal;

            if (x.type === 'line') {
                var setter = function () {
                    MathLib.warning({
                        message: 'Trying to change the coordinates of a completely dependent point.',
                        method: 'Conic#meet'
                    });
                }, recalculate = function () {
                    Ml = new MathLib.Matrix([[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]);
                    B = Ml.transpose().times(A).times(Ml);

                    if (!MathLib.isZero(x[0])) {
                        alpha = Math.sqrt(B[2][1] * B[1][2] - B[1][1] * B[2][2]) / x[0];
                    } else if (!MathLib.isZero(x[1])) {
                        alpha = Math.sqrt(B[0][2] * B[2][0] - B[2][2] * B[0][0]) / x[1];
                    } else {
                        alpha = Math.sqrt(B[1][0] * B[0][1] - B[0][0] * B[1][1]) / x[2];
                    }

                    C = Ml.times(alpha).plus(B);

                    nonZeroSearch:
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            if (C[i][j] !== 0) {
                                break nonZeroSearch;
                            }
                        }
                    }
                };

                recalculate();

                p1 = new MathLib.Point(C[i]);
                Object.defineProperties(p1, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[i][0];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[i][1];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[i][2];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                p2 = new MathLib.Point([C[0][j], C[1][j], C[2][j]]);
                Object.defineProperties(p2, {
                    '0': {
                        get: function () {
                            recalculate();
                            return C[0][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '1': {
                        get: function () {
                            recalculate();
                            return C[1][j];
                        },
                        set: setter,
                        enumerable: true
                    },
                    '2': {
                        get: function () {
                            recalculate();
                            return C[2][j];
                        },
                        set: setter,
                        enumerable: true
                    }
                });

                return [p1, p2];
            } else if (x.type === 'conic') {
                B = x.primal;
                a = A.determinant();
                b = (new MathLib.Matrix([A[0], A[1], B[2]])).plus(new MathLib.Matrix([A[0], B[1], A[2]])).plus(new MathLib.Matrix([B[0], A[1], A[2]])).determinant();
                c = (new MathLib.Matrix([A[0], B[1], B[2]])).plus(new MathLib.Matrix([B[0], A[1], B[2]])).plus(new MathLib.Matrix([B[0], B[1], A[2]])).determinant();
                d = B.determinant();
                Delta0 = b * b - 3 * a * c;
                Delta1 = 2 * b * b - 9 * a * b * c + 27 * a * a * d;
                C = MathLib.cbrt((Delta1 + Math.sqrt(Math.pow(Delta1, 2) - 4 * Math.pow(Delta0, 3))) / 2);
                lambda = -(b + C + Delta0 / C) / (3 * a);
                degenerated = new MathLib.Conic(B.times(lambda).plus(A));
                lines = degenerated.splitDegenerated();

                return this.meet(lines[0]).concat(this.meet(lines[1]));
            }
        };

        /**
        * Calculates the normal form of a conic.
        *
        * @return {Conic}
        */
        Conic.prototype.normalize = function () {
            var A = this.primal[0][0], B = this.primal[0][1] * 2, C = this.primal[1][1], D = this.primal[0][2] * 2, E = this.primal[1][2] * 2, F = this.primal[2][2], r = Math.atan2(B, A - C) / 2, cos = Math.cos(r), sin = Math.sin(r), a = A * cos * cos + B * sin * cos + C * sin * sin, c = A * sin * sin - B * sin * cos + C * cos * cos, d = D * cos + E * sin, e = E * cos - D * sin, f = F;

            if (a !== 0) {
                f += -d * d / (4 * a);
                d = 0;
            }

            if (c !== 0) {
                f += -e * e / (4 * c);
                e = 0;
            }

            if (f !== 0) {
                a = -a / f;
                c = -c / f;
                d = -d / f;
                e = -e / f;
                f = -1;
            }

            return new MathLib.Conic(new MathLib.Matrix([[a, 0, d / 2], [0, c, e / 2], [d / 2, e / 2, f]]));
        };

        /**
        * Calculates the four polarity of a conic.
        *
        * @return {Point[]}
        */
        Conic.prototype.polarity = function (x) {
            var object, m, c = this;

            if (x.type === 'line') {
                object = new MathLib.Point([0, 0, 0]);
                m = 'dual';
            } else if (x.type === 'point') {
                object = new MathLib.Line([0, 0, 0]);
                m = 'primal';
            }

            Object.defineProperties(object, {
                '0': {
                    get: function () {
                        return c[m][0][0] * x[0] + c[m][0][1] * x[1] + c[m][0][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                },
                '1': {
                    get: function () {
                        return c[m][1][0] * x[0] + c[m][1][1] * x[1] + c[m][1][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                },
                '2': {
                    get: function () {
                        return c[m][2][0] * x[0] + c[m][2][1] * x[1] + c[m][2][2] * x[2];
                    },
                    set: function () {
                        MathLib.warning({
                            message: 'Trying to change the coordinates of a completely dependent ' + object.type + '.',
                            method: 'Conic#polarity'
                        });
                    },
                    enumerable: true
                }
            });

            return object;
        };

        /**
        * Splits a conic into one or two lines if the conic is degenerated.
        *
        * @return {boolean}
        */
        Conic.prototype.splitDegenerated = function () {
            var n, i, j, B, C, p0, p1, p2, rank = this.primal.rank(), nonZeroSearch = function (C) {
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        if (C[i][j] !== 0) {
                            return;
                        }
                    }
                }
            };

            if (rank === 2) {
                if (this.dual[0][0] !== 0) {
                    n = 0;
                } else if (this.dual[1][1] !== 0) {
                    n = 1;
                } else {
                    n = 2;
                }

                if (this.dual[n][n] < 0) {
                    B = this.dual.negative();
                } else {
                    B = this.dual;
                }

                p0 = B[0][n] / Math.sqrt(B[n][n]);
                p1 = B[1][n] / Math.sqrt(B[n][n]);
                p2 = B[2][n] / Math.sqrt(B[n][n]);
                C = this.primal.plus(new MathLib.Matrix([[0, p2, -p1], [-p2, 0, p0], [p1, -p0, 0]]));

                nonZeroSearch(C);

                return [new MathLib.Line(C[i]), new MathLib.Line([C[0][j], C[1][j], C[2][j]])];
            } else if (rank === 1) {
                nonZeroSearch(this.primal);
                return [new MathLib.Line(this.primal[i]), new MathLib.Line(this.primal[i])];
            }
        };
        return Conic;
    })();
    MathLib.Conic = Conic;
return MathLib;
});
