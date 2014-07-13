/**
 * Handles the mousemove event
 *
 * @param {MouseEvent} evt The event object
 */
onmousemove(evt : MouseEvent) {
	var p,
			devicePixelRatio = window.devicePixelRatio || 1;

	evt.preventDefault();

	// Pan mode
	if (this.options.interaction.type === 'pan') {
		p = this.getEventPoint(evt).minus(this.options.interaction.startPoint);
		this.translation.x = this.options.interaction.startTransformation[0][2] + p[0] / devicePixelRatio;
		this.translation.y = this.options.interaction.startTransformation[1][2] + p[1] / devicePixelRatio;
		this.draw();
	}
}
