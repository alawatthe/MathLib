test('.draw()', 1, function () {
	var screen,
			div = document.createElement('div'),
			point = new MathLib.Point([0, 0, 1]);

	div.id = 'pointDraw';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen2D('pointDraw', {});

	equal(point.draw(screen), point, 'The draw method should return the point.');
});