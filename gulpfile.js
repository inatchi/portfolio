
let project_folder = require("path").basename(__dirname);
let source_folder = "src";

let fs = require('fs');

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		img: project_folder + "/img/",
	},
	src: {
		html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
		css: source_folder + "/css/style.css",
		js: source_folder + "/js/script.js",
		img: source_folder + "/img/**/*.{jpeg,png,svg,gif,ico,webp}",
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/css/**/*.css",
		js: source_folder + "/js/**/*.js",
		img: source_folder + "/img/**/*.{jpeg,png,svg,gif,ico,webp}"
	},
	clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	del = require("del"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	// imagemin = require("gulp-imagemin"),
	webphtml = require('gulp-webp-html'),
    webp = require('gulp-webp'),
	webpcss = require("gulp-webpcss"),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	newer = require('gulp-newer');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}
function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}
function css() {
	return src(path.src.css)
		
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 5 versions"],
				cascade: true
			})
		)
		.pipe(webpcss(
			{
				webpClass: "._webp",
				noWebpClass: "._no-webp"
			}
		))
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}
function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.on('error', function (err) { console.log(err.toString()); this.emit('end'); })
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}
function images() {
	return src(path.src.img)
		.pipe(newer(path.build.img))
		
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(newer(path.build.img))
		
		.pipe(dest(path.build.img))
}
gulp.task('default', () =>
    gulp.src('../img/**/*.{jpeg,png,svg,gif,ico,webp}')
        .pipe(webp())
        .pipe(gulp.dest('dist'))
)
gulp.task('svgSprite', function () {
	return gulp.src([source_folder + '/iconsprite/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../icons/icons.svg",  //sprite file name
					example: true
				}
			},
		}
		))
		.pipe(dest(path.build.img))
})

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}
function clean(params) {
	return del(path.clean);
}
let buildDev = gulp.series(clean, gulp.parallel(html, css, js, images));
let watch = gulp.series(buildDev, gulp.parallel(watchFiles, browserSync));

exports.images = images;
exports.watch = watch;
exports.default = watch;