import template from './template.js'

class VideoLector extends HTMLElement {
  constructor() {
    super()

    this.initAttribute()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.initQuerySelectors().then(() => {
      this.source.src = this.srcAttribute
      this.shadowRoot.querySelector('.title').innerText = this.titleAttribute
      this.initListeners()
    })
  }

  initAttribute = () => {
    this.loopAttribute = this.getAttribute('loop')
    this.srcAttribute = this.getAttribute('src')
    this.titleAttribute = this.getAttribute('titre')
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
