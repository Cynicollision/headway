const gulp = require('gulp');
const minify = require('gulp-minify');
const jasmine = require('gulp-jasmine');

gulp.task('minify', () => {
    gulp.src('src/headway.js')
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', () => {
    gulp.src('src/headway*.js')
        .pipe(jasmine());
});