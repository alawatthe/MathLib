// ### Canvas.convertOptions
// Converts the options to the Canvas options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fillStyle = MathLib.colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fillStyle = MathLib.colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions.font = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions.fontSize = opt.fontSize;
	}


	if ('lineColor' in opt) {
		convertedOptions.strokeStyle = MathLib.colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		convertedOptions.strokeStyle = MathLib.colorConvert(opt.color);
	}


	return convertedOptions;
},