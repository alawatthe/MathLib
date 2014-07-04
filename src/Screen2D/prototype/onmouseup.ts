/**
 * Handles the mouseup event
 *
 * @param {MouseEvent} evt The event object
 */
onmouseup(evt : MouseEvent) {
	evt.preventDefault();

	// Go back to normal mode
	if (this.options.interaction.type === 'pan') {
		delete this.options.interaction.type;
		delete this.options.interaction.startPoint;
		delete this.options.interaction.startTransformation;
	}

}