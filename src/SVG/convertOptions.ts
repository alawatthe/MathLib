// ### SVG.convertOptions
// Converts the options to the SVG options format
//
// *@param {object}* The drawing options  
// *@return {object}* The converted options
convertOptions: function (opt) {
	var convertedOptions : any = {};
	if ('fillColor' in opt) {
		convertedOptions.fill = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		convertedOptions.fill = colorConvert(opt.color);
	}


	if ('font' in opt) {
		convertedOptions['font-family'] = opt.font;
	}

	if ('fontSize' in opt) {
		convertedOptions['font-size'] = opt.fontSize;
	}

	if ('size' in opt) {
		convertedOptions.size = opt.size;
	}


	if ('lineColor' in opt) {
		convertedOptions.stroke = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		convertedOptions.stroke = colorConvert(opt.color);
	}


	if ('dash' in opt && opt.dash.length !== 0) {
		convertedOptions['stroke-dasharray'] = opt.dash;
	}

	if ('dashOffset' in opt && opt.dashOffset !== 0) {
		convertedOptions['stroke-dashoffset'] = opt.dashOffset;
	}


	return convertedOptions;
},