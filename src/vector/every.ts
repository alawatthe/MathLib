// ### Vector.prototype.every()
// Works like Array.prototype.every.
//
// *@returns {boolean}*
every(f : (value : any, index : number, vector : Vector ) => bool) : bool {
  return Array.prototype.every.call(this, f);
}