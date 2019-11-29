var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');

// 压缩 public 目录 html
gulp.task('minify-html', function() {
    return gulp.src('./public/blog/**/*.html')
      .pipe(htmlclean())
      .pipe(htmlmin({
           removeComments: true,
           minifyJS: true,
           minifyCSS: true,
           minifyURLs: true,
      }))
      .pipe(gulp.dest('./public/blog'))
});

// 压缩 public 目录 css
gulp.task('minify-css', function() {
    return gulp.src('./public/blog/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public/blog'));
});

// 压缩 public/js 目录 js
gulp.task('minify-js', function() {
    return gulp.src('./public/blog/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/blog'));
});

// var build = (done) => {
//     gulp.series(gulp.parallel('minify-html','minify-css','minify-js'))(done);
// };

// gulp.task('default', gulp.series(gulp.parallel('minify-html','minify-css','minify-js')));
// 执行 gulp 命令时执行的任务
// gulp.task('default', build);
gulp.task('default', gulp.series(gulp.parallel('minify-html','minify-css','minify-js')));