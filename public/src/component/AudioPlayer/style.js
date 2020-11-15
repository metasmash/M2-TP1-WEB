export default `
<style>

#gain-value {
position:absolute
}

#root {
    margin-bottom: 5%;
    margin-left:30px;
    margin-top:30px;
    color:white;
    background-color: midnightblue;
    width:auto;
    height:auto;
    display: inline-block;
    padding:10px;
    border-radius: 10px;
    border: solid #d3fffd 1px;
}

:focus { outline: none; }

#equalizer {
    display:flex;
    flex-flow: row wrap;
}

#equalizer-inputs {
    margin-left:10px;
    margin-top:5px;
}

#title {
}

canvas {
    width:400px;
    height:300px;
    background-color: black;
    border: white solid 2px;
    margin-top:10px;
}

a {
color:white;
}

  #hz-value {
        display: inline-block;
        width: 150px;
        text-align: right;
      }

</style>
`
