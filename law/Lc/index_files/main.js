/**
 * Created by cy on 2017/7/24.
 */
'use strict';

$(function () {
    if ($(".text_overflow")[0]) {
        var arrText = $(".text_overflow");
        for (var i = arrText.length - 1; i >= 0; i--) {
            arrText[i] = new TextOverflow(arrText[i], $(arrText[i]).attr("value"));
        };
    }
    function TextOverflow(obj, num) {
        var _this = this;
        this.obj = obj;
        this.OverLength = num;
        this.TextLength = $(this.obj).text().length;
        // console.log(this.TextLength );

        if (this.TextLength > this.OverLength) {
            var newText = $(this.obj).text().substring(0, this.OverLength);
            this.obj.innerHTML = newText + "……";
        }
    }

    // 律师列表
    if ($(".lawyer-index-list")[0]) {
        fnLawyerList()
    }
    function fnLawyerList(){
        // 律师展示
        var arrLawyerList = $('.lawyer-index-list li'),
            oLawyerList = $('.lawyer-index-list'),
            prevBtn = $('.lawyer-index-list-wrap .prev-btn'),
            nextBtn = $('.lawyer-index-list-wrap .next-btn'),
            iNow = 0;

        // arrLawyerList.eq(iNow).addClass('active');

        prevBtn.click(function () {
            console.log(iNow)
            if (iNow > 0) {
                iNow--;
                fnAniLawyer(iNow)
            }
        })
        nextBtn.click(function () {
            if (iNow < arrLawyerList.length - 4) {
                iNow++;
                fnAniLawyer(iNow)
            }
        })

        function fnAniLawyer(a) {
            // arrLawyerList.eq(a).addClass('active').siblings('li').removeClass('active');
            console.log(a);
            oLawyerList.animate({ "left": -310 * a });
            if (iNow <= 0) {
                prevBtn.fadeOut();
            } else {
                prevBtn.fadeIn();
            }
            if (iNow >= arrLawyerList.length - 4) {
                nextBtn.fadeOut();
            } else {
                nextBtn.fadeIn();
            }
        }

    }

    // if ($('.swiper03')[0]) {
    //     fnSwiper03();
    // }
    // function fnSwiper03() {
    //     var swiper = new Swiper('.swiper03', {
    //         pagination: '.swiper-pagination',
    //         autoplay: 6000,
    //         loop: true,
    //         speed: 1000,
    //         paginationClickable: true,
    //         onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
    //             swiperAnimateCache(swiper); //隐藏动画元素 
    //             swiperAnimate(swiper); //初始化完成开始动画
    //         },
    //         onSlideChangeEnd: function (swiper) {
    //             swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    //         }
    //     });
    // }

    /*留言*/
    if ($('.solution-present')[0]) {
        var oForm = $('.solution-present form');
        // 提交
        $('.submit').click(function () {
            console.log(1111)
            var sPhone = oForm.find('input[name=phone]').val();
            var username = oForm.find('input[name=username]').val();
            // 验证手机号码
            if (!(/^1\d{10}$/.test(sPhone))) {
                layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                return false;
            }
            if (username == '') {
                layer.msg('你的称呼必需填写', { time: 1000 });
                return false;
            }
            if (/^\s*$/.test(document.getElementById("content").value)) {
                layer.msg('咨询问题不能为空', { time: 1000 });
                return false;
            }
            var formData = oForm.serializeArray();
            var layerindex = layer.load(1, {
                shade: [0.1, '#000'] //0.1透明度的白色背景
            });
            $.post(http_url + 'login/solutionPresent', formData, function (res) {
                layer.close(layerindex);
                layer.msg(res.msg);
                if (res.code == '200') {
                    window.location.reload();
                }
            }, 'JSON');
        })
    }
    // if ($('.solution-present-as')[0]) {
    //     var oForm = $('.solution-present-as form');
    //     // 提交
    //     $('.submit').click(function () {
    //         console.log(222)
    //         var sPhone = oForm.find('input[name=phone]').val();
    //         var username = oForm.find('input[name=username]').val();
    //         // 验证手机号码
    //         if (!(/^1\d{10}$/.test(sPhone))) {
    //             layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
    //             return false;
    //         }
    //         if (username == '') {
    //             layer.msg('你的称呼必需填写', { time: 1000 });
    //             return false;
    //         }
    //         if (/^\s*$/.test(document.getElementById("contentas").value)) {
    //             layer.msg('咨询问题不能为空', { time: 1000 });
    //             return false;
    //         }
    //         var formData = oForm.serializeArray();
    //         var layerindex = layer.load(1, {
    //             shade: [0.1, '#000'] //0.1透明度的白色背景
    //         });
    //         $.post(http_url + 'login/solutionPresent', formData, function (res) {
    //             layer.close(layerindex);
    //             layer.msg(res.msg);
    //             if (res.code == '200') {
    //                 window.location.reload();
    //             }
    //         }, 'JSON');
    //     })
    // }


    /* 注册 */
    if ($('.reg-box')[0]) {
        fnReg();
    }
    function fnReg() {
        var oForm = $('.reg-box form');

        // 提交
        $('.submit').click(function () {
            checkReg();
            var formData = oForm.serializeArray();
            $.post(http_url + 'login/userRegister', formData, function (res) {
                if (res.code == 202) {
                    layer.msg('恭喜您注册成功！')
                    setTimeout(function () {
                        window.location.href = '/user/login';
                    }, 500)
                } else {
                    $('[name="graph_code"]').val('');
                    document.getElementById("target").click();
                    layer.msg(res.msg)
                }
            }, 'JSON');
        })

        // 获取验证码
        var iCount = 60,
            iCheckCode = null,
            i60 = 1;

        $('.get-phone-code').click(function () {
            if (i60) {
                var sPhone = oForm.find('input[name=phone]').val();
                var sGraph_code = oForm.find('input[name=graph_code]').val();
                // 验证手机号码
                if (!(/^1\d{10}$/.test(sPhone))) {
                    layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                    return;
                }
                // 验证图形验证码
                if (!sGraph_code) {
                    layer.msg('请填写图形验证码', { time: 1000 });
                    return;
                }
                layer.msg('获取短信验证码中', {
                    icon: 16,
                    time: 10000
                });
                $.get(http_url + '/login/registerCode?phone=' + sPhone + '&graph_code=' + sGraph_code, function (res) {
                    // 成功
                    if (res.code == 202) {
                        i60 = 0;
                        var iSecond = 60;
                        var timer = setInterval(function () {
                            $('.get-phone-code').html(iSecond + "秒后重新获取");
                            iSecond--;
                            if (iSecond == 0) {
                                i60 = 1;
                                $('.get-phone-code').html("点击获取验证码");
                                clearInterval(timer);
                            }
                        }, 1000);

                    } else {
                        $('[name="graph_code"]').val('');
                        document.getElementById("target").click();
                    }
                    layer.msg(res.msg, { time: 1000 });
                }, 'JSON')
            }
        })


        // 注册验证
        function checkReg() {
            var sPhone = oForm.find('input[name=phone]').val();
            var sPassword = oForm.find('input[name=password]').val();
            var sGraph_code = oForm.find('input[name=graph_code]').val();
            var sPhone_code = oForm.find('input[name=verification_code]').val();
            var boolAgree = oForm.find('input[name=isAgree]').is(":checked");

            // 验证手机号码
            if (!(/^1\d{10}$/.test(sPhone))) {
                layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                return;
            }
            // 验证密码
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sPassword))) {
                layer.msg('密码由6-16位字母、数字组合', { time: 1000 });
                return;
            }
            // 验证图形验证码
            if (!sGraph_code) {
                layer.msg('请填写图形验证码', { time: 1000 });
                return;
            }
            // 验证手机验证码
            if (!(/^\d{6}$/.test(sPhone_code))) {
                layer.msg('手机验证码为6位数字', { time: 1000 });
                return;
            }
            // 是否同意协议
            if (!boolAgree) {
                layer.msg('请同意网站注册协议', { time: 1000 });
                return;
            }
        }
    }

    /* 忘记密码 */
    if ($('.forget-password')[0]) {
        fnForgetPassword();
    }
    function fnForgetPassword() {
        var oForm = $('.forget-password form');

        // 提交
        $('.submit').click(function () {
            checkReg();
            var formData = oForm.serializeArray();
            console.log(formData);
            $.post(http_url + 'login/forgetSetPassword', formData, function (res) {
                if (res.code == 202) {
                    layer.msg(res.msg)
                    setTimeout(function () {
                        window.location.href = '/user/login';
                    }, 500)
                } else {
                    $('[name="graph_code"]').val('');
                    document.getElementById("target").click();
                    layer.msg(res.msg)
                }
            }, 'JSON');
        })

        // 获取验证码
        var iCount = 60,
            iCheckCode = null,
            i60 = 1;

        $('.get-phone-code').click(function () {
            if (i60) {
                var sPhone = oForm.find('input[name=phone]').val();
                var sGraph_code = oForm.find('input[name=graph_code]').val();
                // 验证手机号码
                if (!(/^1\d{10}$/.test(sPhone))) {
                    layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                    return;
                }
                // 验证图形验证码
                if (!sGraph_code) {
                    layer.msg('请填写图形验证码', { time: 1000 });
                    return;
                }
                layer.msg('获取短信验证码中', {
                    icon: 16,
                    time: 10000
                });
                $.get(http_url + '/login/forgetCode?phone=' + sPhone + '&graph_code=' + sGraph_code, function (res) {
                    // 成功
                    if (res.code == 202) {
                        i60 = 0;
                        var iSecond = 60;
                        var timer = setInterval(function () {
                            $('.get-phone-code').html(iSecond + "秒后重新获取");
                            iSecond--;
                            if (iSecond == 0) {
                                i60 = 1;
                                $('.get-phone-code').html("点击获取验证码");
                                clearInterval(timer);
                            }
                        }, 1000);

                    } else {
                        $('[name="graph_code"]').val('');
                        document.getElementById("target").click();
                    }
                    layer.msg(res.msg, { time: 1000 });
                }, 'JSON')
            }
        })


        // 注册验证
        function checkReg() {
            var sPhone = oForm.find('input[name=phone]').val();
            var sPassword = oForm.find('input[name=password]').val();
            var sGraph_code = oForm.find('input[name=graph_code]').val();
            var sPhone_code = oForm.find('input[name=verification_code]').val();
            var boolAgree = oForm.find('input[name=isAgree]').is(":checked");

            // 验证手机号码
            if (!(/^1\d{10}$/.test(sPhone))) {
                layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                return;
            }
            // 验证密码
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sPassword))) {
                layer.msg('密码由6-16位字母、数字组合', { time: 1000 });
                return;
            }
            // 验证图形验证码
            if (!sGraph_code) {
                layer.msg('请填写图形验证码', { time: 1000 });
                return;
            }
            // 验证手机验证码
            if (!(/^\d{6}$/.test(sPhone_code))) {
                layer.msg('手机验证码为6位数字', { time: 1000 });
                return;
            }
        }
    }

    /* 登录 */
    if ($('.login-box')[0]) {
        fnLoginBox();
    }
    function fnLoginBox() {
        // 登录弹框

        // 键盘提交
        document.onkeydown = function (ev) {
            var oEvent = ev || event;
            if (oEvent.keyCode == 13) {
                fnSubmitLogin();
                return false;
            };
        }
        // 提交
        $('.login-box .submit').click(function () {
            fnSubmitLogin();
        })

        var oForm = $('.login-box form');
        function fnSubmitLogin() {
            if (checkLogin()) {
                var formData = oForm.serializeArray();
                $.post(http_url + 'login/userLog', formData, function (res) {
                    if (res.code == 202) {
                        window.location.href = http_url + 'user/index';
                    } else {
                        layer.msg(res.msg)
                    }
                }, 'JSON');
            }
        }
        // 登录验证
        function checkLogin() {
            var sPhone = oForm.find('input[name=number]').val();
            var sPassword = oForm.find('input[name=password]').val();

            // 验证手机号码
            if (!(/^1\d{10}$/.test(sPhone))) {
                layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                return false;
            }
            // 验证密码
            /*     if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sPassword))){
                     layer.msg('密码由6-16位字母、数字组合',{ time:1000});
                     return false;
                 }*/
            return true;
        }
    }

    /* 弹框登录 */
    if ($('.login-popup')[0]) {
        fnLogin();
    }
    function fnLogin() {
        // 登录弹框
        $('.login-btn').click(function () {
            $('.bg-shadow').show();
            $('.login-popup').show(function () {
                $('.login-popup').css({ transform: 'scale(1)' });
            });

        })
        $('.bg-shadow').click(function () {
            $('.login-popup').css({ transform: 'scale(0)' });
            setTimeout(function () {
                $('.bg-shadow').hide();
                $('.login-popup').hide();
            }, 500)
        })

        // 键盘提交
        // document.onkeydown = function(ev){
        //     var oEvent = ev||event;
        //     if(oEvent.keyCode == 13){
        //         fnSubmitLogin();
        //         return false;
        //     };
        // }
        // 提交
        $('.login-popup .submit').click(function () {
            fnSubmitLogin();
        })

        var oForm = $('.login-popup form');
        function fnSubmitLogin() {
            if (checkLogin()) {
                var formData = oForm.serializeArray();
                $.post(http_url + 'login/userLog', formData, function (res) {
                    if (res.code == 202) {
                        window.location.href = http_url + 'user/index';
                    } else {
                        layer.msg(res.msg)
                    }
                }, 'JSON');
            }
        }
        // 登录验证
        function checkLogin() {
            var sPhone = oForm.find('input[name=number]').val();
            var sPassword = oForm.find('input[name=password]').val();

            // 验证手机号码
            if (!(/^1\d{10}$/.test(sPhone))) {
                layer.msg('您输入的手机号无效，请重新输入！', { time: 1000 });
                return false;
            }
            // 验证密码
            /*    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sPassword))){
                    layer.msg('密码由6-16位字母、数字组合',{ time:1000});
                    return false;
                }*/
            return true;
        }
    }


    /* 退出登录 */
    if ($('.login-out')[0]) {
        fnLoginOut();
    }
    function fnLoginOut() {
        // 退出登录 login-out
        $('.login-out').click(function () {
            console.log(2);
            $.get(http_url + 'login/userQuit', function (res) {
                if (res.code == 202) {
                    layer.msg(res.msg)
                    setTimeout(function () {
                        window.location.href = window.location.href;
                    }, 500)
                } else {
                    layer.msg(res.msg)
                }
            }, 'JSON');
        })
    }

    /* 免费咨询 */
    if ($('.make-question')[0]) {
        fnMakeQuestion();
    }
    function fnMakeQuestion() {
        var oForm = $('.make-question form'),
            kindShowBtn = oForm.find('dt'),
            kindBox = oForm.find('dd');

        // 选择种类
        kindShowBtn.click(function () {
            if (kindBox.css('display') == 'none') {
                kindBox.slideDown();
                $(this).find('i').addClass('current');
            } else {
                kindBox.slideUp();
                $(this).find('i').removeClass('current');
            }
        })
        kindBox.find('a').click(function () {
            $(this).addClass('current').siblings('a').removeClass('current');
            $('input[name=consult_type_id]').val($(this).attr('value'));
            console.log($('input[name=consult_type_id]').val());
        })

        // 提交
        $('.answer-sure').click(function () {
            layer.msg('问题提交中', {
                icon: 16,
                time: 10000
            });
            var formData = oForm.serializeArray();
            $.post(http_url + 'request/consultQuiz', formData, function (res) {
                layer.msg(res.msg);
                console.log(res)
                if (res.code == 202) {
                    window.location.href = window.location.href;
                }
            }, 'JSON');
        })

    }

    /* 回答/追问 */
    if ($('.make-answer')[0]) {
        fnMakeAnswer();
    }
    function fnMakeAnswer() {
        var oForm = $('.make-answer form');
        // 提交
        $('.q-again-btn ,.answer-btn').click(function () {
            console.log($(this).attr('value'))
            layer.msg('提交中', {
                icon: 16,
                time: 10000
            });
            var formData = oForm.serializeArray();
            console.log(formData)
            formData.push({ name: 'state', value: $(this).attr('value') });
            console.log(formData);
            $.post(http_url + 'request/counsultReply', formData, function (res) {
                layer.msg(res.msg);
                console.log(res)
                if (res.code == 202) {
                    window.location.href = window.location.href;
                }
            }, 'JSON');
        })

        // 问题收藏/取消

        // $('.')

    }


    /* 顾问套餐 */
    if ($('.guwen-detail')[0]) {
        fnGuwenDetail();
    }
    function fnGuwenDetail() {
        console.log(1)
        // 登录弹框
        $('.look-contract a').click(function () {
            $('.guwen-detail-shadow').show();
            $('.guwen-detail').show(function () {
                $('.guwen-detail').css({ transform: 'scale(1)' });
            });

        })
        $('.guwen-detail-shadow').click(function () {
            $('.guwen-detail').css({ transform: 'scale(0)' });
            setTimeout(function () {
                $('.guwen-detail-shadow').hide();
                $('.guwen-detail').hide();
            }, 500)
        })
    }


    //下载文书
    if ($('.writ-doc')[0]) {
        $('.doc-download').click(function () {
            var writ_id = $(this).attr('value'),
                w_download_sum = $(this).attr('name'),
                identification = '#w_download_sum' + writ_id;
            var layerindex = layer.load(1, {
                shade: [0.1, '#000'] //0.1透明度的白色背景
            });
            window.open(http_url + 'login/docDownload/writ_id/' + writ_id);
            layer.close(layerindex);
            $(identification).html(parseInt(w_download_sum) + 1);
        })
    }

    //顾问卡
    if ($('.counselor-data')[0]) {
        //选择事件
        $('.counselor-type').click(function () {
            var counselor_id = $(this).attr('value');
            var ck_price = $(this).attr('name');
            var url = http_url + 'service/serve_order/sid/' + counselor_id;
            $(this).siblings('.counselor-type').removeClass('current');
            $(this).attr('class', 'counselor-type current');
            $('#ck_price').html(ck_price);
            $('.counselor-buy').attr('href', url);
            $('.tab-item').hide();
            var counselorshow = '.counselor-show' + counselor_id;
            $(counselorshow).show();
        });
    }
    if ($('.serve-order-data')[0]) {
        //提交顾问订单    
        // 提交
        var oForm = $('.make-order form');
        $('.subAdvisory').click(function () {
            layer.msg('提交中', {
                icon: 16,
                time: 10000
            });
            var formData = oForm.serializeArray();
            $.post(http_url + 'request/serveOrderPresent', formData, function (res) {
                layer.msg(res.msg);

                if (res.code == 202) {
                    window.location.href = res.url;
                }
            }, 'JSON');
        })
    }


    //律师函、劳动合同提交订单
    if ($('.order-data')[0]) {
        var oForm = $('.make-order form');
        // 提交
        $('.subAdvisory').click(function () {
            layer.msg('提交中', {
                icon: 16,
                time: 10000
            });
            var type_id = $(this).attr('value');


            $.post(http_url + 'request/serveOrderPresent', { 'type_id': type_id }, function (res) {
                layer.msg(res.msg);
                if (res.code == 202) {
                    window.location.href = res.url;
                } else if (res.code == 0) {
                    $('.bg-shadow').show();
                    $('.login-popup').show(function () {
                        $('.login-popup').css({ transform: 'scale(1)' });
                    });
                }
            }, 'JSON');
        })
    }

    //订单操作
    if ($('.order-operation')[0]) {
        //转账申请 --取消订单
        $('.apply-for').click(function () {
            var o_no = $(this).attr('value');
            var type = $(this).attr('name');
            var rentur_name = '';
            if (type == 2) {
                rentur_name = '您确定已转账吗？';

            } else {
                rentur_name = '您确定要取消订单吗？';
            }

            layer.confirm(rentur_name, {
                btn: ['确认', "取消"] //按钮
            }, function () {
                var layerindex = layer.load(1, {
                    shade: [0.1, '#000'] //0.1透明度的白色背景
                });
                $.get(http_url + 'request/userOrderCancel', { 'o_no': o_no, 'type': type }, function (response) {
                    layer.close(layerindex);
                    layer.msg(response.msg, { time: 1500 });
                    if (response.code == '202') {
                        window.location.href = response.url;
                    }
                }, 'json');
            });
        });

    }


    //订单支付
    if ($('.order-pay')[0]) {
        //选择支付方式
        /*      $('.checkboxIcon').click(function(){
                      $('.checkboxIcon').removeClass('checkedIcon');
                      $(this).attr('class','checkboxIcon checkedIcon');
              });*/
        //轮查订单是否支付
        setInterval(orderState, 10000);



        // 关闭二维码
        $('.wx-shadow ,.wx-pay .close').click(function () {
            $('.wx-check').removeClass('active');
            $('.wx-shadow').hide();
            $('.weixin-pay').hide();
            $('#qrcode').children().remove();
        })
        //提交支付
        $('.submit-but').click(function () {
            layer.msg('提交中', {
                icon: 16,
                time: 10000
            });
            var pay_type = $(this).attr('name');
            var o_no = $('[name="o_no"]').val();
            $('.weixin-pay').hide();
            if (o_no == '') {
                layer.msg('订单不存在！');
                return false;
            }
            $.post(http_url + 'pcpay/orderPay', { 'pay_type': pay_type, 'o_no': o_no }, function (res) {
                layer.msg(res.msg);
                if (res.code == 202) {
                    if (pay_type == 'wx_pub_qr') {//微信扫码支付
                        var wx_pub_qr = res.data.credential.wx_pub_qr
                        $('.wx-check').addClass('active');
                        $('.wx-shadow').show();
                        $('.weixin-pay').show();
                        $('#qrcode').children().remove();
                        $('#qrcode').qrcode({
                            render: "table", //也可以替换为table
                            width: 200,
                            height: 200,
                            text: wx_pub_qr
                        });
                    } else { //支付宝支付
                        pingpp.createPayment(res.data, function (result, err) {
                            console.log(response);
                            console.log(err.msg);
                            console.log(err.extra);
                            if (result == "success") {
                                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                            } else if (result == "fail") {
                                // charge 不正确或者微信公众账号支付失败时会在此处返回
                            } else if (result == "cancel") {
                                // 微信公众账号支付取消支付
                            }
                        });
                    }
                }
            }, 'JSON');
        });

    }
    //查询订单是否支付成功
    function orderState() {
        var o_no = $('[name="o_no"]').val();
        $.get(http_url + 'request/orderState', { 'o_no': o_no }, function (res) {
            if (res.code == 202) {
                layer.msg(res.msg);
                window.location.href = res.url;
            }
        }, 'JSON');
    }








    /* 
     * 个人中心 
     */
    //修改用户昵称
    if ($('.user-index')[0]) {
        //改用户昵称
        $(".user-name").click(function () {
            var atname = $(this).attr('value');
            layer.prompt({
                title: '修改用户昵称',
                value: atname,
                formType: 0 //prompt风格，支持0-2
            }, function (name) {
                $.get(http_url + 'request/userName', { 'name': name }, function (response) {
                    layer.msg(response.msg, { time: 1500 });
                    if (response.code == 202) {
                        window.location.reload();
                    }
                }, 'json');

            });
        });
        //修改用户邮箱  
        $(".user-mail").click(function () {
            var atname = $(this).attr('value');
            layer.prompt({
                title: '修改用户邮箱',
                value: atname,
                formType: 0 //prompt风格，支持0-2
            }, function (mail) {
                $.get(http_url + 'request/userMail', { 'mail': mail }, function (response) {
                    layer.msg(response.msg, { time: 1500 });
                    if (response.code == 202) {
                        window.location.reload();
                    }
                }, 'json');

            });
        });
    }


    // 图片上传
    if ($('.upload-pic')[0]) {
        for (var i = 0; i < $(".upload-pic").length; i++) {
            fnUploadPic(i);
        };
    };
    function fnUploadPic(a) {
        var $ = jQuery,
            $list = $('.upload-pic').eq(a),
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            thumpSize = $list.find(".pic-url").attr("size"),
            // 缩略图大小
            thumbnailWidth = thumpSize.split(",")[0],
            thumbnailHeight = thumpSize.split(",")[1],
            // Web Uploader实例
            uploader;

        // 初始化Web Uploader
        uploader = WebUploader.create({
            // 自动上传。
            auto: true,
            // swf文件路径
            // swf文件路径
            swf: 'static/admin/Api/webuploader/Uploader.swf',
            // 文件接收服务端。
            server: http_url + 'request/userImg',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: $('.upload-btn').eq(a),
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            thump: {
                width: thumbnailWidth,
                height: thumbnailHeight,
                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 90,
                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: false,
                // 是否允许裁剪。
                crop: false,
                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            }
        });


        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            // 创建缩略图
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $list.find('img').replaceWith('<span>不能预览</span>');
                    return;
                }

                $list.find('img').attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
            }

            $percent.css('width', percentage * 100 + '%');
        });
        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function (file, response) {
            layer.msg(response.msg, { time: 1500 });
            if (response.code == '101') {
                $list.find('img').attr('src', '/static/index/images/user-head.png');
                $list.find(".pic-url").val("");
            } else {
                $list.find(".pic-url").val(response.url);
                $('#' + file.id).addClass('upload-state-done');
                // 文件删除
                $list.on('click', '.delete-pic-btn', function () {
                    console.log(2);
                    uploader.removeFile(file);
                    $list.find('img').attr('src', '/static/index/images/user-head.png');
                    var vale = '';
                    $list.find(".pic-url").val(vale);
                })
            }
        });
        $list.on('click', '.delete-pic-btn', function () {
            $list.find('img').attr('src', '/static/index/images/user-head.png');
            var vale = '';
            $list.find(".pic-url").val(vale);
        });
        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function (file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($li);
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
        });
    }


    /* 修改密码 */
    if ($('.mod-password')[0]) {
        fnModPassword();
    }
    function fnModPassword() {

        // 提交
        $('.mod-password .submit').click(function () {
            console.log(1)
            fnSubmitLogin();
        })

        var oForm = $('.mod-password form');
        function fnSubmitLogin() {
            if (checkLogin()) {
                var formData = oForm.serializeArray();
                $.post(http_url + 'request/userPasswordAlter', formData, function (res) {
                    layer.msg(res.msg)
                    if (res.code == 202) {
                        setTimeout(function () {
                            window.location.href = window.location.href;
                        }, 500)
                    }
                }, 'JSON');
            }
        }
        // 登录验证
        function checkLogin() {
            var sOldPassword = oForm.find('input[name=password]').val();
            var sNewPassword = oForm.find('input[name=new_password]').val();
            var sRepetitionPassword = oForm.find('input[name=affirm_password]').val();

            // 验证密码
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sOldPassword)) || !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(sNewPassword))) {
                layer.msg('密码由6-16位字母、数字组合', { time: 1000 });
                return false;
            }

            // 重复密码
            if (sNewPassword != sRepetitionPassword) {
                layer.msg('两次输入的密码不一致', { time: 1000 });
                return false;
            }
            return true;
        }
    }

    //新闻
    if ($('.news-detail')[0]) {

        //收藏与取消收藏
        $(".news-operation").click(function () {
            var news_id = $('[name="news_id"]').val();
            $.get(http_url + 'request/newsCollect', { 'news_id': news_id }, function (response) {
                layer.msg(response.msg, { time: 1500 });
                if (response.code == 202) {
                    window.location.reload();
                }
            }, 'json');
        });
        //评论
        $(".news-publish").click(function () {
            var news_id = $('[name="news_id"]').val();
            var comment = $("#news-comment").val();
            $.get(http_url + 'request/newsComment', { 'news_id': news_id, 'content': comment }, function (response) {
                layer.msg(response.msg, { time: 1500 });
                if (response.code == 202) {
                    window.location.reload();
                }
            }, 'json');
        });
    }
    //用户收藏新闻删除
    if ($('.user-mycollect')[0]) {
        $(".news-delete").click(function () {
            var news_id = $(this).attr('value');
            $.get(http_url + 'request/newsDelete', { 'nid': news_id }, function (response) {
                layer.msg(response.msg, { time: 1500 });
                if (response.code == 202) {
                    window.location.reload();
                }
            }, 'json');
        });
    }

    //咨询收藏与取消收藏
    if ($('.question-detaile')[0]) {
        $(".question-operation").click(function () {
            var consult_id = $('[name="consult_id"]').val();
            $.get(http_url + 'request/counsultCollect', { 'consult_id': consult_id }, function (response) {
                layer.msg(response.msg, { time: 1500 });
                if (response.code == 202) {
                    window.location.reload();
                }
            }, 'json');
        });
    }



    /* 
     *  ==============================================================================================
     *  通用   
     */
    /* 侧边快捷 */
    if ($('.side-quick-02')[0]) {
        fnSideQuick2();
    }
    function fnSideQuick2() {
        // 返回顶部
        $('.side-quick-02 .to-top').click(function () {
            $('html,body').animate({ 'scrollTop': 0 });
        })
        // top按钮显示影藏
        if ($(window).scrollTop() > 400) {
            $('.side-quick-02 .to-top').css({ 'opacity': 100 })
        } else {
            $('.side-quick-02 .to-top').css({ 'opacity': 0 })
        }
        $(window).scroll(function () {
            if ($(window).scrollTop() > 400) {
                $('.side-quick-02 .to-top').css({ 'opacity': 100 })
            } else {
                $('.side-quick-02 .to-top').css({ 'opacity': 0 })
            }
        });
    }

    /* 侧边快捷 */
    if ($('.side-quick')[0]) {
        fnSideQuick();
    }
    function fnSideQuick() {
        // 返回顶部
        $('.side-quick .to-top').click(function () {
            $('html,body').animate({ 'scrollTop': 0 });
        })
        // top按钮显示影藏
        if ($(window).scrollTop() > 400) {
            $('.side-quick .to-top').css({ 'opacity': 100 })
        } else {
            $('.side-quick .to-top').css({ 'opacity': 0 })
        }
        $(window).scroll(function () {
            if ($(window).scrollTop() > 400) {
                $('.side-quick .to-top').css({ 'opacity': 100 })
            } else {
                $('.side-quick .to-top').css({ 'opacity': 0 })
            }
        });
        // 客服电话
        // $('.side-quick .phone').click(function(){
        //     $('.ph-num').show().animate({'opacity':1,'right':60});
        //     $('.ewm-img').animate({'opacity':0,'right':70},function(){
        //         $(this).hide();
        //     });
        // })
        // 二维码
        // $('.side-quick .ewm').click(function(){
        //     $('.ph-num').animate({'opacity':0,'right':70},function(){
        //         $(this).hide();
        //     });
        //     $('.ewm-img').show().animate({'opacity':1,'right':60});
        // })
        $('.side-quick .phone').click(function () {
            if ($('.ph-num').css('display') == 'block') {
                $('.ph-num').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
                $('.ewm-img').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
            } else {
                $('.ph-num').show().animate({ 'opacity': 1, 'right': 60 });
                $('.ewm-img').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
            }
        })
        // 二维码
        $('.side-quick .ewm').click(function () {
            if ($('.ewm-img').css('display') == 'block') {
                $('.ph-num').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
                $('.ewm-img').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
            } else {
                $('.ph-num').animate({ 'opacity': 0, 'right': 70 }, function () {
                    $(this).hide();
                });
                $('.ewm-img').show().animate({ 'opacity': 1, 'right': 60 });
            }
        })
    }

    // 滑动动画
    if ($('.wow')[0]) {
        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
            var wow = new WOW({
                animateClass: 'animated',
            });
            wow.init();
        }
    }
    // wow fadeInUp animated" data-wow-duration="1.2s" data-wow-delay="0.5s







})