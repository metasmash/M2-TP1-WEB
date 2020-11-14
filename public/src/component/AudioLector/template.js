const template = document.createElement('template')
import css from './style.js'

template.innerHTML = `${css}
<div id="root">
    <audio class="audio-element" src="" controls></audio>

</div>
`

export default template
