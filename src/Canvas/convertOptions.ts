// ### Canvas.convertOptions
// Converts the options to the Canvas options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fillStyle = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fillStyle = colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions['font-family'] = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions['font-size'] = opt.fontSize;
	}


	if ('lineColor' in opt) {
		convertedOptions.strokeStyle = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		convertedOptions.strokeStyle = colorConvert(opt.color);
	}

	return convertedOptions;
},