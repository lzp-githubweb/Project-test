var { series, src, dest, watch } = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");

function doCss() {
    return src("./origin/css/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(dest("./publish/css"));
}

function doJS() {
    return src("./origin/js/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(dest("./publish/js"));
}


function doHTML() {
    return src("./origin/**/*.html")
        .pipe(minifyHtml({
            // 是否压缩空白
            "collapseWhitespace": true,
            // 是否压缩style标签及其中的css代码
            "minifyCSS": true,
            // 是否压缩script标签及其中的js代码
            "minifyJS": true,
            // 是否移除没有属性值的HTML标准属性(核心属性)
            "removeEmptyAttributes": true
            // 这里仅一部分htmlmin的属性，还有好多好多；
        }))
        .pipe(dest("./publish/"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
        .pipe(dest("./publish/resource/"))
}


function doClean() {
    return src("./publish/", { read: false, allowEmpty: true })
        .pipe(clean())
}

function webServer() {
    // 定位资源 
    return src("./publish")
        .pipe(webserver({
            host: "localhost",
            port: 3001,
            livereload: true,
            open: "./index.html",
            proxies: [
                // 第一个配置的含义: 将本服务器下的URL中以/ 开头的请求 统统转接到 "http://10.3.147.233:3000/下；
                {   //收到的请求
                    source: "/",
                    // 转发的服务器地址;
                    target: "http://10.3.144.84/"
                },
                // 第二个配置的含义: 将本服务器下的/get.php接口的请求 通过本服务器转接到 "http://10.3.147.233:3000/get.php"下
                {   //收到的请求
                    //     source: "/get.php",
                    //     // 转发的服务器地址;
                    //     target: "http://10.3.147.233:3000/get.php"
                }
            ]
        }))
}
function refresh() {
    return watch("./origin", series(doClean, [doCss, doHTML, doJS, doResource]))
}

// 服务器搭建
module.exports.webserver = webserver;
// 将Resource该文件夹转移
module.exports.doResource = doResource;
// 操作
module.exports.a = series(doClean, [doCss, doHTML, doJS, doResource]);
// 监控
module.exports.aa = series(webServer, refresh);