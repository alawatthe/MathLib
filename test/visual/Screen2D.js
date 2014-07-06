module('Screen2D', {
	setup: function () {
		var divs = [],
				container = document.getElementById('testPlots'),
				i;

		for (i = 1; i <= 10; i++) {
			divs.push(document.createElement('div'));
		}

		divs.forEach(function (div, n) {
			div.id = 'screen' + (n + 1);
			div.className = 'screenDiv';
			container.appendChild(div);
		});
	},
	teardown: function () {
		document.getElementById('testPlots').innerHTML = '';
	}
});


asyncTest('.background default', function (assert) {
	var defaultBackgroundCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			defaultBackgroundSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);

		assert.imageEqual(defaultBackgroundCanvas.layer.back.element, 'http://localhost:8000/test/visual/screen2D_background_default.png');
	}
	else {
		expect(2);

		assert.imageEqual(defaultBackgroundCanvas.layer.back.element, 'http://localhost:8000/test/visual/screen2D_background_default.png');
		assert.imageEqual(defaultBackgroundSvg.element, 'http://localhost:8000/test/visual/screen2D_background_default.png');
	}
});


asyncTest('.background modified', function (assert) {
	var modifiedBackgroundCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, background: 0x00AAFF}
			),
			modifiedBackgroundSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false, background: 0x00AAFF}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);

		assert.imageEqual(modifiedBackgroundCanvas.layer.back.element, 'http://localhost:8000/test/visual/screen2D_background_modified.png');
	}
	else {
		expect(2);

		assert.imageEqual(modifiedBackgroundCanvas.layer.back.element, 'http://localhost:8000/test/visual/screen2D_background_modified.png');
		assert.imageEqual(modifiedBackgroundSvg.element, 'http://localhost:8000/test/visual/screen2D_background_modified.png');
	}
});



asyncTest('.pixel', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false}
			);

	canvas.pixel(function (x, y) {
		var c = new MathLib.Complex(x, y);
		return MathLib.argToRgba(c.sin().arg());
	}, 3, 3, -3, -3);

	svg.pixel(function (x, y) {
		var c = new MathLib.Complex(x, y);
		return MathLib.argToRgba(c.sin().arg());
	}, 3, 3, -3, -3);


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_pixel.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_pixel.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_pixel.png');
	}
});



asyncTest('.axes no', function (assert) {
	var noAxesCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, axes: false}
			),
			noAxesSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: false, axes: false, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(noAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no.png');
	}
	else {
		expect(2);
		assert.imageEqual(noAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no.png');
		assert.imageEqual(noAxesSvg.element, 'http://localhost:8000/test/visual/screen2D_axes_no.png');
	}
});


asyncTest('.axes default', function (assert) {
	var defaultAxesCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			defaultAxesSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: false, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(defaultAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_default.png');
	}
	else {
		expect(2);
		assert.imageEqual(defaultAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_default.png');
		assert.imageEqual(defaultAxesSvg.element, 'http://localhost:8000/test/visual/screen2D_axes_default.png');
	}
});


asyncTest('.axes no y axis', function (assert) {
	var noYAxesCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, axes: {y: false}}
			),
			noYAxesSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: false, axes: {y: false}, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(noYAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no_y_axis.png');
	}
	else {
		expect(2);
		assert.imageEqual(noYAxesCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no_y_axis.png');
		assert.imageEqual(noYAxesSvg.element, 'http://localhost:8000/test/visual/screen2D_axes_no_y_axis.png');
	}
});


asyncTest('.axes no label', function (assert) {
	var noLabelCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, axes: {label: false}}
			),
			noLabelSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: false, axes: {label: false}, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(noLabelCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no_label.png');
	}
	else {
		expect(2);
		assert.imageEqual(noLabelCanvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_axes_no_label.png');
		assert.imageEqual(noLabelSvg.element, 'http://localhost:8000/test/visual/screen2D_axes_no_label.png');
	}
});



asyncTest('.grid no', function (assert) {
	var noGridCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, grid: false}
			),
			noGridSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: false, axes: false, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(noGridCanvas.layer.grid.element, 'http://localhost:8000/test/visual/screen2D_grid_no.png');
	}
	else {
		expect(2);
		assert.imageEqual(noGridCanvas.layer.grid.element, 'http://localhost:8000/test/visual/screen2D_grid_no.png');
		assert.imageEqual(noGridSvg.element, 'http://localhost:8000/test/visual/screen2D_grid_no.png');
	}
});


asyncTest('.grid cartesian default', function (assert) {
	var defaultCartesianGridCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			defaultCartesianGridSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(defaultCartesianGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_cartesian_default.png');
	}
	else {
		expect(2);
		assert.imageEqual(defaultCartesianGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_cartesian_default.png');
		assert.imageEqual(defaultCartesianGridSvg.element, 'http://localhost:8000/test/visual/screen2D_grid_cartesian_default.png');
	}
});


asyncTest('.grid polar default', function (assert) {
	var defaultPolarGridCanvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}, grid: {type: 'polar'}}
			),
			defaultPolarGridSvg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, grid: {type: 'polar'}, axes: false, background: 'transparent'}
			);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(defaultPolarGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_polar_default_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(defaultPolarGridCanvas.layer.grid.element, 'http://localhost:8000/test/visual/screen2D_grid_polar_default.png');
		assert.imageEqual(defaultPolarGridSvg.element, 'http://localhost:8000/test/visual/screen2D_grid_polar_default.png');
	}
});


asyncTest('.grid cartesian modified', function (assert) {
	var modifiedCartesianGridCanvas = new MathLib.Screen2D('screen1', {
				renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3},
				grid: {x: true, y: true, lineColor: '#00AAFF', lineWidth: 15, dash: [0.1, 0.1]}
			}),
			modifiedCartesianGridSvg = new MathLib.Screen2D('screen2', {
				renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3},
				grid: {x: true, y: true, lineColor: '#00AAFF', lineWidth: 15, dash: [0.1, 0.1]}, axes: false, background: 'transparent'
			});

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(modifiedCartesianGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_cartesian_modified_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(modifiedCartesianGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_cartesian_modified.png');
		assert.imageEqual(modifiedCartesianGridSvg.element, 'http://localhost:8000/test/visual/screen2D_grid_cartesian_modified.png');
	}
});


asyncTest('.grid polar modified', function (assert) {
	var modifiedPolarGridCanvas = new MathLib.Screen2D('screen1', {
				renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3},
				grid: {type: 'polar', r: true, angle: {lineColor: '#00AAFF', lineWidth: 2,
				dash: [0.8, 0.1]}, lineColor: '#00AAFF', lineWidth: 2, dash: [0.8, 0.1]}
			}),
			modifiedPolarGridSvg = new MathLib.Screen2D('screen2', {
				renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, background: 'transparent', axes: false,
				grid: {type: 'polar', r: true, angle: {lineColor: '#00AAFF', lineWidth: 2,
				dash: [0.8, 0.1]}, lineColor: '#00AAFF', lineWidth: 2, dash: [0.8, 0.1]}
			});

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(modifiedPolarGridCanvas.layer.grid.element,
			'http://localhost:8000/test/visual/screen2D_grid_polar_modified_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(modifiedPolarGridCanvas.layer.grid.element, 'http://localhost:8000/test/visual/screen2D_grid_polar_modified.png');
		assert.imageEqual(modifiedPolarGridSvg.element, 'http://localhost:8000/test/visual/screen2D_grid_polar_modified.png');
	}
});


asyncTest('.path (1 function)', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1.1, y: 1.1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1.1, y: 1.1}, grid: false, axes: false, background: 'transparent'}
			);

	canvas.path(MathLib.sin);
	canvas.path(MathLib.exp, {lineColor: 0xFF00AA, lineWidth: 10});
	canvas.path(MathLib.cos, {lineColor: 0x00AAFF, fillColor: 'rgba(0,170,255,0.5)'});
	canvas.path(MathLib.ln, {lineColor: 'transparent', fillColor: 'rgba(170,255,0,0.5)'});
	canvas.path(function (x) {return MathLib.arccsc(2 * x) / 2;}, {lineColor: 'rgb(150,100,50)', fillColor: 'rgba(150,100,50,0.2)'});
	canvas.path(MathLib.sqrt, {dash: [0.1], lineColor: 0xFFAA00});
	// The domain of this function is not in the current view box.
	// We are just ensuring, that a path which is not on the screen does not give an error
	canvas.path(function (x) {return MathLib.arcsec(x / 2);});


	svg.path(MathLib.sin);
	svg.path(MathLib.exp, {lineColor: 0xFF00AA, lineWidth: 10});
	svg.path(MathLib.cos, {lineColor: 0x00AAFF, fillColor: 'rgba(0,170,255,0.5)'});
	svg.path(MathLib.ln, {lineColor: 'transparent', fillColor: 'rgba(170,255,0,0.5)'});
	svg.path(function (x) {return MathLib.arccsc(2 * x) / 2;}, {lineColor: 'rgb(150,100,50)', fillColor: 'rgba(150,100,50,0.2)'});
	svg.path(MathLib.sqrt, {dash: [0.1], lineColor: 0xFFAA00});
	svg.path(function (x) {return MathLib.arcsec(x / 2);});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_path_1_function_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_path_1_function.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_path_1_function.png');
	}
});



asyncTest('.path (2 functions)', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1.1, y: 1.1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1.1, y: 1.1}, grid: false, axes: false, background: 'transparent'}
			);

	canvas.path([MathLib.cos, MathLib.sin], {lineColor: 0x00AAFF, dash: [0.1]});
	canvas.path([function (x) {return Math.pow(Math.cos(x), 3);}, function (x) {return Math.pow(Math.sin(x), 3);}],
		{lineColor: 0x00FFAA, dash: [0.1]});
	canvas.path([function (x) {return Math.pow(Math.cos(x), 3);}, function (x) {return Math.pow(Math.sin(x), 3);}],
		{lineColor: 0xAA00FF, dash: [0.1], dashOffset: 0.1});
	canvas.path([function (x) {return Math.pow(Math.cos(x), 5);}, function (x) {return Math.pow(Math.sin(x), 5);}],
		{lineColor: 0xFFAA00, lineWidth: 10, fillColor: 'rgba(0,170,255,0.5)'});

	svg.path([MathLib.cos, MathLib.sin], {lineColor: 0x00AAFF, dash: [0.1]});
	svg.path([function (x) {return Math.pow(Math.cos(x), 3);}, function (x) {return Math.pow(Math.sin(x), 3);}],
		{lineColor: 0x00FFAA, dash: [0.1]});
	svg.path([function (x) {return Math.pow(Math.cos(x), 3);}, function (x) {return Math.pow(Math.sin(x), 3);}],
		{lineColor: 0xAA00FF, dash: [0.1], dashOffset: 0.1});
	svg.path([function (x) {return Math.pow(Math.cos(x), 5);}, function (x) {return Math.pow(Math.sin(x), 5);}],
		{lineColor: 0xFFAA00, lineWidth: 10, fillColor: 'rgba(0,170,255,0.5)'});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_path_2_functions_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_path_2_functions.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_path_2_functions.png');
	}
});



asyncTest('.text', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1, y: 1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1, y: 1}, axes: false, grid: false, background: 'transparent'}
			);

	canvas.text('Math', -0.5, 0.5, {fontSize: 50});
	canvas.text('L', 0, 0.5, {fontSize: 40});
	canvas.text('i', 0.1, 0.5, {color: '#00aaff', fontSize: 40});
	canvas.text('b', 0.2, 0.5, {textColor: 'orange', fontSize: 40});
	canvas.text('.js', 0.4, 0.5, {font: 'Times New Roman', fontSize: 40});
	canvas.text('javascript library', -0.5, -0.5);


	svg.text('Math', -0.5, 0.5, {fontSize: 50});
	svg.text('L', 0, 0.5, {fontSize: 40});
	svg.text('i', 0.1, 0.5, {color: '#00aaff', fontSize: 40});
	svg.text('b', 0.2, 0.5, {textColor: 'orange', fontSize: 40});
	svg.text('.js', 0.4, 0.5, {font: 'Times New Roman', fontSize: 40});
	svg.text('javascript library', -0.5, -0.5);

	if (navigator.userAgent === 'Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.7 Safari/534.34') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_text_phantomJS_legacy.png');
	}
	else if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_text_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/screen2D_text_phantomJS.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_text_phantomJS.png');
	}
});


asyncTest('.resize() keeping proportions', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1, y: 1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1, y: 1}}
			);

	canvas.resize(400, 400);
	svg.resize(400, 400);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_resized.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_resized.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_resized.png');
	}
});


asyncTest('.resize() changing proportions', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1, y: 1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1, y: 1}}
			);

	canvas.resize(500, 400);
	svg.resize(500, 400);

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_resized_changed_proportions.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_resized_changed_proportions.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_resized_changed_proportions.png');
	}
});


asyncTest('translating with the mouse', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 1, y: 1}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 1, y: 1}}
			);


	var down = document.createEvent('MouseEvents');
	down.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	canvas.wrapper.dispatchEvent(down);
	svg.wrapper.dispatchEvent(down);

	var move = document.createEvent('MouseEvents');
	move.initMouseEvent('mousemove', true, true, window, 0, 50, 50, 50, 50, false, false, false, false, 0, null);
	canvas.wrapper.dispatchEvent(move);
	svg.wrapper.dispatchEvent(move);

	var up = document.createEvent('MouseEvents');
	up.initMouseEvent('mouseup', true, true, window, 0, 50, 50, 50, 50, false, false, false, false, 0, null);
	canvas.wrapper.dispatchEvent(up);
	svg.wrapper.dispatchEvent(up);


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_translated.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.axes.element, 'http://localhost:8000/test/visual/screen2D_translated.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/screen2D_translated.png');
	}
});
