const {src, dest, series} = require('gulp');
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const del = require('del');
const pkgJson = require('./package.json');

function clean() {
    del(['dist']);
   
    return src(`node_modules/leaflet-draw/dist/leaflet.draw-src.css`)
    .pipe(replace(/(\'images\/spritesheet.png\'\))/, `'./../${pkgJson.c8y.application.contextPath}@${pkgJson.version}/images/spritesheet.png') !important`))
    .pipe(replace(/(\'images\/spritesheet-2x.png\'\))/, `'./../${pkgJson.c8y.application.contextPath}@${pkgJson.version}/images/spritesheet-2x.png') !important`))
    .pipe(replace(/(\'images\/spritesheet.svg\'\))/, `'./../${pkgJson.c8y.application.contextPath}@${pkgJson.version}/images/spritesheet.svg') !important`))
    .pipe(dest(`smart-map-settings-widget/component/map-dialog/`));
}
const bundle = series(
    function createZip() {
        return src(`./dist/apps/${pkgJson.c8y.application.contextPath}/**/*`)
            .pipe(zip(`${pkgJson.c8y.application.contextPath}-${pkgJson.version}.zip`))
            .pipe(dest('dist/'))
    }
)

exports.clean = clean;
exports.bundle = bundle;
exports.default = series(bundle, async function success() {
    console.log("Build Finished Successfully!");
    console.log(`PluginOutput (Install in the browser): dist/${pkgJson.c8y.application.contextPath}-${pkgJson.version}.zip`);
});
