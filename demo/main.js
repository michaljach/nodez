(() => {
  // src/component.ts
  var Component = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.state = new Proxy({}, {
        get: (store, name) => {
          return Reflect.get(store, name);
        },
        set: (store, prop, value) => {
          const result = Reflect.set(store, prop, value);
          this._render();
          return result;
        }
      });
      this._render();
    }
    find(id) {
      const context = this;
      const element = this.shadowRoot.getElementById(id);
      element.listeners = [];
      return {
        element,
        onClick(event) {
          this.element.addEventListener("click", event.bind(context));
          this.element.listeners.push({
            type: "click",
            event: event.bind(context)
          });
        },
        onChange(event) {
          this.element.addEventListener("keyup", event.bind(context));
          this.element.listeners.push({
            type: "keyup",
            event: event.bind(context)
          });
        }
      };
    }
    render() {
      throw new Error("render() method not implemented.");
    }
    _render() {
      const template = document.createElement("template");
      template.innerHTML = this.render();
      const previous = this.virtualDom;
      const next = Array.from(template.content.childNodes);
      if (previous) {
        this.diff(previous, next);
      } else {
        this.shadowRoot.appendChild(template.content);
      }
      this.virtualDom = Array.from(this.shadowRoot.childNodes);
    }
    diff(previous, next) {
      previous.forEach((node, i) => {
        const key = node.nodeName === "INPUT" ? "value" : "textContent";
        if (node[key] !== next[i][key]) {
          if (key !== "value") {
            this.shadowRoot.replaceChild(next[i], node);
          } else {
            node.value = next[i].value || node.value;
            node.setAttribute("value", node.value);
          }
        }
      });
    }
  };

  // demo/pages/Home.js
  var HomePage = class extends Component {
    constructor() {
      super();
      this.state.value = "heh";
      this.state.counter = 0;
      this.find("btn").onClick(this.onClick);
      this.find("input").onChange(this.onChange);
      setInterval(() => {
        this.state.counter += 1;
      }, 1e3);
    }
    onClick() {
      this.state.counter += 1;
    }
    onChange(event) {
      this.state.value = event.target.value;
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
    `;
    }
  };
  customElements.define("home-page", HomePage);

  // demo/pages/Test.js
  var TestPage = class extends Component {
    render() {
      return `
      simea
      <button id="back">back</button>
    `;
    }
  };
  customElements.define("test-page", TestPage);

  // demo/index.js
  var AppMain = class extends Component {
    render() {
      switch (true) {
        case "/test":
          return "<test-page />";
        default:
          return "<home-page />";
      }
    }
  };
  customElements.define("app-main", AppMain);
})();
