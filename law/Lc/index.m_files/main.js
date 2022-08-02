$(function(){
    // 导航
    $('.nav-btn').click(function(){
        $('.popup-nav-shadow').fadeIn(500);
        $('#nav').css({'transform':'translateX(0)','opacity':1});
    })
    $('.popup-nav-shadow').click(function(){
        $('.popup-nav-shadow').fadeOut(500);
        $('#nav').css({'transform':'translateX(100%)','opacity':0});
    })
    
    // 下拉内容
    if($('.slide-con')[0]){
        var arrSlideCon = [];
        for(var i=0; i<$('.slide-con').length ; i++){
            arrSlideCon[i] = new SlideCon($('.slide-con').eq(i));
        }

        function SlideCon(obj){
            var _this = this;
            this.obj = obj;
            this.isSlide = false;
            this.slideBtn = this.obj.find('dt');
            this.slideCon = this.obj.find('dd');

            this.slideBtn.click(function(){
                console.log(_this.isSlide)
                if( _this.isSlide ){
                    _this.isSlide = false;
                    _this.slideCon.slideUp();
                    $(this).removeClass('active');
                }else {
                    _this.isSlide = true;                
                    _this.slideCon.slideDown();        
                    $(this).addClass('active');                
                }
            })
        }

    }
    // 首页banner
    if($('.swiper-container-index')[0]){
    var mySwiper = new Swiper ('.swiper-container', {
        on:{
            init: function(){
              swiperAnimateCache(this); //隐藏动画元素 
              swiperAnimate(this); //初始化完成开始动画
            }, 
            slideChangeTransitionEnd: function(){ 
              swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
            } 
        },
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 4000,//5秒切换一次
          },
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      })  
    }


    // 内页banner
    if($('.swiper-container-inside')[0]){
        var iWidth = $('.swiper-slide')[0].clientWidth,
            iLeft = $('.swiper-slide')[0].offsetLeft;

        
        console.log(iLeft);
        var mySwiper = new Swiper ('.swiper-container', {
            width: iWidth,
            spaceBetween : iLeft,
            direction: 'horizontal',
            // loop: true,
            // autoplay: {
            //     delay: 2000,//5秒切换一次
            // }
          })  
        }


    if($('.moblile-lawsuit')[0]){
      //var oForm = $('.moblile-lawsuit form');
     // 提交
    $('.submit').click(function(){
        var sPhone = $('input[name=phone]').val();
        var username = $('input[name=username]').val();
        // 验证手机号码
        if( !(/^1\d{10}$/.test(sPhone)) ){
            layer.msg('您输入的手机号无效，请重新输入！',{ time:1000});
            return false;
        }  
        if(username == ''){
            layer.msg('你的称呼必需填写',{ time:1000});
            return false;
        }    
        if(/^\s*$/.test(document.getElementById("contentas").value)){
            layer.msg('咨询问题不能为空',{ time:1000});
            return false;
        }  
        var formData = $('#lawsuit').serializeArray();
        var  layerindex = layer.load(1, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            });
        $.post(http_url+'login/solutionPresent',formData,function(res){
            layer.close(layerindex);
            layer.msg(res.msg);
              if (res.code == '200') {
                     window.location.reload();
            }
        },'JSON');
    }) 
}


})