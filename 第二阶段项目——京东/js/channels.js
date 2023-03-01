(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/market_bill/get?source=pc_home&except_item_id=9683&pin=&uuid=16319373513692005246727&area=7_412_0_0&callback=?",function (res) {
        layerChannelsItems(res.data);
    });
    function layerChannelsItems(data) {
        $("#channels .channels_list .channels_item1").each(function (index,item) {
            item.parentElement.href = "http:" + data[item.dataset.index].bigLink;
            item.children[0].src = "http:" + data[item.dataset.index].bigImg;
        });
        $("#channels .channels_list .channels_item2").each(function (index, item) {
            let str = "http://img12.360buyimg.com/img/s200x200_";
            let thisIndex = this.dataset.index;
            item.parentElement.href = "http:" + data[thisIndex].smallLink;
            item.children[0].children[0].textContent = data[thisIndex].name;
            item.children[0].children[1].textContent = data[thisIndex].desc;
            if (data[thisIndex].item != ""){
                item.children[1].children[0].children[0].src = str + data[thisIndex].item[0].img;
                item.children[1].children[1].children[0].src = str + data[thisIndex].item[1].img;
            }else{
                item.children[1].children[0].children[0].src = "http:" + data[thisIndex]["bakImg_1"];
                item.children[1].children[1].children[0].src = "http:" + data[thisIndex]["bakImg_2"];
            }
        });
    }
})(window,undefined,jQuery)