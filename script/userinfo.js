$(function () {

    initPopWin();

    //$("#content").css("height", getScreenHeight() - 380 + "px");
    //
    //new iScroll('content', {
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

    $(".round20").bind("click", function () {
        changeTabBar($(this));
        console.log($(".round20").index($(this)));
        var index = $(".round20").index($(this));
        $("#scroller").html($("#content" + index).html());
    });

    $(".add").bind("click", function () {
        doJump();
    });

    //new add
    $("#goADD").bind("click", function () {
        RedirectTo("usercreat.html");
    });

    $("#notComplete").bind("click", function () {
        //showComfirm("提示", "您当前没有填写时辰，填写时辰将让您的缘分指数更加准确？", "去填写", function (id) {
        //
        //});
        showOverlay(null, function () {
            $(".open").hide();
            hideOverlay();
        });
        $(".open").css("left", (getScreenWidth() - 294) / 2 + "px");
        $(".open").show();
    });

    $(".toolbtn1").bind("tapone", function () {
        RedirectTo("fate.html");
    });

    $(".toolbtn3").bind("tapone", function () {
        RedirectTo("intent.html");
    });

});

function changeTabBar(obj) {
    $(".round20").removeClass("navon").addClass("navoff");
    obj.removeClass("navoff").addClass("navon");
}


function doJump() {
    RedirectTo("usercreat.html", "btnOk");
}