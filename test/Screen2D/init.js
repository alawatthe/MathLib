module('Screen2D', {
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

test('init', 2, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');
});



// Properties
test('.constructor', 1, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.constructor, MathLib.Screen2D, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen = new MathLib.Screen2D('screen', {});

	equal(screen.type, 'screen2D', 'Testing .type');
});



test('focus', 3, function () {
	var screen = new MathLib.Screen2D('screen', {});

	var click = document.createEvent('MouseEvents');
	click.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	screen.wrapper.dispatchEvent(click);

	equal(screen.wrapper, document.activeElement);

	screen.wrapper.blur();
	notEqual(screen.wrapper, document.activeElement);

	screen.wrapper.focus();
	equal(screen.wrapper, document.activeElement);
});
