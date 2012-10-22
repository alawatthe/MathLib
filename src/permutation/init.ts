// ## <a id="Permutation"></a>Permutation

export class Permutation {

  type = 'permutation';

  constructor(p) {
    if (Array.isArray(p[0])) {
      cycle = p;
      permutation = Permutation.cycleToList(cycle);
    }
    else {
      permutation = p;
      cycle = Permutation.listToCycle(permutation);
    }

    permutation.forEach((x,i)=>{this[i] = x;});
    this.length = permutation.length;
    this.cycle = cycle;

  }