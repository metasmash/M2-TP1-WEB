import template from './template.js'

const audioContext = window.AudioContext || window.webkitAudioContext

class AudioLector extends HTMLElement {
    constructor() {
        super()

        this.audioContext = new audioContext()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.init()
    }

    init = () => {
        this.initQuerySelectors()
        this.initAttribute().then(() => {
            this.audioElement.src = this.srcAttribute
        })
    }

    initAttribute = async () => {
        this.srcAttribute = this.getAttribute('src')
        this.titleAttribute = this.innerHTML
    }

    initQuerySelectors = () => {
        this.audioElement = this.shadowRoot.querySelector('.audio-element')
    }
}

customElements.define('audio-lector', AudioLector)
