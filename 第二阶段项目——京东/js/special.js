(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_tab/get?source=pc-home&callback=?",function (res) {
        layerSpecialOfferNav(res.data);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_data/get?source=pc-home&id=2&callback=?",function (res) {
        layerSpecialList(res.data,0);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_data/get?source=pc-home&id=32&callback=?",function (res) {
        layerSpecialList(res.data,1);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_data/get?source=pc-home&id=35&callback=?",function (res) {
        layerSpecialList(res.data,2);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_data/get?source=pc-home&id=34&callback=?",function (res) {
        layerSpecialList(res.data,3);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/daily_speci_data/get?source=pc-home&id=6&callback=?",function (res) {
        layerSpecialList(res.data,4);
    });
    $.getJSON("https://floor.jd.com/recommend-v20/red_new/get?source=pc-home&pin=&callback=?",function (res) {
        layerLightningBuy(res.data);
    });
    function layerSpecialOfferNav(data) {
        for (let i = 0; i < data.length; i++) {
            if (i == 0){
                $("#special .item .item_title_box .item_nav").append(`<span data-index=${i} class="nav_item active">${data[i].tabText}</span>`);
            }else{
                $("#special .item .item_title_box .item_nav").append(`<span data-index=${i} class="nav_item">${data[i].tabText}</span>`);
            }
        }
    }
    function layerSpecialList(data,index) {
        // console.log($(".special_list .special_item .special_item_lowestFirst"));
        for (let i = 0,j = index * data.length; i < data.length; i++,j++) {
            if (data[i].lowestPriceDaysInfo){
                $(".special_list .special_item .special_item_lowestFirst").eq(j).text(data[i].lowestPriceDaysInfo);
            }else{
                $(".special_list .special_item .special_item_lowestFirst").eq(j).css("visibility","hidden");
            }
            $(".special_list .special_item .special_item_img img").eq(j).attr("src",data[i].imageurl);
            $(".special_list .special_item .special_item_info .special_item_name").eq(j).text(data[i].wname);
            $(".special_list .special_item .special_item_info .special_item_price .price").eq(j).text(data[i].miaoShaPrice);
            if (data[i].alreadySoldInfoPcNum){
                $(".special_list .special_item .special_item_info .special_item_soldMsg .special_item_soldNum").eq(j).text(data[i].alreadySoldInfoPcNum);
            }else{
                $(".special_list .special_item .special_item_info .special_item_soldMsg").eq(j).css("visibility","hidden");
            }
        }
    }
    layerAllSpecialList();
    function layerAllSpecialList() {
        $("#special #special_offer .special_list").each(function (index, item) {
            if (index == 0){
                item.style.display = "block";
            }else{
                item.style.display = "none";
            }
        });
        changeSpecialList();
    }
    function changeSpecialList() {
        $("#special .item .item_title_box .item_nav").mouseover(function (e) {
            if (e.target.classList.contains("nav_item")){
                let thisIndex = e.target.dataset.index;
                $("#special .item .item_title_box .item_nav span").each(function (index,item) {
                    if (index == thisIndex){
                        item.classList.add("active");
                    }else{
                        item.classList.remove("active");
                    }
                });
                $("#special #special_offer .special_list").each(function (index, item) {
                    if (index == thisIndex){
                        item.style.display = "block";
                    }else{
                        item.style.display = "none";
                    }
                });
            }
        })
    }
    function layerLightningBuy(data) {
        $("#special #lightning_buy .lightning_buy_container a").attr("src","http:" + data.bigBrandView[0].jumpUrl);
        $("#special #lightning_buy .lightning_buy_container .lightning_buy_container_l .core_logo").attr("src","http:" + data.bigBrandView[0].logoImg);
        $("#special #lightning_buy .lightning_buy_container .lightning_buy_container_l .core_name").text(data.bigBrandView[0].title);
        $("#special #lightning_buy .lightning_buy_container .lightning_buy_container_l .core_desc .core_desc_promo").text(data.bigBrandView[0].promotionInfo);
        let now = new Date();
        let endTime = new Date(data.bigBrandView[0].endTime);
        let day = endTime.getDate() - now.getDate() - 1;
        $("#special #lightning_buy .lightning_buy_container .lightning_buy_container_l .core_desc .core_desc_extra .extra_day").text(day);
        $("#special #lightning_buy .lightning_buy_container .lightning_buy_container_l .core_img").attr("src","http:" + data.bigBrandView[0].imgUrl);
        for (let i = 0; i < data.brandList.length; i++) {
            $("#special #lightning_buy .lightning_buy_container .otherGoods .other_item .other_logo img").eq(i).attr("src","http:" + data.brandList[i].logoImg);
            $("#special #lightning_buy .lightning_buy_container .otherGoods .other_item .other_name").eq(i).text(data.brandList[i].title);
        }
    }
})(window,undefined,jQuery)