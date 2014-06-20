module('Screen3D', {
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


asyncTest('.background default', 1, function (assert) {
	var defaultBackgroundCanvas = new MathLib.Screen3D('screen',
				{renderer: 'Canvas', width: 300, height: 300, axes: false}
			);

	assert.imageEqual(defaultBackgroundCanvas.element, 'http://localhost:8000/test/visual/screen3D_background_default.png');
});


asyncTest('.background modified', 1, function (assert) {
	var modifiedBackgroundCanvas = new MathLib.Screen3D('screen',
				{renderer: 'Canvas', width: 300, height: 300, axes: false, background: 0x00AAFF}
			);

	assert.imageEqual(modifiedBackgroundCanvas.element, 'http://localhost:8000/test/visual/screen3D_background_modified.png');
});
