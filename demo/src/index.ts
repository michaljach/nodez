import { C } from '../../dist'
import './pages/Nested'

function random(max) {
  return Math.round(Math.random() * 1000) % max
}

const A = [
  'pretty',
  'large',
  'big',
  'small',
  'tall',
  'short',
  'long',
  'handsome',
  'plain',
  'quaint',
  'clean',
  'elegant',
  'easy',
  'angry',
  'crazy',
  'helpful',
  'mushy',
  'odd',
  'unsightly',
  'adorable',
  'important',
  'inexpensive',
  'cheap',
  'expensive',
  'fancy'
]
const B = [
  'red',
  'yellow',
  'blue',
  'green',
  'pink',
  'brown',
  'purple',
  'brown',
  'white',
  'black',
  'orange'
]
const N = [
  'table',
  'chair',
  'house',
  'bbq',
  'desk',
  'car',
  'pony',
  'cookie',
  'sandwich',
  'burger',
  'pizza',
  'mouse',
  'keyboard'
]

let nextId = 1

function buildData(count): any[] {
  const data = new Array(count)
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${B[random(B.length)]} ${
        N[random(N.length)]
      }`
    }
  }
  return data
}

class AppMain extends C() {
  state = {
    data: buildData(1000),
    counter: 0
  }

  init() {
    this.find('btn').onClick(() => {
      this.state.counter += 1
    })
  }

  render() {
    return `
      <button id="btn">Click</button>

      <table>
      ${this.state.data.map(
        (elem) =>
          `<tr is="nested-page" id="${this.state.counter}" label="${elem.label}"></tr>`
      )}
      </table>
    `
  }
}

customElements.define('app-main', AppMain)
