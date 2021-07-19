(()=>{var h=class extends HTMLElement{init(){}render(){throw Error("Render function not implemented.")}},d=(l=h)=>class extends l{connectedCallback(){this.state=new Proxy(this.state||{},{get:(e,t)=>Reflect.get(e,t),set:(e,t,s)=>{let n=Reflect.set(e,t,s);return this._render(),n}}),this.props=new Proxy({},{get:(e,t)=>this.getAttribute(t),set:(e,t,s)=>Reflect.set(e,t,s)}),this._render(),this.init&&this.init()}find(e){let t=this,s=document.getElementById(e);return s.listeners=[],{element:s,onClick(n){this.element.addEventListener("click",n.bind(t)),this.element.listeners.push({type:"click",event:n.bind(t)})},onChange(n){this.element.addEventListener("keyup",n.bind(t)),this.element.listeners.push({type:"keyup",event:n.bind(t)})}}}_render(){let e=document.createElement("template");e.innerHTML=this.render();let t=this.virtualDom,s=Array.from(e.content.childNodes);t?this.diff(t,s):this.appendChild(e.content),this.virtualDom=Array.from(this.childNodes)}diff(e,t){let s=t.length-e.length;s<0&&e.slice(s).forEach(n=>{this.removeChild(n)}),t.forEach((n,r)=>{if(e[r]){let i=e[r].nodeName==="INPUT"?"value":"textContent";customElements.get(n.nodeName.toLowerCase())?(n.getAttributeNames().forEach(c=>{let m=e[r].getAttribute(c),o=n.getAttribute("counter");if(m!==o){e[r].setAttribute(c,o);let f=this.props;f[c]=o}}),e[r]._render()):e[r][i]!==n[i]&&(i!=="value"?this.replaceChild(n,e[r]):(e[r].value=n.value||e[r].value,e[r].setAttribute("value",e[r].value)))}else this.appendChild(n)})}};var a=class extends d(){render(){return`
      <style>
        h1 {
          color: red
        }
      </style>
      
      <h1>Hello World !</h1>
    `}};customElements.define("home-component",a);})();
