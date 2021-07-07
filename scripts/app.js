const vid = document.getElementById("video1")
const skip = 5 //sec
let previousTime = 0

//Forward video
document.getElementById("next").onclick = e => {
    buttonDisable(true)
    //Keep track of where the rewind must go
    previousTime = vid.currentTime
    //Play the video
    vid.play()

    //Wait 5 seconds, then pause the video
    setTimeout(function(){
        buttonDisable(false)
        vid.pause()
    }, (skip * 1000))
}

//Reverse of video
//Seperate event and function since we are using requestAnimationframe
document.getElementById("previous").onclick = e => {
    buttonDisable(true)
    reverse()
}

function reverse(){
    //If the rewind has caught up with the previous
    if(vid.currentTime < previousTime){
        //Math max keeps the number positive. Otherwise when the user goes back to the beginning, they cant go back forwards.
        previousTime = Math.max(0,(vid.currentTime - skip))

        buttonDisable(false)
        //End
        return
    }
    //While we arent at whatever the previous time was, keep taking away from the current time and looping
    vid.currentTime -= .01
    window.requestAnimationFrame(reverse)
}

//Disable the buttons so the user cant just mess everything up
function buttonDisable(flipFlop){
    document.getElementById("next").disabled = flipFlop
    document.getElementById("previous").disabled = flipFlop
}