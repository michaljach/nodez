class Component extends HTMLElement {
  init() {}
  render(): string {
    throw Error('Render function not implemented.')
  }
}

export const C = <P = void, S = any>(type = Component) =>
  class extends type {
    props: P
    state: S

    virtualDom: ChildNode[]

    connectedCallback() {
      // this.attachShadow({ mode: 'open' })
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

      if (this.init) {
        this.init()
      }
    }

    find(id: string) {
      const context = this
      const element = document.getElementById(id) as any

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

    _render() {
      const template = document.createElement('template')
      template.innerHTML = this.render()

      const previous = this.virtualDom
      const next = Array.from(template.content.childNodes)

      if (previous) {
        this.diff(previous, next)
      } else {
        this.appendChild(template.content)
      }

      this.virtualDom = Array.from(this.childNodes)
    }

    diff(previous: any, next: any) {
      const diffNodes = next.length - previous.length

      if (diffNodes < 0) {
        previous.slice(diffNodes).forEach((elem: any) => {
          this.removeChild(elem)
        })
      }
      next.forEach((node: any, i: number) => {
        if (previous[i]) {
          const key = previous[i].nodeName === 'INPUT' ? 'value' : 'textContent'
          if (customElements.get(node.nodeName.toLowerCase())) {
            node.getAttributeNames().forEach((attributeName: string) => {
              const prevValue = previous[i].getAttribute(attributeName)
              const nextValue = node.getAttribute('counter')
              if (prevValue !== nextValue) {
                previous[i].setAttribute(attributeName, nextValue)
                const props: any = this.props
                props[attributeName] = nextValue
              }
            })
            previous[i]._render()
          } else if (previous[i][key] !== node[key]) {
            if (key !== 'value') {
              this.replaceChild(node, previous[i])
            } else {
              previous[i].value = node.value || previous[i].value
              previous[i].setAttribute('value', previous[i].value)
            }
          }
        } else {
          this.appendChild(node)
        }
      })
    }
  }
