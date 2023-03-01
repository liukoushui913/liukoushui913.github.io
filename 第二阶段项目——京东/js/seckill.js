(function (window,undefined,$) {
    let interval = null;
    countdown();
    function countdown() {
        if (interval){
            clearInterval(interval);
        }
        let date = new Date();
        let hourNow = date.getHours();
        if (hourNow % 2 != 0){
            hourNow--;
        }
        let endTime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),hourNow + 2,0,0,0);
        hourNow = hourNow + "";
        $("#seckill_box .seckill_countdown .countdown_desc strong").text(hourNow.padStart(2,"0") + ":00");
        interval = setInterval(function () {
            let timeNow = new Date();
            let timeDistance = endTime - timeNow;
            let time = Math.floor(timeDistance / 1000);
            let seconds = time % 60 + "";
            let minute = Math.floor(time / 60) % 60 + "";
            let hour = Math.floor(time / 60 / 60) + "";
            if((hour * 1 == 0) && (minute * 1 == 0) && (seconds * 1 == 0)){
                location.reload();
            }
            $("#seckill_box .seckill_countdown .countdown_main .countdown_hour").text(hour.padStart(2,"0"));
            $("#seckill_box .seckill_countdown .countdown_main .countdown_minute").text(minute.padStart(2,"0"));
            $("#seckill_box .seckill_countdown .countdown_main .countdown_second").text(seconds.padStart(2,"0"));
        },1000);
    }
    $('#myCarousel4').carousel({
        interval: 3000
    });
})(window,undefined,jQuery)