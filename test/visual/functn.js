test('.draw()', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'functnDraw';
	document.body.appendChild(div);

	screen = new MathLib.Screen2D('functnDraw', {});

	equal(MathLib.sin.draw(screen), MathLib.sin, 'The draw method should return the functn.');

	div.parentElement.removeChild(div);
});