'use strict';
const Generator = require('yeoman-generator');
class NpmTypescriptGenerator extends Generator {
    writing() {
        const filesForCopy = [
            '.travis.yml',
            'tsconfig.json',
            'tslint.json',
            '.vscode',
            '.prettierrc',
        ];
        filesForCopy.map((f) =>
            this.fs.copy(this.templatePath(f), this.destinationPath(f)),
        );
        const packageContent = this.fs.readJSON(this.destinationPath('package.json')) || {
            homepage: '',
        };
        packageContent.jest = {};
        packageContent.scripts = packageContent.scripts || {};
        packageContent.scripts.test =
            'tsc && tslint --project tsconfig.json && jest --verbose --coverage';
        packageContent.scripts['watch:test'] = 'jest --watch';
        packageContent.devDependencies = packageContent.devDependencies || {};
        const author =
            packageContent.homepage && packageContent.homepage.indexOf('github.com') > -1
                ? packageContent.homepage
                      .match(/^https:\/\/github.com\/([^/]+)/gi)[0]
                      .substr(19)
                : '';
        this.fs.writeJSON(this.destinationPath('package.json'), packageContent);
        const readmeContent = this.fs.read(this.templatePath('README.md'));
        this.fs.write(
            this.destinationPath('README.md'),
            readmeContent
                .replace(/&author&/gi, author)
                .replace(/&name&/gi, packageContent.name)
                .replace(/&description&/gi, packageContent.description),
        );
        this.yarnInstall(['coveralls', 'jest', 'typescript', 'tslint', '@types/jest'], {
            dev: true,
        });
    }

    install() {
        this.npmInstall();
    }
}
module.exports = NpmTypescriptGenerator;
