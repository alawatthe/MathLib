// ### Screen.prototype.contextmenu()
// Handles the contextmenu event
//
// *@param {event}*
oncontextmenu(evt) {
  if (evt.preventDefault) {
   evt.preventDefault();
  }
  evt.returnValue = false;


  var x = 200, //this.getX(evt),
      y = 200, //this.getY(evt),
      menu = this.contextMenu,
      overlay = this.contextMenuOverlay;
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  overlay.style.setProperty('display', 'block');
  
//  menu.childNodes[0].childNodes[2].childNodes[0].innerHTML = 'cartesian: (' + MathLib.round(x, 2) + ', ' + MathLib.round(y, 2) + ')';
//  menu.childNodes[0].childNodes[2].childNodes[1].innerHTML = 'polar: (' + MathLib.round(MathLib.hypot(x, y), 2) + ', ' + MathLib.round(Math.atan2(y, x), 2) + ')';

  var screen = this,
      listener = function () {
        overlay.style.setProperty('display', 'none');
        overlay.removeEventListener('click', listener);
      };
  overlay.addEventListener('click', listener);
}