// ### Set.prototype.indexOf()
// Works like the Array.prototype.indexOf function
//  
// *@returns {number}*
indexOf() {
  return Array.prototype.indexOf.apply(this, arguments);
}