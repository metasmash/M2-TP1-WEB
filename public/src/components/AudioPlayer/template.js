const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<div id="root">
<h2 id="title"></h2>
    <audio controls crossOrigin="anonymous" class="audio-element" src=""></audio><br>
    <button id="play">Play</button>
    <button id="pause">Pause</button>
    <button id="backward">-10</button>
    <button id="forward">+10</button>
    Loop: <input id="loop" type="checkbox"><br>
    Panner: <input id="panner" type="range" min="-1" max="1" value="0" step="0.1">
    Audio: <input id="gain" type="range" min="0" max="1" value="1" step="0.01">
    <label id="gain-value" for="gain">1</label>
    <div id="equalizer">
<div id="equalizer-inputs">
    <label id="hz-value" for="eq-1">Band 60Hz:   </label>
     <input id="eq-in-1" type="range" min="-20" max="20" value="0" step="0.1">
     <label id="eq-value" for="eq-1">0</label>
     <br>   
      <label id="hz-value" for="eq-2">Band 170Hz:  </label>
     <input id="eq-in-2" type="range" min="-20" max="20" value="0" step="0.1">
     <label id="eq-value" for="eq-2">0</label>
     <br>
         <label id="hz-value" for="eq-3">Band 350Hz:  </label>
     <input id="eq-in-3" type="range" min="-20" max="20" value="0" step="0.1">
     <label id="eq-value" for="eq-3">0</label>
     <br>
         <label id="hz-value" for="eq-4">Band 1000Hz: </label>
      <input id="eq-in-4" type="range" min="-20" max="20" value="0" step="0.1">
      <label id="eq-value" for="eq-4">0</label>
      <br>
          <label id="hz-value" for="eq-5">Band 3500Hz: </label>
      <input id="eq-in-5" type="range" min="-20" max="20" value="0" step="0.1">
      <label id="eq-value" for="eq-5">0</label>
      <br>
          <label id="hz-value" for="eq-6">Band 10000Hz:</label>
      <input id="eq-in-6" type="range" min="-20" max="20" value="0" step="0.1">
          <label id="eq-value" for="eq-6">0</label>
    </div>
    </div>
     <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label><br>
<div class="canvas-wrapper">
    <canvas id="wave-form"></canvas>
    <canvas id="frequencies-visualization"></canvas><br>
</div>
    <a href="https://learning.edx.org/course/course-v1:W3Cx+HTML5.2x+2T2020a/block-v1:W3Cx+HTML5.2x+2T2020a+
    type@sequential+block@f162bb287eca4f04bb22d60b2c5456ac/block-v1:W3Cx+HTML5.2x+2T2020a+type@verti
    cal+block@c48cf5b33ed24756b362b749192840ff">
    Click here to access to MOOC by Michel Buffa</a>
</div>
`

export default template
