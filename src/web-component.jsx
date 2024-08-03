import ReactDom from 'react-dom';
import { Widget } from './components/Widget';

export const normalizeAttribute = (attribute) => {
    return attribute.replace(/-([a-z])/g, (letter) => letter.toUpperCase());
};

class WidgetComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const props = this.getPropsFromAttributes();
        const root = ReactDom.createRoot(this.shadowRoot);
        root.render(<Widget {...props} />);
    }

    getPropsFromAttributes() {
        const props = {};
        for (const { name, value } of this.attributes) {
            props[normalizeAttribute(name)] = value;
        }
        return props;
    }
}

export default WidgetComponent;