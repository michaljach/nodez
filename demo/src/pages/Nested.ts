import { C } from '../../../dist'
import './Nested1'

interface IProps {
  id: string
  label: string
}

class Nested extends C<IProps>(HTMLTableRowElement) {
  render() {
    return `
      <td className="col-md-1">${this.props.id}</td>
      <td className="col-md-4"><a onClick={this.onSelect}>${this.props.label}</a></td>
      <td className="col-md-1"><a onClick={this.onRemove}>{GlyphIcon}</a></td>
      <td className="col-md-6"></td>
    `
  }
}

customElements.define('nested-page', Nested, { extends: 'tr' })
