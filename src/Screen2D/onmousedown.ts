/**
 * Handles the mousedown event
 *
 * @param {event} evt The event object
 */
onmousedown(evt) {
	// Only start the action if the left mouse button was clicked
	if (evt.button !== 0) {
		return;
	}


	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;

	// Pan mode
	if (this.options.interaction.allowPan && !this.options.interaction.type) {
		this.options.interaction.type = 'pan'
		this.options.interaction.startPoint = this.getEventPoint(evt);
		this.options.interaction.startTransformation = this.transformation.copy();
	}
}