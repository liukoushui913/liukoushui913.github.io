(function (window,undefined,$) {
    let nowIndex = 0;
    let nextIndex = 1;
    let prevIndex = 3;
    $("#core .slider .item").each(function (index,item) {
        if (item.classList.contains("active")){
            item.style.left = "75px";
            item.style.top = "20px";
            item.children[1].style.display = "block";
            item.children[0].style.width = "130px";
            item.children[0].style.height = "130px";
        }else if (item.classList.contains("prev")){
            item.style.left = "-75px";
        }else if (item.classList.contains("next")){
            item.style.left = "225px";
        }else{
            item.style.left = "300px";
        }
    });
    $("#core .slider .arrow_right").click(function () {
        changeToRight();
    });
    $("#core .slider .arrow_left").click(function () {
        changeToLeft();
    });
    let interval = setInterval(changeToRight,3000);
    $("#core .slider").mouseenter(function () {
        clearInterval(interval);
    });
    $("#core .slider").mouseleave(function () {
        interval = setInterval(changeToRight,3000);
    });
    let rightFlag = false;
    function changeToRight() {
        if (!rightFlag){
            rightFlag = true;
            nowIndex++;
            nextIndex++;
            prevIndex++;
            if (nowIndex > 3){
                nowIndex = 0;
            }
            if (nextIndex > 3){
                nextIndex = 0;
            }
            if (prevIndex > 3){
                prevIndex = 0;
            }
            $("#core .slider .item").each(function (index, item) {
                if (index == nowIndex){
                    item.classList.remove("next");
                    item.classList.add("active");
                }else if (index == nextIndex){
                    item.classList.add("next");
                }else if (index == prevIndex){
                    item.classList.remove("active");
                    item.classList.add("prev");
                }else{
                    item.classList.remove("prev");
                }
                if (item.classList.contains("prev")){
                    $(item).animate({
                        top: "50"
                    },300,"linear").animate({
                        left: "-75"
                    },300);
                    $(item.children[0]).animate({
                        width: "100",
                        height: "100"
                    },600);
                    $(item.children[1]).fadeOut();
                }else if (item.classList.contains("active")){
                    $(item).animate({
                        top: "20"
                    },300,"linear").animate({
                        left: "75"
                    },300);
                    $(item.children[0]).animate({
                        width: "130",
                        height: "130"
                    },600);
                    $(item.children[1]).fadeIn();
                }else if (item.classList.contains("next")){
                    $(item).animate({
                        top: "50"
                    },300).animate({
                        left: "225"
                    },300);
                }else{
                    $(item).animate({
                        left: "-75"
                    },200,"linear",function () {
                        $(item).hide();
                    }).animate({
                        left: "300"
                    },200,function () {
                        $(item).show();
                    });
                }
            });
            setTimeout(function () {
                rightFlag = false;
            },600);
        }
    }
    let leftFlag = false;
    function changeToLeft() {
        if(!leftFlag){
            leftFlag = true;
            nowIndex--;
            nextIndex--;
            prevIndex--;
            if (nowIndex < 0){
                nowIndex = 3;
            }
            if (nextIndex < 0){
                nextIndex = 3;
            }
            if (prevIndex < 0){
                prevIndex = 3;
            }
            $("#core .slider .item").each(function (index, item) {
                if (index == nowIndex){
                    item.classList.remove("prev");
                    item.classList.add("active");
                }else if (index == nextIndex){
                    item.classList.remove("active");
                    item.classList.add("next");
                }else if (index == prevIndex){
                    item.classList.add("prev");
                }else{
                    item.classList.remove("next");
                }
                if (item.classList.contains("prev")){
                    $(item).hide(0,"linear",function () {
                        $(item).animate({
                            left:"-150"
                        },50,function () {
                            $(item).show();
                        }).animate({
                            left: "-75"
                        },600,"linear");
                    });
                }else if (item.classList.contains("active")){
                    $(item).animate({
                        top: "20"
                    },300,"linear").animate({
                        left: "75"
                    },300,"linear");
                    $(item.children[0]).animate({
                        width: "130",
                        height: "130"
                    });
                    $(item.children[1]).fadeIn();
                }else if (item.classList.contains("next")){
                    $(item).animate({
                        top: "50"
                    },300,"linear").animate({
                        left: "225"
                    },300);
                    $(item.children[0]).animate({
                        width: "100",
                        height: "100"
                    });
                    $(item.children[1]).fadeOut();
                }else{
                    $(item).animate({
                        left: "300"
                    },200,"linear");
                }
            });
            setTimeout(function () {
                leftFlag = false;
            },600);
        }
    }
    $.getJSON("https://floor.jd.com/recommend-v20/haodian/get?source=pc-home&pin=&uuid=16319373513692005246727&area=7_412_0_0&callback=?",function (res) {
        layerNiceShop(res.data);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/coupon/get?source=pc-home&pin=&uuid=16319373513692005246727&area=7_412_0_0&callback=?",function (res) {
        layerCoupons(res.data);
    });
    $("#core #joy .joy_list_box .joy_list").each(function (index, item) {
        if(index == 0){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    });
    $("#core #joy .joy_nav .joy_nav_item").hover(function () {
        let thisIndex = this.dataset.index;
        $("#core #joy .joy_nav .joy_nav_item").each(function (index, item) {
            if (index == thisIndex){
                item.classList.add("active");
            }else{
                item.classList.remove("active");
            }
        });
        $("#core #joy .joy_list_box .joy_list").each(function (index, item) {
            if(index == thisIndex){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }
        });
    });
    function layerNiceShop(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(i);
        }
        for (let i = 0; i < 2; i++) {
            let index = Math.floor(Math.random() * arr.length);
            arr.splice(index,1);
            $("#core #nice_shop .nice_shop_list .nice_shop_item .nice_shop_info .shop_name").eq(i).text(data[index].shopName);
            $("#core #nice_shop .nice_shop_list .nice_shop_item .nice_shop_info .shop_tag .tag1").eq(i).text("自营");
            $("#core #nice_shop .nice_shop_list .nice_shop_item .nice_shop_info .shop_tag .tag2").eq(i).text(data[index].groupName);
            let followCount = (data[index].followCount/10000).toFixed(1);
            $("#core #nice_shop .nice_shop_list .nice_shop_item .nice_shop_info .shop_social").eq(i).text(followCount + "万人关注");
            $("#core #nice_shop .nice_shop_list .nice_shop_item .nice_shop_img img").eq(i).attr("src","http:" + data[index].shopPicUrl);
        }
    }
    function layerCoupons(data) {
        for (let i = 0; i < data.length; i++) {
            $("#core #coupon .coupon_box .coupon_item .coupon_item_img img").eq(i).attr("src","http:" + data[i].imgUrl);
            $("#core #coupon .coupon_box .coupon_item .coupon_item_info .coupon_item_price .price").eq(i).text(data[i].discount);
            $("#core #coupon .coupon_box .coupon_item .coupon_item_info .coupon_item_limit").eq(i).text(data[i].quota);
            $("#core #coupon .coupon_box .coupon_item .coupon_item_info .coupon_item_desc").eq(i).text(data[i].title);
        }
    }
})(window,undefined,jQuery)