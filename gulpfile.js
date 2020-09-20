var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const babel = require('gulp-babel');;
const rename = require('gulp-rename');
const i18n = require('gulp-html-i18n');

gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
          presets: [['@babel/env', {modules:false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));
    gulp.watch('./scss/styles.scss', gulp.series('styles'));
});

gulp.task('build:localize', function() {
    var dest  = './';
    var index = './index.html';
  
    return gulp.src(index)
      .pipe(i18n({
        langDir: './language',
        trace: true
      }))
      .pipe(gulp.dest(dest));
  });