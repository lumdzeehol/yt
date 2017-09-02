define(['jquery'],function(){         
    function Carousel(options){
        var defaults = {
            container: '#ldcarousel',
            showprevnextBtn: true,
            autoPlay: true,
            showpageControl: true,
            currentIndex: 0,
            targetIndex: 0,
            autoInterval:4000
        }
        opt = jQuery.extend({},defaults,options);

        this.container = opt.container;

        this.main_container = opt.main_container;
        
        this.showprevnextBtn = opt.showprevnextBtn;
        
        this.autoPlay = opt.autoPlay;
        
        this.showpageControl = opt.showpageControl;
        
        this.currentIndex = opt.currentIndex;
        
        this.targetIndex = opt.targetIndex;
        
        this.autoInterval = opt.autoInterval;

        this.bgimgs = opt.bgimgs;
        this.imgs = opt.imgs;
        this.panels = [];
        this.$pageitem = [];
        return this;
    }
    Carousel.prototype = {
        init(){
            var $container = $(this.container);
            // var $main_container = $(this.main_container);
            var imgsArr = this.imgs.forEach((ele, index)=>{
                var $ld_panel = $('<div>').addClass('ld_panel');
                $ld_panel.css({
                    'background': 'url('+ this.bgimgs[index] +')',
                    'background-size': 'contain'
                });
                var $ld_a = $('<a>').attr('href', '##');
                var img = new Image();                     
                img.src = ele;  
                $ld_a.append(img);
                $ld_panel.append($ld_a);
                $container.append($ld_panel);
                this.panels.push($ld_panel);
                $ld_panel.css('opacity', 0);
            });
            console.log(this.panels)
                 
            // $(this.imgs[this.currentIndex]).css('opacity', 1);;
            this.panels[0].css('opacity', 1);
            /*是否创建滚动键*/
            if (this.showprevnextBtn) {
                var $prevBtn = $('<span>').addClass('roll_btn');
                var $nextBtn = $('<span>').addClass('roll_btn');
                $prevBtn.html('&lt');
                $nextBtn.html('&gt');
                $prevBtn.css({
                    left: '326.5px',
                    display: 'none'
                });
                $nextBtn.css({
                    left: '1086.5px',
                    display: 'none'
                });
                $prevBtn.click((e)=>{
                    e.preventDefault();
                    this.targetIndex--;
                    this.roll();
                         
                });
                $nextBtn.click((e)=>{
                    e.preventDefault();
                    this.targetIndex++;
                    this.roll();
                });
                $container.append($prevBtn,$nextBtn).on('mouseover',function(e){
                        // e.stopPropagation();
                        $nextBtn.css('display', 'block');
                        $prevBtn.css('display', 'block');
                }).on('mouseout',function(e){
                    // e.stopPropagation();
                    $nextBtn.css('display', 'none');
                    $prevBtn.css('display', 'none');
                });
                var fPic_left = $('.f-pic')[0].offsetLeft;
                        console.log(fPic_left)
                $('.f-pic').on('mouseover',function(e){
                    e.stopPropagation();
                    $(this).animate({           
                        left: (fPic_left - 6 +'px')},400);
                }).on('mouseout',function(e){
                    e.stopPropagation();
                    $(this).animate({
                        left: (fPic_left + 'px')},400);
                })
            }

            /*是否显示分页器*/
            if (this.showpageControl) { 
            /*此处可用闭包*/    
                var $pageCtrl = $('<div>');
                $pageCtrl.addClass('page_contorl');
                for (let i = 0; i <2; i++) {
                    $item = $('<span>')
                                .addClass('pageitem')
                                .on('mouseenter',()=>{
                                    console.log(i)
                                         
                                    this.targetIndex = i;
                                    this.roll();
                                });
                    $pageCtrl.append($item);
                    this.$pageitem.push($item);
                }
                this.$pageitem.push($item);
                this.$pageitem[0].addClass('pageitem_chosen');
                $container.append($pageCtrl);
            }
            /*是否自动播放*/
            if (this.autoPlay) {
                this.autoRoll();
            }
            return this;
        },
        roll(){
            if (this.targetIndex > 1) {
                this.targetIndex = 0;
                this.currentIndex = 1;
            }else if(this.targetIndex < 0){
                this.targetIndex = 1;
                this.currentIndex = 0;
            }else{
                this.currentIndex = this.targetIndex - 1;
            }
            if (this.currentIndex > 1) {
                this.currentIndex = 0;
            }else if(this.currentIndex < 0){
                this.currentIndex = 1;
            }
            console.log('t'+this.targetIndex,'c'+this.currentIndex)
                 
            if (this.showpageControl) {
                for(var i = 0; i < 2; i++){
                    this.$pageitem[i].removeClass('pageitem_chosen');
                }
                this.$pageitem[this.targetIndex].addClass('pageitem_chosen');
            }
            $(this.panels[this.currentIndex]).stop().animate({'opacity': 0},300); 
            $(this.panels[this.targetIndex]).stop().animate({'opacity': 1},300);
        },
        autoRoll(){
            // clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.targetIndex++;
                console.log(this.targetIndex,this.currentIndex)

                this.roll();
            }, this.autoInterval);

        }
    }

    return Carousel;

});