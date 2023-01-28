import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import { create as bsCreate } from "browser-sync";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import browserslist from "browserslist";

const browserSync = bsCreate();
const sass = gulpSass(dartSass);

const buildCss = () => {
    return gulp
        .src('./src/scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed'}))
        // .pipe(sass({
        //     outputStyle: 'compressed'
        // }).on('error', sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false,
            })
        )
        .pipe(cleanCss({}))
        .pipe(
            rename({
                suffix: '.min',
                extname: '.css',
            })
        )
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
};

const buildJs = () => {
    return gulp.src('./src/js/*.js').pipe(concat('scripts.min.js')).pipe(gulp.dest('./dist/')).pipe(browserSync.stream());
};

const server = () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
    });
};

const watchCss = () => {
    gulp.watch('./src/scss/**/*', buildCss);
};

const watchJs = () => {
    gulp.watch('./src/js/**/*.js', buildJs);
};

gulp.task('default', gulp.parallel(server, buildCss, watchCss, buildJs, watchJs));