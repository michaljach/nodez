import { Component } from 'webc'

class Nested1 extends Component {
  render() {
    return `
      <h1>Nested1</h1>
      ${this.getAttribute('counter')}
    `
  }
}

customElements.define('nested1-page', Nested1)
