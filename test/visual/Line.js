module('Line', {
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



asyncTest('draw', 2, function (assert) {
	var dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAFCUlEQVR4nO3asW0UQQCG0SmABmiABmiAkIAGCEhpgALYAkgJCJFtEmcQEpgCaIACoAEKWAIQkqXbswQ+rb/xe9KfeXXju9EnneUxmNc6lrGOZe9jANxMsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBYj6fV5t0y4vf2/scZre23Q9gJ5tg2XRjXr4SAhmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWMxmvRjr352PZwd/5mw8ufZz1/d445nnm8+cjYcHnzkfr7ae2Tz/+Xhz8Jnz8ePIMx82Xufrkffpy8brfDryzLeN13l35JmfG+/ZcvDn344HW+/Z0+/j46Fgre/Ho83Pxh2Y6g6sF+PlwWeqdyBz0A0uq2C5A/coWEzMV0IgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgSL2axjrLXdt9/3hi1HftmjwVrHWO7A+d2NPe7Gze/FnbwbyQ/Jpby27UspWO7Gv78Xd/Ju/M/ny13nKyGQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhAhmABGYIFZAgWkCFYQIZgARmCBWQIFpAhWECGYAEZggVkCBaQIVhM6LVNustxNS7H1e7nMLu9jdUm3fJne5/D7Pa2+wHsVFuGYNls2/0AdqotQ7Bstu1+ADvVliFYNtt2/yOanWr+6G7zjWn5twYgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMECMgQLyBAsIEOwgAzBAjIEC8gQLCBDsIAMwQIyBAvIECwgQ7CADMFiMr8ArLZ8rxdzB1wAAAAASUVORK5CYII=',
			canvas = new MathLib.Screen2D('screen', 
				{renderer: 'Canvas', width: 300, height: 300}
			),
			svg = new MathLib.Screen2D('screen', 
				{renderer: 'SVG', width: 300, height: 300, axes: false, grid: false, background: 'transparent'}
			),
			// The line at infinity is not drawn, but should not throw an error
			l0 = new MathLib.Line([0, 0, 1]),
			l1 = new MathLib.Line([0, 1, 0.8]),
			l2 = new MathLib.Line([0, 1, 0.6]),
			l3 = new MathLib.Line([0, 1, 0.4]),
			l4 = new MathLib.Line([0, 1, 0.2]),
			l5 = new MathLib.Line([1, 0, 0.2]);


			
	l0.draw([canvas, svg]);
	l1.draw([canvas, svg], {lineWidth: 10,});
	l2.draw([canvas, svg], {lineColor: 0xff0000, dash: [0.35, 0.1], dashOffset: 0.1});
	l3.draw([canvas, svg], {lineColor: 'orange', dash: [0.043]});
	l4.draw([canvas, svg], {color: '#0000bb'});
	l5.draw([canvas, svg], {color: 'rgba(0, 255, 0, 0.5)'});

	assert.imageEqual(canvas.layer.main.element, dataURL);
	assert.imageEqual(svg.element, dataURL);
});