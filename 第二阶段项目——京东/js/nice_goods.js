(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/discover_goods/get?source=pc-home&pin=&callback=?",function (res) {
        layerNiceGoodsList(res.data);
    });
    function layerNiceGoodsList(data) {
        for (let i = 0; i < data.length; i++) {
            $("#nice_goods .nice_goods_list_box .nice_goods_list .nice_goods_item .goods_name").eq(i).text(data[i].recommendTheme);
            $("#nice_goods .nice_goods_list_box .nice_goods_list .nice_goods_item .goods_img img").eq(i).attr("src",data[i].goodsPic);
            if (i < 5){
                $("#nice_goods .nice_goods_list_box .nice_goods_list .nice_goods_item .goods_name").eq(i + 10).text(data[i].recommendTheme);
                $("#nice_goods .nice_goods_list_box .nice_goods_list .nice_goods_item .goods_img img").eq(i + 10).attr("src",data[i].goodsPic);
            }
        }
    }
    let interval = null;
    interval = setInterval(niceGoodsListMove,100);
    function niceGoodsListMove() {
        $("#nice_goods .nice_goods_list_box .nice_goods_list").animate({left:"-=5"},100,"linear",function () {
            if (parseInt($("#nice_goods .nice_goods_list_box .nice_goods_list").css("left")) <= -2000){
                $("#nice_goods .nice_goods_list_box .nice_goods_list").css("left","0");
            }
        });
        $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").animate({left:"+=2.175"},100,"linear",function () {
            if (parseInt($("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left")) >= 870){
                $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left","0");
            }
        })
    }
    $("#nice_goods .nice_goods_list_box").mouseenter(function () {
        clearInterval(interval);
        interval = null;
        $("#nice_goods .nice_goods_list_box .scroll_bar").show();
    });
    $("#nice_goods .nice_goods_list_box").mouseleave(function () {
        interval = setInterval(niceGoodsListMove,100);
        $("#nice_goods .nice_goods_list_box .scroll_bar").hide();
    });
    dragScrollPoint();
    function dragScrollPoint() {
        let scroll_point_leftNow = 0;
        $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").on("mousedown",function (e1) {
            let mousedownX =  e1.clientX;
            let leftNow = parseInt(getComputedStyle(this).left);
            $(document).on("mousemove",function (e2) {
                let moveDistance = e2.clientX - mousedownX;
                $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left",(moveDistance + leftNow) + "px");
                let leftNew = parseInt($("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left"));
                if(leftNew <= 0){
                    $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left","0");
                }else if(leftNew >= 870){
                    $("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left","870px");
                }
                scroll_point_leftNow = parseInt($("#nice_goods .nice_goods_list_box .scroll_bar .scroll_point").css("left"));
                $("#nice_goods .nice_goods_list_box .nice_goods_list").css("left",((-1)*scroll_point_leftNow*(2000/870)) + "px");
            });
        });
        $(document).on("mouseup",function () {
            $(document).off("mousemove");
        });
    }
})(window,undefined,jQuery)