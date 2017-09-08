require(['config'],function(){
    require(['jquery','loadCart','headlogin','Ldzoom','Cookie'],function($,loadCart) {
        var regExp = /(\\?|\\&)id=([^\\&]+)/;
        var goods_id = window.location.search.substr(0).match(regExp)[2];
        var user_id = Cookie.get('userid');
        var $ldzoom = $('.ld-zoom-small').Ldzoom();  
        var $photolist = $('.photolist');
        var $photocell = $photolist.find('.photocell');
        var $photo_btn = $('.scroll_btn');
        // setTimeout((e)=>{
        //    ldzoom.ld_setImg("../imgs/goodsImgs/jpnz_04.jpg")
        // }, 2000);
        var count = 0; 
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
            console.log(count++)
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

        /*购买*/
        var $addCart = $('.incart');
        $addCart.click(function(event) {
            $miniCart = $('.yt_minicart');
            var car_pos = {left:$miniCart.offset().left,top:$miniCart.offset().top};
            console.log(car_pos)
                 
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                console.log((JSON.parse(xhr.responseText))['status']);
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
            xhr.open('post','../php/addCart.php');
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            // console.log('goodid='+goods_id+'&userid='+user_id+'&count='+$numInput.val())
                 
            xhr.send('goodid='+goods_id+'&userid='+user_id+'&count='+$numInput.val());
            // xhr.send(cart_data);
        });
    })
});