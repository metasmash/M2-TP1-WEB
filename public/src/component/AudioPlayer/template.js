const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<div id="root">
    <audio controls crossOrigin="anonymous" class="audio-element" src=""></audio><br>
    <button id="play">Play</button>
    <button id="pause">Pause</button><br>
    Panner: <input id="panner" type="range" min="-1" max="1" value="0" step="0.01">
    Audio: <input id="gain" type="range" min="0" max="1" value="1" step="0.01">
    <div id="equalizer">
    Band 1: <input id="eq-1" type="range" min="-30" max="0" value="30" step="0.1"><br>
    Band 2: <input id="eq-2" type="range" min="-30" max="0" value="30" step="0.1"><br>
    Band 3: <input id="eq-3" type="range" min="-30" max="0" value="30" step="0.1"><br>
    Band 4: <input id="eq-4" type="range" min="-30" max="0" value="30" step="0.1"><br>
    Band 5: <input id="eq-5" type="range" min="-30" max="0" value="30" step="0.1"><br>
    Band 6: <input id="eq-6" type="range" min="-30" max="0" value="30" step="0.1">
    
    </div>
</div>
`

export default template
