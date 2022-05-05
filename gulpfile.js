const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require ('gulp-plumber');
const autoprefixer =  require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')

//IMAGENES
const cache = require ('gulp-cache');
const imagemin = require ('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require ('gulp-avif');

//JAVASCRIPT
const terser = require('gulp-terser-js');


function css (done) {
    src('src/scss/**/*.scss') //Identificar el archivo .SASS a compilar
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe( sass() ) //Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )//Almacenarla en el disco duro 
    done();
}

function imagenes (done) {
    const  opciones = {
    optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
};



function versionWebp( done ) {
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
    
}

function versionAvif( done ) {
    const opciones ={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}

function javascript(done) {
    src('src/JS/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/JS'));

    done();


}


function dev ( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/JS/**/*.js', javascript);
    done();
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp,versionAvif, javascript, dev);


