$(function () {

    //$(".content").css("height", getScreenHeight() + "px");

    $("img").css("margin-top", (getScreenHeight() - 342 - 86) / 2 + "px");
    //$("img").css("left", (getScreenWidth() - 320) / 2 + "px");

    var cards = $("#cards").find(".card");

    console.log(cards.length);

    var domList = [];

    for (var i = 0; i < cards.length; i++) {
        domList.push({
            'height': getScreenHeight() + 'px',
            'width': getScreenWidth() + 'px',
            'content': $(cards[i]).html()
        });
    }

    //var domList = [{
    //    'height' : '100%',
    //    'width' : '100%',
    //    'content' : '<div><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
    //},{
    //    'height' : '100%',
    //    'width' : '100%',
    //    'content' : '<div><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
    //},{
    //    'height' : '100%',
    //    'width' : '100%',
    //    'content' : '<div><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
    //}];

    var islider4 = new iSlider({
        data: domList,
        dom: document.getElementById("dom-effect"),
        type: 'dom',
        animateType: 'default',
        isAutoplay: false,
        isLooping: false,
        onslidechange: function (index) {
            console.log(index);
            changeDot(index);
        }
    });
    islider4.bindMouse();


    $(".yellow").bind("click", function () {
        RedirectTo("pages/userinfo.html");
    });
});

function changeDot(index) {
    $(".dotbox").find("span").removeClass("doton");
    $(".dotbox").children().eq(index).addClass("doton")
}