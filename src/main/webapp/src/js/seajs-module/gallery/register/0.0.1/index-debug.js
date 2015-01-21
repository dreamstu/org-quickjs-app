define("gallery/register/0.0.1/index-debug", [ "jquery-debug" ], function(require, exports, module) {
    /*
 * test
 * https://github.com/dreamstu/org-quickjs-app
 *
 * Copyright (c) 2015 dreamstu
 * Licensed under the MIT license.
 */
    var $ = require("jquery-debug");
    var $form = $(".register-form"), $inputs = $("input", $form), $account = $($inputs[0]), $pwd = $($inputs[1]), $repwd = $($inputs[2]), $p = $("p"), $act_ts = $($p[0]), $pwd_ts = $($p[1]), $repwd_ts = $($p[2]), $form_tips = $(".form-tip"), $act_tips = $($form_tips[0]), $pwd_tips = $($form_tips[1]), $repwd_tips = $($form_tips[2]), $account_length = 0;
    $form.on("submit", function() {
        var arr = [];
        $.each($p, function(idx, obj) {
            obj = $(obj);
            if (!obj.data("pass")) {
                obj.prev().trigger("focus");
                return false;
            }
            arr.push(true);
        });
        if (arr.length >= 3) {
            return true;
        } else {
            return false;
        }
    });
    //账户
    $account.on("focus", function() {
        setVilidatePass($act_ts, false);
        $act_tips.css("visibility", "visible");
        $act_ts.text("请输入数字，字母或下划线，推荐使用中文，长度为8-10个字符，一个中文为两个字符");
    });
    $account.on("blur", function() {
        $act_tips.css("visibility", "hidden");
        var temp = this.value;
        var len = temp.length;
        if (len > 0) {} else {
            $act_ts.text("");
        }
    });
    var $act_re = /^\w[\x00-\xff]/g;
    $account.on("keyup", function() {
        $account_length = getLength(this.value);
        $act_tips.text("已输入" + $account_length + "个字符");
        if ($act_re.test(this.value)) {
            $act_ts.text("只能输入数字，字母或下划线，推荐使用中文");
        } else if ($account_length < 8) {
            $act_ts.text("不足8个字符");
        } else if ($account_length > 10) {
            $act_ts.text("超过10个字符");
        } else {
            $act_ts.text("OK");
            setVilidatePass($act_ts, true);
        }
    });
    //口令
    $pwd.on("focus", function() {
        setVilidatePass($pwd_ts, false);
        $pwd_tips.css("visibility", "visible");
        $pwd_ts.text("请输入6-18位的口令，必须包含字母和数字");
    });
    $pwd.on("blur", function() {
        var temp = this.value;
        var len = temp.length;
        if (len > 0) {
            if (len < 6) {
                $pwd_ts.text("长度不够6位");
            } else if (len > 18) {
                $pwd_ts.text("长度超过18位");
            } else {
                $pwd_ts.text("OK");
                setVilidatePass($pwd_ts, true);
            }
        } else {
            $pwd_ts.text("");
        }
        $pwd_tips.css("visibility", "hidden");
    });
    var ems = $pwd_tips.find("em");
    $pwd.on("keyup", function() {
        var temp = this.value;
        var len = temp.length;
        ems.removeClass("active");
        if (len < 6) {
            ems.eq(0).addClass("active");
            $repwd.attr("disabled", "disabled");
        } else {
            $repwd.removeAttr("disabled");
            if (len < 10) {
                ems.eq(1).addClass("active");
            } else if (/[0-9a-zA-Z]/g.test(temp)) {
                ems.eq(2).addClass("active");
            }
        }
    });
    //确认口令
    $repwd.on("focus", function() {
        setVilidatePass($repwd_ts, false);
        $repwd_tips.css("visibility", "visible");
    });
    $repwd.on("blur", function() {
        $repwd_tips.css("visibility", "hidden");
        if (this.value.length > 0) {
            if (this.value != $pwd.val()) {
                $repwd_ts.text("两次输入密码不一致");
            } else {
                $repwd_ts.text("OK");
                setVilidatePass($repwd_ts, true);
            }
        } else {
            $repwd_ts.text("");
        }
    });
    /***
 * 获取字符串字符长度
 * @param str 目标字符串
 * @returns {number} 计算后的长度
 */
    function getLength(str) {
        return str.replace(/[^\x00-\xff]/g, "xx").length;
    }
    /***
 *  设置目标输入项是否校验通过
 * @param context 目标输入项
 * @param {boolean} value 是否通过
 */
    function setVilidatePass(context, value) {
        $(context).data("pass", value);
    }
});