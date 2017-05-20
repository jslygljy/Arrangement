$(function () {

    //$("#listScroll1").css("height", (getScreenHeight() - 400) / 2 + "px");
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
    //
    //$("#listScroll2").css("height", (getScreenHeight() - 400) / 2 + "px");
    //scroller = new iScroll('listScroll2', {
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

    $(".ok").bind("click", function () {
        RedirectTo("fate.html","btnOk");
    });

    $(".more").bind("click", function () {
        RedirectTo("fate_list.html","btnMore");
    });

});
