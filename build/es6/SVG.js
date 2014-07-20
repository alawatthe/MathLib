
/* jshint esnext:true */


import {abs, hypot, isZero} from 'Functn';
import {colorConvert, extendObject} from 'meta';


/**
* The SVG renderer for 2D plotting
*/
export var SVG = {
    /**
    * Applies the current transformations to the screen
    */
    applyTransformation: function () {
        var m = this.transformation;
        this.layer.forEach(function (l) {
            l.ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
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
        var screen = this.screen, prop, opts, svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        svgCircle.setAttribute('cx', circle.center[0]);
        svgCircle.setAttribute('cy', circle.center[1]);
        svgCircle.setAttribute('r', circle.radius);

        if (options) {
            svgCircle.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
            opts = SVG.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    svgCircle.setAttribute(prop, opts[prop]);
                }
            }
        }

        this.ctx.appendChild(svgCircle);

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
        layer.ctx.textContent = '';
    },
    /**
    * Converts the options to the SVG options format
    *
    * @param {drawingOptions} options The drawing options
    * @return {svgDrawingOptions} The converted options
    */
    convertOptions: function (options) {
        var convertedOptions = {};
        if ('fillColor' in options) {
            convertedOptions.fill = colorConvert(options.fillColor);
        } else if ('color' in options) {
            convertedOptions.fill = colorConvert(options.color);
        }

        if ('font' in options) {
            convertedOptions.font = options.font;
        }

        if ('fontSize' in options) {
            convertedOptions.fontSize = options.fontSize;
        }

        if ('lineColor' in options) {
            convertedOptions.stroke = colorConvert(options.lineColor);
        } else if ('color' in options) {
            convertedOptions.stroke = colorConvert(options.color);
        }

        if ('dash' in options && options.dash.length !== 0) {
            convertedOptions['stroke-dasharray'] = options.dash;
        }

        if ('dashOffset' in options && options.dashOffset !== 0) {
            convertedOptions['stroke-dashoffset'] = options.dashOffset;
        }

        return convertedOptions;
    },
    /**
    * Draws a line on the screen.
    *
    * @param {Line} line The line to be drawn
    * @param {drawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Canvas} Returns the screen
    */
    line: function (line, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, points, prop, opts, svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        // Don't try to draw the line at infinity
        if (line.type === 'line' && isZero(line[0]) && isZero(line[1])) {
            return this;
        } else {
            points = this.screen.getLineEndPoints(line);
        }

        svgLine.setAttribute('x1', points[0][0]);
        svgLine.setAttribute('y1', points[0][1]);
        svgLine.setAttribute('x2', points[1][0]);
        svgLine.setAttribute('y2', points[1][1]);

        if (options) {
            svgLine.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
            opts = SVG.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    svgLine.setAttribute(prop, opts[prop]);
                }
            }
        }

        this.ctx.appendChild(svgLine);

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
    * @param {any} curve The path to be drawn
    * @param {pathDrawingOptions} options Optional drawing options
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
    * @return {Screen} Returns the screen
    */
    path: function (curve, options, redraw) {
        if (typeof options === "undefined") { options = {}; }
        if (typeof redraw === "undefined") { redraw = false; }
        var screen = this.screen, svgPathStroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'), svgPathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path'), step = 2 / (screen.scale.x - screen.scale.y), pathStringFill, pathStringStroke, from, to, prop, opts, x, y, i, path, paths = [], fx, fxold;

        // If curve is a function f, the path will be (x, f(x))
        if (typeof curve === 'function') {
            path = [];
            from = ('from' in options ? options.from : -screen.translation.x / screen.scale.x) - step;
            to = ('to' in options ? options.to : (screen.width - screen.translation.x) / screen.scale.x) + step;
            for (i = from; i <= to; i += step) {
                fx = curve(i);

                // Inline NaN test and disontinuity test
                // For more info see the corresponding function for canvas
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
            from = ('from' in options ? options.from : 0) - step;
            to = ('to' in options ? options.to : 2 * Math.PI) + step;
            for (i = from; i <= to; i += step) {
                path.push([x(i), y(i)]);
            }
            paths.push(path);
        } else {
            path = curve;
        }

        pathStringFill = 'M' + from + ' 0 ' + paths.reduce(function (previ, path) {
            return previ + ' L ' + path[0][0] + ' 0 ' + path.reduce(function (prev, cur) {
                return prev + ' L ' + cur.join(' ');
            }, '') + ' L ' + path[path.length - 1][0] + ' 0 ';
        }, '');

        pathStringStroke = paths.reduce(function (previ, path) {
            return previ + ' M ' + path[0].join(' ') + path.reduce(function (prev, cur) {
                return prev + ' L ' + cur.join(' ');
            }, '');
        }, '');

        if (pathStringFill !== '') {
            svgPathFill.setAttribute('d', pathStringFill);
        }
        if (pathStringStroke) {
            svgPathStroke.setAttribute('d', pathStringStroke);
        }

        svgPathStroke.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');

        if (options) {
            opts = SVG.convertOptions(options);
            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    svgPathFill.setAttribute(prop, opts[prop]);
                    svgPathStroke.setAttribute(prop, opts[prop]);
                }
            }
        }

        svgPathFill.setAttribute('stroke', 'transparent');
        svgPathStroke.setAttribute('fill', 'transparent');

        this.ctx.appendChild(svgPathFill);
        this.ctx.appendChild(svgPathStroke);

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
        var screen = this.screen, top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x, canvas = document.createElement('canvas'), canvasCtx = canvas.getContext('2d'), svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image'), svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g'), x, y, i, pxl, m = screen.transformation;

        canvas.width = screen.width;
        canvas.height = screen.height;
        canvasCtx.setTransform(m[0][0], m[1][0], m[0][1], m[1][1], m[0][2], m[1][2]);

        svgContainer.setAttribute('transform', 'matrix(' + 1 / m[0][0] + ', 0, 0, ' + 1 / m[1][1] + ', -' + m[0][2] / m[0][0] + ', ' + -m[1][2] / m[1][1] + ')');
        svgImage.setAttribute('width', screen.width + 'px');
        svgImage.setAttribute('height', screen.height + 'px');
        svgImage.setAttribute('x', '0');
        svgImage.setAttribute('y', '0');

        t = Math.min(top, t);
        r = Math.min(right, r);
        b = Math.max(bottom, b);
        l = Math.max(left, l);

        var tPxl = Math.floor(-t * screen.scale.y), rPxl = Math.floor(r * screen.scale.x), bPxl = Math.floor(-b * screen.scale.y), lPxl = Math.floor(l * screen.scale.x), w = (rPxl - lPxl), h = (tPxl - bPxl), imgData = canvasCtx.createImageData(w, h);

        for (y = tPxl, i = 0; y > bPxl; y--) {
            for (x = lPxl; x < rPxl; x++, i++) {
                pxl = f(x / screen.scale.x, y / screen.scale.y);
                imgData.data[4 * i] = pxl[0];
                imgData.data[4 * i + 1] = pxl[1];
                imgData.data[4 * i + 2] = pxl[2];
                imgData.data[4 * i + 3] = pxl[3];
            }
        }

        canvasCtx.putImageData(imgData, 0, 0);

        svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', canvas.toDataURL());

        svgContainer.appendChild(svgImage);
        this.ctx.appendChild(svgContainer);

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
        var screen = this.screen, prop, opts, dist, svgPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        svgPoint.setAttribute('cx', point[0] / point[2] + '');
        svgPoint.setAttribute('cy', point[1] / point[2] + '');
        svgPoint.setAttribute('r', (options.size || 10) / (screen.scale.x - screen.scale.y) + '');

        if (options) {
            svgPoint.setAttribute('stroke-width', (options.lineWidth || 4) / (screen.scale.x - screen.scale.y) + '');
            opts = SVG.convertOptions(options);

            if (!('fillOpacity' in options)) {
                opts['fill-opacity'] = '1';
            }

            if (!('fillColor' in options) && !('color' in options)) {
                opts.fill = 'black';
            }

            for (prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    svgPoint.setAttribute(prop, opts[prop]);
                }
            }
        }

        if (options.moveable) {
            svgPoint.setAttribute('cursor', 'move');

            // mousedown
            svgPoint.addEventListener('mousedown', function () {
                screen.options.interaction.type = 'move';
                var invTransformation = screen.transformation.inverse();

                var move = function (evt) {
                    evt.stopPropagation();

                    var evtPoint = invTransformation.times(screen.getEventPoint(evt));
                    point[0] = evtPoint[0];
                    point[1] = evtPoint[1];
                    screen.draw();
                }, up = function () {
                    screen.options.interaction.type = '';

                    document.body.removeEventListener('mousemove', move);
                    document.body.removeEventListener('mouseup', up);
                };

                // mousemove
                document.body.addEventListener('mousemove', move);

                // mouseup
                document.body.addEventListener('mouseup', up);
            });
        }

        this.ctx.appendChild(svgPoint);

        if (options.label) {
            dist = 1.75 * (options.size || 10) + 0.75 * (options.lineWidth || 4);
            screen.text(options.label, point[0] / point[2] + dist / (screen.scale.x - screen.scale.y), point[1] / point[2] + dist / (screen.scale.x - screen.scale.y), options, true);
        }

        svgPoint.addEventListener('contextmenu', function () {
            screen.options.interaction.type = 'contextmenu';
            var x = svgPoint.cx.baseVal.value, y = svgPoint.cy.baseVal.value;

            screen.contextMenu.innerHTML = '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_is_disabled MathLib_is_centered">Point</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Coordinates' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">cartesian: <span class="MathLib_is_selectable MathLib_is_right">(' + x.toFixed(3) + ', ' + y.toFixed(3) + ')</span></div>' + '<div class="MathLib_menuItem">polar: <span class="MathLib_is_selectable MathLib_is_right">(' + hypot(x, y).toFixed(3) + ', ' + Math.atan2(y, x).toFixed(3) + ')</span></div>' + '</menu>' + '</div>' + '<div class="MathLib_menuItem MathLib_temporaryMenuItem MathLib_hasSubmenu">Options' + '<menu class="MathLib_menu MathLib_submenu">' + '<div class="MathLib_menuItem">Moveable:' + '<input type="checkbox" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Size:' + '<input type="spinner" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Fill color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '<div class="MathLib_menuItem">Line color:' + '<input type="color" class="MathLib_is_right">' + '</div>' + '</menu>' + '</div>' + '<hr class="MathLib_separator MathLib_temporaryMenuItem">' + screen.contextMenu.innerHTML;
        });

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
    * @param {boolean} redraw Indicates if the current draw call is happening during a redraw
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
        }, opts, screen = this.screen, svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text'), svgTspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');

        opts = SVG.convertOptions(extendObject(defaults, options));

        svgTspan.textContent = str;
        svgTspan.setAttribute('x', x * screen.scale.x + '');
        svgTspan.setAttribute('y', y * screen.scale.y + '');
        svgText.setAttribute('transform', 'matrix(' + 1 / screen.scale.x + ', 0, 0, ' + 1 / screen.scale.y + ', 0, 0)');
        svgText.setAttribute('font-family', opts.font);
        svgText.setAttribute('font-size', opts.fontSize);
        svgText.setAttribute('fill', colorConvert(options.textColor || options.color) || defaults.textColor);
        svgText.setAttribute('fill-opacity', '1');
        svgText.setAttribute('stroke', colorConvert(options.textColor || options.color) || defaults.textColor);
        svgText.setAttribute('text-anchor', 'middle');

        // alignment-baseline isn't defined for text elements,
        // only for ‘tspan’, ‘tref’, ‘altGlyph’, ‘textPath’ elements.
        // see the [Specification](http://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty)
        // But it works for text elements, so we don't need an additional tspan element.
        svgTspan.setAttribute('alignment-baseline', 'middle');

        svgText.appendChild(svgTspan);
        this.ctx.appendChild(svgText);

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

