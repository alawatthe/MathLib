module('Functn', {
	setup: function () {
		var div = document.createElement('div');
		div.id = 'screen';

		document.body.appendChild(div);
	},
	teardown: function () {
		var div = document.getElementById('screen');

		div.parentElement.removeChild(div);
	}
});


test('return value', 1, function () {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			);

	equal(MathLib.sin.draw(canvas), MathLib.sin, 'The draw method should return the functn.');
});


asyncTest('.draw()', function (assert) {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			svg = new MathLib.Screen2D('screen',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false, background: 'transparent'}
			);

	MathLib.exp.draw([canvas, svg]);
	MathLib.sin.draw([canvas, svg], {lineColor: 0x00AAFF, lineWidth: 10});
	MathLib.cos.draw([canvas, svg], {lineColor: 'red', lineWidth: 2, dash: [0.5, 0.5]});

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/functn_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/functn.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/functn.png');
	}
});


asyncTest('discontinuities', function (assert) {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			svg = new MathLib.Screen2D('screen',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false, background: 'transparent'}
			);

	MathLib.cot.draw([canvas, svg], {lineColor: '#00AAFF'});
	MathLib.sign.draw([canvas, svg], {lineColor: '#FFAA00'});
	canvas.path(function (x) {
		return MathLib.ln(x - 1) + 3;
	}, {lineColor: '#AA00FF'});
	svg.path(function (x) {
		return MathLib.ln(x - 1) + 3;
	}, {lineColor: '#AA00FF'});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/discontinuities.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/discontinuities.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/discontinuities.png');
	}
});
