import { Component } from '../@lib/component.js'

class TestPage extends Component {
  render() {
    return `
      simea
      <button id="back">back</button>
    `
  }
}

customElements.define('test-page', TestPage)
