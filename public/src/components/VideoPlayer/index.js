import template from './template.js'

export default class VideoLector extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.init()
    }

    init = () => {
        this.initAttribute().then(() => {
            this.videoLector.loop = !!this.loopAttribute
            this.button.loop.style.backgroundColor = !!this.loopAttribute
                ? '#33FF3380'
                : '#FF333380'
        })

        this.initQuerySelectors().then(() => {
            this.source.src = this.srcAttribute
            //this.audio.src = this.srcAttribute
            this.shadowRoot.querySelector(
                '.title'
            ).innerText = this.titleAttribute
            this.initListeners()
        })
    }

    initAttribute = async () => {
        this.loopAttribute = this.getAttribute('loop') === 'true'
        this.srcAttribute = this.getAttribute('src')
        this.titleAttribute = this.innerHTML
    }

    initQuerySelectors = async () => {
        this.button = {
            play: this.shadowRoot.querySelector('#play'),
            pause: this.shadowRoot.querySelector('#pause'),
            stop: this.shadowRoot.querySelector('#stop'),
            avance: this.shadowRoot.querySelector('#avance'),
            recul: this.shadowRoot.querySelector('#recul'),
            loop: this.shadowRoot.querySelector('#loop'),
        }
        this.videoLector = this.shadowRoot.querySelector('.video-lector')
        this.source = this.shadowRoot.querySelector('.video-lector source')
        this.audio = this.shadowRoot.querySelector('.audio-element')
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
            this.button.loop.style.backgroundColor = this.videoLector.loop
                ? '#33FF3380'
                : '#FF333380'
        })
    }
}

customElements.define('video-player', VideoLector)
