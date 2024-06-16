var a;
var mode = "time"
var currentState = "main"
$(".intime").click(function (e) { 
    e.preventDefault();
    if ($(".intime").text() == "In Money"){
        $(".intime").text("In Time");
        mode = "time"
    }else{
        $(".intime").text("In Money");
        mode = "money"
    }
});
$(".startbtn").click(function (e) { 
    currentState = "main"
    clearInterval(a)
    e.preventDefault();
    var targettime = moment()
    targettime.add($("#preset").val().split("-")[0], "minutes");
    a = setInterval(() => {
        $(".main-clock").text(targettime.diff(moment(), "minutes").toString()+":"+(targettime.diff(moment(), "seconds")%60));
        if(targettime.diff(moment(), "seconds") < 1){
            alert("yay!")
            clearInterval(a);
        }
    }, 100)
});