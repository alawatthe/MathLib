/**
 * Handles the contextmenu event
 *
 * @param {event} evt The event object
 */
oncontextmenu(evt) {

	var listener,
			_this = this,
			menu = this.contextMenu,
			overlay = this.contextMenuOverlay;

	if (evt.preventDefault) {
	 evt.preventDefault();
	}
	evt.returnValue = false;


	menu.style.setProperty('top', (evt.clientY - 20) + 'px');
	menu.style.setProperty('left', evt.clientX + 'px');
	overlay.style.setProperty('display', 'block');


	listener = function () {
		overlay.style.setProperty('display', 'none');

		Array.prototype.forEach.call(_this.contextMenu.getElementsByClassName('MathLib_temporaryMenuItem'),
		function (x) {
			_this.contextMenu.removeChild(x);
		});

		overlay.removeEventListener('click', listener);
	};

	overlay.addEventListener('click', listener);
}
