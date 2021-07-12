import { C } from '../../../dist'

class Nested1 extends C() {
  render() {
    return `
      OMG ${this.props.counter}
    `
  }
}

customElements.define('nested-page1', Nested1)
