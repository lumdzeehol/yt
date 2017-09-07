define(['jquery'],function(jQuery){
    $.fn.Ldzoom = function(){
        var $bigzoom = this.find('.ld-zoom-big');
        var $mousezoom = this.find('.ld-mousezoom');
        console.log(this.offset().top)
             
        this.on('mouseenter',function(e){
                 
            e.preventDefault();
            this.timer = setTimeout((ev)=>{
                $bigzoom.fadeIn('fast');
                $mousezoom.fadeIn('fast');
            }, 300);
        }).on('mouseleave', function(e) {
            e.preventDefault();
            clearTimeout(this.timer);
            $bigzoom.css('display', 'none');
            $mousezoom.css('display', 'none');
        }).on('mousemove',(e)=>{
            var left = e.clientX - this.offset().left - $mousezoom.outerWidth()/2;
            var top = e.pageY - this.offset().top - $mousezoom.outerHeight()/2;
            if (left<0) {
                left = 0;
            }else if (left > this.offsetWidth - $mousezoom.outerWidth()/2){
                left = this.offsetWidth - $mousezoom.outerWidth()/2;
            }
            if (top<0) {
                top = 0;
            }else if (top > this.offsetHeight - $mousezoom.outerHeight()/2){
                top = this.offsetHeight - $mousezoom.outerHeight()/2;
            }
            $mousezoom.css('left',  left+'px').css('top', top+'px');
        });
    }
});