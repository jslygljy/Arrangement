$(function () {

    $(".itip").css("top", "295px").css("left", getScreenWidth() - 80 + "px");
    //$("#listScroll1").css("height", getScreenHeight() - 425 + "px");
    //scroller = new iScroll('listScroll1', {
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

    $(".intentnav1").bind("tapone", function () {
        RedirectTo("intent_result.html");
    });
    $(".intentnav2").bind("tapone", function () {
        RedirectTo("intent_result.html");
    });
    $(".intentnav3").bind("tapone", function () {
        RedirectTo("intent_result.html");
    });

    $(".toolbtn1").bind("tapone", function () {
        RedirectTo("fate.html");
    });

    $(".toolbtn2").bind("tapone", function () {
        RedirectTo("userinfo.html");
    });

});