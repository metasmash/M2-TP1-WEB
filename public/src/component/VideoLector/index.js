import template from './template.js'

export default class VideoLector extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.title = `${this.getAttribute('title')}`
        this.loop = this.getAttribute('loop') === 'true'
        this.initDom()
        this.initListeners()
    }

    initDom() {
        this.button = {
            play: this.shadowRoot.querySelector('#play'),
            pause: this.shadowRoot.querySelector('#pause'),
            stop: this.shadowRoot.querySelector('#stop'),
            avance: this.shadowRoot.querySelector('#avance'),
            recul: this.shadowRoot.querySelector('#recul'),
            loop: this.shadowRoot.querySelector('#loop'),
        }
        this.videoLector = this.shadowRoot.querySelector('.video-lector')
    }

    initListeners = () => {
        this.button.play.addEventListener('click', () => {
            this.videoLector.play()
        })

        this.button.pause.addEventListener('click', () => {
            this.videoLector.pause()
        })

        this.button.stop.addEventListener('click', () => {
            this.videoLector.currentTime = 0
            this.videoLector.pause()
        })

        this.button.avance.addEventListener('click', () => {
            this.videoLector.currentTime += 10
        })

        this.button.recul.addEventListener('click', () => {
            this.videoLector.currentTime -= 10
        })

        this.button.loop.addEventListener('click', () => {
            this.videoLector.loop = !this.videoLector.loop
            console.log(true)
            this.button.loop.style.backgroundColor = this.videoLector.loop
                ? '#33FF3380'
                : '#FF333380'
        })
    }
}

customElements.define('video-player', VideoLector)
