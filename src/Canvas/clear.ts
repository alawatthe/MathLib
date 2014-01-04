/**
 * Clears a given Layer.
 *
 * @param {Layer} layer The layer to be cleared
 */
clear: function (layer : Layer) {
	var screen = layer.screen,
			left   = -screen.translation.x / screen.scale.x,
			top    = -screen.translation.y / screen.scale.y,
			width  =  screen.width         / screen.scale.x,
			height =  screen.height        / screen.scale.y;

	layer.ctx.clearRect(left, top, width, height);
},