$(function () {


    $("#listScroll1").css("height", (getScreenHeight() - 80) + "px");
    scroller = new iScroll('listScroll1', {
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

    $(".itemfate").bind("tapone", function () {
        RedirectTo("fate_detail.html");
    });


    $(".ok").bind("click", function () {
        RedirectTo("fate.html", "btnOk");
    });

});