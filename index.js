"use strict";
let through2 = require("through2");
let autoprefixer = require("autoprefixer-core");

let Autoprefixer = function(fuller, options) {
	fuller.bind(this);
	this.processor = autoprefixer({browsers: options.browsers || "last 2 versions"});
};

Autoprefixer.prototype.compile = function(css, cb) {
	cb(null, this.processor(css));
};

Autoprefixer.prototype.build = function(stream) {
	if(!this.compress) { return stream;}

	let self = this,
		buffer = [];

	console.log(stream);
	return stream.pipe( through2(
		function(chunk, enc, cb) {
			buffer.push(chunk);
			cb();
		},
		function(cb) {
			let that = this;
			self.compile(buffer.join(""), function(err, result) {
				!err && that.push(result);
				cb();
			});
		}
	));
};


module.exports = Autoprefixer;
