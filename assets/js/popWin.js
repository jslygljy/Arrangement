var overlay = $("<div id=\"overlay\" style='display: none'></div>");
var win = $("<div id=\"popWindow\" style='z-index: 100;'>" +
"<div class=\"openhead\" id=\"win_head\">" +
"<div></div>" +
"<span id=\"win_title\"></span>" +
"</div>" +
"<div class=\"openitem\" id=\"win_list\">" +
"</div>" +
"</div>");

function initPopWin() {
    if ($("#overlay").length == 0) {
        $("body").append(overlay);
    }

    if ($("#popWindow").length == 0) {
        $("body").append(win);
    }

    win_default_width = getScreenWidth() - 50;
    win_default_height = getScreenHeight() - 50;

    $("#popWindow").css("left", (getScreenWidth() - win_default_width) / 2 + "px");
    $("#popWindow").css("top", (getScreenHeight() - win_default_height) / 2 + "px");
    $("#popWindow").css("width", win_default_width + "px");
    $("#popWindow").css("height", win_default_height + "px");

    $("#win_head").bind("click", function (evt) {
        hideWindow();
    });
}

function showMaskLayer() {
    if ($("#overlay").length == 0) {
        $("body").append(overlay);
    }

    if ($("#progress").length == 0) {
        var progress = $("<div id='progress'><img src='../../images/loading.gif'></div>");
        progress.css("display", "block");
        progress.css("left", (getScreenWidth() - 100) / 2 + "px");
        progress.css("top", (getScreenHeight() - 100) / 2 + "px");
        $("body").append(progress);
    } else {
        $("#progress").css("display", "block");
    }

    showOverlay();
}

function showComfirm(title, content, OK_title, onOk) {
    var confirmBtn = $("<a id=\"comfirm\" href=\"#\" class=\"btnleft\" style='float: right;margin:5px'>" + OK_title + "</a>");
    var cancelBtn = $("<a id=\"cancel\" href=\"#\" style='float:right;margin:5px' class=\"btnright\">取消</a>");
    var contentNode = $("<div><div style=\"padding: 20px;font-size:12px\">" + content + "</div><div style=\"padding:20px;float:right\;width:160px\" id=\"btns\"></div></div>");
    contentNode.find("#btns").append(cancelBtn);
    contentNode.find("#btns").append(confirmBtn);
    cancelBtn.bind("click", function () {
        hideWindow();
    });
    confirmBtn.bind("click", function () {
        onOk("comfirm");
        hideWindow();
    });
    showWindow("提示", contentNode, 200);
}

function showWindowFullScreen(title, content, callback) {
    $("#win_title").text(title);
    $("#popWindow").css("top", getScrollTop() + "px");
    $("#popWindow").css("left", "0px");
    $("#popWindow").css("height", getScreenHeight() + "px");
    $("#popWindow").css("width", getScreenWidth() + "px");
    $("#win_list").css("height", (getScreenHeight() - 44) + "px");
    $("#popWindow").show();
    $("#win_list").empty();
    $("#win_list").append(content);
    $("#popWindow").fadeTo(150, 1.0, function () {
        showOverlay(callback);
    });
}

function showWindow(title, content, win_height, callback) {
    $("#win_title").text(title);
    $("#popWindow").css("top", +getScrollTop() + (getScreenHeight() - win_height) / 2 + "px");
    $("#popWindow").css("height", win_height + "px");
    $("#win_list").css("height", (win_height - 44) + "px");
    $("#popWindow").show();
    $("#win_list").empty();
    $("#win_list").append(content);
    $("#popWindow").fadeTo(150, 1.0, function () {
        showOverlay(callback);
    });
}

function hideWindow() {
    $("#win_list").empty();
    $("#popWindow").fadeOut(150, function () {
        $("#popWindow").css("opacity", "0.1");
        $("#popWindow").css("display", "none");
        hideOverlay();
    });
}

function showOverlay(callback,tapHandler) {
    $("#overlay").css("display", "block");
    $("#overlay").css("height", getScreenHeight() + getScrollHeight() + "px");
    // fadeTo第一个参数为速度，第二个为透明度
    // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    $("#overlay").fadeTo(200, 0.7, callback);
    $("#overlay").bind("click",tapHandler);
}

/* 隐藏覆盖层 */
function hideOverlay() {
    $("#overlay").fadeOut(200, function () {
        $("#overlay").css("opacity", "0.1");
        $("#overlay").css("display", "none");
    });

    if ($("#progress").length > 0) {
        $("#progress").css("display", "none");
    }
}