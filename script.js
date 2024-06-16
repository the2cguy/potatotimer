var a;
var mode = "time"
var currentState = "none"
var paused = false
var seconds = 0 
var text = {
    "start":"Start the Pomodoro!",
    "stop":"Stop",
    "pause":"Pause",
    "resume":"Resume Pomodoro",
    "skip_break":"Skip Break Time"
}
var config = {
    "transition":0.5,
}
$(".startbtn").html('<i class="bi bi-play-fill"></i> '+text["start"]);
$(".stop").html('<i class="bi bi-play-fill"></i> '+text["stop"]);
function stp(){
    clearInterval(a);
    currentState = "none"
    $(".startbtn").html('<i class="bi bi-play-fill"></i> '+text["start"]);
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
    $(".break").css("background", "var(--bg0h)");
    $(".break").css("color", "var(--fg0)");
    $(".work").css("background", "var(--bg0h)");
    $(".work").css("color", "var(--fg0)");
});
$(".startbtn").click(function (e) { 
    if (currentState == "none"){
        $(".stop").show()

        currentState = "main"
        $(".startbtn").html('<i class="bi bi-pause-fill"></i> '+text["pause"]);
        clearInterval(a)
        e.preventDefault();
        seconds = $("#preset").val().split("-")[0] * 60
        a = setInterval(() => {
            if (currentState == "main"){
                $(".work").css("background", "var(--fg0)");
                $(".work").css("color", "var(--bg0)");
                $(".break").css("background", "var(--bg0h)");
                $(".break").css("color", "var(--fg0)");
            }
            if (currentState == "break"){
                $(".break").css("background", "var(--fg0)");
                $(".break").css("color", "var(--bg0)");
                $(".work").css("background", "var(--bg0h)");
                $(".work").css("color", "var(--fg0)");
            }
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
                    $(".startbtn").html('<i class="bi bi-skip-end-fill"></i> '+text["skip_break"]);
                    seconds = $("#preset").val().split("-")[1] * 60
                }
                seconds -= 1
            }
        }, 1000 )
    }
    else if(currentState == "main"){
        currentState = "pause"
        paused = true
        $(".startbtn").html('<i class="bi bi-play-fill"></i> '+text["resume"]);
    }
    else if(currentState == "pause"){
        currentState = "main";
        paused = false
        $(".startbtn").html('<i class="bi bi-pause-fill"></i> '+text["pause"]);
    }
    else if(currentState == "break"){
        currentState = "main";
        $(".startbtn").html('<i class="bi bi-pause-fill"></i> '+text["pause"]);
        paused = false  
        seconds = $("#preset").val().split("-")[0] * 60
    }
});