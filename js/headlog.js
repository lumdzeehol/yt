    define(['jquery','Cookie'],function($,Cookie){
        console.log(55555);
        /*登录状态*/   
        if (Cookie.get('username').length>0) {
            $('.hdtop_right').children('.user_log').css('display', 'none');
            $('.hdtop_right').children('.user_havelog').css('display', 'block').children('a').eq(0).html(Cookie.get('username'));
            $('.hdtop_right').children('.user_havelog').children('a').eq(1).click(function() {
                Cookie.remove('username');
                Cookie.remove('userid');
                window.location.href = "//localhost/yintai";
            });
        }

        $wechat = $('.wechat_top').eq(0);
        $mobileyintai = $('.phone_top').eq(0);
        $myyt = $('.my_yttag').eq(0);
        $wechat.on('mouseenter', function(event) {
            clearTimeout(this.leaveTimer);
            this.enterTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'block');
                $(this).find('>div').find('div').eq(0).find('a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(../imgs/header-02.png) -175px -128px');
                // console.log($(this).find('>a'))
            }, 300);
        }).on('mouseleave', function(event) {
            clearTimeout(this.enterTimer);
            this.leaveTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'none');
            },300);
        });
        $mobileyintai.on('mouseenter', function(event) {
            clearTimeout(this.leaveTimer);
            this.enterTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'block');
                $(this).find('>div').find('div').eq(0).find('a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(../imgs/header-02.png) -175px -128px');
            }, 300);
        }).on('mouseleave', function(event) {
            clearTimeout(this.enterTimer);
            this.leaveTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'none');
            },300);
        });  
        $myyt.on('mouseenter', function(event) {
            clearTimeout(this.leaveTimer);
            this.enterTimer = setTimeout((e)=>{
                $(this).find('.myyt_list').eq(0).css('display', 'block');
                $(this).find('.myyt_list').find('>a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(imgs/../header-02.png) -175px -128px');
                // console.log($(this).find('>a'))
            }, 300);
        }).on('mouseleave', function(event) {
            clearTimeout(this.enterTimer);
            this.leaveTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'none');
            },300);
        });

        /*导航hover效果*/
        $('.nav_cate').mouseenter(function(event) {
                 
            $(this).next('.nav_cate_list').css('display', 'block');
        }).mouseleave(function(event) {
            $(this).next('.nav_cate_list').css('display', 'none');
        });;
    });