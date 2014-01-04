/**
 * Converts the options to the Canvas options format
 *
 * @param {object} options The drawing options  
 * @return {object} The converted options
 */
convertOptions: function (options) {
	var convertedOptions : any = {};
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