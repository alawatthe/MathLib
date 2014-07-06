module('Screen', {
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
	var screen = new MathLib.Screen('screen', {});

	equal(screen.width, 500, 'Default .width should be 500.');
	equal(screen.height, 500, 'Default .height should be 500.');
});



// Properties
test('.constructor', 1, function () {
	var screen = new MathLib.Screen('screen', {});

	equal(screen.constructor, MathLib.Screen, 'Testing .constructor');
});



test('.type', 1, function () {
	var screen = new MathLib.Screen('screen', {});

	equal(screen.type, 'screen', 'Testing .type');
});



test('figcaption', 2, function () {
	var screen = new MathLib.Screen('screen', {
		figcaption: 'A caption for the figure'
	});

	equal(screen.figure.children[1].localName, 'figcaption');
	equal(screen.figure.children[1].innerHTML, 'A caption for the figure');
});
