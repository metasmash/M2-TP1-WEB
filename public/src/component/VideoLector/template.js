const template = document.createElement('template')

template.innerHTML = `
<style> 
#mainvid {
    width:1080px;
    height:500px;
}

:focus { outline: none; }

#root {
    display:flex;
    margin-bottom: 5%;
    margin-left:30px;
    margin-top:30px;
}

button {
    margin:50px;
    width:100px;
    height:100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    border: solid #FFFFA2;
}

#buttonGroup {
    display:flex;
    flex-flow: row wrap;
}

h1 {
    position:absolute;
    margin-top:-10px;
    color:white;
}

#loop {
    background-color: #33FF3380;
}

.video-lector {
    width:720px;
    height:480px;
    background-color: black;
    border: 1px solid #ffffff;
   
}

</style>
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
