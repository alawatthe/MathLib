/* global QUnit:true */

QUnit.extend(QUnit.assert, {
	imageEqual: function (canvas, reference, messagee) {

		var refCanvas = document.createElement('canvas'),
				refCtx, refData,
				diffCanvas = document.createElement('canvas'),
				diffCtx, diffData,
				ctx, data,
				h = canvas.height,
				w = canvas.width,
				channelErrors = 0,
				imageDistance = 0,
				message, diff, i, ii, rdiff, gdiff, bdiff, adiff, hue, passed, details,
				hue2rgb = function (h) {
										if (h < 0) {
											h += 1;
										}
										if (h > 1) {
											h -= 1;
										}
										if (h < 1 / 6) {
											return 6 * h;
										}
										if (h < 1 / 2) {
											return 1;
										}
										if (h < 2 / 3) {
											return  4 - h;
										}
										return 0;
									},
				indicator = function (bad, good, value) {
					return (Math.min(value, bad) - bad) / (3 * (good - bad));
				};


		if (typeof reference === 'string') {

			var image = new Image();
			image.onload = function () {
				refCanvas.height = h;
				refCanvas.width = w;
				refCtx = refCanvas.getContext('2d');
				refCtx.drawImage(image, 0, 0);

				QUnit.start();
				tester();
			};
			image.src = reference;

		}
		else {
			refCanvas = reference;
			refCtx = refCanvas.getContext('2d');

			QUnit.start();
			tester();
		}

		tester = function () {

		refData = refCtx.getImageData(0, 0, w, h).data;


		diffCanvas.height = h;
		diffCanvas.width = w;
		diffCtx = diffCanvas.getContext('2d');
		diffData = diffCtx.getImageData(0, 0, w, h);


		ctx = canvas.getContext('2d');
		data = ctx.getImageData(0, 0, w, h).data;


		// We are using a very primitive comparison algorithm.
		// Perhaps I implement a better Delta-E sometime.
    for (i = 0, ii = 4 * w * h; i < ii; i += 4) {
			rdiff = Math.abs(refData[i] - data[i]);
			gdiff = Math.abs(refData[i + 1] - data[i + 1]);
			bdiff = Math.abs(refData[i + 2] - data[i + 2]);
			adiff = Math.abs(refData[i + 3] - data[i + 3]);

			imageDistance += rdiff + gdiff + bdiff + adiff;
			channelErrors += !!rdiff + !!gdiff + !!bdiff + !!adiff;

			hue = indicator(200, 0, rdiff + gdiff + bdiff + adiff);

      diffData.data[i]     = hue2rgb(hue + 1 / 3) * 255;
      diffData.data[i + 1] = hue2rgb(hue) * 255;
      diffData.data[i + 2] = hue2rgb(hue - 1 / 3) * 255;
      diffData.data[i + 3] = 255;
    }

		diffCtx.putImageData(diffData, 0, 0);



		passed = w*h*4*0.05 > imageDistance;


		message = 
		'<div>Testing a ' + w + 'px by ' + h + 'px image (' + h*w + ' total pixels, ' + w*h*4 + ' channels).</div>' + 
		'<div>There were errors on ' + channelErrors + ' channels (' + (25*channelErrors/(w*h)).toFixed(3) + '%).</div>' + 
		'<div>The very primitive rgba-distance of the images is ' + imageDistance + '.</div><div>' + 
		'<div style="width:' + w + 'px;" class="qunit-figure"><div class="qunit-figcaption">The actual image</div><img src="' + canvas.toDataURL() + '" width="' + w + 'px" height="' + h + 'px"/></div>' +
		'<div style="width:' + w + 'px;" class="qunit-figure"><div class="qunit-figcaption">The reference image</div><img src="' + refCanvas.toDataURL() + '" width="' + w + 'px" height="' + h + 'px"/></div>' +
		'<div style="width:' + w + 'px;" class="qunit-figure"><div class="qunit-figcaption">The difference heatmap</div><img src="' + diffCanvas.toDataURL() + '" width="' + w + 'px" height="' + h + 'px"/></div><div class="qunit-clearfix"></div></div>';



		QUnit.config.current.assertions.push({
			result: passed,
			message: message
		});
		}
	}
});