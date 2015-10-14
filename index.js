'use strict';
let autoprefixer = require('autoprefixer');
let postcss = require('postcss');

module.exports = function(f, mat, options, next) {
  mat.getContent(function(content) {
    let plugin = autoprefixer({ browsers: options.browsers || 'last 2 versions' });

    postcss([ plugin ])
      .process( content.toString() )
      .then( function(result) {
        result.warnings().forEach( function(warn) {
          f.log(warn.toString());
        });

        next(null, mat.setContent(result.css));
      });
  });
};
