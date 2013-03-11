// ### Screen.prototype.onmousemove()
// Handles the mousemove event
//
// *@param {event}*
onmousemove(evt) {
	var p;

	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;
	

	// Pan mode
	if(this.interaction.type === 'pan') {
		p = this.getEventPoint(evt).minus(this.interaction.startPoint);
		this.translation.x = this.interaction.startTransformation[0][2] + p[0];
		this.translation.y = this.interaction.startTransformation[1][2] + p[1];
		this.draw();
	}
}