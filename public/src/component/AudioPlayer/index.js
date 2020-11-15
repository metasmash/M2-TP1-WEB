import template from './template.js'

let ctx = window.AudioContext || window.webkitAudioContext

class AudioLector extends HTMLElement {
    constructor() {
        super()

        this.audioContext = new ctx()
        this.dest = this.audioContext.destination

        this.gainNode = this.audioContext.createGain()
        this.panNode = this.audioContext.createPanner()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.init()
    }

    init = () => {
        this.initQuerySelectors()
        this.initAttribute().then(() => {
            this.audioPlayer.src = this.srcAttribute
        })
        this.connectAudioNodes()
        this.initEventListener()
    }

    initEventListener = () => {
        this.gainSlider.oninput = (e) => {
            console.log(`Volume changed to: ${e.target.value}`)
            this.gainNode.gain.value = e.target.value
        }

        this.stereoPanner.oninput = (e) => {
            this.panNode.pan.setValueAtTime(
                e.target.value,
                this.audioContext.currentTime
            )
        }

        this.button.play.addEventListener('click', this.play)
        this.button.pause.addEventListener('click', this.pause)
    }

    initAttribute = async () => {
        this.srcAttribute = this.getAttribute('src')
        this.titleAttribute = this.innerHTML
    }

    initQuerySelectors = () => {
        this.audioPlayer = this.shadowRoot.querySelector('.audio-element')
        this.gainSlider = this.shadowRoot.querySelector('#gain')
        this.stereoPanner = this.shadowRoot.querySelector('#panner')
        this.button = {
            play: this.shadowRoot.querySelector('#play'),
            pause: this.shadowRoot.querySelector('#pause'),
        }
    }

    play = () => {
        this.audioPlayer.play().then(() => {
            console.log('play')
        })
    }

    pause = () => {
        this.audioPlayer.pause().then(() => {
            console.log('paused')
        })
    }

    connectAudioNodes = () => {
        //TODO: fix the connection problem, the audio won't load...
        //Uncomment the lines below to see the problem.

        console.log('connectedGain()')

        let gainAudioPlayerSource = this.audioContext.createMediaElementSource(
            this.audioPlayer
        )
        gainAudioPlayerSource.connect(this.gainNode)
        this.gainNode.connect(this.panNode)
        this.panNode.connect(this.dest)
    }
}

customElements.define('audio-lector', AudioLector)
