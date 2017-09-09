require(['config'],function(){
    require(['jquery','loadCart','headlogin','Ldzoom','Cookie'],function($,loadCart) {
        var regExp = /(\\?|\\&)id=([^\\&]+)/;
        var goods_id = window.location.search.substr(0).match(regExp)[2];
        var user_id = Cookie.get('userid');
        var $ldzoom = $('.ld-zoom-small').Ldzoom();  
        var $photolist = $('.photolist');
        var $photocell = $photolist.find('.photocell');
        var $photo_btn = $('.scroll_btn');

        $.ajax({
             url: '//localhost/yintai/php/getGood.php',
             type: 'GET',
             dataType: 'json',
             data: {goodid: goods_id},
         })
         .done(function(data) {
            /*面包屑*/
            var $crumbs = $('<a>').attr('href', 'javascript:void(0)').html(data['data']['des']);
            $('.crumbs').append(($('<span>').append($crumbs)));
            /*商品信息*/
            var $goodmsg = $('.yt_productinfo');
            $goodmsg.children('h1').html(data['data']['des']);
            $goodmsg.children('.priceInfo').children('.yt_price').children('strong').html('￥'+data['data']['price']);
            $goodmsg.children('.priceInfo').children('.market_price').find('del').html('￥'+data['data']['cur_price']);
            /*商品图片*/
            $ldzoom.ld_setImg('../imgs/goodsImgs/'+data['data']['imgs']);
            var $photolist = $('.photolist');
            for(let i = 0 ; i < 6 ; i++){
                if (i ===1 ) {
                    var $cell = $('<li>').addClass('photocell');                    
                    var $img = $('<img>').attr('src', '../imgs/diff-good.jpg');
                    var $a = $('<a>').attr('href', 'javascript:void(0)');
                    $a.append($img);
                    $cell.append($a);
                    $photolist.append($cell);
                }else{
                    var $cell = $('<li>').addClass('photocell');                    
                    var $img = $('<img>').attr('src', '../imgs/goodsImgs/'+data['data']['imgs']);
                    var $a = $('<a>').attr('href', 'javascript:void(0)');
                    $a.append($img);
                    $cell.append($a);
                    $photolist.append($cell);
                }
            }
         })
         .fail(function() {
             console.log("error");
         });
          
        /*读取购物车*/
        loadCart();
        /*鼠标移动到图片切换大图效果*/
        $photolist.mouseover( function(event) {
            var target = event.target;
            if (target.tagName === "A") {
                var imgSrc = $(target).children('img').attr('src');
                $ldzoom.ld_setImg(imgSrc);
            }
            else if(target.tagName === "IMG"){
                var imgSrc = $(target).attr('src');
                $ldzoom.ld_setImg(imgSrc);
            }
        });
        /*小图滚动*/
        $photo_btn.eq(0).click(function(event) {
            var cellWidth = 72;
            var padding = 20;
            console.log($photolist.position().left,$photolist.css('left'));
                 
            if ($photolist.position().left >  -( $photolist.outerWidth() - cellWidth)) {
                console.log(2222)
                     
                $photolist.animate({left: $photolist.position().left - cellWidth + 'px' }, 'fast', ()=>{
                    $photolist.stop(true);                         
                });
            }
        });
        $photo_btn.eq(1).click(function(event) {
            var cellWidth = 72;
            var padding = 20;
            console.log($photolist.position().left,$photolist.css('left'));
                 
            if ($photolist.position().left < 0) {
                $photolist.animate({left: $photolist.position().left + cellWidth + 'px' }, 'fast', ()=>{
                    $photolist.stop(true);
                });
            }
        });

        /*商品数量*/
        $numInput = $('#buyNum');
        $add_btn = $('.pro_num').find('.pnum_add');
        $reduce_btn = $('.pro_num').find('.pnum_reduce');
        $numInput.on('input',function(event) {
            if ($(this).val()>99) {
                $(this).val(99);
            }else if($(this).val()<1){
                $(this).val(1);
            }
        });
        $add_btn.click(function(event) {
            if ($numInput.val()<99) {
                $numInput.val(parseInt($numInput.val()) + 1);
            }
        }); 
        $reduce_btn.click(function(event) {
            if ($numInput.val()>1) {
                $numInput.val(parseInt($numInput.val()) - 1);
            }
        }); 
        /*颜色尺码*/
        var $sku = $('.product_sku');
            /*颜色*/
        $sku.find('.pro_style').find('.pro_item').click(function(event) {
            if ($(this).hasClass('selected')) {
                return false;
            }else{
                $sku.find('.pro_style').find('.pro_item').removeClass('selected');
                $(this).addClass('selected');
            }
        });
            /*尺码*/
        $sku.find('.pro_size').find('.pro_item').click(function(event) {
            if ($(this).hasClass('soldout')) {
                return false;
            }
            if ($(this).hasClass('selected')) {
                return false;
            }else{
                $sku.find('.pro_size').find('.pro_item').removeClass('selected');
                $(this).addClass('selected');
            }
        }); 
        /*购买*/
        var $addCart = $('.incart');
        $addCart.click(function(event) {
            $miniCart = $('.yt_minicart');
            var car_pos = {left:$miniCart.offset().left,top:$miniCart.offset().top};

            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if (xhr.status===200||xhr.status === 304) {
                    loadCart();
                    var $fly = $('.ld-zoom-small').children('img').clone().appendTo($('body')); 
                    $fly.css('position', 'absolute')
                        .css('z-index', '30')
                        .css('left', $('.ld-zoom-small').offset().left)
                        .css('top', $('.ld-zoom-small').offset().top)
                        .animate({
                            left: car_pos.left+30+'px',
                            top: car_pos.top+'px',
                            height: 34+'px'
                        },'slow', function() {
                            $(this).remove();      
                        });
                }     
            }
            xhr.open('post','../php/addCart.php');
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            // console.log('goodid='+goods_id+'&userid='+user_id+'&count='+$numInput.val())
                 
            xhr.send('goodid='+goods_id+'&userid='+user_id+'&count='+$numInput.val());
            // xhr.send(cart_data);
        });
    })
});