module.exports = {
	plain: {
		src: ['build/plain/!(reference).ts'],
		reference: 'build/plain/reference.ts',
		outDir: 'build/plain',
		options: {
			compile: true,
			comments: true,
			target: 'es5',
			module: 'commonjs',
			// Enable sourcemaps as soon as one of
			// https://github.com/gruntjs/grunt-contrib-concat/issues/12
			// https://github.com/kozy4324/grunt-concat-sourcemap
			// has support for input sourcemaps
			sourceMap: false,
			sourceRoot: '',
			mapRoot: '',
			declaration: true
		}
	}
};
