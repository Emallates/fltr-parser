import del from 'del'
import pump from 'pump'
import gulp from 'gulp'
import babel from 'gulp-babel'
import shell from 'shelljs'

/**
 * @todo Implement gulp-webpack instead of cli command
 */
const babelOpts = JSON.parse(require('fs').readFileSync('./.babelrc').toString())
const packages = {
  angular: {
    js: ['angular.fltr.parser'],
    copy: ['bower.json', 'README.md', 'LICENSE'],
    dest: 'angular'
  },
  node: {
    js: ['./es6/*.js'],
    copy: ['package.json', 'index.js', 'README.md', 'LICENSE'],
    dest: 'node',
    dest_lib: 'node/dist'
  }
}

gulp.task('make:node', (done) => {
  del([packages.node.dest])
    .then(() => {
      return pump([
        gulp.src(packages.node.copy),
        gulp.dest(packages.node.dest)
      ])
    })
    .then(() => {
      return pump([
        gulp.src(packages.node.js),
        babel(babelOpts),
        gulp.dest(packages.node.dest_lib)
      ])
    })
    .catch(done)
})

gulp.task('make:angular', (done) => {
  del([packages.angular.dest])
    .then(() => {
      return pump([
        gulp.src(packages.angular.copy),
        gulp.dest(packages.angular.dest)
      ])
    })
    .then(() => {
      shell.exec('webpack')
    })
    .then(done)
    .catch(done)
})

gulp.task('build', ['make:node', 'make:angular'])

gulp.task('default', ['build'])