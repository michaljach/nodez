interface WebElement extends HTMLElement {
  listeners: {
    type: string
    event: Event
  }[]
}

export class Component<P = void, S = void> extends HTMLElement {
  props: P
  state: S
  virtualDom: ChildNode[]

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.state = new Proxy<any>(this.state || {}, {
      get: (store, name) => {
        return Reflect.get(store, name)
      },
      set: (store, prop, value) => {
        const result = Reflect.set(store, prop, value)
        this._render()
        return result
      }
    })

    this.props = new Proxy<any>(
      {},
      {
        get: (store, name) => {
          return this.getAttribute(name as string)
        },
        set: (store, prop, value) => {
          return Reflect.set(store, prop, value)
        }
      }
    )

    this._render()
    this.init()
  }

  init() {}

  find(id: string) {
    const context = this
    const element = this.shadowRoot.getElementById(id) as WebElement

    element.listeners = []

    return {
      element,
      onClick(event: EventListener) {
        this.element.addEventListener('click', event.bind(context))

        this.element.listeners.push({
          type: 'click',
          event: event.bind(context)
        })
      },

      onChange(event: EventListener) {
        this.element.addEventListener('keyup', event.bind(context))

        this.element.listeners.push({
          type: 'keyup',
          event: event.bind(context)
        })
      }
    }
  }

  render(): string {
    throw new Error('render() method not implemented.')
  }

  _render() {
    const template = document.createElement('template')
    template.innerHTML = this.render()
    const previous = this.virtualDom
    const next = Array.from(template.content.childNodes)

    if (previous) {
      this.diff(previous, next)
    } else {
      this.shadowRoot.appendChild(template.content)
    }

    this.virtualDom = Array.from(this.shadowRoot.childNodes)
  }

  diff(previous: any, next: any) {
    previous.forEach((node: any, i: number) => {
      const key = node.nodeName === 'INPUT' ? 'value' : 'textContent'

      if (customElements.get(node.nodeName.toLowerCase())) {
        node.getAttributeNames().forEach((attributeName: string) => {
          const prevValue = node.getAttribute(attributeName)
          const nextValue = next[i].getAttribute('counter')
          if (prevValue !== nextValue) {
            node.setAttribute(attributeName, nextValue)
            const props: any = this.props
            props[attributeName] = nextValue
          }
        })
        node._render()
      } else if (node[key] !== next[i][key]) {
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
