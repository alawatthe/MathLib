test('.extendObject()', 1, function () {
	var dest = {
		a: 'a',
		b: 'b',
		c: {
			d: 'cd',
			e: 'ce'
		},
		f: {
			g: 'fg',
			h: 'fh'
		},
		m: {
			n: 'mn',
			o: {
				p: 'mop',
				q: 'moq'
			}
		}
	},
	src = {
		a: 'a_',
		c: {
			d: 'cd_'
		},
		f: 'f_',
		m: {
			n: 'mn_',
			o: {
				p: 'mop_'
			}
		}
	},
	res = {
		a: 'a_',
		b: 'b',
		c: {
			d: 'cd_',
			e: 'ce'
		},
		f: 'f_',
		m: {
			n: 'mn_',
			o: {
				p: 'mop_',
				q: 'moq'
			}
		}
	};

	deepEqual(MathLib.extendObject(dest, src), res);
});