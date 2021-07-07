import { Component } from 'webc'
import './pages/Home.js'

class AppMain extends Component {
  render() {
    return '<home-page />'
  }
}

customElements.define('app-main', AppMain)
