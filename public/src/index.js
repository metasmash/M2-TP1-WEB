import './component/VideoLector'
import './component/AudioLector'

const button = {
    play: document.querySelector('#play'),
    pause: document.querySelector('#pause'),
    stop: document.querySelector('#stop'),
    avance: document.querySelector('#avance'),
    recul: document.querySelector('#recul'),
    loop: document.querySelector('#loop'),
}

const videoLector = document.querySelector('#mainvid')

console.log(videoLector)

button.play.addEventListener('click', () => {
    videoLector.play()
})
button.pause.addEventListener('click', () => {
    videoLector.pause()
})

button.stop.addEventListener('click', () => {
    videoLector.currentTime = 0
    videoLector.pause()
})

button.avance.addEventListener('click', () => {
    videoLector.currentTime += 10
})

button.recul.addEventListener('click', () => {
    videoLector.currentTime -= 10
})

button.loop.addEventListener('click', () => {
    videoLector.loop = !videoLector.loop
    console.log(true)
    button.loop.style.backgroundColor = videoLector.loop
        ? '#33FF3380'
        : '#FF333380'
})
