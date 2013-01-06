// ### Set.prototype.forEach()
// Works like the Array.prototype.forEach function
forEach(...args : any[]) {
  Array.prototype.forEach.apply(this, args);
}