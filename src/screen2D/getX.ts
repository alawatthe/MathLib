// ### Screen2D.prototype.getX()
// Returns the x coordinate of the event.
//
// *@param {event}*  
// *@returns {number}*
getX (evt) {
	var osX;
	if (evt.offsetX) {
		osX = evt.offsetX;
	}
	else {
		osX = evt.layerX;
	}
	return (osX - this.curTranslateX) / this.curZoomX; 
}