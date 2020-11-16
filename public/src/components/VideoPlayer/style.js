export default `<style> 

#title {
    pointer-events: none;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
}

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
    margin:10px;
    width:50px;
    height:50px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    border: solid #FFFFA2;
}

#buttonGroup {
    display:flex;
    flex-flow: row wrap;
    height:10px;
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

</style>`
