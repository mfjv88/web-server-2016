var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./public/assets/css/finalproject.css')
        .pipe(postcss())
        .pipe(gulp.dest('./public/assets/css/processed'));
});
