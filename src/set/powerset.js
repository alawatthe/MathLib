// ### Set.prototype.powerset()
// Returns the powerset
//
// *@returns {set}*
MathLib.extendPrototype('set', 'powerset', function (a) {
  var res = [], arr, temp, i, ii, j, jj;
  for (i=0, ii=Math.pow(2, this.card); i<ii; i++) {
    arr = i.toString(2).split('').reverse();
    temp = [];
    for (j=0, jj=this.card; j<jj; j++) {
      if(arr[j] === '1') {
        temp.push(this[j]);
      }
    }
    res.push(MathLib.set(temp));
  }
  return MathLib.set(res);
});