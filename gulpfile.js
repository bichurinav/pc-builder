const gulp = require('gulp');
const { src, watch, dest, parallel, series} = gulp;
const browserSync = require('browser-sync');
const paths = {
    site: 'pc-builder',
    php: './**/*.php',
    js: './src/template/*.js',
    css: './src/template/*.css'
}

function server() {
    browserSync.init({
        proxy: paths.site,
        host: paths.site,
        open: false,
    });
    browserSync.watch(paths.php).on('change', browserSync.reload)
    browserSync.watch(paths.js).on('change', browserSync.reload)
    browserSync.watch(paths.css).on('change', browserSync.reload)
}

exports.default = parallel(server)
