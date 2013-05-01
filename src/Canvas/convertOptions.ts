// ### Canvas.convertOptions
// Converts the options to the Canvas options format
//
// *@param {object}* The drawing options  
// *@returns {object}* The converted options
convertOptions: function(opt) {
	var res:any = {};
	if ('fillColor' in opt) {
		res.fillStyle = colorConvert(opt.fillColor);
	}
	else if ('color' in opt) {
		res.fillStyle = colorConvert(opt.color);
	}


	if ('font' in opt) {
		res['font-family'] = opt.font;
	}

	if ('fontSize' in opt) {
		res['font-size'] = opt.fontSize;
	}


	if ('lineColor' in opt) {
		res.strokeStyle = colorConvert(opt.lineColor);
	}
	else if ('color' in opt) {
		res.strokeStyle = colorConvert(opt.color);
	}

	return res;
},