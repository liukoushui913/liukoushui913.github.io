(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/joy_logo/get?source=pc-home&pin=&uuid=16400756132851389749377&callback=?&_=1640136382017",function (res) {
        let joyWordArr = res.data.joy_word.split("$");
        $("#main_nav_box #logo_box .logo_scene .logo_scene_info p").text(joyWordArr[0]);
        $("#main_nav_box #logo_box .logo_scene .logo_scene_info p").css("color",joyWordArr[1]);
        $("#main_nav_box #logo_box .logo_scene .logo_scene_info span").css("backgroundColor",joyWordArr[2]);
        $("#main_nav_box #logo_box .logo_scene .logo_scene_info span").css("color",joyWordArr[3]);
        logoAction(res);
    })
    function logoAction(res) {
        let counter = 0;
        let interval = null;
        let timeout = null;
        $("#main_nav_box #logo_box .logo_scene .logo_scene_img").attr("src",res.data.joy_image_url + "?v=" + Date.now());
        $("#main_nav_box #logo_box").mouseenter(function () {
            if (timeout){
                clearTimeout(timeout);
            }
            $("#main_nav_box #logo_box .logo").fadeOut(100);
            $("#main_nav_box #logo_box .logo_scene").fadeIn(100,function () {
                setTimeout(function () {
                    $("#main_nav_box #logo_box .logo_scene .logo_scene_info").fadeIn();
                },3000);
            });
            if (!interval){
                interval = setInterval(function () {
                    counter += 100;
                },100);
            }
        });
        $("#main_nav_box #logo_box").mouseleave(function () {
            timeout = setTimeout(() => {
                if (interval){
                    clearInterval(interval);
                    interval = null;
                }
                $("#main_nav_box #logo_box .logo_scene").fadeOut(100);
                $("#main_nav_box #logo_box .logo_scene .logo_scene_info").hide();
                $("#main_nav_box #logo_box .logo").fadeIn(100);
                $("#main_nav_box #logo_box .logo_scene .logo_scene_img").attr("src",res.data.joy_image_url + "?v=" + Date.now());
                counter = 0;
            },(6000 - counter <= 0) ? 1000 : 6000 - counter);
        });
    }
    $.getJSON("https://floor.jd.com/user-v20/hotwords/get?source=pc-home&pin=&uuid=1640074177490412175426&callback=?&_=1640074881279", function (res) {
        let data = res.data;
        layerHotWords(data);
        layerInputBg(data);
    });
    function layerHotWords(data) {
        let index = 0;
        $("#hotwords").append(`<li><a class="active" href=${"http:" + data[index].u}>${data[index].n}</a></li>`);
        setInterval(function () {
            index++;
            if (index >= data.length){
                index = 0;
            }
            $("#hotwords li .active").attr("href","http:" + data[index].u);
            $("#hotwords li .active").text(data[index].n);
        },3000);
        for (let i = 1; i < data.length; i++) {
            if(data[i].c == ""){
                $("#hotwords").append(`<li><a href=${"http:" + data[i].u}>${data[i].n}</a></li>`);
            }else{
                break;
            }
        }
    }
    function layerInputBg(data) {
        $("#search_box #search input").val("");
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].c == ""){
                continue;
            }else if (data[i].c == "2"){
                arr.push(data[i].n);
            }
        }
        let index = 0;
        $("#search_box #search #search_bg").text(arr[index]);
        setInterval(function () {
            index++;
            if(index > arr.length - 1){
                index = 0;
            }
            $("#search_box #search #search_bg").text(arr[index]);
        },5000);
        $("#search_box #search input").focus(function () {
            $("#search_box #search #search_bg").css("color","rgb(200,200,200)");
        });
        $("#search_box #search input")[0].oninput = function () {
            if (this.value != ""){
                $("#search_box #search #search_bg").css("display","none");
            }else{
                $("#search_box #search #search_bg").css("display","block");
            }
        }
        $("#search_box #search input").blur(function () {
            $("#search_box #search #search_bg").css("color","#989898");
        });
    }
    search();
    function search() {
        $("#search_box #search button").click(function () {
            let keyword = $("#search_box #search input").val().trim();
            let url = `https://search.jd.com/Search?keyword=${keyword}`;
            location.href = url;
        });
    }
    $(document).on("scroll",function () {
        let scrollTop = $(window).scrollTop();
        if (scrollTop >= 700){
            let search_box = $("#main_nav_box #main_nav #main_nav_top #search_box").detach();
            $("#main_nav_box .main_nav_fixed .main_nav_fixed_r").append(search_box);
            $("#main_nav_box .main_nav_fixed").slideDown(200,"linear");
        }else{
            $("#main_nav_box .main_nav_fixed").hide();
            let search_box = $("#main_nav_box .main_nav_fixed .main_nav_fixed_r #search_box").detach();
            $("#main_nav_box #main_nav #main_nav_top .search_box_stand").append(search_box);
        }
    })
})(window,undefined,jQuery)