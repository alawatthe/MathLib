// This file is based on the corresponding jQuery file.
var jshint = require('./jshint').JSHINT,
		src = require('fs').readFileSync('build/MathLib.js', 'utf8'),
		config = {
			browser: true,
			eqnull: true,
			expr: true,
			curly: true,
			undef: true,
      loopfunc: true,
			smarttabs: true,
			predef: [
				'DOMParser',
        'MathJax',
        'NodeFilter'
			],
			maxerr: 50
		};

if ( jshint( src, config ) ) {
	console.log('JSHint check passed.\n');
}
else {
	console.log('JSHint found ' + jshint.errors.length + ' ' + (jshint.errors.length === 1 ? 'error' : 'errors') + ':');

	jshint.errors.forEach(function( e ) {
		if ( !e ) { return; }

		var str = e.evidence ? e.evidence : '',
		character = e.character === true ? 'EOL' : 'C' + e.character;

		if ( str ) {
			str = str.replace( /\t/g, ' ' ).trim();
			console.log( ' [L' + e.line + ':' + character + '] ' + e.reason + '\n  ' + str + '\n');
		}
	});
}
