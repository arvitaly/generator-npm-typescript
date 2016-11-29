'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing: function () {
    const filesForCopy = ['.travis.yml', 'tsconfig.json', 'tslint.json', '.vscode', '__tests__'];
    filesForCopy.map(f =>
      this.fs.copy(
        this.templatePath(f),
        this.destinationPath(f)
      )
    );
    const packageContent = this.fs.readJSON(this.destinationPath('package.json')) || {};
    packageContent.jest = {
      automock: true,
      unmockedModulePathPatterns: [
        'react'
      ]
    };
    packageContent.scripts = packageContent.scripts || {};
    packageContent.scripts.test = 'tsc && tslint --project=tsconfig.json && jest --verbose';
    packageContent.scripts['watch:test'] = 'jest --verbose';
    packageContent.devDependencies = packageContent.devDependencies || {};
    this.fs.writeJSON(this.destinationPath('package.json'), packageContent);
    const readmeContent = this.fs.read(this.templatePath('README.md'));
    this.fs.write(this.destinationPath('README.md'), readmeContent.replace(/&name&/gi, packageContent.name).replace(/&description&/gi, packageContent.description));
    // this.npmInstall(['coveralls', 'jest', 'typescript', 'tslint'], {'save-dev': true});
  },

  install: function () {
    this.npmInstall();
  }
});
