// ### Screen.prototype.onmouseup()
// Handles the mouseup event
//
// *@param {event}*
onmouseup(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.returnValue = false;

  // Go back to normal mode
  if(this.interaction.type === 'pan') {
    delete this.interaction.type;
    delete this.interaction.startPoint;
    delete this.interaction.startTransformation;
  }

}