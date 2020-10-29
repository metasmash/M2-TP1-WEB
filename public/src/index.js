const isLoaded = () => console.log({ isLoaded: true })

isLoaded()

const playButton = document.querySelector('#play')
const pauseButton = document.querySelector('#pause')

const videoLector = document.querySelector('#mainvid')

console.log(playButton)
playButton.addEventListener('click', (e) => {
    console.log('you pressed play')
    console.log(e)
    videoLector.play()
})
pauseButton.addEventListener('click', (e) => {
    console.log('you pressed pause')
    console.log(e)
    videoLector.pause()
})
