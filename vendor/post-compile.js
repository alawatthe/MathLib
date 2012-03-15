#!/usr/bin/env node

// This file is based on the corresponding jQuery file.
var fs = require( "fs" ),
	src = fs.readFileSync( process.argv[2], "utf8" ),
	version = fs.readFileSync( "version.txt", "utf8" ).replace(/\n/, ''),
	// License Template
	license = "/*! MathLib v@VERSION MathLib.de | MathLib.de/en/license */";


// Previously done in sed but reimplemented here due to portability issues
src = src.replace( /^(\s*\*\/)(.+)/m, "$1\n$2" ) + ";";

// Set minimal license block var
license = license.replace( "@VERSION", version );

// Replace license block with minimal license
src = src.replace( /[\s\S]*MDN./, license );

fs.writeFileSync( "build/MathLib.min.js", src, "utf8" );

