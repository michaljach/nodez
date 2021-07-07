import { Component } from 'webc'
import './Nested'

interface IHomeState {
  value: string
  counter: number
}

class HomePage extends Component<{}, IHomeState> {
  state = {
    value: 'heh',
    counter: 0
  }

  init() {
    this.find('btn').onClick(this.onClick)
    this.find('input').onChange(this.onChange)

    setInterval(() => {
      this.state.counter += 1
    }, 1000)
  }

  onClick() {
    this.state.counter += 1
  }

  onChange(event) {
    this.state.value = event.target.value
  }

  render() {
    console.log('render')
    return `
      <style>
        :host {
          font-family: 'Arial', sans-serif;
        }
      </style>

      <h1>Vanilla JS Micro framework</h1>
      <button id="btn">click me</button>
      <input id="input" type="text" />
      <input id="input" type="text" value="${this.state.counter}" />
      ${this.state.value}
      ${this.state.counter}
      <nested-page counter="${this.state.counter}"/>
    `
  }
}

customElements.define('home-page', HomePage)
