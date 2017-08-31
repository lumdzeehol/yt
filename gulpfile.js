var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compileSass',function(){
    return gulp.src('./sass/*.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest('./css'));
});

var browserSync = require('browser-sync');
gulp.task('server',function(){
    browserSync({
        server: "./",
        port:3000,
        files: ['./index.html','./html/*.html','./css/*.css']
    });
    gulp.watch('./sass/*.scss',['compileSass']);
});