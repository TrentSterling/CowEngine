const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const browsersync = require("browser-sync");
const run = require("run-sequence");

gulp.task("default", () => {
    run("dev");
});

gulp.task("dev", () => {
    run("build", "copy:www", "watch", "webserver");
});

gulp.task("watch", () => {
    const watchOptions = {
        mode: "poll",
        interval: 1000
    };

    gulp.watch("www/**", watchOptions, [ "copy:www" ]);
    gulp.watch("src/**", watchOptions, [ "build"    ]);
});

gulp.task("webserver", () => {
    browsersync({
        server: "build/",
        port:   1337,
        host:   "localhost"
    });
});

gulp.task("copy:www", () => {
    gulp.src("www/**")
        .pipe(gulp.dest("build/"))
        .pipe(browsersync.reload({ stream: true }));
});

gulp.task("build", () => {
    const project = ts.createProject("tsconfig.json")

    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project())
        .on("error", function(err) {
            this.emit("end");
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build/js"))
        .pipe(browsersync.reload({ stream: true }));
});