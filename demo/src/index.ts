import { C } from 'nodez'

class Home extends C() {
  render() {
    return `
      <style>
        h1 {
          color: red
        }
      </style>
      
      <h1>Hello World !</h1>
    `
  }
}

customElements.define('home-component', Home)
