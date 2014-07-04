/**
 * Handles the keydown event
 *
 * @param {KeyboardEvent} evt The event object
 */
onkeydown(evt : KeyboardEvent) {
	var keyCode,
			keyTable = {
				Left: 37,
				Up: 38,
				Right: 39,
				Down: 40
			};

	// evt.key is the new property to identify the key pressed.
	// http://www.w3.org/TR/DOM-Level-3-Events/#widl-KeyboardEvent-key
	// Not supported in all browsers yet.
	if (evt.key) {
		if (['Up', 'Right', 'Down', 'Left'].indexOf(evt.key) === -1) {
			return;
		}
		else {
			keyCode = keyTable[evt.key];
		}
	}
	// Else if evt.key is not available we use the deprecated evt.keyCode.
	// Why aren't we using evt.keyCode all the time?
	// Because we want to use the + and - keys later to zoom the plot.
	// And evt.keyCode is completely unuseable for the + and - keys.
	else if (evt.keyCode) {
		if ([37, 38, 39, 40].indexOf(evt.keyCode) === -1) {
			return;
		}
		else {
			keyCode = evt.keyCode;
		}
	}
	// We don't know what you did, so we don't do anything.
	else {
		return;
	}

	evt.preventDefault();

	this.options.interaction.startTransformation = this.transformation.copy();

	this.translation.x = this.options.interaction.startTransformation[0][2] - 2 * ((evt.keyCode - 38) % 2);
	this.translation.y = this.options.interaction.startTransformation[1][2] - 2 * ((evt.keyCode - 39) % 2);
	this.draw();
}