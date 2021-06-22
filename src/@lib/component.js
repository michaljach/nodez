export class Component extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.state = new Proxy(
      {},
      {
        get: (store, name) => {
          return store[name]
        },
        set: (store, prop, value) => {
          const result = Reflect.set(store, prop, value)
          this._render()
          return result
        }
      }
    )

    this._render()
  }

  find(id) {
    const context = this
    const element = this.shadowRoot.getElementById(id)

    element.listeners = []

    return {
      element,
      onClick(event) {
        this.element.addEventListener('click', event.bind(context))

        this.element.listeners.push({
          type: 'click',
          event: event.bind(context)
        })
      },
      onChange(event) {
        this.element.addEventListener('keyup', event.bind(context))

        this.element.listeners.push({
          type: 'keyup',
          event: event.bind(context)
        })
      }
    }
  }

  _render() {
    const template = document.createElement('template')
    template.innerHTML = this.render()
    const previous = this.virtualDom
    const next = Array(...template.content.childNodes)

    if (previous) {
      this.diff(previous, next)
    } else {
      this.shadowRoot.appendChild(template.content)
    }
    this.virtualDom = Array(...this.shadowRoot.childNodes)
  }

  diff(previous, next) {
    previous.forEach((node, i) => {
      const key = node.nodeName === 'INPUT' ? 'value' : 'textContent'

      if (node[key] !== next[i][key]) {
        if (key !== 'value') {
          this.shadowRoot.replaceChild(next[i], node)
        } else {
          node.value = next[i].value || node.value
          node.setAttribute('value', node.value)
        }
      }
    })
  }
}
