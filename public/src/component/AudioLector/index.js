import template from './template.js'

export default class AudioLector extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('audio-lector', AudioLector)
