interface Printable {
	toContentMathML(options? : toContentMathMLOptions) : string;
	toLaTeX(options? : toPresentationOptions) : string;
	toMathML(options? : toPresentationOptions) : string;
	toString(options? : toPresentationOptions) : string;
}