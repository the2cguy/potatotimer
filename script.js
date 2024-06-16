var a;
var mode = "time"
var currentState = "none"
var paused = false
var seconds = 0 
function stp(){
    clearInterval(a);
    currentState = "none"
    $(".startbtn").html('<i class="bi bi-play-fill"></i> Start Pomodoro!');
    if(mode=="money"){
        $(".main-clock").text("$0");
        $(".mini").text("00:00");
    }else{
        $(".main-clock").text("00:00");
        $(".mini").text("$0");
    }
    $(".stop").hide()
}
function timerend(){

}
function timetodollar(seconds){
    var mins = seconds/60
    var dollars = mins * 0.05
    return dollars
}
function getTimeTime(){
    return Math.floor(seconds/60).toString().padStart(2, '0')+":"+Math.floor(seconds%60).toString().padStart(2, '0');
}
$(".intime").click(function (e) { 
    e.preventDefault();
    if ($(".intime").text() == "In Time"){
        $(".intime").text("In Money");
        $(".main-clock").text("00:00");
        $(".mini").text("$0");
        if(currentState == "main" || currentState == "pause"){
            $(".main-clock").text(getTimeTime());
            $(".mini").text("$"+timetodollar(seconds).toFixed(3).toString());
        }
        mode = "time"
    }else{
        $(".intime").text("In Time");
        mode = "money"
        $(".main-clock").text("$0");
        $(".mini").text("00:00");
        if(currentState == "main" || currentState == "pause"){
            $(".mini").text(getTimeTime());
            $(".main-clock").text("$"+timetodollar(seconds).toFixed(3).toString());
        }
    }
});
$(".stop").click(function (e) { 
    e.preventDefault();
    stp();
});
$(".startbtn").click(function (e) { 
    if (currentState == "none"){
        $(".stop").show()

        currentState = "main"
        $(".startbtn").html('<i class="bi bi-pause-fill"></i> Pause');
        clearInterval(a)
        e.preventDefault();
        seconds = $("#preset").val().split("-")[0] * 60
        a = setInterval(() => {
            if (currentState != "pause"){
                if(mode == "time"){
                    $(".main-clock").text(getTimeTime());
                    $(".mini").text("$"+timetodollar(seconds).toFixed(3).toString());
                }else{
                    $(".main-clock").text("$"+timetodollar(seconds).toFixed(3).toString());
                    $(".mini").text(getTimeTime());
                }
                if(seconds < 1){
                    timerend()
                    currentState = "break"
                    seconds = $("#preset").val().split("-")[1] * 60
                }
                seconds -= 0.1
            }
        }, 100   )
    }
    else if(currentState == "main"){
        currentState = "pause"
        paused = true
        $(".startbtn").html('<i class="bi bi-play-fill"></i> Resume Pomodoro!');
    }
    else if(currentState == "pause"){
        currentState = "main";
        paused = false
        $(".startbtn").html('<i class="bi bi-pause-fill"></i> Pause');
    }
});