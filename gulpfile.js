//*********** IMPORTS *****************
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require("gulp-livereload");
var watch = require('gulp-watch');
global.errorMessage = '';

//Configuration - Change me
// var cfFiles = [
// 	{
// 		watch: '*.scss'
// 		// ,
// 		// output: './www/app/View/Themed/Site/webroot/css',
// 		// name: 'site.css',
// 	}
// ];
//END configuration

// function scriptWatch(jsData) {
// 	gulp.src(jsData.watch)
// 	.pipe(watch({glob:jsData.watch, emitOnGlob: true}, function() {
// 		gulp.src(jsData.watch)
// 		.pipe(concat(jsData.name))
// 		.pipe(gulp.dest(jsData.output))
// 		.pipe(uglify({outSourceMap: false}))
// 		.pipe(rename(jsData.nameMin))
// 		.pipe(gulp.dest(jsData.output));
// 	}));
// }

var jsFiles = [
    './js/app/app.js',
    './js/app/mainController.js'
];

var htmlFiles = [
    './index.html'
];

gulp.task('cssFiles', function() {
  gulp.src('*.css')
    .pipe(livereload());
});

gulp.task('jsFiles', function() {
  gulp.src(jsFiles)
    .pipe(livereload());
});

gulp.task('htmlFiles', function() {
  gulp.src(htmlFiles)
    .pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
    gulp.watch([htmlFiles, jsFiles], ['htmlFiles', 'jsFiles']);
    // gulp.watch(jsFiles, ['jsFiles']);
});


gulp.task('default', ['watch']);
