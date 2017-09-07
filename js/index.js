require(['config'],function(){
    
    require(['jquery','ld-carousel','Cookie'],function($,Carousel,Cookie){

        if (Cookie.get('username').length>0) {
            $('.hdtop_right').children('.user_log').css('display', 'none');
            $('.hdtop_right').children('.user_havelog').css('display', 'block').children('a').eq(0).html(Cookie.get('username'));
            $('.hdtop_right').children('.user_havelog').children('a').eq(1).click(function() {
                Cookie.remove('username');
                Cookie.remove('userid');
                window.location.href = "//localhost/yintai";
            });
        }

        /*初始化轮播插件*/
        var carousel = new Carousel({imgs:['imgs/banner-01.jpg','imgs/banner-02.jpg'],bgimgs:['imgs/bg-01.jpg','imgs/bg-02.jpg']}).init();

        var $doc = $(document);
        var $hlbd = $('html,body');
        var $flnav = $('.float_nav');
        var $flnavItem = $('.flnav_floor').not('.flnav_totop');
        var $totop = $('.flnav_floor').last();
        var $nav = $('.nav_cate_list').first();
        $nav.css('display', 'block');


        /*楼层集合*/
        var $cont_sq = $('.yt_contsq');
        if ($doc.scrollTop() >= $cont_sq.eq(0).offset().top) {
            $flnav.css('display', 'block');
        }else{
            $flnav.css('display', 'none');
        }
        /*加载第一floor信息*/
        var $zgtk = $('.yt_zg').children('.container').children('.yt_box').children('.yt_goodslist').find('ul');
            /*发起ajax请求*/
        $.ajax({
            url: './php/goods.php',
            dataType: 'GET',
            dataType: 'json',
            data: {count: '15', cate: ''},
        })
        .done(function(data) {
            for(let i = 0; i < data['count'];i++){
                /*创建一个li*/
                var $li = $('<li>').addClass('yt_goodscell');
                $li[0].dataset["guid"] = data['data'][i]['id'];
                /*图片路径*/
                var dir = './imgs/goodsImgs/'+data['data'][i]['imgs'];
                /*li内html*/
                var cont = `<div class="goods_pic">
                                <a href="./html/detail.html?id=${ data['data'][i]['id']}">
                                    <img src="${dir}">
                                </a>
                            </div>
                            <div class="goods_msg">
                                <div class="goods_name">
                                    <a href="./html/detail.html?id=${ data['data'][i]['id']}">${data['data'][i]['name']}</a>
                                </div>
                                <div class="goods_des">
                                    <a href="./html/detail.html?id=${ data['data'][i]['id']}">${data['data'][i]['des']}</a>
                                </div>
                                <div class="goods_price clearfix">
                                    <span class="cur_prc">￥${data['data'][i]['cur_price']}</span>
                                    <span class="ori_prc"><del>￥${data['data'][i]['price']}</del></span>
                                </div>
                            </div>`;
                $li.html(cont);
                $zgtk.append($li);
            }
        })
        .fail(function(err) {
            console.log("error"+err);
        });

        /*初始化hdtop*/
        $wechat = $('.wechat_top').eq(0);
        $mobileyintai = $('.phone_top').eq(0);
        $myyt = $('.my_yttag').eq(0);
        $wechat.on('mouseenter', function(event) {
            clearTimeout(this.leaveTimer);
            this.enterTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'block');
                $(this).find('>div').find('div').eq(0).find('a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(imgs/header-02.png) -175px -128px');
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
                $(this).find('>div').find('div').eq(0).find('a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(imgs/header-02.png) -175px -128px');
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
                $(this).find('.myyt_list').find('>a').css('color', '#e5004f').find('.top_arrow').css('background', 'url(imgs/header-02.png) -175px -128px');
                // console.log($(this).find('>a'))
            }, 300);
        }).on('mouseleave', function(event) {
            clearTimeout(this.enterTimer);
            this.leaveTimer = setTimeout((e)=>{
                $(this).find('>div').eq(0).css('display', 'none');
            },300);
        });

        /*初始化浮动导航*/
        $flnavItem.each( function(index, val) {
            $(val)
                .on('mouseover',(e)=>{
                    $(this).children('span').css('display', 'block');
                })
                .on('mouseout',(e)=>{
                    $(this).children('span').css('display', 'none');  
                })
                .click((e)=>{
                    var top = $cont_sq.eq($(this).index()).offset().top;
                    $hlbd.animate({scrollTop: top}, 300);
                });
        });
        $totop
            .on('mouseover',function(e){
                console.log(this)
                     
                $(this).children('span').css('display', 'block');
            })
            .on('mouseout',function(e){
                $(this).children('span').css('display', 'none');  
            })
            .click(function(e){
                $hlbd.animate({scrollTop: 0}, 300);
            });
        /*滚动到一楼开始显示floatnav*/
        /*floors_status记录每层加载状态*/
        var floors_status = [false,false,false,false,false,false,false,false,false];
        $(window).scroll(function(event) {
            if ($doc.scrollTop() >= $cont_sq.eq(0).offset().top) {
                $flnav.css('display', 'block');
            }else{
                $flnav.css('display', 'none');
            }

            /*延迟加载*/
            var $floors = $cont_sq.not(':first');     
            for(let x = 0 ; x < $floors.length ; x++ ){
                if ( floors_status[x] != true && $floors.eq(x).offset().top< $doc.scrollTop() + window.innerHeight - 50) {

                         
                    var $type = $floors.eq(x).data('cate');
                    console.log($type);
                         
                    $.ajax({
                        url: './php/goods.php',
                        type: 'GET',
                        dataType: 'json',
                        data: {count: '15',cate: $type}
                    })
                    .done(function(data) {
                        for(let i = 0; i < data['count'];i++){
                            /*创建一个li*/
                            var $li = $('<li>').addClass('yt_goodscell');
                            $li[0].dataset["guid"] = data['data'][i]['id'];
                            /*图片路径*/
                            var dir = './imgs/goodsImgs/'+data['data'][i]['imgs'];
                            /*li内html*/
                            var cont = `<div class="goods_pic">
                                            <a href="./html/detail.html?id=${ data['data'][i]['id']}">
                                                <img src="${dir}">
                                            </a>
                                        </div>
                                        <div class="goods_msg">
                                            <div class="goods_name">
                                                <a href="./html/detail.html?id=${ data['data'][i]['id']}">${data['data'][i]['name']}</a>
                                            </div>
                                            <div class="goods_des">
                                                <a href="./html/detail.html?id=${ data['data'][i]['id']}">${data['data'][i]['des']}</a>
                                            </div>
                                            <div class="goods_price clearfix">
                                                <span class="cur_prc">￥${data['data'][i]['cur_price']}</span>
                                                <span class="ori_prc"><del>￥${data['data'][i]['price']}</del></span>
                                            </div>
                                        </div>`;
                            $li.html(cont);
                            $floors.eq(x).children('.container').children('.yt_box').children('.yt_goodslist').find('ul').append($li);
                        }
                            console.log(floors_status)
                                       
                    })
                    .fail(function() {
                        console.log("error");
                    });
                    floors_status[x] = true;
                    
                }
            }
        }); 
        

    });
});