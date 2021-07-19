![Build](https://github.com/michaljach/nodez/workflows/Release/badge.svg) [![npm version](https://img.shields.io/npm/v/@michaljach/nodez.svg?style=flat)](https://www.npmjs.com/package/@michaljach/nodez) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/michaljach/nodez/blob/main/LICENSE)

# Nodez

Zero dependency, super simple framework based on native Web Components.

### Install

`npm i nodez`

### Simple usage

```
import { C } from 'nodez'

class Home extends C() {
  render() {
    return `<h1>Hello World !</h1>`
  }
}

customElements.define('home-component', Home)
```

### Development

Todo

### License

See `LICENSE` file for more information.
