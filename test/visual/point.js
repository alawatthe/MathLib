test('.draw()', 1, function () {
	var screen,
			point = new MathLib.Point([0, 0, 1]),
			div = document.createElement('div');

	div.id = 'pointDraw';
	document.body.appendChild(div);

	screen = new MathLib.Screen2D('pointDraw', {});

	equal(point.draw(screen), point, 'The draw method should return the point.');

	div.parentElement.removeChild(div);
});