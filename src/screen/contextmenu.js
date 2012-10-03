// ### Screen.prototype.contextmenu()
// Handles the contextmenu event
//
// *@param {event}*
MathLib.extendPrototype('screen', 'contextmenu', function (evt) {
  if (evt.preventDefault) {
   evt.preventDefault();
  }
  evt.returnValue = false;
  var x = this.getX(evt),
      y = this.getY(evt);

  var menu = this.contextmenuWrapper.childNodes[0];
  menu.style.setProperty('top', (evt.clientY-20) + 'px');
  menu.style.setProperty('left', evt.clientX + 'px');
  var wrapper = this.contextmenuWrapper;
  wrapper.style.setProperty('display', 'block');
  wrapper.style.setProperty('width', '100%');
  wrapper.style.setProperty('height', '100%');
  
  menu.childNodes[0].childNodes[2].childNodes[0].innerHTML = 'cartesian: (' + MathLib.round(x, 2) + ', ' + MathLib.round(y, 2) + ')';
  menu.childNodes[0].childNodes[2].childNodes[1].innerHTML = 'polar: (' + MathLib.round(MathLib.hypot(x, y), 2) + ', ' + MathLib.round(Math.atan2(y, x), 2) + ')';

  var screen = this,
      listener = function () {
        screen.contextmenuWrapper.style.setProperty('display', 'none');
        wrapper.style.setProperty('width', '0px');
        wrapper.style.setProperty('height', '0px');
        screen.contextmenuWrapper.removeEventListener('click', listener);
      };
  this.contextmenuWrapper.addEventListener('click', listener);
});