(function (window,undefined,$) {
    $.getJSON("https://floor.jd.com/recommend-v20/top_monetize/get?source=pc-home&callback=?&_=1640074881289", function (res) {
        if(res.data.top.image_url == undefined){
            $("#top_ad").attr("src","http:" + res.data.top.src);
            $("#top_ad_box").css("backgroundColor",res.data.top.bgColor);
        }else{
            $("#top_ad").attr("src","http:" + res.data.top.image_url);
            $("#top_ad_box").css("backgroundColor",res.data.top.color_ext);
        }
        if (res.data.treasure != undefined){
            layerTreasure(res.data.treasure);
        }else{
            $("#main_nav_box #treasure_box").css("display","none");
        }
    });
    var provences_xinxi = ["北京", "上海", "天津", "重庆", "河北", "山西", "河南", "辽宁", "吉林", "黑龙江", "内蒙古","江苏", "山东", "安徽",
        "浙江", "福建", "湖北", "湖南", "广东", "广西", "江西", "四川", "海南", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "港澳", "台湾", "钓鱼岛", "海外"];
    // $("#location_box .dropdown_box ul:nth-child(1)")
    for (let i = 0; i < provences_xinxi.length; i++) {
        if (provences_xinxi[i] == "河南"){
            $("#location_box .dropdown_box ul:nth-child(1)").append(`<li><a href=""><span class="active">${provences_xinxi[i]}</span></a></li>`)
        }else{
            $("#location_box .dropdown_box ul:nth-child(1)").append(`<li><a href=""><span>${provences_xinxi[i]}</span></a></li>`);
        }
    }
    $.getJSON("https://dc.3.cn/client/get?=&callback=?", function (res) {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i]["c"] == "0"){
                $("#top_nav .top_nav_item:nth-child(6) .dropdown_item .dropdown_box ul:nth-child(2)").append(`<li><a href=${data[i]["u"].startsWith("/") ? "http:" + data[i]["u"] : data[i]["u"]}>${data[i]["n"]}</a></li>`);
            }else{
                $("#top_nav .top_nav_item:nth-child(6) .dropdown_item .dropdown_box ul:nth-child(4)").append(`<li><a href=${data[i]["u"].startsWith("/") ? "http:" + data[i]["u"] : data[i]["u"]}>${data[i]["n"]}</a></li>`)
            }
        }
    });
    $.getJSON("https://dc.3.cn/navigation/get?=&callback=?", function (res) {
        let data = res.data;
        for (let i = 0; i < data.length; i++) {
            let htmlStr1 =
                `
                        <div class="item">
                            <p class="dropdown_subtitle">${data[i]["n"]}</p>
                            <ul>
                    `;
            let arr = data[i]["s"];
            let htmlStr2 = "";
            for (let j = 0; j < arr.length; j++) {
                htmlStr2 +=
                    `
                            <li><a href=${arr[j]["u"].startsWith("/") ? "http:" + arr[j]["u"] : arr[j]["u"]}>${arr[j]["n"]}</a></li>
                        `;
            }
            let htmlStr3 =
                `
                            </ul>
                        </div>
                    `;
            let htmlStr = htmlStr1 + htmlStr2 + htmlStr3;
            $("#top_nav .top_nav_item:nth-child(7) .dropdown_item .dropdown_box > div").append(htmlStr);
        }
    });
    $("#top_ad_box .close_icon").click(function () {
        $("#top_ad_box").hide();
    });
    $("#location_box .dropdown_box ul:nth-child(1) li a").click(function (e) {
        e.preventDefault();
        $("#location_box .dropdown_box ul:nth-child(1) li span").each(function (index, item) {
            item.classList.remove("active");
        });
        this.children[0].classList.add("active");
        $("#location_now").text(this.children[0].textContent);
        this.parentElement.parentElement.parentElement.style.display = "none";
    });
    $(".dropdown_item").hover(function () {
        this.children[2].style.display = "block";
    },function () {
        this.children[2].style.display = "none";
    });
    function layerTreasure(data) {
        if (data.src != undefined){
            $("#main_nav_box #treasure_box .treasure img").attr("src","http:" + data.src);
            $("#main_nav_box #treasure_box .treasure a").attr("href","http:" + data.href);
            $("#top_nav .top_nav_item:nth-child(8) .mobile_qrcode").css("display","none");
        }else{
            $("#top_nav .top_nav_item:nth-child(8) .mobile_qrcode").css("display","block");
            $("#main_nav_box #treasure_box .treasure img").css("display","none");
        }
    }
})(window,undefined,jQuery)