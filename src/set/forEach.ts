// ### Set.prototype.forEach()
// Works like the Array.prototype.forEach function
forEach() {
  Array.prototype.forEach.apply(this, arguments);
}