'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// Tslint:disable no-var-requires no-implicit-dependencies
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
describe('generator-npm-typescript:app', () => {
    beforeEach(() => {
        return helpers
            .run(path.join(__dirname, '../generators/app'))
            .withPrompts({ someAnswer: true })
            .toPromise();
    });
    it('creates files', () => {
        assert.file([
            '.travis.yml',
            'package.json',
            '.prettierrc',
            'tsconfig.json',
            'tslint.json',
            'README.md',
        ]);
    });
});
