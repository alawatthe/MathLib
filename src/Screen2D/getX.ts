// ### Screen2D.prototype.getX()
// Returns the x coordinate of the event.
//
// *@param {event}*  
// *@return {number}*
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