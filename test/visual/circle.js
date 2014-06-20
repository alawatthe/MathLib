module('Circle', {
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
			),
			circle = new MathLib.Circle([0, 0], 1);

	equal(circle.draw(canvas), circle, 'The draw method should return the circle.');
});


asyncTest('visual test', function (assert) {
	var canvas = new MathLib.Screen2D('screen',
				{renderer: 'Canvas', width: 300, height: 300}
			),
			svg = new MathLib.Screen2D('screen',
				{renderer: 'SVG', width: 300, height: 300, axes: false, grid: false, background: 'transparent'}
			),
			c1 = new MathLib.Circle([0, 0], 1),
			c2 = new MathLib.Circle([0, 0], 0.75),
			c3 = new MathLib.Circle([0, 0], 0.5),
			c4 = new MathLib.Circle([-0.1, 0], 0.2),
			c5 = new MathLib.Circle([0.1, 0], 0.2);

	c1.draw([canvas, svg]);
	c2.draw([canvas, svg], {lineColor: 0xff0000, dash: [0.35, 0.1], dashOffset: 0.1});
	c3.draw([canvas, svg], {lineWidth: 10, lineColor: 'orange', dash: [0.043]});
	c4.draw([canvas, svg], {color: '#0000bb'});
	c5.draw([canvas, svg], {color: 'rgba(0, 255, 0, 0.5)'});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/circle_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/circle.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/circle.png');
	}
});
