define(['jquery','Cookie'],function($,Cookie){
    function loadCart(){
        $cart = $('.yt_minicart');
        $.ajax({
            url: '/yintai/php/getCart.php',
            type: 'GET',
            dataType: 'json',
            data: {userid: Cookie.get('userid')},
        })
        .done(function(data) {
            var $sp = $cart.children('a').find('.countofminicart');
            $sp.html(data['count']);
        })
        .fail(function() {
            console.log("error");
        });
    }
         
    return loadCart;
});