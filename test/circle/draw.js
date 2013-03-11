test('.draw()', 1, function () {
	var screen,
			div = document.createElement('div'),
			circle = new MathLib.Circle([0, 0], 1);

	div.id = 'circleDraw';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen2D('circleDraw', {});

	equal(circle.draw(screen), circle, 'The draw method should return the circle.');
});