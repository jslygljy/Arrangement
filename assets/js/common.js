function fillDate(tag) {

    var today = new Date();

    for (var i = 0; i < 30; i++) {

        var option = "";
        var v = DateAdd("d", i, today);
        var t = formatDate(DateAdd("d", i, today));

        switch (i) {
            case 0:
                t = "今天";
                break;
            case 1:
                t = "明天";
                break;
            case 2:
                t = "后天";
                break;
        }

        option = "<option value='" + v + "'>" + t + "</option>";

        tag.append(option);
    }
}

function formatDate(dStr) {

    if (!dStr) reutrn;

    var vs = dStr.split('-');

    return vs[1] + "月" + vs[2] + "日";
}

function formatDate_slash(dStr) {

    if (!dStr) reutrn;

    var vs = dStr.split('T')[0].split('-');

    return vs[1] + "/" + vs[2];
}

function TimeToInt(dStr) {

    if (!dStr) reutrn;
    var date = new Date();

    if (typeof(dStr) != "Date") {
        date = new Date(dStr);
    }

    return parseInt("" + date.getHours() + pad(date.getMinutes(), 2));
}

function getNearTime() {
    var date = MinutesAdd(30, new Date());
    var cu = TimeToInt(date);
    var cuHour = date.getHours();

    var A = parseInt(cuHour + "00");
    var B = parseInt(cuHour + "30");
    var C = parseInt((cuHour + 1) == 24 ? 0 : cuHour + 1 + "00");

//    console.log(cu);
//    console.log(A);
//    console.log(B);
//    console.log(C);

    var result = 1800;

    if (A <= cu && cu < B) {
        if (Math.abs(A - cu) > Math.abs(B - cu)) {
            result = B;
        } else {
            result = A;
        }
    } else if (B <= cu && cu < C) {
        if (Math.abs(B - cu) > Math.abs(C - cu)) {
            result = C;
        } else {
            result = B;
        }
    }

    return (result / 100).toFixed(2);
}

function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

function intToTime(it){
    var itStr = it + "";

    return itStr.replace("\.","\:");

}

function IsAfterToDay(date) {
    var isAfter = false;
    if (Date.parse(DateAdd("d", 0, date)) > Date.parse(DateAdd("d", 0, new Date()))) {
        isAfter = true;
    }

    return isAfter;

}

function checkTime(date){

    if(!IsAfterToDay(date)) {
        var time = getNearTime();
        $(".time").val(intToTime(time));
    }else{
        $(".time").val("18:00");
    }
}


function MsgBox(text, type) {

    var layer = $("#notify_layer");

    if (layer.length == 0) {
        layer = $("<div id=\"notify_layer\" class=\"notify_error_layer\"></div>");
        $("body").append(layer);
    }

    if (layer) {
        if (!type) {
            layer.attr("class", "notify_error_layer");
        } else {
            layer.attr("class", "notify_sucess_layer");
        }

        layer.css("top", jQuery(window).scrollTop());
        layer.css("display", "block");
        layer.html(text);
        layer.animate({opacity: '0.85'}, 350, "swing", function () {
            setTimeout("MsgBoxHide()", 2000);
        });
    }

}

function MsgBoxHide() {

    var layer = $("#notify_layer");

    if (layer) {

        layer.animate({opacity: '0.0'}, 350, "swing", function () {
            layer.css("display", "none");
            layer.html("");
        });
    }
}

function validateName(str, obj) {

    if (!obj) obj = $("<div></div>");

    if (str.trim() == "") {
        obj.css("border", "1px solid #ec876e");
        return false;
    } else {
        obj.css("border", "");
        return true;
    }
}

function validatePhone(mobile, obj) {

    if (!obj) obj = $("<div></div>");

    var isMobile = /^1(3[0-9]|5[0-35-9]|8[025-9])\d{8}$/;
    var isChinaMobile = /^1(34[0-8]|(3[5-9]|5[017-9]|8[278])\d)\d{7}$/;
    var isChinaUnicom = /^1(3[0-2]|5[256]|8[56])\d{8}$/;
    var isChinaTelecom = /^1((33|53|8[09])[0-9]|349)\d{7}$/;

    if (!isMobile.test(mobile) && !isChinaMobile.test(mobile) && !isChinaUnicom.test(mobile) && !isChinaTelecom.test(mobile)) {
        obj.css("border", "1px solid #ec876e");
        return false;
    } else {
        obj.css("border", "");
        return true;
    }
}