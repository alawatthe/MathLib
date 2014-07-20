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


/* jshint esnext:true */


import {} from 'Functn';
import {colorConvert, extendObject} from 'meta';
import {Circle} from 'Circle';
import {Layer} from 'Layer';
import {Matrix} from 'Matrix';
import {Point} from 'Point';
import {Screen} from 'Screen';


/**
* Two dimensional plotting
*
* @class
* @augments Screen
* @this {Screen2D}
*/
var Screen2D = (function (_super) {
    __extends(Screen2D, _super);
    function Screen2D(id, options) {
        if (typeof options === "undefined") { options = {}; }
        var _this = this;
        _super.call(this, id, options);
        this.type = 'screen2D';
        var defaults = {
            axes: {
                color: 0x000000,
                lineColor: 0x000000,
                textColor: 0x000000,
                /*						label: true
                label: false
                label: {
                x: true,
                y: false
                }
                */
                label: {
                    fontSize: 12,
                    font: 'Helvetica',
                    x: true,
                    y: true
                },
                x: true,
                y: true
            },
            grid: {
                // angle: Math.PI / 8,
                type: 'cartesian',
                lineColor: 0xcccccc,
                lineWidth: 4,
                dash: [],
                dashOffset: 0,
                // tick: {x: 1, y: 1, r: 1}
                x: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                y: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                r: { tick: 1, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 },
                angle: { tick: Math.PI / 8, lineColor: 0xcccccc, lineWidth: 4, dash: [], dashOffset: 0 }
            },
            interaction: {
                allowPan: true,
                allowZoom: true,
                zoomSpeed: 1
            },
            background: 0xffffff,
            lookAt: { x: 0, y: 0 },
            range: { x: 1, y: 1 },
            figcaption: '',
            renderer: 'Canvas',
            transformation: new Matrix([
                [Math.min(this.height, this.width) / 2, 0, this.width / 2],
                [0, -Math.min(this.height, this.width) / 2, this.height / 2],
                [0, 0, 1]
            ])
        }, opts = extendObject(defaults, options), element, transformation = opts.transformation, that = this;

        this.options = opts;
        this.renderer = MathLib[opts.renderer];

        this.circle = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.circle.apply(_this.layer.main, args);
        };
        this.line = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.line.apply(_this.layer.main, args);
        };
        this.path = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.path.apply(_this.layer.main, args);
        };

        // Should the pixel method default to the main layer or to the back layer?
        this.pixel = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.pixel.apply(_this.layer.main, args);
        };
        this.point = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.point.apply(_this.layer.main, args);
        };
        this.text = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.text.apply(_this.layer.main, args);
        };

        // Remove the warning message.
        this.wrapper.innerHTML = '';

        this.container.className += ' MathLib_screen2D';

        // This is just a dummy method for the following few lines.
        // The real applyTransformation method is specified after the creation of the layers.
        this.applyTransformation = function () {
        };

        // The interaction methods
        this.translation = {};
        this.scale = {};
        this.transformation = transformation;

        Object.defineProperty(this.translation, 'x', {
            get: function () {
                return that.transformation[0][2];
            },
            set: function (x) {
                that.transformation[0][2] = x;
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.translation, 'y', {
            get: function () {
                return that.transformation[1][2];
            },
            set: function (y) {
                that.transformation[1][2] = y;
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.scale, 'x', {
            get: function () {
                return that.transformation[0][0];
            },
            set: function (x) {
                that.transformation[0][0] = x;
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.scale, 'y', {
            get: function () {
                return that.transformation[1][1];
            },
            set: function (y) {
                that.transformation[1][1] = y;
                that.applyTransformation();
            }
        });

        this.lookAt = {};
        this.range = {};
        Object.defineProperty(this.lookAt, 'x', {
            get: function () {
                return (that.width / 2 - that.transformation[0][2]) / that.transformation[0][0];
            },
            set: function (x) {
                that.transformation[0][2] = that.width / 2 - x * that.transformation[0][0];
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.lookAt, 'y', {
            get: function () {
                return (that.height / 2 - that.transformation[1][2]) / that.transformation[1][1];
            },
            set: function (y) {
                that.transformation[1][2] = that.height / 2 - y * that.transformation[1][1];
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.range, 'x', {
            get: function () {
                return that.width / (2 * that.transformation[0][0]);
            },
            set: function (x) {
                that.transformation[0][0] = 0.5 * that.width / x;
                that.applyTransformation();
            }
        });

        Object.defineProperty(this.range, 'y', {
            get: function () {
                return -that.height / (2 * that.transformation[1][1]);
            },
            set: function (y) {
                that.transformation[1][1] = -0.5 * that.height / y;
                that.applyTransformation();
            }
        });

        this.range.x = opts.range.x;
        this.range.y = opts.range.y;
        this.lookAt.x = opts.lookAt.x;
        this.lookAt.y = opts.lookAt.y;

        // Create the SVG element which contains the layers
        if (opts.renderer === 'SVG') {
            // Create the canvas
            element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

            // Safari does not support .classList on SVG elements
            // This feature has be in webkit since [08/02/12](http://trac.webkit.org/changeset/124499)
            /* element.classList.add('MathLib_screen'); */
            element.className.baseVal = 'MathLib_screen';
            element.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            element.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            element.setAttribute('height', this.height + 'px');
            element.setAttribute('width', this.width + 'px');
            element.setAttribute('version', '1.1');

            element.setAttribute('stroke', '#000000');
            element.setAttribute('stroke-opacity', '1');
            element.setAttribute('fill', 'transparent');

            this.element = element;
            this.wrapper.appendChild(element);

            // if ('background' in options) {
            var background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            background.setAttribute('x', '0px');
            background.setAttribute('y', '0px');
            background.setAttribute('width', this.width + 'px');
            background.setAttribute('height', this.height + 'px');
            background.setAttribute('stroke', 'transparent');
            background.setAttribute('fill', 'background' in options ? colorConvert(options.background) : 'white');
            background.setAttribute('fill-opacity', '1');
            this.element.appendChild(background);
            // }
        }

        // Create the Layers
        // =================
        this.layer = [];
        this.layer.back = new Layer(this, 'back', 0);
        this.layer.grid = new Layer(this, 'grid', 1);
        this.layer.axes = new Layer(this, 'axes', 2);
        this.layer.main = new Layer(this, 'main', 3);

        this.wrapper.addEventListener('keydown', function (evt) {
            return _this.onkeydown(evt);
        }, false);
        this.wrapper.addEventListener('mouseup', function (evt) {
            return _this.onmouseup(evt);
        }, false);
        this.wrapper.addEventListener('mousedown', function (evt) {
            return _this.onmousedown(evt);
        }, false);
        this.wrapper.addEventListener('mousemove', function (evt) {
            return _this.onmousemove(evt);
        }, false);
        this.wrapper.addEventListener('mousewheel', function (evt) {
            return _this.onmousewheel(evt);
        }, false);

        // For Firefox: [Bug report for the missing onmousewheel method](https://bugzilla.mozilla.org/show_bug.cgi?id=111647)
        this.wrapper.addEventListener('DOMMouseScroll', function (evt) {
            return _this.onmousewheel(evt);
        }, false);

        this.applyTransformation = this.renderer.applyTransformation;

        this.draw = function (x, options) {
            var _this = this;
            if (typeof options === "undefined") { options = {}; }
            // Clear and redraw the screen
            if (arguments.length === 0) {
                this.layer.forEach(function (l) {
                    l.clear().draw();
                });
            } else if (x.type === 'circle') {
                this.circle(x, options);
            } else if (x.type === 'line') {
                this.line(x, options);
            } else if (Array.isArray(x)) {
                x.forEach(function (y) {
                    return _this[y.type](y, options);
                });
            }
        };

        if (this.options.contextMenu) {
            var gridType = opts.grid.type ? opts.grid.type : 'none';
            this.contextMenu.querySelectorAll('.MathLib_grid_type[value=' + gridType + ']')[0].checked = true;
        }

        this.draw();
    }
    /**
    * Draws the axes.
    *
    * @return {Screen2D}
    */
    Screen2D.prototype.drawAxes = function () {
        var _this = this;
        var i, line = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.line.apply(_this.layer.axes, args);
        }, text = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.text.apply(_this.layer.axes, args);
        }, options = {
            lineColor: colorConvert(this.options.axes.color),
            'stroke-width': -1 / this.transformation[1][1]
        }, textOptions = {
            font: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.font : '',
            fontSize: this.options.axes && 'label' in this.options.axes ? this.options.axes.label.fontSize : '',
            // fontSize: this.options.axes.label.fontSize,
            strokeStyle: colorConvert(this.options.axes.textColor),
            fillStyle: colorConvert(this.options.axes.textColor)
        }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lengthX = 10 / this.transformation[0][0], lengthY = -10 / this.transformation[1][1], yExp = 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3), xExp = 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3), yTick = Math.pow(10, yExp), xTick = Math.pow(10, xExp), xLen = Math.max(0, Math.min(20, -xExp)), yLen = Math.max(0, Math.min(20, -yExp));

        if (!this.options.axes) {
            return this;
        }

        // The axes
        if (this.options.axes.x) {
            line([[left, 0], [right, 0]], options, true);
        }
        if (this.options.axes.y) {
            line([[0, bottom], [0, top]], options, true);
        }

        // The ticks on the axes
        // The x axis
        if (this.options.axes.x) {
            for (i = 0; i >= left; i -= yTick) {
                line([[i, -lengthY], [i, lengthY]], options, true);
            }
            for (i = yTick; i <= right; i += yTick) {
                line([[i, -lengthY], [i, lengthY]], options, true);
            }
        }

        // The y axis
        if (this.options.axes.y) {
            for (i = 0; i >= bottom; i -= xTick) {
                line([[-lengthX, i], [lengthX, i]], options, true);
            }
            for (i = xTick; i <= top; i += xTick) {
                line([[-lengthX, i], [lengthX, i]], options, true);
            }
        }

        // The labels
        // The x axes
        // .toFixed() is necessary to display 0.3 as "0.3" and not as "0.30000000000000004".
        // .toFixed expects arguments between 0 and 20.
        if (this.options.axes.label) {
            if (this.options.axes.x) {
                for (i = -yTick; i >= left; i -= yTick) {
                    text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                }
                for (i = yTick; i <= right; i += yTick) {
                    text(i.toFixed(yLen), i, -2 * lengthY, textOptions, true);
                }
            }

            // The y axes
            if (this.options.axes.y) {
                for (i = -xTick; i >= bottom; i -= xTick) {
                    text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                }
                for (i = xTick; i <= top; i += xTick) {
                    text(i.toFixed(xLen), -2 * lengthX, i, textOptions, true);
                }
            } else {
                text((0).toFixed(yLen), 0, -2 * lengthY, textOptions, true);
            }
        }

        return this;
    };

    /**
    * Draws the grid.
    *
    * @return {Screen2D}
    */
    Screen2D.prototype.drawGrid = function () {
        var _this = this;
        if (!this.options.grid) {
            return this;
        }

        var i, ii, min, max, line = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.line.apply(_this.layer.grid, args);
        }, circle = function () {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            return _this.renderer.circle.apply(_this.layer.grid, args);
        }, top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, yTick = Math.pow(10, 1 - Math.floor(Math.log(-this.transformation[1][1]) / Math.LN10 - 0.3)), xTick = Math.pow(10, 1 - Math.floor(Math.log(this.transformation[0][0]) / Math.LN10 - 0.3));

        if (this.options.grid.type === 'cartesian') {
            // The vertical lines
            if (this.options.grid.x) {
                for (i = left - (left % xTick); i <= right; i += xTick) {
                    line([[i, bottom], [i, top]], extendObject(this.options.grid, this.options.grid.x), true);
                }
            }

            // The horizontal lines
            if (this.options.grid.y) {
                for (i = bottom - (bottom % yTick); i <= top; i += yTick) {
                    line([[left, i], [right, i]], extendObject(this.options.grid, this.options.grid.y), true);
                }
            }
            // Test for logarithmic plots
            /*for (i = left - (left % this.axes.tick.x); i <= right; i += this.axes.tick.x) {
            for (var j = 1; j <= 10; j++ ) {
            this.line([[i * Math.log(10) + Math.log(j), bottom], [i * Math.log(10) + Math.log(j), top]], options);
            }
            }*/
        } else if (this.options.grid.type === 'polar') {
            max = Math.sqrt(Math.max(top * top, bottom * bottom) + Math.max(left * left, right * right));
            min = 0; // TODO: improve this estimate

            if (this.options.grid.angle) {
                for (i = 0, ii = 2 * Math.PI; i < ii; i += this.options.grid.angle.tick) {
                    line([
                        [0, 0],
                        [max * Math.cos(i), max * Math.sin(i)]], extendObject(this.options.grid, this.options.grid.angle), true);
                }
            }

            if (this.options.grid.r) {
                for (i = min; i <= max; i += Math.min(xTick, yTick)) {
                    circle(new Circle([0, 0, 1], i), extendObject(this.options.grid, this.options.grid.r), true);
                }
            }
        }

        return this;
    };

    /**
    * Creates a point based on the coordinates of an event.
    *
    * @param {event} evt The event object
    * @return {Point}
    */
    Screen2D.prototype.getEventPoint = function (evt) {
        var x, y;
        if (evt.offsetX) {
            x = evt.offsetX;
            y = evt.offsetY;
        } else {
            x = evt.layerX;
            y = evt.layerY;
        }

        if (this.options.renderer === 'Canvas') {
            x /= window.devicePixelRatio;
            y /= window.devicePixelRatio;
        }

        return new Point([x, y, 1]);
    };

    /**
    * Calculates the both endpoints for the line
    * for drawing purposes
    *
    * @param {Line|array} l The Line to calculate the end points to
    * @return {array} The array has the format [[x1, y1], [x2, y2]]
    */
    Screen2D.prototype.getLineEndPoints = function (l) {
        if (l.type === 'line') {
            var top = (-this.translation.y) / this.scale.y, bottom = (this.height - this.translation.y) / this.scale.y, left = (-this.translation.x) / this.scale.x, right = (this.width - this.translation.x) / this.scale.x, lineRight = -(l[2] + l[0] * right) / l[1], lineTop = -(l[2] + l[1] * top) / l[0], lineLeft = -(l[2] + l[0] * left) / l[1], lineBottom = -(l[2] + l[1] * bottom) / l[0], points = [];

            if (lineRight <= top && lineRight >= bottom) {
                points.push([right, lineRight]);
            }
            if (lineLeft <= top && lineLeft >= bottom) {
                points.push([left, lineLeft]);
            }
            if (lineTop < right && lineTop > left) {
                points.push([lineTop, top]);
            }
            if (lineBottom < right && lineBottom > left) {
                points.push([lineBottom, bottom]);
            }
            return points;
        } else {
            return l;
        }
    };

    /**
    * Handles the keydown event
    *
    * @param {KeyboardEvent} evt The event object
    */
    Screen2D.prototype.onkeydown = function (evt) {
        var keyCode, keyTable = {
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40
        };

        // evt.key is the new property to identify the key pressed.
        // http://www.w3.org/TR/DOM-Level-3-Events/#widl-KeyboardEvent-key
        // Not supported in all browsers yet.
        if (evt.key) {
            if (['Up', 'Right', 'Down', 'Left'].indexOf(evt.key) === -1) {
                return;
            } else {
                keyCode = keyTable[evt.key];
            }
        } else if (evt.keyCode) {
            if ([37, 38, 39, 40].indexOf(evt.keyCode) === -1) {
                return;
            } else {
                keyCode = evt.keyCode;
            }
        } else {
            return;
        }

        evt.preventDefault();

        this.options.interaction.startTransformation = this.transformation.copy();

        this.translation.x = this.options.interaction.startTransformation[0][2] - 2 * ((evt.keyCode - 38) % 2);
        this.translation.y = this.options.interaction.startTransformation[1][2] - 2 * ((evt.keyCode - 39) % 2);
        this.draw();
    };

    /**
    * Handles the mousedown event
    *
    * @param {MouseEvent} evt The event object
    */
    Screen2D.prototype.onmousedown = function (evt) {
        // Only start the action if the left mouse button was clicked
        if (evt.button !== 0) {
            return;
        }

        evt.preventDefault();

        // Pan mode
        if (this.options.interaction.allowPan && !this.options.interaction.type) {
            this.options.interaction.type = 'pan';
            this.options.interaction.startPoint = this.getEventPoint(evt);
            this.options.interaction.startTransformation = this.transformation.copy();
        }
    };

    /**
    * Handles the mousemove event
    *
    * @param {MouseEvent} evt The event object
    */
    Screen2D.prototype.onmousemove = function (evt) {
        var p, devicePixelRatio = window.devicePixelRatio || 1;

        evt.preventDefault();

        // Pan mode
        if (this.options.interaction.type === 'pan') {
            p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
            this.translation.x = this.options.interaction.startTransformation[0][2] + p[0] / devicePixelRatio;
            this.translation.y = this.options.interaction.startTransformation[1][2] + p[1] / devicePixelRatio;
            this.draw();
        }
    };

    /**
    * Handles the mouseup event
    *
    * @param {MouseEvent} evt The event object
    */
    Screen2D.prototype.onmouseup = function (evt) {
        evt.preventDefault();

        // Go back to normal mode
        if (this.options.interaction.type === 'pan') {
            delete this.options.interaction.type;
            delete this.options.interaction.startPoint;
            delete this.options.interaction.startTransformation;
        }
    };

    /**
    * Handles the mousewheel event
    *
    * @param {MouseEvent} evt The event object
    */
    Screen2D.prototype.onmousewheel = function (evt) {
        var delta, s, p, z;

        if (this.options.interaction.allowZoom) {
            evt.preventDefault();

            // Chrome/Safari
            if (evt.wheelDelta) {
                delta = evt.wheelDelta / 360;
            } else {
                delta = evt.detail / -9;
            }

            // The amount of zoom is determined by the zoom speed
            // and the amount how much the scrollwheel has been moved
            z = Math.pow(1 + this.options.interaction.zoomSpeed, delta);

            // Transform the (computer-)screen coordinates of the mouse to the internal coordinates
            p = this.transformation.inverse().times(this.getEventPoint(evt));

            // Compute new scale matrix in current mouse position
            s = new Matrix([[z, 0, p[0] - p[0] * z], [0, z, p[1] - p[1] * z], [0, 0, 1]]);

            this.transformation = this.transformation.times(s);

            this.applyTransformation();
            this.draw();
        }
    };

    /**
    * Adjust the rendering if the screen is resized
    *
    * @param {number} width The new width
    * @param {number} height The new height
    * @return {Screen2D}
    */
    Screen2D.prototype.resize = function (width, height) {
        var lookAtX = this.lookAt.x, lookAtY = this.lookAt.y;

        this.height = height;
        this.width = width;

        if (this.options.renderer === 'Canvas') {
            this.layer.back.element.width = width;
            this.layer.back.element.height = height;
            this.layer.back.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

            this.layer.grid.element.width = width;
            this.layer.grid.element.height = height;
            this.layer.grid.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.layer.grid.ctx.strokeStyle = colorConvert(this.options.grid.color) || '#cccccc';

            this.layer.axes.element.width = width;
            this.layer.axes.element.height = height;
            this.layer.axes.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            this.layer.axes.ctx.strokeStyle = colorConvert(this.options.axes.color) || '#000000';

            this.layer.main.element.width = width;
            this.layer.main.element.height = height;
            this.layer.main.ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        } else if (this.options.renderer === 'SVG') {
            this.element.setAttribute('width', width + 'px');
            this.element.setAttribute('height', height + 'px');
        }

        this.lookAt.x = lookAtX;
        this.lookAt.y = lookAtY;

        this.applyTransformation();
        this.draw();

        return this;
    };
    return Screen2D;
})(Screen);
export default Screen2D;

