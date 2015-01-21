define("gallery/common/0.0.1/index-debug", [], function(require, exports, module) {
    (function() {
        /*console友情提示*/
        window && window.console && (console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "安全警告!"), 
        console.log("%c%s", "color: black; font-size: 18px;", "请勿在此控制台输入或粘贴你不明白的代码，以避免攻击者窃取你的信息给你造成不可挽回的损失！"), 
        console.log("%c%s", "color: green; font-size: 16px;", "喜欢看汽配铺的代码，还是发现了什么bug？不如和我们一起为汽配铺添砖加瓦吧！"), 
        console.info("http://jobs.qipeipu.com?from=position-cs"));
        !function() {
            var cookie, ua, match;
            ua = window.navigator.userAgent;
            match = /;\s*MSIE (\d+).*?;/.exec(ua);
            if (match && +match[1] < 9) {
                cookie = document.cookie.match(/(?:^|;)\s*ic=(\d)/);
                if (cookie && cookie[1]) {
                    return;
                }
                $("body").prepend([ "<div id='js-compatible' class='compatible-contianer'>", "<p class='cpt-ct'><i></i>您的浏览器版本过低。为保证最佳学习体验，<a href='/static/html/browser.html'>请点此更新高版本浏览器</a></p>", "<div class='cpt-handle'><a href='javascript:;' class='cpt-agin'>以后再说</a><a href='javascript:;' class='cpt-close'><i></i></a>", "</div>" ].join(""));
                $("#js-compatible .cpt-agin").click(function() {
                    var d = new Date();
                    d.setTime(d.getTime() + 30 * 24 * 3600 * 1e3);
                    //d.setTime(d.getTime()+60*1000);
                    document.cookie = "ic=1; expires=" + d.toGMTString() + "; path=/";
                    $("#js-compatible").remove();
                });
                $("#js-compatible .cpt-close").click(function() {
                    $("#js-compatible").remove();
                });
            }
        }();
    })();
});