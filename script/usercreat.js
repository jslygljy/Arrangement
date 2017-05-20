$(function () {

    setTitle();

    $(".input").each(function () {
        $(this).val($(this).attr("ph"));
        $(this).css("color", "#ACA899");
    });

    $(".input").bind("focus", function () {
        if ($(this).val() == $(this).attr("ph")) {
            $(this).val('');
            $(this).css("color", "");
        }
    }).bind("blur", function () {
        if ($(this).val() == '') {
            $(this).val($(this).attr("ph"));
            $(this).css("color", "#ACA899");
        } else if ($(this).val() == $(this).attr("ph")) {
            $(this).css("color", "#ACA899");
        } else {
            $(this).css("color", "");
        }
    }).bind("change", function () {
        if ($(this).val() == $(this).attr("ph")) {
            $(this).css("color", "#ACA899");
        } else {
            $(this).css("color", "");
        }
    });

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
        width: getScreenWidth() / 2 - 20,
        hourText: '时',
        minuteText: '分',
        timeFormat: 'H时ii分',
        timeWheels: 'HHii',
        setText: '确定', //确认按钮名称
        cancelText: '取消',//取消按钮名籍我
        closeOnOverlay: true
    };

    $("#nickname").bind("focus", function () {
        $('#birthdate').scroller('destroy');
        $('#birthtime').scroller('destroy');
    });

    $("#nickname").bind("blur", function () {
        $('#birthdate').scroller('destroy').scroller($.extend(opt["date"], {}));
        $('#birthtime').scroller('destroy').scroller($.extend(opt["time"], {}));
    });

    $('#birthdate').scroller('destroy').scroller($.extend(opt["date"], {}));
    $('#birthtime').scroller('destroy').scroller($.extend(opt["time"], {}));

    $(".close").bind("click", function () {
        $('#birthtime').val('不知道');
    });


    $("#sex_lady").bind("click", function () {
        selectSexBar("ladyon");
    });
    $("#sex_mister").bind("click", function () {
        selectSexBar("misteron");
    });

    $(".ok").bind("click", function () {
        dopost();
    });
});

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

    if (nick == '' || nick == $("#nickname").attr("ph")) {
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

function dopost() {
    if (!checkFormValue()) return;

    RedirectTo("userinfo.html", "btnOk");
}