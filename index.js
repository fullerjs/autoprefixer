"use strict";
let autoprefixer = require("autoprefixer-core");

module.exports = function(f, mat, options, next) {
	mat.getContent(function(content) {
		let processor = autoprefixer({browsers: options.browsers || "last 2 versions"});
		let newContent = processor.process( content.toString() ).css;
		next(null, mat.setContent(newContent));
	});
};
