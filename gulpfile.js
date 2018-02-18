/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  tsc = require("gulp-typescript"),
  exec = require('gulp-exec');
var tsProject = tsc.createProject('tsconfig.json');

var paths = {
  webroot: "./"
};
paths.ClientrootDir = paths.webroot + "Client/src/**/*.ts",
paths.ClientoutDir = paths.webroot + "FullStack/views",
paths.ServerrootDir = paths.webroot + "Server/**/*.ts",
paths.ServeroutDir = paths.webroot + "FullStack",

  gulp.task("Observe:Client", function () {
    gulp.watch(paths.ClientrootDir,['Compile:Client']);
  });
  gulp.task("Compile:Client", function () {
    exec = require('child_process').exec;
    exec('client', function (err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  });


  gulp.task("Observe:Server", function () {
    gulp.watch(paths.ServerrootDir,['Compile:Server','Run']);
  });
  gulp.task("Compile:Server", function () {
    return gulp.src([paths.ServerrootDir])
      .pipe(tsc(tsProject()))
      .pipe(gulp.dest(paths.ServeroutDir));
  });
  gulp.task('Run', function () {
    exec = require('child_process').exec;
    exec('npm start', function (err, stdout, stderr) {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
    });
  });

  gulp.task("default", ["Run", "Observe:Server","Observe:Client"]);