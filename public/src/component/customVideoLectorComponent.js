const template = document.createElement('template')

export default class CustomElementsApp extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.init()
    }

    init() {
        template.innerHTML = `
<style>
.error {
  background-color: red;
}
</style>
<main>
<h1>${this.title}</h1>

<video id="mainvid" controls crossorigin="anonymous" >
    <source src="video/sample.mp4" type="video/mp4">
    <p>Votre navigateur ne supporte pas la vidéo HTML5. Voici à la place <a href="video/sample.pm4">un lien vers la vidéo</a>.</p>
</video>
</main>`
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('custom-player', CustomElementsApp)
