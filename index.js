'use strict';
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = function(f, mat, options, next) {
  mat.getContent(content => {
    const plugin = autoprefixer({ browsers: options.browsers || 'last 2 versions' });

    postcss([ plugin ])
      .process( content.toString() )
      .then( result => {
        result.warnings().forEach(warn => f.log(warn.toString()));
        next(null, mat.setContent(result.css));
      });
  });
};
