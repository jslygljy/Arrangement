$(function () {

    var list = [{
        'content': '<div class="content home"><img src="images/fm1.jpg" style="width: 241px;height:342px;"/><div>'
    },
        {
            'content': '<div class="content page1"><img src="images/fm2.jpg" style="width: 241px;height:342px;"/><div>'
        },
        {
            'content': '<div class="content page2"><img src="images/fm3.jpg" style="width: 241px;height:342px;"/><div>'
        }];
    var endIndex = 0;
    var islider = new iSlider({
        data: list,
        type: 'dom',
        dom: document.getElementById("iSlider"),
        duration: 1000,
        isLooping: false,
        isAutoPlay: true,
        onslidechange: function (index) {
            console.log("aa" + index);
            changeDot(index);

            $("img").css("margin-top", (getScreenHeight() - 342 - 86) / 2 + "px");
        },
        onslideend: function (index) {
            console.log(index);
            if (endIndex == 2 && index == 2) {
                RedirectTo("pages/userinfo.html");
            }
            endIndex = index;
        }
    });

    $(".yellow").bind("click", function () {
        RedirectTo("pages/userinfo.html");
    });

    $("img").css("margin-top", (getScreenHeight() - 342 - 86) / 2 + "px");

});

function changeDot(index) {
    $(".dotbox").find("span").removeClass("doton");
    $(".dotbox").children().eq(index).addClass("doton")
}