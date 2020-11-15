const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<div id="root">
    <audio controls crossOrigin="anonymous" class="audio-element" src=""></audio>
    <button id="play">Play</button>
    <button id="pause">Pause</button>
    Panner: <input id="panner" type="range" min="-1" max="1" value="0" step="0.01">
    Audio: <input id="gain" type="range" min="0" max="1" value="1" step="0.01">
</div>
`

export default template
