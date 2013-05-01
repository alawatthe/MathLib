// ### SVG.convertOptions
// Converts the options to the SVG options format
//
// *@param {object}* The drawing options  
// *@returns {object}* The converted options
convertOptions: function (opt) {
	var res:any = {};
	if ('fillColor' in opt) {
		res.fill = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		res.fill = colorConvert(opt.color);
	}


	if ('font' in opt) {
		res['font-family'] = opt.font;
	}

	if ('fontSize' in opt) {
		res['font-size'] = opt.fontSize;
	}

	if ('size' in opt) {
		res.size = opt.size;
	}


	if ('lineColor' in opt) {
		res.stroke = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		res.stroke = colorConvert(opt.color);
	}


	if ('dash' in opt && opt.dash.length !== 0) {
		res['stroke-dasharray'] = opt.dash;
	}

	if ('dashOffset' in opt && opt.dashOffset !== 0) {
		res['stroke-dashoffset'] = opt.dashOffset;
	}


	return res;
},