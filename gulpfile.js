const gulp = require('gulp');
const { src, watch, dest, parallel, series} = gulp;
// plugins
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');

const paths = {
    site: 'pc-builder',
    php: './**/*.php',
    css: {
        src: './dev/scss/**/*.scss',
        dest: './template/',
    },
    js: {
        src: './dev/js/',
        dest: './template/'
    }
}

function server() { 
    browserSync.init({
        proxy: paths.site,
        host: paths.site,
        open: false,
    });
    browserSync.watch(paths.php).on('change', browserSync.reload)
    browserSync.watch(paths.js.src + '**/*.js', parallel(js)).on('change', browserSync.reload)
    browserSync.watch(paths.css.src, parallel(css)).on('change', browserSync.reload);
}

function css() {
    return src(paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({overrideBrowserslist:  ['last 2 versions']}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.reload({stream: true}))
}

function js() {
    browserify({
        entries: paths.js.src + 'index.js',
        transform: ['babelify'],
        debug: true
    })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest(paths.js.dest))
}

exports.default = parallel(server, css, js)