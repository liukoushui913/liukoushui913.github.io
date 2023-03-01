(function (window,undefined,$) {
    $(document).on("scroll",function () {
        let scrollTop = $(window).scrollTop();
        if (scrollTop < 703){
            $("#elevator .elevator_list .elevator_item.floor_nav_item").removeClass("active");
            $("#elevator").removeClass("fixed");
        }else if(scrollTop >= 703 && scrollTop < 980){
            $("#elevator").addClass("fixed");
            $("#elevator .elevator_list .elevator_item.floor_nav_item").each(function (index,item) {
                if (index == 0){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
        }else if(scrollTop >= 980 && scrollTop < 1986){
            $("#elevator .elevator_list .elevator_item.floor_nav_item").each(function (index,item) {
                if (index == 1){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
        }else if(scrollTop >= 1986 && scrollTop < 3030){
            $("#elevator .elevator_list .elevator_item.floor_nav_item").each(function (index,item) {
                if (index == 2){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
        }else if(scrollTop >= 3030){
            $("#elevator .elevator_list .elevator_item.floor_nav_item").each(function (index,item) {
                if (index == 3){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
        }
        if (scrollTop >= 3333){
            $("#elevator").addClass("fixed2");
        }else{
            $("#elevator").removeClass("fixed2");
        }
    });
    $("#elevator .elevator_list .elevator_item.floor_nav_item a").on("click",function (e) {
        e.preventDefault();
        console.log(e.target.dataset.target);
        let interval = null;
        console.log($(window).scrollTop(),e.target.dataset.target);
        if (Math.abs($(window).scrollTop() - e.target.dataset.target) > 20){
            console.log("aaa");
            interval = setInterval(scrollEvent,50);
        }
        function scrollEvent() {
            if($(window).scrollTop() > e.target.dataset.target){
                for (let i = 0; i < 100; i++) {
                    window.scrollBy(0,-2);
                    if (Math.abs($(window).scrollTop() - e.target.dataset.target) <= 20){
                        clearInterval(interval);
                        break;
                    }
                }
            }else{
                for (let i = 0; i < 100; i++) {
                    window.scrollBy(0,2);
                    if (Math.abs($(window).scrollTop() - e.target.dataset.target) <= 20){
                        clearInterval(interval);
                        break;
                    }
                }
            }
        }
    });
    $("#elevator .elevator_list .elevator_item.to_top a").on("click",function (e) {
        e.preventDefault();
        let interval = setInterval(scrollEvent2,50);
        function scrollEvent2() {
            for (let i = 0; i < 300; i++) {
                window.scrollBy(0,-2);
                if ($(window).scrollTop() <= 0){
                    clearInterval(interval);
                    break;
                }
            }
        }
    });
})(window,undefined,jQuery)