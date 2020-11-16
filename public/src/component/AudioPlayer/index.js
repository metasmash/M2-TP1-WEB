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
        this.fftSizeWaveForm = 1024
        this.fftSizeFrequencies = 64

        this.init().then(async () => {
            await this.initDraw()
            console.log(
                `${this.innerTitle.innerHTML}: Initialisation is a success!!`
            )
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
                console.log(`${this.innerTitle}: Audio node schema is mounted!`)
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
        this.gainNode.connect(this.dest)

        //connect to visualizer
        this.gainNode.connect(this.analyserWaveForm)
        this.gainNode.connect(this.analyserFrequencies)
    }

    initAudioNodes = () => {
        this.audioContext = new ctx()
        this.dest = this.audioContext.destination

        this.gainNode = this.audioContext.createGain()
        this.panNode = this.audioContext.createStereoPanner()

        //for waveForm
        this.analyserWaveForm = this.audioContext.createAnalyser()
        this.analyserWaveForm.fftSize = this.fftSizeWaveForm
        this.analyserWaveForm.bufferLength = this.analyserWaveForm.frequencyBinCount
        this.analyserWaveForm.dataArray = new Uint8Array(
            this.analyserWaveForm.bufferLength
        )

        //for frequenciesVisualization
        this.analyserFrequencies = this.audioContext.createAnalyser()
        this.analyserFrequencies.fftSize = this.fftSizeFrequencies
        this.analyserFrequencies.bufferLength = this.analyserFrequencies.frequencyBinCount
        this.analyserFrequencies.dataArray = new Uint8Array(
            this.analyserFrequencies.bufferLength
        )

        this.initEqualizer()
    }
    value

    initEventListener = () => {
        this.gainSlider.oninput = (e) => {
            this.gainNode.gain.value = e.target.value
            this.gainValue.innerHTML = e.target.value
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
                this.equalizerValues[i].innerHTML = e.target.value
            }
        })

        this.switchDrawInput.oninput = (e) => {
            if (e.target.checked) {
                this.canvasFrequencies.style.visibility = 'hidden'
            } else {
                this.canvasFrequencies.style.visibility = 'visible'
            }
        }
    }

    initAttribute = async () => {
        this.srcAttribute = this.getAttribute('src')
        this.titleAttribute = this.innerHTML
    }

    initQuerySelectors = () => {
        this.audioPlayer = this.shadowRoot.querySelector('.audio-element')
        this.gainSlider = this.shadowRoot.querySelector('#gain')
        this.stereoPanner = this.shadowRoot.querySelector('#panner')
        this.equalizerInputs = this.shadowRoot.querySelectorAll('[id^=eq-in-]')
        this.equalizerValues = this.shadowRoot.querySelectorAll('#eq-value')
        this.switchDrawInput = this.shadowRoot.querySelector('.switch')
        this.gainValue = this.shadowRoot.querySelector('#gain-value')
        this.button = {
            play: this.shadowRoot.querySelector('#play'),
            pause: this.shadowRoot.querySelector('#pause'),
        }
        this.innerTitle = this.shadowRoot.querySelector('#title')
        this.canvasWaveForm = this.shadowRoot.querySelector('#wave-form')
        this.canvasFrequencies = this.shadowRoot.querySelector(
            '#frequencies-visualization'
        )
    }

    play = () => {
        this.audioPlayer.play()
    }

    pause = () => {
        this.audioPlayer.pause()
    }

    initEqualizer = () => {
        this.equalizerValues.forEach((freq) => {
            const eq = this.audioContext.createBiquadFilter()
            eq.frequency.value = freq
            eq.type = 'peaking'
            eq.gain.value = 0
            this.filters.push(eq)
        })
    }

    drawWaveForm = () => {
        let width = this.canvasWaveForm.width
        let height = this.canvasWaveForm.height
        let canvasContext = this.canvasWaveForm.getContext('2d')

        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)'
        canvasContext.fillRect(0, 0, width, height)

        this.analyserWaveForm.getByteTimeDomainData(
            this.analyserWaveForm.dataArray
        )

        canvasContext.lineWidth = 2
        canvasContext.strokeStyle = 'red'

        canvasContext.beginPath()

        let sliceWidth = width / this.analyserWaveForm.bufferLength
        let x = 0

        for (let i = 0; i < this.analyserWaveForm.bufferLength; i++) {
            // dataArray values are between 0 and 255,
            // normalize v, now between 0 and 1
            let v = this.analyserWaveForm.dataArray[i] / 255
            // y will be in [0, canvas height], in pixels
            let y = v * height

            if (i === 0) {
                canvasContext.moveTo(x, y)
            } else {
                canvasContext.lineTo(x, y)
            }

            x += sliceWidth
        }

        canvasContext.lineTo(
            this.canvasWaveForm.width,
            this.canvasWaveForm.height / 2
        )

        canvasContext.stroke()

        requestAnimationFrame(this.drawWaveForm)
    }

    drawFrequencies = () => {
        let width = this.canvasFrequencies.width
        let height = this.canvasFrequencies.height
        let canvasContext = this.canvasFrequencies.getContext('2d')

        // clear the canvas
        canvasContext.clearRect(0, 0, width, height)
        // Get the analyser data
        this.analyserFrequencies.getByteFrequencyData(
            this.analyserFrequencies.dataArray
        )

        let barWidth = width / this.analyserFrequencies.bufferLength
        let barHeight
        let x = 0
        // values go from 0 to 255 and the canvas heigt is 100. Let's rescale
        // before drawing. This is the scale factor
        let heightScale = height / 128
        for (let i = 0; i < this.analyserFrequencies.bufferLength; i++) {
            // between 0 and 255
            barHeight = this.analyserFrequencies.dataArray[i]

            // The color is red but lighter or darker depending on the value
            canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)'
            // scale from [0, 255] to the canvas height [0, height] pixels
            barHeight *= heightScale
            // draw the bar
            canvasContext.fillRect(
                x,
                height - barHeight / 2,
                barWidth,
                barHeight / 2
            )

            // 1 is the number of pixels between bars - you can change it
            x += barWidth + 1
        }
        // once again call the visualize function at 60 frames/s
        requestAnimationFrame(this.drawFrequencies)
    }

    initDraw = async () => {
        requestAnimationFrame(this.drawWaveForm)
        requestAnimationFrame(this.drawFrequencies)
    }
}

customElements.define('audio-lector', AudioLector)
