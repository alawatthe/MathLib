module('Point', {
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



test('.draw()', 1, function () {
	var screen = new MathLib.Screen2D('screen'),
			p = new MathLib.Point([1, 0, 1]);

	equal(p.draw(screen), p, 'The draw method should return the point.');
});



asyncTest('draw', function (assert) {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300}
			),
			svg = new MathLib.Screen2D('screen',
				{renderer: 'SVG', width: 300, height: 300, axes: false, grid: false, background: 'transparent'}
			),
			// Points at infinity are not drawn, but should not throw an error
			p0 = new MathLib.Point([1, 0, 0]),
			p1 = new MathLib.Point([-0.8, 0, 1]),
			p2 = new MathLib.Point([-0.6, 0, 1]),
			p3 = new MathLib.Point([-0.4, 0, 1]),
			p4 = new MathLib.Point([-0.2, 0, 1]),
			p5 = new MathLib.Point([0, 0, 1]);


	p0.draw([canvas, svg]);
	p1.draw([canvas, svg], {lineWidth: 10});
	p2.draw([canvas, svg], {color: '#ff00aa', label: 'P'});
	p3.draw([canvas, svg], {fillColor: '#00aaff', lineColor: '#ffaa00'});
	p4.draw([canvas, svg], {color: '#0000bb', label: 'Q'});
	p5.draw([canvas, svg], {color: 'rgba(0, 255, 0, 0.5)'});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/point.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/point.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/point.png');
	}
});
