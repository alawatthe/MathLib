/**
 * Handles the mouseup event
 *
 * @param {event} evt The event object
 */
onmouseup(evt) {
	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = false;

	// Go back to normal mode
	if (this.options.interaction.type === 'pan') {
		delete this.options.interaction.type;
		delete this.options.interaction.startPoint;
		delete this.options.interaction.startTransformation;
	}

}