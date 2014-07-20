
    'use strict';

    /*es6
    import {colorConvert} from 'meta';
    import {Canvas} from 'Canvas';
    import {SVG} from 'SVG';
    es6*/
    define(['meta', 'Screen2D'], function(MathLib) {
    /**
    * Layers for two dimensional plotting
    *
    * @class Layer
    * @this {Layer}
    */
    var Layer = (function () {
        function Layer(screen, id, zIndex) {
            var _this = this;
            this.screen = screen;
            this.id = id;
            this.zIndex = zIndex;

            this.stack = [];
            this.transformation = screen.transformation;

            var element, devicePixelRatio = window.devicePixelRatio || 1;

            if (screen.options.renderer === 'Canvas') {
                // Create the canvas
                element = document.createElement('canvas');
                element.className += ' MathLib_screen';
                element.width = screen.width * devicePixelRatio;
                element.height = screen.height * devicePixelRatio;

                if (devicePixelRatio !== 1) {
                    element.style.transformOrigin = 'top left';
                    element.style['-ms-transformOrigin'] = 'top left';
                    element.style.transform = 'scale(' + 1 / devicePixelRatio + ')';
                    element.style['-ms-transform'] = 'scale(' + 1 / devicePixelRatio + ')';
                    element.style['-webkit-transform'] = 'translate(-' + screen.width / devicePixelRatio + 'px, -' + screen.height / devicePixelRatio + 'px) scale(' + 1 / devicePixelRatio + ')';
                }

                screen.wrapper.appendChild(element);
                this.element = element;

                // Get the context and apply the transformations
                this.ctx = element.getContext('2d');

                this.applyTransformation = function () {
                    var m = _this.transformation;
                    _this.ctx.setTransform(devicePixelRatio * m[0][0], m[1][0], m[0][1], devicePixelRatio * m[1][1], devicePixelRatio * m[0][2], devicePixelRatio * m[1][2]);
                };
                this.applyTransformation();

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        var top = (-screen.translation.y) / screen.scale.y, bottom = (screen.height - screen.translation.y) / screen.scale.y, left = (-screen.translation.x) / screen.scale.x, right = (screen.width - screen.translation.x) / screen.scale.x;

                        // Draw the background
                        this.ctx.fillStyle = MathLib.colorConvert(screen.options.background);
                        this.ctx.fillRect(left, bottom, right - left, top - bottom);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.grid.color) || '#cccccc';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        // _this.ctx.lineWidth = (screen.options.grid.lineWidth || 4) / (screen.scale.x - screen.scale.y);
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    this.ctx.strokeStyle = MathLib.colorConvert(screen.options.axes.color) || '#000000';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);
                        _this.screen.drawAxes();
                    };
                } else {
                    this.ctx.strokeStyle = '#000000';
                    this.ctx.fillStyle = 'rgba(255, 255, 255, 0)';

                    this.draw = function () {
                        _this.ctx.lineWidth = 4 / (screen.scale.x - screen.scale.y);

                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.Canvas.circle;
                this.line = MathLib.Canvas.line;
                this.path = MathLib.Canvas.path;
                this.pixel = MathLib.Canvas.pixel;
                this.point = MathLib.Canvas.point;
                this.text = MathLib.Canvas.text;
            } else if (screen.options.renderer === 'SVG') {
                var ctx = document.createElementNS('http://www.w3.org/2000/svg', 'g'), m = screen.transformation;

                ctx.className.baseVal = 'MathLib_layer_' + id;
                ctx.setAttribute('transform', 'matrix(' + m[0][0] + ', ' + m[1][0] + ', ' + m[0][1] + ', ' + m[1][1] + ', ' + m[0][2] + ', ' + m[1][2] + ')');
                screen.element.appendChild(ctx);
                this.ctx = ctx;

                // Set the drawing functions
                if (id === 'back') {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                } else if (id === 'grid') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.grid.color) || '#cccccc');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawGrid();
                    };
                } else if (id === 'axes') {
                    ctx.setAttribute('stroke', MathLib.colorConvert(screen.options.axes.color) || '#000000');

                    this.draw = function () {
                        ctx.setAttribute('stroke-width', 4 / (screen.scale.x - screen.scale.y) + '');
                        _this.screen.drawAxes();
                    };
                } else {
                    this.draw = function () {
                        this.stack.forEach(function (x) {
                            if (x.type === 'conic') {
                                x.object.draw(_this, x.options, true);
                            } else if (x.type === 'text') {
                                _this.text(x.object, x.x, x.y, x.options, true);
                            } else if (x.type === 'pixel') {
                                _this.pixel(x.object, x.t, x.r, x.b, x.l, x.options, true);
                            } else {
                                _this[x.type](x.object, x.options, true);
                            }
                        });
                    };
                }

                this.circle = MathLib.SVG.circle;
                this.line = MathLib.SVG.line;
                this.path = MathLib.SVG.path;
                this.pixel = MathLib.SVG.pixel;
                this.point = MathLib.SVG.point;
                this.text = MathLib.SVG.text;
            }

            // Insert the layer into the layer array of the screen object.
            screen.layer.splice(zIndex, 0, this);
        }
        /**
        * Clears the Layer
        *
        * @return {Layer} Returns the current Layer
        */
        Layer.prototype.clear = function () {
            this.screen.renderer.clear(this);
            return this;
        };
        return Layer;
    })();
    MathLib.Layer = Layer;
return MathLib;
});
