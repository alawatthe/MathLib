
/* jshint esnext:true */


import {abs, isZero} from 'Functn';
import {colorConvert, extendObject} from 'meta';


/**
* The Canvas renderer for 2D plotting
*/
export var Canvas = {
    /**
    * Applies the current transformations to the screen
    */
    applyTransformation: function () {
        var m = this.transformation, devicePixelRatio = window.devicePixelRatio || 1;

        this.layer.forEach(function (l) {
            l.ctx.setTransform(devicePixelRatio * m[0][0], m[1][0], m[0][1], devicePixelRatio * m[1][1], devicePixelRatio * m[0][2], devicePixelRatio * m[1][2]);
        });
    },
    /**
    * Draws a circle on the screen.
    *
    * @param {Circle} circle The circle to be drawn
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the screen
    */
    circle: function (circle, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, ctx = this.ctx, prop, opts;

        ctx.save();
        ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

        // Set the drawing options
        if (options) {
            opts = Canvas.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            if ('setLineDash' in ctx) {
                ctx.setLineDash(('dash' in options ? options.dash : []));
            }
            if ('lineDashOffset' in ctx) {
                ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
            }
        }

        // Draw the circle
        ctx.beginPath();
        ctx.arc(circle.center[0], circle.center[1], circle.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        if (!redraw) {
            this.stack.push({
                type: 'circle',
                object: circle,
                options: options
            });
        }

        return this;
    },
    /**
    * Clears a given Layer.
    *
    * @param {Layer} layer The layer to be cleared
    */
    clear: function (layer) {
        var screen = layer.screen, left = -screen.translation.x / screen.scale.x, top = -screen.translation.y / screen.scale.y, width = screen.width / screen.scale.x, height = screen.height / screen.scale.y;

        layer.ctx.clearRect(left, top, width, height);
    },
    /**
    * Converts the options to the Canvas options format
    *
    * @param {drawingOptions} options The drawing options
    * @return {canvasDrawingOptions} The converted options
    */
    convertOptions: function (options) {
        var convertedOptions = {};

        if ('fillColor' in options) {
            convertedOptions.fillStyle = colorConvert(options.fillColor);
        } else if ('color' in options) {
            convertedOptions.fillStyle = colorConvert(options.color);
        }

        if ('font' in options) {
            convertedOptions.font = options.font;
        }

        if ('fontSize' in options) {
            convertedOptions.fontSize = options.fontSize;
        }

        if ('lineColor' in options) {
            convertedOptions.strokeStyle = colorConvert(options.lineColor);
        } else if ('color' in options) {
            convertedOptions.strokeStyle = colorConvert(options.color);
        }

        return convertedOptions;
    },
    /**
    * Draws a line on the screen.
    *
    * @param {Line} line The line to be drawn
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the screen
    */
    line: function (line, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, points, ctx = this.ctx, prop, opts;

        ctx.save();
        ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

        // Don't try to draw the line at infinity
        if (line.type === 'line' && isZero(line[0]) && isZero(line[1])) {
            return this;
        } else {
            points = this.screen.getLineEndPoints(line);
        }

        // Set the drawing options
        if (options) {
            opts = Canvas.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            if ('setLineDash' in ctx) {
                ctx.setLineDash(('dash' in options ? options.dash : []));
            }
            if ('lineDashOffset' in ctx) {
                ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
            }
        }

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        if (!redraw) {
            this.stack.push({
                type: 'line',
                object: line,
                options: options
            });
        }

        return this;
    },
    /**
    * Draws a path on the screen.
    *
    * @param {Path} curve The path to be drawn
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the scren
    */
    path: function (curve, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, ctx = this.ctx, prop, opts, path, paths = [], x, y, i, fx, fxold, step = 2 / (screen.scale.x - screen.scale.y), from, to;

        ctx.save();
        ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

        // Set the drawing options
        if (options) {
            opts = Canvas.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            if ('setLineDash' in ctx) {
                ctx.setLineDash(('dash' in options ? options.dash : []));
            }
            if ('lineDashOffset' in ctx) {
                ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
            }
        }

        // If curve is a function f, the path will be (x, f(x))
        if (typeof curve === 'function') {
            path = [];
            from = ('from' in options ? (options).from : (-screen.translation.x) / screen.scale.x) - step;
            to = ('to' in options ? (options).to : (screen.width - screen.translation.x) / screen.scale.x) + step;

            for (i = from; i <= to; i += step) {
                fx = curve(i);

                // Inline NaN test and disontinuity test
                // Check if we are drawing a (nearly) vertical line, which should not be there.
                // i.e the vertical lines at π/2 for the tangent function
                // TODO: Find a better check if there is a discontinuity.
                if (fx !== fx || (abs((fxold - fx) / step) >= 1e2 && (fx - curve(i - step / 2)) * (fxold - curve(i - step / 2)) >= 0)) {
                    // Don't add empty subpaths
                    if (path.length) {
                        paths.push(path);
                        path = [];
                    }
                } else {
                    path.push([i, fx]);
                }

                fxold = fx;
            }
            if (path.length) {
                paths.push(path);
            }
        } else if (typeof curve[0] === 'function') {
            path = [];
            x = curve[0];
            y = curve[1];
            from = ('from' in options ? (options).from : 0) - step;
            to = ('to' in options ? (options).to : 2 * Math.PI) + step;
            for (i = from; i <= to; i += step) {
                path.push([x(i), y(i)]);
            }
            paths.push(path);
        } else {
            path = curve;
        }

        // Draw the path
        // Till now I haven't found a way to stroke and fill the path in one go.
        // The problem is basically, that moveTo creates a new subpath
        // and every subpath is filled on its own.
        if (options.fillColor || options.fillColor !== 'transparent') {
            ctx.beginPath();
            ctx.lineTo(from, 0);
            paths.forEach(function (path) {
                // The following line (and the line four lines afterwards) fixes the fill at holes in the path.
                ctx.lineTo(path[0][0], 0);
                path.forEach(function (x) {
                    ctx.lineTo(x[0], x[1]);
                });
                ctx.lineTo(path[path.length - 1][0], 0);
            });
            ctx.fill();
            // ctx.closePath();
        }

        if (options.lineColor || options.lineColor !== 'transparent') {
            ctx.beginPath();
            paths.forEach(function (path) {
                ctx.moveTo(path[0][0], path[0][1]);
                path.forEach(function (x) {
                    ctx.lineTo(x[0], x[1]);
                });
            });
            ctx.stroke();
            // ctx.closePath();
        }

        ctx.restore();

        if (!redraw) {
            if (options.conic) {
                this.stack.push({
                    type: 'conic',
                    object: options.conic,
                    options: options
                });
            } else {
                this.stack.push({
                    type: 'path',
                    object: curve,
                    options: options
                });
            }
        }

        return this;
    },
    /**
    * Draws pixel on the screen.
    *
    * @param {function} f The pixel function
    * @param {number} t The top coordinate of the draw rectangle
    * @param {number} r The right coordinate of the draw rectangle
    * @param {number} b The bottom coordinate of the draw rectangle
    * @param {number} l The left coordinate of the draw rectangle
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the screen
    */
    pixel: function (f, t, r, b, l, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, ctx = this.ctx, x, y, i;

        t = Math.min(top, t);
        r = Math.min(right, r);
        b = Math.max(bottom, b);
        l = Math.max(left, l);

        var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (bPxl - tPxl), imgData = ctx.createImageData(w, h), pxl;

        for (y = tPxl, i = 0; y > bPxl; y--) {
            for (x = lPxl; x < rPxl; x++, i++) {
                pxl = f(x / screen.scale.x, y / screen.scale.y);
                imgData.data[4 * i] = pxl[0];
                imgData.data[4 * i + 1] = pxl[1];
                imgData.data[4 * i + 2] = pxl[2];
                imgData.data[4 * i + 3] = pxl[3];
            }
        }

        ctx.putImageData(imgData, (left - l) * screen.scale.x, (t - top) * screen.scale.y);

        if (!redraw) {
            this.stack.push({
                type: 'pixel',
                object: f,
                t: t,
                r: r,
                b: b,
                l: l,
                options: options
            });
        }

        return this;
    },
    /**
    * Draws a point on the screen.
    *
    * @param {Point} point The point to be drawn
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the screen
    */
    point: function (point, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, ctx = this.ctx, prop, opts, dist;

        ctx.save();
        ctx.lineWidth = (options.lineWidth || 4) / (screen.scale.x - screen.scale.y);

        // Set the drawing options
        if (options) {
            opts = Canvas.convertOptions(options);

            if (!('fillColor' in options) && !('color' in options)) {
                opts.fillStyle = 'black';
            }

            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    ctx[prop] = opts[prop];
                }
            }

            if ('setLineDash' in ctx) {
                ctx.setLineDash(('dash' in options ? options.dash : []));
            }
            if ('lineDashOffset' in ctx) {
                ctx.lineDashOffset = ('dashOffset' in options ? options.dashOffset : 0);
            }
        }

        // Draw the point
        ctx.beginPath();
        ctx.arc(point[0] / point[2], point[1] / point[2], (options.size || 10) / (screen.scale.x - screen.scale.y), 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        if (options.label) {
            dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
            screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
        }

        if (!redraw) {
            this.stack.push({
                type: 'point',
                object: point,
                options: options
            });
        }

        return this;
    },
    /**
    * Writes text on the screen.
    *
    * @param {string} str The string to be drawn
    * @param {number} x The x coordinate
    * @param {number} y The y coordinate
    * @param {drawingOptions} options Optional drawing options
    * @return {Screen} Returns the screen
    */
    text: function (str, x, y, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var defaults = {
            font: 'Helvetica',
            fontSize: 12,
            // lineWidth:  0.05,
            textColor: 'rgba(0, 0, 0, 1)'
        }, ctx, prop, opts;

        ctx = this.ctx;

        opts = Canvas.convertOptions(extendObject(defaults, options));

        for (prop in opts) {
            if (opts.hasOwnProperty(prop)) {
                ctx[prop] = opts[prop];
            }
        }

        ctx.fillStyle = colorConvert(options.textColor || options.color || defaults.textColor);
        ctx.strokeStyle = colorConvert(options.textColor || options.color || defaults.textColor);

        ctx.font = opts.fontSize + 'px ' + opts.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var tf = this.screen.transformation;

        ctx.save();
        ctx.transform(1 / tf[0][0], 0, 0, 1 / tf[1][1], 0, 0);
        ctx.fillText(str, tf[0][0] * x, tf[1][1] * y);
        ctx.restore();

        if (!redraw) {
            this.stack.push({
                type: 'text',
                object: str,
                x: x,
                y: y,
                options: options
            });
        }

        return this;
    }
};

