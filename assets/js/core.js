/**
 * 公共函数和变量
 * @type {string}
 */
var INTERFACE_URL = "http://xxx.xxx.com/service.ashx";
var TEST_INTERFACE_URL = "http://yyy.yyy.com/service.ashx";


function getInterfaceUrl() {

    var debug = true;//getLocalCache("DEBUG");

    if (debug) {
        return TEST_INTERFACE_URL;
    } else {
        return INTERFACE_URL;
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

String.prototype.EndWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}

String.prototype.StartWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}


function DateAdd(strInterval, NumDay, dtDate) {
    var dtTmp = dtDate;

    //兼容部分低版本浏览器
    if (typeof(dtDate) == "string") {
        var d = dtDate.split(' ')[0];
        d = d + " 12:00:00";
        dtTmp = new Date(Date.parse(d.replace(/-/g, "/")));
    }

    if (isNaN(dtTmp)) dtTmp = new Date();

    switch (strInterval) {
        case "d":
            dtTmp = new Date(Date.parse(dtTmp) + (86400000 * parseInt(NumDay)));
            break;
    }

    var mStr = new String(dtTmp.getMonth() + 1);
    var dStr = new String(dtTmp.getDate());
    if (mStr.length == 1) {
        mStr = "0" + mStr;
    }
    if (dStr.length == 1) {
        dStr = "0" + dStr;
    }
    return dtTmp.getFullYear() + "-" + mStr + "-" + dStr;
}

function MinutesAdd(NumDay, dtDate) {
    var dtTmp = dtDate;
    if (!dtTmp || isNaN(dtTmp)) dtTmp = new Date();
    dtTmp = new Date(Date.parse(dtTmp) + (60000 * parseInt(NumDay)));
    return dtTmp;
}


function getRequest(key) {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest[key];

}

function getRequestWithString(url, key) {
    var theRequest = new Object();
    var str = url.split("?")[1];
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
    return theRequest[key];
}

function getLocalCache(key) {
    var result;
    var storage = window.localStorage;
    if (storage) {
        result = storage.getItem(key);
//				console.log('get parameters ' + key + ' from storage:' + result);
    }

    return result;
}

function setLocalCache(key, value) {
    var storage = window.localStorage;
    if (storage) {
//        console.log('save parameters ' + key + ' to storage:' + value);
        storage.removeItem(key);
        storage.setItem(key, value);
    }
}

function removeLocalCache(key) {
    var storage = window.localStorage;
    if (storage) {
//        console.log('save parameters ' + key + ' to storage:' + value);
        storage.removeItem(key);
    }
}

function getSessionCache(key) {
    var result;
    var storage = window.sessionStorage;
    if (storage) {
        result = storage.getItem(key);
//				console.log('get parameters ' + key + ' from storage:' + result);
    }

    return result;
}

function setSessionCache(key, value) {
    var storage = window.sessionStorage;
    if (storage) {
        console.log('save parameters ' + key + ' to storage:' + value);
        storage.removeItem(key);
        storage.setItem(key, value);
    }
}

function getScreenWidth() {
    return window.innerWidth;
}

function getScreenHeight() {
    return window.innerHeight;
}

function parseUrl(url, useLocal) {

    var baseUrl = (useLocal ? Photo_Local_Url : Photo_Url);

    if (url) {
        if (url.indexOf("http") != 0)
            return baseUrl + url.toLowerCase();
        else
            return url;
    } else
        return "";
}

function combUrl(url, size) {

    var image = parseUrl(url, true);

    image = image.replace(".150x150", "");
    var urla = image.split(".");
    var lastStr = urla[urla.length - 1];
    lastStr = size + "." + lastStr;
    urla[urla.length - 1] = lastStr;
    image = urla.join(".");

    return image;
}

function getListPrice(price) {

    console.log(price);

    var res = "";
    if (price == -3) {
        res = "";
    } else if (price == -2) {
        res = "时价";
    } else if (price == 0) {
        res = "";
    } else
        res = "￥" + price;
    return res;
}

function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

function getScrollHeight() {
    var offsetHeight = 0;
    if (document.documentElement && document.documentElement.offsetHeight) {
        offsetHeight = document.documentElement.offsetHeight;
    }
    else if (document.body) {
        offsetHeight = document.body.offsetHeight;
    }
    return Math.max(getScreenHeight(), offsetHeight);
}

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    return str;
}

function RedirectTo(link, tagid, target) {
    //模拟a链接点击事件,为了兼容微信返回按钮事件
    //var evt = document.createEvent("MouseEvents");
    //evt.initEvent("click", true, true);
    //if (!tagid) tagid = "jumpTag";
    //aTag = document.getElementById(tagid);
    //
    //target = target ? target : "_self";
    //
    //if (!aTag) {
    //    aTag = document.createElement("a");
    //    aTag.setAttribute("id", "jumpTag");
    //    aTag.setAttribute("style", "display:none");
    //    aTag.setAttribute("target", target);
    //    document.getElementsByTagName("body")[0].appendChild(aTag);
    //}
    //if (link) {
    //    console.log(link);
    //    aTag.setAttribute("href", link);
    //}
    //
    //aTag.dispatchEvent(evt);

    location.href = link;
}


function DrawImage(ImgD, w, h) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= w / h) {
            if (image.width > w) {
                ImgD.width = w;
                ImgD.height = w / image.width * image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt = image.width + "x" + image.height;
        }
        else {
            if (image.height > h) {
                ImgD.height = h;
                ImgD.width = h / image.height * image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
            ImgD.alt = image.width + "x" + image.height;
        }
    }
}

function detectWeixinApi(callback) {
    if (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') {
        setTimeout(function () {
            detectWeixinApi(callback);
        }, 200);
    } else {
        callback();
    }
}

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function HashTable() {
    var size = 0;
    var entry = new Object();

    this.add = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }

    this.getValue = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }

    this.remove = function (key) {
        if (this.containsKey(key) && ( delete entry[key] )) {
            size--;
        }
    }

    this.containsKey = function (key) {
        return (key in entry);
    }

    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }

    this.getValues = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }

    this.getKeys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }

    this.getSize = function () {
        return size;
    }

    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}
