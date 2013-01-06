// ### Set.prototype.powerset()
// Returns the powerset
//
// *@returns {set}*
powerset() : Set {
  var res = [], arr, temp, i, ii, j, jj;
  for (i=0, ii=Math.pow(2, this.card); i<ii; i++) {
    arr = i.toString(2).split('').reverse();
    temp = [];
    for (j=0, jj=this.card; j<jj; j++) {
      if(arr[j] === '1') {
        temp.push(this[j]);
      }
    }
    res.push(new MathLib.Set(temp));
  }
  return new MathLib.Set(res);
}