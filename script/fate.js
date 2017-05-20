var isMine = true;
var placeholder;
var scroller;
var userid = "";

$(function () {

    userid = getRequest("userid");

    initPopWin();

    $(".round20").bind("click", function () {
        changeTabBar($(this));
        console.log($(".round20").index($(this)));
        var index = $(".round20").index($(this));
        $("div[rel='ws']").css("display", "none");
        $("#myyf" + index).css("display", "");

        if (index == 0) {
            isMine = true;
        } else {
            isMine = false;
        }

        $(".item").show();
        if (isMine) {
            checkList([$("div[t='m']").find(":first")]);
        } else {
            checkList([$("div[t='t1']").find(":first"), $("div[t='t2']").find(":first")]);
        }
    });

    //new iScroll('userCard', {
    //    vScrollbar: false,
    //    onScrollStart: function (that, e) {
    //
    //    },
    //    onScrollMove: function (that, e) {
    //
    //    },
    //    onResetMove: function (that) {
    //
    //    },
    //    onScrollEnd: function (that) {
    //
    //    }
    //});


    scroller = new iScroll('listScroll', {
        vScrollbar: false,
        onScrollStart: function (that, e) {

        },
        onScrollMove: function (that, e) {

        },
        onResetMove: function (that) {

        },
        onScrollEnd: function (that) {

        }
    });

    $(".add1").bind("click", handler);

    $("#btnOk").bind("click", function () {
        doPost();
    });

    getBzList();

    $(".toolbtn2").bind("tapone", function () {
        RedirectTo("userinfo.html");
    });

    $(".toolbtn3").bind("tapone", function () {
        RedirectTo("intent.html");
    });

    $("#listButton").bind("tapone", function () {
        $("#userCard").css("z-index", 800);
        $("#listButton").hide();
        $("#userCard").css("height", getScreenHeight() + "px");
    });

    $("#userButton").bind("tapone", function () {
        postUser();
    });


    //添加八字
    //setTitle();

    var opt = {};

    opt.date = {
        preset: 'date', //日期
        theme: 'android-ics light', //皮肤样式
        display: 'bottom', //显示方式
        mode: 'scroller', //日期选择模式
        width: getScreenWidth() / 3 - 20,
        dateFormat: 'yy-mm-dd', // 日期格式
        setText: ' 确定 ', //确认按钮名称
        cancelText: ' 取消 ',//取消按钮名籍我
        dateOrder: 'yymmdd', //面板中日期排列格式
        dayText: '日', monthText: '月', yearText: '年' //面板中年月日文字
    };

    opt.time = {
        preset: 'time',
        theme: 'android-ics light', //皮肤样式
        display: 'bottom', //显示方式
        mode: 'scroller', //日期选择模式
        width: getScreenWidth() / 2 - 40,
        hourText: '时',
        minuteText: '分',
        timeFormat: 'H时ii分',
        timeWheels: 'HHii',
        setText: '确定', //确认按钮名称
        cancelText: '取消',//取消按钮名籍我
        closeOnOverlay: true
    };

    $('#birthdate').scroller('destroy').scroller($.extend(opt["date"], {}));

    $('#birthtime').scroller('destroy').scroller($.extend(opt["time"], {}));

    $(".close").bind("click",function(){
        $('#birthtime').val('不知道');
    });

    $("#sex_lady").bind("click", function () {
        selectSexBar("ladyon");
    });
    $("#sex_mister").bind("click", function () {
        selectSexBar("misteron");
    });
});


function handler() {
    if ($(".item:visible").length > 0) {
        $(".toolbar").hide();
        $("#btnOk").hide();
        $(".add1").hide();
        $("#listButton").show();
        $("#listScroll").css("height", getScreenHeight() - 75+ "px");
        scroller.refresh();
        placeholder = $(this);
    } else {
        MsgBox("没有可选项！", 1);
    }
}

function changeTabBar(obj) {
    $(".round20").removeClass("navon").addClass("navoff");
    obj.removeClass("navoff").addClass("navon");
}

function getBzList() {

    var url = "http://121.41.54.154:8080/wugu/baziListAjax";

    $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function (data) {
                console.log(data);

                var id = $("#myBaziId").val();
                console.log(id);
                data = removeSelf(id, data);

                console.log(data);

                bindBz(data);

                scroller.refresh();
            }
        }
    );
}

function removeSelf(id, data) {
    if (!data) return;
    var target;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            target = i;
            break;
        }
    }

    if (target >= 0) {
        data = data.slice(0, target).concat(data.slice(target + 1, data.length));
    }

    return data;
}

function bindBz(data) {

    if (!data) return;

    $(".list").empty();

    var template = ['<div hf="{3}" class="item" data-item=\'{1}\'>',
        '<div class="users round4">',
        '<div class="info avatar_{0}">{2}</div>',
        '</div>',
        '</div>'].join('');

    for (var i = 0; i < data.length; i++) {

        var item = data[i];

        console.log(item);

        var item_html = $(template.format(item.sex == 0 ? 2 : 1, JSON.stringify(item), item.name, item.id));

        item_html.bind("tapone", function () {
            $(".toolbar").show();
            $("#btnOk").show();
            $(".add1").show();
            $("#listButton").hide();
            $("#listScroll").css("height", "0px");
            console.log($(this));
            var data = $(this).attr("data-item");
            console.log(data);
            data = JSON.parse(data);
            console.log(data);

            var html = ['<div v="mark" rel="{5}" class="avatar{0}" data-item=\'{4}\'></div>',
                '<div class="txt">尊称：{1}<br/>',
                '生日：{2}<br/>',
                '八字：{3}<br/>',
                '</div>'].join('');

            var bz = "{0}{1} {2}{3} {4}{5}".format(data.yearGan, data.yearZhi, data.monthGan, data.monthZhi, data.dayGan, data.dayZhi);

            html = $(html.format(data.sex == 0 ? 2 : 1, data.name, new Date(data.birthTime).Format("yyyy年MM月dd日 hh时"), bz, JSON.stringify(data), data.id));

            if (placeholder) {
                placeholder.parent().empty().append(html);
                html.unbind().bind("click", handler);
            }

            if (isMine) {
                checkList([$("div[t='m']").find(":first")]);
            } else {
                checkList([$("div[t='t1']").find(":first"), $("div[t='t2']").find(":first")]);
            }
        });

        $(".list").append(item_html);
    }
}

function checkList(ms) {
    var marks = $("div[v='mark']");
    if (ms) marks = ms;
    if (marks && marks.length > 0) {
        $(".item").show();
        for (var i = 0; i < marks.length; i++) {
            var node = marks[i];
            console.log(node);
            var id = $(node).attr("rel");
            console.log(id);
            $("div[hf='" + id + "']").hide();
        }
    }
}

function doPost() {

    var id1, id2;
    if (isMine) {
        var target = JSON.parse($("div[t='m']").find(":first").attr("data-item"));
        console.log(target1);
        id1 = userid;
        id2 = target.id;
    } else {
        var target1 = JSON.parse($("div[t='t1']").find(":first").attr("data-item"));
        var target2 = JSON.parse($("div[t='t2']").find(":first").attr("data-item"));
        console.log(target1);
        id1 = target1.id;
        id2 = target2.id;
    }

    var para = "?id1=" + id1 + "&id2=" + id2;

    RedirectTo("fate_detail.html" + para, "btnOk");
}

function setTitle() {
    var isEdit = getRequest("edit");
    if (isEdit) {
        $("#title_txt").attr("src", "../images/t2.png");
    } else {
        $("#title_txt").attr("src", "../images/t1.png");
    }

}
function selectSexBar(clazz) {
    console.log(clazz);
    if (!clazz) return;
    if (clazz == "ladyon") {
        if (!$("#sex_lady").hasClass("ladyon")) {
            $("#sex_lady").removeClass("lady").addClass("ladyon");
            $("#sex_mister").removeClass("misteron").addClass("mister");
        }
        $("#sex").val(1);
    } else {
        if (!$("#sex_mister").hasClass("misteron")) {
            $("#sex_mister").removeClass("mister").addClass("misteron");
            $("#sex_lady").removeClass("ladyon").addClass("lady");
        }

        $("#sex").val(0);
    }
}

function checkFormValue() {

    var nick = $("#nickname").val();
    var birthdate = $("#birthdate").val();
    var birthtime = $("#birthtime").val();
    var isCheck = $("#ysbh").is(':checked');

    if (nick == "") {
        MsgBox("请填写昵称！", 0);
        return false;
    }

    if (birthdate == "") {
        MsgBox("请选择出生日期！", 0);
        return false;
    }

    if (birthtime == "") {
        MsgBox("请选择出生时辰！", 0);
        return false;
    }
    console.log(isCheck);
    if (!isCheck) {
        MsgBox("请勾选热恋隐私保护！", 0);
        return false;
    }

    return true;
}

function postUser() {

    if (!checkFormValue()) return;

    var nick = $("#nickname").val();
    var sex = $("#sex").val();
    var birthdate = $("#birthdate").val();
    var birthtime = $("#birthtime").val();

    var url = "http://121.41.54.154:8080/wugu/baziAddAjax";
    url = url + "?nick=" + nick + "&sex=" + sex + "&birthDate=" + birthdate + "&birthtime=" + birthtime;
    $.ajax({
            dataType: 'jsonp',
            url: url,
            success: function (data) {
                $("#userCard").css("z-index", 200);
                $("#listButton").show();
                $("#userCard").css("height", "0px");

                getBzList();
            }
        }
    );
}
