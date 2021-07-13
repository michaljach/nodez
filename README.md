![Build](https://github.com/michaljach/web-components-framework/workflows/Release%20WebElements/badge.svg) [![npm version](https://img.shields.io/npm/v/@rapid-lang/compiler.svg?style=flat)](https://www.npmjs.com/package/@rapid-lang/compiler) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rapidlang/compiler/blob/master/LICENSE)

# WEBELEMENTZ

Zero dependency, super simple framework based on native Web Components.

### Install

`npm i webelementz`

### Simple usage

```
import { C } from 'webelementz'

class Component extends C() {
  render() {
    return `
      <h1>Hello World !</h1>
    `
  }
}
```

### Development

Run `yarn debug` with parameters to watch, compile and debug files, for example:

`yarn debug dummy/test.rapid -o dummy/test.wasm -s`

Follow [Github Flow](https://guides.github.com/introduction/flow/) and [Conventional Commits](https://www.conventionalcommits.org/) via `yarn commit` command. Do linting with `yarn lint` and build project with `yarn build`.

### Changelog

See `CHANGELOG` file for list of recent changes.

### License

See `LICENSE` file for more information.
