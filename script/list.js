$(function () {

    initPopWin();

    $("#list").css("height", getScreenHeight() - 100 + "px");

    new iScroll('list', {
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

    $('.users').bind('swipeone', function (e, obj) {
        var direction = obj.description.split(":")[2];
        if (direction == "left") {
            $(e.target).stop(true, false).animate({"left": -128}, 300, function () {

            });
        } else if (direction == "right") {
            $(e.target).stop(true, false).animate({"left": 0}, 300, function () {

            });
        }

    });

    $(".users").bind("tapone", function () {
        RedirectTo("userinfo.html");
    });

    $(".btn_edit").bind("click", function () {
        var data_id = $(this).attr("data_id");
        RedirectTo("usercreat.html?id=" + data_id);
    });

    $(".btn_del").bind("click", function () {

        var ele = $(this);

        showComfirm("提示", "确认要删除八字吗？", "确定", function () {
            delOne(ele);
        });

    });

    $(".add").bind("click", function () {
        doJump();
    });
});

function delOne(ele) {
    var data_id = ele.attr("data_id");
    //if (!data_id) return;

    //var param = "?id=" + data_id + "&jsonp=1&acessToken=hhhyyy";
    //
    //console.log(param);
    //
    //$.ajax({
    //        dataType: 'jsonp',
    //        url: getInterfaceUrl() + param,
    //        success: function (data) {
    //              MsgBox("删除成功！", 1);
    //              removeFromParent(ele);
    //        }
    //    }
    //);

    removeFromParent(ele);

}

function removeFromParent(ele){
    var target = ele.parent().first();

    target.stop(true, false).animate({"opacity": 0}, 500, function () {
        target.stop(true, false).animate({"height": 0}, 500, function () {
            target.remove();
        });
    });
}


function doJump() {
    RedirectTo("usercreat.html", "btnOk");
}