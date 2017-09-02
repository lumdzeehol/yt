require.config({
    paths:{
        jquery:"../node_modules/jquery/dist/jquery",
        "ld-carousel":"../lib/ld-carousel/ld-carousel"
    }
});
require(['jquery','ld-carousel'],function($,Carousel){
    var carousel = new Carousel({imgs:['imgs/banner-01.jpg','imgs/banner-02.jpg'],bgimgs:['imgs/bg-01.jpg','imgs/bg-02.jpg']}).init();
});