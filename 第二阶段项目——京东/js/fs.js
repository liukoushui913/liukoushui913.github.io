(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/background/get?source=pc-home&pin=&uuid=16400756132851389749377&callback=?&_=1640309373756", function (res) {
        if (res != undefined && res.data != undefined){
            layerTreasure(res.data);
        }
    });
    $.getJSON("https://dc.3.cn/category/get?=&callback=?", function (res) {
        let data = res.data;
        layerNavLeft(data);
        layerPopMenu(data);
        navLeftMouseEvent();
    });
    $.getJSON("https://floor.jd.com/recommend-v20/focus_monetize/get?source=pc-home&callback=?&_=1640074881284", function (res) {
        layerSlider1(res.data);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/today_monetize/get?source=pc-home&callback=?&_=1640074881286", function (res) {
        layerSlider2(res.data);
    })
    $.getJSON("https://floor.jd.com/recommend-v20/news/get?source=pc-home&pin=&uuid=1640074177490412175426&jda=76161171.1640074177490412175426.1640074177.1640074177.1640074177.1&callback=?&_=1640074881289",function (res) {
        layerNews(res.data);
    });
    function layerTreasure(data) {
        let values = Object.values(data);
        for (let i = 0; i < 2; i++) {
            if (values[i].src != undefined){
                $("#fs #treasure_box2 .treasure1 img").attr("src","http:" + values[i].src);
                $("#fs #treasure_box2 .treasure2 img").attr("src","http:" + values[i].srcB);
            }else{
                $("#fs #treasure_box2").hide();
            }
        }
        $("#fs #treasure_box2 .close_icon").on("click",function () {
            $("#fs #treasure_box2").animate({
                width:272
            },100,"linear");

        });
        $("#fs #treasure_box2").hover(function () {
            $("#fs #treasure_box2").animate({
                width:1064
            },100,"linear",function () {
                $("#fs #treasure_box2 .close_icon").css("display","block");
            });
        },function () {
            $("#fs #treasure_box2 .close_icon").css("display","none");
            $("#fs #treasure_box2").animate({
                width:272
            },100,"linear");
        });
    }
    function layerNavLeft(data) {
        for (let i = 0; i < data.length; i++) {
            let arr = data[i].s;
            $("#fs_l .itemBox").append(`<li data-index=${i} class='item'></li>`);
            for (let j = 0; j < arr.length; j++) {
                let str = arr[j].n;
                let strArr = str.split("|");
                $("#fs_l .itemBox .item").eq(i).append(`<a href=${"http://" + strArr[0]}>${strArr[1]}</a>`);
                if (j < arr.length - 1){
                    $("#fs_l .itemBox .item").eq(i).append("<span>/</span>");
                }
            }
        }

    }
    function layerPopMenu(data) {
        for (let i = 0; i < data.length; i++) {
            $("#fs_l #popMenu_box").append(`<div data-index=${i} class='popMenu clearfix'></div>`);
            let htmlStr = "";
            let htmlStr1 = "<div class='popMenu_l left'>";
            let htmlStr6 = "</div>";
            let htmlStr2 = "<ul class='popMenu_l_top'>";
            let htmlStr4 = "</ul>";
            let htmlStr3 = "";
            for (let j = 0; j < data[i].t.length; j++) {
                let str = data[i].t[j];
                let strArr = str.split("|");
                htmlStr3 +=
                    `
                        <li><a href=${"http://" + strArr[0]}>${strArr[1]}<span>${">"}</span></a></li>
                    `;
            }
            let htmlStr5 = "";
            let listArr = data[i].s[0].s;
            for (let j = 0; j < listArr.length; j++) {
                let strArr = listArr[j].n.split("|");
                let htmlSubStr1 =
                    `
                        <dl class='popMenu_l_list'>
                            <dt><a href=${"http://" + strArr[0]}>${strArr[1]}<span>${">"}</span></a></dt>
                            <dd>
                    `;
                let htmlSubStr2 = "";
                let htmlSubStr3 = "</dd></dl>";
                for (let k = 0; k < listArr[j].s.length; k++) {
                    let itemStr = listArr[j].s[k].n;
                    let itemStrArr = itemStr.split("|");
                    htmlSubStr2 +=
                        `
                            <a href=${"http://" + itemStrArr[0]}>${itemStrArr[1]}</a>
                        `;
                }
                htmlStr5 += (htmlSubStr1 + htmlSubStr2 + htmlSubStr3);
            }
            let htmlStr7 = "<div class='popMenu_r left'><div class='popMenu_r_top'>";
            let htmlStr11 = "</div></div>";
            let htmlStr8 = "";
            let htmlStr9 = "</div><div class='popMenu_r_bottom'>";
            let htmlStr10 = "";
            for (let j = 0; j < data[i].b.length; j++) {
                if (j > 7){
                    break;
                }
                let imgStr = data[i].b[j];
                let imgStrArr = imgStr.split("|");
                htmlStr8 +=
                    `
                        <a href=${imgStrArr[0].startsWith("//") ? "http:" + imgStrArr[0] : "http://" + imgStrArr[0]}><img src=${"http://img30.360buyimg.com/" + imgStrArr[2]} alt=""></a>
                    `;
            }
            for (let j = 0; j < data[i].p.length; j++) {
                let imgStr = data[i].p[j];
                let imgStrArr = imgStr.split("|");
                htmlStr10 +=
                    `
                        <a href=${imgStrArr[0].startsWith("//") ? "http:" + imgStrArr[0] : "http://" + imgStrArr[0]}><img src=${"http://img30.360buyimg.com/" + imgStrArr[2]} alt=""></a>
                    `;
            }
            htmlStr = htmlStr1 + htmlStr2 + htmlStr3 + htmlStr4 + htmlStr5 + htmlStr6 + htmlStr7 + htmlStr8 + htmlStr9 + htmlStr10 + htmlStr11;
            $("#fs_l #popMenu_box .popMenu").eq(i).append(htmlStr);
        }
        $("#fs_l #popMenu_box .popMenu").hide();
    }
    function navLeftMouseEvent() {
        $("#fs_l .itemBox .item").hover(function () {
            let hoverIndex = this.dataset.index;
            this.style.backgroundColor = "#d9d9d9";
            $("#fs_l #popMenu_box .popMenu").each(function (index,item) {
                if (index == hoverIndex){
                    item.style.display = "block";
                }else{
                    item.style.display = "none";
                }
            });
        },function () {
            $("#fs_l #popMenu_box .popMenu").hide();
            this.style.backgroundColor = "white";
        });
        $("#fs_l #popMenu_box .popMenu").hover(function () {
            $(this).show();
            console.log(this.dataset.index);
            let thisIndex = this.dataset.index;
            $("#fs_l .itemBox .item").each(function (index, item) {
                if(index == thisIndex){
                    item.style.backgroundColor = "#d9d9d9";
                }else{
                    item.style.backgroundColor = "white";
                }
            })
        },function () {
            $(this).hide();
            $("#fs_l .itemBox .item").css("backgroundColor","white");
        });
    }
    $(document).on("scroll",function (e) {
        if ($(window).scrollTop() > 280){
            $("#fs_l #popMenu_box").addClass("fixed");
        }else{
            $("#fs_l #popMenu_box").removeClass("fixed");
        }
    });
    function layerSlider1(data) {
        for (let i = 0; i < data.length; i++) {
            if (i == 0){
                $("#fs_m #myCarousel1 .carousel-indicators").append(`<li data-index=${i} data-target="#myCarousel1" data-slide-to=${i} class="active"></li>`);
                $("#fs_m #myCarousel1 .carousel-inner").append(
                    `
                    <div class="item active">
                            <a href=${"http:" + data[i][0].href}><img src=${"http:" + data[i][0].src} alt=""></a>
                        </div>
                `);
            }else{
                $("#fs_m #myCarousel1 .carousel-indicators").append(`<li data-index=${i} data-target="#myCarousel1" data-slide-to=${i}></li>`);
                $("#fs_m #myCarousel1 .carousel-inner").append(
                    `
                    <div class="item">
                            <a href=${"http:" + data[i][0].href}><img src=${"http:" + data[i][0].src} alt=""></a>
                        </div>
                `);
            }
        }
        let carousel1 = $('.carousel').eq(0).carousel('cycle');
        carousel1.TRANSITION_DURATION = 0;
        $("#fs_m #myCarousel1 .carousel-control").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (this.classList.contains("left")){
                $('#fs_m #myCarousel1').carousel('prev');
            }else{
                $('#fs_m #myCarousel1').carousel('next');
            }
        });
        $("#fs_m #myCarousel1 .carousel-indicators li").hover(function () {
            let thisIndex = this.dataset.index;
            $("#fs_m #myCarousel1 .carousel-indicators li").each(function (index,item) {
                if (index == thisIndex){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
            $("#fs_m #myCarousel1 .carousel-inner .item").each(function (index, item) {
                if (index == thisIndex){
                    item.classList.add("active");
                }else{
                    item.classList.remove("active");
                }
            });
        });
    }
    function layerSlider2(data) {
        for (let i = 0; i < data.length; i+=3) {
            let htmlStr1 = "";
            let htmlStr2 = "";
            if (i == 0){
                htmlStr1 = `<div class="item active">`;
            }else{
                htmlStr1 = `<div class="item">`;
            }
            let htmlStr3 = "</div>";
            for (let j = i; j < i + 3; j++) {
                htmlStr2 +=
                    `
                        <div class="subItem">
                            <a href=${"http:" + data[j].href}>
                                <img src=${"http:" + data[j].src} alt="">
                            </a>
                        </div>
                    `;
            }
            let htmlStr = htmlStr1 + htmlStr2 + htmlStr3;
            $("#fs_m #myCarousel2 .carousel-inner").append(htmlStr);
        }
        let carousel2 = $('.carousel').eq(1).carousel('cycle');
        carousel2.TRANSITION_DURATION = 0;
    }
    function layerNews(data) {
        for (let i = 0; i < data.length; i++) {
            $("#fs_r #news_box .news_list li p").eq(i).text(data[i].title);
        }
    }
    serviceBoxMouseAction();
    function serviceBoxMouseAction(){
        $("#fs_r #service_box .service_entry .service_list .service_item.service_frame").mouseenter(function () {
            let hoverItem = this;
            this.children[0].children[1].style.color = "#e1251b";
            $(this.children[0].children[2]).css("borderColor","#e1251b");
            $("#fs_r #service_box .service_entry .service_list .service_item.service_frame").each(function (index,item) {
                if (item == hoverItem){
                    item.classList.add("service_frame_on");
                }else{
                    item.classList.remove("service_frame_on");
                }
            });
            changeActiveItem();
            $("#fs_r #service_box .service_entry .service_list .service_item .img .service_corner").animate({
                top: 30,
                width:5,
                height:5,
                borderRadius:"50%"
            },50,function () {
                $("#fs_r #service_box .service_entry .service_list .service_item .img .service_corner").text("");
            });
            $("#fs_r #service_box .service_pop").animate({
                top:29
            },200);
            if (!this.classList.contains("service_frame2")){
                $("#fs_r #service_box .service_entry .service_list .service_item.service_frame .service_text").each(function (index,item) {
                    if (index < 3){
                        item.classList.add("service_title_item");
                        $(item.parentElement.parentElement).animate({
                            top:-32
                        },200);
                    }
                });
            }else{
                $("#fs_r #service_box .service_entry .service_list .service_item.service_frame .service_text").each(function (index,item) {
                    if (index > 0 && index < 3){
                        item.classList.add("service_title_item");
                        $(item.parentElement.parentElement).animate({
                            top:-32
                        },200);
                    }else if (index == 3){
                        item.classList.add("service_title_item");
                        $(item.parentElement.parentElement).animate({
                            top:-88
                        },200);
                    }
                });
            }
        });
    }
    function changeActiveItem() {
        let onIndex = 0;
        $("#fs_r #service_box .service_entry .service_list .service_item.service_frame").each(function (index,item) {
            if(item.classList.contains("service_frame_on")){
                onIndex = index;
            }
        });
        $("#fs_r #service_box .service_entry .service_list .service_item.service_frame .service_text.service_title_item").each(function (index, item) {
            if (item.parentElement.parentElement.dataset.index == onIndex){
                item.style.color = "#e1251b";
                $(item.nextElementSibling).css("borderColor","#e1251b");
            }else{
                item.style.color = "#333333";
                $(item.nextElementSibling).css("borderColor","transparent");
            }
        })
        $("#fs_r #service_box .service_pop .service_pop_item").each(function (index, item) {
            if (index == onIndex){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }
        });
    }
    document.addEventListener("click",function (e) {
        closeServicePopMenu();
    });
    $("#fs_r #service_box .service_pop").click(function (e) {
        let closeBtn = document.querySelector("#fs_r #service_box .service_pop .close_icon");
        if (e.target == closeBtn){
            closeServicePopMenu();
        }
        e.stopPropagation();
    });
    function closeServicePopMenu() {
        $("#fs_r #service_box .service_entry .service_list .service_item.service_frame .service_text").each(function (index,item) {
            item.style.color = "#333333";
            $(item.nextElementSibling).css("borderColor","transparent");
            $(item.parentElement.parentElement).animate({
                top:0
            },200);
        });
        $("#fs_r #service_box .service_entry .service_list .service_item .img .service_corner").text("省");
        $("#fs_r #service_box .service_entry .service_list .service_item .img .service_corner").animate({
            top: 2,
            width: 14,
            height: 14,
            borderRadius:0
        },100);
        $("#fs_r #service_box .service_pop").animate({
            top:228
        },200);
    }
})(window,undefined,jQuery)