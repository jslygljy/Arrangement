$(function () {

    //$("#listScroll1").css("height", getScreenHeight() - 250 + "px");
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

    $(".more").bind("click", function () {
        RedirectTo("comment.html");
    });

});