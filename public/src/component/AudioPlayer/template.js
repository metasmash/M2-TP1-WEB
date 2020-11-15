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
    Band 350Hz:  <br>
    Band 1000Hz:  <br>
    Band 3500Hz: <br>
    Band 10000Hz: <br>
</div>
<div id="equalizer-inputs">
     <input id="eq-1" type="range" min="-20" max="20" value="0" step="0.01"><br>
     <input id="eq-2" type="range" min="-20" max="20" value="0" step="0.01"><br>
     <input id="eq-3" type="range" min="-20" max="20" value="0" step="0.01"><br>
      <input id="eq-4" type="range" min="-20" max="20" value="0" step="0.01"><br>
      <input id="eq-5" type="range" min="-20" max="20" value="0" step="0.01"><br>
      <input id="eq-6" type="range" min="-20" max="20" value="0" step="0.01">
    </div>
    </div>
    <canvas id="wave-form"></canvas><br>
    <canvas id="frequencies-visualization"></canvas><br>
    <a href="https://learning.edx.org/course/course-v1:W3Cx+HTML5.2x+2T2020a/block-v1:W3Cx+HTML5.2x+2T2020a+type@sequential+block@f162bb287eca4f04bb22d60b2c5456ac/block-v1:W3Cx+HTML5.2x+2T2020a+type@vertical+block@c48cf5b33ed24756b362b749192840ff">
    Click here to access to MOOC by Michel Buffa</a>
</div>
`

export default template
