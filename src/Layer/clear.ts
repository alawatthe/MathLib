/**
 * Clears the Layer
 *
 * @return {Layer} Returns the current Layer
 */
clear() {
	this.screen.renderer.clear(this);
	return this;
}