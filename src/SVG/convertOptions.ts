// ### SVG.convertOptions
// Converts the options to the SVG options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fill = MathLib.colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fill = MathLib.colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions.font = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions.fontSize = opt.fontSize;
	}


	if ('lineColor' in opt) {
		convertedOptions.stroke = MathLib.colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		convertedOptions.stroke = MathLib.colorConvert(opt.color);
	}


	if ('dash' in opt && opt.dash.length !== 0) {
		convertedOptions['stroke-dasharray'] = opt.dash;
	}

	if ('dashOffset' in opt && opt.dashOffset !== 0) {
		convertedOptions['stroke-dashoffset'] = opt.dashOffset;
	}


	return convertedOptions;
},