const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<div id="root">
<h2 id="title"></h2>
    <audio controls crossOrigin="anonymous" class="audio-element" src=""></audio><br>
    <button id="play">Play</button>
    <button id="pause">Pause</button><br>
    Panner: <input id="panner" type="range" min="-1" max="1" value="0" step="0.01">
    Audio: <input id="gain" type="range" min="0" max="1" value="1" step="0.01">
    <div id="equalizer">
    <div id="frequencies">
    Band 60Hz:   <br> 
    Band 170Hz:   <br>
    Band 1050Hz:  <br>
    Band 1000Hz:  <br>
    Band 10500Hz: <br>
    Band 10000Hz: <br>
</div>
<div id="equalizer-inputs">
     <input id="eq-1" type="range" min="-10" max="10" value="0" step="0.01"><br>
     <input id="eq-2" type="range" min="-10" max="10" value="0" step="0.01"><br>
     <input id="eq-3" type="range" min="-10" max="10" value="0" step="0.01"><br>
      <input id="eq-4" type="range" min="-10" max="10" value="0" step="0.01"><br>
      <input id="eq-5" type="range" min="-10" max="10" value="0" step="0.01"><br>
      <input id="eq-6" type="range" min="-10" max="10" value="0" step="0.01">
    </div>
    </div>
</div>
`

export default template
