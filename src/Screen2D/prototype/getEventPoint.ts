/**
 * Creates a point based on the coordinates of an event.
 *
 * @param {event} evt The event object
 * @return {Point}
 */
getEventPoint(evt) {
	var x, y;
	if (evt.offsetX) {
		x = evt.offsetX;
		y = evt.offsetY;
	}
	else {
		x = evt.layerX;
		y = evt.layerY;
	}
	return new MathLib.Point([x, y, 1]);
}