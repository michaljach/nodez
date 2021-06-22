import './pages/Home.js'
import './pages/Test.js'
import { Component } from './@lib/component.js'

class AppMain extends Component {
  render() {
    switch (true) {
      case '/test':
        return '<test-page />'

      default:
        return '<home-page />'
    }
  }
}

customElements.define('app-main', AppMain)
