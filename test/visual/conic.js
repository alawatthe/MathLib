module('Conic', {
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


test('return value', 1, function () {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			conic = new MathLib.Conic([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

	equal(conic.draw(canvas), conic, 'The draw method should return the circle.');
});


asyncTest('visual test', function (assert) {
	var canvas = new MathLib.Screen2D('screen1',
				{renderer: 'Canvas', width: 300, height: 300, range: {x: 3, y: 3}}
			),
			svg = new MathLib.Screen2D('screen2',
				{renderer: 'SVG', width: 300, height: 300, range: {x: 3, y: 3}, axes: false, grid: false, background: 'transparent'}
			),
			ell = new MathLib.Conic(new MathLib.Matrix([[2, 0, 0], [0, 1, 0], [0, 0, -1]])),
			ell1 = new MathLib.Conic(new MathLib.Matrix([[2, -2, 2], [-2, 5, -5], [2, -5, -10]])),
			ell1N = ell1.normalize(),
			par = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, 0, 0.5], [0, 0.5, -1]])),
			hyp = new MathLib.Conic(new MathLib.Matrix([[2, 0, 0], [0, -1, 0], [0, 0, -1]])),
			hyp1 = new MathLib.Conic(new MathLib.Matrix([[-2, 0, 0], [0, 1, 0], [0, 0, -1]])),
			hyp2 = new MathLib.Conic(new MathLib.Matrix([[0, 1, 0], [1, 0, 0], [0, 0, -1]])),
			hyp3 = new MathLib.Conic(new MathLib.Matrix([[0, 2, 0], [1, 0, 0], [0, 0, -1]])),
			diag = new MathLib.Conic(new MathLib.Matrix([[1, 0, 0], [0, -1, 0], [0, 0, 0]])),
			ver = new MathLib.Conic(new MathLib.Matrix([[2, 0, 0], [0, 0, 0], [0, 0, -1]])),
			hor = new MathLib.Conic(new MathLib.Matrix([[0, 0, 0], [0, 1, 0], [0, 0, -1]])),
			dop = new MathLib.Conic(new MathLib.Matrix([[1, 0, -1], [0, 0, 0], [-1, 0, 1]])),
			dop1 = new MathLib.Conic(new MathLib.Matrix([[1, 1, -1], [1, 1, -1], [-1, -1, 1]]));


	ell.draw([svg, canvas], {lineColor: 'blue', fillColor: 'rgba(0,0,255,0.2)'});
	ell1.draw([svg, canvas], {lineColor: 'blueviolet', dash: [0.35, 0.1]});
	ell1N.draw([svg, canvas], {lineColor: 'blueviolet', dash: [0.35, 0.1]});
	par.draw([svg, canvas], {lineColor: 'yellow'});
	hyp.draw([svg, canvas], {lineColor: 'green'});
	hyp1.draw([svg, canvas], {lineColor: 'cyan'});
	hyp2.draw([svg, canvas], {lineColor: 'magenta'});
	hyp3.draw([svg, canvas], {lineColor: 'indigo'});
	diag.draw([svg, canvas], {lineColor: 'hotpink'});
	hor.draw([svg, canvas], {lineColor: 'orange'});
	ver.draw([svg, canvas], {lineColor: 'red'});
	dop.draw([svg, canvas], {lineColor: 'goldenrod'});
	dop1.draw([svg, canvas], {lineColor: 'tan'});


	if (typeof phantomJS !== 'undefined') {
		expect(1);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/conic_phantomJS.png');
	}
	else {
		expect(2);
		assert.imageEqual(canvas.layer.main.element, 'http://localhost:8000/test/visual/conic.png');
		assert.imageEqual(svg.element, 'http://localhost:8000/test/visual/conic.png');
	}
});
