/**
 * Converts the options to the Canvas options format
 *
 * @param {drawingOptions} options The drawing options  
 * @return {canvasDrawingOptions} The converted options
 */
convertOptions: function (options : drawingOptions) : canvasDrawingOptions {
	var convertedOptions : canvasDrawingOptions = {};

	if ('fillColor' in options) {
		convertedOptions.fillStyle = MathLib.colorConvert(options.fillColor);
	}
	else if ('color' in options) {
		convertedOptions.fillStyle = MathLib.colorConvert(options.color);
	}


	if ('font' in options) {
		convertedOptions.font = options.font;
	}

	if ('fontSize' in options) {
		convertedOptions.fontSize = options.fontSize;
	}


	if ('lineColor' in options) {
		convertedOptions.strokeStyle = MathLib.colorConvert(options.lineColor);
	}
	else if ('color' in options) {
		convertedOptions.strokeStyle = MathLib.colorConvert(options.color);
	}

	return convertedOptions;
},