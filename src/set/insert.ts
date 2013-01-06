// ### Set.prototype.insert()
// Inserts an element into the set.
//
// *@returns {set}* Returns the current set
insert(x : any) : Set {
  var i = this.locate(x);
  if (this[i] !== x) {
    this.splice(i, 0, x);
    this.card++;
  }
  return this;
}