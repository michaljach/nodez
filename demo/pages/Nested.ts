import { Component } from 'webc'
import './Nested1'

class Nested extends Component<any> {
  init() {
    this.find('test').onClick(() => {
      this.props.counter = 100
    })
  }

  render() {
    return `
      <h1>Nested</h1>
      ${this.props.counter}
      <nested1-page counter="${this.props.counter}"></nested1-page>
      <button id="test">test</button>
    `
  }
}

customElements.define('nested-page', Nested)
