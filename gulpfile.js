var gulp = require('gulp');
var jshint = require('gulp-jshint'); //code check
var clean = require('gulp-clean'); //clean 
var concat = require('gulp-concat'); //concat
var uglify = require('gulp-uglify'); //uglify
var es = require('event-stream'); //join events
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');


gulp.task('clean', function(){
    return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('jshint', function() {
    return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function(){
    return es.merge([    
        gulp.src('lib/angular/angular.min.js'),
        gulp.src('js/**/*.js')//['lib/**/*.js', 'js/**/*.js']
            .pipe(concat('scripts.min.js'))
            .pipe(uglify()) //minify
        ])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function (){
    return gulp.src('view/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/view'));

});

gulp.task('cleanCSS', function(){
    return es.merge([
        gulp.src('lib/bootstrap/dist/css/bootstrap.min.css'),
        gulp.src('css/**/*.css')
            .pipe(concat('style.min.css'))
    ])
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['jshint', 'uglify', 'htmlmin', 'cleanCSS']);