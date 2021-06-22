import { Component } from '../@lib/component.js'

class HomePage extends Component {
  constructor() {
    super()

    this.state.value = 'heh'
    this.state.counter = 0

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
    `
  }
}

customElements.define('home-page', HomePage)
