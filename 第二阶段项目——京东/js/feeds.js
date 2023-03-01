(function (window,undefined,$) {
    let pageArr = [1,1,1,1,1,1];
    let firstLoadFlagArr = [true,true,true,true,true,true];
    let pagesize = 27;
    let pagesize2 = 30;
    let isLoading = false;
    let indexNow = 0;
    let htmlArr = ["","","","","",""];
    firstLoad();
    function firstLoad() {
        loadMore1();
        loadMore2(1,1);
        loadMore2(2,3);
        loadMore2(3,4);
        loadMore2(4,2);
        loadMore2(5,5);
    }
    function loadMore1() {
        let data1 = null;
        let data2 = null;
        $.getJSON("https://floor.jd.com/user-v20/feed/get?page=" + pageArr[0] + "&pagesize=" + pagesize + "&area=7_412_0_0&source=pc-home&callback=?",function (res) {
            data1 = res.data;
            $.getJSON("https://floor.jd.com/recommend-v20/feed_other/get?source=pc-home&source=pc-home&pin=&uuid=16400756132851389749377&jda=76161171.16400756132851389749377.1640075613.1640325043.1640392894.23&num=1&callback=?",function (res) {
                data2 = res.data;
                layerFeeds(data1,data2);
            });
        });
    }
    function loadMore2(typeIndex,index) {
        $.getJSON("https://floor.jd.com/recommend-v20/feed_tab/get?type=" + typeIndex + "&page=" + pageArr[index] + "&limit=" + pagesize2 + "&pin=&uuid=16379953234491968111480&source=pc-home&callback=?",function (res) {
            layerFeeds2(res.data,index);
        });
    }
    $(".feeds_nav .feeds_nav_item").click(function () {
        let thisIndex = this.dataset.index;
        if (thisIndex != indexNow){
            $(".feeds_nav .feeds_nav_item").each(function (index, item) {
                if(item.dataset.index == thisIndex){
                    item.classList.add("active");
                    indexNow = item.dataset.index;
                    if (htmlArr[indexNow] != ""){
                        $("#feeds .item_box").html(htmlArr[indexNow]);
                    }else{
                        $("#feeds .item_box").html("");
                        loadMore2(item.dataset.type,item.dataset.index);
                    }
                }else{
                    item.classList.remove("active");
                }
            });
        }
    });
    $(document).on("scroll",function () {
        let scrollTop = $(window).scrollTop();
        let documentHeight = $(document).innerHeight();
        let windowHeight = $(window).innerHeight();
        if(scrollTop >= 3333){
            let feeds_nav = $("#feeds .feeds_nav_box .feeds_nav").detach();
            $("#feeds .feeds_nav_fixed .center").append(feeds_nav);
            $("#feeds .feeds_nav_fixed").slideDown(200);
        }else{
            $("#feeds .feeds_nav_fixed").hide();
            let feeds_nav = $("#feeds .feeds_nav_fixed .center .feeds_nav").detach();
            $("#feeds .feeds_nav_box").append(feeds_nav);
        }
        let activeIndex = 0;
        let activeType = 0;
        if(scrollTop >= documentHeight - windowHeight * 2){
            $(".feeds_nav .feeds_nav_item").each(function (index, item) {
                if (item.classList.contains("active")){
                    activeIndex = index;
                    activeType = item.dataset.type;
                    return;
                }
            });
            if (activeIndex == 0){
                if (!isLoading){
                    isLoading = true;
                    pageArr[0]++;
                    loadMore1();
                }
            }else{
                if (!isLoading){
                    isLoading = true;
                    pageArr[activeIndex]++;
                    loadMore2(activeType,activeIndex);
                }
            }
        }
    });
    function layerFeeds(data1,data2) {
        let index = 0;
        let htmlStr1 = "";
        for (let i = 0,j = 0; i < data1.length; i++) {
            if (index == 4 || index == 10 || index == 22){
                switch (data2[j].type) {
                    case("JOY"):{
                        htmlStr1 +=
                            `
                                <div class="item joy_item joy_item1">
                                    <div class="joy_item_img">
                                        <img src=${"http://img30.360buyimg.com/jdcms/s300x300_" + data2[j].data.prodList[1]} alt="">
                                    </div>
                                    <div class="joy_item_info">
                                        <div class="joy_item_tag_box">
                                            <span class="joy_item_tag joy_item_tag1">80款商品</span>
                                        </div>
                                        <p class="joy_item_title">${data2[j].data.title}</p>
                                        <p class="joy_item_desc">${data2[j].data.subTitle}</p>
                                        <div class="joy_item_btn">JOY寻宝</div>
                                    </div>
                                </div>
                            `;
                        break;
                    }
                    case("SHOP"):{
                        htmlStr1 +=
                            `
                                <div class="item joy_item joy_item2">
                                    <div class="joy_item_img">
                                        <img src=${data2[j].data.shopPicUrl} alt="">
                                    </div>
                                    <div class="joy_item_info">
                                        <div class="joy_item_tag_box">
                                            <span class="joy_item_tag joy_item_tag1">自营</span><span class="joy_item_tag joy_item_tag2">${(data2[j].data.followCount/10000).toFixed(1) + "万人关注"}</span>
                                        </div>
                                        <p class="joy_item_title">${data2[j].data.shopName}</p>
                                        <div class="joy_item_btn">逛好店</div>
                                    </div>
                                </div>
                            `;
                        break;
                    }
                    case("HOTWORDS"):{
                        htmlStr1 +=
                            `
                                <div class="item hotwords_item">
                                    <div class="hotwords_title">精选热点</div>
                                    <ul class="hotwords_list">
                            `;
                        let list = data2[j].data.list;
                        for (let k = 0; k < list.length; k++) {
                            htmlStr1 += `<li class="hotwords">${list[k].text}</li>`;
                        }
                        htmlStr1 +=
                            `
                                    </ul>
                                </div>
                            `;
                        break;
                    }
                }
                j++;
                i--;
            }else{
                htmlStr1 +=
                `
                    <div class="item goods_item">
                        <div class="goods_item_img">
                            <img src=${"http://img30.360buyimg.com/jdcms/s300x300_" + data1[i].img} alt="">
                        </div>
                        <div class="goods_item_info">
                            <p class="goods_item_name">${data1[i].t}</p>
                            <div class="goods_item_price">
                                <span class="dollar_txt left">￥</span>
                                <span class="price left">${data1[i].jp.split(".")[0] + "."}</span>
                                <span class="price_decimal left">${data1[i].jp.split(".")[1]}</span>
                            </div>
                        </div>
                        <div class="more_item"><span><i class="more_icon"></i>找相似</span></div>
                    </div>
                `;
            }
            if ((index + 1) % 5 != 0){
                htmlStr1 += `<div class="blank"></div>`;
            }
            index++;
        }
        htmlArr[0] += htmlStr1;
        let oldHtml = $("#feeds .item_box").html();
        $("#feeds .item_box").html(oldHtml + htmlStr1);
        isLoading = false;
        firstLoadFlagArr[0] = false;
    }
    function layerFeeds2(data,index) {
        let htmlStr2 = "";
        for (let i = 0; i < data.length; i++) {
            htmlStr2 +=
                `
                    <div class="item goods_item">
                        <div class="goods_item_img">
                            <img src=${"http:" + data[i].productBaseInfo.image} alt="">
                        </div>
                        <div class="goods_item_info">
                            <p class="goods_item_name">${data[i].productBaseInfo.name}</p>
                            <div class="goods_item_price">
                                <span class="dollar_txt left">￥</span>
                                <span class="price left">${data[i].productBaseInfo.jdPrice.split(".")[0] + "."}</span>
                                <span class="price_decimal left">${data[i].productBaseInfo.jdPrice.split(".")[1] == undefined ? "00" : data[i].productBaseInfo.jdPrice.split(".")[1].padEnd(2,"0")}</span>
                            </div>
                        </div>
                    </div>
                `;
            if ((i + 1) % 5 != 0){
                htmlStr2 += `<div class="blank"></div>`;
            }
        }
        htmlArr[index] += htmlStr2;
        if (!firstLoadFlagArr[index]){
            let oldHtml = $("#feeds .item_box").html();
            $("#feeds .item_box").html(oldHtml + htmlStr2);
        }
        firstLoadFlagArr[index] = false;
    }
})(window,undefined,jQuery)