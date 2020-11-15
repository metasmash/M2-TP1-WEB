import template from './template.js'
import '../../../lib/webaudio-controls.js'

let ctx = window.AudioContext || window.webkitAudioContext

class AudioLector extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.equalizerValues = [60, 170, 350, 1000, 3500, 10000]
        this.filters = []
        this.fftSize = 1024

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
        this.shadowRoot.querySelector('#title').innerHTML = this.titleAttribute
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
        this.gainNode.connect(this.analyser)
        this.analyser.connect(this.dest)
    }

    initAudioNodes = () => {
        this.audioContext = new ctx()
        this.dest = this.audioContext.destination

        this.gainNode = this.audioContext.createGain()
        this.panNode = this.audioContext.createStereoPanner()
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.fftSize = this.fftSize
        this.analyser.bufferLength = this.analyser.frequencyBinCount
        this.analyser.dataArray = new Uint8Array(this.analyser.bufferLength)

        this.initEqualizer()
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
        this.title = this.shadowRoot.querySelector('#title')
        this.canvas = this.shadowRoot.querySelector('#wave-form')
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
        this.equalizerValues.forEach((freq) => {
            const eq = this.audioContext.createBiquadFilter()
            eq.frequency.value = freq
            eq.type = 'peaking'
            eq.gain.value = 0
            this.filters.push(eq)
        })

        requestAnimationFrame(this.initWaveForm)
    }

    initWaveForm = () => {
        let width = this.canvas.width
        let height = this.canvas.height
        let canvasContext = this.canvas.getContext('2d')

        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)'
        canvasContext.fillRect(0, 0, width, height)

        this.analyser.getByteTimeDomainData(this.analyser.dataArray)

        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = 'lightBlue'

        canvasContext.beginPath()

        let sliceWidth = width / this.analyser.bufferLength
        let x = 0

        for (let i = 0; i < this.analyser.bufferLength; i++) {
            // dataArray values are between 0 and 255,
            // normalize v, now between 0 and 1
            let v = this.analyser.dataArray[i] / 255
            // y will be in [0, canvas height], in pixels
            let y = v * height

            if (i === 0) {
                canvasContext.moveTo(x, y)
            } else {
                canvasContext.lineTo(x, y)
            }

            x += sliceWidth
        }

        canvasContext.lineTo(this.canvas.width, this.canvas.height / 2)

        canvasContext.stroke()

        requestAnimationFrame(this.initWaveForm)
    }
}

customElements.define('audio-lector', AudioLector)
