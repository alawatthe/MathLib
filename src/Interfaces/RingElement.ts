interface RingElement {
	isEqual(n: any) : any;
	isZero() : boolean;
	minus(subtrahend: any) : any;
	negative() : any;
	plus(summand: any) : any;
	times(factor: any) : any;
}