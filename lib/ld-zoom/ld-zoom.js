define(['jquery'],function(jQuery){
    $.fn.Ldzoom = function(){
        var $bigzoom = this.find('.ld-zoom-big');
        var $mousezoom = this.find('.ld-mousezoom');
        var $zoomer = this.find('.ldbig-zoomer');

        this.on('mouseenter',(e)=>{
            this.timer = setTimeout((ev)=>{
                $bigzoom.fadeIn('fast');
                $mousezoom.fadeIn('fast');
            }, 300);
            this.on('mouseleave', (e)=>{
                clearTimeout(this.timer);
                $bigzoom.css('display', 'none');
                $mousezoom.css('display', 'none');
                this.on('mousemove', null);
                this.on('mouseleave', null);
            }).on('mousemove',(e)=>{
                if (e.target === $zoomer.children('img')[0]) {
                    $bigzoom.css('display', 'none');
                    $mousezoom.css('display', 'none');
                }
                     
                var left = e.clientX - this.offset().left - $mousezoom.outerWidth()/2;
                var top = e.pageY - this.offset().top - $mousezoom.outerHeight()/2;
                if (left<0) {
                    left = 0;
                }else if (left > this.outerWidth() - $mousezoom.outerWidth()){
                    left = this.outerWidth() - $mousezoom.outerWidth();
                }
                if (top<0) {
                    top = 0;
                }else if (top > this.outerHeight() - $mousezoom.outerHeight()){
                    top = this.outerHeight() - $mousezoom.outerHeight();
                }
                $mousezoom.css('left',  left+'px').css('top', top+'px');
                $zoomer.css('left', -left*4 + 'px');
                $zoomer.css('top', -top*4 + 'px');
            });
        });
        /*设置图片接口*/
        this.ld_setImg = function(imgs){
            console.log(typeof imgs)
                 
            if (imgs && typeof imgs === "string") { 
                var $smallImg = this.children('img');
                var $bigImg = this.find('.ldbig-zoomer').children('img');
                $smallImg.attr('src',imgs) ;
                $bigImg.attr('src', imgs); 
            }
        }
        console.log(this);
             
        return this;
    }
});