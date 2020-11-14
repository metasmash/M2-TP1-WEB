const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<main>
<div id="root">
<h1 class="title"></h1>
 
<video class="video-lector" controls crossorigin="anonymous" loop >
    <source src="" type="video/mp4">
    <p>Votre navigateur ne supporte pas la vidéo HTML5.</p>
</video>
    <div id="buttonGroup">
        <button id="play" class="btn btn-primary">Play</button>
        <button id="pause" class="btn btn-primary">Pause</button>
        <button id="stop" class="btn btn-primary">Stop</button>
        <button id="avance" class="btn btn-primary">+10</button>
        <button id="recul" class="btn btn-primary">-10</button>
        <button id="loop" class="btn btn-primary">Loop</button>
    </div>
 </div>
</main>`

export default template
