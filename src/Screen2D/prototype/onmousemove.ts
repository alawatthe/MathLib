/**
 * Handles the mousemove event
 *
 * @param {event} evt The event object
 */
onmousemove(evt) {
	var p;

	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;
	

	// Pan mode
	if (this.options.interaction.type === 'pan') {
		p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
		this.translation.x = this.options.interaction.startTransformation[0][2] + p[0];
		this.translation.y = this.options.interaction.startTransformation[1][2] + p[1];
		this.draw();
	}
}