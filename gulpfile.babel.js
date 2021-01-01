import htmlmin from 'gulp-htmlmin';

//css
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

//javascript
import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';

//pug
import pug from 'gulp-pug';

//sass
import sass from 'gulp-sass';

//common
import concat from 'gulp-concat';

//clean css 
import clean from 'gulp-purgecss';

//cache bust
import cachebust from 'gulp-cache-bust';

//optimizar imagenes
import imagemin from 'gulp-imagemin';

//browser
import { init as server, stream, reload } from 'browser-sync';
//plumber
import plumber from 'gulp-plumber';

//Typescript
import ts from 'gulp-typescript';

const producction = true;

const cssPlugins = [cssnano(), autoprefixer()];

//tasks javascript
gulp.task('babel', ()=>{
    return gulp
    .src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./docs/js'))
});
//tasks pug
gulp.task('views',()=>{
    return gulp
    .src('./src/views/pages/*.pug')
    .pipe(plumber())
    .pipe(
        pug({
            pretty:producction? false : true
        })
     )
    .pipe(
        cachebust({
            type:'timestamp'
        }))
    .pipe(gulp.dest('./docs'))
})
//tasks sass
gulp.task('sass', ()=>{
    return gulp
    .src('./src/scss/styles.scss')
    .pipe(plumber())
    .pipe(
        sass({
            outputStyle: 'compressed'
        })
    )
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./docs/css'))
    .pipe(stream());
})
//tasks 
gulp.task('clean', ()=>{
    return gulp
    .src('./docs/css/styles.css')
    .pipe(plumber())
    .pipe(
        clean({
            content: ['./docs/*.html']
        })
    )
    .pipe(gulp.dest('./docs/css'))
})
//automatizar
gulp.task('default', ()=>{
    server({
        server:'./docs'
    })
    gulp.watch('./src/views/**/*.pug', gulp.series('views')).on('change', reload);
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload);
})