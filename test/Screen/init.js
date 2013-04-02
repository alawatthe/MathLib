module('Screen');
test('init', 2, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenConstructor';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenConstructor', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');

});



// Properties
test('.constructor', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenConstructor';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenConstructor', {});
	equal(screen.constructor, MathLib.Screen, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen,
			div = document.createElement('div');

	div.id = 'ScreenType';
	document.getElementById('testPlots').appendChild(div);

	screen = new MathLib.Screen('ScreenType', {});
	equal(screen.type, 'screen', 'Testing .type');
});