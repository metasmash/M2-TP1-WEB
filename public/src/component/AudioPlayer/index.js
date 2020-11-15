import template from './template.js'

let ctx = window.AudioContext || window.webkitAudioContext

class AudioLector extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.equalizerValues = [60, 170, 350, 1000, 3500, 10000]
        this.filters = []

        this.init().then(() => {
            console.log('Init is a success!!')
        })
    }

    init = async () => {
        this.initAudioNodes()
        this.initQuerySelectors()
        this.initAttribute().then(() => {
            this.audioPlayer.src = this.srcAttribute
        })

        try {
            this.connectAudioNodes().then(() => {
                console.log('Audio node schema is mounted!')
            })
        } catch (e) {
            console.log('there is an error connecting audio nodes!')
        }
        this.initEventListener()
    }

    connectAudioNodes = async () => {
        let gainAudioPlayerSource = this.audioContext.createMediaElementSource(
            this.audioPlayer
        )

        gainAudioPlayerSource.connect(this.filters[0])

        for (let i = 0; i < this.filters.length - 1; i++) {
            this.filters[i].connect(this.filters[i + 1])
        }

        this.filters[this.filters.length - 1].connect(this.panNode)

        this.panNode.connect(this.gainNode)
        this.gainNode.connect(this.dest)
    }

    initAudioNodes = () => {
        this.audioContext = new ctx()
        this.dest = this.audioContext.destination

        this.gainNode = this.audioContext.createGain()
        this.panNode = this.audioContext.createStereoPanner()
        this.initEqualizer()
    }

    initEventListener = () => {
        this.gainSlider.oninput = (e) => {
            console.log(`Volume changed to: ${e.target.value}`)
            this.gainNode.gain.value = e.target.value
        }

        this.stereoPanner.oninput = (e) => {
            console.log(this.panNode)
            this.panNode.pan.setValueAtTime(
                e.target.value,
                this.audioContext.currentTime
            )
        }

        this.button.play.addEventListener('click', this.play)
        this.button.pause.addEventListener('click', this.pause)

        this.equalizerInputs.forEach((e, i) => {
            e.oninput = (e) => {
                this.filters[i].gain.value = e.target.value
            }
        })
    }

    initAttribute = async () => {
        this.srcAttribute = this.getAttribute('src')
        this.titleAttribute = this.innerHTML
    }

    initQuerySelectors = () => {
        this.audioPlayer = this.shadowRoot.querySelector('.audio-element')
        this.gainSlider = this.shadowRoot.querySelector('#gain')
        this.stereoPanner = this.shadowRoot.querySelector('#panner')
        this.equalizerInputs = this.shadowRoot.querySelectorAll('[id^=eq-]')
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

    initEqualizer = () => {
        this.equalizerValues.forEach((e) => {
            const eq = this.audioContext.createBiquadFilter()
            eq.frequency.value = e
            eq.type = 'peaking'
            eq.gain.value = 0
            this.filters.push(eq)
        })
    }
}

customElements.define('audio-lector', AudioLector)
