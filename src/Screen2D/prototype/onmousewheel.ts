/**
 * Handles the mousewheel event
 *
 * @param {MouseEvent} evt The event object
 */
onmousewheel(evt : MouseEvent) {
	var delta, s, p, z;

	if (this.options.interaction.allowZoom) {

		evt.preventDefault();

		// Chrome/Safari
		if ((<any>evt).wheelDelta) {
			delta = (<any>evt).wheelDelta / 360;
		}
		// Firefox
		else {
			delta = evt.detail / -9;
		}

		// The amount of zoom is determined by the zoom speed
		// and the amount how much the scrollwheel has been moved
		z = Math.pow(1 + this.options.interaction.zoomSpeed, delta);


		// Transform the (computer-)screen coordinates of the mouse to the internal coordinates
		p = this.transformation.inverse().times(this.getEventPoint(evt));


		// Compute new scale matrix in current mouse position
		s = new MathLib.Matrix([[z, 0, p[0] - p[0] * z], [0, z, p[1] - p[1] * z], [0, 0, 1]]);

		this.transformation = this.transformation.times(s);

		this.applyTransformation();
		this.draw();

	}
}