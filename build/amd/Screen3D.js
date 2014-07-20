var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

    'use strict';

    // A function converting arrays to THREE.js vectors
    var to3js = function (x) {
        if (x.length === 2) {
            return new THREE.Vector2(x[0], x[1]);
        } else if (x.length === 3) {
            return new THREE.Vector3(x[0], x[1], x[2]);
        }
    };

    /*es6
    import {extendObject} from 'meta';
    import {Screen} from 'Screen';
    es6*/
    define(['meta', 'Screen'], function(MathLib) {
    /**
    * Three dimensional plotting
    *
    * @class
    * @augments Screen
    * @this {Screen3D}
    */
    var Screen3D = (function (_super) {
        __extends(Screen3D, _super);
        function Screen3D(id, options) {
            if (typeof options === "undefined") { options = {}; }
            _super.call(this, id, options);
            this.type = 'screen3D';

            var defaults = {
                anaglyphMode: false,
                axes: true,
                background: 0xffffff,
                camera: {
                    lookAt: [0, 0, 0],
                    position: [10, 10, 10]
                },
                // controls: 'Trackball',
                grid: {
                    xy: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, y: 1, r: 1 }
                    },
                    xz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { x: 1, z: 1, r: 1 }
                    },
                    yz: {
                        angle: Math.PI / 8,
                        color: 0xcccccc,
                        type: 'none',
                        tick: { y: 1, z: 1, r: 1 }
                    }
                },
                height: 500,
                renderer: 'WebGL',
                width: 500
            }, opts = MathLib.extendObject(defaults, options), scene = new THREE.Scene(), camera, renderer, controls, viewAngle, aspect, near, far;

            this.options = opts;
            this.scene = scene;

            // Camera
            // ======
            viewAngle = 45;
            aspect = opts.width / opts.height;
            near = 0.1;
            far = 20000;

            camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
            camera.position = to3js(opts.camera.position);
            camera.lookAt(to3js(opts.camera.lookAt));
            camera.up = new THREE.Vector3(0, 0, 1);
            scene.add(camera);

            // Renderer
            // ========
            renderer = new THREE[opts.renderer + 'Renderer']({ antialias: true, preserveDrawingBuffer: true });

            // Remove the warning message.
            this.wrapper.innerHTML = '';
            this.wrapper.appendChild(renderer.domElement);

            // Overwrite the renderer with the anaglyph mode renderer
            if (opts.anaglyphMode) {
                renderer = new THREE.AnaglyphEffect(renderer);
            }

            renderer.setSize(opts.width, opts.height);

            // Controls
            // ========
            // Other possible values are: 'FirstPerson', 'Fly', 'Orbit', 'Path', 'Roll', 'Trackback' or false
            // MathLib defaults to the TrackballControls
            // move mouse and left   click (or hold 'A') to rotate
            //                middle click (or hold 'S') to zoom
            //                right  click (or hold 'D') to pan
            if (opts.controls) {
                controls = new THREE[opts.controls + 'Controls'](camera, renderer.domElement);
            } else {
                controls = {
                    update: function () {
                    }
                };
            }

            // Light
            // =====
            var light1 = new THREE.PointLight(0xffffff);
            light1.position.set(0, 0, 200);
            scene.add(light1);
            var light2 = new THREE.PointLight(0xffffff);
            light2.position.set(0, 0, -200);
            scene.add(light2);

            // Background
            // ==========
            renderer.setClearColor(opts.background, 1);
            renderer.clear();

            // Grid
            // ====
            if (opts.grid) {
                this.drawGrid();
            }

            // Axes
            // ====
            if (opts.axes) {
                var axes = new THREE.AxisHelper(10);
                scene.add(axes);
            }

            // Animate the scene
            // =================
            function animate() {
                requestAnimationFrame(animate);
                render();
                update();
            }

            function update() {
                // var delta = clock.getDelta();
                controls.update();
            }

            // Render the scene
            function render() {
                renderer.render(scene, camera);
            }

            // kick of the animation loop
            animate();

            this.options = opts;
            this.element = renderer.domElement;
            this.renderer = renderer;
            this.camera = camera;

            this.container.className += ' MathLib_screen3D';
        }
        /**
        * Draws the grid.
        *
        * @return {Screen3D}
        */
        Screen3D.prototype.drawGrid = function () {
            if (!this.options.grid) {
                return this;
            }

            var _this = this, gridDrawer = function (opts, rotX, rotY) {
                var i, ii, tickX, tickY, lines, circles, rays, size = 10, grid = new THREE.Object3D(), color = new THREE.Color(opts.color);

                if (opts.type === 'cartesian') {
                    tickX = 'x' in opts.tick ? opts.tick.x : opts.tick.y;
                    tickY = 'z' in opts.tick ? opts.tick.z : opts.tick.y;
                    lines = new THREE.Shape();

                    for (i = -size; i <= size; i += tickX) {
                        lines.moveTo(-size, i);
                        lines.lineTo(size, i);
                    }

                    for (i = -size; i <= size; i += tickY) {
                        lines.moveTo(i, -size);
                        lines.lineTo(i, size);
                    }

                    grid.add(new THREE.Line(lines.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color }), THREE.LinePieces));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                } else if (opts.type === 'polar') {
                    circles = new THREE.Shape();
                    rays = new THREE.Shape();

                    for (i = 0; i <= size; i += opts.tick.r) {
                        circles.moveTo(i, 0);
                        circles.absarc(0, 0, i, 0, 2 * Math.PI + 0.001, false);
                    }
                    grid.add(new THREE.Line(circles.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    for (i = 0, ii = 2 * Math.PI; i < ii; i += opts.angle) {
                        rays.moveTo(0, 0);
                        rays.lineTo(size * Math.cos(i), size * Math.sin(i));
                    }

                    grid.add(new THREE.Line(rays.createPointsGeometry(), new THREE.LineBasicMaterial({ color: color })));

                    grid.rotation.x = rotX;
                    grid.rotation.y = rotY;

                    _this.scene.add(grid);
                }
            };

            gridDrawer(this.options.grid.xy, 0, 0);
            gridDrawer(this.options.grid.xz, Math.PI / 2, 0);
            gridDrawer(this.options.grid.yz, 0, Math.PI / 2);

            return this;
        };

        /**
        * Creates a parametric plot
        *
        * @param {function} f The function which is called on every argument
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.parametricPlot3D = function (f, options) {
            var defaults = {
                closed: false,
                debug: false,
                min: 0,
                max: 1,
                pointNum: 1000,
                radius: 0.05,
                segmentsRadius: 6,
                material: {
                    type: 'MeshLambert'
                }
            }, opts = MathLib.extendObject(defaults, options), Curve = THREE.Curve.create(function () {
            }, function (t) {
                t = (opts.max - opts.min) * t + opts.min;
                var ft = f(t);
                return new THREE.Vector3(ft[0], ft[1], ft[2]);
            }), mesh = new THREE.Mesh(new THREE.TubeGeometry(new Curve(), opts.pointNum, opts.radius, opts.segmentsRadius, opts.closed, opts.debug), new THREE[opts.material.type + 'Material'](opts.material));

            this.scene.add(mesh);

            return this;
        };

        /**
        * Creates a plot of a three dimensional function
        *
        * @param {function} f The map for the height
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.plot3D = function (f, options) {
            return this.surfacePlot3D(function (u, v) {
                return [u, v, f(u, v)];
            }, options);
        };

        /**
        * Adjust the rendering if the screen is resized
        *
        * @param {number} width The new width
        * @param {number} height The new height
        * @return {Screen3D}
        */
        Screen3D.prototype.resize = function (width, height) {
            this.renderer.setSize(width, height);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            return this;
        };

        /**
        * Creates a surface plot.
        *
        * @param {function} f The map for the surface
        * @param {object} options Optional drawing options
        * @return {Screen3D}
        */
        Screen3D.prototype.surfacePlot3D = function (f, options) {
            var defaults = {
                material: {
                    type: 'MeshLambert'
                },
                pointNumX: 100,
                pointNumY: 100,
                xmin: 0,
                xmax: 1,
                ymin: 0,
                ymax: 1
            }, opts = MathLib.extendObject(defaults, options), map = function (u, v) {
                u = (opts.xmax - opts.xmin) * u + opts.xmin;
                v = (opts.ymax - opts.ymin) * v + opts.ymin;
                var fuv = f(u, v);
                return new THREE.Vector3(fuv[0], fuv[1], fuv[2]);
            }, material = new THREE[opts.material.type + 'Material'](opts.material), mesh;

            material.side = THREE.DoubleSide;

            mesh = new THREE.Mesh(new THREE.ParametricGeometry(map, opts.pointNumX, opts.pointNumY, false), material);

            this.scene.add(mesh);

            return this;
        };
        return Screen3D;
    })(MathLib.Screen);
    MathLib.Screen3D = Screen3D;
return MathLib;
});
