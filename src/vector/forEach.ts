// ### Vector.prototype.forEach()
// Works like Array.prototype.forEach.
//
forEach(f : (value : any, index : number, vector : Vector ) => void) : void {
  Array.prototype.forEach.call(this, f);
}