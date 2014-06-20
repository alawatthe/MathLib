module('Line', {
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



asyncTest('draw', function (assert) {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300}
			),
			svg = new MathLib.Screen2D('screen',
				{renderer: 'SVG', width: 300, height: 300, axes: false, grid: false, background: 'transparent'}
			),
			// The line at infinity is not drawn, but should not throw an error
			l0 = new MathLib.Line([0, 0, 1]),
			l1 = new MathLib.Line([0, 1, 0.8]),
			l2 = new MathLib.Line([0, 1, 0.6]),
			l3 = new MathLib.Line([0, 1, 0.4]),
			l4 = new MathLib.Line([0, 1, 0.2]),
			l5 = new MathLib.Line([1, 0, 0.2]);


	l0.draw([canvas, svg]);
	l1.draw([canvas, svg], {lineWidth: 10});
	l2.draw([canvas, svg], {lineColor: 0xff0000, dash: [0.35, 0.1], dashOffset: 0.1});
	l3.draw([canvas, svg], {lineColor: 'orange', dash: [0.043]});
	l4.draw([canvas, svg], {color: '#0000bb'});
	l5.draw([canvas, svg], {color: 'rgba(0, 255, 0, 0.5)'});

	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/line_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/line.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/line.png');
	}
});
